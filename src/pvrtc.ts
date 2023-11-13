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

type Pixel128S_ptr = Pixel128S*;

const ETC_MIN_TEXWIDTH = 4;
const ETC_MIN_TEXHEIGHT = 4;
const DXT_MIN_TEXWIDTH = 4;
const DXT_MIN_TEXHEIGHT = 4;

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
	P: int[2],
	Q: int[2],
	R: int[2],
	S: int[2]
};

function getColorA(colorData: uint32_t): Pixel32
{
	let color: Pixel32;

	// Opaque Color Mode - RGB 554
	if ((colorData & 0x8000) != 0)
	{
		color.red = ((colorData & 0x7c00) >> 10); // 5->5 bits
		color.green = ((colorData & 0x3e0) >> 5); // 5->5 bits
		color.blue = (colorData & 0x1e) | ((colorData & 0x1e) >> 4); // 4->5 bits
		color.alpha = (0xf); // 0->4 bits
	}
	// Transparent Color Mode - ARGB 3443
	else
	{
		color.red = ((colorData & 0xf00) >> 7) | ((colorData & 0xf00) >> 11); // 4->5 bits
		color.green = ((colorData & 0xf0) >> 3) | ((colorData & 0xf0) >> 7); // 4->5 bits
		color.blue = ((colorData & 0xe) << 1) | ((colorData & 0xe) >> 2); // 3->5 bits
		color.alpha = ((colorData & 0x7000) >> 11); // 3->4 bits - note 0 at right
	}

	return color;
}

function getColorB(colorData: uint32_t): Pixel32
{
	let color: Pixel32;

	// Opaque Color Mode - RGB 555
	if (colorData & 0x80000000)
	{
		color.red = ((colorData & 0x7c000000) >> 26); // 5->5 bits
		color.green = ((colorData & 0x3e00000) >> 21); // 5->5 bits
		color.blue = ((colorData & 0x1f0000) >> 16); // 5->5 bits
		color.alpha = (0xf); // 0 bits
	}
	// Transparent Color Mode - ARGB 3444
	else
	{
		color.red = (((colorData & 0xf000000) >> 23) | ((colorData & 0xf000000) >> 27)); // 4->5 bits
		color.green = (((colorData & 0xf00000) >> 19) | ((colorData & 0xf00000) >> 23)); // 4->5 bits
		color.blue = (((colorData & 0xf0000) >> 15) | ((colorData & 0xf0000) >> 19)); // 4->5 bits
		color.alpha = ((colorData & 0x70000000) >> 27); // 3->4 bits - note 0 at right
	}

	return color;
}

function interpolateColors(P: Pixel32, Q: Pixel32, R: Pixel32, S: Pixel32, pPixel: Pixel128S_ptr, bpp: uint8_t): void
{
	let wordWidth: uint32_t = 4;
	let wordHeight: uint32_t = 4;
	if (bpp == 2) { wordWidth = 8; }

	// Convert to int 32.
	let hP: Pixel128S = { static_cast<int32_t>(P.red), static_cast<int32_t>(P.green), static_cast<int32_t>(P.blue), static_cast<int32_t>(P.alpha) };
	let hQ: Pixel128S = { static_cast<int32_t>(Q.red), static_cast<int32_t>(Q.green), static_cast<int32_t>(Q.blue), static_cast<int32_t>(Q.alpha) };
	let hR: Pixel128S = { static_cast<int32_t>(R.red), static_cast<int32_t>(R.green), static_cast<int32_t>(R.blue), static_cast<int32_t>(R.alpha) };
	let hS: Pixel128S = { static_cast<int32_t>(S.red), static_cast<int32_t>(S.green), static_cast<int32_t>(S.blue), static_cast<int32_t>(S.alpha) };

	// Get vectors.
	let QminusP: Pixel128S = { hQ.red - hP.red, hQ.green - hP.green, hQ.blue - hP.blue, hQ.alpha - hP.alpha };
	let SminusR: Pixel128S = { hS.red - hR.red, hS.green - hR.green, hS.blue - hR.blue, hS.alpha - hR.alpha };

	// Multiply colors.
	hP.red *= wordWidth;
	hP.green *= wordWidth;
	hP.blue *= wordWidth;
	hP.alpha *= wordWidth;
	hR.red *= wordWidth;
	hR.green *= wordWidth;
	hR.blue *= wordWidth;
	hR.alpha *= wordWidth;

	if (bpp == 2)
	{
		// Loop through pixels to achieve results.
		for (let x: uint32_t = 0; x < wordWidth; x++)
		{
			let result: Pixel128S = { 4 * hP.red, 4 * hP.green, 4 * hP.blue, 4 * hP.alpha };
			let dY: Pixel128S = { hR.red - hP.red, hR.green - hP.green, hR.blue - hP.blue, hR.alpha - hP.alpha };

			for (let y: uint32_t = 0; y < wordHeight; y++)
			{
				pPixel[y * wordWidth + x].red = static_cast<int32_t>((result.red >> 7) + (result.red >> 2));
				pPixel[y * wordWidth + x].green = static_cast<int32_t>((result.green >> 7) + (result.green >> 2));
				pPixel[y * wordWidth + x].blue = static_cast<int32_t>((result.blue >> 7) + (result.blue >> 2));
				pPixel[y * wordWidth + x].alpha = static_cast<int32_t>((result.alpha >> 5) + (result.alpha >> 1));

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
		for (let y: uint32_t = 0; y < wordHeight; y++)
		{
			let result: Pixel128S = { 4 * hP.red, 4 * hP.green, 4 * hP.blue, 4 * hP.alpha };
			let dY: Pixel128S = { hR.red - hP.red, hR.green - hP.green, hR.blue - hP.blue, hR.alpha - hP.alpha };

			for (let x: uint32_t = 0; x < wordWidth; x++)
			{
				pPixel[y * wordWidth + x].red = static_cast<int32_t>((result.red >> 6) + (result.red >> 1));
				pPixel[y * wordWidth + x].green = static_cast<int32_t>((result.green >> 6) + (result.green >> 1));
				pPixel[y * wordWidth + x].blue = static_cast<int32_t>((result.blue >> 6) + (result.blue >> 1));
				pPixel[y * wordWidth + x].alpha = static_cast<int32_t>((result.alpha >> 4) + (result.alpha));

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

function unpackModulations(word: const PVRTCWord&, offsetX: int32_t, offsetY: int32_t, modulationValues: int32_t[16][8], modulationModes: int32_t[16][8], bpp: uint8_t): void
{
	let WordModMode: uint32_t = word.colorData & 0x1;
	let ModulationBits: uint32_t = word.modulationData;

	// Unpack differently depending on 2bpp or 4bpp modes.
	if (bpp == 2)
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
				if (ModulationBits & (0x1 << 20))
				{
					// This is the V-only mode
					WordModMode = 3;
				}
				else
				{
					// This is the H-only mode
					WordModMode = 2;
				}

				// Create an extra bit for the centre pixel so that it looks like
				// we have 2 actual bits for this texel. It makes later coding much easier.
				if (ModulationBits & (0x1 << 21))
				{
					// set it to produce code for 1.0
					ModulationBits |= (0x1 << 20);
				}
				else
				{
					// clear it to produce 0.0 code
					ModulationBits &= ~(0x1 << 20);
				}
			} // end if H-Only or V-Only interpolation mode was chosen

			if (ModulationBits & 0x2) { ModulationBits |= 0x1; /*set it*/ }
			else
			{
				ModulationBits &= ~0x1; /*clear it*/
			}

			// run through all the pixels in the block. Note we can now treat all the
			// "stored" values as if they have 2bits (even when they didn't!)
			for (let y: uint8_t = 0; y < 4; y++)
			{
				for (let x: uint8_t = 0; x < 8; x++)
				{
					modulationModes[static_cast<uint32_t>(x + offsetX)][static_cast<uint32_t>(y + offsetY)] = WordModMode;

					// if this is a stored value...
					if (((x ^ y) & 1) == 0) {modulationValues[static_cast<uint32_t>(x + offsetX)][static_cast<uint32_t>(y + offsetY)] = ModulationBits & 3;
						ModulationBits >>= 2;
					}
				}
			} // end for y
		}
		// else if direct encoded 2bit mode - i.e. 1 mode bit per pixel
		else
		{
			for (let y: uint8_t = 0; y < 4; y++)
			{
				for (let x: uint8_t = 0; x < 8; x++)
				{
					modulationModes[static_cast<uint32_t>(x + offsetX)][static_cast<uint32_t>(y + offsetY)] = WordModMode;

					/*
					// double the bits so 0=> 00, and 1=>11
					*/
					if (ModulationBits & 1) { modulationValues[static_cast<uint32_t>(x + offsetX)][static_cast<uint32_t>(y + offsetY)] = 0x3; }
					else
					{
						modulationValues[static_cast<uint32_t>(x + offsetX)][static_cast<uint32_t>(y + offsetY)] = 0x0;
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
			for (let y: uint8_t = 0; y < 4; y++)
			{
				for (let x: uint8_t = 0; x < 4; x++)
				{
					modulationValues[static_cast<uint32_t>(y + offsetY)][static_cast<uint32_t>(x + offsetX)] = ModulationBits & 3;
					// if (modulationValues==0) {}. We don't need to check 0, 0 = 0/8.
					if (modulationValues[static_cast<uint32_t>(y + offsetY)][static_cast<uint32_t>(x + offsetX)] == 1)
					{ modulationValues[static_cast<uint32_t>(y + offsetY)][static_cast<uint32_t>(x + offsetX)] = 4; }
					else if (modulationValues[static_cast<uint32_t>(y + offsetY)][static_cast<uint32_t>(x + offsetX)] == 2)
					{
						modulationValues[static_cast<uint32_t>(y + offsetY)][static_cast<uint32_t>(x + offsetX)] = 14; //+10 tells the decompressor to punch through alpha.
					}
					else if (modulationValues[static_cast<uint32_t>(y + offsetY)][static_cast<uint32_t>(x + offsetX)] == 3)
					{
						modulationValues[static_cast<uint32_t>(y + offsetY)][static_cast<uint32_t>(x + offsetX)] = 8;
					}
					ModulationBits >>= 2;
				} // end for x
			} // end for y
		}
		else
		{
			for (let y: uint8_t = 0; y < 4; y++)
			{
				for (let x: uint8_t = 0; x < 4; x++)
				{
					modulationValues[static_cast<uint32_t>(y + offsetY)][static_cast<uint32_t>(x + offsetX)] = ModulationBits & 3;
					modulationValues[static_cast<uint32_t>(y + offsetY)][static_cast<uint32_t>(x + offsetX)] *= 3;
					if (modulationValues[static_cast<uint32_t>(y + offsetY)][static_cast<uint32_t>(x + offsetX)] > 3)
					{ modulationValues[static_cast<uint32_t>(y + offsetY)][static_cast<uint32_t>(x + offsetX)] -= 1; }
					ModulationBits >>= 2;
				} // end for x
			} // end for y
		}
	}
}

function getModulationValues(modulationValues: int32_t[16][8], modulationModes: int32_t[16][8], xPos: uint32_t, yPos: uint32_t, bpp: uint8_t): int32_t
{
	if (bpp == 2)
	{
		let RepVals0: const int32_t[4] = { 0, 3, 5, 8 };

		// extract the modulation value. If a simple encoding
		if (modulationModes[xPos][yPos] == 0) { return RepVals0[modulationValues[xPos][yPos]]; }
		else
		{
			// if this is a stored value
			if (((xPos ^ yPos) & 1) == 0) { return RepVals0[modulationValues[xPos][yPos]]; }

			// else average from the neighbours
			// if H&V interpolation...
			else if (modulationModes[xPos][yPos] == 1)
			{
				return (RepVals0[modulationValues[xPos][yPos - 1]] + RepVals0[modulationValues[xPos][yPos + 1]] + RepVals0[modulationValues[xPos - 1][yPos]] +
						   RepVals0[modulationValues[xPos + 1][yPos]] + 2) /
					4;
			}
			// else if H-Only
			else if (modulationModes[xPos][yPos] == 2)
			{
				return (RepVals0[modulationValues[xPos - 1][yPos]] + RepVals0[modulationValues[xPos + 1][yPos]] + 1) / 2;
			}
			// else it's V-Only
			else
			{
				return (RepVals0[modulationValues[xPos][yPos - 1]] + RepVals0[modulationValues[xPos][yPos + 1]] + 1) / 2;
			}
		}
	}
	else if (bpp == 4)
	{
		return modulationValues[xPos][yPos];
	}

	return 0;
}

function pvrtcGetDecompressedPixels(P: const PVRTCWord&, Q: const PVRTCWord&, R: const PVRTCWord&, S: const PVRTCWord&, pColorData: Pixel32*, bpp: uint8_t): void
{
	// 4bpp only needs 8*8 values, but 2bpp needs 16*8, so rather than wasting processor time we just statically allocate 16*8.
	let modulationValues: int32_t[16][8];
	// Only 2bpp needs this.
	let modulationModes: int32_t[16][8];
	// 4bpp only needs 16 values, but 2bpp needs 32, so rather than wasting processor time we just statically allocate 32.
	let upscaledColorA: Pixel128S[32];
	let upscaledColorB: Pixel128S[32];

	let wordWidth: uint32_t = 4;
	let wordHeight: uint32_t = 4;
	if (bpp == 2) { wordWidth = 8; }

	// Get the modulations from each word.
	unpackModulations(P, 0, 0, modulationValues, modulationModes, bpp);
	unpackModulations(Q, wordWidth, 0, modulationValues, modulationModes, bpp);
	unpackModulations(R, 0, wordHeight, modulationValues, modulationModes, bpp);
	unpackModulations(S, wordWidth, wordHeight, modulationValues, modulationModes, bpp);

	// Bilinear upscale image data from 2x2 -> 4x4
	interpolateColors(getColorA(P.colorData), getColorA(Q.colorData), getColorA(R.colorData), getColorA(S.colorData), upscaledColorA, bpp);
	interpolateColors(getColorB(P.colorData), getColorB(Q.colorData), getColorB(R.colorData), getColorB(S.colorData), upscaledColorB, bpp);

	for (let y: uint32_t = 0; y < wordHeight; y++)
	{
		for (let x: uint32_t = 0; x < wordWidth; x++)
		{
			let mod: int32_t = getModulationValues(modulationValues, modulationModes, x + wordWidth / 2, y + wordHeight / 2, bpp);
			let punchthroughAlpha: bool = false;
			if (mod > 10)
			{
				punchthroughAlpha = true;
				mod -= 10;
			}

			let result: Pixel128S;
			result.red = (upscaledColorA[y * wordWidth + x].red * (8 - mod) + upscaledColorB[y * wordWidth + x].red * mod) / 8;
			result.green = (upscaledColorA[y * wordWidth + x].green * (8 - mod) + upscaledColorB[y * wordWidth + x].green * mod) / 8;
			result.blue = (upscaledColorA[y * wordWidth + x].blue * (8 - mod) + upscaledColorB[y * wordWidth + x].blue * mod) / 8;
			if (punchthroughAlpha) { result.alpha = 0; }
			else
			{
				result.alpha = (upscaledColorA[y * wordWidth + x].alpha * (8 - mod) + upscaledColorB[y * wordWidth + x].alpha * mod) / 8;
			}

			// Convert the 32bit precision Result to 8 bit per channel color.
			if (bpp == 2)
			{
				pColorData[y * wordWidth + x].red = static_cast<uint8_t>(result.red);
				pColorData[y * wordWidth + x].green = static_cast<uint8_t>(result.green);
				pColorData[y * wordWidth + x].blue = static_cast<uint8_t>(result.blue);
				pColorData[y * wordWidth + x].alpha = static_cast<uint8_t>(result.alpha);
			}
			else if (bpp == 4)
			{
				pColorData[y + x * wordHeight].red = static_cast<uint8_t>(result.red);
				pColorData[y + x * wordHeight].green = static_cast<uint8_t>(result.green);
				pColorData[y + x * wordHeight].blue = static_cast<uint8_t>(result.blue);
				pColorData[y + x * wordHeight].alpha = static_cast<uint8_t>(result.alpha);
			}
		}
	}
}

function wrapWordIndex(numWords: uint32_t, word: int): uint32_t { return ((word + numWords) % numWords); }

function isPowerOf2(input: uint32_t): bool
{
	let minus1: uint32_t;

	if (!input) { return 0; }

	minus1 = input - 1;
	return ((input | minus1) == (input ^ minus1));
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

function mapDecompressedData(pOutput: Pixel32*, width: uint32_t, pWord: const Pixel32*, words: const PVRTCWordIndices&, bpp: uint8_t): void
{
	let wordWidth: uint32_t = 4;
	let wordHeight: uint32_t = 4;
	if (bpp == 2) { wordWidth = 8; }

	for (let y: uint32_t = 0; y < wordHeight / 2; y++)
	{
		for (let x: uint32_t = 0; x < wordWidth / 2; x++)
		{
			pOutput[(((words.P[1] * wordHeight) + y + wordHeight / 2) * width + words.P[0] * wordWidth + x + wordWidth / 2)] = pWord[y * wordWidth + x]; // map P

			pOutput[(((words.Q[1] * wordHeight) + y + wordHeight / 2) * width + words.Q[0] * wordWidth + x)] = pWord[y * wordWidth + x + wordWidth / 2]; // map Q

			pOutput[(((words.R[1] * wordHeight) + y) * width + words.R[0] * wordWidth + x + wordWidth / 2)] = pWord[(y + wordHeight / 2) * wordWidth + x]; // map R

			pOutput[(((words.S[1] * wordHeight) + y) * width + words.S[0] * wordWidth + x)] = pWord[(y + wordHeight / 2) * wordWidth + x + wordWidth / 2]; // map S
		}
	}
}

function pvrtcDecompress(pCompressedData: uint8_t*, pDecompressedData: Pixel32*, width: uint32_t, height: uint32_t, bpp: uint8_t): uint32_t
{
	let wordWidth: uint32_t = 4;
	let wordHeight: uint32_t = 4;
	if (bpp == 2) { wordWidth = 8; }

	uint32_t* pWordMembers = (uint32_t*)pCompressedData;
	Pixel32* pOutData = pDecompressedData;

	// Calculate number of words
	let i32NumXWords: int = static_cast<int>(width / wordWidth);
	let i32NumYWords: int = static_cast<int>(height / wordHeight);

	// Structs used for decompression
	let indices: PVRTCWordIndices;
	std::vector<Pixel32> pPixels(wordWidth * wordHeight * sizeof(Pixel32));

	// For each row of words
	for (let wordY: int32_t = -1; wordY < i32NumYWords - 1; wordY++)
	{
		// for each column of words
		for (let wordX: int32_t = -1; wordX < i32NumXWords - 1; wordX++)
		{
			indices.P[0] = static_cast<int>(wrapWordIndex(i32NumXWords, wordX));
			indices.P[1] = static_cast<int>(wrapWordIndex(i32NumYWords, wordY));
			indices.Q[0] = static_cast<int>(wrapWordIndex(i32NumXWords, wordX + 1));
			indices.Q[1] = static_cast<int>(wrapWordIndex(i32NumYWords, wordY));
			indices.R[0] = static_cast<int>(wrapWordIndex(i32NumXWords, wordX));
			indices.R[1] = static_cast<int>(wrapWordIndex(i32NumYWords, wordY + 1));
			indices.S[0] = static_cast<int>(wrapWordIndex(i32NumXWords, wordX + 1));
			indices.S[1] = static_cast<int>(wrapWordIndex(i32NumYWords, wordY + 1));

			// Work out the offsets into the twiddle structs, multiply by two as there are two members per word.
			let WordOffsets: uint32_t[4] = {
				TwiddleUV(i32NumXWords, i32NumYWords, indices.P[0], indices.P[1]) * 2,
				TwiddleUV(i32NumXWords, i32NumYWords, indices.Q[0], indices.Q[1]) * 2,
				TwiddleUV(i32NumXWords, i32NumYWords, indices.R[0], indices.R[1]) * 2,
				TwiddleUV(i32NumXWords, i32NumYWords, indices.S[0], indices.S[1]) * 2,
			};

			// Access individual elements to fill out PVRTCWord
			let P: PVRTCWord;
			let Q: PVRTCWord;
			let R: PVRTCWord;
			let S: PVRTCWord;
			P.colorData = static_cast<uint32_t>(pWordMembers[WordOffsets[0] + 1]);
			P.modulationData = static_cast<uint32_t>(pWordMembers[WordOffsets[0]]);
			Q.colorData = static_cast<uint32_t>(pWordMembers[WordOffsets[1] + 1]);
			Q.modulationData = static_cast<uint32_t>(pWordMembers[WordOffsets[1]]);
			R.colorData = static_cast<uint32_t>(pWordMembers[WordOffsets[2] + 1]);
			R.modulationData = static_cast<uint32_t>(pWordMembers[WordOffsets[2]]);
			S.colorData = static_cast<uint32_t>(pWordMembers[WordOffsets[3] + 1]);
			S.modulationData = static_cast<uint32_t>(pWordMembers[WordOffsets[3]]);

			// assemble 4 words into struct to get decompressed pixels from
			pvrtcGetDecompressedPixels(P, Q, R, S, pPixels.data(), bpp);
			mapDecompressedData(pOutData, width, pPixels.data(), indices, bpp);

		} // for each word
	} // for each row of words

	// Return the data size
	return width * height / static_cast<uint32_t>((wordWidth / 2));
}

export function PVRTDecompressPVRTC(pCompressedData: const void*, Do2bitMode: uint32_t, XDim: uint32_t, YDim: uint32_t, pResultImage: uint8_t*): uint32_t
{
	// Cast the output buffer to a Pixel32 pointer.
	let pDecompressedData: Pixel32* = (Pixel32*)pResultImage;

	// Check the X and Y values are at least the minimum size.
	let XTrueDim: uint32_t = std::max(XDim, ((Do2bitMode == 1u) ? 16u : 8u));
	let YTrueDim: uint32_t = std::max(YDim, 8u);

	// If the dimensions aren't correct, we need to create a new buffer instead of just using the provided one, as the buffer will overrun otherwise.
	if (XTrueDim != XDim || YTrueDim != YDim) { pDecompressedData = new Pixel32[XTrueDim * YTrueDim]; }

	// Decompress the surface.
	let retval: uint32_t = pvrtcDecompress((uint8_t*)pCompressedData, pDecompressedData, XTrueDim, YTrueDim, uint8_t(Do2bitMode == 1 ? 2 : 4));

	// If the dimensions were too small, then copy the new buffer back into the output buffer.
	if (XTrueDim != XDim || YTrueDim != YDim)
	{
		// Loop through all the required pixels.
		for (let x: uint32_t = 0; x < XDim; ++x)
		{
			for (let y: uint32_t = 0; y < YDim; ++y) { ((Pixel32*)pResultImage)[x + y * XDim] = pDecompressedData[x + y * XTrueDim]; }
		}

		// Free the temporary buffer.
		delete[] pDecompressedData;
	}
	return retval;
}

////////////////////////////////////// ETC Compression //////////////////////////////////////

#define _CLAMP_(X, Xmin, Xmax) ((X) < (Xmax) ? ((X) < (Xmin) ? (Xmin) : (X)) : (Xmax))

let ETC_FLIP: uint32_t = 0x01000000;
let ETC_DIFF: uint32_t = 0x02000000;
const int mod[8][4] = { { 2, 8, -2, -8 }, { 5, 17, -5, -17 }, { 9, 29, -9, -29 }, { 13, 42, -13, -42 }, { 18, 60, -18, -60 }, { 24, 80, -24, -80 }, { 33, 106, -33, -106 },
	{ 47, 183, -47, -183 } };

function modifyPixel(red: int, green: int, blue: int, x: int, y: int, modBlock: uint32_t, modTable: int): uint32_t
{
	let index: int = x * 4 + y;
	let pixelMod: int;
	let mostSig: uint32_t = modBlock << 1;

	if (index < 8) { pixelMod = mod[modTable][((modBlock >> (index + 24)) & 0x1) + ((mostSig >> (index + 8)) & 0x2)]; }
	else
	{
		pixelMod = mod[modTable][((modBlock >> (index + 8)) & 0x1) + ((mostSig >> (index - 8)) & 0x2)];
	}

	red = _CLAMP_(red + pixelMod, 0, 255);
	green = _CLAMP_(green + pixelMod, 0, 255);
	blue = _CLAMP_(blue + pixelMod, 0, 255);

	return ((red << 16) + (green << 8) + blue) | 0xff000000;
}

function ETCTextureDecompress(pSrcData: const void*, x: uint32_t, y: uint32_t, pDestData: void*, _nMode: uint32_t): uint32_t
{
	let output: uint32_t*;
	let blockTop: uint32_t;
	let blockBot: uint32_t;
	let input: const uint32_t* = static_cast<const uint32_t*>(pSrcData);
	let red1: unsigned char;
	let green1: unsigned char;
	let blue1: unsigned char;
	let red2: unsigned char;
	let green2: unsigned char;
	let blue2: unsigned char;
	let bFlip: bool;
	let bDiff: bool;
	let modtable1: int;
	let modtable2: int;

	for (let i: uint32_t = 0; i < y; i += 4)
	{
		for (let m: uint32_t = 0; m < x; m += 4)
		{
			blockTop = *(input++);
			blockBot = *(input++);

			output = (uint32_t*)pDestData + i * x + m;

			// check flipbit
			bFlip = (blockTop & ETC_FLIP) != 0;
			bDiff = (blockTop & ETC_DIFF) != 0;

			if (bDiff)
			{
				// differential mode 5 color bits + 3 difference bits
				// get base color for subblock 1
				blue1 = static_cast<unsigned char>((blockTop & 0xf80000) >> 16u);
				green1 = static_cast<unsigned char>((blockTop & 0xf800) >> 8u);
				red1 = static_cast<unsigned char>(blockTop & 0xf8);

				// get differential color for subblock 2
				let blues: signed char = static_cast<signed char>(blue1 >> 3) + (static_cast<signed char>((blockTop & 0x70000) >> 11) >> 5);
				let greens: signed char = static_cast<signed char>(green1 >> 3) + (static_cast<signed char>((blockTop & 0x700) >> 3) >> 5);
				let reds: signed char = static_cast<signed char>(red1 >> 3) + (static_cast<signed char>((blockTop & 0x7) << 5) >> 5);

				blue2 = static_cast<unsigned char>(blues);
				green2 = static_cast<unsigned char>(greens);
				red2 = static_cast<unsigned char>(reds);

				red1 = static_cast<unsigned char>(red1 + (red1 >> 5u)); // copy bits to lower sig
				green1 = static_cast<unsigned char>(green1 + (green1 >> 5u)); // copy bits to lower sig
				blue1 = static_cast<unsigned char>(blue1 + (blue1 >> 5u)); // copy bits to lower sig

				red2 = static_cast<unsigned char>((red2 << 3u) + (red2 >> 2u)); // copy bits to lower sig
				green2 = static_cast<unsigned char>((green2 << 3u) + (green2 >> 2u)); // copy bits to lower sig
				blue2 = static_cast<unsigned char>((blue2 << 3u) + (blue2 >> 2u)); // copy bits to lower sig
			}
			else
			{
				// individual mode 4 + 4 color bits
				// get base color for subblock 1
				blue1 = static_cast<unsigned char>((blockTop & 0xf00000) >> 16);
				blue1 = static_cast<unsigned char>(blue1 + (blue1 >> 4)); // copy bits to lower sig
				green1 = static_cast<unsigned char>((blockTop & 0xf000) >> 8);
				green1 = static_cast<unsigned char>(green1 + (green1 >> 4)); // copy bits to lower sig
				red1 = static_cast<unsigned char>(blockTop & 0xf0);
				red1 = static_cast<unsigned char>(red1 + (red1 >> 4)); // copy bits to lower sig

				// get base color for subblock 2
				blue2 = static_cast<unsigned char>((blockTop & 0xf0000) >> 12);
				blue2 = static_cast<unsigned char>(blue2 + (blue2 >> 4)); // copy bits to lower sig
				green2 = static_cast<unsigned char>((blockTop & 0xf00) >> 4);
				green2 = static_cast<unsigned char>(green2 + (green2 >> 4)); // copy bits to lower sig
				red2 = static_cast<unsigned char>((blockTop & 0xf) << 4);
				red2 = static_cast<unsigned char>(red2 + (red2 >> 4)); // copy bits to lower sig
			}
			// get the modtables for each subblock
			modtable1 = static_cast<int>((blockTop >> 29) & 0x7);
			modtable2 = static_cast<int>((blockTop >> 26) & 0x7);

			if (!bFlip)
			{
				// 2 2x4 blocks side by side

				for (let j: uint8_t = 0; j < 4; j++) // vertical
				{
					for (let k: uint8_t = 0; k < 2; k++) // horizontal
					{
						*(output + j * x + k) = modifyPixel(red1, green1, blue1, k, j, blockBot, modtable1);
						*(output + j * x + k + 2) = modifyPixel(red2, green2, blue2, k + 2, j, blockBot, modtable2);
					}
				}
			}
			else
			{
				// 2 4x2 blocks on top of each other
				for (let j: uint8_t = 0; j < 2; j++)
				{
					for (let k: uint8_t = 0; k < 4; k++)
					{
						*(output + j * x + k) = modifyPixel(red1, green1, blue1, k, j, blockBot, modtable1);
						*(output + (j + 2) * x + k) = modifyPixel(red2, green2, blue2, k, j + 2, blockBot, modtable2);
					}
				}
			}
		}
	}

	return x * y / 2;
}

export function PVRTDecompressETC(pSrcData: const void*, x: uint32_t, y: uint32_t, pDestData: void*, nMode: uint32_t): uint32_t
{
	let i32read: uint32_t;

	if (x < ETC_MIN_TEXWIDTH || y < ETC_MIN_TEXHEIGHT)
	{
		// decompress into a buffer big enough to take the minimum size
		let pTempBuffer: char* = new char[std::max<uint32_t>(x, ETC_MIN_TEXWIDTH) * std::max<uint32_t>(y, ETC_MIN_TEXHEIGHT) * 4];
		i32read = ETCTextureDecompress(pSrcData, std::max<uint32_t>(x, ETC_MIN_TEXWIDTH), std::max<uint32_t>(y, ETC_MIN_TEXHEIGHT), pTempBuffer, nMode);

		for (let i: uint32_t = 0; i < y; i++)
		{
			// copy from larger temp buffer to output data
			memcpy(static_cast<char*>(pDestData) + i * x * 4, pTempBuffer + std::max<uint32_t>(x, ETC_MIN_TEXWIDTH) * 4 * i, x * 4);
		}

		delete[] pTempBuffer;
	}
	else // decompress larger MIP levels straight into the output data
	{
		i32read = ETCTextureDecompress(pSrcData, x, y, pDestData, nMode);
	}

	// swap r and b channels
	let pSwap: unsigned char * = static_cast<unsigned char*>(pDestData), swap;

	for (let i: uint32_t = 0; i < y; i++)
		for (let j: uint32_t = 0; j < x; j++)
		{
			swap = pSwap[0];
			pSwap[0] = pSwap[2];
			pSwap[2] = swap;
			pSwap += 4;
		}

	return i32read;
}
