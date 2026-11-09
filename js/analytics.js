/* Keep preview and local QA out of production analytics. */
(function () {
  'use strict';
  if (!['snapflowsolutions.com', 'www.snapflowsolutions.com'].includes(window.location.hostname)) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', 'G-YQFQY5E471');
  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-YQFQY5E471';
  document.head.appendChild(script);
}());

/* First-touch attribution persists across pages for the contact form. */
(function () {
  var params = new URLSearchParams(location.search);
  try {
    ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','gbraid','wbraid','fbclid'].forEach(function (key) {
      if (params.get(key)) sessionStorage.setItem('sf_' + key, params.get(key));
    });
    if (!sessionStorage.getItem('sf_landing_page')) sessionStorage.setItem('sf_landing_page', location.href);
    if (!sessionStorage.getItem('sf_referrer')) sessionStorage.setItem('sf_referrer', document.referrer || 'direct');
  } catch (_) { /* The website still works when browser storage is disabled. */ }
  document.addEventListener('click', function (event) {
    if (typeof window.gtag !== 'function') return;
    var link = event.target.closest('a');
    if (!link) return;
    var href = link.getAttribute('href') || '';
    if (href.startsWith('tel:')) window.gtag('event', 'phone_tap', { link_url: href });
    else if (href.startsWith('mailto:')) window.gtag('event', 'email_click', { link_url: href });
    else if (href.endsWith('#contact')) window.gtag('event', 'contact_cta_click', { link_text: link.textContent.trim(), link_url: href });
  });
}());
