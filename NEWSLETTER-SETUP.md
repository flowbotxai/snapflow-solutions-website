# SnapFlow newsletter — prepared November 9, 2026

## Completed
- Homepage opt-in before final contact section; mobile email field and centered button.
- Dedicated newsletter Netlify endpoint. Production origin allowlist, Turnstile action newsletter_signup, honeypot, email validation, consent timestamp. Preview never enrolls contacts.
- GHL location: liRwy27BujTGz6AWiWGl (Snapflow Solutions).
- Subscriber tag: newsletter-subscriber (hcIE0W28u2XgIaOKW0UU).
- Saved GHL HTML templates: Welcome 6af13ead62405cb5526b4987; Monthly Master 6af13eb13ae453d49e735398.
- Templates are drafts, NOT send-ready. No campaigns or sends created.

## Blocker
GHL returns 403 WORKFLOW_API_NOT_ENABLED_FOR_LOCATION on workflow discovery and schema reads. This is an upstream account feature restriction, not a missing OAuth scope. No workflow was created. Browser control is unavailable in this session.

## Exact workflow to build in GHL UI
Name: SnapFlow Newsletter — Website Signup & Welcome.
1. Inbound webhook trigger dedicated to newsletter. Map email, newsletter_consent, consent_text, consent_at, source and tag. Never reuse sales inquiry webhook.
2. Require newsletter_consent=yes and valid email. Create/update contact by email; preserve existing tags and DND/unsubscribe state. Save consent text, timestamp and source in dedicated fields.
3. If email DND/unsubscribed, stop; do not silently resubscribe. Re-consent should use a verified opt-in flow.
4. If already newsletter-subscriber, stop welcome processing (prevent repeat welcome sends).
5. Add newsletter-subscriber tag. Send the approved Welcome template once. Use account timezone America/Detroit. Leave draft until tested.
6. Monthly sends use newsletter-subscriber segment excluding email DND, unsubscribes and invalid/bounced addresses. Do not add existing sales contacts automatically. Monthly master is an editorial template, not an automated source of news.

## Remaining launch steps
- Build above workflow in UI; obtain its actual webhook URL, put in Netlify secret GHL_NEWSLETTER_WEBHOOK_URL (never commit it).
- Confirm existing TURNSTILE_SECRET_KEY/site key accepts newsletter_signup; test both contact and newsletter widgets together.
- Verify hello@snapflowsolutions.com sender authentication/reply inbox and add valid postal mailing address. Account only has city information; do not invent street address.
- Replace draft unsubscribe placeholder with GHL's native unsubscribe facility; verify actual unsubscribe updates email suppression.
- Replace template logo preview hostname with production hostname AFTER logo asset is deployed.
- Replace all monthly editorial placeholders, choose one relevant working CTA, and approve content before sending.
- Test new signup, duplicate, unsubscribed contact, invalid address, consent persistence, welcome delivery and unsubscribe with authorized test contact; no test email sent yet.
- Check desktop/mobile rendering and major email clients. Browser/email rendering not verified in this session.
- Only then activate workflow and enable production signup. Production website remains unchanged.
