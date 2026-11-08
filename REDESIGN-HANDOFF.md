# SnapFlow redesign — November 8, 2026

## Completed
- Isolated branch: redesign/approved-homepage, based on main commit 4faff73.
- Copied approved local homepage without changing its design or copy.
- Isolated CSS/assets; all existing service/product/legal pages, legacy CSS/JS, sitemap, redirects and backend retained.
- Netlify verified: production main, branch deploys disabled, PR Deploy Previews enabled and public.

## Next
1. Build Websites & Landing Pages category page using the 10-second clarity foundation.
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
