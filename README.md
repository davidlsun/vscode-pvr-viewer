# PVR Viewer

Extension for Visual Studio Code that adds image preview for PVR (.pvr) texture files. All texture decompression is written in JavaScript, so it works with any graphics card.

## Features

* Includes file icon theme for .pvr files.
* Linear textures are converted to sRGB colorspace for display.
* No zooming or other user control in the viewer.
* No support for viewing cubemaps, mipmaps, 3D textures.

## Texture Formats

Initial goal is to support all formats required by OpenGL ES 3.2, listed below:

PVRTC

* ✅ PVRTC 2bpp RGB
* ✅ PVRTC 2bpp RGBA
* ✅ PVRTC 4bpp RGB
* ✅ PVRTC 4bpp RGBA
* ✅ PVRTC2 2bpp
* ✅ PVRTC2 4bpp
* PVRTC HDR 6bpp
* PVRTC HDR 8bpp
* PVRTC2 HDR 6bpp
* PVRTC2 HDR 8bpp

ETC

* ✅ ETC1
* ✅ ETC2 RGB
* ✅ ETC2 RGBA
* ✅ ETC2 RGB A1
* ✅ EAC R11
* ✅ EAC RG11

BC

* BC4
* BC5

ASTC

* ASTC 4x4
* ASTC 5x4
* ASTC 5x5
* ASTC 6x5
* ASTC 6x6
* ASTC 8x5
* ASTC 8x6
* ASTC 8x8
* ASTC 10x5
* ASTC 10x6
* ASTC 10x8
* ASTC 10x10
* ASTC 12x10
* ASTC 12x12
* ASTC 3x3x3
* ASTC 4x3x3
* ASTC 4x4x3
* ASTC 4x4x4
* ASTC 5x4x4
* ASTC 5x5x4
* ASTC 5x5x5
* ASTC 6x5x5
* ASTC 6x6x5
* ASTC 6x6x6

Uncompressed

* ✅ R8 G8 B8 A8 (SNorm, UInt, SInt)
* ✅ R8 G8 B8 (SNorm, UInt, SInt)
* ✅ R8 G8 (SNorm, UInt, SInt)
* ✅ R8 (SNorm, UInt, SInt)
* ✅ R10 G10 B10 A2 (UInt)
* ✅ B8 G8 R8 A8
* ✅ R4 G4 B4 A4
* ✅ R5 G5 B5 A1
* ✅ R5 G6 B5
* ✅ L8 A8
* ✅ L8
* ✅ A8
* ✅ R32 G32 B32 A32 (Float, SInt)
* ✅ R32 G32 B32 (Float, SInt)
* ✅ R32 G32 (Float, SInt)
* ✅ R32 (Float, SInt)
* ✅ R16 G16 B16 A16 (Float, SInt)
* ✅ R16 G16 B16 (Float, SInt)
* ✅ R16 G16 (Float, SInt)
* ✅ R16 (Float, SInt)
* B10 G11 R11 (UFloat)

Exponential

* Shared Exponent RGB999 E5
* RGBM
* RGBD

## Release Notes

Not much supported yet, but could still be useful to people. Just wanted to get something out there.

### 0.1.0

Initial release.
