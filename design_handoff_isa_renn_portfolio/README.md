# Handoff: ISA RENN — Burgundy Editorial Portfolio

## Overview
A single-page, scroll-driven creative portfolio website for a multidisciplinary creative (art director / designer / photographer). The art direction fuses brutalist editorial web design, contemporary fashion-magazine layouts, Swiss grid systems and luxury portfolio presentation, with a dominant **deep burgundy** identity. The page is one continuous vertical scroll through five sections: Hero → About → Selected Works → Experience → Contact.

## About the Design Files
The file in this bundle (`ISA RENN Portfolio.dc.html`) is a **design reference created in HTML** — a working prototype that demonstrates the intended look, layout, typography and motion. **It is not production code to copy directly.**

The task is to **recreate this design in the target codebase's environment** using its established patterns and libraries. The original brief requested **Next.js + Tailwind CSS + Framer Motion** with smooth scrolling — if no codebase exists yet, scaffold a Next.js app and use Tailwind for layout/tokens and Framer Motion for the scroll/reveal/magnetic motion. If a codebase already exists, follow its conventions instead.

> Note: the `.dc.html` file is authored in a streaming "Design Component" format. Ignore the `<x-dc>`/`data-props`/`DCLogic` wrapper mechanics — only the markup, inline styles, and the motion logic inside the `Component` class are meaningful as a reference.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, layout and interactions are all specified. Recreate the UI pixel-faithfully using the codebase's libraries. The only placeholders are the photographic images (see **Assets**) — every image is a styled burgundy/gradient block awaiting a real photo.

---

## Design Tokens

### Colors
| Token | Hex | Usage |
|---|---|---|
| Deep Burgundy | `#6B0012` | Primary brand color; Selected Works background |
| Dark Wine | `#4A000B` | Contact section background; gradient depths |
| Rich Crimson | `#8B0A14` | Accent — marquee bar, accent words, year highlights, dots |
| Ivory | `#F5F1EA` | Primary light text; About background; CTA button bg |
| Warm Beige | `#D8D3C8` | Muted captions on dark/burgundy (`#d8a6ac` is a burgundy-tinted variant used for muted text on burgundy) |
| Pure Black | `#050505` | Hero background; Experience background; body base |

Supporting derived values used in the prototype:
- Muted text on dark: `#9a8f86`, `#c9bfb4`, `#6f655c`
- Muted text on burgundy: `#d8a6ac`, `#e7c4c9`
- Dark text on ivory: `#050505`, `#1c0507`, `#3a2b27`
- Hairline rules: `rgba(245,241,234,0.16–0.22)` on dark/burgundy; `rgba(5,5,5,0.14–0.18)` on ivory
- Grid lines: `rgba(245,241,234,0.06)`

### Typography
Three families, loaded from Google Fonts:
- **Bodoni Moda** (serif, high-contrast editorial) — display names, section titles, pull quotes, role captions. Weights 400–900 + italics. Used for elegant "fashion" moments. Often italic for emphasis.
- **Anton** (single-weight condensed grotesque) — oversized brutalist titles: ABOUT, GET IN TOUCH, the experience years, project titles, stat numbers. Always uppercase.
- **Archivo** (grotesque) — all UI: nav, labels, metadata, captions, body paragraphs. Weights 400–900. Labels are uppercase with wide letter-spacing.

Type treatment rules:
- Display headlines use fluid `clamp()` sizing, e.g. hero name `clamp(72px, 17vw, 260px)`, section titles `clamp(48px–64px, 11–17vw, 180–300px)`, line-height `0.8–0.86`, letter-spacing `-0.01em` to `-0.015em`.
- Labels/metadata: `11px`, weight `600–700`, `text-transform:uppercase`, `letter-spacing:.2em–.32em`.
- Body: `13–17px`, weight `400`, line-height `1.6`.
- Pull quotes: Bodoni Moda `clamp(20px, 2vw, 28px)`, line-height `1.35`.

### Spacing
- Section vertical padding: `clamp(80px, 12vh, 150px)` (Contact: up to `170px`).
- Horizontal page padding / gutter: `clamp(20px, 5vw, 72px)` (used everywhere, including nav and grid overlay — keep consistent).
- Max content width: `1680px`, centered.
- Section-internal rhythm gaps: `clamp(24px–48px, 3–8vh/vw, 96px)`.

### Borders / Radius / Misc
- Image frames: `1px solid` hairline (color per background, see tokens).
- Radius: sharp everywhere **except** the Contact CTA button which is a pill (`border-radius:100px`).
- No box-shadows — depth comes from color blocks and gradients only.
- Grain overlay + thin vertical grid lines are decorative system elements (see below).

---

## Screens / Views

This is one page. Sections in scroll order. All sections share: max-width `1680px` centered, horizontal padding `clamp(20px,5vw,72px)`, and a top "section marker" row (small uppercase label left, secondary label right, hairline rule under).

### 0. Global chrome
- **Fixed nav** (`position:fixed; top:0; z-index:100`): logo "ISA RENN." (Bodoni Moda 700, 19px; the period is crimson `#8B0A14`) on the left; links ABOUT / WORKS / EXPERIENCE / CONTACT↗ on the right (Archivo 600, 11.5px, uppercase, `letter-spacing:.22em`). The whole nav uses **`mix-blend-mode:difference`** with white text so it stays legible over black, ivory and burgundy backgrounds. "Contact" has a bottom border.
- **Grain overlay**: `position:fixed; inset:0; z-index:90; opacity:.085; mix-blend-mode:overlay`, an SVG `feTurbulence` fractal-noise tile (`baseFrequency 0.85`, 3 octaves), `background-size:160px`. Toggleable.
- **Vertical grid lines**: `position:fixed; inset:0; z-index:80;` a 6-column CSS grid (max-width 1680, same gutter as content) with `1px` left borders at `rgba(245,241,234,0.06)`. Decorative Swiss-grid overlay, mostly visible on dark sections. Toggleable.
- Nav links use anchor smooth-scroll (`html{scroll-behavior:smooth}`) to `#about`, `#works`, `#experience`, `#contact`.

### 1. Hero (`#top`) — background `#050505`
- **Purpose**: Brand statement / entry.
- **Layout**: `min-height:100vh`, flex column, vertically centered, generous padding. Layered: name + metadata in normal flow (`z-index:6`), floating portrait absolutely positioned behind/over (`z-index:4`).
- **Components**:
  - Top-right metadata block: "Portfolio" (ivory label) over "2025" (Anton 30px crimson). Has `data-reveal`.
  - **Floating portrait** placeholder: absolute, `top:50%; left:54%; translateY(-46%)`, `width:clamp(190px,21vw,330px)`, `aspect-ratio:3/4`. Burgundy gradient `linear-gradient(150deg,#4A000B,#6B0012 55%,#2a0008)` with a radial ivory glow, 1px ivory-alpha border, caption "( Portrait )" (Bodoni italic) and "FIG. 01" corner tag. Has **parallax** (`data-speed=0.16`).
  - Eyebrow: hairline dash + "Creative Director — Est. Paris" (uppercase, `.32em`).
  - **Name** `<h1>`: two lines, Bodoni Moda weight 500, line-height `0.82`, size `clamp(72px,17vw,260px)`. Line 1 "ISA"; line 2 "Renn" in **italic**, indented `padding-left:clamp(40px,11vw,180px)` so it steps in (oversized type extending beyond the grid). Negative left margin `-0.04em` to bleed off-edge.
  - Statement paragraph (max 430px) + stats row: "12 Years / 40+ Campaigns / 09 Awards" — numbers in Anton 26px ivory, labels in Archivo uppercase.
  - Bottom-left "↓ Scroll to enter" with a pulsing arrow (`@keyframes scrollPulse`, 2.2s).
  - All text elements stagger in via `data-reveal` / `data-reveal-delay` (60–280ms).

### Marquee divider — background `#8B0A14` (crimson)
Full-width band, `1px` ivory-alpha top/bottom borders, an infinite horizontal marquee (`@keyframes marqueeMove`, 26s linear, content duplicated for seamless loop): "Art Direction ◆ Editorial Design ◆ Fashion Campaigns ◆ Photography ◆" in Anton 15px uppercase ivory, `letter-spacing:.18em`, diamonds at 50% opacity.

### 2. About (`#about`) — background `#F5F1EA` (ivory), text `#050505`
- **Purpose**: Bio / positioning.
- **Layout**: Section marker row "01 — About" / "Index / Profile". Giant stacked title, then a 2-column grid (`1.05fr 0.95fr`, gap `clamp(36px,5vw,90px)`).
- **Components**:
  - Title: "About," in **Anton** `clamp(60px,15vw,230px)` (comma is burgundy) + "the maker" in **Bodoni Moda italic** burgundy `clamp(40px,9vw,150px)`, indented `padding-left:clamp(30px,12vw,260px)`.
  - Left: portrait placeholder, `aspect-ratio:4/5`, burgundy gradient `linear-gradient(160deg,#6B0012,#4A000B)`, radial glow, "( Studio portrait )" caption + "FIG. 02 — ATELIER" tag, wrapped in `overflow:hidden` frame; inner block scales to `1.04` on hover (`transition:transform 1.1s cubic-bezier(.16,1,.3,1)`).
  - Right: a Bodoni pull-quote, then two body columns (`1fr 1fr`), then a 2-column meta block ("Disciplines" / "Clients") with hairline top border.
  - Exact copy is in the HTML — reuse verbatim.

### 3. Selected Works (`#works`) — background `#6B0012` (burgundy), text `#F5F1EA`
- **Purpose**: Portfolio / lookbook gallery.
- **Layout**: Marker row "02 — Selected Works" / "2021 — 2025". Title "Selected *Works*" (Bodoni, "Works" italic). Then varied editorial grid:
  1. **Featured** — full-width `aspect-ratio:16/8`, gradient `linear-gradient(135deg,#8B0A14,#4A000B 70%)`, big ghost number "01" in Anton, caption row below with title "MAISON NOIR" (Anton) + "Campaign FW25" (Bodoni italic) + category "Fashion · Art Direction ↗".
  2. **2-up grid** (`1fr 1fr`) — "ATLAS" (Editorial) and "VERRE" (Identity), each `aspect-ratio:4/5`.
  3. **Full-width** `aspect-ratio:16/6` — "CÉLESTE" (Lookbook SS24, Fashion · Print).
- **Components**: every project is an `<a href="#contact">` card. Image is an `overflow:hidden` frame; inner gradient block scales `1.03–1.04` on hover. Ghost project numbers (Anton, ivory at ~10–13% alpha) sit in a corner. Captions: Anton title + Bodoni italic descriptor + Archivo uppercase category with "↗". Each card has `data-reveal`.

### 4. Experience (`#experience`) — background `#050505`, text `#F5F1EA`
- **Purpose**: Career timeline as an editorial spread.
- **Layout**: Marker "03 — Experience" / "Curriculum". Title "The *record*" (Bodoni). Then three rows, each a 3-column grid (`auto 1fr auto`, gap `clamp(20px,4vw,64px)`, baseline-aligned) separated by `1px` hairline top borders (last row also has bottom border), padding `clamp(28px,4vh,46px) 0`.
- **Each row**: oversized year (Anton `clamp(56px,10vw,150px)`, alternating crimson `#8B0A14` / ivory) · role title (Bodoni `clamp(22px,2.6vw,40px)`) + muted description (max 460px) · location label (uppercase, right-aligned, `white-space:nowrap`).
  - 2021 — Studio Designer — Atelier Vox, Paris — "Paris"
  - 2023 — Senior Art Director — Maison Rive — "Milan"
  - 2025 — Independent Creative — Studio practice — "Worldwide"
- Rows stagger in via `data-reveal` (delays 0 / 80 / 160).

### 5. Contact (`#contact`) — background `#4A000B` (dark wine), text `#F5F1EA`
- **Purpose**: CTA + footer.
- **Layout**: Marker "04 — Contact" / "Available Q3 2025". Bodoni italic line "Let's make something worth keeping." Then giant "GET IN / TOUCH." (Anton `clamp(64px,17vw,300px)`, "touch." crimson). Then a flex row: pill CTA on the left, social links on the right. Footer rule at the bottom.
- **Components**:
  - **CTA**: `<a href="mailto:studio@isarenn.com">`, ivory pill (`#F5F1EA`, `border-radius:100px`, padding `20px 34px`), dark text, "studio@isarenn.com ↗", Archivo 700 uppercase `.16em`. **Magnetic** — see interactions.
  - Social links: Instagram / Behance / LinkedIn (uppercase, underlined).
  - **Footer**: hairline top border; "© 2025 Isa Renn — Studio" / "Paris · Milan · Worldwide" (Bodoni italic) / "Pg. 05 / 05". Uppercase muted labels.

---

## Interactions & Behavior

All motion is implemented in JS in the prototype; recreate with Framer Motion (`whileInView`, `useScroll`/`useTransform`, motion values) or equivalent. There is a global motion mode: **expressive** (default), **subtle** (reveals only), **off** (everything shown immediately, no motion).

- **Scroll reveals** (all modes except off): elements start `opacity:0; translateY(46px)` and animate to `opacity:1; translateY(0)` on entering the viewport. Transition `1.05s cubic-bezier(.16,1,.3,1)`. Triggered via IntersectionObserver, `threshold:0.12`, `rootMargin:'0px 0px -8% 0px'`, fired once (unobserve after). Per-element stagger via a delay value (0–280ms).
- **Parallax** (expressive only): the hero floating portrait translates vertically based on scroll position — offset = `(elementCenterY - viewportCenterY) * 0.16`, applied as `translate3d` on top of its base transform, via `requestAnimationFrame` on a passive scroll listener.
- **Magnetic button** (expressive only): the Contact CTA follows the cursor while hovered — `translate(dx*0.28, dy*0.4)` where `dx/dy` are cursor offset from the button center; resets to `0,0` on mouseleave. Transition `transform .2s cubic-bezier(.16,1,.3,1)`.
- **Hover scaling**: every image frame's inner block scales to `1.03–1.04` on hover (`transition:transform 1.1–1.2s cubic-bezier(.16,1,.3,1)`); the frame has `overflow:hidden` so it reads as an image zoom.
- **Marquee**: continuous CSS animation, 26s linear infinite, content duplicated 2× and translated `-50%` for a seamless loop.
- **Scroll-down arrow**: gentle pulse loop (translateY + opacity), 2.2s infinite.
- **Smooth scroll**: anchor nav uses native `scroll-behavior:smooth`.
- **Nav legibility**: `mix-blend-mode:difference` keeps the white nav readable on all backgrounds — preserve this rather than swapping nav colors per section.

## State Management
Minimal. The page is largely static content. State needed:
- Motion mode flag: `'expressive' | 'subtle' | 'off'` (default `expressive`).
- Toggle flags: `grain` (bool, default true), `gridLines` (bool, default true) — show/hide the two decorative fixed overlays.
- IntersectionObserver "has revealed" tracking is per-element and one-shot (Framer Motion's `whileInView` with `viewport={{ once:true }}` covers this).

No data fetching. If projects/experience become CMS-driven later, model them as arrays of `{ number, title, descriptor, category, aspectRatio, gradient }` and `{ year, role, org, location, accent }`.

## Assets
**No real image assets exist** — every photo is a CSS gradient placeholder block with a caption and a "FIG." tag:
- Hero portrait (3/4), About studio portrait (4/5), and four Selected Works blocks (16/8, two 4/5, 16/6).
- Replace each with real fashion/portrait/editorial photography. Keep the `overflow:hidden` frame + hover-zoom and the 1px hairline border treatment.
- **Fonts**: Bodoni Moda, Anton, Archivo — from Google Fonts. In Next.js use `next/font/google`.
- **Grain texture**: inline SVG `feTurbulence` data-URI (no external file). Reproduce as a small SVG/PNG noise tile or an inline data-URI.
- No icon set is used — arrows are the Unicode glyphs ↗ (`\u2197`) and ↓ (`\u2193`); diamonds are ◆ (`\u25C6`).

## Files
- `ISA RENN Portfolio.dc.html` — the complete design reference (markup + inline styles + motion logic). All exact copy, colors, sizes, gradients and timings live here; this README summarizes them but the file is the source of truth for any detail.

## Responsive notes
The prototype is built fluid-first with `clamp()` and `vw` units, so it degrades reasonably at smaller widths, but the **multi-column grids are not yet broken down for mobile**. When implementing, add breakpoints to:
- Collapse the About 2-column grid and the Selected Works 2-up grid to single column under ~768px.
- Stack the Experience 3-column rows (year above role above location) under ~640px.
- Reduce nav links to a menu (or keep inline if they fit) and tighten section padding on mobile.
