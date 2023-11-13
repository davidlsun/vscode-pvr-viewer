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
type int16 = number;
type uint16 = number;
type int = number;
type uint = number;

// Macros to help with bit extraction/insertion
const SHIFTLO = (size: uint, start: uint): uint => (start      - size + 1);
const SHIFTHI = (size: uint, start: uint): uint => (start - 32 - size + 1);
const MASKLO = (size: uint, start: uint): uint => (((2 << (size - 1)) - 1) << SHIFTLO(size, start));
const MASKHI = (size: uint, start: uint): uint => (((1 << (size    )) - 1) << SHIFTHI(size, start));
const GETBITSLO = (src: uint, size: uint, start: uint): uint => ((src >> (start      - size + 1)) & ((1 << size) - 1));
const GETBITSHI = (src: uint, size: uint, start: uint): uint => ((src >> (start - 32 - size + 1)) & ((1 << size) - 1));
const PUTBITSLO = (dest: uint, data: uint, size: uint, start: uint): uint => ((dest & ~MASKLO(size, start)) | ((data << SHIFTLO(size, start)) & MASKLO(size, start)));
const PUTBITSHI = (dest: uint, data: uint, size: uint, start: uint): uint => ((dest & ~MASKHI(size, start)) | ((data << SHIFTHI(size, start)) & MASKHI(size, start)));

// Thumb macros and definitions
export const BLOCK_SIZE = 4;
const TABLE_BITS_59T = 3;
const TABLE_BITS_58H = 3;

// We will decode the alpha data to a separate memory area. 
const R = 0;
const G = 1;
const B = 2;

// Helper Macros
const SATURATE = (x: int): uint8 => ((x < 0) ? 0 : ((x > 255) ? 255 : x));
const ARRAY_XY = (width:int, x: int, y: int): int => (y * width + x);
const SET_COLOR = (channel: int, img: Uint8Array, width: int, x: int, y: int, value: uint8): void => { img[ARRAY_XY(width, x, y) * 4 + channel] = SATURATE(value); };
const SET_ALPHA = (alphaimg: Uint8Array, width: int, x: int, y: int, value: uint8): void => { alphaimg[ARRAY_XY(width, x, y)] = SATURATE(value); };

// Global variables
const formatSigned = false;

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
let alphaTable: int[][];
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
    if (alphaTable !== undefined) {
        return;
    }

    alphaTable = Array<Array<int>>(256);
    for (let i = 0; i < 256; i++) {
        alphaTable[i] = Array<int>(8);
    }

    //read table used for alpha compression
    for (let i: int = 0; i < 16; i++) {
        for (let j: int = 0; j < 8; j++) {
            let buf: int = alphaBase[i][3-j%4];
            if (j < 4) {
                alphaTable[i+16][j] = buf;
            } else {
                alphaTable[i+16][j] = -buf - 1;
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
    thumbT59_word1 = PUTBITSHI(thumbT59_word1, thumbT_word1, 1, 32);
    // Fix R0a (top two bits of R0)
    const R0a: uint8 = GETBITSHI(thumbT_word1, 2, 60);
    thumbT59_word1 = PUTBITSHI(thumbT59_word1, R0a, 2, 58);

    // Zero top part (not needed)
    thumbT59_word1 = PUTBITSHI(thumbT59_word1, 0, 5, 63);

    const thumbT59_word2: uint = thumbT_word2;

    return [thumbT59_word1, thumbT59_word2];
}

// The color bits are expanded to the full color
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function decompressColor(color_RGB444: Uint8Array): Uint8Array
{
    // The color should be retrieved as:
    //
    // c = round(255/(r_bits^2-1))*comp_color
    //
    // This is similar to bit replication
    // 
    // Note -- this code only work for bit replication from 4 bits and up --- 3 bits needs
    // two copy operations.
    return new Uint8Array([
        (color_RGB444[R] << 4) | color_RGB444[R],
        (color_RGB444[G] << 4) | color_RGB444[G],
        (color_RGB444[B] << 4) | color_RGB444[B]
    ]);
}

function decompressColor555(color_RGB555: Uint8Array): Uint8Array
{
    // The color should be retrieved as:
    //
    // c = round(255/(r_bits^2-1))*comp_color
    //
    // This is similar to bit replication
    // 
    // Note -- this code only work for bit replication from 4 bits and up --- 3 bits needs
    // two copy operations.
    return new Uint8Array([
        (color_RGB555[R] << 3) | (color_RGB555[R] >> 2),
        (color_RGB555[G] << 3) | (color_RGB555[G] >> 2),
        (color_RGB555[B] << 3) | (color_RGB555[B] >> 2)
    ]);
}

function calculatePaintColors59T(dist: uint8, color_0: Uint8Array, color_1: Uint8Array): Uint8Array[/*4*/]
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

    const C3 = new Uint8Array([
        color_0[R],
        color_0[G],
        color_0[B]
    ]);
    const C2 = new Uint8Array([
        SATURATE(color_1[R] + table59T[dist]),
        SATURATE(color_1[G] + table59T[dist]),
        SATURATE(color_1[B] + table59T[dist])
    ]);
    const C1 = new Uint8Array([
        color_1[R],
        color_1[G],
        color_1[B],
    ]);
    const C4 = new Uint8Array([
        SATURATE(color_1[R] - table59T[dist]),
        SATURATE(color_1[G] - table59T[dist]),
        SATURATE(color_1[B] - table59T[dist])
    ]);

    return [C3, C2, C1, C4];
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
    const colorRGB444_0 = new Uint8Array([
        GETBITSHI(block_part1, 4, 58),
        GETBITSHI(block_part1, 4, 54),
        GETBITSHI(block_part1, 4, 50)
    ]);
    const colorRGB444_1 = new Uint8Array([
        GETBITSHI(block_part1, 4, 46),
        GETBITSHI(block_part1, 4, 42),
        GETBITSHI(block_part1, 4, 38)
    ]);

    // Extend the two colors to RGB888
    const color_0 = decompressColor(colorRGB444_0);
    const color_1 = decompressColor(colorRGB444_1);
    const paint_colors = calculatePaintColors59T(dist, color_0, color_1);

    // Choose one of the four paint colors for each texel
    for (let x: uint8 = 0; x < BLOCK_SIZE; x++) {
        for (let y: uint8 = 0; y < BLOCK_SIZE; y++) {
            const block_mask: uint8 = (GETBITSLO(block_part2, 1, y+x*4+16) << 1) | GETBITSLO(block_part2, 1, y+x*4);
            SET_COLOR(R, img, width, startx+x, starty+y, paint_colors[block_mask][R]);
            SET_COLOR(G, img, width, startx+x, starty+y, paint_colors[block_mask][G]);
            SET_COLOR(B, img, width, startx+x, starty+y, paint_colors[block_mask][B]);
        }
    }
}

// Calculate the paint colors from the block colors 
// using a distance d and one of the H- or T-patterns.
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function calculatePaintColors58H(dist: uint8, color_0: Uint8Array, color_1: Uint8Array): Uint8Array[/*4*/]
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

    const C3 = new Uint8Array([
        SATURATE(color_0[R] + table58H[dist]),
        SATURATE(color_0[G] + table58H[dist]),
        SATURATE(color_0[B] + table58H[dist])
    ]);
    const C2 = new Uint8Array([
        SATURATE(color_0[R] - table58H[dist]),
        SATURATE(color_0[G] - table58H[dist]),
        SATURATE(color_0[B] - table58H[dist])
    ]);
    const C1 = new Uint8Array([
        SATURATE(color_1[R] + table58H[dist]),
        SATURATE(color_1[G] + table58H[dist]),
        SATURATE(color_1[B] + table58H[dist])
    ]);
    const C4 = new Uint8Array([
        SATURATE(color_1[R] - table58H[dist]),
        SATURATE(color_1[G] - table58H[dist]),
        SATURATE(color_1[B] - table58H[dist])
    ]);

    return [C3, C2, C1, C4];
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
    const colorRGB444_0 = new Uint8Array([
        GETBITSHI(block_part1, 4, 57),
        GETBITSHI(block_part1, 4, 53),
        GETBITSHI(block_part1, 4, 49)
    ]);
    const colorRGB444_1 = new Uint8Array([
        GETBITSHI(block_part1, 4, 45),
        GETBITSHI(block_part1, 4, 41),
        GETBITSHI(block_part1, 4, 37)
    ]);

    // Extend the two colors to RGB888
    const color_0 = decompressColor(colorRGB444_0);
    const color_1 = decompressColor(colorRGB444_1);
    const paint_colors = calculatePaintColors58H(dist, color_0, color_1);
    
    // Choose one of the four paint colors for each texel
    for (let x: uint8 = 0; x < BLOCK_SIZE; x++) {
        for (let y: uint8 = 0; y < BLOCK_SIZE; y++) {
            const block_mask: uint8 = (GETBITSLO(block_part2, 1, y+x*4+16) << 1) | GETBITSLO(block_part2, 1, y+x*4);
            SET_COLOR(R, img, width, startx+x, starty+y, paint_colors[block_mask][R]);
            SET_COLOR(G, img, width, startx+x, starty+y, paint_colors[block_mask][G]);
            SET_COLOR(B, img, width, startx+x, starty+y, paint_colors[block_mask][B]);
        }
    }
}

// Decompress the planar mode.
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function decompressBlockPlanar57(compressed57_1: uint, compressed57_2: uint, img: Uint8Array, width: int, height: int, startx: int, starty: int): void
{
    const colorO = new Uint8Array([
        GETBITSHI(compressed57_1, 6, 63),
        GETBITSHI(compressed57_1, 7, 57),
        GETBITSHI(compressed57_1, 6, 50)
    ]);
    const colorH = new Uint8Array([
        GETBITSHI(compressed57_1, 6, 44),
        GETBITSHI(compressed57_1, 7, 38),
        GETBITSLO(compressed57_2, 6, 31)
    ]);
    const colorV = new Uint8Array([
        GETBITSLO(compressed57_2, 6, 25),
        GETBITSLO(compressed57_2, 7, 19),
        GETBITSLO(compressed57_2, 6, 12)
    ]);

    colorO[R] = (colorO[R] << 2) | (colorO[R] >> 4);
    colorO[G] = (colorO[G] << 1) | (colorO[G] >> 6);
    colorO[B] = (colorO[B] << 2) | (colorO[B] >> 4);

    colorH[R] = (colorH[R] << 2) | (colorH[R] >> 4);
    colorH[G] = (colorH[G] << 1) | (colorH[G] >> 6);
    colorH[B] = (colorH[B] << 2) | (colorH[B] >> 4);

    colorV[R] = (colorV[R] << 2) | (colorV[R] >> 4);
    colorV[G] = (colorV[G] << 1) | (colorV[G] >> 6);
    colorV[B] = (colorV[B] << 2) | (colorV[B] >> 4);

    for (let x: int = 0; x < BLOCK_SIZE; x++) {
        for (let y: int = 0; y < BLOCK_SIZE; y++) {
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
        const avg_color4444 = new Uint8Array([
            GETBITSHI(block_part1, 4, 63),
            GETBITSHI(block_part1, 4, 55),
            GETBITSHI(block_part1, 4, 47)
        ]);

        // Here, we should really multiply by 17 instead of 16. This can
        // be done by just copying the four lower bits to the upper ones
        // while keeping the lower bits.
        const avg_color = decompressColor(avg_color4444);

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
        const enc_color1 = new Uint8Array([
            GETBITSHI(block_part1, 5, 63),
            GETBITSHI(block_part1, 5, 55),
            GETBITSHI(block_part1, 5, 47)
        ]);

        // Expand from 5 to 8 bits
        let avg_color = decompressColor555(enc_color1);

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
        let diff_R: int8 = GETBITSHI(block_part1, 3, 58);
        let diff_G: int8 = GETBITSHI(block_part1, 3, 50);
        let diff_B: int8 = GETBITSHI(block_part1, 3, 42);

        // Extend sign bit to entire byte. 
        if (diff_R >= 4) { diff_R -= 8; }
        if (diff_G >= 4) { diff_G -= 8; }
        if (diff_B >= 4) { diff_B -= 8; }

        //  Calculale second color
        const enc_color2 = new Uint8Array([
            enc_color1[R] + diff_R,
            enc_color1[G] + diff_G,
            enc_color1[B] + diff_B
        ]);

        // Expand from 5 to 8 bits
        avg_color = decompressColor555(enc_color2);

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
        let color1_R: int8 = GETBITSHI(block_part1, 5, 63);
        let color1_G: int8 = GETBITSHI(block_part1, 5, 55);
        let color1_B: int8 = GETBITSHI(block_part1, 5, 47);

        // Diff color
        let diff_R: int8 = GETBITSHI(block_part1, 3, 58);
        let diff_G: int8 = GETBITSHI(block_part1, 3, 50);
        let diff_B: int8 = GETBITSHI(block_part1, 3, 42);

        // Extend sign bit to entire byte.
        if (diff_R >= 4) { diff_R -= 8; }
        if (diff_G >= 4) { diff_G -= 8; }
        if (diff_B >= 4) { diff_B -= 8; }

        const r: int8 = color1_R + diff_R;
        const g: int8 = color1_G + diff_G;
        const b: int8 = color1_B + diff_B;

        if (r < 0 || r > 31) {
            const [block59_part1, block59_part2] = unstuff59bits(block_part1, block_part2);
            decompressBlockTHUMB59T(block59_part1, block59_part2, img, width, height, startx, starty);
        } else if (g < 0 || g > 31) {
            const [block58_part1, block58_part2] = unstuff58bits(block_part1, block_part2);
            decompressBlockTHUMB58H(block58_part1, block58_part2, img, width, height, startx, starty);
        } else if (b < 0 || b > 31) {
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
    const enc_color1 = new Uint8Array([
        GETBITSHI(block_part1, 5, 63),
        GETBITSHI(block_part1, 5, 55),
        GETBITSHI(block_part1, 5, 47)
    ]);

    // Expand from 5 to 8 bits
    let avg_color = decompressColor555(enc_color1);

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
                    SET_ALPHA(alphaimg, width, x, y, 0);
                } else {
                    SET_COLOR(R, img, width, x, y, avg_color[R] + mod);
                    SET_COLOR(G, img, width, x, y, avg_color[G] + mod);
                    SET_COLOR(B, img, width, x, y, avg_color[B] + mod);
                    SET_ALPHA(alphaimg, width, x, y, 255);
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
                    SET_ALPHA(alphaimg, width, x, y, 0);
                } else {
                    SET_COLOR(R, img, width, x, y, avg_color[R] + mod);
                    SET_COLOR(G, img, width, x, y, avg_color[G] + mod);
                    SET_COLOR(B, img, width, x, y, avg_color[B] + mod);
                    SET_ALPHA(alphaimg, width, x, y, 255);
                }
            }
            shift += 2;
        }
    }

    // Now decode right part of block. 
    let diff_R: int8 = GETBITSHI(block_part1, 3, 58);
    let diff_G: int8 = GETBITSHI(block_part1, 3, 50);
    let diff_B: int8 = GETBITSHI(block_part1, 3, 42);

    // Extend sign bit to entire byte.
    if (diff_R >= 4) { diff_R -= 8; }
    if (diff_G >= 4) { diff_G -= 8; }
    if (diff_B >= 4) { diff_B -= 8; }

    // Calculate second color
    const enc_color2 = new Uint8Array([
        enc_color1[R] + diff_R,
        enc_color1[G] + diff_G,
        enc_color1[B] + diff_B
    ]);

    // Expand from 5 to 8 bits
    avg_color = decompressColor555(enc_color2);

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
                    SET_ALPHA(alphaimg, width, x, y, 0);
                } else {
                    SET_COLOR(R, img, width, x, y, avg_color[R] + mod);
                    SET_COLOR(G, img, width, x, y, avg_color[G] + mod);
                    SET_COLOR(B, img, width, x, y, avg_color[B] + mod);
                    SET_ALPHA(alphaimg, width, x, y, 255);
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
                    SET_ALPHA(alphaimg, width, x, y, 0);
                } else {
                    SET_COLOR(R, img, width, x, y, avg_color[R] + mod);
                    SET_COLOR(G, img, width, x, y, avg_color[G] + mod);
                    SET_COLOR(B, img, width, x, y, avg_color[B] + mod);
                    SET_ALPHA(alphaimg, width, x, y, 255);
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
    const colorRGB444_0 = new Uint8Array([
        GETBITSHI(block_part1, 4, 58),
        GETBITSHI(block_part1, 4, 54),
        GETBITSHI(block_part1, 4, 50)
    ]);
    const colorRGB444_1 = new Uint8Array([
        GETBITSHI(block_part1, 4, 46),
        GETBITSHI(block_part1, 4, 42),
        GETBITSHI(block_part1, 4, 38)
    ]);

    // Extend the two colors to RGB888
    const color_0 = decompressColor(colorRGB444_0);
    const color_1 = decompressColor(colorRGB444_1);
    const paint_colors = calculatePaintColors59T(dist, color_0, color_1);

    // Choose one of the four paint colors for each texel
    for (let x: uint8 = 0; x < BLOCK_SIZE; x++) {
        for (let y: uint8 = 0; y < BLOCK_SIZE; y++) {
            const block_mask: uint8 = (GETBITSLO(block_part2, 1, y+x*4+16) << 1) | GETBITSLO(block_part2, 1, y+x*4);
            if (block_mask === 2) {
                SET_COLOR(R, img, width, startx+x, starty+y, 0);
                SET_COLOR(G, img, width, startx+x, starty+y, 0);
                SET_COLOR(B, img, width, startx+x, starty+y, 0);
                SET_ALPHA(alphaimg, width, startx+x, starty+y, 0);
            } else {
                SET_COLOR(R, img, width, startx+x, starty+y, paint_colors[block_mask][R]);
                SET_COLOR(G, img, width, startx+x, starty+y, paint_colors[block_mask][G]);
                SET_COLOR(B, img, width, startx+x, starty+y, paint_colors[block_mask][B]);
                SET_ALPHA(alphaimg, width, startx+x, starty+y, 255);
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
    const colorRGB444_0 = new Uint8Array([
        GETBITSHI(block_part1, 4, 57),
        GETBITSHI(block_part1, 4, 53),
        GETBITSHI(block_part1, 4, 49)
    ]);
    const colorRGB444_1 = new Uint8Array([
        GETBITSHI(block_part1, 4, 45),
        GETBITSHI(block_part1, 4, 41),
        GETBITSHI(block_part1, 4, 37)
    ]);

    // Extend the two colors to RGB888
    const color_0 = decompressColor(colorRGB444_0);
    const color_1 = decompressColor(colorRGB444_1);
    const paint_colors = calculatePaintColors58H(dist, color_0, color_1);

    // Choose one of the four paint colors for each texel
    for (let x: uint8 = 0; x < BLOCK_SIZE; x++) {
        for (let y: uint8 = 0; y < BLOCK_SIZE; y++) {
            const block_mask: uint8 = (GETBITSLO(block_part2, 1, y+x*4+16) << 1) | GETBITSLO(block_part2, 1, y+x*4);
            if (block_mask === 2) {
                SET_COLOR(R, img, width, startx+x, starty+y, 0);
                SET_COLOR(G, img, width, startx+x, starty+y, 0);
                SET_COLOR(B, img, width, startx+x, starty+y, 0);
                SET_ALPHA(alphaimg, width, startx+x, starty+y, 0);
            } else {
                SET_COLOR(R, img, width, startx+x, starty+y, paint_colors[block_mask][R]);
                SET_COLOR(G, img, width, startx+x, starty+y, paint_colors[block_mask][G]);
                SET_COLOR(B, img, width, startx+x, starty+y, paint_colors[block_mask][B]);
                SET_ALPHA(alphaimg, width, startx+x, starty+y, 255);
            }
        }
    }
}

// Decompression function for ETC2_RGBA1 format.
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
export function decompressBlockETC21BitAlpha(block_part1: uint, block_part2: uint, img: Uint8Array, alphaimg: Uint8Array, width: int, height: int, startx: int, starty: int): void
{
    const diffbit: boolean = (GETBITSHI(block_part1, 1, 33) !== 0);

    if (diffbit)
    {
        // We have diffbit = 1, meaning no transparent pixels. regular decompression.

        // Base color
        let color1_R: int8 = GETBITSHI(block_part1, 5, 63);
        let color1_G: int8 = GETBITSHI(block_part1, 5, 55);
        let color1_B: int8 = GETBITSHI(block_part1, 5, 47);

        // Diff color
        let diff_R: int8 = GETBITSHI(block_part1, 3, 58);
        let diff_G: int8 = GETBITSHI(block_part1, 3, 50);
        let diff_B: int8 = GETBITSHI(block_part1, 3, 42);

        // Extend sign bit to entire byte.
        if (diff_R >= 4) { diff_R -= 8; }
        if (diff_G >= 4) { diff_G -= 8; }
        if (diff_B >= 4) { diff_B -= 8; }

        const r: int8 = color1_R + diff_R;
        const g: int8 = color1_G + diff_G;
        const b: int8 = color1_B + diff_B;

        if (r < 0 || r > 31) {
            const [block59_part1, block59_part2] = unstuff59bits(block_part1, block_part2);
            decompressBlockTHUMB59T(block59_part1, block59_part2, img, width, height, startx, starty);
        } else if (g < 0 || g > 31) {
            const [block58_part1, block58_part2] = unstuff58bits(block_part1, block_part2);
            decompressBlockTHUMB58H(block58_part1, block58_part2, img, width, height, startx, starty);
        } else if (b < 0 || b > 31) {
            const [block57_part1, block57_part2] = unstuff57bits(block_part1, block_part2);
            decompressBlockPlanar57(block57_part1, block57_part2, img, width, height, startx, starty);
        } else {
            decompressBlockDifferentialWithAlpha(block_part1, block_part2, img, alphaimg, width, height, startx, starty);
        }

        for (let x: int = startx; x < startx+4; x++) {
            for (let y: int = starty; y < starty+4; y++) {
                SET_ALPHA(alphaimg, width, x, y, 255);
            }
        }
    }
    else
    {
        // We have diffbit = 0, transparent pixels. Only T-, H- or regular diff-mode possible.
        
        // Base color
        let color1_R: int8 = GETBITSHI(block_part1, 5, 63);
        let color1_G: int8 = GETBITSHI(block_part1, 5, 55);
        let color1_B: int8 = GETBITSHI(block_part1, 5, 47);

        // Diff color
        let diff_R: int8 = GETBITSHI(block_part1, 3, 58);
        let diff_G: int8 = GETBITSHI(block_part1, 3, 50);
        let diff_B: int8 = GETBITSHI(block_part1, 3, 42);

        // Extend sign bit to entire byte.
        if (diff_R >= 4) { diff_R -= 8; }
        if (diff_G >= 4) { diff_G -= 8; }
        if (diff_B >= 4) { diff_B -= 8; }

        const r: int8 = color1_R + diff_R;
        const g: int8 = color1_G + diff_G;
        const b: int8 = color1_B + diff_B;

        if (r < 0 || r > 31) {
            const [block59_part1, block59_part2] = unstuff59bits(block_part1, block_part2);
            decompressBlockTHUMB59TAlpha(block59_part1, block59_part2, img, alphaimg, width, height, startx, starty);
        } else if (g < 0 || g > 31) {
            const [block58_part1, block58_part2] = unstuff58bits(block_part1, block_part2);
            decompressBlockTHUMB58HAlpha(block58_part1, block58_part2, img, alphaimg, width, height, startx, starty);
        } else if (b < 0 || b > 31) {
            const [block57_part1, block57_part2] = unstuff57bits(block_part1, block_part2);
            decompressBlockPlanar57(block57_part1, block57_part2, img, width, height, startx, starty);

            for (let x: int = startx; x < startx+4; x++) {
                for (let y: int = starty; y < starty+4; y++) {
                    SET_ALPHA(alphaimg, width, x, y, 255);
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
function decompressBlockAlpha(data: DataView, img: Uint8Array, width: int, height: int, startx: int, starty: int): void
{
    let alpha = data.getUint8(0);
    let table = data.getUint8(1);
    let byte = 2;
    let bit = 0;

    //extract an alpha value for each pixel.
    for (let x: int = 0; x < BLOCK_SIZE; x++) {
        for (let y: int = 0; y < BLOCK_SIZE; y++) {
            //Extract table index
            let index: int = 0;
            for (let bitpos: int = 0; bitpos < 3; bitpos++) {
                index |= getbit(data.getUint8(byte), 7-bit, 2-bitpos);
                bit++;
                if (bit > 7) {
                    bit = 0;
                    byte++;
                }
            }

            SET_COLOR(3, img, width, startx+x, starty+y, alpha + alphaTable[table][index]);
        }
    }
}

// Does decompression and then immediately converts from 11 bit signed to a 16-bit format.
// 
// NO WARRANTY --- SEE STATEMENT IN TOP OF FILE (C) Ericsson AB 2005-2013. All Rights Reserved.
function get16bits11signed(base: int, table: int, mul: int, index: int): int16
{
    let elevenbase: int = base - 128;
    if (elevenbase === -128) {
        elevenbase = -127;
    }
    elevenbase *= 8;

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
    if (elevenbits >= 1024) {
        elevenbits = 1023;
    } else if (elevenbits < -1023) {
        elevenbits = -1023;
    }
    //this is the value we would actually output.. 
    //but there aren't any good 11-bit file or uncompressed GL formats
    //so we extend to 15 bits signed.
    const sign2: boolean = (elevenbits < 0);
    elevenbits = Math.abs(elevenbits);
    let fifteenbits: int16 = (elevenbits<<5) + (elevenbits>>5);
    let sixteenbits: int16 = fifteenbits;

    if (sign2) {
        sixteenbits = -sixteenbits;
    }
    return sixteenbits;
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
export function decompressBlockAlpha16bit(data: DataView, img: Uint8Array, width: int, height: int, startx: int, starty: int): void
{
    let alpha = data.getUint8(0);
    let table = data.getUint8(1);
    let byte = 2;
    let bit = 0;

    if (formatSigned) {
        //if we have a signed format, the base value is given as a signed byte. We convert it to (0-255) here,
        //so more code can be shared with the unsigned mode.
        alpha = data.getInt8(0);
        alpha += 128;
    }

    //extract an alpha value for each pixel.
    for (let x: int = 0; x < BLOCK_SIZE; x++) {
        for (let y: int = 0; y < BLOCK_SIZE; y++) {
            //Extract table index
            let index: int = 0;
            for (let bitpos: int = 0; bitpos < 3; bitpos++) {
                index |= getbit(data.getUint8(byte), 7-bit, 2-bitpos);
                bit++;
                if (bit > 7) {
                    bit = 0;
                    byte++;
                }
            }

            const windex: int = 2 * ARRAY_XY(width, startx+x, starty+y);

            const mem = new DataView(img.buffer, img.byteOffset, img.byteLength);
            if (formatSigned) {
                mem.setInt16(windex, get16bits11signed(alpha, table % 16, table / 16, index), true);
            } else {
                mem.setUint16(windex, get16bits11bits(alpha, table % 16, table / 16, index), true);
            }
        }
    }
}

export function decompressRGB(dec: Uint8Array, enc: DataView, width: int, height: int): void
{
    let block_offset = 0;
    for (let y = 0; y < height; y += BLOCK_SIZE) {
        for (let x = 0; x < width; x += BLOCK_SIZE) {
            const block_part1 = enc.getUint32(block_offset + 0, false);
            const block_part2 = enc.getUint32(block_offset + 4, false);
            decompressBlockETC2(block_part1, block_part2, dec, width, height, x, y);
            block_offset += 8;
        }
    }

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            SET_COLOR(3, dec, width, x, y, 255);
        }
    }
}

export function decompressRGBA(dec: Uint8Array, enc: DataView, width: int, height: int): void
{
    setupAlphaTable();

    let block_offset = 0;
    for (let y = 0; y < height; y += BLOCK_SIZE) {
        for (let x = 0; x < width; x += BLOCK_SIZE) {
            const alpha_block = new DataView(enc.buffer, enc.byteOffset + block_offset, 8);
            decompressBlockAlpha(alpha_block, dec, width, height, x, y);
            block_offset += 8;

            const block_part1 = enc.getUint32(block_offset + 0, false);
            const block_part2 = enc.getUint32(block_offset + 4, false);
            decompressBlockETC2(block_part1, block_part2, dec, width, height, x, y);
            block_offset += 8;
        }
    }
}
