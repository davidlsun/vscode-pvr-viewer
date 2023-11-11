/**
 
@~English
@page licensing Licensing
 
@section etcdec etcdec.cxx License
 
etcdec.cxx is made available under the terms and conditions of the following
License Agreement.

Software License Agreement

PLEASE REVIEW THE FOLLOWING TERMS AND CONDITIONS PRIOR TO USING THE
ERICSSON TEXTURE COMPRESSION CODEC SOFTWARE (THE "SOFTWARE"). THE USE
OF THE SOFTWARE IS SUBJECT TO THE TERMS AND CONDITIONS OF THE
FOLLOWING SOFTWARE LICENSE AGREEMENT (THE "SLA"). IF YOU DO NOT ACCEPT
SUCH TERMS AND CONDITIONS YOU MAY NOT USE THE SOFTWARE.

Subject to the terms and conditions of the SLA, the licensee of the
Software (the "Licensee") hereby, receives a non-exclusive,
non-transferable, limited, free-of-charge, perpetual and worldwide
license, to copy, use, distribute and modify the Software, but only
for the purpose of developing, manufacturing, selling, using and
distributing products including the Software in binary form, which
products are used for compression and/or decompression according to
the Khronos standard specifications OpenGL, OpenGL ES and
WebGL. Notwithstanding anything of the above, Licensee may distribute
[etcdec.cxx] in source code form provided (i) it is in unmodified
form; and (ii) it is included in software owned by Licensee.

If Licensee institutes, or threatens to institute, patent litigation
against Ericsson or Ericsson's affiliates for using the Software for
developing, having developed, manufacturing, having manufactured,
selling, offer for sale, importing, using, leasing, operating,
repairing and/or distributing products (i) within the scope of the
Khronos framework; or (ii) using software or other intellectual
property rights owned by Ericsson or its affiliates and provided under
the Khronos framework, Ericsson shall have the right to terminate this
SLA with immediate effect. Moreover, if Licensee institutes, or
threatens to institute, patent litigation against any other licensee
of the Software for using the Software in products within the scope of
the Khronos framework, Ericsson shall have the right to terminate this
SLA with immediate effect. However, should Licensee institute, or
threaten to institute, patent litigation against any other licensee of
the Software based on such other licensee's use of any other software
together with the Software, then Ericsson shall have no right to
terminate this SLA.

This SLA does not transfer to Licensee any ownership to any Ericsson
or third party intellectual property rights. All rights not expressly
granted by Ericsson under this SLA are hereby expressly
reserved. Furthermore, nothing in this SLA shall be construed as a
right to use or sell products in a manner which conveys or purports to
convey whether explicitly, by principles of implied license, or
otherwise, any rights to any third party, under any patent of Ericsson
or of Ericsson's affiliates covering or relating to any combination of
the Software with any other software or product (not licensed
hereunder) where the right applies specifically to the combination and
not to the software or product itself.

THE SOFTWARE IS PROVIDED "AS IS". ERICSSON MAKES NO REPRESENTATIONS OF
ANY KIND, EXTENDS NO WARRANTIES OR CONDITIONS OF ANY KIND, EITHER
EXPRESS, IMPLIED OR STATUTORY; INCLUDING, BUT NOT LIMITED TO, EXPRESS,
IMPLIED OR STATUTORY WARRANTIES OR CONDITIONS OF TITLE,
MERCHANTABILITY, SATISFACTORY QUALITY, SUITABILITY, AND FITNESS FOR A
PARTICULAR PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE
OF THE SOFTWARE IS WITH THE LICENSEE. SHOULD THE SOFTWARE PROVE
DEFECTIVE, THE LICENSEE ASSUMES THE COST OF ALL NECESSARY SERVICING,
REPAIR OR CORRECTION. ERICSSON MAKES NO WARRANTY THAT THE MANUFACTURE,
SALE, OFFERING FOR SALE, DISTRIBUTION, LEASE, USE OR IMPORTATION UNDER
THE SLA WILL BE FREE FROM INFRINGEMENT OF PATENTS, COPYRIGHTS OR OTHER
INTELLECTUAL PROPERTY RIGHTS OF OTHERS, AND THE VALIDITY OF THE
LICENSE AND THE SLA ARE SUBJECT TO LICENSEE'S SOLE RESPONSIBILITY TO
MAKE SUCH DETERMINATION AND ACQUIRE SUCH LICENSES AS MAY BE NECESSARY
WITH RESPECT TO PATENTS, COPYRIGHT AND OTHER INTELLECTUAL PROPERTY OF
THIRD PARTIES.

THE LICENSEE ACKNOWLEDGES AND ACCEPTS THAT THE SOFTWARE (I) IS NOT
LICENSED FOR; (II) IS NOT DESIGNED FOR OR INTENDED FOR; AND (III) MAY
NOT BE USED FOR; ANY MISSION CRITICAL APPLICATIONS SUCH AS, BUT NOT
LIMITED TO OPERATION OF NUCLEAR OR HEALTHCARE COMPUTER SYSTEMS AND/OR
NETWORKS, AIRCRAFT OR TRAIN CONTROL AND/OR COMMUNICATION SYSTEMS OR
ANY OTHER COMPUTER SYSTEMS AND/OR NETWORKS OR CONTROL AND/OR
COMMUNICATION SYSTEMS ALL IN WHICH CASE THE FAILURE OF THE SOFTWARE
COULD LEAD TO DEATH, PERSONAL INJURY, OR SEVERE PHYSICAL, MATERIAL OR
ENVIRONMENTAL DAMAGE. LICENSEE'S RIGHTS UNDER THIS LICENSE WILL
TERMINATE AUTOMATICALLY AND IMMEDIATELY WITHOUT NOTICE IF LICENSEE
FAILS TO COMPLY WITH THIS PARAGRAPH.

IN NO EVENT SHALL ERICSSON BE LIABLE FOR ANY DAMAGES WHATSOEVER,
INCLUDING BUT NOT LIMITED TO PERSONAL INJURY, ANY GENERAL, SPECIAL,
INDIRECT, INCIDENTAL OR CONSEQUENTIAL DAMAGES, ARISING OUT OF OR IN
CONNECTION WITH THE USE OR INABILITY TO USE THE SOFTWARE (INCLUDING
BUT NOT LIMITED TO LOSS OF PROFITS, BUSINESS INTERUPTIONS, OR ANY
OTHER COMMERCIAL DAMAGES OR LOSSES, LOSS OF DATA OR DATA BEING
RENDERED INACCURATE OR LOSSES SUSTAINED BY THE LICENSEE OR THIRD
PARTIES OR A FAILURE OF THE SOFTWARE TO OPERATE WITH ANY OTHER
SOFTWARE) REGARDLESS OF THE THEORY OF LIABILITY (CONTRACT, TORT, OR
OTHERWISE), EVEN IF THE LICENSEE OR ANY OTHER PARTY HAS BEEN ADVISED
OF THE POSSIBILITY OF SUCH DAMAGES.

Licensee acknowledges that "ERICSSON ///" is the corporate trademark
of Telefonaktiebolaget LM Ericsson and that both "Ericsson" and the
figure "///" are important features of the trade names of
Telefonaktiebolaget LM Ericsson. Nothing contained in these terms and
conditions shall be deemed to grant Licensee any right, title or
interest in the word "Ericsson" or the figure "///". No delay or
omission by Ericsson to exercise any right or power shall impair any
such right or power to be construed to be a waiver thereof. Consent by
Ericsson to, or waiver of, a breach by the Licensee shall not
constitute consent to, waiver of, or excuse for any other different or
subsequent breach.

This SLA shall be governed by the substantive law of Sweden. Any
dispute, controversy or claim arising out of or in connection with
this SLA, or the breach, termination or invalidity thereof, shall be
submitted to the exclusive jurisdiction of the Swedish Courts.

*/

//// etcpack v2.74
//// 
//// NO WARRANTY 
//// 
//// BECAUSE THE PROGRAM IS LICENSED FREE OF CHARGE THE PROGRAM IS PROVIDED
//// "AS IS". ERICSSON MAKES NO REPRESENTATIONS OF ANY KIND, EXTENDS NO
//// WARRANTIES OR CONDITIONS OF ANY KIND; EITHER EXPRESS, IMPLIED OR
//// STATUTORY; INCLUDING, BUT NOT LIMITED TO, EXPRESS, IMPLIED OR
//// STATUTORY WARRANTIES OR CONDITIONS OF TITLE, MERCHANTABILITY,
//// SATISFACTORY QUALITY, SUITABILITY AND FITNESS FOR A PARTICULAR
//// PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE
//// PROGRAM IS WITH YOU. SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME
//// THE COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION. ERICSSON
//// MAKES NO WARRANTY THAT THE MANUFACTURE, SALE, OFFERING FOR SALE,
//// DISTRIBUTION, LEASE, USE OR IMPORTATION UNDER THE LICENSE WILL BE FREE
//// FROM INFRINGEMENT OF PATENTS, COPYRIGHTS OR OTHER INTELLECTUAL
//// PROPERTY RIGHTS OF OTHERS, AND THE VALIDITY OF THE LICENSE IS SUBJECT
//// TO YOUR SOLE RESPONSIBILITY TO MAKE SUCH DETERMINATION AND ACQUIRE
//// SUCH LICENSES AS MAY BE NECESSARY WITH RESPECT TO PATENTS, COPYRIGHT
//// AND OTHER INTELLECTUAL PROPERTY OF THIRD PARTIES.
//// 
//// FOR THE AVOIDANCE OF DOUBT THE PROGRAM (I) IS NOT LICENSED FOR; (II)
//// IS NOT DESIGNED FOR OR INTENDED FOR; AND (III) MAY NOT BE USED FOR;
//// ANY MISSION CRITICAL APPLICATIONS SUCH AS, BUT NOT LIMITED TO
//// OPERATION OF NUCLEAR OR HEALTHCARE COMPUTER SYSTEMS AND/OR NETWORKS,
//// AIRCRAFT OR TRAIN CONTROL AND/OR COMMUNICATION SYSTEMS OR ANY OTHER
//// COMPUTER SYSTEMS AND/OR NETWORKS OR CONTROL AND/OR COMMUNICATION
//// SYSTEMS ALL IN WHICH CASE THE FAILURE OF THE PROGRAM COULD LEAD TO
//// DEATH, PERSONAL INJURY, OR SEVERE PHYSICAL, MATERIAL OR ENVIRONMENTAL
//// DAMAGE. YOUR RIGHTS UNDER THIS LICENSE WILL TERMINATE AUTOMATICALLY
//// AND IMMEDIATELY WITHOUT NOTICE IF YOU FAIL TO COMPLY WITH THIS
//// PARAGRAPH.
//// 
//// IN NO EVENT WILL ERICSSON, BE LIABLE FOR ANY DAMAGES WHATSOEVER,
//// INCLUDING BUT NOT LIMITED TO PERSONAL INJURY, ANY GENERAL, SPECIAL,
//// INDIRECT, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR IN
//// CONNECTION WITH THE USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT
//// NOT LIMITED TO LOSS OF PROFITS, BUSINESS INTERUPTIONS, OR ANY OTHER
//// COMMERCIAL DAMAGES OR LOSSES, LOSS OF DATA OR DATA BEING RENDERED
//// INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD PARTIES OR A FAILURE OF
//// THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS) REGARDLESS OF THE
//// THEORY OF LIABILITY (CONTRACT, TORT OR OTHERWISE), EVEN IF SUCH HOLDER
//// OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
//// 
//// (C) Ericsson AB 2005-2013. All Rights Reserved.
//// 

//#include <stdio.h>
//#include <stdlib.h>

// Typedefs
type int8 = number;
type uint8 = number;
type int16 = number;
type uint16 = number;
type int = number;
type uint = number;

// Macros to help with bit extraction/insertion
const SHIFT = (size: uint, startpos: uint): uint => ((startpos)-(size)+1);
const MASK = (size: uint, startpos: uint): uint => (((2<<(size-1))-1) << SHIFT(size,startpos));
const GET_PUTBITS = (dest: uint, data: uint, size: uint, startpos: uint): uint => ((dest & ~MASK(size, startpos)) | ((data << SHIFT(size, startpos)) & MASK(size,startpos)));
const SHIFTHIGH = (size: uint, startpos: uint): uint => (((startpos)-32)-(size)+1);
const MASKHIGH = (size: uint, startpos: uint): uint => (((1<<(size))-1) << SHIFTHIGH(size,startpos));
const GET_PUTBITSHIGH = (dest: uint, data: uint, size: uint, startpos: uint): uint => ((dest & ~MASKHIGH(size, startpos)) | ((data << SHIFTHIGH(size, startpos)) & MASKHIGH(size,startpos)));
const GETBITS = (source: uint, size: uint, startpos: uint): uint => (( (source) >> ((startpos)-(size)+1) ) & ((1<<(size)) -1));
const GETBITSHIGH = (source: uint, size: uint, startpos: uint): uint => (( (source) >> (((startpos)-32)-(size)+1) ) & ((1<<(size)) -1));
const PGMOUT = true;
// Thumb macros and definitions
const R_BITS59T = 4;
const G_BITS59T = 4;
const B_BITS59T = 4;
const R_BITS58H = 4;
const G_BITS58H = 4;
const B_BITS58H = 4;
//const MAXIMUM_ERROR = (255*255*16*1000);
const R = 0;
const G = 1;
const B = 2;
const BLOCKHEIGHT = 4;
const BLOCKWIDTH = 4;
//const BINPOW = (power) => (1<<(power));
const TABLE_BITS_59T = 3;
const TABLE_BITS_58H = 3;

// Helper Macros
const SATURATE = (x: number): uint8 => ((x<0) ? 0 : ((x>255) ? 255 : x));
//const JAS_ROUND = (x) => (((x) < 0.0 ) ? ((int)((x)-0.5)) : ((int)((x)+0.5)));

const SET_RED_CHANNEL   = (img: Uint8Array, width: int, x: int, y: int, channels: int, value: uint8): uint8 => (img[channels*(y*width+x)+0] = value);
const SET_GREEN_CHANNEL = (img: Uint8Array, width: int, x: int, y: int, channels: int, value: uint8): uint8 => (img[channels*(y*width+x)+1] = value);
const SET_BLUE_CHANNEL  = (img: Uint8Array, width: int, x: int, y: int, channels: int, value: uint8): uint8 => (img[channels*(y*width+x)+2] = value);
//const SET_ALPHA_CHANNEL = (img: Uint8Array, width: int, x: int, y: int, channels: int, value: uint8): uint8 => (img[channels*(y*width+x)+3] = value);


// Global tables
/*static*/ const table59T = Uint8Array.from([3, 6, 11, 16, 23, 32, 41, 64]);  // 3-bit table for the 59 bit T-mode
/*static*/ const table58H = Uint8Array.from([3, 6, 11, 16, 23, 32, 41, 64]);  // 3-bit table for the 58 bit H-mode
/*static*/ const compressParams = [
	Int32Array.from([-8, -2,  2, 8]),
	Int32Array.from([-8, -2,  2, 8]),
	Int32Array.from([-17, -5, 5, 17]),
	Int32Array.from([-17, -5, 5, 17]),
	Int32Array.from([-29, -9, 9, 29]),
	Int32Array.from([-29, -9, 9, 29]),
	Int32Array.from([-42, -13, 13, 42]),
	Int32Array.from([-42, -13, 13, 42]),
	Int32Array.from([-60, -18, 18, 60]),
	Int32Array.from([-60, -18, 18, 60]),
	Int32Array.from([-80, -24, 24, 80]),
	Int32Array.from([-80, -24, 24, 80]),
	Int32Array.from([-106, -33, 33, 106]),
	Int32Array.from([-106, -33, 33, 106]),
	Int32Array.from([-183, -47, 47, 183]),
	Int32Array.from([-183, -47, 47, 183])
];
/*static*/ const unscramble = Int32Array.from([2, 3, 1, 0]);

let alphaTableInitialized = false;
let alphaTable: Int32Array[] = Array(256).fill(Int32Array.from(Array(8).fill(0)));
const alphaBase = [
	Int32Array.from([-15, -9, -6, -3]),
	Int32Array.from([-13, -10, -7, -3]),
	Int32Array.from([-13, -8, -5, -2]),
	Int32Array.from([-13, -6, -4, -2]),
	Int32Array.from([-12, -8, -6, -3]),
	Int32Array.from([-11, -9, -7, -3]),
	Int32Array.from([-11, -8, -7, -4]),
	Int32Array.from([-11, -8, -5, -3]),
	Int32Array.from([-10, -8, -6, -2]),
	Int32Array.from([-10, -8, -5, -2]),
	Int32Array.from([-10, -8, -4, -2]),
	Int32Array.from([-10, -7, -5, -2]),
	Int32Array.from([-10, -7, -4, -3]),
	Int32Array.from([-10, -3, -2, -1]),
	Int32Array.from([-9, -8, -6, -4]),
	Int32Array.from([-9, -7, -5, -3])
];

// Global variables
const formatSigned = false;


// Code used to create the valtab
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function setupAlphaTable(): void
{
  	if(alphaTableInitialized)
		return;
  	alphaTableInitialized = true;

	//read table used for alpha compression
	let buf: int;
	for(let i:int = 16; i<32; i++) 
	{
		for(let j:int=0; j<8; j++) 
		{
			buf=alphaBase[i-16][3-j%4];
			if(j<4)
				alphaTable[i][j]=buf;
			else
				alphaTable[i][j]=(-buf-1);
		}
	}
	
	//beyond the first 16 values, the rest of the table is implicit.. so calculate that!
	for(let i:int=0; i<256; i++) 
	{
		//fill remaining slots in table with multiples of the first ones.
		const mul: int = i/16;
		const old: int = 16+i%16;
		for(let j: int = 0; j<8; j++) 
		{
			alphaTable[i][j]=alphaTable[old][j]*mul;
			//note: we don't do clamping here, though we could, because we'll be clamped afterwards anyway.
		}
	}
}

// The format stores the bits for the three extra modes in a roundabout way to be able to
// fit them without increasing the bit rate. This function converts them into something
// that is easier to work with. 
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function unstuff57bits(planar_word1: uint, planar_word2: uint): uint[]
{
	// Get bits from twotimer configuration for 57 bits
	// 
	// Go to this bit layout:
	//
	//      63 62 61 60 59 58 57 56 55 54 53 52 51 50 49 48 47 46 45 44 43 42 41 40 39 38 37 36 35 34 33 32 
	//      -----------------------------------------------------------------------------------------------
	//     |R0               |G01G02              |B01B02  ;B03     |RH1           |RH2|GH                 |
	//      -----------------------------------------------------------------------------------------------
	//
	//      31 30 29 28 27 26 25 24 23 22 21 20 19 18 17 16 15 14 13 12 11 10  9  8  7  6  5  4  3  2  1  0
	//      -----------------------------------------------------------------------------------------------
	//     |BH               |RV               |GV                  |BV                | not used          |   
	//      -----------------------------------------------------------------------------------------------
	//
	//  From this:
	// 
	//      63 62 61 60 59 58 57 56 55 54 53 52 51 50 49 48 47 46 45 44 43 42 41 40 39 38 37 36 35 34 33 32 
	//      ------------------------------------------------------------------------------------------------
	//     |//|R0               |G01|/|G02              |B01|/ // //|B02  |//|B03     |RH1           |df|RH2|
	//      ------------------------------------------------------------------------------------------------
	//
	//      31 30 29 28 27 26 25 24 23 22 21 20 19 18 17 16 15 14 13 12 11 10  9  8  7  6  5  4  3  2  1  0
	//      -----------------------------------------------------------------------------------------------
	//     |GH                  |BH               |RV               |GV                   |BV              |
	//      -----------------------------------------------------------------------------------------------
	//
	//      63 62 61 60 59 58 57 56 55 54 53 52 51 50 49 48 47 46 45 44 43 42 41 40 39 38 37 36 35 34  33  32 
	//      ---------------------------------------------------------------------------------------------------
	//     | base col1    | dcol 2 | base col1    | dcol 2 | base col 1   | dcol 2 | table  | table  |diff|flip|
	//     | R1' (5 bits) | dR2    | G1' (5 bits) | dG2    | B1' (5 bits) | dB2    | cw 1   | cw 2   |bit |bit |
	//      ---------------------------------------------------------------------------------------------------

	const RO:  uint8 = GETBITSHIGH( planar_word1, 6, 62);
	const GO1: uint8 = GETBITSHIGH( planar_word1, 1, 56);
	const GO2: uint8 = GETBITSHIGH( planar_word1, 6, 54);
	const BO1: uint8 = GETBITSHIGH( planar_word1, 1, 48);
	const BO2: uint8 = GETBITSHIGH( planar_word1, 2, 44);
	const BO3: uint8 = GETBITSHIGH( planar_word1, 3, 41);
	const RH1: uint8 = GETBITSHIGH( planar_word1, 5, 38);
	const RH2: uint8 = GETBITSHIGH( planar_word1, 1, 32);
	const GH:  uint8 = GETBITS(     planar_word2, 7, 31);
	const BH:  uint8 = GETBITS(     planar_word2, 6, 24);
	const RV:  uint8 = GETBITS(     planar_word2, 6, 18);
	const GV:  uint8 = GETBITS(     planar_word2, 7, 12);
	const BV:  uint8 = GETBITS(     planar_word2, 6,  5);

	let planar57_word1: uint = 0;
	planar57_word1 = GET_PUTBITSHIGH( planar57_word1, RO,  6, 63);
	planar57_word1 = GET_PUTBITSHIGH( planar57_word1, GO1, 1, 57);
	planar57_word1 = GET_PUTBITSHIGH( planar57_word1, GO2, 6, 56);
	planar57_word1 = GET_PUTBITSHIGH( planar57_word1, BO1, 1, 50);
	planar57_word1 = GET_PUTBITSHIGH( planar57_word1, BO2, 2, 49);
	planar57_word1 = GET_PUTBITSHIGH( planar57_word1, BO3, 3, 47);
	planar57_word1 = GET_PUTBITSHIGH( planar57_word1, RH1, 5, 44);
	planar57_word1 = GET_PUTBITSHIGH( planar57_word1, RH2, 1, 39);
	planar57_word1 = GET_PUTBITSHIGH( planar57_word1, GH,  7, 38);

	let planar57_word2: uint = 0;
	planar57_word2 = GET_PUTBITS( planar57_word2, BH, 6, 31);
	planar57_word2 = GET_PUTBITS( planar57_word2, RV, 6, 25);
	planar57_word2 = GET_PUTBITS( planar57_word2, GV, 7, 19);
	planar57_word2 = GET_PUTBITS( planar57_word2, BV, 6, 12);

	return [planar57_word1, planar57_word2];
}

// The format stores the bits for the three extra modes in a roundabout way to be able to
// fit them without increasing the bit rate. This function converts them into something
// that is easier to work with. 
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function unstuff58bits(thumbH_word1: uint, thumbH_word2: uint): uint[]
{
	// Go to this layout:
	//
	//     |63 62 61 60 59 58|57 56 55 54 53 52 51|50 49|48 47 46 45 44 43 42 41 40 39 38 37 36 35 34 33|32   |
	//     |-------empty-----|part0---------------|part1|part2------------------------------------------|part3|
	//
	//  from this:
	// 
	//      63 62 61 60 59 58 57 56 55 54 53 52 51 50 49 48 47 46 45 44 43 42 41 40 39 38 37 36 35 34 33 32 
	//      --------------------------------------------------------------------------------------------------|
	//     |//|part0               |// // //|part1|//|part2                                          |df|part3|
	//      --------------------------------------------------------------------------------------------------|

	// move parts
	const part0: uint = GETBITSHIGH( thumbH_word1, 7, 62);
	const part1: uint = GETBITSHIGH( thumbH_word1, 2, 52);
	const part2: uint = GETBITSHIGH( thumbH_word1,16, 49);
	const part3: uint = GETBITSHIGH( thumbH_word1, 1, 32);

	let thumbH58_word1: uint = 0;
	thumbH58_word1 = GET_PUTBITSHIGH( thumbH58_word1, part0,  7, 57);
	thumbH58_word1 = GET_PUTBITSHIGH( thumbH58_word1, part1,  2, 50);
	thumbH58_word1 = GET_PUTBITSHIGH( thumbH58_word1, part2, 16, 48);
	thumbH58_word1 = GET_PUTBITSHIGH( thumbH58_word1, part3,  1, 32);

	const thumbH58_word2: uint = thumbH_word2;

	return [thumbH58_word1, thumbH58_word2];
}

// The format stores the bits for the three extra modes in a roundabout way to be able to
// fit them without increasing the bit rate. This function converts them into something
// that is easier to work with. 
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function unstuff59bits(thumbT_word1: uint, thumbT_word2: uint): uint[]
{
	// Get bits from twotimer configuration 59 bits. 
	// 
	// Go to this bit layout:
	//
	//     |63 62 61 60 59|58 57 56 55|54 53 52 51|50 49 48 47|46 45 44 43|42 41 40 39|38 37 36 35|34 33 32|
	//     |----empty-----|---red 0---|--green 0--|--blue 0---|---red 1---|--green 1--|--blue 1---|--dist--|
	//
	//     |31 30 29 28 27 26 25 24 23 22 21 20 19 18 17 16 15 14 13 12 11 10 09 08 07 06 05 04 03 02 01 00|
	//     |----------------------------------------index bits---------------------------------------------|
	//
	//
	//  From this:
	// 
	//      63 62 61 60 59 58 57 56 55 54 53 52 51 50 49 48 47 46 45 44 43 42 41 40 39 38 37 36 35 34 33 32 
	//      -----------------------------------------------------------------------------------------------
	//     |// // //|R0a  |//|R0b  |G0         |B0         |R1         |G1         |B1          |da  |df|db|
	//      -----------------------------------------------------------------------------------------------
	//
	//     |31 30 29 28 27 26 25 24 23 22 21 20 19 18 17 16 15 14 13 12 11 10 09 08 07 06 05 04 03 02 01 00|
	//     |----------------------------------------index bits---------------------------------------------|
	//
	//      63 62 61 60 59 58 57 56 55 54 53 52 51 50 49 48 47 46 45 44 43 42 41 40 39 38 37 36 35 34 33 32 
	//      -----------------------------------------------------------------------------------------------
	//     | base col1    | dcol 2 | base col1    | dcol 2 | base col 1   | dcol 2 | table  | table  |df|fp|
	//     | R1' (5 bits) | dR2    | G1' (5 bits) | dG2    | B1' (5 bits) | dB2    | cw 1   | cw 2   |bt|bt|
	//      ------------------------------------------------------------------------------------------------

	// Fix middle part
	let thumbT59_word1: uint = thumbT_word1 >> 1;
	// Fix db (lowest bit of d)
	thumbT59_word1 = GET_PUTBITSHIGH( thumbT59_word1, thumbT_word1,  1, 32);
	// Fix R0a (top two bits of R0)
	let R0a: uint8 = GETBITSHIGH( thumbT_word1, 2, 60);
	thumbT59_word1 = GET_PUTBITSHIGH( thumbT59_word1, R0a,  2, 58);

	// Zero top part (not needed)
	thumbT59_word1 = GET_PUTBITSHIGH( thumbT59_word1, 0,  5, 63);

	const thumbT59_word2: uint = thumbT_word2;

	return [thumbT59_word1, thumbT59_word2];
}

// The color bits are expanded to the full color
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function decompressColor(R_B: int, G_B: int, B_B: int, colors_RGB444: uint8[2][3], colors: uint8[2][3]): void
{
	// The color should be retrieved as:
	//
	// c = round(255/(r_bits^2-1))*comp_color
	//
	// This is similar to bit replication
	// 
	// Note -- this code only work for bit replication from 4 bits and up --- 3 bits needs
	// two copy operations.

 	colors[0][R] = (colors_RGB444[0][R] << (8 - R_B)) | (colors_RGB444[0][R] >> (R_B - (8-R_B)) );
 	colors[0][G] = (colors_RGB444[0][G] << (8 - G_B)) | (colors_RGB444[0][G] >> (G_B - (8-G_B)) );
 	colors[0][B] = (colors_RGB444[0][B] << (8 - B_B)) | (colors_RGB444[0][B] >> (B_B - (8-B_B)) );
 	colors[1][R] = (colors_RGB444[1][R] << (8 - R_B)) | (colors_RGB444[1][R] >> (R_B - (8-R_B)) );
 	colors[1][G] = (colors_RGB444[1][G] << (8 - G_B)) | (colors_RGB444[1][G] >> (G_B - (8-G_B)) );
 	colors[1][B] = (colors_RGB444[1][B] << (8 - B_B)) | (colors_RGB444[1][B] >> (B_B - (8-B_B)) );
}

function calculatePaintColors59T(d: uint8, colors: uint8[2][3], possible_colors: uint8[4][3]): void
{
	//////////////////////////////////////////////
	//
	//		C3      C1		C4----C1---C2
	//		|		|			  |
	//		|		|			  |
	//		|-------|			  |
	//		|		|			  |
	//		|		|			  |
	//		C4      C2			  C3
	//
	//////////////////////////////////////////////

	// C4
	possible_colors[3][R] = SATURATE(colors[1][R] - table59T[d]);
	possible_colors[3][G] = SATURATE(colors[1][G] - table59T[d]);
	possible_colors[3][B] = SATURATE(colors[1][B] - table59T[d]);
	
	// PATTERN_T
	{
		// C3
		possible_colors[0][R] = colors[0][R];
		possible_colors[0][G] = colors[0][G];
		possible_colors[0][B] = colors[0][B];
		// C2
		possible_colors[1][R] = SATURATE(colors[1][R] + table59T[d]);
		possible_colors[1][G] = SATURATE(colors[1][G] + table59T[d]);
		possible_colors[1][B] = SATURATE(colors[1][B] + table59T[d]);
		// C1
		possible_colors[2][R] = colors[1][R];
		possible_colors[2][G] = colors[1][G];
		possible_colors[2][B] = colors[1][B];

	} 
}
// Decompress a T-mode block (simple packing)
// Simple 59T packing:
//|63 62 61 60 59|58 57 56 55|54 53 52 51|50 49 48 47|46 45 44 43|42 41 40 39|38 37 36 35|34 33 32|
//|----empty-----|---red 0---|--green 0--|--blue 0---|---red 1---|--green 1--|--blue 1---|--dist--|
//
//|31 30 29 28 27 26 25 24 23 22 21 20 19 18 17 16 15 14 13 12 11 10 09 08 07 06 05 04 03 02 01 00|
//|----------------------------------------index bits---------------------------------------------|
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function decompressBlockTHUMB59Tc(block_part1: uint, block_part2: uint, img: Uint8Array, width: int, height: int, startx: int, starty: int, channels: int): void
{
	let colorsRGB444: uint8[2][3];
	let colors: uint8[2][3];
	let paint_colors: uint8[4][3];
	let distance: uint8;
	let block_mask: uint8[4][4];

	// First decode left part of block.
	colorsRGB444[0][R]= GETBITSHIGH(block_part1, 4, 58);
	colorsRGB444[0][G]= GETBITSHIGH(block_part1, 4, 54);
	colorsRGB444[0][B]= GETBITSHIGH(block_part1, 4, 50);

	colorsRGB444[1][R]= GETBITSHIGH(block_part1, 4, 46);
	colorsRGB444[1][G]= GETBITSHIGH(block_part1, 4, 42);
	colorsRGB444[1][B]= GETBITSHIGH(block_part1, 4, 38);

	distance   = GETBITSHIGH(block_part1, TABLE_BITS_59T, 34);

	// Extend the two colors to RGB888	
	decompressColor(R_BITS59T, G_BITS59T, B_BITS59T, colorsRGB444, colors);	
	calculatePaintColors59T(distance, colors, paint_colors);
	
	// Choose one of the four paint colors for each texel
	for (let x:uint8 = 0; x < BLOCKWIDTH; ++x) 
	{
		for (let y:uint8 = 0; y < BLOCKHEIGHT; ++y) 
		{
			//block_mask[x][y] = GETBITS(block_part2,2,31-(y*4+x)*2);
			block_mask[x][y] = GETBITS(block_part2,1,(y+x*4)+16)<<1;
			block_mask[x][y] |= GETBITS(block_part2,1,(y+x*4));
			img[channels*((starty+y)*width+startx+x)+R] = SATURATE(paint_colors[block_mask[x][y]][R]); // RED
			img[channels*((starty+y)*width+startx+x)+G] = SATURATE(paint_colors[block_mask[x][y]][G]); // GREEN
			img[channels*((starty+y)*width+startx+x)+B] = SATURATE(paint_colors[block_mask[x][y]][B]); // BLUE
		}
	}
}

function decompressBlockTHUMB59T(block_part1: uint, block_part2: uint, img: Uint8Array, width: int, height: int, startx: int, starty: int): void
{
  decompressBlockTHUMB59Tc(block_part1, block_part2, img, width, height, startx, starty, 3);
}

// Calculate the paint colors from the block colors 
// using a distance d and one of the H- or T-patterns.
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function calculatePaintColors58H(d: uint8, colors: uint8[2][3], possible_colors: uint8[4][3]): void
{
	
	//////////////////////////////////////////////
	//
	//		C3      C1		C4----C1---C2
	//		|		|			  |
	//		|		|			  |
	//		|-------|			  |
	//		|		|			  |
	//		|		|			  |
	//		C4      C2			  C3
	//
	//////////////////////////////////////////////

	// C4
	possible_colors[3][R] = SATURATE(colors[1][R] - table58H[d]);
	possible_colors[3][G] = SATURATE(colors[1][G] - table58H[d]);
	possible_colors[3][B] = SATURATE(colors[1][B] - table58H[d]);
	
	// PATTERN_H
	{ 
		// C1
		possible_colors[0][R] = SATURATE(colors[0][R] + table58H[d]);
		possible_colors[0][G] = SATURATE(colors[0][G] + table58H[d]);
		possible_colors[0][B] = SATURATE(colors[0][B] + table58H[d]);
		// C2
		possible_colors[1][R] = SATURATE(colors[0][R] - table58H[d]);
		possible_colors[1][G] = SATURATE(colors[0][G] - table58H[d]);
		possible_colors[1][B] = SATURATE(colors[0][B] - table58H[d]);
		// C3
		possible_colors[2][R] = SATURATE(colors[1][R] + table58H[d]);
		possible_colors[2][G] = SATURATE(colors[1][G] + table58H[d]);
		possible_colors[2][B] = SATURATE(colors[1][B] + table58H[d]);
	} 
}

// Decompress an H-mode block 
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function decompressBlockTHUMB58Hc(block_part1: uint, block_part2: uint, img: Uint8Array, width: int, height: int, startx: int, starty: int, channels: int): void
{
	let col0: uint;
	let col1: uint;
	let colors: uint8[2][3];
	let colorsRGB444: uint8[2][3];
	let paint_colors: uint8[4][3];
	let distance: uint8;
	let block_mask: uint8[4][4];
	
	// First decode left part of block.
	colorsRGB444[0][R]= GETBITSHIGH(block_part1, 4, 57);
	colorsRGB444[0][G]= GETBITSHIGH(block_part1, 4, 53);
	colorsRGB444[0][B]= GETBITSHIGH(block_part1, 4, 49);

	colorsRGB444[1][R]= GETBITSHIGH(block_part1, 4, 45);
	colorsRGB444[1][G]= GETBITSHIGH(block_part1, 4, 41);
	colorsRGB444[1][B]= GETBITSHIGH(block_part1, 4, 37);

	distance = 0;
	distance = (GETBITSHIGH(block_part1, 2, 33)) << 1;

	col0 = GETBITSHIGH(block_part1, 12, 57);
	col1 = GETBITSHIGH(block_part1, 12, 45);

	if(col0 >= col1)
	{
		distance |= 1;
	}

	// Extend the two colors to RGB888	
	decompressColor(R_BITS58H, G_BITS58H, B_BITS58H, colorsRGB444, colors);	
	
	calculatePaintColors58H(distance, colors, paint_colors);
	
	// Choose one of the four paint colors for each texel
	for (let x:uint8 = 0; x < BLOCKWIDTH; ++x) 
	{
		for (let y:uint8 = 0; y < BLOCKHEIGHT; ++y) 
		{
			//block_mask[x][y] = GETBITS(block_part2,2,31-(y*4+x)*2);
			block_mask[x][y] = GETBITS(block_part2,1,(y+x*4)+16)<<1;
			block_mask[x][y] |= GETBITS(block_part2,1,(y+x*4));
			img[channels*((starty+y)*width+startx+x)+R] = SATURATE(paint_colors[block_mask[x][y]][R]); // RED
			img[channels*((starty+y)*width+startx+x)+G] = SATURATE(paint_colors[block_mask[x][y]][G]); // GREEN
			img[channels*((starty+y)*width+startx+x)+B] = SATURATE(paint_colors[block_mask[x][y]][B]); // BLUE
		}
	}
}
function decompressBlockTHUMB58H(block_part1: uint, block_part2: uint, img: Uint8Array, width: int, height: int, startx: int, starty: int): void
{
  decompressBlockTHUMB58Hc(block_part1, block_part2, img, width, height, startx, starty, 3);
}

// Decompress the planar mode.
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function decompressBlockPlanar57c(compressed57_1: uint, compressed57_2: uint, img: Uint8Array, width: int, height: int, startx: int, starty: int, channels: int): void
{
	let colorO: uint8[3];
	let colorH: uint8[3];
	let colorV: uint8[3];

	colorO[0] = GETBITSHIGH( compressed57_1, 6, 63);
	colorO[1] = GETBITSHIGH( compressed57_1, 7, 57);
	colorO[2] = GETBITSHIGH( compressed57_1, 6, 50);
	colorH[0] = GETBITSHIGH( compressed57_1, 6, 44);
	colorH[1] = GETBITSHIGH( compressed57_1, 7, 38);
	colorH[2] = GETBITS(     compressed57_2, 6, 31);
	colorV[0] = GETBITS(     compressed57_2, 6, 25);
	colorV[1] = GETBITS(     compressed57_2, 7, 19);
	colorV[2] = GETBITS(     compressed57_2, 6, 12);

	colorO[0] = (colorO[0] << 2) | (colorO[0] >> 4);
	colorO[1] = (colorO[1] << 1) | (colorO[1] >> 6);
	colorO[2] = (colorO[2] << 2) | (colorO[2] >> 4);

	colorH[0] = (colorH[0] << 2) | (colorH[0] >> 4);
	colorH[1] = (colorH[1] << 1) | (colorH[1] >> 6);
	colorH[2] = (colorH[2] << 2) | (colorH[2] >> 4);

	colorV[0] = (colorV[0] << 2) | (colorV[0] >> 4);
	colorV[1] = (colorV[1] << 1) | (colorV[1] >> 6);
	colorV[2] = (colorV[2] << 2) | (colorV[2] >> 4);

	let xx: int;
	let yy: int;

	for( xx=0; xx<4; xx++)
	{
		for( yy=0; yy<4; yy++)
		{
			img[channels*width*(starty+yy) + channels*(startx+xx) + 0] = SATURATE((xx*(colorH[0]-colorO[0]) + yy*(colorV[0]-colorO[0]) + 4*colorO[0] + 2) >> 2);
			img[channels*width*(starty+yy) + channels*(startx+xx) + 1] = SATURATE((xx*(colorH[1]-colorO[1]) + yy*(colorV[1]-colorO[1]) + 4*colorO[1] + 2) >> 2);
			img[channels*width*(starty+yy) + channels*(startx+xx) + 2] = SATURATE((xx*(colorH[2]-colorO[2]) + yy*(colorV[2]-colorO[2]) + 4*colorO[2] + 2) >> 2);

			//Equivalent method
			/*img[channels*width*(starty+yy) + channels*(startx+xx) + 0] = (int)SATURATE(JAS_ROUND((xx*(colorH[0]-colorO[0])/4.0 + yy*(colorV[0]-colorO[0])/4.0 + colorO[0])));
			img[channels*width*(starty+yy) + channels*(startx+xx) + 1] = (int)SATURATE(JAS_ROUND((xx*(colorH[1]-colorO[1])/4.0 + yy*(colorV[1]-colorO[1])/4.0 + colorO[1])));
			img[channels*width*(starty+yy) + channels*(startx+xx) + 2] = (int)SATURATE(JAS_ROUND((xx*(colorH[2]-colorO[2])/4.0 + yy*(colorV[2]-colorO[2])/4.0 + colorO[2])));*/
			
		}
	}
}
function decompressBlockPlanar57(compressed57_1: uint, compressed57_2: uint, img: Uint8Array, width: int, height: int, startx: int, starty: int): void
{
  decompressBlockPlanar57c(compressed57_1, compressed57_2, img, width, height, startx, starty, 3);
}
// Decompress an ETC1 block (or ETC2 using individual or differential mode).
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function decompressBlockDiffFlipC(block_part1: uint, block_part2: uint, img: Uint8Array, width: int, height: int, startx: int, starty: int, channels: int): void
{
	let avg_color: uint8[3];
	let enc_color1: uint8[3];
	let enc_color2: uint8[3];
	let diff: int8[3];
	let table: int;
	let index: int;
	let shift: int;
	let r: int;
	let g: int;
	let b: int;
	let diffbit: int;
	let flipbit: int;

	diffbit = (GETBITSHIGH(block_part1, 1, 33));
	flipbit = (GETBITSHIGH(block_part1, 1, 32));

	if( !diffbit )
	{
		// We have diffbit = 0.

		// First decode left part of block.
		avg_color[0]= GETBITSHIGH(block_part1, 4, 63);
		avg_color[1]= GETBITSHIGH(block_part1, 4, 55);
		avg_color[2]= GETBITSHIGH(block_part1, 4, 47);

		// Here, we should really multiply by 17 instead of 16. This can
		// be done by just copying the four lower bits to the upper ones
		// while keeping the lower bits.
		avg_color[0] |= (avg_color[0] <<4);
		avg_color[1] |= (avg_color[1] <<4);
		avg_color[2] |= (avg_color[2] <<4);

		table = GETBITSHIGH(block_part1, 3, 39) << 1;

		let pixel_indices_MSB: uint;
		let pixel_indices_LSB: uint;
			
		pixel_indices_MSB = GETBITS(block_part2, 16, 31);
		pixel_indices_LSB = GETBITS(block_part2, 16, 15);

		if( (flipbit) == 0 )
		{
			// We should not flip
			shift = 0;
			for(let x:int=startx; x<startx+2; x++)
			{
				for(let y:int=starty; y<starty+4; y++)
				{
					index  = ((pixel_indices_MSB >> shift) & 1) << 1;
					index |= ((pixel_indices_LSB >> shift) & 1);
					shift++;
					index=unscramble[index];

 					r=SET_RED_CHANNEL   (img,width,x,y,channels, SATURATE(avg_color[0]+compressParams[table][index]));
 					g=SET_GREEN_CHANNEL (img,width,x,y,channels, SATURATE(avg_color[1]+compressParams[table][index]));
 					b=SET_BLUE_CHANNEL  (img,width,x,y,channels, SATURATE(avg_color[2]+compressParams[table][index]));
				}
			}
		}
		else
		{
			// We should flip
			shift = 0;
			for(let x:int=startx; x<startx+4; x++)
			{
				for(let y:int=starty; y<starty+2; y++)
				{
					index  = ((pixel_indices_MSB >> shift) & 1) << 1;
					index |= ((pixel_indices_LSB >> shift) & 1);
					shift++;
					index=unscramble[index];

 					r=SET_RED_CHANNEL   (img,width,x,y,channels, SATURATE(avg_color[0]+compressParams[table][index]));
 					g=SET_GREEN_CHANNEL (img,width,x,y,channels, SATURATE(avg_color[1]+compressParams[table][index]));
 					b=SET_BLUE_CHANNEL  (img,width,x,y,channels, SATURATE(avg_color[2]+compressParams[table][index]));
				}
				shift+=2;
			}
		}

		// Now decode other part of block. 
		avg_color[0]= GETBITSHIGH(block_part1, 4, 59);
		avg_color[1]= GETBITSHIGH(block_part1, 4, 51);
		avg_color[2]= GETBITSHIGH(block_part1, 4, 43);

		// Here, we should really multiply by 17 instead of 16. This can
		// be done by just copying the four lower bits to the upper ones
		// while keeping the lower bits.
		avg_color[0] |= (avg_color[0] <<4);
		avg_color[1] |= (avg_color[1] <<4);
		avg_color[2] |= (avg_color[2] <<4);

		table = GETBITSHIGH(block_part1, 3, 36) << 1;
		pixel_indices_MSB = GETBITS(block_part2, 16, 31);
		pixel_indices_LSB = GETBITS(block_part2, 16, 15);

		if( (flipbit) == 0 )
		{
			// We should not flip
			shift=8;
			for(let x:int=startx+2; x<startx+4; x++)
			{
				for(let y:int=starty; y<starty+4; y++)
				{
					index  = ((pixel_indices_MSB >> shift) & 1) << 1;
					index |= ((pixel_indices_LSB >> shift) & 1);
					shift++;
					index=unscramble[index];

 					r=SET_RED_CHANNEL   (img,width,x,y,channels, SATURATE(avg_color[0]+compressParams[table][index]));
 					g=SET_GREEN_CHANNEL (img,width,x,y,channels, SATURATE(avg_color[1]+compressParams[table][index]));
 					b=SET_BLUE_CHANNEL  (img,width,x,y,channels, SATURATE(avg_color[2]+compressParams[table][index]));
				}
			}
		}
		else
		{
			// We should flip
			shift=2;
			for(let x:int=startx; x<startx+4; x++)
			{
				for(let y:int=starty+2; y<starty+4; y++)
				{
					index  = ((pixel_indices_MSB >> shift) & 1) << 1;
					index |= ((pixel_indices_LSB >> shift) & 1);
					shift++;
					index=unscramble[index];

 					r=SET_RED_CHANNEL   (img,width,x,y,channels, SATURATE(avg_color[0]+compressParams[table][index]));
 					g=SET_GREEN_CHANNEL (img,width,x,y,channels, SATURATE(avg_color[1]+compressParams[table][index]));
 					b=SET_BLUE_CHANNEL  (img,width,x,y,channels, SATURATE(avg_color[2]+compressParams[table][index]));
				}
				shift += 2;
			}
		}
	}
	else
	{
		// We have diffbit = 1. 

//      63 62 61 60 59 58 57 56 55 54 53 52 51 50 49 48 47 46 45 44 43 42 41 40 39 38 37 36 35 34  33  32 
//      ---------------------------------------------------------------------------------------------------
//     | base col1    | dcol 2 | base col1    | dcol 2 | base col 1   | dcol 2 | table  | table  |diff|flip|
//     | R1' (5 bits) | dR2    | G1' (5 bits) | dG2    | B1' (5 bits) | dB2    | cw 1   | cw 2   |bit |bit |
//      ---------------------------------------------------------------------------------------------------
// 
// 
//     c) bit layout in bits 31 through 0 (in both cases)
// 
//      31 30 29 28 27 26 25 24 23 22 21 20 19 18 17 16 15 14 13 12 11 10  9  8  7  6  5  4  3   2   1  0
//      --------------------------------------------------------------------------------------------------
//     |       most significant pixel index bits       |         least significant pixel index bits       |  
//     | p| o| n| m| l| k| j| i| h| g| f| e| d| c| b| a| p| o| n| m| l| k| j| i| h| g| f| e| d| c | b | a |
//      --------------------------------------------------------------------------------------------------      

		// First decode left part of block.
		enc_color1[0]= GETBITSHIGH(block_part1, 5, 63);
		enc_color1[1]= GETBITSHIGH(block_part1, 5, 55);
		enc_color1[2]= GETBITSHIGH(block_part1, 5, 47);

		// Expand from 5 to 8 bits
		avg_color[0] = (enc_color1[0] <<3) | (enc_color1[0] >> 2);
		avg_color[1] = (enc_color1[1] <<3) | (enc_color1[1] >> 2);
		avg_color[2] = (enc_color1[2] <<3) | (enc_color1[2] >> 2);

		table = GETBITSHIGH(block_part1, 3, 39) << 1;

		let pixel_indices_MSB: uint;
		let pixel_indices_LSB: uint;
			
		pixel_indices_MSB = GETBITS(block_part2, 16, 31);
		pixel_indices_LSB = GETBITS(block_part2, 16, 15);

		if( (flipbit) == 0 )
		{
			// We should not flip
			shift = 0;
			for(let x:int=startx; x<startx+2; x++)
			{
				for(let y:int=starty; y<starty+4; y++)
				{
					index  = ((pixel_indices_MSB >> shift) & 1) << 1;
					index |= ((pixel_indices_LSB >> shift) & 1);
					shift++;
					index=unscramble[index];

 					r=SET_RED_CHANNEL   (img,width,x,y,channels, SATURATE(avg_color[0]+compressParams[table][index]));
 					g=SET_GREEN_CHANNEL (img,width,x,y,channels, SATURATE(avg_color[1]+compressParams[table][index]));
 					b=SET_BLUE_CHANNEL  (img,width,x,y,channels, SATURATE(avg_color[2]+compressParams[table][index]));
				}
			}
		}
		else
		{
			// We should flip
			shift = 0;
			for(let x:int=startx; x<startx+4; x++)
			{
				for(let y:int=starty; y<starty+2; y++)
				{
					index  = ((pixel_indices_MSB >> shift) & 1) << 1;
					index |= ((pixel_indices_LSB >> shift) & 1);
					shift++;
					index=unscramble[index];

 					r=SET_RED_CHANNEL   (img,width,x,y,channels, SATURATE(avg_color[0]+compressParams[table][index]));
 					g=SET_GREEN_CHANNEL (img,width,x,y,channels, SATURATE(avg_color[1]+compressParams[table][index]));
 					b=SET_BLUE_CHANNEL  (img,width,x,y,channels, SATURATE(avg_color[2]+compressParams[table][index]));
				}
				shift+=2;
			}
		}

		// Now decode right part of block. 
		diff[0]= GETBITSHIGH(block_part1, 3, 58);
		diff[1]= GETBITSHIGH(block_part1, 3, 50);
		diff[2]= GETBITSHIGH(block_part1, 3, 42);

		// Extend sign bit to entire byte. 
		diff[0] = (diff[0] << 5);
		diff[1] = (diff[1] << 5);
		diff[2] = (diff[2] << 5);
		diff[0] = diff[0] >> 5;
		diff[1] = diff[1] >> 5;
		diff[2] = diff[2] >> 5;

		//  Calculale second color
		enc_color2[0]= enc_color1[0] + diff[0];
		enc_color2[1]= enc_color1[1] + diff[1];
		enc_color2[2]= enc_color1[2] + diff[2];

		// Expand from 5 to 8 bits
		avg_color[0] = (enc_color2[0] <<3) | (enc_color2[0] >> 2);
		avg_color[1] = (enc_color2[1] <<3) | (enc_color2[1] >> 2);
		avg_color[2] = (enc_color2[2] <<3) | (enc_color2[2] >> 2);

		table = GETBITSHIGH(block_part1, 3, 36) << 1;
		pixel_indices_MSB = GETBITS(block_part2, 16, 31);
		pixel_indices_LSB = GETBITS(block_part2, 16, 15);

		if( (flipbit) == 0 )
		{
			// We should not flip
			shift=8;
			for(let x:int=startx+2; x<startx+4; x++)
			{
				for(let y:int=starty; y<starty+4; y++)
				{
					index  = ((pixel_indices_MSB >> shift) & 1) << 1;
					index |= ((pixel_indices_LSB >> shift) & 1);
					shift++;
					index=unscramble[index];

 					r=SET_RED_CHANNEL   (img,width,x,y,channels, SATURATE(avg_color[0]+compressParams[table][index]));
 					g=SET_GREEN_CHANNEL (img,width,x,y,channels, SATURATE(avg_color[1]+compressParams[table][index]));
 					b=SET_BLUE_CHANNEL  (img,width,x,y,channels, SATURATE(avg_color[2]+compressParams[table][index]));
				}
			}
		}
		else
		{
			// We should flip
			shift=2;
			for(let x:int=startx; x<startx+4; x++)
			{
				for(let y:int=starty+2; y<starty+4; y++)
				{
					index  = ((pixel_indices_MSB >> shift) & 1) << 1;
					index |= ((pixel_indices_LSB >> shift) & 1);
					shift++;
					index=unscramble[index];

 					r=SET_RED_CHANNEL   (img,width,x,y,channels, SATURATE(avg_color[0]+compressParams[table][index]));
 					g=SET_GREEN_CHANNEL (img,width,x,y,channels, SATURATE(avg_color[1]+compressParams[table][index]));
 					b=SET_BLUE_CHANNEL  (img,width,x,y,channels, SATURATE(avg_color[2]+compressParams[table][index]));
				}
				shift += 2;
			}
		}
	}
}
function decompressBlockDiffFlip(block_part1: uint, block_part2: uint, img: Uint8Array, width: int, height: int, startx: int, starty: int): void
{
  decompressBlockDiffFlipC(block_part1, block_part2, img, width, height, startx, starty, 3);
}

// Decompress an ETC2 RGB block
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function decompressBlockETC2c(block_part1: uint, block_part2: uint, img: Uint8Array, width: int, height: int, startx: int, starty: int, channels: int): void
{
	let diffbit: int;
	let color1: int8[3];
	let diff: int8[3];
	let red: int8;
	let green: int8;
	let blue: int8;

	diffbit = (GETBITSHIGH(block_part1, 1, 33));

	if( diffbit )
	{
		// We have diffbit = 1;

		// Base color
		color1[0]= GETBITSHIGH(block_part1, 5, 63);
		color1[1]= GETBITSHIGH(block_part1, 5, 55);
		color1[2]= GETBITSHIGH(block_part1, 5, 47);

		// Diff color
		diff[0]= GETBITSHIGH(block_part1, 3, 58);
		diff[1]= GETBITSHIGH(block_part1, 3, 50);
		diff[2]= GETBITSHIGH(block_part1, 3, 42);

		// Extend sign bit to entire byte. 
		diff[0] = (diff[0] << 5);
		diff[1] = (diff[1] << 5);
		diff[2] = (diff[2] << 5);
		diff[0] = diff[0] >> 5;
		diff[1] = diff[1] >> 5;
		diff[2] = diff[2] >> 5;

		red   = color1[0] + diff[0];
		green = color1[1] + diff[1];
		blue  = color1[2] + diff[2];

		if(red < 0 || red > 31)
		{
			const [block59_part1, block59_part2] = unstuff59bits(block_part1, block_part2);
			decompressBlockTHUMB59Tc(block59_part1, block59_part2, img, width, height, startx, starty, channels);
		}
		else if (green < 0 || green > 31)
		{
			const [block58_part1, block58_part2] = unstuff58bits(block_part1, block_part2);
			decompressBlockTHUMB58Hc(block58_part1, block58_part2, img, width, height, startx, starty, channels);
		}
		else if(blue < 0 || blue > 31)
		{
			const [block57_part1, block57_part2] = unstuff57bits(block_part1, block_part2);
			decompressBlockPlanar57c(block57_part1, block57_part2, img, width, height, startx, starty, channels);
		}
		else
		{
 			decompressBlockDiffFlipC(block_part1, block_part2, img, width, height, startx, starty, channels);
		}
	}
	else
	{
		// We have diffbit = 0;
		decompressBlockDiffFlipC(block_part1, block_part2, img, width, height, startx, starty, channels);
	}
}
function decompressBlockETC2(block_part1: uint, block_part2: uint, img: Uint8Array, width: int, height: int, startx: int, starty: int): void
{
  decompressBlockETC2c(block_part1, block_part2, img, width, height, startx, starty, 3);
}
// Decompress an ETC2 block with punchthrough alpha
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function decompressBlockDifferentialWithAlphaC(block_part1: uint, block_part2: uint, img: Uint8Array, alpha: Uint8Array, width: int, height: int, startx: int, starty: int, channelsRGB: int): void
{
	
	let avg_color: uint8[3];
	let enc_color1: uint8[3];
	let enc_color2: uint8[3];
	let diff: int8[3];
	let table: int;
	let index: int;
	let shift: int;
	let r: int;
	let g: int;
	let b: int;
	let diffbit: int;
	let flipbit: int;
  let channelsA: int;

  if(channelsRGB == 3)
  {
    // We will decode the alpha data to a separate memory area. 
    channelsA = 1;
  }
  else
  {
    // We will decode the RGB data and the alpha data to the same memory area, 
    // interleaved as RGBA. 
    channelsA = 4;
    alpha = &img[0+3];
  }

	//the diffbit now encodes whether or not the entire alpha channel is 255.
	diffbit = (GETBITSHIGH(block_part1, 1, 33));
 	flipbit = (GETBITSHIGH(block_part1, 1, 32));

	// First decode left part of block.
	enc_color1[0]= GETBITSHIGH(block_part1, 5, 63);
	enc_color1[1]= GETBITSHIGH(block_part1, 5, 55);
	enc_color1[2]= GETBITSHIGH(block_part1, 5, 47);

	// Expand from 5 to 8 bits
	avg_color[0] = (enc_color1[0] <<3) | (enc_color1[0] >> 2);
	avg_color[1] = (enc_color1[1] <<3) | (enc_color1[1] >> 2);
	avg_color[2] = (enc_color1[2] <<3) | (enc_color1[2] >> 2);

	table = GETBITSHIGH(block_part1, 3, 39) << 1;

	let pixel_indices_MSB: uint;
	let pixel_indices_LSB: uint;
		
	pixel_indices_MSB = GETBITS(block_part2, 16, 31);
	pixel_indices_LSB = GETBITS(block_part2, 16, 15);

	if( (flipbit) == 0 )
	{
		// We should not flip
		shift = 0;
		for(let x:int=startx; x<startx+2; x++)
		{
			for(let y:int=starty; y<starty+4; y++)
			{
				index  = ((pixel_indices_MSB >> shift) & 1) << 1;
				index |= ((pixel_indices_LSB >> shift) & 1);
				shift++;
				index=unscramble[index];

				let mod: int = compressParams[table][index];
				if(diffbit==0&&(index==1||index==2)) 
				{
					mod=0;
				}
				
				r=SET_RED_CHANNEL   (img,width,x,y,channelsRGB, SATURATE(avg_color[0]+mod));
				g=SET_GREEN_CHANNEL (img,width,x,y,channelsRGB, SATURATE(avg_color[1]+mod));
				b=SET_BLUE_CHANNEL  (img,width,x,y,channelsRGB, SATURATE(avg_color[2]+mod));
				if(diffbit==0&&index==1) 
				{
					alpha[(y*width+x)*channelsA]=0;
					r=SET_RED_CHANNEL   (img,width,x,y,channelsRGB, 0);
					g=SET_GREEN_CHANNEL (img,width,x,y,channelsRGB, 0);
					b=SET_BLUE_CHANNEL  (img,width,x,y,channelsRGB, 0);
				}
				else 
				{
					alpha[(y*width+x)*channelsA]=255;
				}

			}
		}
	}
	else
	{
		// We should flip
		shift = 0;
		for(let x:int=startx; x<startx+4; x++)
		{
			for(let y:int=starty; y<starty+2; y++)
			{
				index  = ((pixel_indices_MSB >> shift) & 1) << 1;
				index |= ((pixel_indices_LSB >> shift) & 1);
				shift++;
				index=unscramble[index];
				let mod:int = compressParams[table][index];
				if(diffbit==0&&(index==1||index==2)) 
				{
					mod=0;
				}
				r=SET_RED_CHANNEL   (img,width,x,y,channelsRGB, SATURATE(avg_color[0]+mod));
				g=SET_GREEN_CHANNEL (img,width,x,y,channelsRGB, SATURATE(avg_color[1]+mod));
				b=SET_BLUE_CHANNEL  (img,width,x,y,channelsRGB, SATURATE(avg_color[2]+mod));
				if(diffbit==0&&index==1) 
				{
					alpha[(y*width+x)*channelsA]=0;
					r=SET_RED_CHANNEL   (img,width,x,y,channelsRGB, 0);
					g=SET_GREEN_CHANNEL (img,width,x,y,channelsRGB, 0);
					b=SET_BLUE_CHANNEL  (img,width,x,y,channelsRGB, 0);
				}
				else 
				{
					alpha[(y*width+x)*channelsA]=255;
				}
			}
			shift+=2;
		}
	}
	// Now decode right part of block. 
	diff[0]= GETBITSHIGH(block_part1, 3, 58);
	diff[1]= GETBITSHIGH(block_part1, 3, 50);
	diff[2]= GETBITSHIGH(block_part1, 3, 42);

	// Extend sign bit to entire byte. 
	diff[0] = (diff[0] << 5);
	diff[1] = (diff[1] << 5);
	diff[2] = (diff[2] << 5);
	diff[0] = diff[0] >> 5;
	diff[1] = diff[1] >> 5;
	diff[2] = diff[2] >> 5;

	//  Calculate second color
	enc_color2[0]= enc_color1[0] + diff[0];
	enc_color2[1]= enc_color1[1] + diff[1];
	enc_color2[2]= enc_color1[2] + diff[2];

	// Expand from 5 to 8 bits
	avg_color[0] = (enc_color2[0] <<3) | (enc_color2[0] >> 2);
	avg_color[1] = (enc_color2[1] <<3) | (enc_color2[1] >> 2);
	avg_color[2] = (enc_color2[2] <<3) | (enc_color2[2] >> 2);

	table = GETBITSHIGH(block_part1, 3, 36) << 1;
	pixel_indices_MSB = GETBITS(block_part2, 16, 31);
	pixel_indices_LSB = GETBITS(block_part2, 16, 15);

	if( (flipbit) == 0 )
	{
		// We should not flip
		shift=8;
		for(let x:int=startx+2; x<startx+4; x++)
		{
			for(let y:int=starty; y<starty+4; y++)
			{
				index  = ((pixel_indices_MSB >> shift) & 1) << 1;
				index |= ((pixel_indices_LSB >> shift) & 1);
				shift++;
				index=unscramble[index];
				let mod: int = compressParams[table][index];
				if(diffbit==0&&(index==1||index==2)) 
				{
					mod=0;
				}
				
				r=SET_RED_CHANNEL   (img,width,x,y,channelsRGB, SATURATE(avg_color[0]+mod));
				g=SET_GREEN_CHANNEL (img,width,x,y,channelsRGB, SATURATE(avg_color[1]+mod));
				b=SET_BLUE_CHANNEL  (img,width,x,y,channelsRGB, SATURATE(avg_color[2]+mod));
				if(diffbit==0&&index==1) 
				{
					alpha[(y*width+x)*channelsA]=0;
					r=SET_RED_CHANNEL   (img,width,x,y,channelsRGB, 0);
					g=SET_GREEN_CHANNEL (img,width,x,y,channelsRGB, 0);
					b=SET_BLUE_CHANNEL  (img,width,x,y,channelsRGB, 0);
				}
				else 
				{
					alpha[(y*width+x)*channelsA]=255;
				}
			}
		}
	}
	else
	{
		// We should flip
		shift=2;
		for(let x:int=startx; x<startx+4; x++)
		{
			for(let y:int=starty+2; y<starty+4; y++)
			{
				index  = ((pixel_indices_MSB >> shift) & 1) << 1;
				index |= ((pixel_indices_LSB >> shift) & 1);
				shift++;
				index=unscramble[index];
				let mod: int = compressParams[table][index];
				if(diffbit==0&&(index==1||index==2)) 
				{
					mod=0;
				}
				
				r=SET_RED_CHANNEL   (img,width,x,y,channelsRGB, SATURATE(avg_color[0]+mod));
				g=SET_GREEN_CHANNEL (img,width,x,y,channelsRGB, SATURATE(avg_color[1]+mod));
				b=SET_BLUE_CHANNEL  (img,width,x,y,channelsRGB, SATURATE(avg_color[2]+mod));
				if(diffbit==0&&index==1) 
				{
					alpha[(y*width+x)*channelsA]=0;
					r=SET_RED_CHANNEL   (img,width,x,y,channelsRGB, 0);
					g=SET_GREEN_CHANNEL (img,width,x,y,channelsRGB, 0);
					b=SET_BLUE_CHANNEL  (img,width,x,y,channelsRGB, 0);
				}
				else 
				{
					alpha[(y*width+x)*channelsA]=255;
				}
			}
			shift += 2;
		}
	}
}
function decompressBlockDifferentialWithAlpha(block_part1: uint, block_part2: uint, img: Uint8Array, alpha: Uint8Array, width: int, height: int, startx: int, starty: int): void
{
  decompressBlockDifferentialWithAlphaC(block_part1, block_part2, img, alpha, width, height, startx, starty, 3);
}


// similar to regular decompression, but alpha channel is set to 0 if pixel index is 2, otherwise 255.
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function decompressBlockTHUMB59TAlphaC(block_part1: uint, block_part2: uint, img: Uint8Array, alpha: Uint8Array, width: int, height: int, startx: int, starty: int, channelsRGB: int): void
{

	let colorsRGB444: uint8[2][3];
	let colors: uint8[2][3];
	let paint_colors: uint8[4][3];
	let distance: uint8;
	let block_mask: uint8[4][4];
  let channelsA: int;

  if(channelsRGB == 3)
  {
    // We will decode the alpha data to a separate memory area. 
    channelsA = 1;
  }
  else
  {
    // We will decode the RGB data and the alpha data to the same memory area, 
    // interleaved as RGBA. 
    channelsA = 4;
    alpha = &img[0+3];
  }

	// First decode left part of block.
	colorsRGB444[0][R]= GETBITSHIGH(block_part1, 4, 58);
	colorsRGB444[0][G]= GETBITSHIGH(block_part1, 4, 54);
	colorsRGB444[0][B]= GETBITSHIGH(block_part1, 4, 50);

	colorsRGB444[1][R]= GETBITSHIGH(block_part1, 4, 46);
	colorsRGB444[1][G]= GETBITSHIGH(block_part1, 4, 42);
	colorsRGB444[1][B]= GETBITSHIGH(block_part1, 4, 38);

	distance   = GETBITSHIGH(block_part1, TABLE_BITS_59T, 34);

	// Extend the two colors to RGB888	
	decompressColor(R_BITS59T, G_BITS59T, B_BITS59T, colorsRGB444, colors);	
	calculatePaintColors59T(distance, colors, paint_colors);
	
	// Choose one of the four paint colors for each texel
	for (let x:uint8 = 0; x < BLOCKWIDTH; ++x) 
	{
		for (let y:uint8 = 0; y < BLOCKHEIGHT; ++y) 
		{
			//block_mask[x][y] = GETBITS(block_part2,2,31-(y*4+x)*2);
			block_mask[x][y] = GETBITS(block_part2,1,(y+x*4)+16)<<1;
			block_mask[x][y] |= GETBITS(block_part2,1,(y+x*4));
			img[channelsRGB*((starty+y)*width+startx+x)+R] = SATURATE(paint_colors[block_mask[x][y]][R]); // RED
			img[channelsRGB*((starty+y)*width+startx+x)+G] = SATURATE(paint_colors[block_mask[x][y]][G]); // GREEN
			img[channelsRGB*((starty+y)*width+startx+x)+B] = SATURATE(paint_colors[block_mask[x][y]][B]); // BLUE
			if(block_mask[x][y]==2)  
			{
				alpha[channelsA*(x+startx+(y+starty)*width)]=0;
				img[channelsRGB*((starty+y)*width+startx+x)+R] =0;
				img[channelsRGB*((starty+y)*width+startx+x)+G] =0;
				img[channelsRGB*((starty+y)*width+startx+x)+B] =0;
			}
			else
				alpha[channelsA*(x+startx+(y+starty)*width)]=255;
		}
	}
}
function decompressBlockTHUMB59TAlpha(block_part1: uint, block_part2: uint, img: Uint8Array, alpha: Uint8Array, width: int, height: int, startx: int, starty: int): void
{
  decompressBlockTHUMB59TAlphaC(block_part1, block_part2, img, alpha, width, height, startx, starty, 3);
}


// Decompress an H-mode block with alpha
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function decompressBlockTHUMB58HAlphaC(block_part1: uint, block_part2: uint, img: Uint8Array, alpha: Uint8Array, width: int, height: int, startx: int, starty: int, channelsRGB: int): void
{
	let col0: uint;
	let col1: uint;
	let colors: uint8[2][3];
	let colorsRGB444: uint8[2][3];
	let paint_colors: uint8[4][3];
	let distance: uint8;
	let block_mask: uint8[4][4];
  let channelsA: int;

  if(channelsRGB == 3)
  {
    // We will decode the alpha data to a separate memory area. 
    channelsA = 1;
  }
  else
  {
    // We will decode the RGB data and the alpha data to the same memory area, 
    // interleaved as RGBA. 
    channelsA = 4;
    alpha = &img[0+3];
  }

	// First decode left part of block.
	colorsRGB444[0][R]= GETBITSHIGH(block_part1, 4, 57);
	colorsRGB444[0][G]= GETBITSHIGH(block_part1, 4, 53);
	colorsRGB444[0][B]= GETBITSHIGH(block_part1, 4, 49);

	colorsRGB444[1][R]= GETBITSHIGH(block_part1, 4, 45);
	colorsRGB444[1][G]= GETBITSHIGH(block_part1, 4, 41);
	colorsRGB444[1][B]= GETBITSHIGH(block_part1, 4, 37);

  distance = 0;
	distance = (GETBITSHIGH(block_part1, 2, 33)) << 1;

	col0 = GETBITSHIGH(block_part1, 12, 57);
	col1 = GETBITSHIGH(block_part1, 12, 45);

	if(col0 >= col1)
	{
		distance |= 1;
	}

	// Extend the two colors to RGB888	
	decompressColor(R_BITS58H, G_BITS58H, B_BITS58H, colorsRGB444, colors);	
	
	calculatePaintColors58H(distance, colors, paint_colors);
	
	// Choose one of the four paint colors for each texel
	for (let x:uint8 = 0; x < BLOCKWIDTH; ++x) 
	{
		for (let y:uint8 = 0; y < BLOCKHEIGHT; ++y) 
		{
			//block_mask[x][y] = GETBITS(block_part2,2,31-(y*4+x)*2);
			block_mask[x][y] = GETBITS(block_part2,1,(y+x*4)+16)<<1;
			block_mask[x][y] |= GETBITS(block_part2,1,(y+x*4));
			img[channelsRGB*((starty+y)*width+startx+x)+R] = SATURATE(paint_colors[block_mask[x][y]][R]); // RED
			img[channelsRGB*((starty+y)*width+startx+x)+G] = SATURATE(paint_colors[block_mask[x][y]][G]); // GREEN
			img[channelsRGB*((starty+y)*width+startx+x)+B] = SATURATE(paint_colors[block_mask[x][y]][B]); // BLUE
			
			if(block_mask[x][y]==2)  
			{
				alpha[channelsA*(x+startx+(y+starty)*width)]=0;
				img[channelsRGB*((starty+y)*width+startx+x)+R] =0;
				img[channelsRGB*((starty+y)*width+startx+x)+G] =0;
				img[channelsRGB*((starty+y)*width+startx+x)+B] =0;
			}
			else
				alpha[channelsA*(x+startx+(y+starty)*width)]=255;
		}
	}
}
function decompressBlockTHUMB58HAlpha(block_part1: uint, block_part2: uint, img: Uint8Array, alpha: Uint8Array, width: int, height: int, startx: int, starty: int): void
{
  decompressBlockTHUMB58HAlphaC(block_part1, block_part2, img, alpha, width, height, startx, starty, 3);
}
// Decompression function for ETC2_RGBA1 format.
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function decompressBlockETC21BitAlphaC(block_part1: uint, block_part2: uint, img: Uint8Array, alphaimg: Uint8Array, width: int, height: int, startx: int, starty: int, channelsRGB: int): void
{
	let diffbit: int;
	let color1: int8[3];
	let diff: int8[3];
	let red: int8;
	let green: int8;
	let blue: int8;
  let channelsA: int;

  if(channelsRGB == 3)
  {
    // We will decode the alpha data to a separate memory area. 
    channelsA = 1;
  }
  else
  {
    // We will decode the RGB data and the alpha data to the same memory area, 
    // interleaved as RGBA. 
    channelsA = 4;
    alphaimg = &img[0+3];
  }

	diffbit = (GETBITSHIGH(block_part1, 1, 33));

	if( diffbit )
	{
		// We have diffbit = 1, meaning no transparent pixels. regular decompression.

		// Base color
		color1[0]= GETBITSHIGH(block_part1, 5, 63);
		color1[1]= GETBITSHIGH(block_part1, 5, 55);
		color1[2]= GETBITSHIGH(block_part1, 5, 47);

		// Diff color
		diff[0]= GETBITSHIGH(block_part1, 3, 58);
		diff[1]= GETBITSHIGH(block_part1, 3, 50);
		diff[2]= GETBITSHIGH(block_part1, 3, 42);

		// Extend sign bit to entire byte. 
		diff[0] = (diff[0] << 5);
		diff[1] = (diff[1] << 5);
		diff[2] = (diff[2] << 5);
		diff[0] = diff[0] >> 5;
		diff[1] = diff[1] >> 5;
		diff[2] = diff[2] >> 5;

		red   = color1[0] + diff[0];
		green = color1[1] + diff[1];
		blue  = color1[2] + diff[2];

		if(red < 0 || red > 31)
		{
			const [block59_part1, block59_part2] = unstuff59bits(block_part1, block_part2);
			decompressBlockTHUMB59Tc(block59_part1, block59_part2, img, width, height, startx, starty, channelsRGB);
		}
		else if (green < 0 || green > 31)
		{
			const [block58_part1, block58_part2] = unstuff58bits(block_part1, block_part2);
			decompressBlockTHUMB58Hc(block58_part1, block58_part2, img, width, height, startx, starty, channelsRGB);
		}
		else if(blue < 0 || blue > 31)
		{
			const [block57_part1, block57_part2] = unstuff57bits(block_part1, block_part2);
			decompressBlockPlanar57c(block57_part1, block57_part2, img, width, height, startx, starty, channelsRGB);
		}
		else
		{
 			decompressBlockDifferentialWithAlphaC(block_part1, block_part2, img, alphaimg, width, height, startx, starty, channelsRGB);
		}
		for(let x:int=startx; x<startx+4; x++) 
		{
			for(let y:int=starty; y<starty+4; y++) 
			{
				alphaimg[channelsA*(x+y*width)]=255;
			}
		}
	}
	else
	{
		// We have diffbit = 0, transparent pixels. Only T-, H- or regular diff-mode possible.
		
		// Base color
		color1[0]= GETBITSHIGH(block_part1, 5, 63);
		color1[1]= GETBITSHIGH(block_part1, 5, 55);
		color1[2]= GETBITSHIGH(block_part1, 5, 47);

		// Diff color
		diff[0]= GETBITSHIGH(block_part1, 3, 58);
		diff[1]= GETBITSHIGH(block_part1, 3, 50);
		diff[2]= GETBITSHIGH(block_part1, 3, 42);

		// Extend sign bit to entire byte. 
		diff[0] = (diff[0] << 5);
		diff[1] = (diff[1] << 5);
		diff[2] = (diff[2] << 5);
		diff[0] = diff[0] >> 5;
		diff[1] = diff[1] >> 5;
		diff[2] = diff[2] >> 5;

		red   = color1[0] + diff[0];
		green = color1[1] + diff[1];
		blue  = color1[2] + diff[2];
		if(red < 0 || red > 31)
		{
			const [block59_part1, block59_part2] = unstuff59bits(block_part1, block_part2);
			decompressBlockTHUMB59TAlphaC(block59_part1, block59_part2, img, alphaimg, width, height, startx, starty, channelsRGB);
		}
		else if(green < 0 || green > 31) 
		{
			const [block58_part1, block58_part2] = unstuff58bits(block_part1, block_part2);
			decompressBlockTHUMB58HAlphaC(block58_part1, block58_part2, img, alphaimg, width, height, startx, starty, channelsRGB);
		}
		else if(blue < 0 || blue > 31)
		{
			const [block57_part1, block57_part2] = unstuff57bits(block_part1, block_part2);
			decompressBlockPlanar57c(block57_part1, block57_part2, img, width, height, startx, starty, channelsRGB);
			for(let x:int=startx; x<startx+4; x++) 
			{
				for(let y:int=starty; y<starty+4; y++) 
				{
					alphaimg[channelsA*(x+y*width)]=255;
				}
			}
		}
		else
			decompressBlockDifferentialWithAlphaC(block_part1, block_part2, img,alphaimg, width, height, startx, starty, channelsRGB);
	}
}
function decompressBlockETC21BitAlpha(block_part1: uint, block_part2: uint, img: Uint8Array, alphaimg: Uint8Array, width: int, height: int, startx: int, starty: int): void
{
  decompressBlockETC21BitAlphaC(block_part1, block_part2, img, alphaimg, width, height, startx, starty, 3);
}
//
//	Utility functions used for alpha compression
//

// bit number frompos is extracted from input, and moved to bit number topos in the return value.
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function getbit(input: uint8, frompos: int, topos: int): uint8
{
	let output: uint8 = 0;
	if(frompos>topos)
		return ((1<<frompos)&input)>>(frompos-topos);
	return ((1<<frompos)&input)<<(topos-frompos);
}

// takes as input a value, returns the value clamped to the interval [0,255].
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function clamp(val: int): int
{
	if(val<0)
		val=0;
	if(val>255)
		val=255;
	return val;
}

// Decodes tha alpha component in a block coded with GL_COMPRESSED_RGBA8_ETC2_EAC.
// Note that this decoding is slightly different from that of GL_COMPRESSED_R11_EAC.
// However, a hardware decoder can share gates between the two formats as explained
// in the specification under GL_COMPRESSED_R11_EAC.
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function decompressBlockAlphaC(data: Uint8Array, img: Uint8Array, width: int, height: int, ix: int, iy: int, channels: int): void
{
	const alpha: int = data[0];
	const table: int = data[1];
	
	let bit:int=0;
	let byte:int=2;
	//extract an alpha value for each pixel.
	for(let x:int=0; x<4; x++) 
	{
		for(let y:int=0; y<4; y++) 
		{
			//Extract table index
			let index:int=0;
			for(let bitpos:int=0; bitpos<3; bitpos++) 
			{
				index|=getbit(data[byte],7-bit,2-bitpos);
				bit++;
				if(bit>7) 
				{
					bit=0;
					byte++;
				}
			}
			img[(ix+x+(iy+y)*width)*channels]=clamp(alpha +alphaTable[table][index]);
		}
	}
}
function decompressBlockAlpha(data: Uint8Array, img: Uint8Array, width: int, height: int, ix: int, iy: int): void
{
  decompressBlockAlphaC(data, img, width, height, ix, iy, 1);
}

// Does decompression and then immediately converts from 11 bit signed to a 16-bit format.
// 
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function get16bits11signed(base: int, table: int, mul: int, index: int): int16
{
	let elevenbase: int = base-128;
	if(elevenbase==-128)
		elevenbase=-127;
	elevenbase*=8;
	//i want the positive value here
	let tabVal: int = -alphaBase[table][3-index%4]-1;
	//and the sign, please
	let sign: boolean = (1-(index/4))!=0;
	
	if(sign)
		tabVal=tabVal+1;
	let elevenTabVal: int = tabVal*8;

	if(mul!=0)
		elevenTabVal*=mul;
	else
		elevenTabVal/=8;

	if(sign)
		elevenTabVal=-elevenTabVal;

	//calculate sum
	let elevenbits: int = elevenbase+elevenTabVal;

	//clamp..
	if(elevenbits>=1024)
		elevenbits=1023;
	else if(elevenbits<-1023)
		elevenbits=-1023;
	//this is the value we would actually output.. 
	//but there aren't any good 11-bit file or uncompressed GL formats
	//so we extend to 15 bits signed.
	sign = elevenbits<0;
	elevenbits=Math.abs(elevenbits);
	let fifteenbits: int16 = (elevenbits<<5)+(elevenbits>>5);
	let sixteenbits: int16 = fifteenbits;

	if(sign)
		sixteenbits=-sixteenbits;
	
	return sixteenbits;
}

// Does decompression and then immediately converts from 11 bit signed to a 16-bit format 
// Calculates the 11 bit value represented by base, table, mul and index, and extends it to 16 bits.
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function get16bits11bits(base: int, table: int, mul: int, index: int): uint16
{
	const elevenbase: int = base*8+4;

	//i want the positive value here
	let tabVal:int = -alphaBase[table][3-index%4]-1;
	//and the sign, please
	const sign: int = 1-(index/4);
	
	if(sign)
		tabVal=tabVal+1;
	let elevenTabVal: int = tabVal*8;

	if(mul!=0)
		elevenTabVal*=mul;
	else
		elevenTabVal/=8;

	if(sign)
		elevenTabVal=-elevenTabVal;

	//calculate sum
	let elevenbits:int = elevenbase+elevenTabVal;

	//clamp..
	if(elevenbits>=256*8)
		elevenbits=256*8-1;
	else if(elevenbits<0)
		elevenbits=0;
	//elevenbits now contains the 11 bit alpha value as defined in the spec.

	//extend to 16 bits before returning, since we don't have any good 11-bit file formats.
	const sixteenbits: uint16 = (elevenbits<<5)+(elevenbits>>6);

	return sixteenbits;
}

// Decompresses a block using one of the GL_COMPRESSED_R11_EAC or GL_COMPRESSED_SIGNED_R11_EAC-formats
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function decompressBlockAlpha16bitC(data: Uint8Array, img: Uint8Array, width: int, height: int, ix: int, iy: int, channels: int): void
{
	let alpha: int = data[0];
	let table: int = data[1];

	if (formatSigned) 
	{
		//if we have a signed format, the base value is given as a signed byte. We convert it to (0-255) here,
		//so more code can be shared with the unsigned mode.
		const memView = new DataView(data.buffer, data.byteOffset, data.byteLength);
		alpha = memView.getInt8(0);
		alpha = alpha+128;
	}

	let bit: int = 0;
	let byte: int = 2;
	//extract an alpha value for each pixel.
	for(let x:int=0; x<4; x++)
	{
		for(let y:int=0; y<4; y++)
		{
			//Extract table index
			let index: int = 0;
			for(let bitpos:int=0; bitpos<3; bitpos++)
			{
				index|=getbit(data[byte],7-bit,2-bitpos);
				bit++;
				if(bit>7) 
				{
					bit=0;
					byte++;
				}
			}
			const windex: int = channels*(2*(ix+x+(iy+y)*width));
if (PGMOUT) {
			const memView = new DataView(img.buffer, img.byteOffset, img.byteLength);
			if (formatSigned)
			{
				memView.setInt16(windex, get16bits11signed(alpha,(table%16),(table/16),index), true);
			}
			else
			{
				memView.setUint16(windex, get16bits11bits(alpha,(table%16),(table/16),index), true);
			}
} else {
			//make data compatible with the .pgm format. See the comment in compressBlockAlpha16() for details.
			let uSixteen: uint16;
			if (formatSigned)
			{
				//the pgm-format only allows unsigned images,
				//so we add 2^15 to get a 16-bit value.
				uSixteen = get16bits11signed(alpha,(table%16),(table/16),index) + 256*128;
			}
			else
			{
				uSixteen = get16bits11bits(alpha,(table%16),(table/16),index);
			}
			//byte swap for pgm
			img[windex] = uSixteen/256;
			img[windex+1] = uSixteen%256;
}
		}
	}			
}

function decompressBlockAlpha16bit(data: Uint8Array, img: Uint8Array, width: int, height: int, ix: int, iy: int): void
{
  decompressBlockAlpha16bitC(data, img, width, height, ix, iy, 1);
}
