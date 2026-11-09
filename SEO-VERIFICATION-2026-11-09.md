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
