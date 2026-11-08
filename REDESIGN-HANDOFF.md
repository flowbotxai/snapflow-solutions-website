# SnapFlow redesign — November 8, 2026

## Completed
- Isolated branch: redesign/approved-homepage, based on main commit 4faff73.
- Copied approved local homepage without changing its design or copy.
- Isolated CSS/assets; all existing service/product/legal pages, legacy CSS/JS, sitemap, redirects and backend retained.
- Netlify verified: production main, branch deploys disabled, PR Deploy Previews enabled and public.

## Next
1. Review Websites & Landing Pages at /websites-landing-pages/ (first complete draft added November 8).
2. Complete the remaining four category pages and enable matching Learn More links.
3. Preserve /google-ads/ and /local-seo/ as separate offerings under the marketing category.

## Required before launch
- Map old URLs and homepage anchor links to retained or replacement destinations.
- Reconnect homepage form to existing contact function, preserving validation, spam protection, attribution fields and success tracking; test without sending real leads during preview.
- Restore production-only GA4 G-YQFQY5E471 and verify events; prevent preview traffic contaminating production reporting.
- Add final title, description, canonical, social metadata, structured data and sitemap entries.
- Replace preview noindex with deployment-context indexing controls; verify preview remains noindex and production is indexable.
- Review redirects and a real 404 (current catch-all redirects missing URLs to homepage).
- Mobile, accessibility, form, navigation and performance checks across all pages.
- Keep original main commit available for rollback. Merge only after explicit launch approval.

This branch is a design preview, not launch-ready. Existing production integrations remain in main; copied homepage form is intentionally non-submitting and production analytics are not loaded.

## Website category sources
Reviewed live Incidents PDR, Skyline Chimney and Home to Home Exchange homepages on November 8. Screenshots are actual site captures; captions describe visible features, not measured performance. Chris explicitly authorized using these projects as examples. Skyline patterns adapted: dedicated service pages, local coverage, direct inquiry paths and relevant FAQs. No Skyline business claims, customer testimonials or private analytics copied.

## Google Ads & Local SEO category draft
Added /google-ads-local-seo/ with independent Ads and SEO options, competitor monitoring, service landing pages, lead-to-sale tracking, ROAS and reporting cadence FAQ. Linked from homepage and website category navigation. Existing /google-ads/ and /local-seo/ pages preserved. Desktop and 390px mobile visually reviewed, FAQ toggle and local links checked. No production launch.

## Customer Communication category draft
Added /customer-communication/: independent voice, text/missed-call text back and website chat options, benefits, example scenarios, staff support, customer records and FAQs. Original approved styling retained. Navigation and homepage Learn More linked. Desktop and 390px mobile reviewed; FAQ expansion and local destinations checked. Existing production integrations untouched.


## Customer management category — November 8
- Added `/customer-management-admin-automation/` with software choice, customer records, lead stages, intake/follow-up, reminders, reviews, reactivation, example workflow and FAQs.
- Connected homepage service 4 and navigation/footer links across the four category pages.
- Desktop and 390px mobile inspected; FAQs and internal destinations checked. Preview remains noindex; production forms/tracking unchanged.
- Next main category: Data Analysis & Reporting.


## Remaining customer-facing pages — theme pass (November 8, 2026)

Applied shared redesigned navigation/footer, Inter typography, cream/navy/gold styling and glow-outline links to 18 retained pages: request hub, two request forms, three confirmations, privacy/terms, both service-area pages, free ranking report, six legacy service pages and retired-content fallback. Content, existing scripts, iframe markup, form actions and success-event attributes were compared against the preceding commit and preserved. Mobile 390px overflow/image checks passed on 15 non-confirmation pages; representative desktop layouts reviewed. Confirmation pages checked statically to avoid triggering their production analytics success events. No form submissions or payments made. External iframe field styling remains provider-controlled. Local SEO consolidation, redirects and launch approval remain pending.

## Final page presentation QA — November 8, 2026
- All 26 HTML pages checked for local link/asset destinations, fragment IDs and duplicate IDs: passed.
- All 26 loaded at desktop and 390px mobile: no horizontal page overflow or broken loaded images. Embedded GHL content excluded by Chris's direction.
- Mobile navigation and service dropdown opened successfully. Confirmation pages now visually checked; request confirmation actions centered and thank-you accent contrast improved.
- Consolidated existing GA4 initializers on 19 retained pages into js/analytics.js. Loads only on snapflowsolutions.com and www.snapflowsolutions.com, preserving measurement ID and existing event code while preventing local/preview conversions. Four hostname isolation cases passed.
- Contact-function tests: 6 passed with mocked forwarding; no real lead submissions or payments.
- GHL form styling explicitly deferred; no provider form changes saved.
- Presentation pass complete. Still not a production launch: homepage form connection/Turnstile, homepage/category metadata and analytics, preview-vs-production indexing, sitemap and redirect/404 migration need a dedicated launch pass. Service-area content strategy remains deferred to local SEO work. Production main unchanged.

## Launch preparation implemented — November 8, 2026
- Homepage form now uses the existing Netlify contact endpoint and exact required field names. Original Turnstile public site key, server validation and hidden honeypot preserved. No backend or GHL workflow changes. Production-only submit logic includes success-only lead tracking, error recovery and thank-you redirect; preview submissions are blocked before network calls.
- Homepage metadata and business schema restored with current messaging and original business identity. Added the three missing category sitemap entries. Existing PDR noindex decisions preserved pending separate product-indexing review.
- Shared production-only analytics on all pages; phone/email/contact intent events, session attribution and first landing/referrer capture added.
- Added Netlify build preparation: publishes dist with only public assets/pages. Nonproduction gets both meta noindex and X-Robots-Tag. Production strips preview banners/noindex only for homepage and five category pages; private and confirmation pages keep exclusions.
- Removed the blanket unknown-URL-to-homepage redirect; branded 404.html now handles missing pages. Existing explicit redirects unchanged, every original HTML URL retained, old homepage section anchors mapped to current relevant sections. Location strategy deferred.
- Validation: 15 automated tests passed, both build modes checked, 27 built HTML pages checked for local assets/links/fragments/duplicate IDs. No missing original HTML routes. Local preview contact submission correctly displayed not-sent state. No messages/payments sent.
- Remaining release gates: confirm production Netlify environment still has GHL_CONTACT_WEBHOOK_URL and TURNSTILE_SECRET_KEY configured, run one authorized real submission with Chris's contact details and confirm GHL receipt/notifications, verify analytics receipt, obtain launch approval, then deploy and check live HTTP/indexing/redirects. Search Console property/domain unchanged; submit updated sitemap after launch. GHL form styling remains deferred by Chris.
