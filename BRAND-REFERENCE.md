# SnapFlow — shared web and print brand reference
Updated November 8, 2026. Source: inspected redesigned homepage, two category pages, CSS and original horizontal SVG. This is the current visual specification; older DESIGN-SYSTEM.md describes legacy pages. The physical approved folder artwork was not supplied for direct measurement, so alignment follows Chris’s approved white-folder direction.

## Identity and message
Tagline: **More Leads. Less Admin. A More Organized Business.**
Audience: **Built for owner-operators & growing teams.**
In ten seconds, establish the service, intended customer, and practical benefit. Short descriptions and concrete examples; no invented results. Services may be purchased individually or combined.

Use this exact order:
1. Websites & Landing Pages
2. Google Ads & Local SEO
3. Customer Communication
4. Customer Management & Admin Automation
5. Data Analysis & Reporting

## Exact palette
| Role | HEX | Usage |
|---|---|---|
| White | #FFFFFF | Primary page, folder and sales-sheet ground |
| Navy | #002B43 | Headings, logo name, buttons and primary text |
| Deep navy | #001C2D | Small contrast areas, not large page backgrounds |
| Ink | #0B2231 | Long-form body text |
| Muted | #57697A | Supporting copy |
| Gold | #B8892C | Restrained rules and accents |
| Dark gold | #7D6228 | Readable gold labels on white |
| Light gold | #E0BA5C | Highlights and artwork |
| Warm surface | #F5F4F0 | Small supporting surfaces, not dominant background |
| Neutral rule | #E3DDD2 | Fine card and section borders |
| Supporting blue | #347DA9 | Secondary artwork / interaction accents |
| Button outline | #79B1E4 | 1px border |
| Button halo | #DCECFF | Thin outer halo |

Logo-specific colors must remain intact: navy #002B43; “Solutions” #997020; gold symbol gradient #8B5E12 → #B8892C → #E0BA5C → #F5D88A. Do not flatten the original logo to the page accent gold.

## Logo assets
Primary: `assets/redesign/snapflow-horizontal-gold-navy.svg`. Transparent vector, 1500 × 440 viewBox; aspect ratio 75:22. Symbol gold, name navy, Solutions gold. Lettering is outlined vector paths (scalable, not editable live typography). Preserve proportions; never recreate by typing the name or stretch/crop the mark.
Web display: header 270px wide desktop, 220px tablet (210px at constrained navigation widths), 210px mobile; footer 260px. Height auto. Clear space recommendation: at least 1/4 of the complete lockup’s height on all sides. Print starting width: 2.25 inches or larger; proof the small “Solutions” lettering at actual size.
Legacy PNG variants: `assets/snapflow-logo-lockup-navy.png` and `assets/snapflow-logo-lockup-transparent.png`, both 239 × 200 pixels. Retained for history, not print masters. No new reversed/monochrome variant approved in this pass.

## Typography
Inter throughout the redesigned site: 400 body, 500 emphasis, 600 headings/buttons, 650 selected labels, 700 small strong labels. Fallback system-ui, sans-serif. Logo lettering is artwork; do not substitute Inter into it.
| Element | Desktop | Mobile | Treatment |
|---|---|---|---|
| Hero H1 | fluid 36–56px | 36px | 600, line-height 1.12, tracking −.035em |
| Section H2 | fluid 30–42px | 30px | 600, line-height 1.2, tracking −.035em |
| Homepage service title | 38px | 30px (28px narrow) | 600, line-height 1.12–1.2 |
| Small card title | 24px | 22px | 600, line-height 1.25 |
| Body | 18–19px | 17–18px | 400, line-height 1.6–1.75 |
| CTA button | 16px | 16px | 600, line-height 1.4 |
| Supporting labels/captions | 14–16px | 14–16px | Do not shrink substantive copy to captions |

These are shared component rules; illustrative dashboard labels and small image captions may be smaller. Future category H3 token: fluid 24–30px. Print starting scale: titles 26–32pt, section headings 16–20pt, body 10.5–12pt, labels 9–10pt. Review printed at 100%, not just zoomed on screen.

## Components and spacing
Shared CSS source: `css/redesign.css`, root tokens plus final shared web/print brand block. `.sf-glow-button` is the single action style; `.sf-card` is the shared card shell. Legacy CSS remains isolated for old pages.
- Layout maximum 1200px; side gutters 24px (16px on the narrowest screens).
- 8px spacing base; usual gaps 16/24/32px. Sections 80px vertical desktop, 48px mobile.
- Card padding 32px desktop, 24px mobile. White surface, #E3DDD2 1px rule, radius 16px (12px mobile), very faint navy shadow. Homepage feature-card layout retains its responsive internal spacing.
- Gold divider sparingly: 1px on web; use 0.5–0.75pt for print. Avoid boxing every paragraph.
- Button: white, navy text, 1px #79B1E4 border, 10px radius, minimum 48px high, padding 13px 22px. Normal glow `0 0 0 1px #DCECFF, 0 0 14px #4B9FE021`; hover glow `0 0 0 1px #DCECFF, 0 0 18px #4B9FE035`. Hover pale blue #EAF4FF; border #347DA9. Keyboard focus 3px navy, 4px offset. Reduced motion respected.

## Vibrant images and print translation
Retain the approved blue/gold service artwork, gradients, and restrained lighting. Let one dominant image carry each sales sheet; surround it with white space and readable navy copy. Folder stays simpler: original logo, tagline, restrained accents.
Printed glow is a soft colored halo, not emitted light. Preserve gradients in artwork; use a crisp flat border beneath any faint halo. Contact callouts can echo the website outline, but have no hover state. Do not place small white copy on a weak halo. Ordinary gold is simulated color, not metallic foil.
For production artwork use vector logo/text/rules and raster imagery at 300ppi at placed size. A 1536 × 1024 image supports 5.12 × 3.41 inches at 300ppi; wider placement needs a larger source. Keep text live/vector in the layout, not baked into generated images when exact copy matters.
HEX is the digital master, not a universal CMYK recipe. Convert using the printer’s requested ICC profile/PDF settings and review a proof, especially blue saturation, gold and faint gradients. Use their exact folder die line, bleed and safe-area template. Browser print styles remove button glows/shadows; the folder and sheets require dedicated print layouts.

## Preservation and launch status
This pass changes shared visual CSS and adds presentation classes/cache keys only. Existing text, links, forms, scripts, tracking attributes, image files and integration code are preserved. Production remains untouched. The redesigned homepage already had a deliberately non-submitting preview form and no production analytics: those existing launch blockers remain in REDESIGN-HANDOFF.md. Do not interpret this visual pass as launch approval.
