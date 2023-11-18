import * as vscode from 'vscode';
import ImagePreviewProvider from './editor';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(ImagePreviewProvider.register(context));

    context.subscriptions.push(
        vscode.commands.registerCommand('pvrViewer.openSettings', () => {
            vscode.commands.executeCommand('workbench.action.openSettings', '@ext:davidsun.pvr-viewer');
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('pvrViewer.showTextureInfo', () => {
            // TODO
        })
    );
}
