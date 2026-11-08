/* Uses the existing protected Netlify endpoint; previews never send leads. */
(function () {
  'use strict';
  var form = document.getElementById('business-contact-form');
  if (!form) return;
  var live = ['snapflowsolutions.com', 'www.snapflowsolutions.com'].includes(location.hostname);
  var status = document.getElementById('contact-form-status');
  var note = document.getElementById('contact-form-note');
  var button = form.querySelector('[type="submit"]');
  var sending = false;
  if (live) {
    note.textContent = 'Your information is used to respond to your inquiry.';
    var widget = document.createElement('div');
    widget.className = 'cf-turnstile';
    widget.dataset.sitekey = '0x4AAAAAAEFnVgJxkyebU4di';
    widget.dataset.action = 'contact_form';
    widget.dataset.size = 'flexible';
    document.getElementById('contact-security').appendChild(widget);
    var script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    document.head.appendChild(script);
  }
  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (!live) {
      status.textContent = 'Preview only: your message was not sent. Please call or email to contact SnapFlow.';
      return;
    }
    if (sending || !form.reportValidity()) return;
    var data = new FormData(form);
    if (!data.get('cf-turnstile-response')) {
      status.textContent = 'Please complete the security check. If it does not load, call or email us.';
      return;
    }
    ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','gbraid','wbraid','fbclid','landing_page','referrer'].forEach(function (key) {
      try { data.set(key, sessionStorage.getItem('sf_' + key) || ''); } catch (_) { /* Storage can be disabled. */ }
    });
    sending = true;
    button.disabled = true;
    status.textContent = 'Sending your message…';
    try {
      var response = await fetch(form.action, { method: 'POST', body: new URLSearchParams(data) });
      var result = await response.json();
      if (!response.ok || !result.ok) throw new Error('Submission failed');
      status.textContent = 'Message received. Thank you!';
      var redirected = false;
      function done() { if (!redirected) { redirected = true; location.assign('/thank-you.html'); } }
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', { lead_source: 'homepage_contact', event_callback: done });
        setTimeout(done, 800);
      } else done();
    } catch (_) {
      status.textContent = 'Your message could not be sent. Please try again, or call (586) 400-2943.';
      if (window.turnstile) window.turnstile.reset();
      sending = false;
      button.disabled = false;
    }
  });
}());
