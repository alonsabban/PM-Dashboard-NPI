---
name: PM Dashboard
description: A personal command center that reads like a factory-floor andon board — status you scan as light, not text you parse.
colors:
  aluminum-floor: "#eeece2"
  panel-face: "#f8f6ef"
  recessed-plate: "#e6e2d3"
  charcoal-ink: "#201f19"
  charcoal-ink-secondary: "#5a564a"
  charcoal-ink-muted: "#8b8674"
  gridline: "#d9d4c2"
  safety-amber: "#eba617"
  safety-amber-ink: "#2b1e02"
  signal-green: "#2f8a41"
  signal-amber: "#e0a01a"
  signal-orange: "#d9702a"
  signal-red: "#cf3626"
  sheen-chip: "rgba(255, 255, 255, 0.18)"
  shade-chip: "rgba(0, 0, 0, 0.35)"
  rivet-dot: "rgba(255, 255, 255, 0.3)"
  sheen-glass: "rgba(255, 255, 255, 0.4)"
  sheen-gloss: "rgba(255, 255, 255, 0.5)"
  shade-gloss: "rgba(0, 0, 0, 0.12)"
  shade-press: "rgba(0, 0, 0, 0.25)"
  scrim: "rgba(20, 19, 14, 0.4)"
typography:
  display:
    fontFamily: "Big Shoulders, Big Shoulders Text, Arial Narrow, sans-serif"
    fontSize: "17px – 40px"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "0 – 0.02em"
  body:
    fontFamily: "-apple-system, Segoe UI, system-ui, sans-serif"
    fontSize: "12.5px – 14.5px"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  sm: "3px"
  md: "4px"
  lg: "5px"
spacing:
  xs: "6px"
  sm: "10px"
  md: "16px"
  lg: "22px"
components:
  button-primary:
    backgroundColor: "{colors.safety-amber}"
    textColor: "{colors.safety-amber-ink}"
    rounded: "{rounded.sm}"
    padding: "9px 16px"
  button-secondary:
    backgroundColor: "{colors.panel-face}"
    textColor: "{colors.charcoal-ink}"
    rounded: "{rounded.sm}"
    padding: "9px 16px"
---

# Design System: PM Dashboard

## Overview

**Creative North Star: "The Factory Andon Board"**

PM Dashboard reads like the wall-mounted status board on a manufacturing line: a PM working NPI hardware programs already knows this object by heart, and it exists to answer one question at a glance — what needs me right now. Status is never a soft SaaS pill you have to parse; it is a lit signal, a colored panel, a tabular readout, the same vocabulary as the andon lights and line counters on a real factory floor. The system stays functional first — this is a tool opened many times a day for fast triage, not a showcase — but its industrial materials (brushed-panel bezels, stenciled condensed display type, safety-color signal lamps) give it a point of view no generic admin dashboard has.

This redesign replaced a conventional rounded-card SaaS-admin shell (soft shadows, blue accent, generic sidebar) that was functionally sound but visually interchangeable with any dashboard template. Nothing about the underlying product changed: same routes, same data, same edit-writes-back-to-Asana behavior.

**Key Characteristics:**
- Status is a physical signal (lamp, lit tile, colored panel), always paired with a text label — never color alone.
- Condensed industrial display type (Big Shoulders) for headings and readouts; a plain workhorse system sans for body and data, because density beats expression at the table level.
- Panels read as bezeled hardware, not floating cards: inset highlight/shadow lines simulate a brushed metal edge instead of a drop shadow halo.
- Numbers are tabular and, where they carry ranking (scores), right-aligned like a manifest sheet.

## Colors

Warm aluminum neutrals carry the floor; safety colors are reserved entirely for status and never used decoratively.

### Primary
- **Safety Amber** (`#eba617`): the one interactive/active color — primary buttons, the active nav station's lamp and background tint, focus rings. Always paired with dark ink text (`#2b1e02`), never white, for contrast on a light, saturated ground.

### Neutral
- **Aluminum Floor** (`#eeece2`): the page ground — a warm, slightly warm-gray "daylight factory floor," not stark white.
- **Panel Face** (`#f8f6ef`): card/panel surfaces, sits a shade lighter than the floor so panels read as mounted plates.
- **Recessed Plate** (`#e6e2d3`): panel headers and table header rows — a visibly "stamped" recessed strip.
- **Charcoal Ink** (`#201f19`) / **Secondary** (`#5a564a`) / **Muted** (`#8b8674`): text hierarchy, warm-toned rather than true gray so it sits inside the same material family as the ground.
- **Gridline** (`#d9d4c2`): table rules and dashed section dividers.

### Status (functional only — never decorative)
- **Signal Green** (`#2f8a41`) — on track / done.
- **Signal Amber** (`#e0a01a`) — at risk.
- **Signal Orange** (`#d9702a`) — serious / secondary escalation tier.
- **Signal Red** (`#cf3626`) — blocked / critical.

On the Overview tile wall, status color fields the whole tile at ~13–16% mix into the panel ground (a tinted panel, not a saturated block), while the signal lamp itself carries the full saturated color — this keeps body text on the tile readable while the lamp stays a true, legible light. Tile text tints toward the status hue rather than sitting gray, per the system's own contrast rule.

### Named Rules
**The Paired Signal Rule.** Status is never carried by color alone: every lamp, tile, or badge ships beside a text label (a WCAG/colorblind-safety rule the original app already followed; this redesign kept it as a hard invariant).

## Typography

**Display Font:** Big Shoulders (condensed, weight 700), with Big Shoulders Text for smaller stenciled labels — fallback `Arial Narrow, sans-serif`.
**Body Font:** system stack — `-apple-system, "Segoe UI", system-ui, sans-serif`.

**Character:** Big Shoulders is modeled on Chicago-era industrial signage lettering — it's the closest real typographic match to stamped station plates and factory placards, used only for headings, nav station numbers, and the big tabular readouts. Everything data-dense (tables, forms, body copy) stays on the plain system sans, because Operate-mode density and legibility outrank display personality at that scale.

### Hierarchy
- **Display** (700, 30–40px, uppercase): page `<h2>` titles and the Overview readout digits.
- **Title** (700, 14–17px, uppercase, condensed): card/panel titles, brand wordmark, drawer header.
- **Label** (700, 10.5–12px, uppercase, letter-spacing 0.03–0.1em): table column headers, nav station numbers, section labels, form labels.
- **Body** (400–600, 12.5–14.5px): table cell content, hints, paragraph copy.

### Named Rules
**The Stencil-For-Structure Rule.** Big Shoulders marks structure (headings, labels, readouts) — it never appears in editable field values or long-form body copy, where the workhorse sans stays in control.

## Layout

Sidebar (240px, collapses to a horizontal station bar under 860px) + a single scrolling main column (max-width 1160px). Content density is high: table rows at 10px vertical padding, panel margin-bottom 18px, one consistent rhythm throughout (more space above a heading than below it — view headers close with a dashed rule and 22px of clearance before the first panel). Overview's tile wall is a `repeat(auto-fill, minmax(240px, 1fr))` grid that collapses to one column on mobile; data tables stay literal (no responsive card-ification) and scroll horizontally under 860px rather than dropping columns, since a manifest sheet losing a column is a worse failure than a horizontal scroll.

## Elevation & Depth

Hybrid: panels use a bezel simulation, not a drop-shadow system. Every panel-class surface (`.card`, `.tile`, `.readout`, buttons, nav) carries an inset top highlight + inset bottom shade to read as a beveled physical plate, plus a soft ambient shadow only on `.card` (the one true "floating" surface) to lift it off the page.

### Shadow Vocabulary
- **Bezel** (`inset 0 1px 0 var(--bezel-hi), inset 0 -1px 0 var(--bezel-lo)`): the default panel/tile/button edge treatment — simulates a machined metal lip.
- **Ambient card lift** (`0 1px 2px rgba(shadow,.05), 0 10px 22px -18px rgba(shadow,.45)`): used only on `.card` panels to separate them from the page.
- **Lamp glow** (`0 0 7px 1px color-mix(lamp-color 55%, transparent)`): the signal-lamp's own soft halo — the only decorative-feeling glow in the system, and it's load-bearing (it's what makes a lamp read as lit rather than printed).

A second, smaller family of alpha overlays simulates specific physical materials beyond the general panel bezel. Unlike `--bezel-hi`/`--bezel-lo`, these are declared once (not per light/dark theme) — they're relative alpha overlays, not theme-mapped hexes, so the same value reads correctly on either ground:

- **Sheen Chip** (`--sheen-chip`, `rgba(255,255,255,.18)`) / **Shade Chip** (`--shade-chip`, `rgba(0,0,0,.35)`): the brand-mark's bevel — a subtler highlight/deeper shadow pairing than the general panel bezel, tuned for a small dark chip. `--shade-chip` doubles as the signal lamp's inset shadow (same physical material: a small glass-over-metal dome).
- **Rivet Dot** (`--rivet-dot`, `rgba(255,255,255,.3)`): the brand-mark's corner rivets.
- **Sheen Glass** (`--sheen-glass`, `rgba(255,255,255,.4)`): the signal lamp's glass highlight — brighter than a chip bevel because it's simulating a lit dome, not a flat plate.
- **Sheen Gloss** (`--sheen-gloss`, `rgba(255,255,255,.5)`) / **Shade Gloss** (`--shade-gloss`, `rgba(0,0,0,.12)`): the primary button's glossy top/bottom bevel — the strongest highlight in the system, reserved for the one push-button material. Hover intensifies both via `color-mix()` against white/black rather than new literals.
- **Shade Press** (`--shade-press`, `rgba(0,0,0,.25)`): the button's pressed-state inset shadow — a distinct, deeper material moment from its resting bevel.
- **Scrim** (`--scrim`, `rgba(20,19,14,.4)`): the drawer backdrop overlay — a warm dark scrim, correct in both themes.

### Named Rules
**The Bezel-Not-Shadow Rule.** A panel's edge is a machined lip (inset highlight/shade), not a floating drop shadow. Drop shadows are reserved for `.card` alone, where the surface genuinely sits above the page.
**The Named Overlay Rule.** Every alpha white/black overlay used more than once is a declared custom property, never a repeated literal — if a new bevel or glass material is needed, name it and add it here rather than inlining a fresh `rgba()`.

## Shapes

Small, consistent radii (3–5px) — enough to soften a stamped metal edge, never a soft "app" rounded-rectangle. Buttons, inputs, tiles, and panels all share the same 3–5px scale; the brand mark is the one sharper element (4px) to read as a machined plate. Borders are 1px hairlines in all cases; the only exception is the 3px lamp-style dot used for the active-nav indicator (a physical light, not a decorative bar).

## Components

### Buttons
- **Shape:** 3px radius, uppercase label, 0.03em tracking, 12.5px bold.
- **Primary:** Safety Amber background with a highlight-gradient top edge, dark ink text, inset bezel; press state translates the button down 1px with an inset shadow (a real push-button action, not a color fade).
- **Secondary:** Panel Face background, same bezel, no fill — used for lower-emphasis actions (Create GINI Deck, Cancel).
- **Disabled:** 45% opacity, no shadow, cursor default.

### Signal Lamp (signature component)
A small physical-feeling status light: radial-shaded circle with inset highlight/shadow and a soft colored glow, ringed by a faint halo of its own color mixed into the surface. Always rendered beside a text status label (`.status-badge`), and reused at two scales — 10px inline in tables, 12px on Overview tiles.

### Cards / Panels
- **Corner Style:** 5px radius.
- **Background:** Panel Face, with a Recessed Plate header strip.
- **Shadow Strategy:** Bezel edge + ambient card lift (see Elevation).
- **Internal Padding:** 18px title / 10–18px table cells.

### Inputs / Fields
- **Style:** 3px radius, Aluminum Floor background (a shade darker than the panel it sits on, reading as a recessed slot), inset shadow, 1px border.
- **Focus:** border shifts to Safety Amber; no glow ring beyond the standard `:focus-visible` outline.

### Navigation
Sidebar restyled as a "station directory": each route is numbered (01–05) in a small tabular Big Shoulders Text label, not a decorative eyebrow — the number is the station's real identity in the andon-board metaphor. Active state = amber background tint + amber station number + a small lit lamp dot at the row's trailing edge (replacing the generic colored-left-border pattern the previous shell used). Mobile (<860px) collapses the sidebar into a horizontal wrapping bar and hides the section label/spacer.

### Tile Wall (signature component)
Overview's status-tile grid: one tile per NPI project, its background tinted from the worst status among that project's tasks, a lamp in the header, a count line ("2 of 3 flagged" / "All clear"), and up to three flagged task rows. This is the system's first-viewport thesis — status as a lit wall, not a filtered table.

## Do's and Don'ts

### Do:
- **Do** pair every status color with a text label (lamp + word), never color alone.
- **Do** use Big Shoulders only for structure (headings, labels, readouts, station numbers) and keep tables/forms on the system body sans.
- **Do** right-align and tabular-number any ranked or comparable numeric column (scores, counts).
- **Do** keep the bezel (inset highlight/shadow) as the default panel edge; reserve real drop shadows for `.card` alone.

### Don't:
- **Don't** reintroduce a colored `border-left`/`border-right` as a generic active-state indicator — use the lamp-dot pattern instead.
- **Don't** saturate a tile or panel background to full status color; tint at ~13–20% into the panel ground and let the lamp carry full saturation.
- **Don't** animate `padding`/`width`/`height` for hover states — use `transform`/`color`/`background` transitions only.
- **Don't** use white text on the Safety Amber accent; it fails contrast — dark ink (`#2b1e02`) is the only paired text color for that surface.
