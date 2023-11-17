type uint16 = number;
type float = number;

// used to reinterpret 32-bit values
const _dv = new DataView(new ArrayBuffer(4));

export function expandFloat16(f16: uint16): float {
    // convert S1 E5 M10 to S1 E8 M23
    const sign = f16 & (1 << 15);
    const rest = f16 & ((1 << 15) - 1);
    const exp = f16 & (((1 << 5) - 1) << 10);
    let f32 = exp === 0 ? 0 : (rest << 13) + (112 << 23);
    f32 |= sign << 16;

    // reinterpret the bits as a float
    _dv.setInt32(0, f32, true);
    return _dv.getFloat32(0, true);
}

export function expandFloat11(f11: uint16): float {
    // convert S0 E5 M6 to S1 E8 M23
    const exp = f11 & (((1 << 5) - 1) << 6);
    const f32 = exp === 0 ? 0 : (f11 << 17) + (112 << 23);

    // reinterpret the bits as a float
    _dv.setInt32(0, f32, true);
    return _dv.getFloat32(0, true);
}

export function expandFloat10(f10: uint16): float {
    // convert S0 E5 M5 to S1 E8 M23
    const exp = f10 & (((1 << 5) - 1) << 5);
    const f32 = exp === 0 ? 0 : (f10 << 18) + (112 << 23);

    // reinterpret the bits as a float
    _dv.setInt32(0, f32, true);
    return _dv.getFloat32(0, true);
}
