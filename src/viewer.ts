import * as vscode from 'vscode';
import * as path from 'path';

function generateHTMLCanvas(imageData: string): string {
    return `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
        <div id="canvas-container" style="overflow: auto">
            <canvas id="canvas-area" style="padding: 0; margin: auto; display: block;"></canvas>
        </div>
        <script>
            var scale = 1;
            const jsonStr = '${imageData}';
            var message = JSON.parse(jsonStr);
            const canvas = document.getElementById('canvas-area');

            function scaleCanvas(targetCanvas, scale) {
                const { pixels, width, height } = message;

                // Write the pixels to an ImageData object
                const data = new Uint8ClampedArray(width * height * 4);
                for (let row = 0; row < height; row++) {
                    for (let col = 0; col < width; col++) {
                        let color = pixels[row * width + col];
                        let i = row * 4 * width + col * 4;
                        data[i + 0] = color.r;
                        data[i + 1] = color.g;
                        data[i + 2] = color.b;
                        data[i + 3] = 255;
                    }
                }
                const id = new ImageData(data, width, height);

                // Write the ImageData to a background canvas
                const backCanvas = document.createElement('canvas');
                backCanvas.width = id.width;
                backCanvas.height = id.height;
                backCanvas.getContext('2d').putImageData(id, 0, 0);

                // Scale the target canvas and write the background canvas to it
                const ctx = targetCanvas.getContext('2d');
                targetCanvas.width = width * scale;
                targetCanvas.height = height * scale;
                ctx.scale(scale, scale);
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(backCanvas, 0, 0);
            }

            function showImg(scale) {
                const { pixels, width, height } = message;
                scaleCanvas(canvas, scale);
            }
            showImg(scale);

            window.addEventListener('message', event => {
                message = event.data;
                showImg(scale);
            });
        </script>
        </body>
        </html>`;
}

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

    async resolveCustomEditor(document: ImagePreviewDocument, webviewPanel: vscode.WebviewPanel, _token: vscode.CancellationToken): Promise<void> {
        // setup initial content for the webview
        webviewPanel.webview.options = { enableScripts: true };
        webviewPanel.webview.html = generateHTMLCanvas(document.imageData);

        const watcherAction = async (e: vscode.Uri) => {
            const docUriPath = document.uri.path.replace(/(\/[A-Z]:\/)/, (match) => match.toLowerCase());
            if (docUriPath === e.path) {
                const newDocument = await ImagePreviewDocument.create(vscode.Uri.parse(e.path));
                webviewPanel.webview.postMessage(newDocument.imageData);
            }
        };

        const absolutePath = document.uri.path;
        const fileName = path.parse(absolutePath).base;
        const dirName = path.parse(absolutePath).dir;
        const fileUri = vscode.Uri.file(dirName);
        const pattern = new vscode.RelativePattern(fileUri, fileName);
        const globalWatcher = vscode.workspace.createFileSystemWatcher(pattern);
        const globalChangeFileSubscription = globalWatcher.onDidChange(watcherAction);

        webviewPanel.onDidDispose(() => {
            globalChangeFileSubscription.dispose();
        });
    }
}
