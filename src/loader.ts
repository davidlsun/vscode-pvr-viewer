import * as vscode from 'vscode';
import sharp from 'sharp';
import * as pvr from './pvr';
import * as pvrtc from './pvrtc';
import * as etc from './etc';
import * as eightcc from './eightcc';

type byte = number;
type int = number;
type float = number;

function srgbToLinear(x: float): float {
    return x <= 0.04045 ? x * 0.0773993808 : Math.pow((x + 0.055) / 1.055, 2.4);
}

function linearToSrgb(x: float): float {
    return x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 0.41666) - 0.055;
}

function readEightcc(header: DataView): string {
    const cc =  Array<byte>(8);
    for (let i = 0; i < 8; i++) {
        cc[i] = header.getUint8(8 + i);
        if (cc[i] === 0) {
            cc[i] = 0x20;
        } else if (i >= 4) {
            cc[i] += 0x30;
        }
    }
    return String.fromCharCode(...cc);
}

export default class PVRLoader {

    private _width: int = 0;
    private _height: int = 0;
    private _depth: int = 0; // 1 pixel
    private _numSurfaces: int = 0; // 1 in array
    private _numFaces: int = 0; // 1 in cubemap
    private _mipMapCount: int = 0; // 1 mip level
    private _premultiplied: boolean = false;

    public get width(): int { return this._width; }

    public static async readFile(uri: vscode.Uri): Promise<Buffer> {
        const data = await vscode.workspace.fs.readFile(uri);
        const loader = new PVRLoader();
        return loader.parse(data);
    }

    private constructor() {
    }

    public async parse(data: Uint8Array): Promise<Buffer> {
        if (data.length < pvr.HEADER_SIZE) { throw new Error(); }

        // read fixed size header block
        const header = new DataView(data.buffer, data.byteOffset, pvr.HEADER_SIZE);
        const version = header.getUint32(0, true);
        if (version !== pvr.PVRTEX3_IDENT) { throw new Error(); }
        const flags = header.getUint32(4, true);
        this._premultiplied = ((flags & pvr.PVRTEX3_PREMULTIPLIED) !== 0);
        const pixelFormat: pvr.PixelFormat = header.getUint32(8, true);
        const pixelFormatHigh = header.getUint32(12, true); // 0
        const colourSpace: pvr.ColourSpace = header.getUint32(16, true);
        const channelType: pvr.VariableType = header.getUint32(20, true);
        this._height = header.getUint32(24, true);
        this._width = header.getUint32(28, true);
        this._depth = header.getUint32(32, true);
        this._numSurfaces = header.getUint32(36, true);
        this._numFaces = header.getUint32(40, true);
        this._mipMapCount = header.getUint32(44, true);
        const metaDataSize = header.getUint32(48, true);

        let flipX = false;
        let flipY = false;
        let flipZ = false;

        // read metadata, 0 or more key-value entries
        let metadata = new DataView(data.buffer, data.byteOffset + pvr.HEADER_SIZE, metaDataSize);
        while (metadata.byteLength > 12) {
            const creator = metadata.getUint32(0, true);
            const semantic: pvr.MetaData = metadata.getUint32(4, true);
            const length = metadata.getUint32(8, true);
            if (metadata.byteLength >= 12 + length) {
                const bytes = new DataView(metadata.buffer, metadata.byteOffset + 12, length);
                switch (semantic) {
                    case pvr.MetaData.TextureOrientation:
                        flipX = (bytes.getUint8(pvr.Axis.X) === pvr.Orientation.Left);
                        flipY = (bytes.getUint8(pvr.Axis.Y) === pvr.Orientation.Up);
                        flipZ = (bytes.getUint8(pvr.Axis.Z) === pvr.Orientation.Out);
                        break;
                }
                metadata = new DataView(metadata.buffer, metadata.byteOffset + 12 + length, metadata.byteLength - 12 - length);
            } else {
                break;
            }
        }

        const width = this._width;
        const height = this._height;

        // read bulk color data
        const encData = new DataView(data.buffer, data.byteOffset + pvr.HEADER_SIZE + metaDataSize, data.byteLength - pvr.HEADER_SIZE - metaDataSize);
        const decData = new Uint8Array(width * height * 4);

        if (pixelFormatHigh !== 0) {
            switch (readEightcc(header)) {
                case 'rgba8888': // R8 G8 B8 A8
                    if (channelType === pvr.VariableType.UnsignedByteNorm) {
                        eightcc.decompress_R8_G8_B8_A8(decData, encData, width, height); // linear and srgb
                    } else if (channelType === pvr.VariableType.SignedByteNorm) {
                        // linear
                    } else if (channelType === pvr.VariableType.UnsignedByte) {
                        eightcc.decompress_R8_G8_B8_A8(decData, encData, width, height); // linear
                    } else if (channelType === pvr.VariableType.SignedByte) {
                        // linear
                    }
                    break;
                case 'bgra8888': // B8 G8 R8 A8
                    if (channelType === pvr.VariableType.UnsignedByteNorm) {
                        eightcc.decompress_B8_G8_R8_A8(decData, encData, width, height); // linear
                    }
                    break;
                case 'rgba:::2': // R10 G10 B10 A2
                    if (channelType === pvr.VariableType.UnsignedIntegerNorm) {
                        eightcc.decompress_R10_G10_B10_A2(decData, encData, width, height); // linear
                    } else if (channelType === pvr.VariableType.UnsignedInteger) {
                        eightcc.decompress_R10_G10_B10_A2(decData, encData, width, height); // linear
                    }
                    break;
                case 'rgba4444': // R4 G4 B4 A4
                    if (channelType === pvr.VariableType.UnsignedByteNorm) {
                        eightcc.decompress_R4_G4_B4_A4(decData, encData, width, height); // linear
                    }
                    break;
                case 'rgba5551': // R5 G5 B5 A1
                    if (channelType === pvr.VariableType.UnsignedByteNorm) {
                        eightcc.decompress_R5_G5_B5_A1(decData, encData, width, height); // linear
                    }
                    break;
                case 'rgba@@@@': // R16 G16 B16 A16
                    if (channelType === pvr.VariableType.SignedFloat) {
                        eightcc.decompress_R16_G16_B16_A16_Float(decData, encData, width, height); // linear
                    } else if (channelType === pvr.VariableType.UnsignedShort) {
                        eightcc.decompress_R16_G16_B16_A16(decData, encData, width, height); // linear
                    } else if (channelType === pvr.VariableType.SignedShort) {
                        // linear
                    }
                    break;
                case 'rgbaPPPP': // R32 G32 B32 A32
                    if (channelType === pvr.VariableType.SignedFloat) {
                        eightcc.decompress_R32_G32_B32_A32_Float(decData, encData, width, height); // linear
                    } else if (channelType === pvr.VariableType.UnsignedInteger) {
                        eightcc.decompress_R32_G32_B32_A32(decData, encData, width, height); // linear
                    } else if (channelType === pvr.VariableType.SignedInteger) {
                        // linear
                    }
                    break;
                case 'rgb 888 ': // R8 G8 B8
                    if (channelType === pvr.VariableType.UnsignedByteNorm) {
                        eightcc.decompress_R8_G8_B8(decData, encData, width, height); // linear and srgb
                    } else if (channelType === pvr.VariableType.SignedByteNorm) {
                        // linear
                    } else if (channelType === pvr.VariableType.UnsignedByte) {
                        eightcc.decompress_R8_G8_B8(decData, encData, width, height); // linear
                    } else if (channelType === pvr.VariableType.SignedByte) {
                        // linear
                    }
                    break;
                case 'rgb 565 ': // R5 G6 R5
                    if (channelType === pvr.VariableType.UnsignedByteNorm) {
                        eightcc.decompress_R5_G6_B5(decData, encData, width, height); // linear
                    }
                    break;
                case 'rgb @@@ ': // R16 G16 B16
                    if (channelType === pvr.VariableType.SignedFloat) {
                        eightcc.decompress_R16_G16_B16_Float(decData, encData, width, height); // linear
                    } else if (channelType === pvr.VariableType.UnsignedShort) {
                        eightcc.decompress_R16_G16_B16(decData, encData, width, height); // linear
                    } else if (channelType === pvr.VariableType.SignedShort) {
                        // linear
                    }
                    break;
                case 'rgb PPP ': // R32 G32 B32
                    if (channelType === pvr.VariableType.SignedFloat) {
                        eightcc.decompress_R32_G32_B32_Float(decData, encData, width, height); // linear
                    } else if (channelType === pvr.VariableType.UnsignedInteger) {
                        eightcc.decompress_R32_G32_B32(decData, encData, width, height); // linear
                    } else if (channelType === pvr.VariableType.SignedInteger) {
                        // linear
                    }
                case 'bgr :;; ': // B10 G11 R11
                    if (channelType === pvr.VariableType.UnsignedFloat) {
                        eightcc.decompress_B10_G11_R11_UFloat(decData, encData, width, height); // linear
                    }
                    break;
                case 'rg  88  ': // R8 G8
                    if (channelType === pvr.VariableType.UnsignedByteNorm) {
                        eightcc.decompress_R8_G8(decData, encData, width, height); // linear
                    } else if (channelType === pvr.VariableType.SignedByteNorm) {
                        // linear
                    } else if (channelType === pvr.VariableType.UnsignedByte) {
                        eightcc.decompress_R8_G8(decData, encData, width, height); // linear
                    } else if (channelType === pvr.VariableType.SignedByte) {
                        // linear
                    }
                    break;
                case 'la  88  ': // L8 A8
                    if (channelType === pvr.VariableType.UnsignedByteNorm) {
                        // linear
                        eightcc.decompress_L8_A8(decData, encData, width, height); // linear
                    }
                    break;
                case 'rg  @@  ': // R16 G16
                    if (channelType === pvr.VariableType.SignedFloat) {
                        eightcc.decompress_R16_G16_Float(decData, encData, width, height); // linear
                    } else if (channelType === pvr.VariableType.UnsignedShort) {
                        eightcc.decompress_R16_G16(decData, encData, width, height); // linear
                    } else if (channelType === pvr.VariableType.SignedShort) {
                        // linear
                    }
                    break;
                case 'rg  PP  ': // R32 G32
                    if (channelType === pvr.VariableType.SignedFloat) {
                        eightcc.decompress_R32_G32_Float(decData, encData, width, height); // linear
                    } else if (channelType === pvr.VariableType.UnsignedInteger) {
                        eightcc.decompress_R32_G32(decData, encData, width, height); // linear
                    } else if (channelType === pvr.VariableType.SignedInteger) {
                        // linear
                    }
                    break;
                case 'r   8   ': // R8
                    if (channelType === pvr.VariableType.UnsignedByteNorm) {
                        eightcc.decompress_R8(decData, encData, width, height); // linear
                    } else if (channelType === pvr.VariableType.SignedByteNorm) {
                        // linear
                    } else if (channelType === pvr.VariableType.UnsignedByte) {
                        eightcc.decompress_R8(decData, encData, width, height); // linear
                    } else if (channelType === pvr.VariableType.SignedByte) {
                        // linear
                    }
                    break;
                case 'a   8   ': // A8
                    if (channelType === pvr.VariableType.UnsignedByteNorm) {
                        eightcc.decompress_A8(decData, encData, width, height); // linear
                    }
                    break;
                case 'l   8   ': // L8
                    if (channelType === pvr.VariableType.UnsignedByteNorm) {
                        eightcc.decompress_L8(decData, encData, width, height); // linear
                    }
                    break;
                case 'r   @   ': // R16
                    if (channelType === pvr.VariableType.SignedFloat) {
                        eightcc.decompress_R16_Float(decData, encData, width, height); // linear
                    } else if (channelType === pvr.VariableType.UnsignedShort) {
                        eightcc.decompress_R16(decData, encData, width, height); // linear
                    } else if (channelType === pvr.VariableType.SignedShort) {
                        // linear
                    }
                    break;
                case 'r   P   ': // R32
                    if (channelType === pvr.VariableType.SignedFloat) {
                        eightcc.decompress_R32_Float(decData, encData, width, height); // linear
                    } else if (channelType === pvr.VariableType.UnsignedInteger) {
                        eightcc.decompress_R32(decData, encData, width, height); // linear
                    } else if (channelType === pvr.VariableType.SignedInteger) {
                        // linear
                    }
                    break;
            }
        } else {
            switch (pixelFormat) {
                case pvr.PixelFormat.PVRTCI_2bpp_RGB:
                    if (channelType === pvr.VariableType.UnsignedByteNorm) {
                        pvrtc.decompress_PVRTC(decData, encData, width, height, true, false); // linear and srgb
                    }
                    break;
                case pvr.PixelFormat.PVRTCI_2bpp_RGBA:
                    if (channelType === pvr.VariableType.UnsignedByteNorm) {
                        pvrtc.decompress_PVRTC(decData, encData, width, height, true, true); // linear and srgb
                    }
                    break;
                case pvr.PixelFormat.PVRTCI_4bpp_RGB:
                    if (channelType === pvr.VariableType.UnsignedByteNorm) {
                        pvrtc.decompress_PVRTC(decData, encData, width, height, false, false); // linear and srgb
                    }
                    break;
                case pvr.PixelFormat.PVRTCI_4bpp_RGBA:
                    if (channelType === pvr.VariableType.UnsignedByteNorm) {
                        pvrtc.decompress_PVRTC(decData, encData, width, height, false, true); // linear and srgb
                    }
                    break;
                case pvr.PixelFormat.PVRTCII_2bpp:
                    if (channelType === pvr.VariableType.UnsignedByteNorm) {
                        pvrtc.decompress_PVRTC2(decData, encData, width, height, true); // linear and srgb
                    }
                    break;
                case pvr.PixelFormat.PVRTCII_4bpp:
                    if (channelType === pvr.VariableType.UnsignedByteNorm) {
                        pvrtc.decompress_PVRTC2(decData, encData, width, height, false); // linear and srgb
                    }
                    break;
                case pvr.PixelFormat.ETC1:
                    if (channelType === pvr.VariableType.UnsignedByteNorm) {
                        etc.decompress_ETC2_RGB(decData, encData, width, height); // linear
                    }
                    break;
                case pvr.PixelFormat.ETC2_RGB:
                    if (channelType === pvr.VariableType.UnsignedByteNorm) {
                        etc.decompress_ETC2_RGB(decData, encData, width, height); // linear and srgb
                    }
                    break;
                case pvr.PixelFormat.ETC2_RGBA:
                    if (channelType === pvr.VariableType.UnsignedByteNorm) {
                        etc.decompress_ETC2_RGBA(decData, encData, width, height); // linear and srgb
                    }
                    break;
                case pvr.PixelFormat.ETC2_RGB_A1:
                    if (channelType === pvr.VariableType.UnsignedByteNorm) {
                        etc.decompress_ETC2_RGB_A1(decData, encData, width, height); // linear and srgb
                    }
                    break;
                case pvr.PixelFormat.EAC_R11:
                    if (channelType === pvr.VariableType.UnsignedShortNorm) {
                        etc.decompress_EAC_R11(decData, encData, width, height, false); // linear
                    }
                    break;
                case pvr.PixelFormat.EAC_R11:
                    if (channelType === pvr.VariableType.SignedShortNorm) {
                        etc.decompress_EAC_R11(decData, encData, width, height, true); // linear
                    }
                    break;
                case pvr.PixelFormat.EAC_RG11:
                    if (channelType === pvr.VariableType.UnsignedIntegerNorm) {
                        etc.decompress_EAC_RG11(decData, encData, width, height, false); // linear
                    }
                    break;
                case pvr.PixelFormat.EAC_RG11:
                    if (channelType === pvr.VariableType.SignedIntegerNorm) {
                        etc.decompress_EAC_RG11(decData, encData, width, height, true); // linear
                    }
                    break;
                case pvr.PixelFormat.PVRTCI_HDR_6bpp:
                    if (channelType === pvr.VariableType.SignedFloat) {
                        // linear
                    }
                    break;
                case pvr.PixelFormat.PVRTCI_HDR_8bpp:
                    if (channelType === pvr.VariableType.SignedFloat) {
                        // linear
                    }
                    break;
                case pvr.PixelFormat.PVRTCII_HDR_6bpp:
                    if (channelType === pvr.VariableType.SignedFloat) {
                        // linear
                    }
                    break;
                case pvr.PixelFormat.PVRTCII_HDR_8bpp:
                    if (channelType === pvr.VariableType.SignedFloat) {
                        // linear
                    }
                    break;
                case pvr.PixelFormat.RGBM:
                    if (channelType === pvr.VariableType.UnsignedByteNorm) {
                        // linear
                    }
                    break;
                case pvr.PixelFormat.RGBD:
                    if (channelType === pvr.VariableType.UnsignedByteNorm) {
                        // linear
                    }
                    break;
            }
        }

        if (colourSpace === pvr.ColourSpace.Linear) {
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const i = (y * width + x) * 4;
                    for (let c = 0; c < 3; c++) {
                        decData[i + c] = Math.round(linearToSrgb(decData[i + c] / 255.0) * 255.0);
                    }
                }
            }
        }

        const options: sharp.SharpOptions = {
            raw: {
                width: width, 
                height: height,
                channels: 4,
                premultiplied: this._premultiplied
            }
        };

        const image = sharp(decData, options);
    
        return await image
            .flip(flipY)
            .flop(flipX)
            .png({ compressionLevel: 0 })
            .toColourspace('srgb')
            .withMetadata()
            .toBuffer();
    }
}
