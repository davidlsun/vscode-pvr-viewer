import * as vscode from 'vscode';
import PVRParser from './containers/parser';

function loadConfig(): void {
    const config = vscode.workspace.getConfiguration('pvrViewer');
}

class ImagePreviewDocument extends vscode.Disposable implements vscode.CustomDocument {

    public readonly uri: vscode.Uri;
    public buffer: Promise<ArrayBuffer>;
    public width: number = 0;
    public height: number = 0;
    public flipX: boolean = false;
    public flipY: boolean = false;
    public premultiplied: boolean = false;

    public constructor(uri: vscode.Uri) {
        super(() => { });
        this.uri = uri;
        this.buffer = this._startLoadAsync();
    }

    private async _startLoadAsync(): Promise<ArrayBuffer> {
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
        return new ImagePreviewDocument(uri);
    }

    public resolveCustomEditor(document: ImagePreviewDocument, panel: vscode.WebviewPanel, _token: vscode.CancellationToken): void {
        // convert local path of project files to a uri we can use in the webview
        const scriptSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(this._context.extensionUri, 'out', 'webview.js'));
        const styleSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(this._context.extensionUri, 'assets', 'preview.css'));
        const iconsSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(this._context.extensionUri, 'node_modules', '@vscode/codicons', 'dist', 'codicon.css'));

        // use a content security policy to only allow loading styles from our extension directory
        panel.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._context.extensionUri]
        };

        // setup initial content in new webview
        //console.time(`webview: ${document.uri}`);
        panel.webview.html = this._getWebviewContent(panel.webview, scriptSrc, styleSrc, iconsSrc);
        this._setWebviewMessageListener(panel.webview, document);
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
                    case 'shown':
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

    private _getWebviewContent(webview: vscode.Webview, scriptSrc: vscode.Uri, styleSrc: vscode.Uri, iconsSrc: vscode.Uri): string {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src 'none'; font-src ${webview.cspSource}; style-src ${webview.cspSource} 'unsafe-inline'; script-src ${webview.cspSource};">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="${styleSrc}" rel="stylesheet">
    <link href="${iconsSrc}" rel="stylesheet">
</head>
<body>
    <vscode-progress-ring id="progress-spinner"></vscode-progress-ring>
    <div id="grid-container" data-vscode-context='{"webviewSection": "main", "preventDefaultContextMenuItems": true}'>
        <div id="canvas-wrapper"><canvas id="texture-canvas" data-vscode-context='{"webviewSection": "canvas", "preventDefaultContextMenuItems": true}'></canvas></div>
        <div id="colorspace-control" class="dropdown-container">
            <label for="colorspace">Color Space</label>
            <vscode-dropdown id="colorspace">
                <vscode-option>Linear</vscode-option>
                <vscode-option>sRGB</vscode-option>
                <vscode-option>BT601</vscode-option>
                <vscode-option>BT709</vscode-option>
                <vscode-option>BT2020</vscode-option>
            </vscode-dropdown>
        </div>
        <div id="channels-control" class="checkbox-container">
            <vscode-checkbox id="channel-red">R</vscode-checkbox>
            <vscode-checkbox id="channel-green">G</vscode-checkbox>
            <vscode-checkbox id="channel-blue">B</vscode-checkbox>
            <vscode-checkbox id="channel-alpha">A</vscode-checkbox>
        </div>
        <div id="format-control">
            <vscode-text-field id="pixel-format" value="R8 G8 B8 A8 UNorm" readonly>Pixel Format</vscode-text-field>
        </div>
        <div id="miplevel-control" class="dropdown-container">
            <label for="miplevel">Mip Level</label>
            <vscode-dropdown id="miplevel">
                <vscode-option>0 : 1024 x 1024</vscode-option>
                <vscode-option>1 : 512 x 512</vscode-option>
                <vscode-option>2 : 256 x 256</vscode-option>
                <vscode-option>3 : 128 x 128</vscode-option>
                <vscode-option>4 : 64 x 64</vscode-option>
                <vscode-option>5 : 32 x 32</vscode-option>
                <vscode-option>6 : 16 x 16</vscode-option>
                <vscode-option>7 : 8 x 8</vscode-option>
                <vscode-option>8 : 4 x 4</vscode-option>
                <vscode-option>9 : 2 x 2</vscode-option>
                <vscode-option>10 : 1 x 1</vscode-option>
            </vscode-dropdown>
        </div>
    </div>
    <script src="${scriptSrc}"></script>
</body>
</html>`;
    }
}
