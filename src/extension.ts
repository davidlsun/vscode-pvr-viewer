import * as vscode from 'vscode';
import ImagePreviewProvider from './editor';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(ImagePreviewProvider.register(context));
}
