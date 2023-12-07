import * as vscode from 'vscode';
import PVRParser from './containers/parser';

class PanelTracker {

    private readonly _entries = new Set<{
        readonly uri: vscode.Uri;
        readonly panel: vscode.WebviewPanel;
        active: boolean;
    }>();

    public add(uri: vscode.Uri, panel: vscode.WebviewPanel): boolean {
        // make sure there isn't already an entry for this panel
        for (const entry of this._entries) {
            if (entry.uri === uri) {
                return false;
            }
        }

        // create a new entry
        const entry = { uri: uri, panel: panel, active: true };
        this._entries.add(entry);
        return true;
    }

    public remove(uri: vscode.Uri): boolean {
        // remove an existing entry
        for (const entry of this._entries) {
            if (entry.uri === uri) {
                return this._entries.delete(entry);
            }
        }
        return false;
    }

    public update(uri: vscode.Uri, active: boolean): boolean {
        // try to update existing entry
        for (const entry of this._entries) {
            if (entry.uri === uri) {
                entry.active = active;
                return true;
            }
        }
        return false;
    }

    public getActive(): vscode.WebviewPanel | undefined {
        // there should be exactly 0 or 1 active panels
        for (const entry of this._entries) {
            if (entry.active) {
                return entry.panel;
            }
        }
        return undefined;
    }
}

class TextureDocument extends vscode.Disposable implements vscode.CustomDocument {

    public readonly uri: vscode.Uri;
    public readonly buffer: Promise<ArrayBuffer>;
    public width: number = 0;
    public height: number = 0;
    public flipY: boolean = false;
    public premultiplied: boolean = false;
    public faceOptions: string[] = [];
    public surfaceOptions: string[] = [];
    public mipOptions: string[] = [];
    public textureInfo: object[] = [];

    public constructor(uri: vscode.Uri) {
        super(() => { });
        this.uri = uri;
        this.buffer = this._startLoadAsync(0, 0, 0, 0);
    }

    private async _startLoadAsync(slice: number, face: number, surface: number, mip: number): Promise<ArrayBuffer> {
        const config = vscode.workspace.getConfiguration('pvrViewer');
        const data = await vscode.workspace.fs.readFile(this.uri);
        const parser = new PVRParser(data);
        this.width = parser.width;
        this.height = parser.height;
        this.flipY = parser.flipY;
        this.premultiplied = parser.premultiplied;
        this.faceOptions = parser.faceOptions;
        this.surfaceOptions = parser.surfaceOptions;
        this.mipOptions = parser.mipOptions;
        this.textureInfo = parser.textureInfo;
        return parser.decompress(slice, face, surface, mip, config.convertLinearToSrgbForDisplay);
    }

    public override dispose(): void {
        super.dispose();
    }
}

export default class TextureEditorProvider implements vscode.CustomReadonlyEditorProvider<TextureDocument> {

    private readonly _tracker = new PanelTracker();

    public constructor(private readonly _context: vscode.ExtensionContext) { }

    public openCustomDocument(uri: vscode.Uri, _openContext: vscode.CustomDocumentOpenContext, _token: vscode.CancellationToken): TextureDocument {
        return new TextureDocument(uri);
    }

    public resolveCustomEditor(document: TextureDocument, panel: vscode.WebviewPanel, _token: vscode.CancellationToken): void {
        // webview panel passed to this method is freshly constructed, so track lifetime here
        this._tracker.add(document.uri, panel);

        // panel has a dispose, but document doesn't really have one
        this._context.subscriptions.push(
            panel.onDidDispose(() => {
                // texture editor provider disposed
                this._tracker.remove(document.uri);
            })
        );

        // whenever the panel changes, it informs us
        this._context.subscriptions.push(
            panel.onDidChangeViewState(message => {
                // focus/visibility of a panel has changed
                const panel = message.webviewPanel;
                this._tracker.update(document.uri, panel.active && panel.visible);
            })
        );

        // handle messages posted by webview, coming to us in the editor
        this._context.subscriptions.push(
            panel.webview.onDidReceiveMessage(message => {
                switch (message.command) {
                    case 'ready':
                        sendPreviewCommand(panel.webview, document, message.slice, message.face, message.surface, message.mip);
                        break;
                }
            })
        );

        // setup initial content of new webview
        const config = vscode.workspace.getConfiguration('pvrViewer');
        const scriptSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(this._context.extensionUri, 'out', 'webview.js'));
        const styleSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(this._context.extensionUri, 'media', 'preview.css'));
        panel.webview.options = { enableScripts: true, localResourceRoots: [this._context.extensionUri] };
        panel.webview.html = getWebviewContent(panel.webview, config, scriptSrc, styleSrc);
    }

    public get activeWebviewPanel(): vscode.WebviewPanel | undefined {
        return this._tracker.getActive();
    }
}

async function sendPreviewCommand(webview: vscode.Webview, document: TextureDocument, _slice: number, _face: number, _surface: number, _mip: number): Promise<void> {
    // here is a good place to wait for loading to finish
    const buffer = await document.buffer;

    webview.postMessage({
        command: 'preview',
        buffer: buffer,
        width: document.width,
        height: document.height,
        flipY: document.flipY,
        premultiplied: document.premultiplied,
        faceOptions: document.faceOptions,
        surfaceOptions: document.surfaceOptions,
        mipOptions: document.mipOptions,
        textureInfo: document.textureInfo
    });
}

function getWebviewContent(webview: vscode.Webview, config: vscode.WorkspaceConfiguration, scriptSrc: vscode.Uri, styleSrc: vscode.Uri): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src 'none'; font-src ${webview.cspSource}; style-src ${webview.cspSource} 'unsafe-inline'; script-src ${webview.cspSource};">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="${styleSrc}" rel="stylesheet">
</head>
<body>
    <vscode-progress-ring id="progress-spinner"></vscode-progress-ring>
    <div id="main-container" data-vscode-context='{"preventDefaultContextMenuItems": true}'>
        <div id="main-area">
            <div id="canvas-wrapper"><canvas id="texture-canvas" class="${config.shrinkToFit ? 'shrink-to-fit' : ''}"></canvas></div>
            <div id="bottom-area" ${config.showControlBarByDefault ? '' : 'hidden'}>
                <div id="control-bar">
                    <div id="format-control">
                        <vscode-text-field id="format" value="R8 G8 B8 A8 UNorm" readonly>Pixel Format</vscode-text-field>
                    </div>
                    <div id="face-control" class="dropdown-container">
                        <label for="face">Face</label>
                        <vscode-dropdown id="face"></vscode-dropdown>
                    </div>
                    <div id="surface-control" class="dropdown-container">
                        <label for="surface">Surface</label>
                        <vscode-dropdown id="surface"></vscode-dropdown>
                    </div>
                    <div id="mip-control" class="dropdown-container">
                        <label for="mip">Mip Level</label>
                        <vscode-dropdown id="mip"></vscode-dropdown>
                    </div>
                    <div id="channel-control" class="checkbox-container">
                        <label for="channel-red">R</label><vscode-checkbox id="channel-red"></vscode-checkbox>
                        <label for="channel-green">G</label><vscode-checkbox id="channel-green"></vscode-checkbox>
                        <label for="channel-blue">B</label><vscode-checkbox id="channel-blue"></vscode-checkbox>
                        <label for="channel-alpha">A</label><vscode-checkbox id="channel-alpha"></vscode-checkbox>
                    </div>
                </div>
            </div>
        </div>
        <div id="side-area" ${config.showTextureInfoByDefault ? '' : 'hidden'}>
            <vscode-data-grid id="info-grid" grid-template-columns="2fr 3fr" aria-label="Texture Info"></vscode-data-grid>
        </div>
    </div>
    <script src="${scriptSrc}"></script>
</body>
</html>`;
}
