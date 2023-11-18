# PVR Viewer

Extension for Visual Studio Code that adds image preview for PVR (.pvr) texture files. All texture decompression is written in JavaScript, so any format will work on any graphics card.

## Features

* Large textures are scaled down to fit the window.
* Textures with premultiplied alpha are shown correctly.
* Linear textures not converted to sRGB colorspace for display.
* No zooming or other user control of the viewer.
* No support for viewing cubemaps, mipmaps, arrays, 3D textures.
* Floating point textures have no exposure control for display.

## Texture Formats

Initial goal is to support all formats required by OpenGL ES 3.2, listed below:

### PVRTC

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

### ETC

* ✅ ETC1
* ✅ RGB8_ETC2, SRGB8_ETC2
* ✅ RGB8_PUNCHTHROUGH_ALPHA1_ETC2, SRGB8_PUNCHTHROUGH_ALPHA1_ETC2
* ✅ RGBA8_ETC2_EAC, SRGB8_ALPHA8_ETC2_EAC
* ✅ R11_EAC, SIGNED_R11_EAC
* ✅ RG11_EAC, SIGNED_RG11_EAC

### BC

* BC4
* BC5

### ASTC

| GLES32 | Format | Enums
| :----: | ------ | -----
| ✔️ | ASTC 4x4 | ``RGBA_ASTC_4x4``, ``SRGB8_ALPHA8_ASTC_4x4``
| ✔️ | ASTC 5x4 | ``RGBA_ASTC_5x4``, ``SRGB8_ALPHA8_ASTC_5x4``
| ✔️ | ASTC 5x5 | ``RGBA_ASTC_5x5``, ``SRGB8_ALPHA8_ASTC_5x5``
| ✔️ | ASTC 6x5 | ``RGBA_ASTC_6x5``, ``SRGB8_ALPHA8_ASTC_6x5``
| ✔️ | ASTC 6x6 | ``RGBA_ASTC_6x6``, ``SRGB8_ALPHA8_ASTC_6x6``
| ✔️ | ASTC 8x5 | ``RGBA_ASTC_8x5``, ``SRGB8_ALPHA8_ASTC_8x5``
| ✔️ | ASTC 8x6 | ``RGBA_ASTC_8x6``, ``SRGB8_ALPHA8_ASTC_8x6``
| ✔️ | ASTC 8x8 | ``RGBA_ASTC_8x8``, ``SRGB8_ALPHA8_ASTC_8x8``
| ✔️ | ASTC 10x5 | ``RGBA_ASTC_10x5``, ``SRGB8_ALPHA8_ASTC_10x5``
| ✔️ | ASTC 10x6 | ``RGBA_ASTC_10x6``, ``SRGB8_ALPHA8_ASTC_10x6``
| ✔️ | ASTC 10x8 | ``RGBA_ASTC_10x8``, ``SRGB8_ALPHA8_ASTC_10x8``
| ✔️ | ASTC 10x10 | ``RGBA_ASTC_10x10``, ``SRGB8_ALPHA8_ASTC_10x10``
| ✔️ | ASTC 12x10 | ``RGBA_ASTC_12x10``, ``SRGB8_ALPHA8_ASTC_12x10``
| ✔️ | ASTC 12x12 | ``RGBA_ASTC_12x12``, ``SRGB8_ALPHA8_ASTC_12x12``
| | |
| | ASTC 3x3x3 |
| | ASTC 4x3x3 |
| | ASTC 4x4x3 |
| | ASTC 4x4x4 |
| | ASTC 5x4x4 |
| | ASTC 5x5x4 |
| | ASTC 5x5x5 |
| | ASTC 6x5x5 |
| | ASTC 6x6x5 |
| | ASTC 6x6x6 |
| | |
| 🟢 | R8 G8 B8 A8 | ``RGBA8``, ``RGBA8_SNORM``, ``SRGB8_ALPHA8``
| 🟢 | R8 G8 B8 | ``RGB8``, ``RGB8_SNORM``, ``SRGB8``
| 🟢 | R8 G8 | ``RG8``, ``RG8_SNORM``
| 🟢 | R8 | ``R8``, ``R8_SNORM``, ``R8I``, ``R8UI``
| 🟢 | R10 G10 B10 A2 | ``RGB10_A2``, ``RGB10_A2UI``
| 🟢 | B8 G8 R8 A8 |
| 🟢 | R4 G4 B4 A4 | ``RGBA4``
| 🟢 | R5 G5 B5 A1 | ``RGB5_A1``
| 🟢 | R5 G6 B5 | ``RGB565``
| 🟢 | L8 A8 |
| 🟢 | L8 |
| 🟢 | A8 |
| 🟢 | R32 G32 B32 A32 | ``RGBA32F``
| 🟢 | R32 G32 B32 | ``RGB32F``
| 🟢 | R32 G32 | ``RG32F``
| 🟢 | R32 | ``R32F``
| 🟢 | R16 G16 B16 A16 | ``RGBA16F``
| 🟢 | R16 G16 B16 | ``RGB16F``
| 🟢 | R16 G16 | ``RG16F``
| 🟢 | R16 | ``R16F``
| | |
| 🟢 | R11 G11 B10 | ``R11F_G11F_B10F``
| 🟢 | RGB9 E5 | ``RGB9_E5``
| 🟢 | RGBM |
| | RGBD |
| | |

## Release Notes

Not much supported yet, but could still be useful to people. Just wanted to get something out there.
