import {
    provideVSCodeDesignSystem,
    vsCodeButton,
    vsCodeCheckbox,
    vsCodeDropdown,
    vsCodeOption,
    vsCodeTextField,
    vsCodeDataGrid,
    vsCodeDataGridRow,
    vsCodeDataGridCell,
    vsCodeProgressRing, ProgressRing
} from '@vscode/webview-ui-toolkit';

provideVSCodeDesignSystem().register(
    vsCodeButton(),
    vsCodeCheckbox(),
    vsCodeDropdown(),
    vsCodeOption(),
    vsCodeTextField(),
    vsCodeDataGrid(),
    vsCodeDataGridRow(),
    vsCodeDataGridCell(),
    vsCodeProgressRing(),
);

class PreviewState {

    public sideAreaHidden: boolean;
    public bottomAreaHidden: boolean;

    public constructor() {
        // constructor only called when there is no previous state
        const sideArea = document.getElementById('side-area') as HTMLElement;
        this.sideAreaHidden = sideArea.hidden;

        const bottomArea = document.getElementById('bottom-area') as HTMLElement;
        this.bottomAreaHidden = bottomArea.hidden;
    }
}

function applyStateToDocument(state: PreviewState): void {
    const sideArea = document.getElementById('side-area') as HTMLElement;
    sideArea.hidden = state.sideAreaHidden;

    const bottomArea = document.getElementById('bottom-area') as HTMLElement;
    bottomArea.hidden = state.bottomAreaHidden;
}

const vscode = acquireVsCodeApi<PreviewState>();

// if state is restored, it will be serialized json of type object
const state = vscode.getState() ?? new PreviewState();
if (!(state instanceof PreviewState)) {
    applyStateToDocument(state);
}

window.addEventListener('load', main);

function main(): void {
    // start handling messages sent from the extension
    setWindowMessageListener();

    // inform vscode we are ready to receive messages
    vscode.postMessage({ command: 'ready' });
}

function setWindowMessageListener(): void {
    // handle messages sent from the extension to the webview
    window.addEventListener('message', event => {
        const message = event.data;
        switch (message.command) {
            case 'preview':
                // image data has been received, so start the process to show it
                handlePreviewCommand(message.buffer, message.width, message.height, message.flipX, message.flipY, message.premultiplied);
                break;
            case 'toggleTextureInfo':
                const sideArea = document.getElementById('side-area') as HTMLElement;
                state.sideAreaHidden = sideArea.hidden = !sideArea.hidden;
                vscode.setState(state);
                break;
            case 'toggleControlBar':
                const bottomArea = document.getElementById('bottom-area') as HTMLElement;
                state.bottomAreaHidden = bottomArea.hidden = !bottomArea.hidden;
                vscode.setState(state);
                break;
        }
    });
}

function handlePreviewCommand(buffer: ArrayBuffer, width: number, height: number, flipX: boolean, flipY: boolean, premultiplied: boolean): void {
    const imageData = new ImageData(new Uint8ClampedArray(buffer), width, height, {
        colorSpace: 'srgb'
    });
    createImageBitmap(imageData, {
        imageOrientation: flipY ? 'flipY' : 'none',
        premultiplyAlpha: !premultiplied ? 'premultiply' : 'none',
        colorSpaceConversion: 'default'
    }).then(imageBitmap => {
        const canvas = document.getElementById('texture-canvas') as HTMLCanvasElement;
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
        const progress = document.getElementById('progress-spinner') as ProgressRing;
        progress.hidden = true;

        // inform extension we're done
        vscode.postMessage({ command: 'shown' });
    });
}
