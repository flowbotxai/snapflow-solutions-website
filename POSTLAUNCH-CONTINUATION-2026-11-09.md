# SnapFlow integration continuation — November 9, 2026

## Verified in this session
- Read POSTLAUNCH-VERIFICATION-2026-11-09.md, LAUNCH-2026-11-09.md and NEWSLETTER-SETUP.md from the prior checkout.
- GitHub connector confirmed current main is 02380a344c59c83c6a425280f7bb820a025a3cb0 (PR #20). Created branch fix/postlaunch-tracking-verification from that exact SHA.
- Chrome initially timed out reading/accessing pages. After recovery, GHL and GA4 UI interaction and screenshots succeeded.
- Existing GHL submission records rechecked, without repeating successful submissions:
  - Homepage embedded: 6af213321927c6050ded4d32, 2026-11-09 1:38:42 PM Eastern.
  - Project: 6af1fe731927c6050dec737a, 12:10:11 PM Eastern.
  - Client work: 6af1fe75761f9815ae378ac5, 12:10:13 PM Eastern.
  - All point to existing test contact vRaQlgNXe2zM3VlS6Nat and retain exact test messages.
- Homepage internal owner notification now independently verified: Gmail message 1a1c19b0f02602eb, subject New website inquiry — SnapFlow Solutions, sent 1:38:43 PM Eastern to hello@snapflowsolutions.com and received in forwarded Gmail inbox. Full name, phone, email, business, exact message and QA URL present.
- Notification headers show SPF/DKIM/DMARC pass for the existing sending infrastructure (mg.snapflowsolutions.com). This is not a newsletter welcome or reply-handling test.
- Homepage form notification enabled to hello@snapflowsolutions.com; form autoresponder off. Published inquiry workflow contains only Form Submitted (specific homepage form), Assign to user, and email acknowledgment. No GA4 step, pipeline action, marketing tag action or SMS step in that workflow. Re-entry enabled, multiple opportunities disabled.
- Test contact owner remains EFHgDqKzFViFweGRfy2Y. Tags remain project request and client work request. DND false and email suppression inactive; no mutations made. No newsletter tag.
- Embedded homepage submission and contact last attribution preserve utm_source=qa, utm_medium=test, utm_campaign=postlaunch_20261109 and parent homepage URL. gaClientId present; gaSessionId null. Do not claim full GA4 session attribution is proven.
- GA4 Realtime observed page_view (4), user_engagement (2), scroll (1), session_start (1) in the displayed window, with no key-event receipt.
- After user completed the acknowledgment and authorized creation, created one GA4 Measurement Protocol secret named **SnapFlow GHL Verified Form Submissions** at 2:08:25 PM Eastern. Secret value is stored only in the native GHL action, not this repository.
- Created separate draft workflow **SnapFlow — GA4 Verified Website Submissions**, ID 41651624-9597-4aae-aa9d-9ddf502d4209. No triggers; unpublished. Two saved actions: QA capture latest attribution URL, then native GA4 event sf_tracking_test. No email/SMS/tag/pipeline actions.
- Ran two manually initiated workflow tests only with existing authorized test contact. GHL executions at 2:10:24 and 2:16:24 PM Eastern; both GA4 actions executed, workflows finished. First action detail explicitly reported successful upload.
- **GA4 Realtime actual receipt verified: sf_tracking_test count 2 after refresh.** This is a diagnostic event, not generate_lead and not configured as a key event. No new form submission occurred for these tests.
- Created dedicated text contact field GA4 Submission Origin, ID 0encGoFGQ8P9gLIYmEZH, key contact.ga4_submission_origin. Native merge value {{contact.lastAttributionSource.url}} successfully resolved to the test contact's production homepage URL including original QA UTMs. This proves contact latest-attribution access, not immutable per-submission origin or GA session linkage.
- Reviewed native If/Else comparisons: Is, Is not, Contains, Does not contain, comma-separated membership, empty/nonempty. No hostname parsing or starts-with operator exposed. Canceled unfinished condition. No production filter was saved.
- Draft saved and left unpublished. Existing published inquiry workflow unchanged. Temporary viewport override reset again.
- Search Console sitemap now last read Nov 9, 2026; Success; 16 discovered pages. Updated sitemap processing verified. Data Analysis & Reporting inspection still displays Discovered — currently not indexed and Indexing requested. No repeat indexing requests.
- Desktop Client Requests page opens both request destinations. Client Work Request embedded form loaded and rejects blank first name, last name, phone, email, business and request-count fields.
- Homepage at actual 1012px viewport: document width 1012px and no completed broken images detected.

## Blocked / unverified
- Successful-submission lead tracking remains incomplete and inactive. The credential prerequisite and diagnostic delivery test are complete. Native GA4 action exposes no submission ID, client ID or session ID mapping controls. Need a verified per-submission origin gate, deduplication, and client/session attribution before publishing; do not infer these from event delivery.
- Contact latest attribution is mutable and is not sufficient by itself to prove a submission came from production. Do not use an untested contains-domain condition as a reliable preview exclusion mechanism.
- No automatic Form Submitted trigger configured in the new QA draft. No generate_lead events were sent by these tests. Key-event configuration remains unchanged.
- Native Custom Code action was inspected but not added; UI identifies it as premium with per-execution charges.
- Viewport override set to 390x844 returned without error but actual DOM remained 1012px wide on existing and new tabs. Reset called successfully. Mobile QA remains unverified.
- Shell git fetch failed DNS resolution for github.com. Connector confirmed main and created branch; no website code changes, preview or production release in this session.
- Project/client-work internal notification email search found no matching messages; not proof of failed delivery. Full workflow/notification review still needed.
- No new phone/email click receipt, voice live test or Alex handoff test. Prior call/text restrictions retained.
- Newsletter remains disabled; postal address missing; reply handling, native unsubscribe/suppression, dedicated signup workflow and welcome test unfinished.
- PDR Snapshot Support unchanged; no campaigns or new customer sends.

## Next work
1. Complete submission-specific origin validation, deduplication and GA client/session attribution, then test actual successful submissions and exclusions before enabling lead tracking. Reuse the existing secret/draft; do not create duplicate credentials. Do not use direct thank-you views or invented iframe events.
2. Finish request workflow routing/notifications and embedded form validation/security checks.
3. Resolve responsive viewport testing and finish mobile visual QA.
4. Complete assistant handoff verification without unauthorized calls.
5. Finish newsletter draft setup once mailing address is supplied; keep disabled until full end-to-end test succeeds.
