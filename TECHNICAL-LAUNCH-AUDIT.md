# SnapFlow technical launch audit — November 8, 2026

## Release boundary
Work remains on redesign/approved-homepage / PR 13. Do not merge or publish production without Chris's launch approval. No claim of live form delivery or completed Search Console submission for the redesigned URLs.

## Verified
- Generated production: 27 HTML pages, 17 sitemap URLs; scripts/audit-site.py passes. All local href/src targets and anchors valid, single H1, descriptions present, JSON-LD parses, images have alt attributes, Client Requests link present. Titles and descriptions checked for duplicates: none.
- 15 node tests passed: backend validation/spam controls, preview isolation, production-success/failure form handling, production indexing rules and existing location checks.
- Original HTML paths retained. Removed blanket unknown-URL homepage redirect; proper 404 document added.
- Primary service title tags clarified; Service schemas reference the same business entity. Homepage and service canonicals use production domain. No invented coordinates or street address.
- Client Requests added to desktop/mobile main menus; mobile homepage checked at390px without horizontal overflow; menu reaches request hub and both form choices.
- Homepage custom form matches existing backend required fields. Security protection and GHL webhook forwarding preserved; preview does not submit.
- GHL API confirms Snapflow Solutions location liRwy27BujTGz6AWiWGl owns forms elspm8bhiTMFn2XquryJ (Client Work Request) and afwzoIFE1a56TSFFcuY1 (Project Request), matching embeds. Business Audit form GWRgBlv9w8IMhrRNrXEw also exists; do not repurpose it without reviewing its purpose.
- Netlify environment UI confirms GHL_CONTACT_WEBHOOK_URL and TURNSTILE_SECRET_KEY have Production values and empty preview contexts. Values were not revealed or changed.
- GA4 account Flowbot X / Snap Flow Solutions, property530556281: data stream14280386637 for https://snapflowsolutions.com shows traffic received in past48hours. Source tag G-YQFQY5E471 retained; stream measurement-ID screen and event configuration still require confirmation.
- Shared GA script only initializes on production host; phone/email/contact clicks and successful native-form generate_lead tracked. Attribution fields retained across pages. Phone click is not proof of a completed call.

## Search Console baseline — read-only account inspection
Domain property snapflowsolutions.com. Existing sitemap submitted Sep17; last read Nov8; Success;12discovered URLs. Page-indexing report last updated Oct22:10indexed,23excluded (12notfound,4redirected,3noindex,2discovered,2crawled-notindexed). This is a lagging report, not a fresh live crawl.
Missing URLs: /ai-consulting/, /fort-oglethorpe/, /east-ridge/, /faq/, /dalton/, /blog/ai-lead-generation/, /blog/missed-call-text-back/, /blog/ai-search-visibility/, email.mg.snapflowsolutions.com/, /ai-lead-capture/, /about/, /ai-search-visibility/.
Added relevant redirects for ai-consulting and three blog URLs. Existing ai-lead-capture/about/ai-search-visibility redirects retained. Retired geographic pages and FAQ need a content/relevance decision; do not redirect blindly. Email tracking subdomain is outside Netlify site's route control; preserve mail infrastructure.
Discovered-notindexed: /free-ranking-report/, /local-seo/.
Crawled-notindexed: /chattanooga/ (existing redirect), /blog/gbp-optimization/ (added relevant redirect to local-seo).

## Outstanding gates — not complete
- Verify actual Netlify preview build, HTTP redirect responses,404and noindex headers after push.
- Confirm GA4 measurement ID matches stream and review key events; verify event receipt after launch. Existing request confirmation pages can be visited directly, so their events are not equivalent to server-verified submissions; review GHL success redirects before treating these as reliable conversions.
- Real homepage form submission and GHL receipt/notification test still needed. No customer message sent. Confirm GHL request form thank-you redirect settings and receipt separately; styling intentionally deferred.
- Full device/performance/Core Web Vitals verification; Search Console currently has insufficient CWV data. No performance score claimed.
- Keep original working legacy service URLs until deliberate consolidation decisions. Review remaining Search Console exclusions and backlinks before redirecting/removing.
- After approved production launch: verify all sitemap URLs return200and indexable canonical HTML; verify redirects and404; submit/resubmit production sitemap in Search Console and request indexing of homepage+five main categories. Do not submit deploy-preview URLs. Submission does not guarantee indexing.
- Monitor live forms, GA4 and Search Console after launch. Keep previous production deploy for rollback.
