import * as vscode from 'vscode';
import PVRParser from './parser';

class ImagePreviewDocument extends vscode.Disposable implements vscode.CustomDocument {

    public readonly uri: vscode.Uri;
    public buffer: Promise<ArrayBuffer>;
    public width: number = 0;
    public height: number = 0;
    public flipX: boolean = false;
    public flipY: boolean = false;
    public premultiplied: boolean = false;

    public static create(uri: vscode.Uri): ImagePreviewDocument {
        return new ImagePreviewDocument(uri);
    }

    private constructor(uri: vscode.Uri) {
        super(() => { });
        this.uri = uri;
        this.buffer = this._loadAsync();
    }

    private async _loadAsync(): Promise<ArrayBuffer> {
        const data = await vscode.workspace.fs.readFile(this.uri);
        const parser = new PVRParser(data);
        this.width = parser.width;
        this.height = parser.height;
        this.flipX = parser.flipX;
        this.flipY = parser.flipY;
        this.premultiplied = parser.premultiplied;
        //console.time(`decompress: ${this.uri}`);
        const buffer = await parser.decompress(0, 0, 0, 0, false);
        //console.timeEnd(`decompress: ${this.uri}`);
        return buffer;
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

    public openCustomDocument(uri: vscode.Uri, _openContext: vscode.CustomDocumentOpenContext, _token: vscode.CancellationToken): ImagePreviewDocument {
        //console.time(`open: ${uri}`);
        return ImagePreviewDocument.create(uri);
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
        //console.time(`webview: ${document.uri}`);
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
    <!--<vscode-button id="howdy">Howdy partner!</vscode-button>
    <vscode-button id="howdy2">This is a button!</vscode-button>-->
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
                        //console.timeEnd(`webview: ${document.uri}`);
                        this._sendPreviewCommand(webview, document);
                        break;
                    case 'previewDone':
                        //console.timeEnd(`open: ${document.uri}`);
                        break;
                }
            },
            undefined,
            this._context.subscriptions);
    }

    private async _sendPreviewCommand(webview: vscode.Webview, document: ImagePreviewDocument): Promise<void> {
        // here is a good place to wait for loading to finish
        const buffer = await document.buffer;
        
        webview.postMessage({
            command: 'preview',
            buffer: buffer,
            width: document.width,
            height: document.height,
            flipX: document.flipX,
            flipY: document.flipY,
            premultiplied: document.premultiplied
        });
    }
}
