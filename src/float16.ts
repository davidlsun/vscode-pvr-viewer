// This function converts a Float16 stored as the bits of a Uint16 into a Javascript Number.
// Adapted from: https://gist.github.com/mfirmin/456e1c6dcf7b0e1bda6e940add32adad
// Adapted from: https://gist.github.com/martinkallman/5049614
// input is a Uint16 (eg, new Uint16Array([value])[0])

type uint16 = number;
type float = number;

// Create a 32 bit DataView to store the input
const _dv = new DataView(new ArrayBuffer(4));

function convertToFloat(input: uint16): float {
    // Set the Float16 into the last 16 bits of the dataview
    // So our dataView is [00xx]
    _dv.setUint16(2, input, false);

    // Get all 32 bits as a 32 bit integer
    // (JS bitwise operations are performed on 32 bit signed integers)
    const asInt32 = _dv.getInt32(0, false);

    // All bits aside from the sign
    let rest = asInt32 & 0x7fff;
    // Sign bit
    let sign = asInt32 & 0x8000;
    // Exponent bits
    const exponent = asInt32 & 0x7c00;

    // Shift the non-sign bits into place for a 32 bit Float
    rest <<= 13;
    // Shift the sign bit into place for a 32 bit Float
    sign <<= 16;

    // Adjust bias
    // https://en.wikipedia.org/wiki/Half-precision_floating-point_format#Exponent_encoding
    rest += 0x38000000;
    // Denormals-as-zero
    rest = (exponent === 0 ? 0 : rest);
    // Re-insert sign bit
    rest |= sign;

    // Set the adjusted float32 (stored as int32) back into the dataview
    _dv.setInt32(0, rest, false);

    // Get it back out as a float32 (which js will convert to a Number)
    const asFloat32 = _dv.getFloat32(0, false);

    return asFloat32;
}

export function getFloat16(dataview: DataView, byteOffset: number, littleEndian?: boolean): number
{
    return convertToFloat(dataview.getUint16(byteOffset, littleEndian));
}
