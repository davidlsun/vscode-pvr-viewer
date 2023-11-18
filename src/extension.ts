import * as vscode from 'vscode';
import ImagePreviewProvider from './editor';

const viewType = 'pvr.view';

export function activate(context: vscode.ExtensionContext) {
    const provider = new ImagePreviewProvider(context);
    const options = {
        "webviewOptions": { "retainContextWhenHidden": false },
        "supportsMultipleEditorsPerDocument": false
    };
    const disposable = vscode.window.registerCustomEditorProvider(viewType, provider, options);

    context.subscriptions.push(disposable);

    context.subscriptions.push(
        vscode.commands.registerCommand('pvrViewer.openTextureFile', (uri: vscode.Uri) => {
            vscode.commands.executeCommand('vscode.openWith', uri, 'pvr.view');
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('pvrViewer.showTextureInfo', (_data: Object) => {
            // we need to find the webview panel to post a message to it
            const uri = _data.uri;
            const panels = provider.getCachedWebviewPanel(uri);
            if (panels.length > 1)
            {
                const panel = panels[0];
                //panel.
                //'activeWebviewPanelId'
            }
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('pvrViewer.openSettings', () => {
            vscode.commands.executeCommand('workbench.action.openSettings', '@ext:davidsun.pvr-viewer');
        })
    );
}
