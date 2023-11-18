import * as vscode from 'vscode';
import ImagePreviewProvider from './editor';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(ImagePreviewProvider.register(context));

    context.subscriptions.push(
        vscode.commands.registerCommand('pvrViewer.openTextureFile', (uri: vscode.Uri) => {
            vscode.commands.executeCommand('vscode.openWith', uri, 'pvr.view');
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('pvrViewer.showTextureInfo', (_data: Object) => {
            //'activeWebviewPanelId'
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('pvrViewer.openSettings', () => {
            vscode.commands.executeCommand('workbench.action.openSettings', '@ext:davidsun.pvr-viewer');
        })
    );
}
