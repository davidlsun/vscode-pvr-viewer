import * as vscode from 'vscode';
import PVRParser from './containers/parser';

class PanelTracker {
    private readonly _entries = new Set<{
        readonly uri: vscode.Uri;
        readonly panel: vscode.WebviewPanel;
        active: boolean;
    }>();

    public get(uri: vscode.Uri): vscode.WebviewPanel | undefined {
        for (const entry of this._entries) {
            if (entry.uri == uri) {
                return (entry.active ? entry.panel : undefined);
            }
        }
        return undefined;
    }

    public set(uri: vscode.Uri, panel: vscode.WebviewPanel, active: boolean): void {
        // try to update existing entry
        for (const entry of this._entries) {
            if (entry.uri == uri) {
                entry.active = active;
                return;
            }
        }

        // create a new entry
        const entry = { uri: uri, panel: panel, active: true };
        this._entries.add(entry);
    }

    public getActive(): vscode.WebviewPanel | undefined {
        for (const entry of this._entries) {
            if (entry.active) {
                return entry.panel;
            }
        }
        return undefined;
    }
}

const _tracker = new PanelTracker();

export function getActivePanel(): vscode.WebviewPanel | undefined {
    return _tracker.getActive();
}

class TextureDocument extends vscode.Disposable implements vscode.CustomDocument {

    public readonly uri: vscode.Uri;
    public readonly buffer: Promise<ArrayBuffer>;
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
        return parser.decompress(0, 0, 0, 0, false);
    }

    public override dispose(): void {
        super.dispose();
    }
}

export class TextureEditorProvider implements vscode.CustomReadonlyEditorProvider<TextureDocument> {

    public constructor(private readonly _context: vscode.ExtensionContext) { }

    public openCustomDocument(uri: vscode.Uri, _openContext: vscode.CustomDocumentOpenContext, _token: vscode.CancellationToken): TextureDocument {
        return new TextureDocument(uri);
    }

    public resolveCustomEditor(document: TextureDocument, panel: vscode.WebviewPanel, _token: vscode.CancellationToken): void {
        // webview panel passed to this method is freshly constructed, so track lifetime here
        _tracker.set(document.uri, panel, true);

        // panel has a dispose, but document doesn't really have one
        this._context.subscriptions.push(
            panel.onDidDispose(() => {
                // texture editor provider disposed
                _tracker.set(document.uri, panel, false);
            })
        );

        // whenever the panel changes, it informs us
        this._context.subscriptions.push(
            panel.onDidChangeViewState(message => {
                // focus/visibility of a panel has changed
                const panel = message.webviewPanel;
                _tracker.set(document.uri, panel, panel.active && panel.visible);
            })
        );

        // handle messages posted by webview, coming to us in the editor
        this._context.subscriptions.push(
            panel.webview.onDidReceiveMessage(message => {
                if (message.command == 'ready') {
                    sendPreviewCommand(panel.webview, document);
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
        premultiplied: document.premultiplied
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
    <div id="grid-container" data-vscode-context='{"webviewSection": "main", "preventDefaultContextMenuItems": true}'>
        <div id="canvas-wrapper"><canvas id="texture-canvas" data-vscode-context='{"webviewSection": "canvas", "preventDefaultContextMenuItems": true}'></canvas></div>
        <div id="bottom-bar">
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
        <div id="side-panel">
            <vscode-data-grid grid-template-columns="1fr 2fr">
                <vscode-data-grid-row row-type="header">
                    <vscode-data-grid-cell cell-type="columnheader" grid-column="1">Key</vscode-data-grid-cell>
                    <vscode-data-grid-cell cell-type="columnheader" grid-column="2">Value</vscode-data-grid-cell>
                </vscode-data-grid-row>
                <vscode-data-grid-row>
                    <vscode-data-grid-cell grid-column="1">Width</vscode-data-grid-cell>
                    <vscode-data-grid-cell grid-column="2">1024</vscode-data-grid-cell>
                </vscode-data-grid-row>
                <vscode-data-grid-row>
                    <vscode-data-grid-cell grid-column="1">Height</vscode-data-grid-cell>
                    <vscode-data-grid-cell grid-column="2">512</vscode-data-grid-cell>
                </vscode-data-grid-row>
                <vscode-data-grid-row>
                    <vscode-data-grid-cell grid-column="1">Depth</vscode-data-grid-cell>
                    <vscode-data-grid-cell grid-column="2">1</vscode-data-grid-cell>
                </vscode-data-grid-row>
                <vscode-data-grid-row>
                    <vscode-data-grid-cell grid-column="1">Pixel Format</vscode-data-grid-cell>
                    <vscode-data-grid-cell grid-column="2">R32 G32 B32</vscode-data-grid-cell>
                </vscode-data-grid-row>
                <vscode-data-grid-row>
                    <vscode-data-grid-cell grid-column="1">Channel Type</vscode-data-grid-cell>
                    <vscode-data-grid-cell grid-column="2">Signed Floating Point</vscode-data-grid-cell>
                </vscode-data-grid-row>
                <vscode-data-grid-row>
                    <vscode-data-grid-cell grid-column="1">Color Space</vscode-data-grid-cell>
                    <vscode-data-grid-cell grid-column="2">Linear</vscode-data-grid-cell>
                </vscode-data-grid-row>
                <vscode-data-grid-row>
                    <vscode-data-grid-cell grid-column="1">Mip Levels</vscode-data-grid-cell>
                    <vscode-data-grid-cell grid-column="2">11</vscode-data-grid-cell>
                </vscode-data-grid-row>
                <vscode-data-grid-row>
                    <vscode-data-grid-cell grid-column="1">Face</vscode-data-grid-cell>
                    <vscode-data-grid-cell grid-column="2">1</vscode-data-grid-cell>
                </vscode-data-grid-row>
                <vscode-data-grid-row>
                    <vscode-data-grid-cell grid-column="1">Array Surfaces</vscode-data-grid-cell>
                    <vscode-data-grid-cell grid-column="2">1</vscode-data-grid-cell>
                </vscode-data-grid-row>
                <vscode-data-grid-row>
                    <vscode-data-grid-cell grid-column="1">Data Size</vscode-data-grid-cell>
                    <vscode-data-grid-cell grid-column="2">8.0 MiB</vscode-data-grid-cell>
                </vscode-data-grid-row>
                <vscode-data-grid-row>
                    <vscode-data-grid-cell grid-column="1">Orientation</vscode-data-grid-cell>
                    <vscode-data-grid-cell grid-column="2">+X +Y +Z</vscode-data-grid-cell>
                </vscode-data-grid-row>
            </vscode-data-grid>
        </div>
    </div>
    <script src="${scriptSrc}"></script>
</body>
</html>`;
}
