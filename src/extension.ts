import * as vscode from 'vscode';
import TextureEditorProvider from './editor';

const marketplaceId = '@ext:davidsun.pvr-viewer';
const viewType = 'pvr.view';

export function activate(context: vscode.ExtensionContext) {
    const provider = new TextureEditorProvider(context);

    context.subscriptions.push(
        vscode.window.registerCustomEditorProvider(viewType, provider, {
            "webviewOptions": { "retainContextWhenHidden": false },
            "supportsMultipleEditorsPerDocument": false
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('pvrViewer.openSettings', () => {
            vscode.commands.executeCommand('workbench.action.openSettings', marketplaceId);
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('pvrViewer.toggleTextureInfo', (_data: Object) => {
            const panel = provider.activeWebviewPanel;
            if (panel !== undefined) {
                //console.log(`active: ${panel.viewType}, ${panel.title}`);
                panel.webview.postMessage({ command: 'toggleTextureInfo' });
            }
        })
    );
}
