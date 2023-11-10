import * as vscode from 'vscode';
import sharp from 'sharp';
import { log } from 'console';

async function parsePVRFile(fileData: Uint8Array): Promise<Buffer> {
    const width = 256;
    const height = 256;
    const channels = 4;

    const pixels = new Uint8Array(width * height * channels);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = y * width + x;
            pixels[i * 4 + 0] = x;
            pixels[i * 4 + 1] = y;
            pixels[i * 4 + 2] = 0;
            pixels[i * 4 + 3] = 255;
        }
    }

    const raw = sharp(pixels, {
        raw: {
            width: width,
            height: height,
            channels: channels
        }
    });

    return await raw.png().withMetadata().toBuffer();
}

class ImagePreviewDocument extends vscode.Disposable implements vscode.CustomDocument {

    private readonly _uri: vscode.Uri;
    private _data: Uint8Array;

    public static async create(uri: vscode.Uri): Promise<ImagePreviewDocument> {
        const data = await vscode.workspace.fs.readFile(uri);
        return new ImagePreviewDocument(uri, data);
    }

    private constructor(uri: vscode.Uri, data: Uint8Array) {
        super(() => { });
        this._uri = uri;
        this._data = data;
    }

    public get uri(): vscode.Uri {
        return this._uri;
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
        console.log(dataUrl);
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
    <div id="canvas-container"><canvas id="canvas-area"></canvas></div>
    <img id="image-preview" src="${dataUrl}">
</body>
</html>`;
    }
}
