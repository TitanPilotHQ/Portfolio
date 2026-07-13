# Asset Library — 02. Visual Assets

Every real visual asset file in this repository, in full. There are two.
This file documents the files themselves — filename, location, format,
dimensions, and every place each is referenced in code. For the brand
tokens that govern how these files (and any future ones) should be used —
color, type, motion, surface treatments — see Module 01's canonical file,
`01-brand-bible/03-visual-identity.md`, cited here and not restated.

## `public/logo.png`

- **Format:** PNG
- **Dimensions:** 1086 × 1448 px
- **Referenced at:**
  - `app/layout.tsx:77-78` — `metadata.icons.icon` and `metadata.icons.apple`
    (favicon and Apple touch icon)
  - `components/JsonLd.tsx:13` — `organization.logo`, built as
    `` `${SITE_URL}/logo.png` `` in the site's Organization structured-data
    block
  - `components/Footer.tsx:14` — site footer logo, rendered at 56×56
    (`components/Footer.tsx:16-17`; sized 56px per commit `3feb362`,
    2026-07-04)
  - `components/Header.tsx:27` — site header logo, rendered at 36×36
    (`components/Header.tsx:29-30`)
- **Alt text:** `"Titan Pilot logo"`, identical string in both Header and
  Footer usages (`components/Header.tsx:28`, `components/Footer.tsx:15`) —
  see Module 01 (`03-visual-identity.md`, Logo section) for the alt-text
  convention this file follows.

## `public/banner.png`

- **Format:** PNG
- **Dimensions:** 1983 × 793 px
- **Referenced at:**
  - `app/layout.tsx:62` — `metadata.openGraph.images[0].url`, the Open
    Graph social-share image
  - `app/layout.tsx:74` — `metadata.twitter.images[0]`, the Twitter/X card
    image (same file)
- **Note on code-declared dimensions:** `app/layout.tsx:63-64` hardcodes
  `width: 1982, height: 793` in the same `openGraph.images` object. The
  real file is 1983px wide — a 1px discrepancy between the metadata the
  code declares and the file's actual width. This is a pre-existing detail
  in `app/layout.tsx`, not introduced by this module; flagged here for
  accuracy since this file's job is to record the asset's real properties,
  not the code's stated approximation of them. Correcting the metadata
  value is outside this module's scope (it would be a one-line
  `app/layout.tsx` change, tracked wherever site code changes are tracked,
  not in LaunchOS).

## What this file deliberately does not invent

`public/logo.png` and `public/banner.png` are the only two real visual
asset files anywhere in this repository — no other image, PDF, video, or
design file exists in `public/` or elsewhere in the repo. Accordingly,
this file does not document, and this module does not claim exist:

- A pitch deck file (any format)
- A one-pager or sales collateral PDF
- An explainer or demo video asset
- A social-media template set (beyond the single Open Graph/Twitter image
  above, which is `banner.png` itself, not a template)
- Favicon variants beyond the single `logo.png` reused as both `icon` and
  `apple` in `app/layout.tsx:77-78` — there is no dedicated `favicon.ico`,
  no multi-resolution icon set, and no maskable/PWA icon variant
- Additional logo variants — no dark-mode logo, no light-mode logo, no
  horizontal lockup, no stacked lockup, no wordmark-only mark, no
  icon-only mark. Module 01 states this directly: "No wordmark-only or
  icon-only variants exist yet" (`01-brand-bible/03-visual-identity.md`,
  Logo section) — any new surface needing one of these today reuses
  `logo.png` as-is rather than approximating a redraw.
- A press kit or media-brand-assets bundle
- Swag, merchandise, or print-collateral designs

Module 01's color, type, and motion tokens (`03-visual-identity.md`)
describe what a future asset built from this system *should* look like if
one is ever produced — a deck template, a social template, a redrawn logo
variant. That is a production step that has not happened. This file
catalogs assets that exist today; it does not conflate a token system that
could produce future assets with an asset that already exists.
