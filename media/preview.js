// this script will run within the webview itself
// and cannot access the main vscode apis directly
(function () {
    const vscode = acquireVsCodeApi();

    // right clicking anywhere in the editor does nothing
    const div = document.getElementById('preview-container');
    div.dataset.vscodeContext = JSON.stringify({
        webviewSection: 'main',
        preventDefaultContextMenuItems: true
    });

    function loadImage(buffer, width, height, flipX, flipY) {
        // blit the rgba32 buffer directly into a canvas
        const imageData = new ImageData(new Uint8ClampedArray(buffer), width, height);

        const canvas = document.getElementById('preview-canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.putImageData(imageData, 0, 0);

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // handle orientation metadata specified in the container format
        canvas.classList.add('flip-reset');
        if (flipX) { canvas.classList.add('flip-x'); }
        if (flipY) { canvas.classList.add('flip-y'); }
    }

    // handle messages sent from the extension to the webview
    window.addEventListener('message', event => {
        const message = event.data;
        switch (message.command) {
            case 'load':
                // convert raw byte array to typed data array for loading into data view
                loadImage(message.buffer, message.width, message.height, message.flipX, message.flipY);
                break;
        }
    });

    // inform vscode we are ready to receive messages
    vscode.postMessage({ command: 'ready' });
}());
