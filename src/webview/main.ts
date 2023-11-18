import {
    provideVSCodeDesignSystem,
    vsCodeButton, Button,
    vsCodeCheckbox, Checkbox,
    vsCodeProgressRing, ProgressRing
} from '@vscode/webview-ui-toolkit';

provideVSCodeDesignSystem().register(
    vsCodeButton(),
    vsCodeCheckbox(),
    vsCodeProgressRing()
);

const vscode = acquireVsCodeApi();

window.addEventListener('load', main);

function main() {
    setWindowMessageListener();

    // inform vscode we are ready to receive messages
    vscode.postMessage({ command: 'ready' });

    /*
    // right clicking anywhere in the editor does nothing
    const div = document.getElementById('preview-container') as HTMLDivElement;
    div.dataset.vscodeContext = JSON.stringify({
        webviewSection: 'main',
        preventDefaultContextMenuItems: true
    });
    */

    // setup our test button
    const howdyButton = document.getElementById('howdy') as Button;
    howdyButton.addEventListener('click', () => {
        vscode.postMessage({
            command: 'info',
            text: 'hey there pardner!🕺'
        });
    });

    // setup our checkbox
    const helloToggle = document.getElementById('hello') as Checkbox;
    helloToggle.addEventListener('change', () => {
        vscode.postMessage({
            command: 'info',
            text: 'checkbox toggled'
        });
    });
}

function setWindowMessageListener() {
    // handle messages sent from the extension to the webview
    window.addEventListener('message', event => {
        const message = event.data;
        switch (message.command) {
            case 'preview':
                // image data has been received, so start the process to show it
                handlePreviewCommand(message.buffer, message.width, message.height, message.flipX, message.flipY, message.premultiplied);
                break;
        }
    });
}

function handlePreviewCommand(buffer: ArrayBuffer, width: number, height: number, flipX: boolean, flipY: boolean, premultiplied: boolean) {
    const imageData = new ImageData(new Uint8ClampedArray(buffer), width, height, {
        colorSpace: 'srgb'
    });
    createImageBitmap(imageData, {
        imageOrientation: flipY ? 'flipY' : 'none',
        premultiplyAlpha: !premultiplied ? 'premultiply' : 'none',
        colorSpaceConversion: 'default'
    }).then(imageBitmap => {
        const canvas = document.getElementById('preview-canvas') as HTMLCanvasElement;
        canvas.width = width;
        canvas.height = height;

        // replace the canvas with the buffer
        const ctx = canvas.getContext('bitmaprenderer') as ImageBitmapRenderingContext;
        ctx.transferFromImageBitmap(imageBitmap);

        // needing to flip x is rare
        if (flipX) {
            canvas.classList.add('flip-x');
        }
    }).then(() => {
        // hide spinner
        const progress = document.getElementById('preview-progress') as ProgressRing;
        progress.hidden = true;

        // inform extension we're done
        vscode.postMessage({ command: 'shown' });
    });
}
