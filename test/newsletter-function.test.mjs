import assert from 'node:assert/strict';
import test from 'node:test';
import {handler} from '../netlify/functions/newsletter.mjs';
const body=(extra={})=>new URLSearchParams({email:'subscriber@example.com',newsletter_consent:'yes','cf-turnstile-response':'token',...extra}).toString();
const event=(b=body(),origin='https://snapflowsolutions.com')=>({httpMethod:'POST',headers:{origin},body:b});
const security=(action='newsletter_signup')=>({ok:true,json:async()=>({success:true,hostname:'snapflowsolutions.com',action})});
process.env.TURNSTILE_SECRET_KEY='test';
process.env.GHL_NEWSLETTER_WEBHOOK_URL='https://example.com/newsletter-test';
test('preview and foreign origins cannot enroll contacts',async()=>{
 globalThis.fetch=async()=>{throw Error('must not call upstream')};
 for(const origin of ['https://deploy-preview-13--sunny-maamoul-0ec979.netlify.app','https://foreign.example']) assert.equal((await handler(event(body(),origin))).statusCode,403);
});
test('rejects missing consent and invalid email',async()=>{
 globalThis.fetch=async()=>security();
 assert.equal((await handler(event(body({newsletter_consent:'no'})))).statusCode,400);
 assert.equal((await handler(event(body({email:'bad'})))).statusCode,400);
});
test('cannot reuse a contact form security token',async()=>{
 globalThis.fetch=async()=>security('contact_form');assert.equal((await handler(event())).statusCode,403);
});
test('forwards email and server-stamped consent only to newsletter destination',async()=>{
 let payload;globalThis.fetch=async(url,options)=>{if(String(url).includes('siteverify'))return security();assert.equal(url,process.env.GHL_NEWSLETTER_WEBHOOK_URL);payload=JSON.parse(options.body);return {ok:true}};
 assert.equal((await handler(event(body({tag:'attacker',consent_at:'fake',phone:'123'})))).statusCode,200);
 assert.equal(payload.tag,'newsletter-subscriber');assert.equal(payload.phone,undefined);assert.notEqual(payload.consent_at,'fake');assert.equal(payload.newsletter_consent,'yes');
});
test('missing configuration or upstream failure never reports success',async()=>{
 const url=process.env.GHL_NEWSLETTER_WEBHOOK_URL;delete process.env.GHL_NEWSLETTER_WEBHOOK_URL;
 globalThis.fetch=async()=>security();assert.equal((await handler(event())).statusCode,503);
 process.env.GHL_NEWSLETTER_WEBHOOK_URL=url;
 globalThis.fetch=async u=>String(u).includes('siteverify')?security():{ok:false,status:500};
 const r=await handler(event());assert.equal(r.statusCode,502);assert.equal(JSON.parse(r.body).ok,false);
});
