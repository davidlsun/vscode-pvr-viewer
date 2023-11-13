/*!
\brief Implementation of the Texture Decompression functions.
\file PVRCore/texture/PVRTDecompress.cpp
\author PowerVR by Imagination, Developer Technology Team
\copyright Copyright (c) Imagination Technologies Limited.
*/
//!\cond NO_DOXYGEN

type uint8_t = number;
type int = number;
type int32_t = number;
type uint32_t = number;

type Pixel32 =
{
	red: uint8_t,
	green: uint8_t,
	blue: uint8_t,
	alpha: uint8_t
};

type Pixel128S =
{
	red: int32_t,
	green: int32_t,
	blue: int32_t,
	alpha: int32_t
};

type PVRTCWord =
{
	modulationData: uint32_t,
	colorData: uint32_t
};

type PVRTCWordIndices =
{
	P_0: int,
	P_1: int,
	Q_0: int,
	Q_1: int,
	R_0: int,
	R_1: int,
	S_0: int
	S_1: int
};

function getColorA(colorData: uint32_t): Pixel32
{
	// Opaque Color Mode - RGB 554
	if ((colorData & 0x8000) !== 0)
	{
		let color: Pixel32 = {
			red: ((colorData & 0x7c00) >> 10), // 5->5 bits
			green: ((colorData & 0x3e0) >> 5), // 5->5 bits
			blue: (colorData & 0x1e) | ((colorData & 0x1e) >> 4), // 4->5 bits
			alpha: (0xf) // 0->4 bits
		};
		return color;
	}
	// Transparent Color Mode - ARGB 3443
	else
	{
		let color: Pixel32 = {
			red: ((colorData & 0xf00) >> 7) | ((colorData & 0xf00) >> 11), // 4->5 bits
			green: ((colorData & 0xf0) >> 3) | ((colorData & 0xf0) >> 7), // 4->5 bits
			blue: ((colorData & 0xe) << 1) | ((colorData & 0xe) >> 2), // 3->5 bits
			alpha: ((colorData & 0x7000) >> 11) // 3->4 bits - note 0 at right
		};
		return color;
	}
}

function getColorB(colorData: uint32_t): Pixel32
{
	// Opaque Color Mode - RGB 555
	if (colorData & 0x80000000)
	{
		let color: Pixel32 = {
			red: ((colorData & 0x7c000000) >> 26), // 5->5 bits
			green: ((colorData & 0x3e00000) >> 21), // 5->5 bits
			blue: ((colorData & 0x1f0000) >> 16), // 5->5 bits
			alpha: (0xf) // 0 bits
		};
		return color;
	}
	// Transparent Color Mode - ARGB 3444
	else
	{
		let color: Pixel32 = {
			red: (((colorData & 0xf000000) >> 23) | ((colorData & 0xf000000) >> 27)), // 4->5 bits
			green: (((colorData & 0xf00000) >> 19) | ((colorData & 0xf00000) >> 23)), // 4->5 bits
			blue: (((colorData & 0xf0000) >> 15) | ((colorData & 0xf0000) >> 19)), // 4->5 bits
			alpha: ((colorData & 0x70000000) >> 27) // 3->4 bits - note 0 at right
		};
		return color;
	}
}

function interpolateColors(P: Pixel32, Q: Pixel32, R: Pixel32, S: Pixel32, pPixel: Pixel128S[], bpp: int): void
{
	const wordWidth = (bpp === 2 ? 8 : 4);
	const wordHeight = 4;

	// Convert to int 32.
	let hP: Pixel128S = { red: P.red, green: P.green, blue: P.blue, alpha: P.alpha };
	let hQ: Pixel128S = { red: Q.red, green: Q.green, blue: Q.blue, alpha: Q.alpha };
	let hR: Pixel128S = { red: R.red, green: R.green, blue: R.blue, alpha: R.alpha };
	let hS: Pixel128S = { red: S.red, green: S.green, blue: S.blue, alpha: S.alpha };

	// Get vectors.
	let QminusP: Pixel128S = { red: hQ.red - hP.red, green: hQ.green - hP.green, blue: hQ.blue - hP.blue, alpha: hQ.alpha - hP.alpha };
	let SminusR: Pixel128S = { red: hS.red - hR.red, green: hS.green - hR.green, blue: hS.blue - hR.blue, alpha: hS.alpha - hR.alpha };

	// Multiply colors.
	hP.red *= wordWidth;
	hP.green *= wordWidth;
	hP.blue *= wordWidth;
	hP.alpha *= wordWidth;
	hR.red *= wordWidth;
	hR.green *= wordWidth;
	hR.blue *= wordWidth;
	hR.alpha *= wordWidth;

	if (bpp === 2)
	{
		// Loop through pixels to achieve results.
		for (let x: uint32_t = 0; x < wordWidth; x++)
		{
			let result: Pixel128S = { red: 4 * hP.red, green: 4 * hP.green, blue: 4 * hP.blue, alpha: 4 * hP.alpha };
			let dY: Pixel128S = { red: hR.red - hP.red, green: hR.green - hP.green, blue: hR.blue - hP.blue, alpha: hR.alpha - hP.alpha };

			for (let y: uint32_t = 0; y < wordHeight; y++)
			{
				pPixel[y * wordWidth + x].red = (result.red >> 7) + (result.red >> 2);
				pPixel[y * wordWidth + x].green = (result.green >> 7) + (result.green >> 2);
				pPixel[y * wordWidth + x].blue = (result.blue >> 7) + (result.blue >> 2);
				pPixel[y * wordWidth + x].alpha = (result.alpha >> 5) + (result.alpha >> 1);

				result.red += dY.red;
				result.green += dY.green;
				result.blue += dY.blue;
				result.alpha += dY.alpha;
			}

			hP.red += QminusP.red;
			hP.green += QminusP.green;
			hP.blue += QminusP.blue;
			hP.alpha += QminusP.alpha;

			hR.red += SminusR.red;
			hR.green += SminusR.green;
			hR.blue += SminusR.blue;
			hR.alpha += SminusR.alpha;
		}
	}
	else
	{
		// Loop through pixels to achieve results.
		for (let y = 0; y < wordHeight; y++)
		{
			let result: Pixel128S = { red: 4 * hP.red, green: 4 * hP.green, blue: 4 * hP.blue, alpha: 4 * hP.alpha };
			let dY: Pixel128S = { red: hR.red - hP.red, green: hR.green - hP.green, blue: hR.blue - hP.blue, alpha: hR.alpha - hP.alpha };

			for (let x = 0; x < wordWidth; x++)
			{
				pPixel[y * wordWidth + x].red = (result.red >> 6) + (result.red >> 1);
				pPixel[y * wordWidth + x].green = (result.green >> 6) + (result.green >> 1);
				pPixel[y * wordWidth + x].blue = (result.blue >> 6) + (result.blue >> 1);
				pPixel[y * wordWidth + x].alpha = (result.alpha >> 4) + (result.alpha >> 0);

				result.red += dY.red;
				result.green += dY.green;
				result.blue += dY.blue;
				result.alpha += dY.alpha;
			}

			hP.red += QminusP.red;
			hP.green += QminusP.green;
			hP.blue += QminusP.blue;
			hP.alpha += QminusP.alpha;

			hR.red += SminusR.red;
			hR.green += SminusR.green;
			hR.blue += SminusR.blue;
			hR.alpha += SminusR.alpha;
		}
	}
}

function unpackModulations(word: PVRTCWord, offsetX: int32_t, offsetY: int32_t, modulationValues: int32_t[/*16*/][/*8*/], modulationModes: int32_t[/*16*/][/*8*/], bpp: int): void
{
	let WordModMode: uint32_t = word.colorData & 0x1;
	let ModulationBits: uint32_t = word.modulationData;

	// Unpack differently depending on 2bpp or 4bpp modes.
	if (bpp === 2)
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
			} // end if H-Only or V-Only interpolation mode was chosen

			if (ModulationBits & 0x2) {
				ModulationBits |= 0x1; /*set it*/
			} else {
				ModulationBits &= ~0x1; /*clear it*/
			}

			// run through all the pixels in the block. Note we can now treat all the
			// "stored" values as if they have 2bits (even when they didn't!)
			for (let y: uint8_t = 0; y < 4; y++) {
				for (let x: uint8_t = 0; x < 8; x++) {
					modulationModes[x + offsetX][y + offsetY] = WordModMode;

					// if this is a stored value...
					if (((x ^ y) & 1) === 0) {
						modulationValues[x + offsetX][y + offsetY] = ModulationBits & 3;
						ModulationBits >>= 2;
					}
				}
			} // end for y
		}
		// else if direct encoded 2bit mode - i.e. 1 mode bit per pixel
		else
		{
			for (let y: uint8_t = 0; y < 4; y++) {
				for (let x: uint8_t = 0; x < 8; x++) {
					modulationModes[x + offsetX][y + offsetY] = WordModMode;

					/*
					// double the bits so 0=> 00, and 1=>11
					*/
					if (ModulationBits & 1) {
						modulationValues[x + offsetX][y + offsetY] = 0x3;
					} else {
						modulationValues[x + offsetX][y + offsetY] = 0x0;
					}
					ModulationBits >>= 1;
				}
			} // end for y
		}
	}
	else
	{
		// Much simpler than the 2bpp decompression, only two modes, so the n/8 values are set directly.
		// run through all the pixels in the word.
		if (WordModMode)
		{
			for (let y: uint8_t = 0; y < 4; y++) {
				for (let x: uint8_t = 0; x < 4; x++) {
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
				} // end for x
			} // end for y
		}
		else
		{
			for (let y: uint8_t = 0; y < 4; y++) {
				for (let x: uint8_t = 0; x < 4; x++) {
					modulationValues[y + offsetY][x + offsetX] = ModulationBits & 3;
					modulationValues[y + offsetY][x + offsetX] *= 3;
					if (modulationValues[y + offsetY][x + offsetX] > 3) {
						modulationValues[y + offsetY][x + offsetX] -= 1;
					}
					ModulationBits >>= 2;
				} // end for x
			} // end for y
		}
	}
}

function getModulationValues(modulationValues: int32_t[/*16*/][/*8*/], modulationModes: int32_t[/*16*/][/*8*/], xPos: uint32_t, yPos: uint32_t, bpp: int): int32_t
{
	if (bpp === 2)
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
				return (RepVals0[modulationValues[xPos][yPos - 1]] + RepVals0[modulationValues[xPos][yPos + 1]] + RepVals0[modulationValues[xPos - 1][yPos]] + RepVals0[modulationValues[xPos + 1][yPos]] + 2) / 4;
			// else if H-Only
			} else if (modulationModes[xPos][yPos] === 2) {
				return (RepVals0[modulationValues[xPos - 1][yPos]] + RepVals0[modulationValues[xPos + 1][yPos]] + 1) / 2;
			// else it's V-Only
			} else {
				return (RepVals0[modulationValues[xPos][yPos - 1]] + RepVals0[modulationValues[xPos][yPos + 1]] + 1) / 2;
			}
		}
	}
	else if (bpp === 4)
	{
		return modulationValues[xPos][yPos];
	}

	return 0;
}

function pvrtcGetDecompressedPixels(P: PVRTCWord, Q: PVRTCWord, R: PVRTCWord, S: PVRTCWord, pColorData: Pixel32[], bpp: int): void
{
	// 4bpp only needs 8*8 values, but 2bpp needs 16*8, so rather than wasting processor time we just statically allocate 16*8.
	let modulationValues = new Array<Array<int32_t>>(16);
	let modulationModes = new Array<Array<int32_t>>(16);
	for (let i = 0; i < 8; i++) {
		modulationValues[i] = new Array<int32_t>(8);
		modulationModes[i] = new Array<int32_t>(8);
	};
	// Only 2bpp needs this.
	// 4bpp only needs 16 values, but 2bpp needs 32, so rather than wasting processor time we just statically allocate 32.
	let upscaledColorA = new Array<Pixel128S>(32);
	let upscaledColorB = new Array<Pixel128S>(32);

	const wordWidth = (bpp === 2 ? 8 : 4);
	const wordHeight = 4;

	// Get the modulations from each word.
	unpackModulations(P, 0, 0, modulationValues, modulationModes, bpp);
	unpackModulations(Q, wordWidth, 0, modulationValues, modulationModes, bpp);
	unpackModulations(R, 0, wordHeight, modulationValues, modulationModes, bpp);
	unpackModulations(S, wordWidth, wordHeight, modulationValues, modulationModes, bpp);

	// Bilinear upscale image data from 2x2 -> 4x4
	interpolateColors(getColorA(P.colorData), getColorA(Q.colorData), getColorA(R.colorData), getColorA(S.colorData), upscaledColorA, bpp);
	interpolateColors(getColorB(P.colorData), getColorB(Q.colorData), getColorB(R.colorData), getColorB(S.colorData), upscaledColorB, bpp);

	for (let y: uint32_t = 0; y < wordHeight; y++) {
		for (let x: uint32_t = 0; x < wordWidth; x++) {
			let mod: int32_t = getModulationValues(modulationValues, modulationModes, x + wordWidth / 2, y + wordHeight / 2, bpp);
			let punchthroughAlpha: boolean = false;
			if (mod > 10) {
				punchthroughAlpha = true;
				mod -= 10;
			}

			let result: Pixel128S = {
				red: (upscaledColorA[y * wordWidth + x].red * (8 - mod) + upscaledColorB[y * wordWidth + x].red * mod) / 8,
				green: (upscaledColorA[y * wordWidth + x].green * (8 - mod) + upscaledColorB[y * wordWidth + x].green * mod) / 8,
				blue: (upscaledColorA[y * wordWidth + x].blue * (8 - mod) + upscaledColorB[y * wordWidth + x].blue * mod) / 8,
				alpha: punchthroughAlpha ? 0 : (upscaledColorA[y * wordWidth + x].alpha * (8 - mod) + upscaledColorB[y * wordWidth + x].alpha * mod) / 8
			};

			// Convert the 32bit precision Result to 8 bit per channel color.
			if (bpp === 2) {
				pColorData[y * wordWidth + x] = {
					red: result.red & 0xff,
					green: result.green & 0xff,
					blue: result.blue & 0xff,
					alpha: result.alpha & 0xff
				};
			} else if (bpp === 4) {
				pColorData[y + x * wordHeight] = {
					red: result.red & 0xff,
					green: result.green & 0xff,
					blue: result.blue & 0xff,
					alpha: result.alpha & 0xff
				};
			}
		}
	}
}

const wrapWordIndex = (numWords: uint32_t, word: int): uint32_t => ((word + numWords) % numWords);
const assert = (condition: boolean): void => { };

function isPowerOf2(input: uint32_t): boolean
{
	let minus1: uint32_t;

	if (!input) { return false; }

	minus1 = input - 1;
	return ((input | minus1) === (input ^ minus1));
}

function TwiddleUV(XSize: uint32_t, YSize: uint32_t, XPos: uint32_t, YPos: uint32_t): uint32_t
{
	// Initially assume X is the larger size.
	let MinDimension: uint32_t = XSize;
	let MaxValue: uint32_t = YPos;
	let Twiddled: uint32_t = 0;
	let SrcBitPos: uint32_t = 1;
	let DstBitPos: uint32_t = 1;
	let ShiftCount: int = 0;

	// Check the sizes are valid.
	assert(YPos < YSize);
	assert(XPos < XSize);
	assert(isPowerOf2(YSize));
	assert(isPowerOf2(XSize));

	// If Y is the larger dimension - switch the min/max values.
	if (YSize < XSize)
	{
		MinDimension = YSize;
		MaxValue = XPos;
	}

	// Step through all the bits in the "minimum" dimension
	while (SrcBitPos < MinDimension)
	{
		if (YPos & SrcBitPos) { Twiddled |= DstBitPos; }

		if (XPos & SrcBitPos) { Twiddled |= (DstBitPos << 1); }

		SrcBitPos <<= 1;
		DstBitPos <<= 2;
		ShiftCount += 1;
	}

	// Prepend any unused bits
	MaxValue >>= ShiftCount;
	Twiddled |= (MaxValue << (2 * ShiftCount));

	return Twiddled;
}

const SET_OUTPUT = (buf: Uint8Array, i: int, c: Pixel32): void => { buf[i*4+0] = c.red; buf[i*4+1] = c.green; buf[i*4+2] = c.blue; buf[i*4+3] = c.alpha; };

function mapDecompressedData(pOutput: Uint8Array, width: uint32_t, pWord: Pixel32[], words: PVRTCWordIndices, bpp: int): void
{
	const wordWidth = (bpp === 2 ? 8 : 4);
	const wordHeight = 4;

	for (let y = 0; y < wordHeight / 2; y++) {
		for (let x = 0; x < wordWidth / 2; x++) {
			SET_OUTPUT(pOutput,
				((words.P_1 * wordHeight) + y + wordHeight / 2) * width + words.P_0 * wordWidth + x + wordWidth / 2,
				pWord[y * wordWidth + x]); // map P
			SET_OUTPUT(pOutput,
				((words.Q_1 * wordHeight) + y + wordHeight / 2) * width + words.Q_0 * wordWidth + x,
				pWord[y * wordWidth + x + wordWidth / 2]); // map Q
			SET_OUTPUT(pOutput,
				(((words.R_1 * wordHeight) + y) * width + words.R_0 * wordWidth + x + wordWidth / 2),
				pWord[(y + wordHeight / 2) * wordWidth + x]); // map R
			SET_OUTPUT(pOutput,
				(((words.S_1 * wordHeight) + y) * width + words.S_0 * wordWidth + x),
				pWord[(y + wordHeight / 2) * wordWidth + x + wordWidth / 2]); // map S
		}
	}
}

function pvrtcDecompress(pCompressedData: DataView, pDecompressedData: Uint8Array, width: uint32_t, height: uint32_t, bpp: int): uint32_t
{
	const wordWidth = (bpp === 2 ? 8 : 4);
	const wordHeight = 4;

	// Calculate number of words
	let i32NumXWords: int = width / wordWidth;
	let i32NumYWords: int = height / wordHeight;

	// Structs used for decompression
	let pPixels = new Array<Pixel32>(wordWidth * wordHeight);

	// For each row of words
	for (let wordY: int32_t = -1; wordY < i32NumYWords - 1; wordY++)
	{
		// for each column of words
		for (let wordX: int32_t = -1; wordX < i32NumXWords - 1; wordX++)
		{
			let indices: PVRTCWordIndices = {
				P_0: wrapWordIndex(i32NumXWords, wordX),
				P_1: wrapWordIndex(i32NumYWords, wordY),
				Q_0: wrapWordIndex(i32NumXWords, wordX + 1),
				Q_1: wrapWordIndex(i32NumYWords, wordY),
				R_0: wrapWordIndex(i32NumXWords, wordX),
				R_1: wrapWordIndex(i32NumYWords, wordY + 1),
				S_0: wrapWordIndex(i32NumXWords, wordX + 1),
				S_1: wrapWordIndex(i32NumYWords, wordY + 1)
			};

			// Work out the offsets into the twiddle structs, multiply by two as there are two members per word.
			let WordOffsets: uint32_t[] = [
				TwiddleUV(i32NumXWords, i32NumYWords, indices.P_0, indices.P_1) * 2,
				TwiddleUV(i32NumXWords, i32NumYWords, indices.Q_0, indices.Q_1) * 2,
				TwiddleUV(i32NumXWords, i32NumYWords, indices.R_0, indices.R_1) * 2,
				TwiddleUV(i32NumXWords, i32NumYWords, indices.S_0, indices.S_1) * 2
			];

			// Access individual elements to fill out PVRTCWord
			let P: PVRTCWord = {
				colorData: pCompressedData.getUint32(WordOffsets[0] * 4 + 4),
				modulationData: pCompressedData.getUint32(WordOffsets[0] * 4)
			};
			let Q: PVRTCWord = {
				colorData: pCompressedData.getUint32(WordOffsets[1] * 4 + 4),
				modulationData: pCompressedData.getUint32(WordOffsets[1] * 4)
			};
			let R: PVRTCWord = {
				colorData: pCompressedData.getUint32(WordOffsets[2] * 4 + 4),
				modulationData: pCompressedData.getUint32(WordOffsets[2] * 4)
			};
			let S: PVRTCWord = {
				colorData: pCompressedData.getUint32(WordOffsets[3] * 4 + 4),
				modulationData: pCompressedData.getUint32(WordOffsets[3] * 4)
			};

			// assemble 4 words into struct to get decompressed pixels from
			pvrtcGetDecompressedPixels(P, Q, R, S, pPixels, bpp);
			mapDecompressedData(pDecompressedData, width, pPixels, indices, bpp);

		} // for each word
	} // for each row of words

	// Return the data size
	return width * height / (wordWidth / 2);
}

export function PVRTDecompressPVRTC(pCompressedData: DataView, Do2bitMode: boolean, XDim: int, YDim: int, pResultImage: Uint8Array): uint32_t
{
	// Cast the output buffer to a Pixel32 pointer.
	let pDecompressedData = pResultImage;

	// Check the X and Y values are at least the minimum size.
	const XTrueDim = Math.max(XDim, Do2bitMode ? 16 : 8);
	const YTrueDim = Math.max(YDim, 8);

	// If the dimensions aren't correct, we need to create a new buffer instead of just using the provided one, as the buffer will overrun otherwise.
	if (XTrueDim !== XDim || YTrueDim !== YDim) {
		pDecompressedData = new Uint8Array(XTrueDim * YTrueDim * 4);
	}

	// Decompress the surface.
	const bpp = (Do2bitMode ? 2 : 4);
	const retval = pvrtcDecompress(pCompressedData, pDecompressedData, XTrueDim, YTrueDim, bpp);

	// If the dimensions were too small, then copy the new buffer back into the output buffer.
	if (XTrueDim !== XDim || YTrueDim !== YDim) {
		// Loop through all the required pixels.
		for (let y = 0; y < YDim; y++) {
			for (let x = 0; x < XDim; x++) {
				for (let c = 0; c < 4; c++) {
					pResultImage[(x + y * XDim) * 4 + c] = pDecompressedData[(x + y * XTrueDim) * 4 + c];
				}
			}
		}
	}

	return retval;
}
