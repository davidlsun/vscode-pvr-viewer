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

// Typedefs
type int8 = number;
type uint8 = number;
type uint16 = number;
type int = number;
type uint = number;

// Macros to help with bit extraction/insertion
const SHIFTLO = (size: uint, start: uint): uint => (start      - size+1);
const SHIFTHI = (size: uint, start: uint): uint => (start - 32 - size+1);
const MASKLO = (size: uint, start: uint): uint => (((2 << (size - 1)) - 1) << SHIFTLO(size, start));
const MASKHI = (size: uint, start: uint): uint => (((1 << (size    )) - 1) << SHIFTHI(size, start));
const GETBITSLO = (src: uint, size: uint, start: uint): uint => ((src >> (start      - size + 1)) & ((1 << size) - 1));
const GETBITSHI = (src: uint, size: uint, start: uint): uint => ((src >> (start - 32 - size + 1)) & ((1 << size) - 1));
const PUTBITSLO = (dest: uint, data: uint, size: uint, start: uint): uint => ((dest & ~MASKLO(size, start)) | ((data << SHIFTLO(size, start)) & MASKLO(size, start)));
const PUTBITSHI = (dest: uint, data: uint, size: uint, start: uint): uint => ((dest & ~MASKHI(size, start)) | ((data << SHIFTHI(size, start)) & MASKHI(size, start)));

// Thumb macros and definitions
const BLOCK_WIDTH = 4;
const BLOCK_HEIGHT = 4;
const R_BITS59T = 4;
const G_BITS59T = 4;
const B_BITS59T = 4;
const R_BITS58H = 4;
const G_BITS58H = 4;
const B_BITS58H = 4;
const TABLE_BITS_59T = 3;
const TABLE_BITS_58H = 3;

// We will decode the alpha data to a separate memory area. 
const R = 0;
const G = 1;
const B = 2;
const RGB = 3;

// Helper Macros
const SATURATE = (x: int): uint8 => ((x < 0) ? 0 : ((x > 255) ? 255 : x));
const ARRAY_XY = (width:int, x: int, y: int): int => (y * width + x);
const SET_COLOR = (channel: int, img: Uint8Array, width: int, x: int, y: int, value: uint8): void => { img[ARRAY_XY(width, x, y) * RGB + channel] = SATURATE(value); };
const SET_ALPHA = (alphaimg: Uint8Array, width: int, x: int, y: int, value: uint8): void => { alphaimg[ARRAY_XY(width, x, y)] = SATURATE(value); };

// Global tables
const unscramble = [2, 3, 1, 0];
const table59T = [3, 6, 11, 16, 23, 32, 41, 64];  // 3-bit table for the 59 bit T-mode
const table58H = [3, 6, 11, 16, 23, 32, 41, 64];  // 3-bit table for the 58 bit H-mode
const compressParams = [
    [-8, -2, 2, 8],
    [-8, -2, 2, 8],
    [-17, -5, 5, 17],
    [-17, -5, 5, 17],
    [-29, -9, 9, 29],
    [-29, -9, 9, 29],
    [-42, -13, 13, 42],
    [-42, -13, 13, 42],
    [-60, -18, 18, 60],
    [-60, -18, 18, 60],
    [-80, -24, 24, 80],
    [-80, -24, 24, 80],
    [-106, -33, 33, 106],
    [-106, -33, 33, 106],
    [-183, -47, 47, 183],
    [-183, -47, 47, 183]
];

// Initialized tables
let alphaTableInitialized = false;
const alphaTable = Array<Int32Array>(256).fill(new Int32Array(8));
const alphaBase = [
    [-15, -9, -6, -3],
    [-13, -10, -7, -3],
    [-13, -8, -5, -2],
    [-13, -6, -4, -2],
    [-12, -8, -6, -3],
    [-11, -9, -7, -3],
    [-11, -8, -7, -4],
    [-11, -8, -5, -3],
    [-10, -8, -6, -2],
    [-10, -8, -5, -2],
    [-10, -8, -4, -2],
    [-10, -7, -5, -2],
    [-10, -7, -4, -3],
    [-10, -3, -2, -1],
    [-9, -8, -6, -4],
    [-9, -7, -5, -3]
];

// Code used to create the valtab
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function setupAlphaTable(): void
{
    if (alphaTableInitialized) {
        return;
    }
    alphaTableInitialized = true;

    //read table used for alpha compression
    for (let i: int = 16; i < 32; i++) {
        for (let j: int = 0; j < 8; j++) {
            let buf: int = alphaBase[i-16][3-j%4];
            if (j < 4) {
                alphaTable[i][j] = buf;
            } else {
                alphaTable[i][j] = -buf - 1;
            }
        }
    }

    //beyond the first 16 values, the rest of the table is implicit.. so calculate that!
    for (let i: int = 0; i < 256; i++) {
        //fill remaining slots in table with multiples of the first ones.
        const mul: int = i / 16;
        const old: int = 16 + i % 16;
        for (let j: int = 0; j < 8; j++) {
            alphaTable[i][j] = alphaTable[old][j] * mul;
            //note: we don't do clamping here, though we could, because we'll be clamped afterwards anyway.
        }
    }
}

// The format stores the bits for the three extra modes in a roundabout way to be able to
// fit them without increasing the bit rate. This function converts them into something
// that is easier to work with. 
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function unstuff57bits(planar_word1: uint, planar_word2: uint): uint[/*2*/]
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

    const RO:  uint8 = GETBITSHI(planar_word1, 6, 62);
    const GO1: uint8 = GETBITSHI(planar_word1, 1, 56);
    const GO2: uint8 = GETBITSHI(planar_word1, 6, 54);
    const BO1: uint8 = GETBITSHI(planar_word1, 1, 48);
    const BO2: uint8 = GETBITSHI(planar_word1, 2, 44);
    const BO3: uint8 = GETBITSHI(planar_word1, 3, 41);
    const RH1: uint8 = GETBITSHI(planar_word1, 5, 38);
    const RH2: uint8 = GETBITSHI(planar_word1, 1, 32);
    const GH:  uint8 = GETBITSLO(planar_word2, 7, 31);
    const BH:  uint8 = GETBITSLO(planar_word2, 6, 24);
    const RV:  uint8 = GETBITSLO(planar_word2, 6, 18);
    const GV:  uint8 = GETBITSLO(planar_word2, 7, 12);
    const BV:  uint8 = GETBITSLO(planar_word2, 6,  5);

    let planar57_word1: uint = 0;
    planar57_word1 = PUTBITSHI(planar57_word1, RO,  6, 63);
    planar57_word1 = PUTBITSHI(planar57_word1, GO1, 1, 57);
    planar57_word1 = PUTBITSHI(planar57_word1, GO2, 6, 56);
    planar57_word1 = PUTBITSHI(planar57_word1, BO1, 1, 50);
    planar57_word1 = PUTBITSHI(planar57_word1, BO2, 2, 49);
    planar57_word1 = PUTBITSHI(planar57_word1, BO3, 3, 47);
    planar57_word1 = PUTBITSHI(planar57_word1, RH1, 5, 44);
    planar57_word1 = PUTBITSHI(planar57_word1, RH2, 1, 39);
    planar57_word1 = PUTBITSHI(planar57_word1, GH,  7, 38);

    let planar57_word2: uint = 0;
    planar57_word2 = PUTBITSLO(planar57_word2, BH, 6, 31);
    planar57_word2 = PUTBITSLO(planar57_word2, RV, 6, 25);
    planar57_word2 = PUTBITSLO(planar57_word2, GV, 7, 19);
    planar57_word2 = PUTBITSLO(planar57_word2, BV, 6, 12);

    return [planar57_word1, planar57_word2];
}

// The format stores the bits for the three extra modes in a roundabout way to be able to
// fit them without increasing the bit rate. This function converts them into something
// that is easier to work with. 
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function unstuff58bits(thumbH_word1: uint, thumbH_word2: uint): uint[/*2*/]
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
    const part0: uint = GETBITSHI(thumbH_word1, 7, 62);
    const part1: uint = GETBITSHI(thumbH_word1, 2, 52);
    const part2: uint = GETBITSHI(thumbH_word1,16, 49);
    const part3: uint = GETBITSHI(thumbH_word1, 1, 32);

    let thumbH58_word1: uint = 0;
    thumbH58_word1 = PUTBITSHI(thumbH58_word1, part0,  7, 57);
    thumbH58_word1 = PUTBITSHI(thumbH58_word1, part1,  2, 50);
    thumbH58_word1 = PUTBITSHI(thumbH58_word1, part2, 16, 48);
    thumbH58_word1 = PUTBITSHI(thumbH58_word1, part3,  1, 32);

    const thumbH58_word2: uint = thumbH_word2;

    return [thumbH58_word1, thumbH58_word2];
}

// The format stores the bits for the three extra modes in a roundabout way to be able to
// fit them without increasing the bit rate. This function converts them into something
// that is easier to work with. 
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function unstuff59bits(thumbT_word1: uint, thumbT_word2: uint): uint[/*2*/]
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
    thumbT59_word1 = PUTBITSHI(thumbT59_word1, thumbT_word1,  1, 32);
    // Fix R0a (top two bits of R0)
    const R0a: uint8 = GETBITSHI(thumbT_word1, 2, 60);
    thumbT59_word1 = PUTBITSHI(thumbT59_word1, R0a,  2, 58);

    // Zero top part (not needed)
    thumbT59_word1 = PUTBITSHI(thumbT59_word1, 0,  5, 63);

    const thumbT59_word2: uint = thumbT_word2;

    return [thumbT59_word1, thumbT59_word2];
}

// The color bits are expanded to the full color
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function decompressColor(R_B: int, G_B: int, B_B: int, colors_RGB444: Uint8Array[/*2*/]): Uint8Array[/*2*/]
{
    // The color should be retrieved as:
    //
    // c = round(255/(r_bits^2-1))*comp_color
    //
    // This is similar to bit replication
    // 
    // Note -- this code only work for bit replication from 4 bits and up --- 3 bits needs
    // two copy operations.
    const colors = Array<Uint8Array>(2).fill(new Uint8Array(RGB));

    colors[0][R] = (colors_RGB444[0][R] << (8 - R_B)) | (colors_RGB444[0][R] >> (R_B - (8 - R_B)));
    colors[0][G] = (colors_RGB444[0][G] << (8 - G_B)) | (colors_RGB444[0][G] >> (G_B - (8 - G_B)));
    colors[0][B] = (colors_RGB444[0][B] << (8 - B_B)) | (colors_RGB444[0][B] >> (B_B - (8 - B_B)));

    colors[1][R] = (colors_RGB444[1][R] << (8 - R_B)) | (colors_RGB444[1][R] >> (R_B - (8 - R_B)));
    colors[1][G] = (colors_RGB444[1][G] << (8 - G_B)) | (colors_RGB444[1][G] >> (G_B - (8 - G_B)));
    colors[1][B] = (colors_RGB444[1][B] << (8 - B_B)) | (colors_RGB444[1][B] >> (B_B - (8 - B_B)));

    return colors;
}

function calculatePaintColors59T(dist: uint8, colors: Uint8Array[/*2*/]): Uint8Array[/*4*/]
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
    /////////////////////////////////////////////
    const possible_colors = Array<Uint8Array>(4).fill(new Uint8Array(RGB));

    // C4
    possible_colors[3][R] = SATURATE(colors[1][R] - table59T[dist]);
    possible_colors[3][G] = SATURATE(colors[1][G] - table59T[dist]);
    possible_colors[3][B] = SATURATE(colors[1][B] - table59T[dist]);

    // PATTERN_T
    {
        // C3
        possible_colors[0][R] = colors[0][R];
        possible_colors[0][G] = colors[0][G];
        possible_colors[0][B] = colors[0][B];
        // C2
        possible_colors[1][R] = SATURATE(colors[1][R] + table59T[dist]);
        possible_colors[1][G] = SATURATE(colors[1][G] + table59T[dist]);
        possible_colors[1][B] = SATURATE(colors[1][B] + table59T[dist]);
        // C1
        possible_colors[2][R] = colors[1][R];
        possible_colors[2][G] = colors[1][G];
        possible_colors[2][B] = colors[1][B];
    }

    return possible_colors;
}

// Decompress a T-mode block (simple packing)
// Simple 59T packing:
//|63 62 61 60 59|58 57 56 55|54 53 52 51|50 49 48 47|46 45 44 43|42 41 40 39|38 37 36 35|34 33 32|
//|----empty-----|---red 0---|--green 0--|--blue 0---|---red 1---|--green 1--|--blue 1---|--dist--|
//
//|31 30 29 28 27 26 25 24 23 22 21 20 19 18 17 16 15 14 13 12 11 10 09 08 07 06 05 04 03 02 01 00|
//|----------------------------------------index bits---------------------------------------------|
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function decompressBlockTHUMB59T(block_part1: uint, block_part2: uint, img: Uint8Array, width: int, height: int, startx: int, starty: int): void
{
    const dist: uint8 = GETBITSHI(block_part1, TABLE_BITS_59T, 34);

    // First decode left part of block.
    const colorsRGB444 = Array<Uint8Array>(2).fill(new Uint8Array(RGB));
    colorsRGB444[0][R] = GETBITSHI(block_part1, 4, 58);
    colorsRGB444[0][G] = GETBITSHI(block_part1, 4, 54);
    colorsRGB444[0][B] = GETBITSHI(block_part1, 4, 50);
    colorsRGB444[1][R] = GETBITSHI(block_part1, 4, 46);
    colorsRGB444[1][G] = GETBITSHI(block_part1, 4, 42);
    colorsRGB444[1][B] = GETBITSHI(block_part1, 4, 38);

    // Extend the two colors to RGB888
    const colors = decompressColor(R_BITS59T, G_BITS59T, B_BITS59T, colorsRGB444);
    const paint_colors = calculatePaintColors59T(dist, colors);

    // Choose one of the four paint colors for each texel
    const block_mask = Array<Uint8Array>(BLOCK_WIDTH).fill(new Uint8Array(BLOCK_HEIGHT));
    for (let x: uint8 = 0; x < BLOCK_WIDTH; x++) {
        for (let y: uint8 = 0; y < BLOCK_HEIGHT; y++) {
            block_mask[x][y]  = GETBITSLO(block_part2, 1, (y+x*4) + 16) << 1;
            block_mask[x][y] |= GETBITSLO(block_part2, 1, (y+x*4));

            SET_COLOR(R, img, width, startx+x, starty+y, paint_colors[block_mask[x][y]][R]);
            SET_COLOR(G, img, width, startx+x, starty+y, paint_colors[block_mask[x][y]][G]);
            SET_COLOR(B, img, width, startx+x, starty+y, paint_colors[block_mask[x][y]][B]);
        }
    }
}

// Calculate the paint colors from the block colors 
// using a distance d and one of the H- or T-patterns.
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function calculatePaintColors58H(dist: uint8, colors: Uint8Array[/*2*/]): Uint8Array[/*4*/]
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
    const possible_colors = Array<Uint8Array>(4).fill(new Uint8Array(RGB));

    // C4
    possible_colors[3][R] = SATURATE(colors[1][R] - table58H[dist]);
    possible_colors[3][G] = SATURATE(colors[1][G] - table58H[dist]);
    possible_colors[3][B] = SATURATE(colors[1][B] - table58H[dist]);
    
    // PATTERN_H
    { 
        // C1
        possible_colors[0][R] = SATURATE(colors[0][R] + table58H[dist]);
        possible_colors[0][G] = SATURATE(colors[0][G] + table58H[dist]);
        possible_colors[0][B] = SATURATE(colors[0][B] + table58H[dist]);
        // C2
        possible_colors[1][R] = SATURATE(colors[0][R] - table58H[dist]);
        possible_colors[1][G] = SATURATE(colors[0][G] - table58H[dist]);
        possible_colors[1][B] = SATURATE(colors[0][B] - table58H[dist]);
        // C3
        possible_colors[2][R] = SATURATE(colors[1][R] + table58H[dist]);
        possible_colors[2][G] = SATURATE(colors[1][G] + table58H[dist]);
        possible_colors[2][B] = SATURATE(colors[1][B] + table58H[dist]);
    }

    return possible_colors;
}

// Decompress an H-mode block 
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function decompressBlockTHUMB58H(block_part1: uint, block_part2: uint, img: Uint8Array, width: int, height: int, startx: int, starty: int): void
{
    let dist: uint8 = (GETBITSHI(block_part1, 2, 33) << 1);
    const col0: uint = GETBITSHI(block_part1, 12, 57);
    const col1: uint = GETBITSHI(block_part1, 12, 45);
    if (col0 >= col1) {
        dist |= 1;
    }

    // First decode left part of block.
    const colorsRGB444 = Array<Uint8Array>(2).fill(new Uint8Array(RGB));
    colorsRGB444[0][R] = GETBITSHI(block_part1, 4, 57);
    colorsRGB444[0][G] = GETBITSHI(block_part1, 4, 53);
    colorsRGB444[0][B] = GETBITSHI(block_part1, 4, 49);
    colorsRGB444[1][R] = GETBITSHI(block_part1, 4, 45);
    colorsRGB444[1][G] = GETBITSHI(block_part1, 4, 41);
    colorsRGB444[1][B] = GETBITSHI(block_part1, 4, 37);

    // Extend the two colors to RGB888
    const colors = decompressColor(R_BITS58H, G_BITS58H, B_BITS58H, colorsRGB444);
    const paint_colors = calculatePaintColors58H(dist, colors);
    
    // Choose one of the four paint colors for each texel
    const block_mask = Array<Uint8Array>(BLOCK_WIDTH).fill(new Uint8Array(BLOCK_HEIGHT));
    for (let x: uint8 = 0; x < BLOCK_WIDTH; x++) {
        for (let y: uint8 = 0; y < BLOCK_HEIGHT; y++) {
            block_mask[x][y]  = GETBITSLO(block_part2, 1, (y+x*4) + 16) << 1;
            block_mask[x][y] |= GETBITSLO(block_part2, 1, (y+x*4));

            SET_COLOR(R, img, width, startx+x, starty+y, paint_colors[block_mask[x][y]][R]);
            SET_COLOR(G, img, width, startx+x, starty+y, paint_colors[block_mask[x][y]][G]);
            SET_COLOR(B, img, width, startx+x, starty+y, paint_colors[block_mask[x][y]][B]);
        }
    }
}

// Decompress the planar mode.
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function decompressBlockPlanar57(compressed57_1: uint, compressed57_2: uint, img: Uint8Array, width: int, height: int, startx: int, starty: int): void
{
    const colorO = new Uint8Array(RGB);
    const colorH = new Uint8Array(RGB);
    const colorV = new Uint8Array(RGB);

    colorO[R] = GETBITSHI(compressed57_1, 6, 63);
    colorO[G] = GETBITSHI(compressed57_1, 7, 57);
    colorO[B] = GETBITSHI(compressed57_1, 6, 50);

    colorH[R] = GETBITSHI(compressed57_1, 6, 44);
    colorH[G] = GETBITSHI(compressed57_1, 7, 38);
    colorH[B] = GETBITSLO(compressed57_2, 6, 31);

    colorV[R] = GETBITSLO(compressed57_2, 6, 25);
    colorV[G] = GETBITSLO(compressed57_2, 7, 19);
    colorV[B] = GETBITSLO(compressed57_2, 6, 12);

    colorO[R] = (colorO[R] << 2) | (colorO[R] >> 4);
    colorO[G] = (colorO[G] << 1) | (colorO[G] >> 6);
    colorO[B] = (colorO[B] << 2) | (colorO[B] >> 4);

    colorH[R] = (colorH[R] << 2) | (colorH[R] >> 4);
    colorH[G] = (colorH[G] << 1) | (colorH[G] >> 6);
    colorH[B] = (colorH[B] << 2) | (colorH[B] >> 4);

    colorV[R] = (colorV[R] << 2) | (colorV[R] >> 4);
    colorV[G] = (colorV[G] << 1) | (colorV[G] >> 6);
    colorV[B] = (colorV[B] << 2) | (colorV[B] >> 4);

    for (let x: int = 0; x < BLOCK_WIDTH; x++) {
        for (let y: int = 0; y < BLOCK_HEIGHT; y++) {
            SET_COLOR(R, img, width, startx+x, starty+y, (x*(colorH[R]-colorO[R]) + y*(colorV[R]-colorO[R]) + 4*colorO[R] + 2) >> 2);
            SET_COLOR(G, img, width, startx+x, starty+y, (x*(colorH[G]-colorO[G]) + y*(colorV[G]-colorO[G]) + 4*colorO[G] + 2) >> 2);
            SET_COLOR(B, img, width, startx+x, starty+y, (x*(colorH[B]-colorO[B]) + y*(colorV[B]-colorO[B]) + 4*colorO[B] + 2) >> 2);
        }
    }
}

// Decompress an ETC1 block (or ETC2 using individual or differential mode).
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function decompressBlockDiffFlip(block_part1: uint, block_part2: uint, img: Uint8Array, width: int, height: int, startx: int, starty: int): void
{
    const diffbit: boolean = (GETBITSHI(block_part1, 1, 33) !== 0);
    const flipbit: boolean = (GETBITSHI(block_part1, 1, 32) !== 0);

    if (!diffbit)
    {
        // We have diffbit = 0.

        // First decode left part of block.
        const avg_color = new Uint8Array(RGB);
        avg_color[R] = GETBITSHI(block_part1, 4, 63);
        avg_color[G] = GETBITSHI(block_part1, 4, 55);
        avg_color[B] = GETBITSHI(block_part1, 4, 47);

        // Here, we should really multiply by 17 instead of 16. This can
        // be done by just copying the four lower bits to the upper ones
        // while keeping the lower bits.
        avg_color[R] |= (avg_color[R] << 4);
        avg_color[G] |= (avg_color[G] << 4);
        avg_color[B] |= (avg_color[B] << 4);

        let table: int = (GETBITSHI(block_part1, 3, 39) << 1);
        let pixel_indices_MSB: uint = GETBITSLO(block_part2, 16, 31);
        let pixel_indices_LSB: uint = GETBITSLO(block_part2, 16, 15);

        if (!flipbit)
        {
            // We should not flip
            let shift: int = 0;
            for (let x: int = startx; x < startx+2; x++) {
                for (let y: int = starty; y < starty+4; y++) {
                    let index: int = ((pixel_indices_MSB >> shift) & 1) << 1;
                    index |= ((pixel_indices_LSB >> shift) & 1);
                    shift++;
                    index = unscramble[index];

                    SET_COLOR(R, img, width, x, y, avg_color[R] + compressParams[table][index]);
                    SET_COLOR(G, img, width, x, y, avg_color[G] + compressParams[table][index]);
                    SET_COLOR(B, img, width, x, y, avg_color[B] + compressParams[table][index]);
                }
            }
        }
        else
        {
            // We should flip
            let shift: int = 0;
            for (let x: int = startx; x < startx+4; x++) {
                for (let y: int = starty; y < starty+2; y++) {
                    let index: int = ((pixel_indices_MSB >> shift) & 1) << 1;
                    index |= ((pixel_indices_LSB >> shift) & 1);
                    shift++;
                    index = unscramble[index];

                    SET_COLOR(R, img, width, x, y, avg_color[R] + compressParams[table][index]);
                    SET_COLOR(G, img, width, x, y, avg_color[G] + compressParams[table][index]);
                    SET_COLOR(B, img, width, x, y, avg_color[B] + compressParams[table][index]);
                }
                shift += 2;
            }
        }

        // Now decode other part of block. 
        avg_color[R] = GETBITSHI(block_part1, 4, 59);
        avg_color[G] = GETBITSHI(block_part1, 4, 51);
        avg_color[B] = GETBITSHI(block_part1, 4, 43);

        // Here, we should really multiply by 17 instead of 16. This can
        // be done by just copying the four lower bits to the upper ones
        // while keeping the lower bits.
        avg_color[R] |= (avg_color[R] << 4);
        avg_color[G] |= (avg_color[G] << 4);
        avg_color[B] |= (avg_color[B] << 4);

        table = (GETBITSHI(block_part1, 3, 36) << 1);
        pixel_indices_MSB = GETBITSLO(block_part2, 16, 31);
        pixel_indices_LSB = GETBITSLO(block_part2, 16, 15);

        if (!flipbit)
        {
            // We should not flip
            let shift: int = 8;
            for (let x: int = startx+2; x < startx+4; x++) {
                for (let y: int = starty; y < starty+4; y++) {
                    let index: int = ((pixel_indices_MSB >> shift) & 1) << 1;
                    index |= ((pixel_indices_LSB >> shift) & 1);
                    shift++;
                    index = unscramble[index];

                    SET_COLOR(R, img, width, x, y, avg_color[R] + compressParams[table][index]);
                    SET_COLOR(G, img, width, x, y, avg_color[G] + compressParams[table][index]);
                    SET_COLOR(B, img, width, x, y, avg_color[B] + compressParams[table][index]);
                }
            }
        }
        else
        {
            // We should flip
            let shift: int = 2;
            for (let x: int = startx; x < startx+4; x++) {
                for (let y: int = starty+2; y < starty+4; y++) {
                    let index: int = ((pixel_indices_MSB >> shift) & 1) << 1;
                    index |= ((pixel_indices_LSB >> shift) & 1);
                    shift++;
                    index = unscramble[index];

                    SET_COLOR(R, img, width, x, y, avg_color[R] + compressParams[table][index]);
                    SET_COLOR(G, img, width, x, y, avg_color[G] + compressParams[table][index]);
                    SET_COLOR(B, img, width, x, y, avg_color[B] + compressParams[table][index]);
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
        const enc_color1 = new Uint8Array(RGB);
        enc_color1[R] = GETBITSHI(block_part1, 5, 63);
        enc_color1[G] = GETBITSHI(block_part1, 5, 55);
        enc_color1[B] = GETBITSHI(block_part1, 5, 47);

        // Expand from 5 to 8 bits
        const avg_color = new Uint8Array(RGB);
        avg_color[R] = (enc_color1[R] << 3) | (enc_color1[R] >> 2);
        avg_color[G] = (enc_color1[G] << 3) | (enc_color1[G] >> 2);
        avg_color[B] = (enc_color1[B] << 3) | (enc_color1[B] >> 2);

        let table: int = (GETBITSHI(block_part1, 3, 39) << 1);
        let pixel_indices_MSB: uint = GETBITSLO(block_part2, 16, 31);
        let pixel_indices_LSB: uint = GETBITSLO(block_part2, 16, 15);

        if (!flipbit)
        {
            // We should not flip
            let shift: int = 0;
            for (let x: int = startx; x < startx+2; x++) {
                for (let y: int = starty; y < starty+4; y++) {
                    let index: int = ((pixel_indices_MSB >> shift) & 1) << 1;
                    index |= ((pixel_indices_LSB >> shift) & 1);
                    shift++;
                    index = unscramble[index];

                    SET_COLOR(R, img, width, x, y, avg_color[R] + compressParams[table][index]);
                    SET_COLOR(G, img, width, x, y, avg_color[G] + compressParams[table][index]);
                    SET_COLOR(B, img, width, x, y, avg_color[B] + compressParams[table][index]);
                }
            }
        }
        else
        {
            // We should flip
            let shift: int = 0;
            for (let x: int = startx; x < startx+4; x++) {
                for (let y: int = starty; y < starty+2; y++) {
                    let index: int = ((pixel_indices_MSB >> shift) & 1) << 1;
                    index |= ((pixel_indices_LSB >> shift) & 1);
                    shift++;
                    index = unscramble[index];

                    SET_COLOR(R, img, width, x, y, avg_color[R] + compressParams[table][index]);
                    SET_COLOR(G, img, width, x, y, avg_color[G] + compressParams[table][index]);
                    SET_COLOR(B, img, width, x, y, avg_color[B] + compressParams[table][index]);
                }
                shift += 2;
            }
        }

        // Now decode right part of block. 
        const diff = new Int8Array(RGB);
        diff[R] = GETBITSHI(block_part1, 3, 58);
        diff[G] = GETBITSHI(block_part1, 3, 50);
        diff[B] = GETBITSHI(block_part1, 3, 42);

        // Extend sign bit to entire byte. 
        diff[R] = (diff[R] << 5);
        diff[G] = (diff[G] << 5);
        diff[B] = (diff[B] << 5);
        diff[R] = diff[R] >> 5;
        diff[G] = diff[G] >> 5;
        diff[B] = diff[B] >> 5;

        //  Calculale second color
        const enc_color2 = new Uint8Array(RGB);
        enc_color2[R] = enc_color1[R] + diff[R];
        enc_color2[G] = enc_color1[G] + diff[G];
        enc_color2[B] = enc_color1[B] + diff[B];

        // Expand from 5 to 8 bits
        avg_color[R] = (enc_color2[R] <<3) | (enc_color2[R] >> 2);
        avg_color[G] = (enc_color2[G] <<3) | (enc_color2[G] >> 2);
        avg_color[B] = (enc_color2[B] <<3) | (enc_color2[B] >> 2);

        table = (GETBITSHI(block_part1, 3, 36) << 1);
        pixel_indices_MSB = GETBITSLO(block_part2, 16, 31);
        pixel_indices_LSB = GETBITSLO(block_part2, 16, 15);

        if (!flipbit)
        {
            // We should not flip
            let shift: int = 8;
            for (let x: int = startx+2; x < startx+4; x++) {
                for (let y: int = starty; y < starty+4; y++) {
                    let index: int = ((pixel_indices_MSB >> shift) & 1) << 1;
                    index |= ((pixel_indices_LSB >> shift) & 1);
                    shift++;
                    index = unscramble[index];

                    SET_COLOR(R, img, width, x, y, avg_color[R] + compressParams[table][index]);
                    SET_COLOR(G, img, width, x, y, avg_color[G] + compressParams[table][index]);
                    SET_COLOR(B, img, width, x, y, avg_color[B] + compressParams[table][index]);
                }
            }
        }
        else
        {
            // We should flip
            let shift: int = 2;
            for (let x: int = startx; x < startx+4; x++) {
                for (let y: int = starty+2; y < starty+4; y++) {
                    let index: int = ((pixel_indices_MSB >> shift) & 1) << 1;
                    index |= ((pixel_indices_LSB >> shift) & 1);
                    shift++;
                    index = unscramble[index];

                    SET_COLOR(R, img, width, x, y, avg_color[R] + compressParams[table][index]);
                    SET_COLOR(G, img, width, x, y, avg_color[G] + compressParams[table][index]);
                    SET_COLOR(B, img, width, x, y, avg_color[B] + compressParams[table][index]);
                }
                shift += 2;
            }
        }
    }
}

// Decompress an ETC2 RGB block
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function decompressBlockETC2(block_part1: uint, block_part2: uint, img: Uint8Array, width: int, height: int, startx: int, starty: int): void
{
    const diffbit: boolean = (GETBITSHI(block_part1, 1, 33) !== 0);

    if (diffbit)
    {
        // We have diffbit = 1;

        // Base color
        const color1 = new Int8Array(RGB);
        color1[R] = GETBITSHI(block_part1, 5, 63);
        color1[G] = GETBITSHI(block_part1, 5, 55);
        color1[B] = GETBITSHI(block_part1, 5, 47);

        // Diff color
        const diff = new Int8Array(RGB);
        diff[R] = GETBITSHI(block_part1, 3, 58);
        diff[G] = GETBITSHI(block_part1, 3, 50);
        diff[B] = GETBITSHI(block_part1, 3, 42);

        // Extend sign bit to entire byte. 
        diff[R] = (diff[R] << 5);
        diff[G] = (diff[G] << 5);
        diff[B] = (diff[B] << 5);
        diff[R] = diff[R] >> 5;
        diff[G] = diff[G] >> 5;
        diff[B] = diff[B] >> 5;

        const red: int8   = color1[R] + diff[R];
        const green: int8 = color1[G] + diff[G];
        const blue: int8  = color1[B] + diff[B];

        if (red < 0 || red > 31) {
            const [block59_part1, block59_part2] = unstuff59bits(block_part1, block_part2);
            decompressBlockTHUMB59T(block59_part1, block59_part2, img, width, height, startx, starty);
        } else if (green < 0 || green > 31) {
            const [block58_part1, block58_part2] = unstuff58bits(block_part1, block_part2);
            decompressBlockTHUMB58H(block58_part1, block58_part2, img, width, height, startx, starty);
        } else if (blue < 0 || blue > 31) {
            const [block57_part1, block57_part2] = unstuff57bits(block_part1, block_part2);
            decompressBlockPlanar57(block57_part1, block57_part2, img, width, height, startx, starty);
        } else {
            decompressBlockDiffFlip(block_part1, block_part2, img, width, height, startx, starty);
        }
    }
    else
    {
        // We have diffbit = 0;
        decompressBlockDiffFlip(block_part1, block_part2, img, width, height, startx, starty);
    }
}

// Decompress an ETC2 block with punchthrough alpha
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function decompressBlockDifferentialWithAlpha(block_part1: uint, block_part2: uint, img: Uint8Array, alphaimg: Uint8Array, width: int, height: int, startx: int, starty: int): void
{
    //the diffbit now encodes whether or not the entire alpha channel is 255.
    const diffbit: boolean = (GETBITSHI(block_part1, 1, 33) !== 0);
    const flipbit: boolean = (GETBITSHI(block_part1, 1, 32) !== 0);

    // First decode left part of block.
    const enc_color1 = new Uint8Array(RGB);
    enc_color1[R] = GETBITSHI(block_part1, 5, 63);
    enc_color1[G] = GETBITSHI(block_part1, 5, 55);
    enc_color1[B] = GETBITSHI(block_part1, 5, 47);

    // Expand from 5 to 8 bits
    const avg_color = new Uint8Array(RGB);
    avg_color[R] = (enc_color1[R] << 3) | (enc_color1[R] >> 2);
    avg_color[G] = (enc_color1[G] << 3) | (enc_color1[G] >> 2);
    avg_color[B] = (enc_color1[B] << 3) | (enc_color1[B] >> 2);

    let table: int = (GETBITSHI(block_part1, 3, 39) << 1);
    let pixel_indices_MSB: uint = GETBITSLO(block_part2, 16, 31);
    let pixel_indices_LSB: uint = GETBITSLO(block_part2, 16, 15);

    if (!flipbit)
    {
        // We should not flip
        let shift: int = 0;
        for (let x: int = startx; x < startx+2; x++) {
            for (let y: int = starty; y < starty+4; y++) {
                let index: int = ((pixel_indices_MSB >> shift) & 1) << 1;
                index |= ((pixel_indices_LSB >> shift) & 1);
                shift++;
                index = unscramble[index];

                let mod: int = compressParams[table][index];
                if (!diffbit && (index === 1 || index === 2)) {
                    mod = 0;
                }
                
                if (!diffbit && index === 1) {
                    SET_COLOR(R, img, width, x, y, 0);
                    SET_COLOR(G, img, width, x, y, 0);
                    SET_COLOR(B, img, width, x, y, 0);
                    SET_ALPHA(alphaimg, x, y, width, 0);
                } else {
                    SET_COLOR(R, img, width, x, y, avg_color[R] + mod);
                    SET_COLOR(G, img, width, x, y, avg_color[G] + mod);
                    SET_COLOR(B, img, width, x, y, avg_color[B] + mod);
                    SET_ALPHA(alphaimg, x, y, width, 255);
                }
            }
        }
    }
    else
    {
        // We should flip
        let shift: int = 0;
        for (let x: int = startx; x < startx+4; x++) {
            for (let y: int = starty; y < starty+2; y++) {
                let index: int = ((pixel_indices_MSB >> shift) & 1) << 1;
                index |= ((pixel_indices_LSB >> shift) & 1);
                shift++;
                index = unscramble[index];

                let mod: int = compressParams[table][index];
                if (!diffbit && (index === 1 || index === 2)) {
                    mod = 0;
                }

                if (!diffbit && index === 1) {
                    SET_COLOR(R, img, width, x, y, 0);
                    SET_COLOR(G, img, width, x, y, 0);
                    SET_COLOR(B, img, width, x, y, 0);
                    SET_ALPHA(alphaimg, x, y, width, 0);
                } else {
                    SET_COLOR(R, img, width, x, y, avg_color[R] + mod);
                    SET_COLOR(G, img, width, x, y, avg_color[G] + mod);
                    SET_COLOR(B, img, width, x, y, avg_color[B] + mod);
                    SET_ALPHA(alphaimg, x, y, width, 255);
                }
            }
            shift += 2;
        }
    }

    // Now decode right part of block. 
    const diff = new Uint8Array(RGB);
    diff[R] = GETBITSHI(block_part1, 3, 58);
    diff[G] = GETBITSHI(block_part1, 3, 50);
    diff[B] = GETBITSHI(block_part1, 3, 42);

    // Extend sign bit to entire byte. 
    diff[R] = (diff[R] << 5);
    diff[G] = (diff[G] << 5);
    diff[B] = (diff[B] << 5);
    diff[R] = diff[R] >> 5;
    diff[G] = diff[G] >> 5;
    diff[B] = diff[B] >> 5;

    // Calculate second color
    const enc_color2 = new Uint8Array(RGB);
    enc_color2[R] = enc_color1[R] + diff[R];
    enc_color2[G] = enc_color1[G] + diff[G];
    enc_color2[B] = enc_color1[B] + diff[B];

    // Expand from 5 to 8 bits
    avg_color[R] = (enc_color2[R] << 3) | (enc_color2[R] >> 2);
    avg_color[G] = (enc_color2[G] << 3) | (enc_color2[G] >> 2);
    avg_color[B] = (enc_color2[B] << 3) | (enc_color2[B] >> 2);

    table = (GETBITSHI(block_part1, 3, 36) << 1);
    pixel_indices_MSB = GETBITSLO(block_part2, 16, 31);
    pixel_indices_LSB = GETBITSLO(block_part2, 16, 15);

    if (!flipbit)
    {
        // We should not flip
        let shift: int = 8;
        for (let x: int = startx+2; x < startx+4; x++) {
            for (let y: int = starty; y < starty+4; y++) {
                let index: int = ((pixel_indices_MSB >> shift) & 1) << 1;
                index |= ((pixel_indices_LSB >> shift) & 1);
                shift++;
                index = unscramble[index];

                let mod: int = compressParams[table][index];
                if (!diffbit && (index === 1 || index === 2)) {
                    mod = 0;
                }
                
                if (!diffbit && index === 1) {
                    SET_COLOR(R, img, width, x, y, 0);
                    SET_COLOR(G, img, width, x, y, 0);
                    SET_COLOR(B, img, width, x, y, 0);
                    SET_ALPHA(alphaimg, x, y, width, 0);
                } else {
                    SET_COLOR(R, img, width, x, y, avg_color[R] + mod);
                    SET_COLOR(G, img, width, x, y, avg_color[G] + mod);
                    SET_COLOR(B, img, width, x, y, avg_color[B] + mod);
                    SET_ALPHA(alphaimg, x, y, width, 255);
                }
            }
        }
    }
    else
    {
        // We should flip
        let shift: int = 2;
        for (let x: int = startx; x < startx+4; x++) {
            for (let y: int = starty+2; y < starty+4; y++) {
                let index: int = ((pixel_indices_MSB >> shift) & 1) << 1;
                index |= ((pixel_indices_LSB >> shift) & 1);
                shift++;
                index = unscramble[index];

                let mod: int = compressParams[table][index];
                if (!diffbit && (index === 1 || index === 2)) {
                    mod = 0;
                }
                
                if (!diffbit && index === 1) {
                    SET_COLOR(R, img, width, x, y, 0);
                    SET_COLOR(G, img, width, x, y, 0);
                    SET_COLOR(B, img, width, x, y, 0);
                    SET_ALPHA(alphaimg, x, y, width, 0);
                } else {
                    SET_COLOR(R, img, width, x, y, avg_color[R] + mod);
                    SET_COLOR(G, img, width, x, y, avg_color[G] + mod);
                    SET_COLOR(B, img, width, x, y, avg_color[B] + mod);
                    SET_ALPHA(alphaimg, x, y, width, 255);
                }
            }
            shift += 2;
        }
    }
}

// similar to regular decompression, but alpha channel is set to 0 if pixel index is 2, otherwise 255.
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function decompressBlockTHUMB59TAlpha(block_part1: uint, block_part2: uint, img: Uint8Array, alphaimg: Uint8Array, width: int, height: int, startx: int, starty: int): void
{
    const dist: uint8 = GETBITSHI(block_part1, TABLE_BITS_59T, 34);

    // First decode left part of block.
    const colorsRGB444 = Array<Uint8Array>(2).fill(new Uint8Array(RGB));
    colorsRGB444[0][R] = GETBITSHI(block_part1, 4, 58);
    colorsRGB444[0][G] = GETBITSHI(block_part1, 4, 54);
    colorsRGB444[0][B] = GETBITSHI(block_part1, 4, 50);
    colorsRGB444[1][R] = GETBITSHI(block_part1, 4, 46);
    colorsRGB444[1][G] = GETBITSHI(block_part1, 4, 42);
    colorsRGB444[1][B] = GETBITSHI(block_part1, 4, 38);

    // Extend the two colors to RGB888	
    const colors = decompressColor(R_BITS59T, G_BITS59T, B_BITS59T, colorsRGB444);
    const paint_colors = calculatePaintColors59T(dist, colors);

    // Choose one of the four paint colors for each texel
    const block_mask = Array<Uint8Array>(BLOCK_WIDTH).fill(new Uint8Array(BLOCK_HEIGHT));
    for (let x: uint8 = 0; x < BLOCK_WIDTH; x++) {
        for (let y: uint8 = 0; y < BLOCK_HEIGHT; y++) {
            block_mask[x][y]  = GETBITSLO(block_part2, 1, (y+x*4) + 16) << 1;
            block_mask[x][y] |= GETBITSLO(block_part2, 1, (y+x*4));

            if (block_mask[x][y] === 2) {
                SET_COLOR(R, img, width, startx+x, starty+y, 0);
                SET_COLOR(G, img, width, startx+x, starty+y, 0);
                SET_COLOR(B, img, width, startx+x, starty+y, 0);
                SET_ALPHA(alphaimg, startx+x, starty+y, width, 0);
            } else {
                SET_COLOR(R, img, width, startx+x, starty+y, paint_colors[block_mask[x][y]][R]);
                SET_COLOR(G, img, width, startx+x, starty+y, paint_colors[block_mask[x][y]][G]);
                SET_COLOR(B, img, width, startx+x, starty+y, paint_colors[block_mask[x][y]][B]);
                SET_ALPHA(alphaimg, startx+x, starty+y, width, 255);
            }
        }
    }
}

// Decompress an H-mode block with alpha
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function decompressBlockTHUMB58HAlpha(block_part1: uint, block_part2: uint, img: Uint8Array, alphaimg: Uint8Array, width: int, height: int, startx: int, starty: int): void
{
    let dist: uint8 = (GETBITSHI(block_part1, 2, 33) << 1);
    const col0: uint = GETBITSHI(block_part1, 12, 57);
    const col1: uint = GETBITSHI(block_part1, 12, 45);
    if (col0 >= col1) {
        dist |= 1;
    }

    // First decode left part of block.
    const colorsRGB444 = Array<Uint8Array>(2).fill(new Uint8Array(RGB));
    colorsRGB444[0][R] = GETBITSHI(block_part1, 4, 57);
    colorsRGB444[0][G] = GETBITSHI(block_part1, 4, 53);
    colorsRGB444[0][B] = GETBITSHI(block_part1, 4, 49);
    colorsRGB444[1][R] = GETBITSHI(block_part1, 4, 45);
    colorsRGB444[1][G] = GETBITSHI(block_part1, 4, 41);
    colorsRGB444[1][B] = GETBITSHI(block_part1, 4, 37);

    // Extend the two colors to RGB888
    const colors = decompressColor(R_BITS58H, G_BITS58H, B_BITS58H, colorsRGB444);
    const paint_colors = calculatePaintColors58H(dist, colors);

    // Choose one of the four paint colors for each texel
    const block_mask = Array<Uint8Array>(BLOCK_WIDTH).fill(new Uint8Array(BLOCK_HEIGHT));
    for (let x: uint8 = 0; x < BLOCK_WIDTH; x++) {
        for (let y: uint8 = 0; y < BLOCK_HEIGHT; y++) {
            block_mask[x][y]  = GETBITSLO(block_part2, 1, (y+x*4) + 16) << 1;
            block_mask[x][y] |= GETBITSLO(block_part2, 1, (y+x*4));

            if (block_mask[x][y] === 2) {
                SET_COLOR(R, img, width, startx+x, starty+y, 0);
                SET_COLOR(G, img, width, startx+x, starty+y, 0);
                SET_COLOR(B, img, width, startx+x, starty+y, 0);
                SET_ALPHA(alphaimg, startx+x, starty+y, width, 0);
            } else {
                SET_COLOR(R, img, width, startx+x, starty+y, paint_colors[block_mask[x][y]][R]);
                SET_COLOR(G, img, width, startx+x, starty+y, paint_colors[block_mask[x][y]][G]);
                SET_COLOR(B, img, width, startx+x, starty+y, paint_colors[block_mask[x][y]][B]);
                SET_ALPHA(alphaimg, startx+x, starty+y, width, 255);
            }
        }
    }
}

// Decompression function for ETC2_RGBA1 format.
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function decompressBlockETC21BitAlpha(block_part1: uint, block_part2: uint, img: Uint8Array, alphaimg: Uint8Array, width: int, height: int, startx: int, starty: int): void
{
    const diffbit: boolean = (GETBITSHI(block_part1, 1, 33) !== 0);

    if (diffbit)
    {
        // We have diffbit = 1, meaning no transparent pixels. regular decompression.

        // Base color
        const color1 = new Int8Array(RGB);
        color1[R] = GETBITSHI(block_part1, 5, 63);
        color1[G] = GETBITSHI(block_part1, 5, 55);
        color1[B] = GETBITSHI(block_part1, 5, 47);

        // Diff color
        const diff = new Int8Array(RGB);
        diff[R] = GETBITSHI(block_part1, 3, 58);
        diff[G] = GETBITSHI(block_part1, 3, 50);
        diff[B] = GETBITSHI(block_part1, 3, 42);

        // Extend sign bit to entire byte. 
        diff[R] = (diff[R] << 5);
        diff[G] = (diff[G] << 5);
        diff[B] = (diff[B] << 5);
        diff[R] = diff[R] >> 5;
        diff[G] = diff[G] >> 5;
        diff[B] = diff[B] >> 5;

        const red: int8   = color1[R] + diff[R];
        const green: int8 = color1[G] + diff[G];
        const blue: int8  = color1[B] + diff[B];

        if (red < 0 || red > 31) {
            const [block59_part1, block59_part2] = unstuff59bits(block_part1, block_part2);
            decompressBlockTHUMB59T(block59_part1, block59_part2, img, width, height, startx, starty);
        } else if (green < 0 || green > 31) {
            const [block58_part1, block58_part2] = unstuff58bits(block_part1, block_part2);
            decompressBlockTHUMB58H(block58_part1, block58_part2, img, width, height, startx, starty);
        } else if (blue < 0 || blue > 31) {
            const [block57_part1, block57_part2] = unstuff57bits(block_part1, block_part2);
            decompressBlockPlanar57(block57_part1, block57_part2, img, width, height, startx, starty);
        } else {
            decompressBlockDifferentialWithAlpha(block_part1, block_part2, img, alphaimg, width, height, startx, starty);
        }

        for (let x: int = startx; x < startx+4; x++) {
            for (let y: int = starty; y < starty+4; y++) {
                SET_ALPHA(alphaimg, x, y, width, 255);
            }
        }
    }
    else
    {
        // We have diffbit = 0, transparent pixels. Only T-, H- or regular diff-mode possible.
        
        // Base color
        const color1 = new Int8Array(RGB);
        color1[R] = GETBITSHI(block_part1, 5, 63);
        color1[G] = GETBITSHI(block_part1, 5, 55);
        color1[B] = GETBITSHI(block_part1, 5, 47);

        // Diff color
        const diff = new Int8Array(RGB);
        diff[R] = GETBITSHI(block_part1, 3, 58);
        diff[G] = GETBITSHI(block_part1, 3, 50);
        diff[B] = GETBITSHI(block_part1, 3, 42);

        // Extend sign bit to entire byte. 
        diff[R] = (diff[R] << 5);
        diff[G] = (diff[G] << 5);
        diff[B] = (diff[B] << 5);
        diff[R] = diff[R] >> 5;
        diff[G] = diff[G] >> 5;
        diff[B] = diff[B] >> 5;

        const red: int8   = color1[R] + diff[R];
        const green: int8 = color1[G] + diff[G];
        const blue: int8  = color1[B] + diff[B];

        if (red < 0 || red > 31) {
            const [block59_part1, block59_part2] = unstuff59bits(block_part1, block_part2);
            decompressBlockTHUMB59TAlpha(block59_part1, block59_part2, img, alphaimg, width, height, startx, starty);
        } else if (green < 0 || green > 31) {
            const [block58_part1, block58_part2] = unstuff58bits(block_part1, block_part2);
            decompressBlockTHUMB58HAlpha(block58_part1, block58_part2, img, alphaimg, width, height, startx, starty);
        } else if (blue < 0 || blue > 31) {
            const [block57_part1, block57_part2] = unstuff57bits(block_part1, block_part2);
            decompressBlockPlanar57(block57_part1, block57_part2, img, width, height, startx, starty);
            for (let x: int = startx; x < startx+4; x++) {
                for (let y: int = starty; y < starty+4; y++) {
                    SET_ALPHA(alphaimg, x, y, width, 255);
                }
            }
        } else {
            decompressBlockDifferentialWithAlpha(block_part1, block_part2, img,alphaimg, width, height, startx, starty);
        }
    }
}

//
//	Utility functions used for alpha compression
//

// bit number frompos is extracted from input, and moved to bit number topos in the return value.
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function getbit(input: uint8, frompos: int, topos: int): uint8
{
    if (frompos > topos) {
        return ((1 << frompos) & input) >> (frompos - topos);
    } else {
        return ((1 << frompos) & input) << (topos - frompos);
    }
}

// Decodes tha alpha component in a block coded with GL_COMPRESSED_RGBA8_ETC2_EAC.
// Note that this decoding is slightly different from that of GL_COMPRESSED_R11_EAC.
// However, a hardware decoder can share gates between the two formats as explained
// in the specification under GL_COMPRESSED_R11_EAC.
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function decompressBlockAlpha(data: Uint8Array, alphaimg: Uint8Array, width: int, height: int, startx: int, starty: int): void
{
    const alpha: int = data[0];
    const table: int = data[1];
    
    let bit: int = 0;
    let byte: int = 2;
    
    //extract an alpha value for each pixel.
    for (let x: int = 0; x < BLOCK_WIDTH; x++) {
        for (let y: int = 0; y < BLOCK_HEIGHT; y++) {
            //Extract table index
            let index: int = 0;
            for (let bitpos: int = 0; bitpos < 3; bitpos++) {
                index |= getbit(data[byte], 7-bit, 2-bitpos);
                bit++;
                if (bit > 7) {
                    bit = 0;
                    byte++;
                }
            }

            SET_ALPHA(alphaimg, startx+x, starty+y, width, alpha + alphaTable[table][index]);
        }
    }
}

// Does decompression and then immediately converts from 11 bit signed to a 16-bit format 
// Calculates the 11 bit value represented by base, table, mul and index, and extends it to 16 bits.
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function get16bits11bits(base: int, table: int, mul: int, index: int): uint16
{
    const elevenbase: int = base * 8 + 4;

    //i want the positive value here
    let tabVal: int = -alphaBase[table][3-index%4] - 1;
    //and the sign, please
    const sign: boolean = (1-(index/4) !== 0);
    if (sign) {
        tabVal = tabVal + 1;
    }
    let elevenTabVal: int = tabVal * 8;
    if (mul !== 0) {
        elevenTabVal *= mul;
    } else {
        elevenTabVal /= 8;
    }
    if (sign) {
        elevenTabVal = -elevenTabVal;
    }

    //calculate sum
    let elevenbits: int = elevenbase + elevenTabVal;

    //clamp..
    if (elevenbits >= 256 * 8) {
        elevenbits = 256 * 8 - 1;
    } else if (elevenbits < 0) {
        elevenbits = 0;
    }
    //elevenbits now contains the 11 bit alpha value as defined in the spec.

    //extend to 16 bits before returning, since we don't have any good 11-bit file formats.
    const sixteenbits: uint16 = (elevenbits<<5) + (elevenbits>>6);
    return sixteenbits;
}

// Decompresses a block using one of the GL_COMPRESSED_R11_EAC or GL_COMPRESSED_SIGNED_R11_EAC-formats
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function decompressBlockAlpha16bit(data: Uint8Array, img: Uint8Array, width: int, height: int, startx: int, starty: int): void
{
    let alpha: uint8 = data[0];
    const table: uint8 = data[1];

    let bit: int = 0;
    let byte: int = 2;

    //extract an alpha value for each pixel.
    for (let x: int = 0; x < BLOCK_WIDTH; x++) {
        for (let y: int = 0; y < BLOCK_HEIGHT; y++) {
            //Extract table index
            let index: int = 0;
            for (let bitpos: int = 0; bitpos < 3; bitpos++) {
                index |= getbit(data[byte], 7-bit, 2-bitpos);
                bit++;
                if (bit > 7) {
                    bit = 0;
                    byte++;
                }
            }

            const windex: int = 2 * ARRAY_XY(width, startx+x, starty+y);

            const memView = new DataView(img.buffer, img.byteOffset, img.byteLength);
            memView.setUint16(windex, get16bits11bits(alpha, table % 16, table / 16, index), true);
        }
    }			
}
