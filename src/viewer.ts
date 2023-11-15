import * as vscode from 'vscode';
import PVRLoader from './loader';

class ImagePreviewDocument extends vscode.Disposable implements vscode.CustomDocument {

    public readonly uri: vscode.Uri;

    public static async create(uri: vscode.Uri): Promise<ImagePreviewDocument> {
        return new ImagePreviewDocument(uri);
    }

    private constructor(uri: vscode.Uri) {
        super(() => { });
        this.uri = uri;
    }

    public async convertToBase64(): Promise<string> {
        const buf = await PVRLoader.readFile(this.uri);
        return buf.toString('base64');
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
        const imgData = await document.convertToBase64();
        panel.webview.html = this._generateHtmlForWebview(panel.webview, imgData);
    }

    private _generateHtmlForWebview(webview: vscode.Webview, imgData: string): string {
        // convert local path of project files to a uri we can use in the webview
        const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'reset.css'));
        const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'vscode.css'));
        const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'media', 'main.css'));

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src * data:; style-src ${webview.cspSource};">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="${styleResetUri}" rel="stylesheet">
    <link href="${styleVSCodeUri}" rel="stylesheet">
    <link href="${styleMainUri}" rel="stylesheet">
</head>
<body>
    <div class="main" data-vscode-context='{"webviewSection": "main", "preventDefaultContextMenuItems": true}'><img id="image-preview" src="data:image/png;base64,${imgData}"></div>
</body>
</html>`;
    }
}
