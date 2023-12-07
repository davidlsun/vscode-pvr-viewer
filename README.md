# PVR Viewer

Extension for Visual Studio Code that adds image preview for PVR (.pvr) texture files. All texture decompression is written in JavaScript, so any format will work on any graphics card.

## Features

* Large textures are scaled down to fit the window.
* Textures with premultiplied alpha are shown correctly.
* No zooming or other user control of the viewer.
* No support for viewing cubemaps, mipmaps, arrays, 3D textures.
* Floating point textures have no exposure control for display.
* Packed YUV formats are not supported.

## Texture Formats

Initial goal is to support all formats required by OpenGL ES 3.2, listed below:

| ❔ | Format | Enums
| :----: | ------ | -----
| | |
| 🟢 | ETC1 | ``ETC1_RGB8``
| 🟢 | ETC2 RGB | ``RGB8_ETC2``, ``SRGB8_ETC2``
| 🟢 | ETC2 RGBA | ``RGBA8_ETC2_EAC``, ``SRGB8_ALPHA8_ETC2_EAC``
| 🟢 | ETC2 RGB A1 | ``RGB8_PUNCHTHROUGH_ALPHA1_ETC2``, ``SRGB8_PUNCHTHROUGH_ALPHA1_ETC2``
| 🟢 | EAC R11 | ``R11_EAC``, ``SIGNED_R11_EAC``
| 🟢 | EAC RG11 | ``RG11_EAC``, ``SIGNED_RG11_EAC``
| | |
| 🟢 | PVRTC 2bpp RGB | ``RGB_PVRTC_2BPPV1``
| 🟢 | PVRTC 2bpp RGBA | ``RGBA_PVRTC_2BPPV1``
| 🟢 | PVRTC 4bpp RGB | ``RGB_PVRTC_4BPPV1``
| 🟢 | PVRTC 4bpp RGBA | ``RGBA_PVRTC_4BPPV1``
| 🟢 | PVRTC2 2bpp | ``RGBA_PVRTC_2BPPV2``
| 🟢 | PVRTC2 4bpp | ``RGBA_PVRTC_4BPPV2``
| | |
| ✖️ | BC1 | ``RGB_S3TC_DXT1``, ``RGBA_S3TC_DXT1``, ``SRGB_S3TC_DXT1``, ``SRGB_ALPHA_S3TC_DXT1``
| ✖️ | BC2 | ``RGBA_S3TC_DXT3``, ``SRGB_ALPHA_S3TC_DXT3``
| ✖️ | BC3 | ``RGBA_S3TC_DXT5``, ``SRGB_ALPHA_S3TC_DXT5``
| ❌ | BC4 | ``RED_BC4_ATI1_UNORM``, ``RED_BC4_ATI1_SNORM``
| ❌ | BC5 | ``RG_BC5_ATI2_UNORM``, ``RG_BC5_ATI2_SNORM``
| ✖️ | BC6H | ``RGB_BPTC_SIGNED_FLOAT``, ``RGB_BPTC_UNSIGNED_FLOAT``
| ✖️ | BC7 | ``RGBA_BPTC_UNORM``, ``SRGB_ALPHA_BPTC_UNORM``
| | |
| ❌ | ASTC 4x4 | ``RGBA_ASTC_4x4``, ``SRGB8_ALPHA8_ASTC_4x4``
| ❌ | ASTC 5x4 | ``RGBA_ASTC_5x4``, ``SRGB8_ALPHA8_ASTC_5x4``
| ❌ | ASTC 5x5 | ``RGBA_ASTC_5x5``, ``SRGB8_ALPHA8_ASTC_5x5``
| ❌ | ASTC 6x5 | ``RGBA_ASTC_6x5``, ``SRGB8_ALPHA8_ASTC_6x5``
| ❌ | ASTC 6x6 | ``RGBA_ASTC_6x6``, ``SRGB8_ALPHA8_ASTC_6x6``
| ❌ | ASTC 8x5 | ``RGBA_ASTC_8x5``, ``SRGB8_ALPHA8_ASTC_8x5``
| ❌ | ASTC 8x6 | ``RGBA_ASTC_8x6``, ``SRGB8_ALPHA8_ASTC_8x6``
| ❌ | ASTC 8x8 | ``RGBA_ASTC_8x8``, ``SRGB8_ALPHA8_ASTC_8x8``
| ❌ | ASTC 10x5 | ``RGBA_ASTC_10x5``, ``SRGB8_ALPHA8_ASTC_10x5``
| ❌ | ASTC 10x6 | ``RGBA_ASTC_10x6``, ``SRGB8_ALPHA8_ASTC_10x6``
| ❌ | ASTC 10x8 | ``RGBA_ASTC_10x8``, ``SRGB8_ALPHA8_ASTC_10x8``
| ❌ | ASTC 10x10 | ``RGBA_ASTC_10x10``, ``SRGB8_ALPHA8_ASTC_10x10``
| ❌ | ASTC 12x10 | ``RGBA_ASTC_12x10``, ``SRGB8_ALPHA8_ASTC_12x10``
| ❌ | ASTC 12x12 | ``RGBA_ASTC_12x12``, ``SRGB8_ALPHA8_ASTC_12x12``
| | |
| ✖️ | ASTC 3x3x3 | ``RGBA_ASTC_3x3x3``, ``SRGB8_ALPHA8_ASTC_3x3x3``
| ✖️ | ASTC 4x3x3 | ``RGBA_ASTC_4x3x3``, ``SRGB8_ALPHA8_ASTC_4x3x3``
| ✖️ | ASTC 4x4x3 | ``RGBA_ASTC_4x4x3``, ``SRGB8_ALPHA8_ASTC_4x4x3``
| ✖️ | ASTC 4x4x4 | ``RGBA_ASTC_4x4x4``, ``SRGB8_ALPHA8_ASTC_4x4x4``
| ✖️ | ASTC 5x4x4 | ``RGBA_ASTC_5x4x4``, ``SRGB8_ALPHA8_ASTC_5x4x4``
| ✖️ | ASTC 5x5x4 | ``RGBA_ASTC_5x5x4``, ``SRGB8_ALPHA8_ASTC_5x5x4``
| ✖️ | ASTC 5x5x5 | ``RGBA_ASTC_5x5x5``, ``SRGB8_ALPHA8_ASTC_5x5x5``
| ✖️ | ASTC 6x5x5 | ``RGBA_ASTC_6x5x5``, ``SRGB8_ALPHA8_ASTC_6x5x5``
| ✖️ | ASTC 6x6x5 | ``RGBA_ASTC_6x6x5``, ``SRGB8_ALPHA8_ASTC_6x6x5``
| ✖️ | ASTC 6x6x6 | ``RGBA_ASTC_6x6x6``, ``SRGB8_ALPHA8_ASTC_6x6x6``
| | |
| 🟢 | R8 G8 B8 A8 | ``RGBA8``, ``RGBA8_SNORM``, ``SRGB8_ALPHA8``, ``RGBA8UI``, ``RGBA8I``, ``BGRA8``
| 🟢 | R8 G8 B8 | ``RGB8``, ``RGB8_SNORM``, ``SRGB8``, ``RGB8UI``, ``RGB8I``
| 🟢 | R8 G8 | ``RG8``, ``RG8_SNORM``, ``RG8UI``, ``RG8I``
| 🟢 | R8 | ``R8``, ``R8_SNORM``, ``R8UI``, ``R8I``
| 🟢 | R10 G10 B10 A2 | ``RGB10_A2``, ``RGB10_A2UI``
| 🟢 | R4 G4 B4 A4 | ``RGBA4``
| 🟢 | R5 G5 B5 A1 | ``RGB5_A1``
| 🟢 | R5 G6 B5 | ``RGB565``
| 🟢 | L8 A8 | ``LUMINANCE8_ALPHA8``
| 🟢 | L8 | ``LUMINANCE8``
| 🟢 | A8 | ``ALPHA8``
| 🟢 | R32 G32 B32 A32 | ``RGBA32F``, ``RGBA32UI``, ``RGBA16I``
| 🟢 | R32 G32 B32 | ``RGB32F``, ``RGB32UI``, ``RGB32I``
| 🟢 | R32 G32 | ``RG32F``, ``RG32UI``, ``RG32I``
| 🟢 | R32 | ``R32F``, ``R32UI``, ``R32I``
| 🟢 | R16 G16 B16 A16 | ``RGBA16F``, ``RGBA16UI``, ``RGBA16I``
| 🟢 | R16 G16 B16 | ``RGB16F``, ``RGB16UI``, ``RGB16I``
| 🟢 | R16 G16 | ``RG16F``, ``RG16UI``, ``RG16I``
| 🟢 | R16 | ``R16F``, ``R16UI``, ``R16I``
| 🟢 | R11 G11 B10 | ``R11F_G11F_B10F``
| 🟢 | RGB9 E5 | ``RGB9_E5``
| 🟢 | RGBM | ``RGBA8``*
| 🟢 | RGBD | ``RGBA8``*
| | |
<!--
| ✖️ | RGTC1 | ``RED_RGTC1``, ``SIGNED_RED_RGTC1``
| ✖️ | RGTC2 | ``RG_RGTC2``, ``SIGNED_RG_RGTC2``
| ✖️ | BW1bpp |
| ✖️ | RGBG8888 |
| ✖️ | GRGB8888 |
| ✖️ | BASISU_ETC1S |
| ✖️ | BASISU_UASTC |
| ✖️ | UYVY_422 |
| ✖️ | UYVY_422 |
| ✖️ | PVRTC HDR 6bpp | ``RGB_PVRTC_4BPPV1``+``RGB_PVRTC_2BPPV1``
| ✖️ | PVRTC HDR 8bpp | ``RGB_PVRTC_4BPPV1``+``RGB_PVRTC_4BPPV1``
| ✖️ | PVRTC2 HDR 6bpp | ``RGBA_PVRTC_4BPPV2``+``RGBA_PVRTC_2BPPV2``
| ✖️ | PVRTC2 HDR 8bpp | ``RGBA_PVRTC2_4BPPV2``+``RGBA_PVRTC2_4BPPV2``
| | |
-->

## Release Notes

Not much supported yet, but could still be useful to people. Just wanted to get something out there.
