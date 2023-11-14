import * as vscode from 'vscode';
import sharp from 'sharp';
import * as pvr from './pvr';
import * as pvrtc from './pvrtc';
import * as etc from './etc';

async function parsePVRFile(data: Uint8Array): Promise<Buffer> {
    // read fixed size header block
    const header = new DataView(data.buffer, data.byteOffset, pvr.HEADER_SIZE);
    const version = header.getUint32(0, true);
    const flags = header.getUint32(4, true); // 0 = no flags, 2 = pre-multiplied alpha
    const pixelFormat: pvr.PixelFormat = header.getUint32(8, true);
    const pixelFormatHigh = header.getUint32(12, true); // 0
    const colourSpace: pvr.ColourSpace = header.getUint32(16, true);
    const channelType: pvr.VariableType = header.getUint32(20, true);
    const height = header.getUint32(24, true); // 512 pixels
    const width = header.getUint32(28, true); // 512 pixels
    const depth = header.getUint32(32, true); // 1 pixel
    const numSurfaces = header.getUint32(36, true); // 1 in array
    const numFaces = header.getUint32(40, true); // 1 in cubemap
    const mipMapCount = header.getUint32(44, true); // 1 mip only
    const metaDataSize = header.getUint32(48, true); // 0 bytes

    // read metadata, 0 or more key-value entries
    const metadata = new DataView(data.buffer, data.byteOffset + pvr.HEADER_SIZE, metaDataSize);

    // read bulk color data
    const encData = new DataView(data.buffer, data.byteOffset + pvr.HEADER_SIZE + metaDataSize, data.byteLength - pvr.HEADER_SIZE - metaDataSize);
    const decData = new Uint8Array(width * height * 4);

    switch (pixelFormat) {
        case pvr.PixelFormat.PVRTCI_2bpp_RGB:
            if (channelType === pvr.VariableType.UnsignedByteNorm) {
                pvrtc.PVRTDecompressPVRTC(decData, encData, width, height, true); // linear and srgb
            }
            break;
        case pvr.PixelFormat.PVRTCI_2bpp_RGBA:
            if (channelType === pvr.VariableType.UnsignedByteNorm) {
                pvrtc.PVRTDecompressPVRTC(decData, encData, width, height, true); // linear and srgb
            }
            break;
        case pvr.PixelFormat.PVRTCI_4bpp_RGB:
            if (channelType === pvr.VariableType.UnsignedByteNorm) {
                pvrtc.PVRTDecompressPVRTC(decData, encData, width, height, false); // linear and srgb
            }
            break;
        case pvr.PixelFormat.PVRTCI_4bpp_RGBA:
            if (channelType === pvr.VariableType.UnsignedByteNorm) {
                pvrtc.PVRTDecompressPVRTC(decData, encData, width, height, false); // linear and srgb
            }
            break;
        case pvr.PixelFormat.PVRTCII_2bpp:
            if (channelType === pvr.VariableType.UnsignedByteNorm) {
                pvrtc.PVRTDecompressPVRTC(decData, encData, width, height, true); // linear and srgb
            }
            break;
        case pvr.PixelFormat.PVRTCII_4bpp:
            if (channelType === pvr.VariableType.UnsignedByteNorm) {
                pvrtc.PVRTDecompressPVRTC(decData, encData, width, height, false); // linear and srgb
            }
            break;
        case pvr.PixelFormat.ETC1:
            if (channelType === pvr.VariableType.UnsignedByteNorm && colourSpace === pvr.ColourSpace.Linear) {
                etc.decompress_ETC2_RGB(decData, encData, width, height);
            }
            break;
        case pvr.PixelFormat.ETC2_RGB:
            if (channelType === pvr.VariableType.UnsignedByteNorm) {
                etc.decompress_ETC2_RGB(decData, encData, width, height); // linear and srgb
            }
            break;
        case pvr.PixelFormat.ETC2_RGBA:
            if (channelType === pvr.VariableType.UnsignedByteNorm) {
                etc.decompress_ETC2_RGBA(decData, encData, width, height); // linear and srgb
            }
            break;
        case pvr.PixelFormat.ETC2_RGB_A1:
            if (channelType === pvr.VariableType.UnsignedByteNorm) {
                etc.decompress_ETC2_RGB_A1(decData, encData, width, height); // linear and srgb
            }
            break;
        case pvr.PixelFormat.EAC_R11:
            if (channelType === pvr.VariableType.UnsignedShortNorm && colourSpace === pvr.ColourSpace.Linear) {
                etc.decompress_EAC_R11(decData, encData, width, height, false);
            }
            break;
        case pvr.PixelFormat.EAC_R11:
            if (channelType === pvr.VariableType.SignedShortNorm && colourSpace === pvr.ColourSpace.Linear) {
                etc.decompress_EAC_R11(decData, encData, width, height, true);
            }
            break;
        case pvr.PixelFormat.EAC_RG11:
            if (channelType === pvr.VariableType.UnsignedIntegerNorm && colourSpace === pvr.ColourSpace.Linear) {
                etc.decompress_EAC_RG11(decData, encData, width, height, false);
            }
            break;
        case pvr.PixelFormat.EAC_RG11:
            if (channelType === pvr.VariableType.SignedIntegerNorm && colourSpace === pvr.ColourSpace.Linear) {
                etc.decompress_EAC_RG11(decData, encData, width, height, true);
            }
            break;
        case pvr.PixelFormat.PVRTCI_HDR_6bpp:
            if (channelType === pvr.VariableType.SignedFloat && colourSpace === pvr.ColourSpace.Linear) {
                // ...
            }
            break;
        case pvr.PixelFormat.PVRTCI_HDR_8bpp:
            if (channelType === pvr.VariableType.SignedFloat && colourSpace === pvr.ColourSpace.Linear) {
                // ...
            }
            break;
        case pvr.PixelFormat.PVRTCII_HDR_6bpp:
            if (channelType === pvr.VariableType.SignedFloat && colourSpace === pvr.ColourSpace.Linear) {
                // ...
            }
            break;
        case pvr.PixelFormat.PVRTCII_HDR_8bpp:
            if (channelType === pvr.VariableType.SignedFloat && colourSpace === pvr.ColourSpace.Linear) {
                // ...
            }
            break;
    }

    const image = sharp(decData, { raw: { width: width, height: height, channels: 4 } }).flip();
    return await image.png().withMetadata().toBuffer();
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
