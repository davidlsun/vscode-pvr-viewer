// this script will run within the webview itself
// and cannot access the main vscode apis directly
(function () {
    const vscode = acquireVsCodeApi();

    function loadImage(buffer) {
        //vscode.postMessage({ command: 'info', text: `buffer length: ${buffer.byteLength}` });
        const image = document.getElementById('preview-image');
        image.src = window.URL.createObjectURL(new Blob([buffer]));

        const container = document.getElementById('preview-container');
        const canvas = document.getElementById('preview-canvas');
    }

    // handle messages sent from the extension to the webview
    window.addEventListener('message', event => {
        const message = event.data;
        console.log("*** message event ***");
        console.log(message);
        switch (message.command) {
            case 'load':
                // convert raw byte array to typed data array for loading into data view
                loadImage(message.buffer);
                break;
        }
    });

    // inform vscode we are ready to receive messages
    vscode.postMessage({ command: 'ready' });
}());
