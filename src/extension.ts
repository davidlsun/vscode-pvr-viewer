import * as vscode from 'vscode';
import { ImagePreviewProvider } from './viewer';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(ImagePreviewProvider.register(context));
}
