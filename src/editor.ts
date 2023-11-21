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
    public flipX: boolean = false;
    public flipY: boolean = false;
    public premultiplied: boolean = false;
    public textureInfo: object[] = [];

    public constructor(uri: vscode.Uri) {
        super(() => { });
        this.uri = uri;
        this.buffer = this._startLoadAsync();
    }

    private async _startLoadAsync(): Promise<ArrayBuffer> {
        const config = vscode.workspace.getConfiguration('pvrViewer');
        const data = await vscode.workspace.fs.readFile(this.uri);
        const parser = new PVRParser(data);
        this.width = parser.width;
        this.height = parser.height;
        this.flipX = parser.flipX;
        this.flipY = parser.flipY;
        this.premultiplied = parser.premultiplied;
        this.textureInfo = parser.textureInfo;
        return parser.decompress(0, 0, 0, 0, config.convertLinearToSrgbForDisplay);
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
                        sendPreviewCommand(panel.webview, document);
                        break;
                }
            })
        );

        // setup initial content of new webview
        const scriptSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(this._context.extensionUri, 'out', 'webview.js'));
        const styleSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(this._context.extensionUri, 'media', 'preview.css'));
        const iconsSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(this._context.extensionUri, 'node_modules', '@vscode/codicons', 'dist', 'codicon.css'));
        panel.webview.options = { enableScripts: true, localResourceRoots: [this._context.extensionUri] };
        panel.webview.html = getWebviewContent(panel.webview, scriptSrc, styleSrc, iconsSrc);
    }

    public get activeWebviewPanel(): vscode.WebviewPanel | undefined {
        return this._tracker.getActive();
    }
}

async function sendPreviewCommand(webview: vscode.Webview, document: TextureDocument): Promise<void> {
    // here is a good place to wait for loading to finish
    const buffer = await document.buffer;

    webview.postMessage({
        command: 'preview',
        buffer: buffer,
        width: document.width,
        height: document.height,
        flipX: document.flipX,
        flipY: document.flipY,
        premultiplied: document.premultiplied,
        textureInfo: document.textureInfo
    });
}

function getWebviewContent(webview: vscode.Webview, scriptSrc: vscode.Uri, styleSrc: vscode.Uri, iconsSrc: vscode.Uri): string {
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
    <div id="main-container" data-vscode-context='{"webviewSection": "main", "preventDefaultContextMenuItems": true}'>
        <div id="main-area">
            <div id="canvas-wrapper"><canvas id="texture-canvas"></canvas></div>
            <div id="bottom-area" hidden>
                <div id="controls-bar">
                    <div id="format-control">
                        <vscode-text-field id="pixel-format" value="R8 G8 B8 A8 UNorm" readonly>Pixel Format</vscode-text-field>
                    </div>
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
                    <div id="channels-control" class="checkbox-container">
                        <vscode-checkbox id="channel-red">R</vscode-checkbox>
                        <vscode-checkbox id="channel-green">G</vscode-checkbox>
                        <vscode-checkbox id="channel-blue">B</vscode-checkbox>
                        <vscode-checkbox id="channel-alpha">A</vscode-checkbox>
                    </div>
                </div>
            </div>
        </div>
        <div id="side-area" hidden>
            <vscode-data-grid id="info-grid" grid-template-columns="2fr 3fr" aria-label="Texture Info">
            </vscode-data-grid>
        </div>
    </div>
    <script src="${scriptSrc}"></script>
</body>
</html>`;
}
