// Implementation of the Texture Decompression functions.
// PVRCore/texture/PVRTDecompress.cpp
// PowerVR by Imagination, Developer Technology Team
// Copyright (c) Imagination Technologies Limited.

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

let PVRTC2_Mode = false;

function getColorA(colorData: uint32): Pixel32
{
    const opacityFlag = colorData & (PVRTC2_Mode ? (1 << 31) : (1 << 15));
    if (opacityFlag) {
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
    const opacityFlag = colorData & (1 << 31);
    if (opacityFlag) {
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
            ((colorData & 0x70000000) >> 27) | (PVRTC2_Mode ? 1 : 0) // 3->4 bits - note 0 or 1 at right
        ]);
    }
}

function convert5554ToPixel128S(c: Uint8Array): Int32Array
{
    return new Int32Array([
        (c[0] << 3) | (c[0] >> 2),
        (c[1] << 3) | (c[1] >> 2),
        (c[2] << 3) | (c[2] >> 2),
        (c[3] << 4) | (c[3] >> 0)
    ]);
}

function interpolateColors(P: Pixel32, Q: Pixel32, R: Pixel32, S: Pixel32, do2bitMode: boolean): Pixel128S[]
{
    const wordWidth = (do2bitMode ? 8 : 4);
    const wordHeight = 4;

    // Convert to int 32.
    let hP = new Int32Array([P[0], P[1], P[2], P[3]]);
    let hQ = new Int32Array([Q[0], Q[1], Q[2], Q[3]]);
    let hR = new Int32Array([R[0], R[1], R[2], R[3]]);
    let hS = new Int32Array([S[0], S[1], S[2], S[3]]);

    // Get vectors.
    const QminusP = new Int32Array([hQ[0] - hP[0], hQ[1] - hP[1], hQ[2] - hP[2], hQ[3] - hP[3]]);
    const SminusR = new Int32Array([hS[0] - hR[0], hS[1] - hR[1], hS[2] - hR[2], hS[3] - hR[3]]);

    // Multiply colors.
    hP[0] *= wordWidth;
    hP[1] *= wordWidth;
    hP[2] *= wordWidth;
    hP[3] *= wordWidth;

    hR[0] *= wordWidth;
    hR[1] *= wordWidth;
    hR[2] *= wordWidth;
    hR[3] *= wordWidth;

    const pPixel = new Array<Pixel128S>(wordWidth * wordHeight);

    // Loop through pixels to achieve results.
    for (let x = 0; x < wordWidth; x++)
    {
        let result = new Int32Array([hP[0] * wordHeight, hP[1] * wordHeight, hP[2] * wordHeight, hP[3] * wordHeight]);
        let dY = new Int32Array([hR[0] - hP[0], hR[1] - hP[1], hR[2] - hP[2], hR[3] - hP[3]]);

        for (let y = 0; y < wordHeight; y++)
        {
            if (do2bitMode) {
                pPixel[y * wordWidth + x] = new Int32Array([
                    (result[0] >> 7) + (result[0] >> 2),
                    (result[1] >> 7) + (result[1] >> 2),
                    (result[2] >> 7) + (result[2] >> 2),
                    (result[3] >> 5) + (result[3] >> 1)
                ]);
            } else {
                pPixel[y * wordWidth + x] = new Int32Array([
                    (result[0] >> 6) + (result[0] >> 1),
                    (result[1] >> 6) + (result[1] >> 1),
                    (result[2] >> 6) + (result[2] >> 1),
                    (result[3] >> 4) + (result[3] >> 0)
                ]);
            }

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

    return pPixel;
}

function unpackModulations(word: PVRTCWord, offsetX: int, offsetY: int, modulationValues: Int32Array[], modulationModes: Int32Array[], do2bitMode: boolean, hardFlag: boolean): void
{
    const modeFlag = word.colorData & (1 << 0);

    let modulationBits = word.modulationData;

    // Unpack differently depending on 2bpp or 4bpp modes.
    if (do2bitMode)
    {
        if (modeFlag)
        {
            // determine which of the three modes are in use:
            let mode = 1;

            // If this is the either the H-only or V-only interpolation mode...
            if (modulationBits & 0x1)
            {
                // look at the "LSB" for the "centre" (V=2,H=4) texel. Its LSB is now
                // actually used to indicate whether it's the H-only mode or the V-only...

                // The centre texel data is the at (y==2, x==4) and so its LSB is at bit 20.
                if (modulationBits & (1 << 20)) {
                    // This is the V-only mode
                    mode = 3;
                } else {
                    // This is the H-only mode
                    mode = 2;
                }

                // Create an extra bit for the centre pixel so that it looks like
                // we have 2 actual bits for this texel. It makes later coding much easier.
                if (modulationBits & (1 << 21)) {
                    // set it to produce code for 1.0
                    modulationBits |= (1 << 20);
                } else {
                    // clear it to produce 0.0 code
                    modulationBits &= ~(1 << 20);
                }
            }

            if (modulationBits & 0x2) {
                modulationBits |= 0x1; // set it
            } else {
                modulationBits &= ~0x1; // clear it
            }

            // run through all the pixels in the block. Note we can now treat all the
            // "stored" values as if they have 2bits (even when they didn't!)
            for (let y = 0; y < 4; y++) {
                for (let x = 0; x < 8; x++) {
                    modulationModes[x + offsetX][y + offsetY] = mode;

                    // if this is a stored value...
                    if (((x ^ y) & 1) === 0) {
                        modulationValues[x + offsetX][y + offsetY] = modulationBits & 3;
                        modulationBits >>= 2;
                    }
                }
            }
        }
        // else if direct encoded 2bit mode - i.e. 1 mode bit per pixel
        else
        {
            for (let y = 0; y < 4; y++) {
                for (let x = 0; x < 8; x++) {
                    modulationModes[x + offsetX][y + offsetY] = 0;
                    // double the bits so 0=> 00, and 1=>11
                    modulationValues[x + offsetX][y + offsetY] = (modulationBits & 1 ? 3 : 0);
                    modulationBits >>= 1;
                }
            }
        }
    }
    else // 4bpp
    {
        // Much simpler than the 2bpp decompression, only two modes, so the n/8 values are set directly.
        // run through all the pixels in the word.
        if (modeFlag)
        {
            if (hardFlag)
            {
                // local palette mode
                for (let y = 0; y < 4; y++) {
                    for (let x = 0; x < 4; x++) {
                        modulationModes[x + offsetX][y + offsetY] = (modeFlag ? 1 : 0);
                        modulationValues[x + offsetX][y + offsetY] = modulationBits & 3;
                        modulationBits >>= 2;
                    }
                }
            }
            else
            {
                // punch-through alpha
                for (let y = 0; y < 4; y++) {
                    for (let x = 0; x < 4; x++) {
                        modulationModes[x + offsetX][y + offsetY] = (modeFlag ? 1 : 0);
                        let weight = 0;
                        switch (modulationBits & 3) {
                            case 0: weight = 0; break;
                            case 1: weight = 4; break;
                            case 2: weight = 14; break; //+10 tells the decompressor to punch through alpha.
                            case 3: weight = 8; break;
                        }
                        modulationValues[x + offsetX][y + offsetY] = weight;
                        modulationBits >>= 2;
                    }
                }
            }
        }
        else
        {
            // weights for bilinear and non-interpolated modes are the same
            for (let y = 0; y < 4; y++) {
                for (let x = 0; x < 4; x++) {
                    modulationModes[x + offsetX][y + offsetY] = (modeFlag ? 1 : 0);
                    let weight = 0;
                    switch (modulationBits & 3) {
                        case 0: weight = 0; break;
                        case 1: weight = 3; break;
                        case 2: weight = 5; break;
                        case 3: weight = 8; break;
                    }
                    modulationValues[x + offsetX][y + offsetY] = weight;
                    modulationBits >>= 2;
                }
            }
        }
    }
}

function getModulationValues(modulationValues: Int32Array[], modulationModes: Int32Array[], xPos: int, yPos: int, do2bitMode: boolean): int
{
    if (do2bitMode)
    {
        const RepVals0 = [0, 3, 5, 8];

        // extract the modulation value
        const mode = modulationModes[xPos][yPos];
        if (mode === 0) {
            // simple encoding
            return RepVals0[modulationValues[xPos][yPos]];
        } else if (((xPos ^ yPos) & 1) === 0) {
            // stored value (no average from the neighbours)
            return RepVals0[modulationValues[xPos][yPos]];
        } else if (mode === 1) {
            // H&V interpolation
            return (
                RepVals0[modulationValues[xPos][yPos - 1]] +
                RepVals0[modulationValues[xPos][yPos + 1]] +
                RepVals0[modulationValues[xPos - 1][yPos]] +
                RepVals0[modulationValues[xPos + 1][yPos]] + 2) / 4;
        } else if (mode === 2) {
            // H-Only
            return (
                RepVals0[modulationValues[xPos - 1][yPos]] +
                RepVals0[modulationValues[xPos + 1][yPos]] + 1) / 2;
        } else {
            // V-Only
            return (
                RepVals0[modulationValues[xPos][yPos - 1]] +
                RepVals0[modulationValues[xPos][yPos + 1]] + 1) / 2;
        }
    }
    else // 4bpp
    {
        return modulationValues[xPos][yPos];
    }
}

const saturate = (x: int): uint8 => ((x < 0) ? 0 : ((x > 255) ? 255 : x));
const convertToPixel32 = (c: Int32Array): Uint8Array => new Uint8Array([saturate(c[0]), saturate(c[1]), saturate(c[2]), saturate(c[3])]);

// color lookup [Pa, Pb, Qa, Qb, Ra, Rb, Sa, Sb, (5Pa+3Pb)/8, (3Pa+5Pb)/8]
const paletteLookup = [
    [[0, 8, 9, 1], [0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3]],
    [[0, 1, 4, 5], [0, 1, 2, 5], [0, 1, 2, 3], [6, 1, 2, 3]],
    [[0, 1, 4, 5], [0, 1, 4, 5], [0, 7, 4, 3], [6, 7, 2, 3]],
    [[0, 1, 4, 5], [0, 6, 4, 5], [6, 7, 4, 5], [6, 7, 4, 3]]
];

function pvrtcGetDecompressedPixels(P: PVRTCWord, Q: PVRTCWord, R: PVRTCWord, S: PVRTCWord, do2bitMode: boolean): Pixel32[]
{
    const wordWidth = (do2bitMode ? 8 : 4);
    const wordHeight = 4;

    // 4bpp only needs 8*8 values, but 2bpp needs 16*8
    let modulationValues = new Array<Int32Array>(wordWidth * 2);
    let modulationModes = new Array<Int32Array>(wordWidth * 2);
    for (let i = 0; i < wordWidth * 2; i++) {
        modulationValues[i] = new Int32Array(wordHeight * 2);
        modulationModes[i] = new Int32Array(wordHeight * 2);
    }

    // hard flag for block affects region outside own block
    const hardFlag = PVRTC2_Mode && ((P.colorData & (1 << 15)) !== 0);

    // Get the modulations from each word.
    unpackModulations(P, 0, 0, modulationValues, modulationModes, do2bitMode, hardFlag);
    unpackModulations(Q, wordWidth, 0, modulationValues, modulationModes, do2bitMode, hardFlag);
    unpackModulations(R, 0, wordHeight, modulationValues, modulationModes, do2bitMode, hardFlag);
    unpackModulations(S, wordWidth, wordHeight, modulationValues, modulationModes, do2bitMode, hardFlag);

    // Bilinear upscale image data from 2x2 -> 4x4
    const Pa = getColorA(P.colorData);
    const Pb = getColorB(P.colorData);
    const Qa = getColorA(Q.colorData);
    const Qb = getColorB(Q.colorData);
    const Ra = getColorA(R.colorData);
    const Rb = getColorB(R.colorData);
    const Sa = getColorA(S.colorData);
    const Sb = getColorB(S.colorData);
    const upscaledColorA = interpolateColors(Pa, Qa, Ra, Sa, do2bitMode);
    const upscaledColorB = interpolateColors(Pb, Qb, Rb, Sb, do2bitMode);

    const pColorData = Array<Pixel32>(wordWidth * wordHeight);

    for (let y = 0; y < wordHeight; y++) {
        for (let x = 0; x < wordWidth; x++) {
            let result: Int32Array;

            if (hardFlag) {
                const mode = modulationModes[x + wordWidth / 2][y + wordHeight / 2];
                if (do2bitMode || mode === 0) {
                    // non-interpolated
                    const weight = getModulationValues(modulationValues, modulationModes, x + wordWidth / 2, y + wordHeight / 2, do2bitMode);
                    const nearestWord: PVRTCWord = (y < wordHeight / 2) ?
                        ((x < wordWidth / 2) ? P : Q) :
                        ((x < wordWidth / 2) ? R : S);
                    const colorA = convert5554ToPixel128S(getColorA(nearestWord.colorData));
                    const colorB = convert5554ToPixel128S(getColorB(nearestWord.colorData));
    
                    result = new Int32Array([
                        (colorA[0] * (8 - weight) + colorB[0] * weight) / 8,
                        (colorA[1] * (8 - weight) + colorB[1] * weight) / 8,
                        (colorA[2] * (8 - weight) + colorB[2] * weight) / 8,
                        (colorA[3] * (8 - weight) + colorB[3] * weight) / 8
                    ]);
                } else {
                    // local palette mode
                    const modBits = getModulationValues(modulationValues, modulationModes, x + wordWidth / 2, y + wordHeight / 2, do2bitMode);
                    switch (paletteLookup[y][x][modBits]) {
                        case 0: result = convert5554ToPixel128S(Pa); break;
                        case 1: result = convert5554ToPixel128S(Pb); break;
                        case 2: result = convert5554ToPixel128S(Qa); break;
                        case 3: result = convert5554ToPixel128S(Qb); break;
                        case 4: result = convert5554ToPixel128S(Ra); break;
                        case 5: result = convert5554ToPixel128S(Rb); break;
                        case 6: result = convert5554ToPixel128S(Sa); break;
                        case 7: result = convert5554ToPixel128S(Sb); break;
                        case 8:
                            {
                                const colorA = convert5554ToPixel128S(Pa);
                                const colorB = convert5554ToPixel128S(Pb);
                                result = new Int32Array([
                                    (colorA[0] * 5 + colorB[0] * 3) / 8,
                                    (colorA[1] * 5 + colorB[1] * 3) / 8,
                                    (colorA[2] * 5 + colorB[2] * 3) / 8,
                                    (colorA[3] * 5 + colorB[3] * 3) / 8
                                ]);
                            }
                            break;
                        case 9:
                            {
                                const colorA = convert5554ToPixel128S(Pa);
                                const colorB = convert5554ToPixel128S(Pb);
                                result = new Int32Array([
                                    (colorA[0] * 3 + colorB[0] * 5) / 8,
                                    (colorA[1] * 3 + colorB[1] * 5) / 8,
                                    (colorA[2] * 3 + colorB[2] * 5) / 8,
                                    (colorA[3] * 3 + colorB[3] * 5) / 8
                                ]);
                            }
                            break;
                        default:
                            result = new Int32Array([0, 0, 0, 0]);
                            break;
                    }
                }
            } else {
                let weight = getModulationValues(modulationValues, modulationModes, x + wordWidth / 2, y + wordHeight / 2, do2bitMode);
                let punchthroughAlpha = false;
                if (weight > 10) {
                    punchthroughAlpha = true;
                    weight -= 10;
                }

                const colorA = upscaledColorA[y * wordWidth + x];
                const colorB = upscaledColorB[y * wordWidth + x];

                result = new Int32Array([
                    PVRTC2_Mode && punchthroughAlpha ? 0 : (colorA[0] * (8 - weight) + colorB[0] * weight) / 8,
                    PVRTC2_Mode && punchthroughAlpha ? 0 : (colorA[1] * (8 - weight) + colorB[1] * weight) / 8,
                    PVRTC2_Mode && punchthroughAlpha ? 0 : (colorA[2] * (8 - weight) + colorB[2] * weight) / 8,
                    punchthroughAlpha ? 0 : (colorA[3] * (8 - weight) + colorB[3] * weight) / 8
                ]);
            }

            // Convert the 32bit precision Result to 8 bit per channel color.
            pColorData[y * wordWidth + x] = convertToPixel32(result);
        }
    }

    return pColorData;
}

const wrapWordIndex = (numWords: int, word: int): int => ((word + numWords) % numWords);
const assert = (condition: boolean): void => { condition; };
const isPowerOf2 = (v: int): boolean => (v !== 0 && !(v & (v - 1)));

function TwiddleUV(XSize: int, YSize: int, XPos: int, YPos: int): int
{
    if (PVRTC2_Mode) {
        return YPos * XSize + XPos;
    }

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
    for (let wordY = 0; wordY < i32NumYWords; wordY++)
    {
        // for each column of words
        for (let wordX = 0; wordX < i32NumXWords; wordX++)
        {
            const indices: PVRTCWordIndices = {
                P_x: wrapWordIndex(i32NumXWords, wordX - 1),
                P_y: wrapWordIndex(i32NumYWords, wordY - 1),
                Q_x: wrapWordIndex(i32NumXWords, wordX),
                Q_y: wrapWordIndex(i32NumYWords, wordY - 1),
                R_x: wrapWordIndex(i32NumXWords, wordX - 1),
                R_y: wrapWordIndex(i32NumYWords, wordY),
                S_x: wrapWordIndex(i32NumXWords, wordX),
                S_y: wrapWordIndex(i32NumYWords, wordY)
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

export function decompressSurface(pResultImage: Uint8Array, pCompressedData: DataView, width: int, height: int, do2bitMode: boolean, hasAlpha: boolean): void
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
                const dst = (x + y * width) * 4;
                const src = (x + y * trueWidth) * 4;
                for (let c = 0; c < 4; c++) {
                    if (c !== 3 || hasAlpha) {
                        pResultImage[dst + c] = pDecompressedData[src + c];
                    }
                }
            }
        }
    }
}

export function decompress_PVRTC(pResultImage: Uint8Array, pCompressedData: DataView, width: int, height: int, do2bitMode: boolean, hasAlpha: boolean): void
{
    PVRTC2_Mode = false;
    decompressSurface(pResultImage, pCompressedData, width, height, do2bitMode, hasAlpha);
}

export function decompress_PVRTC2(pResultImage: Uint8Array, pCompressedData: DataView, width: int, height: int, do2bitMode: boolean): void
{
    PVRTC2_Mode = true;
    decompressSurface(pResultImage, pCompressedData, width, height, do2bitMode, true);
}
