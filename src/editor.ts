import * as vscode from 'vscode';
import PVRParser from './parser';

class ImagePreviewDocument extends vscode.Disposable implements vscode.CustomDocument {

    public readonly uri: vscode.Uri;
    public readonly buffer: ArrayBuffer;
    public readonly width: number;
    public readonly height: number;
    public readonly flipX: boolean;
    public readonly flipY: boolean;
    public readonly premultiplied: boolean;

    public static async create(uri: vscode.Uri): Promise<ImagePreviewDocument> {
        const data = await vscode.workspace.fs.readFile(uri);
        const parser = new PVRParser(data);
        const buffer = await parser.decompress(0, 0, 0, 0, false);
        return new ImagePreviewDocument(uri, buffer, parser.width, parser.height, parser.flipX, parser.flipY, parser.premultiplied);
    }

    private constructor(uri: vscode.Uri, buffer: ArrayBuffer, width: number, height: number, flipX: boolean, flipY: boolean, premultiplied: boolean) {
        super(() => { });
        this.uri = uri;
        this.buffer = buffer;
        this.width = width;
        this.height = height;
        this.flipX = flipX;
        this.flipY = flipY;
        this.premultiplied = premultiplied;
    }

    public dispose(): void {
    }
}

export default class ImagePreviewProvider implements vscode.CustomReadonlyEditorProvider<ImagePreviewDocument> {

    private static readonly viewType = 'pvr.view';

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
        // convert local path of project files to a uri we can use in the webview
        const scriptSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(this._context.extensionUri, 'out', 'webview.js'));
        const styleSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(this._context.extensionUri, 'assets', 'preview.css'));

        // use a content security policy to only allow loading styles from our extension directory
        panel.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._context.extensionUri]
        };

        // setup initial content in new webview
        panel.webview.html = this._getWebviewContent(panel.webview, scriptSrc, styleSrc);
        this._setWebviewMessageListener(panel.webview, document);
    }

    private _getWebviewContent(webview: vscode.Webview, scriptSrc: vscode.Uri, styleSrc: vscode.Uri): string {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src blob:; style-src ${webview.cspSource} 'unsafe-inline'; script-src ${webview.cspSource};">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="${styleSrc}" rel="stylesheet">
</head>
<body>
    <div id="__preview-container"><canvas id="preview-canvas"></canvas></div>
    <vscode-button id="howdy">Howdy partner!</vscode-button>
    <vscode-button id="howdy2">This is a button!</vscode-button>
    <script src="${scriptSrc}"></script>
</body>
</html>`;
    }

    private _setWebviewMessageListener(webview: vscode.Webview, document: ImagePreviewDocument): void {
        // handle messages posted by webview, coming to us in the editor
        webview.onDidReceiveMessage(
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
                        webview.postMessage({
                            command: 'preview',
                            buffer: document.buffer,
                            width: document.width,
                            height: document.height,
                            flipX: document.flipX,
                            flipY: document.flipY,
                            premultiplied: document.premultiplied
                        });
                        break;
                }
            },
            undefined,
            this._context.subscriptions);
    }
}
