# PVR Viewer

Extension for Visual Studio Code that adds image preview for PVR (.pvr) texture files.

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
* PVRTC2 2bpp
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

Exponential

* Shared Exponent RGB999 E5
* RGBM
* RGBD

Uncompressed

* R8 G8 B8 A8
* R10 G10 B10 A2
* R4 G4 B4 A4
* R5 G5 B5 A1
* B8 G8 R8 A8
* R16 G16 B16 A16
* R32 G32 B32 A32
* R8 G8 B8
* R5 G6 B5
* R32 G32 B32
* B10 G11 R11
* R8 G8
* L8 A8
* R16 G16 B16
* R16 G16
* R32 G32
* R8
* A8
* L8
* R16
* R32
* R16 G16 B16

## Release Notes

Not much supported yet, but could still be useful to people. Just wanted to get something out there.

### 0.1.0

Initial release.

---
