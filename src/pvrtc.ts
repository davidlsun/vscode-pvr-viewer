/*!
\brief Implementation of the Texture Decompression functions.
\file PVRCore/texture/PVRTDecompress.cpp
\author PowerVR by Imagination, Developer Technology Team
\copyright Copyright (c) Imagination Technologies Limited.
*/
//!\cond NO_DOXYGEN

type uint8 = number;
type int = number;
type uint32 = number;

type Pixel32 = Uint8Array;
type Pixel128S = Int32Array;

type PVRTCWord =
{
    modulationData: uint32,
    colorData: uint32
};

type PVRTCWordIndices =
{
    P_x: int,
    P_y: int,
    Q_x: int,
    Q_y: int,
    R_x: int,
    R_y: int,
    S_x: int
    S_y: int
};

const SATURATE = (x: int): uint8 => ((x < 0) ? 0 : ((x > 255) ? 255 : x));

function getColorA(colorData: uint32): Pixel32
{
    if (colorData & (1 << 15)) {
        // Opaque Color Mode - RGB 554
        return new Uint8Array([
            (colorData & 0x7c00) >> 10, // 5->5 bits
            (colorData & 0x3e0) >> 5, // 5->5 bits
            (colorData & 0x1e) | ((colorData & 0x1e) >> 4), // 4->5 bits
            0xf // 0->4 bits
        ]);
    } else {
        // Transparent Color Mode - ARGB 3443
        return new Uint8Array([
            ((colorData & 0xf00) >> 7) | ((colorData & 0xf00) >> 11), // 4->5 bits
            ((colorData & 0xf0) >> 3) | ((colorData & 0xf0) >> 7), // 4->5 bits
            ((colorData & 0xe) << 1) | ((colorData & 0xe) >> 2), // 3->5 bits
            (colorData & 0x7000) >> 11 // 3->4 bits - note 0 at right
        ]);
    }
}

function getColorB(colorData: uint32): Pixel32
{
    if (colorData & (1 << 31)) {
        // Opaque Color Mode - RGB 555
        return new Uint8Array([
            (colorData & 0x7c000000) >> 26, // 5->5 bits
            (colorData & 0x3e00000) >> 21, // 5->5 bits
            (colorData & 0x1f0000) >> 16, // 5->5 bits
            0xf // 0->4 bits
        ]);
    } else {
        // Transparent Color Mode - ARGB 3444
        return new Uint8Array([
            ((colorData & 0xf000000) >> 23) | ((colorData & 0xf000000) >> 27), // 4->5 bits
            ((colorData & 0xf00000) >> 19) | ((colorData & 0xf00000) >> 23), // 4->5 bits
            ((colorData & 0xf0000) >> 15) | ((colorData & 0xf0000) >> 19), // 4->5 bits
            (colorData & 0x70000000) >> 27 // 3->4 bits - note 0 at right
        ]);
    }
}

function interpolateColors(P: Pixel32, Q: Pixel32, R: Pixel32, S: Pixel32, pPixel: Int32Array[], do2bitMode: boolean): void
{
    const wordWidth = (do2bitMode ? 8 : 4);
    const wordHeight = 4;

    // Convert to int 32.
    let hP = new Int32Array([P[0], P[1], P[2], P[3]]);
    let hQ = new Int32Array([Q[0], Q[1], Q[2], Q[3]]);
    let hR = new Int32Array([R[0], R[1], R[2], R[3]]);
    let hS = new Int32Array([S[0], S[1], S[2], S[3]]);

    // Get vectors.
    let QminusP = new Int32Array([hQ[0] - hP[0], hQ[1] - hP[1], hQ[2] - hP[2], hQ[3] - hP[3]]);
    let SminusR = new Int32Array([hS[0] - hR[0], hS[1] - hR[1], hS[2] - hR[2], hS[3] - hR[3]]);

    // Multiply colors.
    hP[0] *= wordWidth;
    hP[1] *= wordWidth;
    hP[2] *= wordWidth;
    hP[3] *= wordWidth;

    hR[0] *= wordWidth;
    hR[1] *= wordWidth;
    hR[2] *= wordWidth;
    hR[3] *= wordWidth;

    if (do2bitMode)
    {
        // Loop through pixels to achieve results.
        for (let x = 0; x < wordWidth; x++)
        {
            let result = new Int32Array([4 * hP[0], 4 * hP[1], 4 * hP[2], 4 * hP[3]]);
            let dY = new Int32Array([hR[0] - hP[0], hR[1] - hP[1], hR[2] - hP[2], hR[3] - hP[3]]);

            for (let y = 0; y < wordHeight; y++)
            {
                pPixel[y * wordWidth + x] = new Int32Array([
                    (result[0] >> 7) + (result[0] >> 2),
                    (result[1] >> 7) + (result[1] >> 2),
                    (result[2] >> 7) + (result[2] >> 2),
                    (result[3] >> 5) + (result[3] >> 1)
                ]);

                result[0] += dY[0];
                result[1] += dY[1];
                result[2] += dY[2];
                result[3] += dY[3];
            }

            hP[0] += QminusP[0];
            hP[1] += QminusP[1];
            hP[2] += QminusP[2];
            hP[3] += QminusP[3];

            hR[0] += SminusR[0];
            hR[1] += SminusR[1];
            hR[2] += SminusR[2];
            hR[3] += SminusR[3];
        }
    }
    else // 4bpp
    {
        // Loop through pixels to achieve results.
        for (let y = 0; y < wordHeight; y++)
        {
            let result = new Int32Array([4 * hP[0], 4 * hP[1], 4 * hP[2], 4 * hP[3]]);
            let dY = new Int32Array([hR[0] - hP[0], hR[1] - hP[1], hR[2] - hP[2], hR[3] - hP[3]]);

            for (let x = 0; x < wordWidth; x++)
            {
                pPixel[y * wordWidth + x] = new Int32Array([
                    (result[0] >> 6) + (result[0] >> 1),
                    (result[1] >> 6) + (result[1] >> 1),
                    (result[2] >> 6) + (result[2] >> 1),
                    (result[3] >> 4) + (result[3] >> 0)
                ]);

                result[0] += dY[0];
                result[1] += dY[1];
                result[2] += dY[2];
                result[3] += dY[3];
            }

            hP[0] += QminusP[0];
            hP[1] += QminusP[1];
            hP[2] += QminusP[2];
            hP[3] += QminusP[3];

            hR[0] += SminusR[0];
            hR[1] += SminusR[1];
            hR[2] += SminusR[2];
            hR[3] += SminusR[3];
        }
    }
}

function unpackModulations(word: PVRTCWord, offsetX: int, offsetY: int, modulationValues: Int32Array[/*16*/], modulationModes: Int32Array[/*16*/], do2bitMode: boolean): void
{
    let WordModMode: uint32 = word.colorData & 0x1;
    let ModulationBits: uint32 = word.modulationData;

    // Unpack differently depending on 2bpp or 4bpp modes.
    if (do2bitMode)
    {
        if (WordModMode)
        {
            // determine which of the three modes are in use:

            // If this is the either the H-only or V-only interpolation mode...
            if (ModulationBits & 0x1)
            {
                // look at the "LSB" for the "centre" (V=2,H=4) texel. Its LSB is now
                // actually used to indicate whether it's the H-only mode or the V-only...

                // The centre texel data is the at (y==2, x==4) and so its LSB is at bit 20.
                if (ModulationBits & (0x1 << 20)) {
                    // This is the V-only mode
                    WordModMode = 3;
                } else {
                    // This is the H-only mode
                    WordModMode = 2;
                }

                // Create an extra bit for the centre pixel so that it looks like
                // we have 2 actual bits for this texel. It makes later coding much easier.
                if (ModulationBits & (0x1 << 21)) {
                    // set it to produce code for 1.0
                    ModulationBits |= (0x1 << 20);
                } else {
                    // clear it to produce 0.0 code
                    ModulationBits &= ~(0x1 << 20);
                }
            }

            if (ModulationBits & 0x2) {
                ModulationBits |= 0x1; // set it
            } else {
                ModulationBits &= ~0x1; // clear it
            }

            // run through all the pixels in the block. Note we can now treat all the
            // "stored" values as if they have 2bits (even when they didn't!)
            for (let y = 0; y < 4; y++) {
                for (let x = 0; x < 8; x++) {
                    modulationModes[x + offsetX][y + offsetY] = WordModMode;

                    // if this is a stored value...
                    if (((x ^ y) & 1) === 0) {
                        modulationValues[x + offsetX][y + offsetY] = ModulationBits & 3;
                        ModulationBits >>= 2;
                    }
                }
            }
        }
        // else if direct encoded 2bit mode - i.e. 1 mode bit per pixel
        else
        {
            for (let y = 0; y < 4; y++) {
                for (let x = 0; x < 8; x++) {
                    modulationModes[x + offsetX][y + offsetY] = WordModMode;
                    // double the bits so 0=> 00, and 1=>11
                    modulationValues[x + offsetX][y + offsetY] = (ModulationBits & 1 ? 0x3 : 0x0);
                    ModulationBits >>= 1;
                }
            }
        }
    }
    else // 4bpp
    {
        // Much simpler than the 2bpp decompression, only two modes, so the n/8 values are set directly.
        // run through all the pixels in the word.
        if (WordModMode)
        {
            for (let y = 0; y < 4; y++) {
                for (let x = 0; x < 4; x++) {
                    modulationValues[y + offsetY][x + offsetX] = ModulationBits & 3;
                    // if (modulationValues==0) {}. We don't need to check 0, 0 = 0/8.
                    if (modulationValues[y + offsetY][x + offsetX] === 1) {
                        modulationValues[y + offsetY][x + offsetX] = 4;
                    } else if (modulationValues[y + offsetY][x + offsetX] === 2) {
                        modulationValues[y + offsetY][x + offsetX] = 14; //+10 tells the decompressor to punch through alpha.
                    } else if (modulationValues[y + offsetY][x + offsetX] === 3) {
                        modulationValues[y + offsetY][x + offsetX] = 8;
                    }
                    ModulationBits >>= 2;
                }
            }
        }
        else
        {
            for (let y = 0; y < 4; y++) {
                for (let x = 0; x < 4; x++) {
                    modulationValues[y + offsetY][x + offsetX] = ModulationBits & 3;
                    modulationValues[y + offsetY][x + offsetX] *= 3;
                    if (modulationValues[y + offsetY][x + offsetX] > 3) {
                        modulationValues[y + offsetY][x + offsetX] -= 1;
                    }
                    ModulationBits >>= 2;
                }
            }
        }
    }
}

function getModulationValues(modulationValues: Int32Array[/*16*/], modulationModes: Int32Array[/*16*/], xPos: int, yPos: int, do2bitMode: boolean): int
{
    if (do2bitMode)
    {
        const RepVals0 = [0, 3, 5, 8];

        // extract the modulation value. If a simple encoding
        if (modulationModes[xPos][yPos] === 0)
        {
            return RepVals0[modulationValues[xPos][yPos]];
        }
        else
        {
            // if this is a stored value
            if (((xPos ^ yPos) & 1) === 0) {
                return RepVals0[modulationValues[xPos][yPos]];
            // else average from the neighbours
            // if H&V interpolation...
            } else if (modulationModes[xPos][yPos] === 1) {
                return (
                    RepVals0[modulationValues[xPos][yPos - 1]] +
                    RepVals0[modulationValues[xPos][yPos + 1]] +
                    RepVals0[modulationValues[xPos - 1][yPos]] +
                    RepVals0[modulationValues[xPos + 1][yPos]] + 2) / 4;
            // else if H-Only
            } else if (modulationModes[xPos][yPos] === 2) {
                return (
                    RepVals0[modulationValues[xPos - 1][yPos]] +
                    RepVals0[modulationValues[xPos + 1][yPos]] + 1) / 2;
            // else it's V-Only
            } else {
                return (
                    RepVals0[modulationValues[xPos][yPos - 1]] +
                    RepVals0[modulationValues[xPos][yPos + 1]] + 1) / 2;
            }
        }
    }
    else // 4bpp
    {
        return modulationValues[xPos][yPos];
    }
}

function pvrtcGetDecompressedPixels(P: PVRTCWord, Q: PVRTCWord, R: PVRTCWord, S: PVRTCWord, do2bitMode: boolean): Pixel32[]
{
    // 4bpp only needs 8*8 values, but 2bpp needs 16*8, so rather than wasting processor time we just statically allocate 16*8.
    let modulationValues = new Array<Int32Array>(16);
    let modulationModes = new Array<Int32Array>(16);
    for (let i = 0; i < 16; i++) {
        modulationValues[i] = new Int32Array(8);
        modulationModes[i] = new Int32Array(8);
    }
    // Only 2bpp needs this.
    // 4bpp only needs 16 values, but 2bpp needs 32, so rather than wasting processor time we just statically allocate 32.
    let upscaledColorA = new Array<Pixel128S>(32);
    let upscaledColorB = new Array<Pixel128S>(32);

    const wordWidth = (do2bitMode ? 8 : 4);
    const wordHeight = 4;

    // Get the modulations from each word.
    unpackModulations(P, 0, 0, modulationValues, modulationModes, do2bitMode);
    unpackModulations(Q, wordWidth, 0, modulationValues, modulationModes, do2bitMode);
    unpackModulations(R, 0, wordHeight, modulationValues, modulationModes, do2bitMode);
    unpackModulations(S, wordWidth, wordHeight, modulationValues, modulationModes, do2bitMode);

    // Bilinear upscale image data from 2x2 -> 4x4
    interpolateColors(getColorA(P.colorData), getColorA(Q.colorData), getColorA(R.colorData), getColorA(S.colorData), upscaledColorA, do2bitMode);
    interpolateColors(getColorB(P.colorData), getColorB(Q.colorData), getColorB(R.colorData), getColorB(S.colorData), upscaledColorB, do2bitMode);

    const pColorData = Array<Pixel32>(wordWidth * wordHeight);

    for (let y = 0; y < wordHeight; y++) {
        for (let x = 0; x < wordWidth; x++) {
            let mod = getModulationValues(modulationValues, modulationModes, x + wordWidth / 2, y + wordHeight / 2, do2bitMode);
            let punchthroughAlpha: boolean = false;
            if (mod > 10) {
                punchthroughAlpha = true;
                mod -= 10;
            }

            let result = new Int32Array([
                (upscaledColorA[y * wordWidth + x][0] * (8 - mod) + upscaledColorB[y * wordWidth + x][0] * mod) / 8,
                (upscaledColorA[y * wordWidth + x][1] * (8 - mod) + upscaledColorB[y * wordWidth + x][1] * mod) / 8,
                (upscaledColorA[y * wordWidth + x][2] * (8 - mod) + upscaledColorB[y * wordWidth + x][2] * mod) / 8,
                punchthroughAlpha ? 0 : (upscaledColorA[y * wordWidth + x][3] * (8 - mod) + upscaledColorB[y * wordWidth + x][3] * mod) / 8
            ]);

            // Convert the 32bit precision Result to 8 bit per channel color.
            if (do2bitMode) {
                pColorData[y * wordWidth + x] = new Uint8Array([
                    SATURATE(result[0]),
                    SATURATE(result[1]),
                    SATURATE(result[2]),
                    SATURATE(result[3])
                ]);
            } else { // 4bpp
                pColorData[y + x * wordHeight] = new Uint8Array([
                    SATURATE(result[0]),
                    SATURATE(result[1]),
                    SATURATE(result[2]),
                    SATURATE(result[3])
                ]);
            }
        }
    }

    return pColorData;
}

const wrapWordIndex = (numWords: int, word: int): int => ((word + numWords) % numWords);
const assert = (condition: boolean): void => { condition; };
const isPowerOf2 = (v: int): boolean => (v !== 0 && !(v & (v - 1)));

function TwiddleUV(XSize: int, YSize: int, XPos: int, YPos: int): int
{
    // Initially assume X is the larger size.
    let MinDimension = XSize;
    let MaxValue = YPos;
    let Twiddled = 0;
    let SrcBitPos = 1;
    let DstBitPos = 1;
    let ShiftCount = 0;

    // Check the sizes are valid.
    assert(YPos < YSize);
    assert(XPos < XSize);
    assert(isPowerOf2(YSize));
    assert(isPowerOf2(XSize));

    // If Y is the larger dimension - switch the min/max values.
    if (YSize < XSize) {
        MinDimension = YSize;
        MaxValue = XPos;
    }

    // Step through all the bits in the "minimum" dimension
    while (SrcBitPos < MinDimension) {
        if (YPos & SrcBitPos) {
            Twiddled |= DstBitPos;
        }
        if (XPos & SrcBitPos) {
            Twiddled |= DstBitPos << 1;
        }
        SrcBitPos <<= 1;
        DstBitPos <<= 2;
        ShiftCount += 1;
    }

    // Prepend any unused bits
    MaxValue >>= ShiftCount;
    Twiddled |= (MaxValue << (2 * ShiftCount));

    return Twiddled;
}

const SET_OUTPUT = (buf: Uint8Array, width: int, x_index: int, y_index: int, value: Pixel32): void => { for (let c = 0; c < 4; c++) { buf[(x_index + y_index * width) * 4 + c] = value[c]; } };

function mapDecompressedData(pOutput: Uint8Array, width: int, pWord: Pixel32[], indices: PVRTCWordIndices, do2bitMode: boolean): void
{
    const wordWidth = (do2bitMode ? 8 : 4);
    const wordHeight = 4;

    for (let y = 0; y < wordHeight / 2; y++) {
        for (let x = 0; x < wordWidth / 2; x++) {
            SET_OUTPUT(pOutput, width,
                (indices.P_x * wordWidth) + x + wordWidth / 2,
                (indices.P_y * wordHeight) + y + wordHeight / 2,
                pWord[y * wordWidth + x]); // map P
            SET_OUTPUT(pOutput, width,
                (indices.Q_x * wordWidth) + x,
                (indices.Q_y * wordHeight) + y + wordHeight / 2,
                pWord[y * wordWidth + x + wordWidth / 2]); // map Q
            SET_OUTPUT(pOutput, width,
                (indices.R_x * wordWidth) + x + wordWidth / 2,
                (indices.R_y * wordHeight) + y,
                pWord[(y + wordHeight / 2) * wordWidth + x]); // map R
            SET_OUTPUT(pOutput, width,
                (indices.S_x * wordWidth) + x,
                (indices.S_y * wordHeight) + y,
                pWord[(y + wordHeight / 2) * wordWidth + x + wordWidth / 2]); // map S
        }
    }
}

function pvrtcDecompress(pDecompressedData: Uint8Array, pCompressedData: DataView, width: int, height: int, do2bitMode: boolean): void
{
    const wordWidth = (do2bitMode ? 8 : 4);
    const wordHeight = 4;

    // Calculate number of words
    const i32NumXWords = width / wordWidth;
    const i32NumYWords = height / wordHeight;

    // For each row of words
    for (let wordY = -1; wordY < i32NumYWords - 1; wordY++)
    {
        // for each column of words
        for (let wordX = -1; wordX < i32NumXWords - 1; wordX++)
        {
            const indices: PVRTCWordIndices = {
                P_x: wrapWordIndex(i32NumXWords, wordX),
                P_y: wrapWordIndex(i32NumYWords, wordY),
                Q_x: wrapWordIndex(i32NumXWords, wordX + 1),
                Q_y: wrapWordIndex(i32NumYWords, wordY),
                R_x: wrapWordIndex(i32NumXWords, wordX),
                R_y: wrapWordIndex(i32NumYWords, wordY + 1),
                S_x: wrapWordIndex(i32NumXWords, wordX + 1),
                S_y: wrapWordIndex(i32NumYWords, wordY + 1)
            };

            // Work out the offsets into the twiddle structs, multiply by eight as there are eight bytes per word.
            const WordOffset_P = TwiddleUV(i32NumXWords, i32NumYWords, indices.P_x, indices.P_y) * 8;
            const WordOffset_Q = TwiddleUV(i32NumXWords, i32NumYWords, indices.Q_x, indices.Q_y) * 8;
            const WordOffset_R = TwiddleUV(i32NumXWords, i32NumYWords, indices.R_x, indices.R_y) * 8;
            const WordOffset_S = TwiddleUV(i32NumXWords, i32NumYWords, indices.S_x, indices.S_y) * 8;

            // Access individual elements to fill out PVRTCWord
            const P: PVRTCWord = {
                colorData: pCompressedData.getUint32(WordOffset_P + 4, true),
                modulationData: pCompressedData.getUint32(WordOffset_P, true)
            };
            const Q: PVRTCWord = {
                colorData: pCompressedData.getUint32(WordOffset_Q + 4, true),
                modulationData: pCompressedData.getUint32(WordOffset_Q, true)
            };
            const R: PVRTCWord = {
                colorData: pCompressedData.getUint32(WordOffset_R + 4, true),
                modulationData: pCompressedData.getUint32(WordOffset_R, true)
            };
            const S: PVRTCWord = {
                colorData: pCompressedData.getUint32(WordOffset_S + 4, true),
                modulationData: pCompressedData.getUint32(WordOffset_S, true)
            };

            // assemble 4 words into struct to get decompressed pixels from
            const pPixels = pvrtcGetDecompressedPixels(P, Q, R, S, do2bitMode);
            mapDecompressedData(pDecompressedData, width, pPixels, indices, do2bitMode);
        }
    }
}

export function PVRTDecompressPVRTC(pResultImage: Uint8Array, pCompressedData: DataView, width: int, height: int, do2bitMode: boolean): void
{
    // Cast the output buffer to a Pixel32 pointer.
    let pDecompressedData = pResultImage;

    // Check the X and Y values are at least the minimum size.
    const trueWidth = Math.max(width, do2bitMode ? 16 : 8);
    const trueHeight = Math.max(height, 8);

    // If the dimensions aren't correct, we need to create a new buffer instead of just using the provided one, as the buffer will overrun otherwise.
    if (trueWidth !== width || trueHeight !== height) {
        pDecompressedData = new Uint8Array(trueWidth * trueHeight * 4);
    }

    // Decompress the surface.
    pvrtcDecompress(pDecompressedData, pCompressedData, trueWidth, trueHeight, do2bitMode);

    // If the dimensions were too small, then copy the new buffer back into the output buffer.
    if (trueWidth !== width || trueHeight !== height) {
        // Loop through all the required pixels.
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                for (let c = 0; c < 4; c++) {
                    pResultImage[(x + y * width) * 4 + c] = pDecompressedData[(x + y * trueWidth) * 4 + c];
                }
            }
        }
    }
}
