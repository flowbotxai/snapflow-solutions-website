const ALLOWED_FIELDS = ['email'];
const REQUIRED_FIELDS = ['email'];
const DEFAULT_ALLOWED_HOSTS = new Set(['snapflowsolutions.com', 'www.snapflowsolutions.com']);
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const TURNSTILE_ACTION = 'newsletter_signup';
const MAX_BODY_BYTES = 32_000;
const MAX_FIELD_LENGTH = 4_000;

function response(statusCode, message) {
  return {
    statusCode,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store'
    },
    body: JSON.stringify({ ok: statusCode >= 200 && statusCode < 300, message })
  };
}

function allowedHosts() {
  const configured = (process.env.NEWSLETTER_ALLOWED_HOSTS || '')
    .split(',')
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);
  return configured.length ? new Set(configured) : DEFAULT_ALLOWED_HOSTS;
}

function requestHost(event) {
  const headers = event.headers || {};
  const source = headers.origin || headers.Origin || headers.referer || headers.Referer;
  if (!source) return null;

  try {
    return new URL(source).hostname.toLowerCase();
  } catch {
    return null;
  }
}

async function verifyTurnstile(event, token) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error('TURNSTILE_SECRET_KEY is not configured');
    return { ok: false, statusCode: 503, message: 'Newsletter signup is temporarily unavailable' };
  }

  const headers = event.headers || {};
  const remoteIp = headers['x-nf-client-connection-ip'] || headers['X-Nf-Client-Connection-Ip'] ||
    (headers['x-forwarded-for'] || headers['X-Forwarded-For'] || '').split(',')[0].trim();
  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set('remoteip', remoteIp);

  try {
    const result = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
      signal: AbortSignal.timeout(8_000)
    });
    if (!result.ok) throw new Error(`Turnstile returned status ${result.status}`);

    const verification = await result.json();
    const verifiedHost = (verification.hostname || '').toLowerCase();
    if (!verification.success || !allowedHosts().has(verifiedHost) || verification.action !== TURNSTILE_ACTION) {
      return { ok: false, statusCode: 403, message: 'Security check failed. Please try again.' };
    }
    return { ok: true };
  } catch (error) {
    console.error('Turnstile verification failed', error instanceof Error ? error.message : 'unknown error');
    return { ok: false, statusCode: 502, message: 'Unable to verify submission' };
  }
}

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { ...response(405, 'Method not allowed'), headers: { ...response(405, '').headers, allow: 'POST' } };
  }

  const host = requestHost(event);
  if (!host || !allowedHosts().has(host)) return response(403, 'Request origin not allowed');

  const rawBody = event.isBase64Encoded
    ? Buffer.from(event.body || '', 'base64').toString('utf8')
    : (event.body || '');
  if (!rawBody || Buffer.byteLength(rawBody, 'utf8') > MAX_BODY_BYTES) {
    return response(400, 'Invalid submission');
  }

  const input = new URLSearchParams(rawBody);
  if (input.get('company_fax')) return response(200, 'Submission received');

  const turnstileToken = (input.get('cf-turnstile-response') || '').trim();
  if (!turnstileToken) return response(403, 'Please complete the security check');

  const turnstile = await verifyTurnstile(event, turnstileToken);
  if (!turnstile.ok) return response(turnstile.statusCode, turnstile.message);

  for (const field of REQUIRED_FIELDS) {
    if (!(input.get(field) || '').trim()) return response(400, 'Please complete all required fields');
  }

  if (input.get('newsletter_consent') !== 'yes') return response(400, 'Please agree to receive the newsletter');
  const email = (input.get('email') || '').trim();
  if (email.length > 254) return response(400, 'Please enter a valid email');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return response(400, 'Please enter a valid email');

  const output = new URLSearchParams();
  for (const field of ALLOWED_FIELDS) {
    const value = (input.get(field) || '').trim();
    if (value.length > MAX_FIELD_LENGTH) return response(400, 'A field is too long');
    output.set(field, value);
  }

  output.set('newsletter_consent', 'yes');
  output.set('consent_text', 'Monthly SnapFlow newsletter about AI, technology, marketing and business operations. Unsubscribe anytime.');
  output.set('consent_at', new Date().toISOString());
  output.set('source', 'SnapFlow website newsletter');
  output.set('tag', 'newsletter-subscriber');

  const webhookUrl = process.env.GHL_NEWSLETTER_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('GHL_NEWSLETTER_WEBHOOK_URL is not configured');
    return response(503, 'Newsletter signup is temporarily unavailable');
  }

  try {
    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(output)),
      signal: AbortSignal.timeout(10_000)
    });

    if (!upstream.ok) throw new Error(`GHL rejected submission with status ${upstream.status}`);
    return response(200, 'Submission received');
  } catch (error) {
    console.error('Newsletter signup delivery failed', error instanceof Error ? error.message : 'unknown error');
    return response(502, 'Unable to deliver submission');
  }
}
