// this script will be run within the webview itself,
// and cannot access the main vscode APIs directly.
(function () {
    const { type, width, height, scale, data } = JSON.parse(message);

    // write the pixels to an ImageData object
    //const pixels = new Uint8Array(Buffer.from(data, 'base64'));
    //const img = new ImageData(pixels, width, height);

    // write the ImageData to a background canvas
    //const backCanvas = document.createElement('canvas');
    //backCanvas.width = img.width;
    //backCanvas.height = img.height;
    //backCanvas.getContext('2d').putImageData(img, 0, 0);

    // scale the target canvas and write the background canvas to it
    //const targetCanvas = document.getElementById('canvas-area');
    //targetCanvas.width = img.width * scale;
    //targetCanvas.height = img.height * scale;
    //const ctx = targetCanvas.getContext('2d');
    //ctx.scale(scale, scale);
    //ctx.imageSmoothingEnabled = false;
    //ctx.drawImage(backCanvas, 0, 0);

    // handle messages sent from the extension to the webview
    window.addEventListener('message', event => {
        const message = event.data;
        switch (message.type) {
            case 'update':
                {
                    break;
                }
        }
    });
}());