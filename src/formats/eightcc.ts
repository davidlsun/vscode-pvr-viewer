import { expandFloat16, expandFloat11, expandFloat10 } from '../utils/float16';

type int = number;
type float = number;

const RGB_for_A8 = 255; // technically, sampling A8 textures should return black RGB, but this makes them harder to see

const saturate = (x: int): int => ((x < 0) ? 0 : ((x > 255) ? 255 : x));
const floatToByte = (f: float): int => saturate(Math.round(f * 255.0));

export function decompress_R8_G8_B8_A8(dec: Uint8Array, enc: DataView, width: int, height: int): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 4;
            dec[dst + 0] = enc.getUint8(src + 0);
            dec[dst + 1] = enc.getUint8(src + 1);
            dec[dst + 2] = enc.getUint8(src + 2);
            dec[dst + 3] = enc.getUint8(src + 3);
        }
    }
}

export function decompress_B8_G8_R8_A8(dec: Uint8Array, enc: DataView, width: int, height: int): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 4;
            dec[dst + 0] = enc.getUint8(src + 2);
            dec[dst + 1] = enc.getUint8(src + 1);
            dec[dst + 2] = enc.getUint8(src + 0);
            dec[dst + 3] = enc.getUint8(src + 3);
        }
    }
}

export function decompress_R10_G10_B10_A2(dec: Uint8Array, enc: DataView, width: int, height: int): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 4;
            const dword = enc.getUint32(src, true);
            const r = (dword >> 22) & 0x3ff;
            const g = (dword >> 12) & 0x3ff;
            const b = (dword >> 2) & 0x3ff;
            const a = (dword >> 0) & 0x3;
            dec[dst + 0] = (r >> 2);
            dec[dst + 1] = (g >> 2);
            dec[dst + 2] = (b >> 2);
            dec[dst + 3] = (a << 6) | (a << 4) | (a << 2) | (a >> 0);
        }
    }
}

export function decompress_R4_G4_B4_A4(dec: Uint8Array, enc: DataView, width: int, height: int): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 2;
            const word = enc.getUint16(src, true);
            const r = (word >> 12) & 0xf;
            const g = (word >> 8) & 0xf;
            const b = (word >> 4) & 0xf;
            const a = (word >> 0) & 0xf;
            dec[dst + 0] = (r << 4) | (r >> 0);
            dec[dst + 1] = (g << 4) | (g >> 0);
            dec[dst + 2] = (b << 4) | (b >> 0);
            dec[dst + 3] = (a << 4) | (a >> 0);
        }
    }
}

export function decompress_R5_G5_B5_A1(dec: Uint8Array, enc: DataView, width: int, height: int): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 2;
            const word = enc.getUint16(src, true);
            const r = (word >> 11) & 0x1f;
            const g = (word >> 6) & 0x1f;
            const b = (word >> 1) & 0x1f;
            const a = (word >> 0) & 0x1;
            dec[dst + 0] = (r << 3) | (r >> 2);
            dec[dst + 1] = (g << 3) | (g >> 2);
            dec[dst + 2] = (b << 3) | (b >> 2);
            dec[dst + 3] = (a !== 0) ? 255 : 0;
        }
    }
}

export function decompress_R16_G16_B16_A16_Float(dec: Uint8Array, enc: DataView, width: int, height: int): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 8;
            const r = expandFloat16(enc.getUint16(src + 0, true));
            const g = expandFloat16(enc.getUint16(src + 2, true));
            const b = expandFloat16(enc.getUint16(src + 4, true));
            const a = expandFloat16(enc.getUint16(src + 6, true));
            dec[dst + 0] = floatToByte(r);
            dec[dst + 1] = floatToByte(g);
            dec[dst + 2] = floatToByte(b);
            dec[dst + 3] = floatToByte(a);
        }
    }
}

export function decompress_R16_G16_B16_A16(dec: Uint8Array, enc: DataView, width: int, height: int): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 8;
            const r = enc.getUint16(src + 0, true);
            const g = enc.getUint16(src + 2, true);
            const b = enc.getUint16(src + 4, true);
            const a = enc.getUint16(src + 6, true);
            dec[dst + 0] = (r >> 8);
            dec[dst + 1] = (g >> 8);
            dec[dst + 2] = (b >> 8);
            dec[dst + 3] = (a >> 8);
        }
    }
}

export function decompress_R32_G32_B32_A32_Float(dec: Uint8Array, enc: DataView, width: int, height: int): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 16;
            const r = enc.getFloat32(src + 0, true);
            const g = enc.getFloat32(src + 4, true);
            const b = enc.getFloat32(src + 8, true);
            const a = enc.getFloat32(src + 12, true);
            dec[dst + 0] = floatToByte(r);
            dec[dst + 1] = floatToByte(g);
            dec[dst + 2] = floatToByte(b);
            dec[dst + 3] = floatToByte(a);
        }
    }
}

export function decompress_R32_G32_B32_A32(dec: Uint8Array, enc: DataView, width: int, height: int): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 16;
            const r = enc.getUint32(src + 0, true);
            const g = enc.getUint32(src + 4, true);
            const b = enc.getUint32(src + 8, true);
            const a = enc.getUint32(src + 12, true);
            dec[dst + 0] = (r >> 24);
            dec[dst + 1] = (g >> 24);
            dec[dst + 2] = (b >> 24);
            dec[dst + 3] = (a >> 24);
        }
    }
}

export function decompress_R8_G8_B8(dec: Uint8Array, enc: DataView, width: int, height: int): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 3;
            dec[dst + 0] = enc.getUint8(src + 0);
            dec[dst + 1] = enc.getUint8(src + 1);
            dec[dst + 2] = enc.getUint8(src + 2);
            dec[dst + 3] = 255;
        }
    }
}

export function decompress_R5_G6_B5(dec: Uint8Array, enc: DataView, width: int, height: int): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 2;
            const word = enc.getUint16(src, true);
            const r = (word >> 11) & 0x1f;
            const g = (word >> 5) & 0x3f;
            const b = (word >> 0) & 0x1f;
            dec[dst + 0] = (r << 3) | (r >> 2);
            dec[dst + 1] = (g << 2) | (g >> 4);
            dec[dst + 2] = (b << 3) | (b >> 2);
            dec[dst + 3] = 255;
        }
    }
}

export function decompress_R16_G16_B16_Float(dec: Uint8Array, enc: DataView, width: int, height: int): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 6;
            const r = expandFloat16(enc.getUint16(src + 0, true));
            const g = expandFloat16(enc.getUint16(src + 2, true));
            const b = expandFloat16(enc.getUint16(src + 4, true));
            dec[dst + 0] = floatToByte(r);
            dec[dst + 1] = floatToByte(g);
            dec[dst + 2] = floatToByte(b);
            dec[dst + 3] = 255;
        }
    }
}

export function decompress_R16_G16_B16(dec: Uint8Array, enc: DataView, width: int, height: int): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 6;
            const r = enc.getUint16(src + 0, true);
            const g = enc.getUint16(src + 2, true);
            const b = enc.getUint16(src + 4, true);
            dec[dst + 0] = (r >> 8);
            dec[dst + 1] = (g >> 8);
            dec[dst + 2] = (b >> 8);
            dec[dst + 3] = 255;
        }
    }
}

export function decompress_R32_G32_B32_Float(dec: Uint8Array, enc: DataView, width: int, height: int): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 12;
            const r = enc.getFloat32(src + 0, true);
            const g = enc.getFloat32(src + 4, true);
            const b = enc.getFloat32(src + 8, true);
            dec[dst + 0] = floatToByte(r);
            dec[dst + 1] = floatToByte(g);
            dec[dst + 2] = floatToByte(b);
            dec[dst + 3] = 255;
        }
    }
}

export function decompress_R32_G32_B32(dec: Uint8Array, enc: DataView, width: int, height: int): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 12;
            const r = enc.getUint32(src + 0, true);
            const g = enc.getUint32(src + 4, true);
            const b = enc.getUint32(src + 8, true);
            dec[dst + 0] = (r >> 24);
            dec[dst + 1] = (g >> 24);
            dec[dst + 2] = (b >> 24);
            dec[dst + 3] = 255;
        }
    }
}

export function decompress_R8_G8(dec: Uint8Array, enc: DataView, width: int, height: int): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 2;
            dec[dst + 0] = enc.getUint8(src + 0);
            dec[dst + 1] = enc.getUint8(src + 1);
            dec[dst + 2] = 0;
            dec[dst + 3] = 255;
        }
    }
}

export function decompress_L8_A8(dec: Uint8Array, enc: DataView, width: int, height: int): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 2;
            const l = enc.getUint8(src + 0);
            dec[dst + 0] = l;
            dec[dst + 1] = l;
            dec[dst + 2] = l;
            dec[dst + 3] = enc.getUint8(src + 1);
        }
    }
}

export function decompress_R16_G16_Float(dec: Uint8Array, enc: DataView, width: int, height: int): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 4;
            const r = expandFloat16(enc.getUint16(src + 0, true));
            const g = expandFloat16(enc.getUint16(src + 2, true));
            dec[dst + 0] = floatToByte(r);
            dec[dst + 1] = floatToByte(g);
            dec[dst + 2] = 0;
            dec[dst + 3] = 255;
        }
    }
}

export function decompress_R16_G16(dec: Uint8Array, enc: DataView, width: int, height: int): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 4;
            const r = enc.getUint16(src + 0, true);
            const g = enc.getUint16(src + 2, true);
            dec[dst + 0] = (r >> 8);
            dec[dst + 1] = (g >> 8);
            dec[dst + 2] = 0;
            dec[dst + 3] = 255;
        }
    }
}

export function decompress_R32_G32_Float(dec: Uint8Array, enc: DataView, width: int, height: int): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 8;
            const r = enc.getFloat32(src + 0, true);
            const g = enc.getFloat32(src + 4, true);
            dec[dst + 0] = floatToByte(r);
            dec[dst + 1] = floatToByte(g);
            dec[dst + 2] = 0;
            dec[dst + 3] = 255;
        }
    }
}

export function decompress_R32_G32(dec: Uint8Array, enc: DataView, width: int, height: int): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 8;
            const r = enc.getUint32(src + 0, true);
            const g = enc.getUint32(src + 4, true);
            dec[dst + 0] = (r >> 24);
            dec[dst + 1] = (g >> 24);
            dec[dst + 2] = 0;
            dec[dst + 3] = 255;
        }
    }
}

export function decompress_R8(dec: Uint8Array, enc: DataView, width: int, height: int): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 1;
            dec[dst + 0] = enc.getUint8(src + 0);
            dec[dst + 1] = 0;
            dec[dst + 2] = 0;
            dec[dst + 3] = 255;
        }
    }
}

export function decompress_A8(dec: Uint8Array, enc: DataView, width: int, height: int): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 1;
            dec[dst + 0] = RGB_for_A8;
            dec[dst + 1] = RGB_for_A8;
            dec[dst + 2] = RGB_for_A8;
            dec[dst + 3] = enc.getUint8(src + 0);
        }
    }
}

export function decompress_L8(dec: Uint8Array, enc: DataView, width: int, height: int): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 1;
            const l = enc.getUint8(src + 0);
            dec[dst + 0] = l;
            dec[dst + 1] = l;
            dec[dst + 2] = l;
            dec[dst + 3] = 255;
        }
    }
}

export function decompress_R16_Float(dec: Uint8Array, enc: DataView, width: int, height: int): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 2;
            const r = expandFloat16(enc.getUint16(src + 0, true));
            dec[dst + 0] = floatToByte(r);
            dec[dst + 1] = 0;
            dec[dst + 2] = 0;
            dec[dst + 3] = 255;
        }
    }
}

export function decompress_R16(dec: Uint8Array, enc: DataView, width: int, height: int): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 2;
            const r = enc.getUint16(src + 0, true);
            dec[dst + 0] = (r >> 8);
            dec[dst + 1] = 0;
            dec[dst + 2] = 0;
            dec[dst + 3] = 255;
        }
    }
}

export function decompress_R32_Float(dec: Uint8Array, enc: DataView, width: int, height: int): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 4;
            const r = enc.getFloat32(src + 0, true);
            dec[dst + 0] = floatToByte(r);
            dec[dst + 1] = 0;
            dec[dst + 2] = 0;
            dec[dst + 3] = 255;
        }
    }
}

export function decompress_R32(dec: Uint8Array, enc: DataView, width: int, height: int): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 4;
            const r = enc.getUint32(src + 0, true);
            dec[dst + 0] = (r >> 24);
            dec[dst + 1] = 0;
            dec[dst + 2] = 0;
            dec[dst + 3] = 255;
        }
    }
}

export function decompress_R11_G11_B10_UFloat(dec: Uint8Array, enc: DataView, width: int, height: int): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 4;
            const dword = enc.getUint32(src, true);
            const r = expandFloat11((dword >> 0) & 0x7ff);
            const g = expandFloat11((dword >> 11) & 0x7ff);
            const b = expandFloat10((dword >> 22) & 0x3ff);
            dec[dst + 0] = floatToByte(r);
            dec[dst + 1] = floatToByte(g);
            dec[dst + 2] = floatToByte(b);
            dec[dst + 3] = 255;
        }
    }
}

export function decompress_RGB9_E5_UFloat(dec: Uint8Array, enc: DataView, width: int, height: int): void {
    const lookupTable = new Array(32);
    for (let e = 0; e < 31; e++) {
        lookupTable[e] = Math.pow(2, e - 24);
    }
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 4;
            const dword = enc.getUint32(src, true);
            const r = (dword >> 0) & 0x1ff;
            const g = (dword >> 9) & 0x1ff;
            const b = (dword >> 18) & 0x1ff;
            const e = (dword >> 27) & 0x1f;
            const scale = lookupTable[e];
            dec[dst + 0] = floatToByte(r * scale);
            dec[dst + 1] = floatToByte(g * scale);
            dec[dst + 2] = floatToByte(b * scale);
            dec[dst + 3] = 255;
        }
    }
}

export function decompress_RGBM_UFloat(dec: Uint8Array, enc: DataView, width: int, height: int, maxRange: float): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 4;
            const r = enc.getUint8(src + 0);
            const g = enc.getUint8(src + 1);
            const b = enc.getUint8(src + 2);
            const m = enc.getUint8(src + 3) / (255.0 * 255.0) * maxRange;
            dec[dst + 0] = floatToByte(r * m);
            dec[dst + 1] = floatToByte(g * m);
            dec[dst + 2] = floatToByte(b * m);
            dec[dst + 3] = 255;
        }
    }
}

export function decompress_RGBD_UFloat(dec: Uint8Array, enc: DataView, width: int, height: int, maxRange: float): void {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dst = (y * width + x) * 4;
            const src = (y * width + x) * 4;
            const r = enc.getUint8(src + 0);
            const g = enc.getUint8(src + 1);
            const b = enc.getUint8(src + 2);
            const d = enc.getUint8(src + 3) * maxRange;
            dec[dst + 0] = floatToByte(r / d);
            dec[dst + 1] = floatToByte(g / d);
            dec[dst + 2] = floatToByte(b / d);
            dec[dst + 3] = 255;
        }
    }
}
