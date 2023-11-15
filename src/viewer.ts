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
}

export default class ImagePreviewProvider implements vscode.CustomReadonlyEditorProvider<ImagePreviewDocument> {

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

    private constructor(private readonly _context: vscode.ExtensionContext) { }

    public async openCustomDocument(uri: vscode.Uri, _openContext: vscode.CustomDocumentOpenContext, _token: vscode.CancellationToken): Promise<ImagePreviewDocument> {
        const document = await ImagePreviewDocument.create(uri);
        return document;
    }

    public async resolveCustomEditor(document: ImagePreviewDocument, panel: vscode.WebviewPanel, _token: vscode.CancellationToken): Promise<void> {
        const mediaUri = vscode.Uri.joinPath(this._context.extensionUri, 'media');
        const storageUri = this._context.globalStorageUri;
        const previewUri = vscode.Uri.joinPath(storageUri, 'preview.png');

        // convert texture to png and write to disk so webview can read from disk
        const previewData = await PVRLoader.readFile(document.uri);
        await vscode.workspace.fs.createDirectory(storageUri);
        await vscode.workspace.fs.writeFile(previewUri, previewData);

        // configure new webview
        panel.webview.options = {
            enableScripts: false,
            localResourceRoots: [ mediaUri, storageUri ]
        };

        // convert local path of project files to a uri we can use in the webview
        const styleSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(mediaUri, 'main.css'));
        const previewSrc = panel.webview.asWebviewUri(previewUri);

        // set content in webview
        panel.webview.html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src *; style-src ${panel.webview.cspSource};">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="${styleSrc}" rel="stylesheet">
</head>
<body>
    <div class="main" data-vscode-context='{"webviewSection": "main", "preventDefaultContextMenuItems": true}'><img class="preview" draggable="false" src="${previewSrc}"></div>
</body>
</html>`;
    }
}
