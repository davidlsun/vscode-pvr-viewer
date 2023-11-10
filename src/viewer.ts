import * as vscode from 'vscode';
import * as path from 'path';

function parseByteFormat(byteData: Uint8Array) {
    return { pixels: true, width: 256, height: 128 };
}

class ImagePreviewDocument extends vscode.Disposable implements vscode.CustomDocument {

    private readonly _uri: vscode.Uri;
    private _data: Uint8Array;

    private static async readFile(uri: vscode.Uri): Promise<Uint8Array> {
        return vscode.workspace.fs.readFile(uri);
    }

    static async create(uri: vscode.Uri): Promise<ImagePreviewDocument | PromiseLike<ImagePreviewDocument>> {
        const data = await ImagePreviewDocument.readFile(uri);
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

    public get imageData(): string {
        const imageDesc = parseByteFormat(this._data);
        return JSON.stringify(imageDesc);
    }

    dispose() {
        super.dispose();
    }
}

export class ImagePreviewProvider implements vscode.CustomReadonlyEditorProvider<ImagePreviewDocument> {

    private static readonly viewType = 'pvr-viewer';

    public static register(context: vscode.ExtensionContext): vscode.Disposable {
        return vscode.window.registerCustomEditorProvider(
            ImagePreviewProvider.viewType,
            new ImagePreviewProvider(context),
            {
                webviewOptions: {
                    retainContextWhenHidden: false
                },
                supportsMultipleEditorsPerDocument: false
            });
    }

    constructor(private readonly _context: vscode.ExtensionContext) { }

    async openCustomDocument(uri: vscode.Uri, _openContext: vscode.CustomDocumentOpenContext, _token: vscode.CancellationToken): Promise<ImagePreviewDocument> {
        const document = await ImagePreviewDocument.create(uri);
        return document;
    }

    async resolveCustomEditor(document: ImagePreviewDocument, panel: vscode.WebviewPanel, _token: vscode.CancellationToken): Promise<void> {
        // setup initial content for the webview
        panel.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._context.extensionUri]
        };
        panel.webview.html = this._generateHtmlContent(panel.webview, document.imageData);

        // listen for any file changes
        const watcherAction = async (e: vscode.Uri) => {
            const docUriPath = document.uri.path.replace(/(\/[A-Z]:\/)/, (match) => match.toLowerCase());
            if (docUriPath === e.path) {
                const newDocument = await ImagePreviewDocument.create(vscode.Uri.parse(e.path));
                panel.webview.postMessage(newDocument.imageData);
            }
        };

        const absolutePath = document.uri.path;
        const fileName = path.parse(absolutePath).base;
        const dirName = path.parse(absolutePath).dir;
        const fileUri = vscode.Uri.file(dirName);
        const pattern = new vscode.RelativePattern(fileUri, fileName);
        const globalWatcher = vscode.workspace.createFileSystemWatcher(pattern);
        const globalChangeFileSubscription = globalWatcher.onDidChange(watcherAction);

        panel.onDidDispose(() => {
            globalChangeFileSubscription.dispose();
        });
    }

    private _generateHtmlContent(webview: vscode.Webview, imageData: string): string {
        // convert local path of project files to a uri we can use in the webview
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._context.extensionUri, 'media', 'main.js'));
        const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(this._context.extensionUri, 'media', 'reset.css'));
        const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.joinPath(this._context.extensionUri, 'media', 'vscode.css'));
        const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._context.extensionUri, 'media', 'main.css'));

        // use a content security policy to only allow loading styles from our extension
        // directory, and use a nonce to only allow a specific script to be run.
        const nonce = getNonce();

        return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="${styleResetUri}" rel="stylesheet>
                <link href="${styleVSCodeUri}" rel="stylesheet>
                <link href="${styleMainUri}" rel="stylesheet>
            </head>
            <body>
                <div id="canvas-container"><canvas id="canvas-area"></canvas></div>
                <script nonce="${nonce}" src="${scriptUri}"></script>
            </body>
            </html>`;
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
