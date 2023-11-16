// this script will run within the webview itself
// and cannot access the main vscode apis directly
(function () {
    const vscode = acquireVsCodeApi();

    const div = document.getElementById('preview-container');
    /*
    div.dataset.vscodeContext = {
        webviewSection: 'main',
        preventDefaultContextMenuItems: true
    };
    */

    function loadImage(buffer, width, height) {
        //vscode.postMessage({ command: 'info', text: `buffer length: ${buffer.byteLength}, (${width} x ${height})` });
        const imageData = new ImageData(new Uint8ClampedArray(buffer), width, height);
        const canvas = document.getElementById('preview-canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').putImageData(imageData, 0, 0);
    }

    // handle messages sent from the extension to the webview
    window.addEventListener('message', event => {
        const message = event.data;
        switch (message.command) {
            case 'load':
                // convert raw byte array to typed data array for loading into data view
                loadImage(message.buffer, message.width, message.height);
                break;
        }
    });

    // inform vscode we are ready to receive messages
    vscode.postMessage({ command: 'ready' });
}());
