/* Website-owned greeting; GHL's native prompt is disabled to avoid two renderers.
 * Uses GHL's public API or the rendered launcher; never sends a message.
 */
(() => {
  if (document.getElementById('sf-chat-greeting')) return;
  // Dismiss only this page view. A refresh must not inherit an old Safari tab's dismissal.
  let dismissed = false;
  const style = document.createElement('style');
  style.textContent = `
    #sf-chat-greeting{position:fixed;right:20px;bottom:90px;z-index:999999;display:flex;align-items:center;width:300px;max-width:calc(100vw - 32px);background:#fff;border:1px solid #b8892c;border-radius:14px;box-shadow:0 6px 24px #102b3f26;color:#102b3f;font:14px/1.4 Inter,system-ui,sans-serif}
    #sf-chat-greeting[hidden]{display:none!important}
    #sf-chat-greeting button{font:inherit;cursor:pointer;border:0;background:transparent;color:inherit}
    #sf-chat-greeting .sf-chat-invite{display:flex;align-items:center;gap:12px;flex:1;padding:14px 6px 14px 14px;text-align:left;border-radius:14px}
    #sf-chat-greeting img{width:42px;height:42px;object-fit:cover;border-radius:50%;flex-shrink:0}
    #sf-chat-greeting strong{display:block;font-size:14px;font-weight:600}
    #sf-chat-greeting small{display:block;font-size:11px;margin-top:3px;color:#526675}
    #sf-chat-greeting .sf-chat-dismiss{align-self:flex-start;min-width:44px;min-height:44px;font-size:22px}
    #sf-chat-greeting button:focus-visible{outline:3px solid #b8892c;outline-offset:-3px}
    @media(max-width:480px){#sf-chat-greeting{right:16px;bottom:calc(90px + env(safe-area-inset-bottom,0px))}}
  `;
  document.head.append(style);
  const card = document.createElement('aside');
  card.id = 'sf-chat-greeting';
  card.setAttribute('aria-label','SnapFlow chat invitation');
  card.hidden = true;
  card.innerHTML = '<button class="sf-chat-invite" type="button" aria-label="Chat with SnapFlow AI assistant"><img src="https://widgets.leadconnectorhq.com/chat-widget/assets/defaultAvatar.png" alt="" width="42" height="42"><span><strong>Hi! How can I help you?</strong><small>SnapFlow AI assistant</small></span></button><button class="sf-chat-dismiss" type="button" aria-label="Dismiss chat greeting">×</button>';
  document.body.append(card);
  const dismiss = () => {
    dismissed = true;
    card.hidden = true;
  };
  card.querySelector('.sf-chat-dismiss').addEventListener('click',dismiss);
  card.querySelector('.sf-chat-invite').addEventListener('click',() => {
    const api = window.leadConnector?.chatWidget;
    if (typeof api?.openWidget === 'function') {
      api.openWidget();
      dismiss();
    } else {
      const launcher = document.querySelector('chat-widget')?.shadowRoot?.querySelector('#lc_text-widget--btn');
      if (launcher) { launcher.click(); dismiss(); }
    }
  });
  const started = Date.now();
  // Only display when the real chat is ready; never show a nonfunctional invitation.
  const timer = setInterval(() => {
    const api = window.leadConnector?.chatWidget;
    const widget = document.querySelector('chat-widget');
    if (dismissed || Date.now()-started > 120000) { clearInterval(timer); return; }
    const launcher = widget?.shadowRoot?.querySelector('#lc_text-widget--btn');
    if (!widget || (typeof api?.openWidget !== 'function' && !launcher)) return;
    if (widget.getAttribute('data-active') === 'true' || (typeof api?.isActive === 'function' && api.isActive())) {
      dismiss(); clearInterval(timer); return;
    }
    if (Date.now()-started < 15000) return;
    card.hidden = false;
  }, 500);
  // Opening the existing launcher retires this invitation for this page view.
  const observer = new MutationObserver(() => {
    const widget = document.querySelector('chat-widget');
    if (widget?.getAttribute('data-active') === 'true') { dismiss(); observer.disconnect(); clearInterval(timer); }
  });
  observer.observe(document.body,{subtree:true,attributes:true,attributeFilter:['data-active']});
  setTimeout(() => observer.disconnect(),120000);
})();
