import * as pvr from './pvr';
import * as pvrtc from '../formats/pvrtc';
import * as etc from '../formats/etc';
import * as eightcc from '../formats/eightcc';
import { linearToSrgb } from '../utils/color';

type int = number;
type float = number;
type byte = number;

const HeaderSize = 52;

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
    public readonly compressed: boolean;
    public readonly pixelFormat: pvr.PixelFormat;
    public readonly eightcc: string;
    public readonly colorSpace: pvr.ColorSpace;
    public readonly channelType: pvr.VariableType;
    public readonly premultiplied: boolean;
    public readonly flipX: boolean;
    public readonly flipY: boolean;
    public readonly flipZ: boolean;
    public readonly maxRange: float;
    public readonly faceOptions: string[];
    public readonly surfaceOptions: string[];
    public readonly mipOptions: string[];
    public readonly textureInfo: object[];

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
            this.compressed = true;
            this.pixelFormat = view.getUint32(8, true);
            this.eightcc = '';
        } else {
            this.compressed = false;
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

        // create basic texture info. more will be added for metadata.
        this.textureInfo = [];
        if (this.depth === 1) {
            this.textureInfo.push({ Property: "Dimensions", Value: `${this.width} x ${this.height}` });
        } else {
            this.textureInfo.push({ Property: "Dimensions", Value: `${this.width} x ${this.height} x ${this.depth}` });
        }
        if (this.compressed) {
            this.textureInfo.push({ Property: "Pixel Format", Value: pvr.PixelFormat[this.pixelFormat].toString() });
        } else {
            this.textureInfo.push({ Property: "Pixel Format", Value: this.eightcc });
        }
        this.textureInfo.push({ Property: "Channel Type", Value: pvr.VariableType[this.channelType].toString() });
        this.textureInfo.push({ Property: "Color Space", Value: pvr.ColorSpace[this.colorSpace].toString() });
        this.textureInfo.push({ Property: "Mip Levels", Value: `${this.mipMapCount}` });
        this.textureInfo.push({ Property: "Faces", Value: `${this.numFaces}` });
        this.textureInfo.push({ Property: "Array Surfaces", Value: `${this.numSurfaces}` });
        if (this.premultiplied) {
            this.textureInfo.push({ Property: "Premultiplied Alpha", Value: 'true' });
        }

        // create face descriptions to show in drop
        this.faceOptions = [];
        for (let f = 0; f < this.numSurfaces; f++) {
            this.faceOptions.push(`${f}`);
        }

        // create surface descriptions to show in dropdown
        this.surfaceOptions = [];
        for (let s = 0; s < this.numSurfaces; s++) {
            this.surfaceOptions.push(`${s}`);
        }

        // create mip level descriptions to show in dropdown
        this.mipOptions = [];
        for (let m = 0; m < this.mipMapCount; m++) {
            const [width, height, depth] = this._getMipLevelDimensions(m);
            if (this.depth === 1) {
                this.mipOptions.push(`${m} : ${width} x ${height}`);
            } else {
                this.mipOptions.push(`${m} : ${width} x ${height} x ${depth}`);
            }
        }

        // set default values for optional properties
        this.flipX = false;
        this.flipY = false;
        this.flipZ = false;
        this.maxRange = 8.0;

        // read all metadata entries
        let metaView = new DataView(data.buffer, data.byteOffset + HeaderSize, metaDataSize);
        for (let pos = 0; pos < metaDataSize; ) {
            if (metaDataSize - pos < 12) { console.log('pvr-viewer: corrupt metadata'); break; }
            const fourcc = metaView.getUint32(pos + 0, true);
            if (fourcc !== 0x03525650) { console.log('pvr-viewer: unrecognized metadata fourcc'); break; }
            const semantic: pvr.MetaData = metaView.getUint32(pos + 4, true);
            const metaLen = metaView.getUint32(pos + 8, true);
            pos += 12;
            if (metaDataSize - pos < metaLen) { console.log('pvr-viewer: corrupt metadata'); break; }
            switch (semantic) {
                case pvr.MetaData.TextureAtlasCoords:
                    if ((metaLen % 12) !== 0) { console.log('pvr-viewer: corrupt texture atlas coords'); break; }
                    // variable data data. a set of 4 ints for each subtexture on the atlas
                    break;
                case pvr.MetaData.BumpData:
                    if (metaLen !== 8) { console.log('pvr-viewer: corrupt bump data'); break; }
                    break;
                case pvr.MetaData.CubeMapOrder:
                    if (metaLen !== 6) { console.log('pvr-viewer: corrupt cube map order'); break; }
                    break;
                case pvr.MetaData.TextureOrientation:
                    if (metaLen !== 3) { console.log('pvr-viewer: corrupt texture orientation'); break; }
                    this.flipX = (metaView.getUint8(pos + 0) !== pvr.Orientation.Right);
                    this.flipY = (metaView.getUint8(pos + 1) !== pvr.Orientation.Down);
                    this.flipZ = (metaView.getUint8(pos + 2) !== pvr.Orientation.In);
                    this.textureInfo.push({ Property: "Orientation", Value: `${this.flipX ? '-' : '+'}X ${this.flipY ? '-' : '+'}Y ${this.flipZ ? '-' : '+'}Z`});
                    break;
                case pvr.MetaData.BorderData:
                    if (metaLen !== 12) { console.log('pvr-viewer: corrupt border data'); break; }
                    const bx = metaView.getUint32(pos + 0);
                    const by = metaView.getUint32(pos + 4);
                    const bz = metaView.getUint32(pos + 8);
                    this.textureInfo.push({ Property: "Border Data", Value: `${bx}, ${by}, ${bz}`});
                    break;
                case pvr.MetaData.Padding:
                    // this block should be skipped
                    console.log(`skipping data: ${metaLen} bytes`);
                    break;
                case pvr.MetaData.PerChannelType:
                    console.log(`PerChannelType: ${metaLen} bytes`);
                    for (let i = 0; i < metaLen; i++) {
                        const type: pvr.VariableType = metaView.getUint8(pos + i);
                        //console.log(`${i}: ${type.toString()}`);
                    }
                    break;
                case pvr.MetaData.SupercompressionGlobalData:
                    console.log(`pvr-viewer: supercompression global data not supported`);
                    break;
                case pvr.MetaData.MaxRange:
                    if (metaLen !== 4) { console.log('pvr-viewer: corrupt max range'); break; }
                    this.maxRange = metaView.getFloat32(pos + 0, true);
                    this.textureInfo.push({ Property: "Max Range", Value: `${this.maxRange}`});
                    break;
                case pvr.MetaData.UnknownFont80:
                case pvr.MetaData.UnknownFont81:
                case pvr.MetaData.UnknownFont82:
                case pvr.MetaData.UnknownFont83:
                case pvr.MetaData.UnknownFont84:
                    //console.log(`pvr-viewer: font semantic ${semantic}`);
                    break;
                default:
                    console.log(`pvr-viewer: unknown semantic ${semantic}`);
                    break;
            }
            pos += metaLen;
        }
    }

    private _getBlockDimensionsAndBitsPerBlock(): int[] {
        if (this.compressed) {
            switch (this.pixelFormat) {
                case pvr.PixelFormat.PVRTCI_2bpp_RGB: return [4, 4, 1, 32];
                case pvr.PixelFormat.PVRTCI_2bpp_RGBA: return [4, 4, 1, 32];
                case pvr.PixelFormat.PVRTCI_4bpp_RGB: return [4, 4, 1, 64];
                case pvr.PixelFormat.PVRTCI_4bpp_RGBA: return [4, 4, 1, 64];
                case pvr.PixelFormat.PVRTCII_2bpp: return [4, 4, 1, 32];
                case pvr.PixelFormat.PVRTCII_4bpp: return [4, 4, 1, 16];
                case pvr.PixelFormat.ETC1: return [4, 4, 1, 64];
                case pvr.PixelFormat.DXT1: return [4, 4, 1, 64];
                case pvr.PixelFormat.DXT2: return [4, 4, 1, 128];
                case pvr.PixelFormat.DXT3: return [4, 4, 1, 128];
                case pvr.PixelFormat.DXT4: return [4, 4, 1, 128];
                case pvr.PixelFormat.DXT5: return [4, 4, 1, 128];
                case pvr.PixelFormat.BC4: return [4, 4, 1, 64];
                case pvr.PixelFormat.BC5: return [4, 4, 1, 128];
                case pvr.PixelFormat.BC6: return [4, 4, 1, 128];
                case pvr.PixelFormat.BC7: return [4, 4, 1, 128];
                case pvr.PixelFormat.BW1bpp: return [8, 1, 1, 8];
                case pvr.PixelFormat.SharedExponentR9G9B9E5: return [1, 1, 1, 32];
                case pvr.PixelFormat.RGBG8888: return [2, 1, 1, 32];
                case pvr.PixelFormat.GRGB8888: return [2, 1, 1, 32];
                case pvr.PixelFormat.ETC2_RGB: return [4, 4, 1, 64];
                case pvr.PixelFormat.ETC2_RGBA: return [4, 4, 1, 128];
                case pvr.PixelFormat.ETC2_RGB_A1: return [4, 4, 1, 64];
                case pvr.PixelFormat.EAC_R11: return [4, 4, 1, 64];
                case pvr.PixelFormat.EAC_RG11: return [4, 4, 1, 128];
                case pvr.PixelFormat.ASTC_4x4: return [4, 4, 1, 128];
                case pvr.PixelFormat.ASTC_5x4: return [5, 4, 1, 128];
                case pvr.PixelFormat.ASTC_5x5: return [5, 5, 1, 128];
                case pvr.PixelFormat.ASTC_6x5: return [6, 5, 1, 128];
                case pvr.PixelFormat.ASTC_6x6: return [6, 6, 1, 128];
                case pvr.PixelFormat.ASTC_8x5: return [8, 5, 1, 128];
                case pvr.PixelFormat.ASTC_8x6: return [8, 6, 1, 128];
                case pvr.PixelFormat.ASTC_8x8: return [8, 8, 1, 128];
                case pvr.PixelFormat.ASTC_10x5: return [10, 5, 1, 128];
                case pvr.PixelFormat.ASTC_10x6: return [10, 6, 1, 128];
                case pvr.PixelFormat.ASTC_10x8: return [10, 8, 1, 128];
                case pvr.PixelFormat.ASTC_10x10: return [10, 10, 1, 128];
                case pvr.PixelFormat.ASTC_12x10: return [12, 10, 1, 128];
                case pvr.PixelFormat.ASTC_12x12: return [12, 12, 1, 128];
                case pvr.PixelFormat.ASTC_3x3x3: return [3, 3, 3, 128];
                case pvr.PixelFormat.ASTC_4x3x3: return [4, 3, 3, 128];
                case pvr.PixelFormat.ASTC_4x4x3: return [4, 4, 3, 128];
                case pvr.PixelFormat.ASTC_4x4x4: return [4, 4, 4, 128];
                case pvr.PixelFormat.ASTC_5x4x4: return [5, 4, 4, 128];
                case pvr.PixelFormat.ASTC_5x5x4: return [5, 5, 4, 128];
                case pvr.PixelFormat.ASTC_5x5x5: return [5, 5, 5, 128];
                case pvr.PixelFormat.ASTC_6x5x5: return [6, 5, 5, 128];
                case pvr.PixelFormat.ASTC_6x6x5: return [6, 6, 5, 128];
                case pvr.PixelFormat.ASTC_6x6x6: return [6, 6, 6, 128];
                case pvr.PixelFormat.RGBM: return [1, 1, 1, 32];
                case pvr.PixelFormat.RGBD: return [1, 1, 1, 32];
                case pvr.PixelFormat.PVRTCI_HDR_6bpp: return [4, 4, 1, 96];
                case pvr.PixelFormat.PVRTCI_HDR_8bpp: return [4, 4, 1, 128];
                case pvr.PixelFormat.PVRTCII_HDR_6bpp: return [4, 4, 1, 96];
                case pvr.PixelFormat.PVRTCII_HDR_8bpp: return [4, 4, 1, 128];
            }
        } else {
            switch (this.eightcc) {
                case 'rgba8888': return [1, 1, 1, 32]; // R8 G8 B8 A8
                case 'bgra8888': return [1, 1, 1, 32]; // B8 G8 R8 A8
                case 'rgba:::2': return [1, 1, 1, 32]; // R10 G10 B10 A2
                case 'rgba4444': return [1, 1, 1, 16]; // R4 G4 B4 A4
                case 'rgba5551': return [1, 1, 1, 16]; // R5 G5 B5 A1
                case 'rgba@@@@': return [1, 1, 1, 64]; // R16 G16 B16 A16
                case 'rgbaPPPP': return [1, 1, 1, 128]; // R32 G32 B32 A32
                case 'rgb 888 ': return [1, 1, 1, 24]; // R8 G8 B8
                case 'rgb 565 ': return [1, 1, 1, 16]; // R5 G6 R5
                case 'rgb @@@ ': return [1, 1, 1, 48]; // R16 G16 B16
                case 'rgb PPP ': return [1, 1, 1, 96]; // R32 G32 B32
                case 'bgr :;; ': return [1, 1, 1, 32]; // B10 G11 R11
                case 'rg  88  ': return [1, 1, 1, 16]; // R8 G8
                case 'la  88  ': return [1, 1, 1, 16]; // L8 A8
                case 'rg  @@  ': return [1, 1, 1, 32]; // R16 G16
                case 'rg  PP  ': return [1, 1, 1, 64]; // R32 G32
                case 'r   8   ': return [1, 1, 1, 8]; // R8
                case 'a   8   ': return [1, 1, 1, 8]; // A8
                case 'l   8   ': return [1, 1, 1, 8]; // L8
                case 'r   @   ': return [1, 1, 1, 16]; // R16
                case 'r   P   ': return [1, 1, 1, 32]; // R32
            }
        }
        return [1, 1, 1, 0];
    }

    private _getMipLevelDimensions(mip: int): int[] {
        let width = this.width;
        let height = this.height;
        let depth = this.depth;
        for (let m = 0; m < mip; m++) {
            width = Math.max(1, Math.floor(width / 2));
            height = Math.max(1, Math.floor(height / 2));
            depth = Math.max(1, Math.floor(depth / 2));
        }
        return [width, height, depth];
    }

    private _getDataViewForPlane(slice: int, face: int, surface: int, mip: int): DataView
    {
        let offset:int = 0;

        const [blockSizeX, blockSizeY, blockSizeZ, blockBits] = this._getBlockDimensionsAndBitsPerBlock();

        // jump to start of mip map level
        for (let m = 0; m < mip; m++) {
            const [width, height, depth] = this._getMipLevelDimensions(m);
            const blockCountX = Math.ceil(width / blockSizeX);
            const blockCountY = Math.ceil(height / blockSizeY);
            const blockCountZ = Math.ceil(depth / blockSizeZ);
            offset += this.numSurfaces * this.numFaces * blockCountZ * blockCountY * blockCountX * (blockBits / 8);
        }

        // jump to start of array surface
        const [width, height, depth] = this._getMipLevelDimensions(mip);
        const blockCountX = Math.ceil(width / blockSizeX);
        const blockCountY = Math.ceil(height / blockSizeY);
        const blockCountZ = Math.ceil(depth / blockSizeZ);
        offset += surface * this.numFaces * blockCountZ * blockCountY * blockCountX * (blockBits / 8);

        // jump to start of cube map face
        offset += face * blockCountX * blockCountY * blockCountZ * (blockBits / 8);

        // jump to start of slice
        const blockZ = Math.floor(slice / blockSizeZ);
        offset += blockZ * blockCountY * blockCountX * (blockBits / 8);

        return new DataView(this._data.buffer, this._data.byteOffset + this._dataOffset + offset);
    }

    public async decompress(slice: int, face: int, surface: int, mip: int, srgbOutput: boolean): Promise<ArrayBuffer> {
        const width = this.width;
        const height = this.height;

        // the output is an array buffer, to be passed to the webview
        const output = new ArrayBuffer(width * height * 4);
        const dec = new Uint8Array(output);

        // select the right texture plane data
        const enc = this._getDataViewForPlane(slice, face, surface, mip);

        // if pixel format is set to an invalid value, we are in eightcc mode
        if (this.compressed) {
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
                            eightcc.decompress_RGBD_UFloat(dec, enc, width, height, this.maxRange);
                            break;
                    }
                    break;
            }
        } else {
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
