// this script will be run within the webview itself,
// and cannot access the main vscode APIs directly.

// get this once only and save it for later use
const vscode = acquireVsCodeApi();

function handleUpdate(message) {
    console.log('handle message');
    console.log(message);
    vscode.postMessage({ command: 'warn', text: 'lkasdfjklasjkldflkjasdf' });
}

function loadImage(buffer) {
    vscode.postMessage({ command: 'info', text: `data size in bytes: ${buffer.byteLength}` });
    const container = document.getElementById('preview-container');
    const canvas = document.getElementById('preview-canvas');
}

(function () {
    // handle messages sent from the extension to the webview
    window.addEventListener('message', event => {
        const message = event.data;
        switch (message.command) {
            case 'update':
                handleUpdate(message);
                break;
            case 'load':
                // convert raw byte array to typed data array for loading into data view
                const buffer = message.image;
                loadImage(buffer);
                break;
        }
    });

    // inform vscode we are ready to receive messages
    vscode.postMessage({ command: 'ready' });
}());
