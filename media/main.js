// this script will be run within the webview itself,
// and cannot access the main vscode APIs directly.
(function () {
    const jsonStr = '{ "data": "", "width": 256, "height": 256 }';
    const message = JSON.parse(jsonStr);
    const { data, width, height } = message;

    // write the pixels to an ImageData object
    const pixels = new Uint8ClampedArray(width * height * 4);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            //let color = data[y * width + x];
            pixels[i + 0] = x;//color.r;
            pixels[i + 1] = y;//color.g;
            pixels[i + 2] = 0;//color.b;
            pixels[i + 3] = 255;
        }
    }
    const img = new ImageData(pixels, width, height);

    // write the ImageData to a background canvas
    const backCanvas = document.createElement('canvas');
    backCanvas.width = img.width;
    backCanvas.height = img.height;
    backCanvas.getContext('2d').putImageData(img, 0, 0);

    // scale the target canvas and write the background canvas to it
    const scale = 1.0;
    const targetCanvas = document.getElementById('canvas-area');
    targetCanvas.width = img.width * scale;
    targetCanvas.height = img.height * scale;
    const ctx = targetCanvas.getContext('2d');
    ctx.scale(scale, scale);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(backCanvas, 0, 0);

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