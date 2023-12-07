type int = number;
type float = number;

const saturate = (x: int): int => ((x < 0) ? 0 : ((x > 255) ? 255 : x));

export function srgbToLinear(x: float): float {
    return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) * 1.055, 2.4); // sRGB EOTF
}

export function linearToSrgb(buf: Uint8Array, width: int, height: int): void {
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
