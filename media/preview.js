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

    function loadImage(buffer, width, height, flipX, flipY, premultiplied) {
        // replace the canvas with our RGBA32 buffer
        const imageData = new ImageData(new Uint8ClampedArray(buffer), width, height, {
            colorSpace: 'srgb'
        });
        createImageBitmap(imageData, {
            imageOrientation: flipY ? 'flipY' : 'none',
            premultiplyAlpha: !premultiplied ? 'premultiply' : 'none',
            colorSpaceConversion: 'default'
        }).then(imageBitmap => {
            const canvas = document.getElementById('preview-canvas');
            canvas.width = width;
            canvas.height = height;

            // replace the canvas with the buffer
            const ctx = canvas.getContext('bitmaprenderer');
            ctx.transferFromImageBitmap(imageBitmap);

            // needing to flip x is rare
            if (flipX) {
                canvas.classList.add('flip-x');
            }
        });
    }

    // handle messages sent from the extension to the webview
    window.addEventListener('message', event => {
        const message = event.data;
        switch (message.command) {
            case 'load':
                // convert raw byte array to typed data array for loading into data view
                loadImage(message.buffer, message.width, message.height, message.flipX, message.flipY, message.premultiplied);
                break;
        }
    });

    // inform vscode we are ready to receive messages
    vscode.postMessage({ command: 'ready' });
}());
