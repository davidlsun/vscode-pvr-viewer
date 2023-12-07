import {
    provideVSCodeDesignSystem,
    vsCodeButton,
    vsCodeCheckbox, Checkbox,
    vsCodeDropdown, Dropdown,
    vsCodeOption, Option,
    vsCodeTextField,
    vsCodeDataGrid, DataGrid,
    vsCodeDataGridRow,
    vsCodeDataGridCell,
    vsCodeProgressRing, ProgressRing,
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

const vscode = acquireVsCodeApi<PreviewState>();

class PreviewState {

    public sideAreaHidden: boolean;
    public bottomAreaHidden: boolean;
    public faceSelectedIndex: number;
    public surfaceSelectedIndex: number;
    public mipSelectedIndex: number;
    public channelRedChecked: boolean;
    public channelGreenChecked: boolean;
    public channelBlueChecked: boolean;
    public channelAlphaChecked: boolean;

    private get sideArea(): HTMLElement { return document.getElementById('side-area') as HTMLElement; }
    private get bottomArea(): HTMLElement { return document.getElementById('bottom-area') as HTMLElement; }
    private get faceDropdown(): Dropdown { return document.getElementById('face') as Dropdown; }
    private get surfaceDropdown(): Dropdown { return document.getElementById('surface') as Dropdown; }
    private get mipDropdown(): Dropdown { return document.getElementById('mip') as Dropdown; }
    private get channelRed(): Checkbox { return document.getElementById('channel-red') as Checkbox; }
    private get channelGreen(): Checkbox { return document.getElementById('channel-green') as Checkbox; }
    private get channelBlue(): Checkbox { return document.getElementById('channel-blue') as Checkbox; }
    private get channelAlpha(): Checkbox { return document.getElementById('channel-alpha') as Checkbox; }

    public constructor() {
        // constructor only called when there is no previous state
        this.sideAreaHidden = this.sideArea.hidden;
        this.bottomAreaHidden = this.bottomArea.hidden;
        this.faceSelectedIndex = this.faceDropdown.selectedIndex;
        this.surfaceSelectedIndex = this.surfaceDropdown.selectedIndex;
        this.mipSelectedIndex = this.mipDropdown.selectedIndex;
        this.channelRedChecked = this.channelRed.checked;
        this.channelGreenChecked = this.channelGreen.checked;
        this.channelBlueChecked = this.channelBlue.checked;
        this.channelAlphaChecked = this.channelAlpha.checked;
    }

    public applyStateToDocument(): void {
        // when restoring previous state, sync controls with saved state
        this.sideArea.hidden = this.sideAreaHidden;
        this.bottomArea.hidden = this.bottomAreaHidden;
        this.faceDropdown.selectedIndex = this.faceSelectedIndex;
        this.surfaceDropdown.selectedIndex = this.surfaceSelectedIndex;
        this.mipDropdown.selectedIndex = this.mipSelectedIndex;
        this.channelRed.checked = this.channelRedChecked;
        this.channelGreen.checked = this.channelGreenChecked;
        this.channelBlue.checked = this.channelBlueChecked;
        this.channelAlpha.checked = this.channelAlphaChecked;
    }
}

// if state is restored, it will be serialized json of type object
const state = vscode.getState() ?? new PreviewState();
if (!(state instanceof PreviewState)) {
    (state as PreviewState).applyStateToDocument();
}

function onChannelChanged(_oldValue: boolean | undefined, _newValue: boolean): void {
    console.log('channel changed');
}

function handlePreviewCommand(buffer: ArrayBuffer, width: number, height: number, flipY: boolean, premultiplied: boolean, faceOptions: string[], surfaceOptions: string[], mipOptions: string[], textureInfo: object[]): void {
    // set data grid with texture info
    const infoGrid = document.getElementById('info-grid') as DataGrid;
    infoGrid.rowsData = textureInfo;

    // set face selection controls
    const faceDropdown = document.getElementById('face') as Dropdown;
    for (let f = 0; f < faceOptions.length; f++) {
        faceDropdown.appendChild(new Option(faceOptions[f], f.toString()));
    }

    // set mip selection controls
    const surfaceDropdown = document.getElementById('surface') as Dropdown;
    for (let s = 0; s < surfaceOptions.length; s++) {
        surfaceDropdown.appendChild(new Option(surfaceOptions[s], s.toString()));
    }

    // set mip selection controls
    const mipDropdown = document.getElementById('mip') as Dropdown;
    for (let m = 0; m < mipOptions.length; m++) {
        mipDropdown.appendChild(new Option(mipOptions[m], m.toString()));
    }

    // set channel selection controls
    const channels = [
        document.getElementById('channel-red') as Checkbox,
        document.getElementById('channel-green') as Checkbox,
        document.getElementById('channel-blue') as Checkbox,
        document.getElementById('channel-alpha') as Checkbox
    ];
    for (let channel of channels) {
        channel.checked = true;
        channel.checkedChanged = onChannelChanged;
    }

    // start the process of setting the canvas
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
    }).then(() => {
        // hide spinner
        const progress = document.getElementById('progress-spinner') as ProgressRing;
        progress.hidden = true;

        // inform extension we're done
        vscode.postMessage({ command: 'shown' });
    });
}

function setWindowMessageListener(): void {
    // handle messages sent from the extension to the webview
    window.addEventListener('message', event => {
        const message = event.data;
        switch (message.command) {
            case 'preview':
                // image data has been received, so start the process to show it
                handlePreviewCommand(message.buffer, message.width, message.height, message.flipY, message.premultiplied, message.faceOptions, message.surfaceOptions, message.mipOptions, message.textureInfo);
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

function main(): void {
    // start handling messages sent from the extension
    setWindowMessageListener();

    // inform vscode we are ready to receive messages
    vscode.postMessage({ command: 'ready', mip: 0, surface: 0, face: 0, channel: [true, true, true, true] });
}

window.addEventListener('load', main);
