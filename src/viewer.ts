import * as vscode from 'vscode';
import sharp from 'sharp';

async function parsePVRFile(data: Uint8Array): Promise<Buffer> {
    const headerSize = 52;

    // read fixed size header block
    const header = new DataView(data.buffer, data.byteOffset, headerSize);
    const magic = header.getUint32(0, true); // 55727696, 0x03525650
    const flags = header.getUint32(4, true); // 0 = no flags, 2 = pre-multiplied alpha
    const pixelFormat = header.getBigUint64(8, true); // 22n (ETC2 RGB)
    const colorSpace = header.getUint32(16, true); // 0 = linear rgb, 1 = srgb
    const channelType = header.getUint32(20, true); // 0 = unsigned byte normalized
    const height = header.getUint32(24, true); // 512 pixels
    const width = header.getUint32(28, true); // 512 pixels
    const depth = header.getUint32(32, true); // 1 pixel
    const numSurfaces = header.getUint32(36, true); // 1 in array
    const numFaces = header.getUint32(40, true); // 1 in cubemap
    const mipMapCount = header.getUint32(44, true); // 1 mip only
    const metaDataSize = header.getUint32(48, true); // 0 bytes

    // read metadata, 0 or more key-value entries
    const metadata = new DataView(data.buffer, data.byteOffset + headerSize, metaDataSize);

    // read bulk color data
    const pbuf = new DataView(data.buffer, data.byteOffset + headerSize + metaDataSize, data.byteLength - headerSize - metaDataSize);

    const channels = (pixelFormat === 22n && channelType === 0) ? 3 : 4;

    const rbuf = new Uint8Array(width * height * channels);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) * channels;
            rbuf[i + 0] = x;
            rbuf[i + 1] = y;
            rbuf[i + 2] = 0.0;
        }
    }

    const img = sharp(rbuf, { raw: { width: width, height: height, channels: channels } });
    return await img.png().withMetadata().toBuffer();
}

class ImagePreviewDocument extends vscode.Disposable implements vscode.CustomDocument {

    public readonly uri: vscode.Uri;
    private _data: Uint8Array;

    public static async create(uri: vscode.Uri): Promise<ImagePreviewDocument> {
        const data = await vscode.workspace.fs.readFile(uri);
        return new ImagePreviewDocument(uri, data);
    }

    private constructor(uri: vscode.Uri, data: Uint8Array) {
        super(() => { });
        this.uri = uri;
        this._data = data;
    }

    public async toDataUrl(): Promise<string> {
        const png = await parsePVRFile(this._data);
        return "data:image/png;base64," + png.toString('base64');
    }
}

export default class ImagePreviewProvider implements vscode.CustomReadonlyEditorProvider<ImagePreviewDocument> {

    private static readonly viewType = 'pvr-viewer';

    public static register(context: vscode.ExtensionContext): vscode.Disposable {
        return vscode.window.registerCustomEditorProvider(
            ImagePreviewProvider.viewType,
            new ImagePreviewProvider(context.extensionUri),
            {
                webviewOptions: {
                    retainContextWhenHidden: false
                },
                supportsMultipleEditorsPerDocument: false
            });
    }

    private constructor(private readonly _extensionUri: vscode.Uri) { }

    public async openCustomDocument(uri: vscode.Uri, _openContext: vscode.CustomDocumentOpenContext, _token: vscode.CancellationToken): Promise<ImagePreviewDocument> {
        const document = await ImagePreviewDocument.create(uri);
        return document;
    }

    public async resolveCustomEditor(document: ImagePreviewDocument, panel: vscode.WebviewPanel, _token: vscode.CancellationToken): Promise<void> {
        // configure new webview
        panel.webview.options = {
            enableScripts: false,
            localResourceRoots: [
                this._extensionUri
            ]
        };

        // set content in webview
        const dataUrl = await document.toDataUrl();
        panel.webview.html = this._generateHtmlForWebview(panel.webview, dataUrl);
    }

    private _generateHtmlForWebview(webview: vscode.Webview, dataUrl: string): string {
        // convert local path of project files to a uri we can use in the webview
        const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'reset.css'));
        const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'vscode.css'));
        const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.css'));

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src 'self' data:; style-src ${webview.cspSource};">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="${styleResetUri}" rel="stylesheet>
    <link href="${styleVSCodeUri}" rel="stylesheet>
    <link href="${styleMainUri}" rel="stylesheet>
</head>
<body>
    <div id="canvas-container"><img id="image-preview" src="${dataUrl}"></div>
</body>
</html>`;
    }
}
