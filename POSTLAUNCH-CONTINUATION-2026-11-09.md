# SnapFlow post-launch verification — November 9, 2026

## Verified — tracking is active
- Chrome access recovered through refreshed browser ID 3.
- PR #21 merged and production deployed: 6bdc649000ef41106b1beeca2d06cb72123d03f9.
- Native GHL workflow **SnapFlow — GA4 Verified Website Submissions**, ID 41651624-9597-4aae-aa9d-9ddf502d4209, is published.
- One Form Submitted trigger selects exactly homepage TOthDjgBZ3xfHwaj66U6, project afwzoIFE1a56TSFFcuY1, and client-work elspm8bhiTMFn2XquryJ.
- Captures {{contact.lastAttributionSource.url}} into dedicated GA4 Submission Origin field 0encGoFGQ8P9gLIYmEZH.
- Production branch requires URL contains https://snapflowsolutions.com/ AND does not contain netlify.app; otherwise ends without a GA event.
- Production branch sends native GA4 **generate_lead** to G-YQFQY5E471 using the existing secret named SnapFlow GHL Verified Form Submissions. No secret is stored in this repository.
- Re-entry enabled for future submissions; multiple opportunities disabled. One analytics action. No email, SMS, marketing tag, pipeline or assistant actions in this tracking workflow.
- GA4 Realtime observed **generate_lead event count 5 and key-event count 5** after five production submissions below (three initial, two post-deployment). These count submitted inquiries, including existing-client requests, not five new customers.
- Earlier manual diagnostic events sf_tracking_test count 2 were not key events.

## Actual labeled submissions and receipts
All submissions matched existing authorized contact vRaQlgNXe2zM3VlS6Nat; exact messages/fields were preserved.

| Test | GHL receipt | Eastern time | Result |
| --- | --- | --- | --- |
| SF-QA-20261109-GA4-PREVIEW-EXCLUDE | 6af220bc1927c6050dedd7f0 | 2:36:28 PM | Netlify preview URL captured; exclusion/None branch executed at 2:36:29; no GA action |
| SF-QA-20261109-GA4-HOME | 6af2214a761f9815ae38f691 | 2:38:50 PM | Production homepage; branded /thank-you.html reached |
| SF-QA-20261109-GA4-PROJECT | 6af2217d1927c6050deddfb9 | 2:39:41 PM | Production project form; inline success message |
| SF-QA-20261109-GA4-WORK | 6af2219c1927c6050dede0f9 | 2:40:12 PM | Production client-work form; inline success message |
| SF-QA-20261109-GA4-PROJECT-DOMAIN | 6af2229240aebb91af84491e | 2:44:18 PM | Branded embed production test; GA client ID preserved |
| SF-QA-20261109-GA4-WORK-DOMAIN | 6af222a51927c6050dedeba5 | 2:44:37 PM | Branded embed production test; GA client ID preserved |

- Preview tested at https://deploy-preview-20--sunny-maamoul-0ec979.netlify.app/#contact.
- Production tests used utm_source=qa, utm_medium=test, utm_campaign=ga4_verified_20261109 on /, /project-request/, /client-work-request/.
- Blank homepage and project submissions rejected required fields. Client-work required fields were verified previously.
- Homepage confirmation reload and reloads after project/client-work success did not produce additional submissions or events in the observed test window. Three successful production submissions corresponded to three GA events.
- The preview URL replaced earlier production attribution on the existing contact before the exclusion branch ran. This specifically tests stale prior-production attribution for the sequential preview submission.
- This is not a guarantee against arbitrary replay/concurrent submissions. No immutable submission-ID mapping control is exposed by the native GA action.

## Attribution and code fix
- All three production receipts preserved parent page URL and QA UTMs.
- Homepage receipt includes GA client ID. Project/client-work receipts from api.flowbotx.ai have null gaClientId. Full GA session attribution is not yet verified.
- PR #21 changes only existing project/client-work embed host, fallback, preconnect and embed script from api.flowbotx.ai to links.snapflowsolutions.com. Same form IDs, design and copy.
- Netlify preview build passed at https://deploy-preview-21--sunny-maamoul-0ec979.netlify.app.
- Both request forms render their existing fields correctly on the preview using the SnapFlow branded domain.
- PR #21 merged and production iframe sources verified on links.snapflowsolutions.com. Both post-deployment receipts now preserve the same GA client ID as the homepage, GA1.1.1162040956.1786717656. Full GA session/source stitching remains unverified.

## Form/workflow evidence
- Project internal notification Gmail 1a1c1d2f78c7236d at 2:39:42 PM; client-work notification 1a1c1d370a20a5d5 at 2:40:13 PM. Full test messages, name, phone, email, business, URL and submitted request details confirmed.
- Latest homepage internal notification Gmail 1a1c1d22a73edfc1 at 2:38:51 PM and customer acknowledgment 1a1c1d2262139b8c at 2:38:53 PM verified.
- Main inquiry routing workflow 8ca689d3-89d3-4a5e-9fb0-d673bacc4734 remains unchanged: assign owner, email acknowledgment, end.
- Existing owner EFHgDqKzFViFweGRfy2Y. Existing project request/client work request tags and DND settings preserved. No newsletter tag or marketing enrollment introduced.
- Project/client-work display their native inline success message; homepage uses branded /thank-you.html. No confirmation destination changes made.
- Latest project/client-work customer acknowledgment delivery and owner/pipeline routing still require final review.

## Search Console
- Sitemap Success, last read November 9, 16 discovered pages.
- Data Analysis & Reporting still Discovered — currently not indexed; indexing already requested. No repeat indexing requests or preview submissions.

## Remaining work / limitations
- Production client-ID preservation verified after branded domain deployment; full GA session/source stitching remains unverified.
- Review event naming for existing-client requests if reporting should distinguish them from general lead inquiries.
- Verify phone/email click receipt. Phone taps are clicks, not completed calls.
- Mobile viewport override previously returned success without changing actual DOM width (1012px). Reset performed; no mobile pass claimed.
- Complete project/client-work customer acknowledgment and routing checks.
- Alex handoff and fresh voice test remain outstanding. No actual call authorization supplied; previous voice SMS auto-review restriction retained.
- Newsletter stays disabled. Postal address still needed; reply handling, native unsubscribe/suppression, consent workflow and end-to-end welcome test incomplete. No campaigns sent.
- PDR Snapshot Support remains untouched.
- Shell GitHub fetch DNS failed; GitHub connector was used to fetch current main and make branch-only source changes.

## Client Work Request branding — published
- User requested replacing generic blue styling to match other GHL forms.
- Updated existing native form elspm8bhiTMFn2XquryJ Custom CSS and saved. No fields, conditional logic, content, or submission behavior changed.
- Live https://snapflowsolutions.com/client-work-request/ verified: navy #002b43 submit button, gold #b8892c border, white text, 10px corners, Inter 16px, 48px minimum height.
- Matched gold field-focus styling and navy dropdown highlights; retained existing typography/layout.
- Live screenshot saved as client-work-request-branded-evidence.png in the local project checkout.
