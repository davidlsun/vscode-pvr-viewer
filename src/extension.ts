import * as vscode from 'vscode';
import { TextureEditorProvider, getActivePanel } from './editor';

const marketplaceId = '@ext:davidsun.pvr-viewer';
const viewType = 'pvr.view';

export function activate(context: vscode.ExtensionContext) {
    const provider = new TextureEditorProvider(context);
    const options = {
        "webviewOptions": { "retainContextWhenHidden": false },
        "supportsMultipleEditorsPerDocument": false
    };

    context.subscriptions.push(
        vscode.window.registerCustomEditorProvider(viewType, provider, options)
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('pvrViewer.openTextureFile', (uri: vscode.Uri) => {
            vscode.commands.executeCommand('vscode.openWith', uri, viewType);
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('pvrViewer.showTextureInfo', (_data: Object) => {
            const panel = getActivePanel();
            if (panel !== undefined) {
                const vt = panel.viewType;
                const title = panel.title;
                console.log(`active: ${vt}, ${title}`);
            }
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('pvrViewer.openSettings', () => {
            vscode.commands.executeCommand('workbench.action.openSettings', marketplaceId);
        })
    );
}
