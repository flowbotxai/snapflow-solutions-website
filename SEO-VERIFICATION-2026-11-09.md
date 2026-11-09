# SEO verification — November 9, 2026

Base: main 9174963ec17fd8cc6a9dcf014549a9e6ff9c64c9. Branch: fix/technical-seo-verification.

## Verified
- Connected Chrome access and logged-in Search Console verified.
- Sitemap Success; submitted and last read November 9; 16 discovered URLs.
- All 16 live sitemap URLs return HTTP 200. Their fetched titles, descriptions, canonical URLs, headings, image alt text and internal links are recorded in qa/seo-live-audit-2026-11-09.json.
- Production build audit: 29 HTML documents, 16 sitemap entries, zero audit errors. Existing automated tests: 20 passed.
- Search Console aggregate indexing report last updated November 5, before launch: 11 indexed, 24 excluded (13 not found, 4 redirects, 2 noindex, 1 alternate canonical, 3 discovered, 1 crawled). These are not current counts for the redesigned site.
- Noindex examples: /client-requests/ and /pdr-snapshot-getting-started/. No public service pages shown in that exclusion category.
- Core Web Vitals: no field data for desktop or mobile. No passing performance score claimed.
- HTTPS report: 9 HTTPS URLs, 0 non-HTTPS. Breadcrumb report: 7 valid, 0 invalid.

## Implemented
Three large PNG illustrations converted to lossless WebP with decoded RGBA pixel equality verified. Homepage and two service pages reference the smaller versions. Original files retained for rollback. No wording, layout, colors, dimensions, alt text or form/assistant behavior changed. Exact byte measurements: qa/image-optimization.json.

## Pending / limits
- Google recrawl and indexing after launch remain pending; indexing requests were already submitted, not repeated.
- Historical 404 examples include retired geography/FAQ URLs and an email tracking subdomain. Do not blindly redirect them to the homepage. Existing relevant legacy blog/AI consulting redirects remain in place.
- This audit does not establish rankings, conversion attribution, or completed calls.
- Real-device mobile performance and field Core Web Vitals remain unverified.
- Newsletter remains disabled. No changes to PDR support, workflows, campaigns, or contact settings.

## Deployment verification
- PR #24 merged as f36a658da3fe074ce1296c43b4f1230714ef9b03.
- Netlify preview status succeeded: https://deploy-preview-24--sunny-maamoul-0ec979.netlify.app/ . Preview retains noindex,nofollow.
- Customer Communication desktop image loaded; Customer Communication and SEO & AI Search images loaded at 390 px, with document width also 390 px. Mobile navigation opened with Client Requests visible. Viewport override reset. This is Chrome viewport testing, not real-device Safari testing.
- Production Customer Communication page loads the new WebP and has no noindex meta tag. Screenshot: qa/seo-production-desktop.png.
- All fetched internal link/image targets returned 200; no duplicate titles or descriptions among sitemap pages.
- Internal linking follow-up: /service-area/ and /metro-detroit/ have no incoming links in the 16 sitemap pages checked. Existing copy/design preserved; link placement not changed in this pass.
- Fresh individual URL inspection stalled with a browser connection timeout. No claim that new service pages are now indexed.
