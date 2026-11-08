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
