(function(){
'use strict';
const form=document.getElementById('newsletter-form');if(!form)return;
const status=document.getElementById('newsletter-status');
const button=form.querySelector('button[type="submit"]');
const live=['snapflowsolutions.com','www.snapflowsolutions.com'].includes(location.hostname);
let widgetId=null,sending=false;
if(!live) status.textContent='Preview: newsletter signup is not active yet.';
// The homepage contact form loads the shared Turnstile script. Render our widget explicitly once ready.
if(live){let tries=0;const timer=setInterval(function(){
 if(window.turnstile){clearInterval(timer);window.turnstile.ready(function(){widgetId=window.turnstile.render('#newsletter-security',{sitekey:'0x4AAAAAAEFnVgJxkyebU4di',action:'newsletter_signup',size:'flexible'});});}
 else if(++tries>60){clearInterval(timer);status.textContent='Security check could not load. Please refresh and try again.';}
},250);}
form.addEventListener('submit',async function(event){
 event.preventDefault();if(sending||!form.reportValidity())return;
 if(!live){status.textContent='Preview only: no subscription was created and no email was sent.';return;}
 const data=new FormData(form);
 if(!data.get('cf-turnstile-response')){status.textContent='Please complete the security check.';return;}
 sending=true;button.disabled=true;status.textContent='Submitting your subscription…';
 try{const response=await fetch(form.action,{method:'POST',body:new URLSearchParams(data)});const result=await response.json();
 if(!response.ok||!result.ok)throw new Error('Failed');
 status.textContent='Thank you! Your subscription request was received.';form.reset();
 }catch(_){status.textContent='We could not complete your subscription. Please try again later.';}
 finally{sending=false;button.disabled=false;if(window.turnstile&&widgetId!==null)window.turnstile.reset(widgetId);}
});
}());
