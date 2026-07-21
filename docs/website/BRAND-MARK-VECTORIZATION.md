# Brand Mark Vectorization

**Date:** 2026-07-22
**Purpose:** Source real vector geometry for the Titan Pilot mark so the cinematic
entry sequence can animate genuine path-derived fragments instead of a flat
raster image or arbitrary shapes.

## Source selection

No SVG of the Titan Pilot mark existed anywhere in the repository. Three raster
variants were compared:

| File | Format | Resolution | Used in code? |
|---|---|---|---|
| `public/logo.png` | PNG, RGB | 1086×1448 | Yes — Header, Footer, favicon/apple-touch-icon |
| `assets/logo-black.png` | PNG, RGB | 1086×1448 | No — unused duplicate |
| `assets/logo-white.jpg` | JPEG | 768×1024 | No — unused, lossy, light-background variant |

All three are the same design (icon + "TITANPILOT" wordmark + tagline), just
different backgrounds/formats — no conflicting logo designs exist.
**`public/logo.png`** was selected: it's the one actually served in production,
it's the highest resolution, and it's lossless (PNG, not JPEG).

The animated mark is the **icon/monogram only** (the T+P candlestick-arrow
symbol), cropped from the top portion of the lockup (source rows 325–870 of
1448, cols 253–852 of 1086). The wordmark and tagline are not vectorized or
animated — they render as ordinary text during the reveal, matching how
`Header.tsx` already pairs a small icon image with an HTML text wordmark.

## Vectorization method

Traced entirely locally — no online vectorization service, no upload of the
asset anywhere:

1. **`potrace`** (open-source bitmap tracer, installed via Homebrew — only the
   tracer binary was downloaded, never the logo) converts a binary
   foreground/background bitmap into SVG bezier paths.
2. The icon region was isolated by color-distance from the background
   (`#05070a`-ish navy), connected-component labeled (`scipy.ndimage.label`),
   and each disjoint region traced independently, then repositioned into one
   combined SVG. This gives **7 fragments** derived directly from the mark's
   real geometry (not arbitrary tiles):
   - `p-swoop` — the P/D curve
   - `t-shape` — the T
   - `arrow` — the ascending trend arrow (traced separately via targeted
     cyan-channel thresholding, since its thin, gradient-heavy rendering
     didn't survive simple background-distance thresholding cleanly)
   - `candle-1` through `candle-5` — the five ascending candlesticks
3. Traced at 4× supersampled resolution (Lanczos upscale → trace → paths
   scaled back down) for smooth curves instead of jagged pixel-stair edges.
4. Fill: a single diagonal brand gradient (`#00d7ff → #0078ff → #7c3aed`,
   the existing `--color-cyan` / `--color-azure` / `--color-violet` tokens
   already in `app/globals.css` — no new colors introduced) across the P/T/
   candlestick fragments, with a dedicated cyan→azure gradient on the arrow
   fragment specifically (the source renders the arrow as consistently
   bright cyan regardless of position, which one shared diagonal gradient
   couldn't reproduce).

No raster image is embedded in the output. No text elements, no filters, no
external references. 343 lines, pure vector paths.

## Fidelity proof

Compared at native crop resolution (624×570) against `public/logo.png`:

- **Silhouette / proportions / negative space:** side-by-side and 50%-opacity
  overlay comparison confirm the traced mark matches the source shape,
  proportions, and gaps with no visible edge drift at normal viewing sizes.
- **Pixel diff:** median per-pixel channel difference of 6/255; the higher
  mean (≈20/255) is attributable to anti-aliasing halos at every edge (an
  inherent raster-vs-vector artifact) and the flattened internal
  gradient/gloss highlights the source render has, not silhouette
  mismatch.
- **Multi-size check:** rendered at 32px, 64px, 128px, 512px — the mark
  stays legible and recognizable at every size, including the smallest.
- **Light/dark background check:** rendered on both `#05070a` (site's own
  background) and white — clean in both.

**Acceptance:** silhouette matches, proportions match, negative space
matches, no loss of recognizability at small sizes. Approved for use as the
entry-sequence fragment source.

## Output

- **Asset:** `public/brand/titan-mark.svg` (624×570 viewBox, 7 named
  fragment groups, two gradient defs)
- **Fidelity check artifacts** (comparison renders, overlays, diffs — not
  committed, regenerable): `.superpowers/sdd/brand-mark-fidelity/`
