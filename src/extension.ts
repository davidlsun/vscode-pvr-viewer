import * as vscode from 'vscode';
import ImagePreviewProvider from './editor';

const vscodeExtensionLink = '@ext:davidsun.pvr-viewer';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(ImagePreviewProvider.register(context));

    context.subscriptions.push(
        vscode.commands.registerCommand('pvrViewer.openSettings', () => {
            vscode.commands.executeCommand('workbench.action.openSettings', vscodeExtensionLink);
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('pvrViewer.showTextureInfo', () => {
            const panel = vscode.window.createWebviewPanel('pvr.info', 'Texture Info', vscode.ViewColumn.Two, { enableScripts: true });
            panel.webview.html = getWebviewContext();

            panel.webview.onDidReceiveMessage(message => {
                switch (message.command) {
                    case 'error':
                        vscode.window.showErrorMessage(message.text);
                        break;
                }
            }, undefined, context.subscriptions);
        })
    );
}

function getWebviewContext(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Texture Info</title>
</head>
<body>
    <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
    <h1 id="lines-of-code-counter">0</h1>

    <script>
        const counter = document.getElementById('lines-of-code-counter');

        let count = 0;
        setInterval(() => {
            counter.textContent = count++;
        }, 100);
    </script>
</body>
</html>`;
}
