import * as pvr from './pvr';
import * as pvrtc from '../formats/pvrtc';
import * as etc from '../formats/etc';
import * as eightcc from '../formats/eightcc';

type int = number;
type float = number;
type byte = number;

const HeaderSize = 52;

const saturate = (x: int): int => ((x < 0) ? 0 : ((x > 255) ? 255 : x));
const srgbToLinear = (x: float): float => (x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) * 1.055, 2.4)); // sRGB EOTF

function linearToSrgb(buf: Uint8Array, width: int, height: int): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            for (let c = 0; c < 3; c++) {
                const x = buf[i + c] / 255.0;
                const f = (x <= 0.0031308 ? x * 12.92 : 1.055 * Math.pow(x, 1.0 / 2.4) - 0.055); // sRGB EOTF^-1
                buf[i + c] = saturate(Math.round(f * 255.0));
            }
        }
    }
}

function getEightcc(view: DataView, offset: int): string {
    const cc = Array<byte>(8);
    for (let i = 0; i < 8; i++) {
        cc[i] = view.getUint8(offset + i);
        if (cc[i] === 0) {
            cc[i] = 0x20;
        } else if (i >= 4) {
            cc[i] += 0x30;
        }
    }
    return String.fromCharCode(...cc);
}

export default class PVRParser {

    private _data: Uint8Array;
    private _dataOffset : int;

    public readonly width: int;
    public readonly height: int;
    public readonly depth: int; // 1 pixel
    public readonly numSurfaces: int; // 1 in array
    public readonly numFaces: int; // 1 in cubemap
    public readonly mipMapCount: int; // 1 mip level
    public readonly pixelFormat: pvr.PixelFormat;
    public readonly eightcc: string;
    public readonly colorSpace: pvr.ColorSpace;
    public readonly channelType: pvr.VariableType;
    public readonly premultiplied: boolean;
    public readonly flipX: boolean;
    public readonly flipY: boolean;
    public readonly flipZ: boolean;
    public readonly maxRange: float;

    public constructor(data: Uint8Array) {
        this._data = data;

        const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
        if (data.length < HeaderSize) { throw new Error(); }

        // make sure file is valid pvr texture
        const version = view.getUint32(0, true);
        if (version !== 0x03525650) { throw new Error(); }

        // immediately parse headers to get texture properties
        this.premultiplied = ((view.getUint32(4, true) & 2) !== 0);
        if (view.getUint32(12, true) === 0) {
            this.pixelFormat = view.getUint32(8, true);
            this.eightcc = '';
        } else {
            this.pixelFormat = pvr.PixelFormat.NumCompressedPFs;
            this.eightcc = getEightcc(view, 8);
        }
        this.colorSpace = view.getUint32(16, true);
        this.channelType = view.getUint32(20, true);
        this.height = view.getUint32(24, true);
        this.width = view.getUint32(28, true);
        this.depth = view.getUint32(32, true);
        this.numSurfaces = view.getUint32(36, true);
        this.numFaces = view.getUint32(40, true);
        this.mipMapCount = view.getUint32(44, true);
        const metaDataSize = view.getUint32(48, true);

        this._dataOffset = HeaderSize + metaDataSize;

        // set default values for optional properties
        this.flipX = false;
        this.flipY = false;
        this.flipZ = false;
        this.maxRange = 6.0;

        // read all metadata entries
        let metaView = new DataView(data.buffer, data.byteOffset + HeaderSize, metaDataSize);
        for (let pos = 0; pos < metaDataSize; ) {
            if (metaDataSize - pos < 12) { console.log('pvr-viewer: corrupt metadata'); break; }
            const creator = metaView.getUint32(pos + 0, true);
            const semantic: pvr.MetaData = metaView.getUint32(pos + 4, true);
            const metaLen = metaView.getUint32(pos + 8, true);
            pos += 12;
            if (metaDataSize - pos < metaLen) { console.log('pvr-viewer: corrupt metadata'); break; }
            switch (semantic) {
                case pvr.MetaData.TextureOrientation:
                    if (metaLen !== 3) { console.log('pvr-viewer: corrupt TextureOrientation'); break; }
                    this.flipX = (metaView.getUint8(pos + 0) !== pvr.Orientation.Right);
                    this.flipY = (metaView.getUint8(pos + 1) !== pvr.Orientation.Down);
                    this.flipZ = (metaView.getUint8(pos + 2) !== pvr.Orientation.In);
                    break;
                case pvr.MetaData.PerChannelType:
                    console.log(`PerChannelType: ${metaLen} bytes`);
                    for (let i = 0; i < metaLen; i++) {
                        //console.log(`${i}: ${metaView.getUint8(pos + i)}`);
                    }
                    break;
                case pvr.MetaData.BorderData:
                    console.log(`BorderData: ${metaLen} bytes`);
                    for (let i = 0; i < metaLen; i++) {
                        //console.log(`${i}: ${metaView.getUint8(pos + i)}`);
                    }
                    break;
                case pvr.MetaData.MaxRange:
                    if (metaLen !== 4) { console.log('pvr-viewer: corrupt MaxRange'); break; }
                    this.maxRange = metaView.getFloat32(pos + 0, true);
                    break;
                default:
                    console.log(`pvr-viewer: unknown semantic ${semantic}`);
                    break;
            }
            pos += metaLen;
        }
    }

    public async decompress(_zdepth: int, _surface: int, _face: int, _mip: int, srgbOutput: boolean): Promise<ArrayBuffer> {
        const width = this.width;
        const height = this.height;

        // the output is an array buffer, to be passed to the webview
        const output = new ArrayBuffer(width * height * 4);
        const dec = new Uint8Array(output);

        // select the right texture plane data (depth, surface, face, mip)
        const enc = new DataView(this._data.buffer, this._data.byteOffset + this._dataOffset);

        // if pixel format is set to an invalid value, we are in eightcc mode
        if (this.pixelFormat === pvr.PixelFormat.NumCompressedPFs) {
            switch (this.eightcc) {
                case 'rgba8888': // R8 G8 B8 A8
                    switch (this.channelType) {
                        case pvr.VariableType.UnsignedByteNorm: // srgb
                        case pvr.VariableType.SignedByteNorm:
                        case pvr.VariableType.UnsignedByte:
                        case pvr.VariableType.SignedByte:
                            eightcc.decompress_R8_G8_B8_A8(dec, enc, width, height);
                            break;
                    }
                    break;
                case 'bgra8888': // B8 G8 R8 A8
                    switch (this.channelType) {
                        case pvr.VariableType.UnsignedByteNorm:
                            eightcc.decompress_B8_G8_R8_A8(dec, enc, width, height);
                            break;
                    }
                    break;
                case 'rgba:::2': // R10 G10 B10 A2
                    switch (this.channelType) {
                        case pvr.VariableType.UnsignedIntegerNorm:
                        case pvr.VariableType.UnsignedInteger:
                            eightcc.decompress_R10_G10_B10_A2(dec, enc, width, height);
                            break;
                    }
                    break;
                case 'rgba4444': // R4 G4 B4 A4
                    switch (this.channelType) {
                        case pvr.VariableType.UnsignedByteNorm:
                            eightcc.decompress_R4_G4_B4_A4(dec, enc, width, height);
                            break;
                    }
                    break;
                case 'rgba5551': // R5 G5 B5 A1
                    switch (this.channelType) {
                        case pvr.VariableType.UnsignedByteNorm:
                            eightcc.decompress_R5_G5_B5_A1(dec, enc, width, height);
                            break;
                    }
                    break;
                case 'rgba@@@@': // R16 G16 B16 A16
                    switch (this.channelType) {
                        case pvr.VariableType.SignedFloat:
                            eightcc.decompress_R16_G16_B16_A16_Float(dec, enc, width, height);
                            break;
                        case pvr.VariableType.UnsignedShort:
                        case pvr.VariableType.SignedShort:
                            eightcc.decompress_R16_G16_B16_A16(dec, enc, width, height);
                            break;
                    }
                    break;
                case 'rgbaPPPP': // R32 G32 B32 A32
                    switch (this.channelType) {
                        case pvr.VariableType.SignedFloat:
                            eightcc.decompress_R32_G32_B32_A32_Float(dec, enc, width, height);
                            break;
                        case pvr.VariableType.UnsignedInteger:
                        case pvr.VariableType.SignedInteger:
                            eightcc.decompress_R32_G32_B32_A32(dec, enc, width, height);
                            break;
                    }
                    break;
                case 'rgb 888 ': // R8 G8 B8
                    switch (this.channelType) {
                        case pvr.VariableType.UnsignedByteNorm: // srgb
                        case pvr.VariableType.SignedByteNorm:
                        case pvr.VariableType.UnsignedByte:
                        case pvr.VariableType.SignedByte:
                            eightcc.decompress_R8_G8_B8(dec, enc, width, height);
                            break;
                    }
                    break;
                case 'rgb 565 ': // R5 G6 R5
                    switch (this.channelType) {
                        case pvr.VariableType.UnsignedByteNorm:
                            eightcc.decompress_R5_G6_B5(dec, enc, width, height);
                            break;
                    }
                    break;
                case 'rgb @@@ ': // R16 G16 B16
                    switch (this.channelType) {
                        case pvr.VariableType.SignedFloat:
                            eightcc.decompress_R16_G16_B16_Float(dec, enc, width, height);
                            break;
                        case pvr.VariableType.UnsignedShort:
                        case pvr.VariableType.SignedShort:
                            eightcc.decompress_R16_G16_B16(dec, enc, width, height);
                            break;
                    }
                    break;
                case 'rgb PPP ': // R32 G32 B32
                    switch (this.channelType) {
                        case pvr.VariableType.SignedFloat:
                            eightcc.decompress_R32_G32_B32_Float(dec, enc, width, height);
                            break;
                        case pvr.VariableType.UnsignedInteger:
                        case pvr.VariableType.SignedInteger:
                            eightcc.decompress_R32_G32_B32(dec, enc, width, height);
                            break;
                    }
                    break;
                case 'bgr :;; ': // B10 G11 R11
                    switch (this.channelType) {
                        case pvr.VariableType.UnsignedFloat:
                            eightcc.decompress_R11_G11_B10_UFloat(dec, enc, width, height);
                            break;
                    }
                    break;
                case 'rg  88  ': // R8 G8
                    switch (this.channelType) {
                        case pvr.VariableType.UnsignedByteNorm:
                        case pvr.VariableType.SignedByteNorm:
                        case pvr.VariableType.UnsignedByte:
                        case pvr.VariableType.SignedByte:
                            eightcc.decompress_R8_G8(dec, enc, width, height);
                            break;
                    }
                    break;
                case 'la  88  ': // L8 A8
                    switch (this.channelType) {
                        case pvr.VariableType.UnsignedByteNorm:
                            eightcc.decompress_L8_A8(dec, enc, width, height);
                            break;
                    }
                    break;
                case 'rg  @@  ': // R16 G16
                    switch (this.channelType) {
                        case pvr.VariableType.SignedFloat:
                            eightcc.decompress_R16_G16_Float(dec, enc, width, height);
                            break;
                        case pvr.VariableType.UnsignedShort:
                        case pvr.VariableType.SignedShort:
                            eightcc.decompress_R16_G16(dec, enc, width, height);
                            break;
                    }
                    break;
                case 'rg  PP  ': // R32 G32
                    switch (this.channelType) {
                        case pvr.VariableType.SignedFloat:
                            eightcc.decompress_R32_G32_Float(dec, enc, width, height);
                            break;
                        case pvr.VariableType.UnsignedInteger:
                        case pvr.VariableType.SignedInteger:
                            eightcc.decompress_R32_G32(dec, enc, width, height);
                            break;
                    }
                    break;
                case 'r   8   ': // R8
                    switch (this.channelType) {
                        case pvr.VariableType.UnsignedByteNorm:
                        case pvr.VariableType.SignedByteNorm:
                        case pvr.VariableType.UnsignedByte:
                        case pvr.VariableType.SignedByte:
                            eightcc.decompress_R8(dec, enc, width, height);
                            break;
                    }
                    break;
                case 'a   8   ': // A8
                    switch (this.channelType) {
                        case pvr.VariableType.UnsignedByteNorm:
                            eightcc.decompress_A8(dec, enc, width, height);
                            break;
                    }
                    break;
                case 'l   8   ': // L8
                    switch (this.channelType) {
                        case pvr.VariableType.UnsignedByteNorm:
                            eightcc.decompress_L8(dec, enc, width, height);
                            break;
                    }
                    break;
                case 'r   @   ': // R16
                    switch (this.channelType) {
                        case pvr.VariableType.SignedFloat:
                            eightcc.decompress_R16_Float(dec, enc, width, height);
                            break;
                        case pvr.VariableType.UnsignedShort:
                        case pvr.VariableType.SignedShort:
                            eightcc.decompress_R16(dec, enc, width, height);
                            break;
                    }
                    break;
                case 'r   P   ': // R32
                    switch (this.channelType) {
                        case pvr.VariableType.SignedFloat:
                            eightcc.decompress_R32_Float(dec, enc, width, height);
                            break;
                        case pvr.VariableType.UnsignedInteger:
                        case pvr.VariableType.SignedInteger:
                            eightcc.decompress_R32(dec, enc, width, height);
                            break;
                    }
                    break;
            }
        } else {
            switch (this.pixelFormat) {
                case pvr.PixelFormat.PVRTCI_2bpp_RGB:
                    switch (this.channelType) {
                        case pvr.VariableType.UnsignedByteNorm: // srgb
                            pvrtc.decompress_PVRTC(dec, enc, width, height, true, false);
                            break;
                    }
                    break;
                case pvr.PixelFormat.PVRTCI_2bpp_RGBA:
                    switch (this.channelType) {
                        case pvr.VariableType.UnsignedByteNorm: // srgb
                            pvrtc.decompress_PVRTC(dec, enc, width, height, true, true);
                            break;
                    }
                    break;
                case pvr.PixelFormat.PVRTCI_4bpp_RGB:
                    switch (this.channelType) {
                        case pvr.VariableType.UnsignedByteNorm: // srgb
                            pvrtc.decompress_PVRTC(dec, enc, width, height, false, false);
                            break;
                    }
                    break;
                case pvr.PixelFormat.PVRTCI_4bpp_RGBA:
                    switch (this.channelType) {
                        case pvr.VariableType.UnsignedByteNorm: // srgb
                            pvrtc.decompress_PVRTC(dec, enc, width, height, false, true);
                            break;
                    }
                    break;
                case pvr.PixelFormat.PVRTCII_2bpp:
                    switch (this.channelType) {
                        case pvr.VariableType.UnsignedByteNorm: // srgb
                            pvrtc.decompress_PVRTC2(dec, enc, width, height, true);
                            break;
                    }
                    break;
                case pvr.PixelFormat.PVRTCII_4bpp:
                    switch (this.channelType) {
                        case pvr.VariableType.UnsignedByteNorm: // srgb
                            pvrtc.decompress_PVRTC2(dec, enc, width, height, false);
                            break;
                    }
                    break;
                case pvr.PixelFormat.ETC1:
                    switch (this.channelType) {
                        case pvr.VariableType.UnsignedByteNorm:
                            etc.decompress_ETC2_RGB(dec, enc, width, height);
                            break;
                    }
                    break;
                case pvr.PixelFormat.ETC2_RGB:
                    switch (this.channelType) {
                        case pvr.VariableType.UnsignedByteNorm: // srgb
                            etc.decompress_ETC2_RGB(dec, enc, width, height);
                            break;
                    }
                    break;
                case pvr.PixelFormat.ETC2_RGBA:
                    switch (this.channelType) {
                        case pvr.VariableType.UnsignedByteNorm: // srgb
                            etc.decompress_ETC2_RGBA(dec, enc, width, height);
                            break;
                    }
                    break;
                case pvr.PixelFormat.ETC2_RGB_A1:
                    switch (this.channelType) {
                        case pvr.VariableType.UnsignedByteNorm: // srgb
                            etc.decompress_ETC2_RGB_A1(dec, enc, width, height);
                            break;
                    }
                    break;
                case pvr.PixelFormat.EAC_R11:
                    switch (this.channelType) {
                        case pvr.VariableType.UnsignedShortNorm:
                            etc.decompress_EAC_R11(dec, enc, width, height, false);
                            break;
                        case pvr.VariableType.SignedShortNorm:
                            etc.decompress_EAC_R11(dec, enc, width, height, true);
                            break;
                    }
                    break;
                case pvr.PixelFormat.EAC_RG11:
                    switch (this.channelType) {
                        case pvr.VariableType.UnsignedIntegerNorm:
                            etc.decompress_EAC_RG11(dec, enc, width, height, false);
                            break;
                        case pvr.VariableType.SignedIntegerNorm:
                            etc.decompress_EAC_RG11(dec, enc, width, height, true);
                            break;
                    }
                    break;
                case pvr.PixelFormat.PVRTCI_HDR_6bpp:
                    switch (this.channelType) {
                        case pvr.VariableType.SignedFloat:
                            // ...
                            break;
                    }
                    break;
                case pvr.PixelFormat.PVRTCI_HDR_8bpp:
                    switch (this.channelType) {
                        case pvr.VariableType.SignedFloat:
                            // ...
                            break;
                    }
                    break;
                case pvr.PixelFormat.PVRTCII_HDR_6bpp:
                    switch (this.channelType) {
                        case pvr.VariableType.SignedFloat:
                            // ...
                            break;
                    }
                    break;
                case pvr.PixelFormat.PVRTCII_HDR_8bpp:
                    switch (this.channelType) {
                        case pvr.VariableType.SignedFloat:
                            // ...
                            break;
                    }
                    break;
                case pvr.PixelFormat.SharedExponentR9G9B9E5:
                    switch (this.channelType) {
                        case pvr.VariableType.UnsignedIntegerNorm:
                            eightcc.decompress_RGB9_E5_UFloat(dec, enc, width, height);
                            break;
                    }
                    break;
                case pvr.PixelFormat.RGBM:
                    switch (this.channelType) {
                        case pvr.VariableType.UnsignedByteNorm:
                            eightcc.decompress_RGBM_UFloat(dec, enc, width, height, this.maxRange);
                            break;
                    }
                    break;
                case pvr.PixelFormat.RGBD:
                    switch (this.channelType) {
                        case pvr.VariableType.UnsignedByteNorm:
                            // ...
                            break;
                    }
                    break;
            }
        }

        // color space conversation not yet handled
        if (srgbOutput) {
            if (this.colorSpace === pvr.ColorSpace.Linear) {
                linearToSrgb(dec, width, height);
            }
        }

        // icc color profile not yet handled
        return output;
    }
}
