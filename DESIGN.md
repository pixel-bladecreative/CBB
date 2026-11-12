# CBB Design System — v0.1

Open `design-system.html` for the live specimen (serve the folder: `python3 -m http.server 8000`).

## Direction
Premium, calm, image-led. The clinic's own interior photography carries the color; the interface stays quiet.
Light plaster pages alternate with dark slate chapters, with one motion idea per section.

**References (via Refero):** Luffu (regular-weight serif headlines, small rectangular buttons, hairline structure),
Biograph (dark cinematic chapters between light editorial space), Until Labs (small mono annotations).
Rejected: pastel/atmospheric gradients, pill buttons, bold grotesk slogans, heavy shadows.

## Files
| File | What |
|---|---|
| `assets/css/tokens.css` | Palette, semantic roles, type scale, space, radius, motion tokens; `.theme-dark`, `.theme-spruce`, `.theme-linen` contexts |
| `assets/css/base.css` | Reset, type classes, buttons, link, nav, media, card, index list, stat, quote, glass, field |
| `assets/js/motion.js` | Lenis smooth scroll + GSAP ScrollTrigger primitives driven by `data-*` attributes |
| `assets/vendor/` | GSAP 3.13 (ScrollTrigger, SplitText), Lenis 1.1.20 — vendored, no CDN dependency |
| `assets/img/interior/` | Clinic photos from the current site, resized for web |

## Palette (sampled from the interior)
Plaster `#F7F5F1` canvas · Slate 900 `#1F2629` dark chapters · Slate 700 `#3B474C` wall ·
Spruce 700 `#33433C` consult wall · Walnut 500 `#7A5236` · Leather 500 `#2F4D66` (focus) ·
Ochre 500 `#B7863A` signal (dots, numerals, progress — not body text on light) · Ink 900 `#1C1B17` text.

## Type
Newsreader 400 (display, optical sizing) · Geist 400/500 (body, UI) · Geist Mono 500 (labels). Fluid sizes 375→1440px.

## Motion attributes
`data-reveal`, `data-reveal-group`, `data-split`, `data-parallax="0.12"`, `data-clip`, `data-count`,
`data-horizontal` + `data-track`, `data-index-preview` (rows with `data-image`).
All motion is skipped under `prefers-reduced-motion`; if scripts fail, content shows after 2.5s.
