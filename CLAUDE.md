> November 8, 2026 redesign override: Work on `redesign/approved-homepage`, never push to main or deploy production without Chris’s launch approval. Netlify production branch is main; pull requests create public previews. The approved homepage uses css/redesign.css and assets/redesign/ to keep legacy page styling intact. Current approved audience: owner-operators and growing teams, nationwide. Five categories: Websites & Landing Pages; Google Ads & Local SEO; Customer Communication; Customer Management & Admin Automation; Data Analysis & Reporting. New approved design uses Inter, cream, navy, gold and blue accents. These instructions supersede conflicting older branding, architecture and deployment notes below. Homepage is preview-only: noindex and non-submitting contact form must be addressed before launch. Preserve existing URLs, backend and tracking configuration.

# CLAUDE.md — Snap Flow Solutions Project Context

> **Read this file at the start of every session.** It is the single source of truth for project context, architecture, and rules.

---

## Business Identity

- **Business Name:** Snap Flow Solutions
- **Owner:** Chris Pearce
- **Location:** Clinton Township, MI (no street address published — home-based)
- **Service Area:** Metro Detroit — Macomb, Oakland and Wayne counties. Cities named on the site:
  Clinton Township, Sterling Heights, Warren, St. Clair Shores, Shelby Township, Macomb Township,
  Roseville, Eastpointe, Fraser, Mt. Clemens, Harrison Township, Utica, Chesterfield, New Baltimore,
  Grosse Pointe, Troy, Royal Oak, Rochester Hills. Remote work where it makes sense.
- **Phone:** (586) 400-2943 — `tel:+15864002943`. Confirmed by Chris on 2026-07-28 and live on the site.
  Do not use the Georgia number (423) 208-9982.
- **Email:** hello@snapflowsolutions.com
- **Website:** https://snapflowsolutions.com

### Positioning (approved August 16, 2026 — current identity)
Snap Flow Solutions is a **digital marketing and business growth agency for service businesses**.
Digital marketing is the leading market category. Local SEO, Google Maps, Google Ads, websites,
landing pages, lead generation, reputation, CRM and conversion tracking are core revenue services.
Business consulting and operations improvement are major differentiators. AI implementation and
automation are technology differentiators. The company should never be presented as SEO-only,
AI-only, automation-only, or as a vague consultancy that hides its marketing services.

- **Mission:** help owner-operated service businesses get found, generate qualified leads, improve
  operations, and implement practical AI systems that produce measurable business growth.
- **Who we serve:** owner-operated service companies, roughly 2–50 employees — HVAC, plumbing,
  electrical, roofing, painting, concrete, landscaping, excavation, garage doors, flooring,
  remodeling, auto repair, collision, body shops, PDR, chimney, general contractors.
- **Voice:** one experienced business owner talking to another. Plain, direct, practical. No
  corporate speak, no hype. Avoid: strategy, methodology, architecture, optimization, transformation,
  operational excellence, digital transformation.
- **Engagement options:** (1) I know what I need — build one project. (2) Help me decide where to
  improve — the Business Architecture Assessment. (3) Ongoing partner.
- **Pricing:** no prices published. Quoted after scope is defined or after the Business Architecture Assessment.

### Social Profiles
⚠️ All of these were set up for the Georgia market and need verifying or rebuilding for Michigan
before being cited anywhere on the site.
- Facebook: https://www.facebook.com/snapflowsolutions
- Instagram: https://www.instagram.com/snapflowsolutions
- LinkedIn: https://www.linkedin.com/company/snapflowsolutions
- Google Business Profile: needs to be created/relocated for Clinton Township, MI
- Yelp: the existing listing is Ringgold, GA — stale

### Chris Pearce Bio (for E-E-A-T content)
Chris ran Incidents Paintless Dent Removal for 28 years, doing all of his own marketing and ranking
first on Google across his service area. He now runs Snap Flow Solutions out of Clinton Township,
Michigan, helping owner-operators fix the things he lived with for three decades: missed calls, slow
follow-up, weak online presence, and work lost to whoever answered faster. Member of BNI.

Claim carefully: "nearly 30 years as an owner-operator" refers to the PDR business, not to Snap Flow.

---

## Site Architecture

### Tech Stack
- **Hosting:** Netlify (auto-deploys on git push)
- **Repo:** github.com/flowbotxai/flowbotx-site (SSH to PowerOS VPS at 187.77.198.66)
- **Stack:** Static HTML/CSS/JS — no framework, no build step
- **CSS:** Single file at `css/style.css`
- **JS:** Single file at `js/main.js` (FAQ toggles, hamburger menu, smooth scroll)
- **Fonts:** Google Fonts — Newsreader (400-600), Inter (400-600), IBM Plex Mono (400-500)
- **Form:** native HTML form posting to the same-origin Netlify Function at
  `/.netlify/functions/contact`. The function forwards to GoHighLevel using the
  server-only `GHL_CONTACT_WEBHOOK_URL` environment variable.
- **Analytics:** GA4 — G-YQFQY5E471, plus UTM/click-ID capture in `index.html`

### File Structure
```
/
├── index.html          ← Homepage — the whole site's story lives here
├── privacy-policy/index.html
├── terms/index.html
├── thank-you.html      ← Form submission thank you
├── sitemap.xml         ← 3 URLs: /, /privacy-policy/, /terms/
├── robots.txt          ← AI crawlers explicitly allowed
├── netlify.toml        ← publish root, functions directory, redirects, security headers
├── netlify/functions/contact.mjs ← validates form posts and forwards to GHL
├── css/style.css       ← ALL styles
├── js/main.js          ← ALL scripts
├── preview.html        ← generated, gitignored (see Preview below)
├── assets/
│   ├── snapflow-logo-lockup-navy.png         ← header
│   ├── snapflow-logo-lockup-transparent.png  ← footer / navy grounds
│   ├── snapflow-mark-square.png              ← favicon, GBP, social avatar
│   ├── snapflow-logo-gold-navy.png           ← full-res original, print
│   ├── og-image.jpg                          ← 1200x630 share card
│   └── chris-pearce-headshot.jpg             ← PLACEHOLDER — needs real photo
├── CLAUDE.md           ← This file
└── DESIGN-SYSTEM.md    ← Component/style reference
```

The Chattanooga-era pages (`/chattanooga/`, `/faq/`, `/about/`, `/blog/`) were removed in the
Michigan rebuild. Their content is recoverable from git history if subpages are rebuilt.

### Homepage Section Order (IDs are anchor targets — don't rename casually)
1. Hero — headline, one paragraph, Send Us a Message + Call or Text Us
2. `#improve` — who we work with (trade chips) + "you don't have to buy everything"
3. `#systems` — 22 service tiles in 7 categories (Getting Found, Winning More Work, Customer
   Communication, Daily Operations, Workforce & Training, Know the Numbers, Capital Allocation)
4. `#how` — Understand / Recommend / Build / Measure + the 30 / 1 / 0 stat row
5. `#review` — Business Architecture Assessment (optional): framed panel listing the ten
   areas analyzed, the deliverables, and the "you keep the plan" closing
6. `#proof` — "What we usually find" (industry-level, no client named)
7. `#engagements` — three ways to work together
8. `#service-area` — city chips
9. `#faq` — 6 questions
10. `#contact` — single centered column form
11. Footer + mobile sticky CTA bar

### Outstanding Placeholders
- `[GOOGLE_MAPS_API_KEY]` — address autocomplete on the contact form. Inert: the whole Maps
  `<script>` is commented out in `index.html`, and the field works as a plain text input until
  a key is added. Note that `initAddressAutocomplete` in `js/main.js` also requires an element
  with `id="address-field"` wrapping the input, which the markup does not currently have.

The webhook and phone-number placeholders are all resolved — Netlify stores the live GHL endpoint
as `GHL_CONTACT_WEBHOOK_URL`, and every phone link is a real `tel:+15864002943`. The 5 photo/screenshot placeholder
boxes were removed when the homepage was rebuilt; the only images on the site now are the two
logo lockups and the hero.

### Preview Workflow
`preview.html` is a generated single file with CSS and JS inlined, for reviewing without a server:
```bash
python3 -c "
h=open('index.html').read()
h=h.replace('<link rel=\"stylesheet\" href=\"css/style.css\">','<style>'+open('css/style.css').read()+'</style>')
h=h.replace('<script src=\"js/main.js\"></script>','<script>'+open('js/main.js').read()+'</script>')
open('preview.html','w').write(h)"
```

### Deploy Process
```bash
git add .
git commit -m "descriptive message"
git push
# Netlify auto-deploys within ~30 seconds
# Then: Google Search Console → resubmit sitemap.xml → request indexing
```
Current working branch: `rebuild`. Main branch is `main`.

---

## Design System

### Brand Colors (navy + gold — the blue/cyan palette is retired, do not use it)
Defined as CSS custom properties in `css/style.css` — always use `var(--token)`, never raw hex.
- `--navy` `#002B43` — primary: buttons, dark sections
- `--navy-deep` `#001C2D` — footer, button hover
- `--white` `#FFFFFF` — page background, tiles
- `--surface` `#F5F4F0` — warm off-white, alternating sections
- `--line` `#E3DDD2` — borders, rules, dividers
- `--ink` `#0B2231` — body text and headings on light
- `--muted` `#57697A` — secondary text
- `--gold` `#B8892C` — accent rules, phone/Call buttons
- `--gold-deep` `#7D6228` — gold text on light (labels, eyebrows)
- `--gold-light` `#E0BA5C` — gold on navy

Logo file colors (for print/signage only): navy `#011A34`, gold `#E6B74C`.

### Typography
- `--display` — **Newsreader** (400, 500, 600) — headings, display
- `--body` — **Inter** (400, 500, 600) — body text, buttons
- `--mono` — **IBM Plex Mono** (400, 500) — labels, eyebrows, figures, chips
- Outfit is retired — do not reintroduce it.

### Logo Assets
- `assets/snapflow-logo-lockup-navy.png` — header (keeps its navy ground, rounded corners)
- `assets/snapflow-logo-lockup-transparent.png` — footer and any navy background
- `assets/snapflow-mark-square.png` — favicon, GBP, social avatar
- `assets/snapflow-logo-gold-navy.png` — full-resolution original for print
- `assets/og-image.jpg` — 1200x630 share card

### CSS/HTML Patterns (BEM classes from style.css)
Always use these existing classes — do NOT invent new ones unless absolutely necessary:

**Navigation:**
`nav`, `nav__inner`, `nav__logo`, `nav__links`, `nav__actions`, `nav__hamburger`, `nav__mobile`

**Sections:**
`section`, `section__header`, `section__label`, `section__title`, `section__sub`, `container`

**Hero:**
`hero`, `hero__eyebrow`, `hero__title`, `hero__sub`, `hero__actions`, `hero__stats`, `hero__stat`, `hero__stat-number`, `hero__stat-label`

**Cards/Grids:**
`solution__grid`, `solution__card`, `solution__icon`
`problem__grid`, `problem__card`, `problem__icon`
`pricing__grid`, `pricing__card`, `pricing__card--featured`, `pricing__badge`, `pricing__name`, `pricing__price`, `pricing__setup`, `pricing__desc`, `pricing__features`

**Steps:**
`steps__grid`, `step__card`, `step__number`

**FAQ:**
`faq__list`, `faq__item`, `faq__question`, `faq__toggle`, `faq__answer`, `faq__answer-inner`

**Checkup:**
`checkup-section`, `checkup-section__inner`, `checkup-section__content`, `checkup-section__visual`, `checkup-card`

**Form:**
`form-section`, `form-section__inner`, `form-section__embed`

**Footer:**
`footer`, `footer__inner`, `footer__logo`, `footer__tagline`, `footer__links`, `footer__email`, `footer__bottom`

**Buttons:**
`btn`, `btn--primary`, `btn--outline`, `btn--ghost`, `btn--sm`

**Other:**
`sticky-cta`, `financing-banner`, `financing-badge`

### Contact Form (native, in `index.html` — the GHL iframe embed is retired)
The form posts to `/.netlify/functions/contact`; the function forwards to the GHL webhook stored in
the `GHL_CONTACT_WEBHOOK_URL` Netlify environment variable. It sends these field names:
`first_name`, `last_name`, `business_name`, `phone`, `email`, `website`, `address`, `message`,
plus hidden `utm_source|medium|campaign|term|content`, `gclid`, `gbraid`, `wbraid`, `fbclid`,
`landing_page`, `referrer`.

Markup pattern: `.contact__centered` wrapper (single centered column, 620px), `.field` /
`.field-row` for paired inputs, `.contact__submit` for the button.

### Section CTA pattern (use at the end of every section)
```html
<p class="section__cta">
  <a href="#contact" class="btn btn--primary">Send Us a Message</a>
  <a href="tel:+15864002943" class="btn btn--gold" data-track="phone_tap">Call or Text Us</a>
</p>
```
Gold always means "phone". Every `tel:` link carries `data-track="phone_tap"` for GA4.

---

## SEO State

⚠️ The Michigan rebuild is **not deployed**. Everything below describes the current repo state, not
what is live at snapflowsolutions.com.

### What exists in the repo
- **Homepage:** title, meta description, OG + Twitter cards, canonical, geo meta (`US-MI`,
  Clinton Township), favicon + apple-touch-icon, `og-image.jpg` in current brand
- **Schema:** ProfessionalService with Clinton Township address, founder, and 12 `areaServed` cities
- **Technical:** robots.txt (AI crawlers allowed), sitemap.xml (3 URLs), GA4 `G-YQFQY5E471`
- **Tracking:** UTM + click-ID capture (gclid/gbraid/wbraid/fbclid) persisted to sessionStorage and
  written into hidden form fields; `generate_lead` and `phone_tap` events fire to GA4

### Blockers before any of this can rank
- [ ] Michigan phone number — the site has placeholders
- [ ] Form webhook — no submissions go anywhere yet
- [ ] Google Business Profile for Clinton Township (nothing ranks locally without it)
- [ ] Real photos in the 5 placeholder slots
- [ ] Citations/NAP rebuilt for the Michigan address
- [ ] Reviews — the Georgia review history does not transfer

### Not started
- [ ] Location pages (`/clinton-township/`, `/sterling-heights/`, `/warren/`, …)
- [ ] Rebuilt `/faq/`, `/about/`, `/case-studies/` subpages — homepage copy was cut to ~1,600 words
      in July 2026 and the long-form content is in git history, ready to seed these
- [ ] Dedicated ad landing pages (ads should never point at the homepage)

### Target Keywords
⚠️ The old keyword set is void. The only active keyword and competitor evidence is the August 16,
2026 Snapflow AI Clinton Township-radius DataForSEO research in the canonical Notion workspace.

Approved demand clusters: digital marketing agency/services, local SEO and Google Maps, Google Ads
and paid-search management, lead generation and conversion systems, business consulting and
operations improvement, and AI implementation/automation. Target only the portions of Macomb and
Oakland counties inside the approved approximately 15-mile service radius. Do not create a thin page
for every town or use older location, keyword, competitor, or SEO material.

---

## Rules & Constraints

### ALWAYS:
- Use the existing BEM classes in `css/style.css`; add new ones only when nothing fits, and append
  them to the bottom block of the file
- Use `var(--token)` for color, never a raw hex
- Gold = phone. Every `tel:` link carries `data-track="phone_tap"`
- Keep the two CTAs paired and equal weight: Send Us a Message + Call or Text Us
- GA4 `G-YQFQY5E471` on every page
- Unique title, meta description, OG + Twitter tags, canonical and geo meta on every page
- JSON-LD on every page (at minimum BreadcrumbList)
- Update `sitemap.xml` when adding pages
- Rebuild `preview.html` after edits so review always matches the source
- Write like an owner talking to an owner — short paragraphs, plain words, no buzzwords

### NEVER:
- Publish Chris's home street address
- Use the Georgia number (423) 208-9982
- Publish a client's name, numbers, or what was found inside their business **without written
  permission** — this is a promise made on the homepage, and the Skyline case study was pulled in
  July 2026 for exactly this reason
- Describe Snap Flow as only an SEO company, only an AI company, or only an automation company
- Use the retired blue/cyan palette or the Outfit typeface
- Create new CSS or JS files — everything lives in `css/style.css` and `js/main.js`
- Use inline styles when a class exists
- Overpromise results or imply Snap Flow replaces employees, office managers, or skilled labor
- Mark tasks complete in Notion before they're deployed and verified

---

## Project Tracking

### Notion Task Tracker
Page ID: `33356fc68e9481999f50c9cde1ebbb20`
URL: https://www.notion.so/33356fc68e9481999f50c9cde1ebbb20

### Keyword Strategy
Page ID: `33356fc68e948033a4eed27262005a05`
URL: https://www.notion.so/33356fc68e948033a4eed27262005a05

### Key Repo Commits
- `2187663` — Initial Chattanooga deployment (2026-03-30)
- `dcc5339` … `05d02cb` — Michigan rebuild: new design system, sections, footer, tracking (2026-07)
- July 2026 session — repositioned to business improvement, homepage cut from 2,567 to ~1,600 words,
  service tile catalog restored, client case study removed, real gold/navy logo installed,
  blue/cyan brand retired

Long-form copy removed from the homepage (full FAQ, systems detail, Skyline case study) is
recoverable with `git show <commit>:index.html` — useful when building subpages.

*Last updated: 2026-07-27*
