import * as vscode from 'vscode';
import PVRLoader from './loader';

class ImagePreviewDocument extends vscode.Disposable implements vscode.CustomDocument {

    public readonly uri: vscode.Uri;

    private _bitmap: Uint8Array | undefined;

    public static async create(uri: vscode.Uri): Promise<ImagePreviewDocument> {
        return new ImagePreviewDocument(uri);
    }

    private constructor(uri: vscode.Uri) {
        super(() => { });
        this.uri = uri;
    }

    public dispose(): void {
    }

    public async initPanel(panel: vscode.WebviewPanel, context: vscode.ExtensionContext): Promise<void> {
        // convert texture to png and write to disk so webview can read from disk
        this._bitmap = await PVRLoader.readFile(this.uri);

        // use a content security policy to only allow loading styles from our extension directory
        panel.webview.options = {
            enableScripts: true,
            localResourceRoots: [context.extensionUri]
        };

        // use a nonce to only allow a specific script to be run
        const nonce = getNonce();

        // convert local path of project files to a uri we can use in the webview
        const styleSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'media', 'viewer.css'));
        const scriptSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'media', 'viewer.js'));

        // setup initial content in new webview
        panel.webview.html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src * blob:; style-src ${panel.webview.cspSource}; script-src 'nonce-${nonce}';">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="${styleSrc}" rel="stylesheet">
</head>
<body>
    <div id="preview-container" data-vscode-context='{"preventDefaultContextMenuItems":true}'>
        <canvas id="preview-canvas"></canvas>
        <img id="preview-image" draggable="false">
    </div>
    <script nonce="${nonce}" src="${scriptSrc}"></script>
</body>
</html>`;

        // handle messages from webview
        panel.webview.onDidReceiveMessage(
            message => {
                switch (message.command) {
                    case 'info':
                        vscode.window.showInformationMessage(message.text);
                        break;
                    case 'warn':
                        vscode.window.showWarningMessage(message.text);
                        break;
                    case 'error':
                        vscode.window.showErrorMessage(message.text);
                        break;
                    case 'ready':
                        let bitmap = this._bitmap;
                        if (bitmap) {
                            if (bitmap.byteOffset > 0 || bitmap.byteLength < bitmap.buffer.byteLength) {
                                bitmap = bitmap.slice(bitmap.byteOffset, bitmap.byteOffset + bitmap.byteLength);
                            }
                            panel.webview.postMessage({ command: 'load', buffer: bitmap.buffer });
                        }
                        break;
                }
            },
            undefined,
            context.subscriptions);
    }
}

export default class ImagePreviewProvider implements vscode.CustomReadonlyEditorProvider<ImagePreviewDocument> {

    private static readonly viewType = 'pvr-viewer';

    public static register(context: vscode.ExtensionContext): vscode.Disposable {
        return vscode.window.registerCustomEditorProvider(
            ImagePreviewProvider.viewType,
            new ImagePreviewProvider(context),
            {
                webviewOptions: { retainContextWhenHidden: false },
                supportsMultipleEditorsPerDocument: false
            });
    }

    private constructor(private readonly _context: vscode.ExtensionContext) { }

    public async openCustomDocument(uri: vscode.Uri, _openContext: vscode.CustomDocumentOpenContext, _token: vscode.CancellationToken): Promise<ImagePreviewDocument> {
        return await ImagePreviewDocument.create(uri);
    }

    public async resolveCustomEditor(document: ImagePreviewDocument, panel: vscode.WebviewPanel, _token: vscode.CancellationToken): Promise<void> {
        document.initPanel(panel, this._context);
    }
}

function getNonce(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
