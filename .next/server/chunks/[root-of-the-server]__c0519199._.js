module.exports=[70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},63021,(e,t,r)=>{t.exports=e.x("@prisma/client-2c3a283f134fdcb6",()=>require("@prisma/client-2c3a283f134fdcb6"))},98043,e=>{"use strict";var t=e.i(63021);let r=globalThis.prisma??new t.PrismaClient;e.s(["prisma",0,r])},18772,e=>{"use strict";var t=e.i(47909),r=e.i(74017),a=e.i(96250),n=e.i(59756),i=e.i(61916),s=e.i(74677),o=e.i(69741),l=e.i(16795),d=e.i(87718),p=e.i(95169),c=e.i(47587),u=e.i(66012),h=e.i(70101),f=e.i(26937),g=e.i(10372),x=e.i(93695);e.i(52474);var m=e.i(220),y=e.i(89171),w=e.i(46245),b=e.i(98043);let R=new w.Resend(process.env.RESEND_API_KEY);async function v(e){try{let{subject:t,content:r,recipients:a}=await e.json();if(!t||!r)return y.NextResponse.json({error:"Subject and content are required"},{status:400});let n=[];if(n=a&&Array.isArray(a)&&a.length>0?a:(await b.prisma.newsletterSubscriber.findMany({where:{isActive:!0}})).map(e=>e.email),0===n.length)return y.NextResponse.json({error:"No recipients to send to"},{status:400});let i=0,s=[];for(let e=0;e<n.length;e+=50){let a=n.slice(e,e+50);try{await R.emails.send({from:"Rise for Impact <newsletter@riseforimpact.org>",to:a,subject:t,html:`
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${t}</title>
              </head>
              <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f3f4f6;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 20px 0;">
                  <tr>
                    <td align="center">
                      <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                        
                        <!-- Header -->
                        <tr>
                          <td style="background: linear-gradient(135deg, #22C55E 0%, #F59E0B 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="color: #ffffff; font-size: 32px; margin: 0; font-weight: bold;">
                              Rise for Impact
                            </h1>
                            <p style="color: #ffffff; font-size: 14px; margin: 10px 0 0 0; opacity: 0.9;">
                              Empowering African Youth Leaders
                            </p>
                          </td>
                        </tr>

                        <!-- Content -->
                        <tr>
                          <td style="padding: 40px 30px;">
                            ${r}
                          </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                          <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0 0 15px 0; font-size: 14px; color: #6b7280;">
                              Follow us on social media
                            </p>
                            <div style="margin: 20px 0;">
                              <a href="https://linkedin.com/company/riseforimpact" style="display: inline-block; margin: 0 10px; text-decoration: none;">
                                <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" width="32" height="32" style="display: block;" />
                              </a>
                              <a href="https://twitter.com/riseforimpact" style="display: inline-block; margin: 0 10px; text-decoration: none;">
                                <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" width="32" height="32" style="display: block;" />
                              </a>
                              <a href="https://instagram.com/riseforimpact" style="display: inline-block; margin: 0 10px; text-decoration: none;">
                                <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" width="32" height="32" style="display: block;" />
                              </a>
                            </div>
                            <p style="margin: 20px 0 0 0; font-size: 12px; color: #9ca3af;">
                              You're receiving this email because you subscribed to Rise for Impact newsletters.
                              <br />
                              <a href="https://riseforimpact.org/unsubscribe" style="color: #22C55E; text-decoration: none;">Unsubscribe</a>
                            </p>
                            <p style="margin: 10px 0 0 0; font-size: 12px; color: #9ca3af;">
                              \xa9 ${new Date().getFullYear()} Rise for Impact. All rights reserved.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </body>
            </html>
          `}),i+=a.length}catch(t){s.push({batch:e/50+1,error:String(t)})}}return y.NextResponse.json({success:!0,sent:i,total:n.length,errors:s.length>0?s:void 0})}catch(e){return y.NextResponse.json({error:"Failed to send newsletter"},{status:500})}}e.s(["POST",()=>v,"dynamic",0,"force-dynamic"],33868);var E=e.i(33868);let C=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/newsletter/send/route",pathname:"/api/newsletter/send",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/src/app/api/newsletter/send/route.ts",nextConfigOutput:"",userland:E}),{workAsyncStorage:A,workUnitAsyncStorage:k,serverHooks:N}=C;function T(){return(0,a.patchFetch)({workAsyncStorage:A,workUnitAsyncStorage:k})}async function P(e,t,a){C.isDev&&(0,n.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let y="/api/newsletter/send/route";y=y.replace(/\/index$/,"")||"/";let w=await C.prepare(e,t,{srcPage:y,multiZoneDraftMode:!1});if(!w)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:b,params:R,nextConfig:v,parsedUrl:E,isDraftMode:A,prerenderManifest:k,routerServerContext:N,isOnDemandRevalidate:T,revalidateOnlyGenerated:P,resolvedPathname:j,clientReferenceManifest:S,serverActionsManifest:O}=w,q=(0,o.normalizeAppPath)(y),I=!!(k.dynamicRoutes[q]||k.routes[j]),_=async()=>((null==N?void 0:N.render404)?await N.render404(e,t,E,!1):t.end("This page could not be found"),null);if(I&&!A){let e=!!k.routes[j],t=k.dynamicRoutes[q];if(t&&!1===t.fallback&&!e){if(v.experimental.adapterPath)return await _();throw new x.NoFallbackError}}let H=null;!I||C.isDev||A||(H="/index"===(H=j)?"/":H);let U=!0===C.isDev||!I,D=I&&!U;O&&S&&(0,s.setManifestsSingleton)({page:y,clientReferenceManifest:S,serverActionsManifest:O});let F=e.method||"GET",M=(0,i.getTracer)(),$=M.getActiveScopeSpan(),K={params:R,prerenderManifest:k,renderOpts:{experimental:{authInterrupts:!!v.experimental.authInterrupts},cacheComponents:!!v.cacheComponents,supportsDynamicResponse:U,incrementalCache:(0,n.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:v.cacheLife,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a,n)=>C.onRequestError(e,t,a,n,N)},sharedContext:{buildId:b}},L=new l.NodeNextRequest(e),z=new l.NodeNextResponse(t),B=d.NextRequestAdapter.fromNodeNextRequest(L,(0,d.signalFromNodeResponse)(t));try{let s=async e=>C.handle(B,K).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=M.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==p.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route");if(a){let t=`${F} ${a}`;e.setAttributes({"next.route":a,"http.route":a,"next.span_name":t}),e.updateName(t)}else e.updateName(`${F} ${y}`)}),o=!!(0,n.getRequestMeta)(e,"minimalMode"),l=async n=>{var i,l;let d=async({previousCacheEntry:r})=>{try{if(!o&&T&&P&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let i=await s(n);e.fetchMetrics=K.renderOpts.fetchMetrics;let l=K.renderOpts.pendingWaitUntil;l&&a.waitUntil&&(a.waitUntil(l),l=void 0);let d=K.renderOpts.collectedTags;if(!I)return await (0,u.sendResponse)(L,z,i,K.renderOpts.pendingWaitUntil),null;{let e=await i.blob(),t=(0,h.toNodeOutgoingHttpHeaders)(i.headers);d&&(t[g.NEXT_CACHE_TAGS_HEADER]=d),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==K.renderOpts.collectedRevalidate&&!(K.renderOpts.collectedRevalidate>=g.INFINITE_CACHE)&&K.renderOpts.collectedRevalidate,a=void 0===K.renderOpts.collectedExpire||K.renderOpts.collectedExpire>=g.INFINITE_CACHE?void 0:K.renderOpts.collectedExpire;return{value:{kind:m.CachedRouteKind.APP_ROUTE,status:i.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==r?void 0:r.isStale)&&await C.onRequestError(e,t,{routerKind:"App Router",routePath:y,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:D,isOnDemandRevalidate:T})},!1,N),t}},p=await C.handleResponse({req:e,nextConfig:v,cacheKey:H,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:k,isRoutePPREnabled:!1,isOnDemandRevalidate:T,revalidateOnlyGenerated:P,responseGenerator:d,waitUntil:a.waitUntil,isMinimalMode:o});if(!I)return null;if((null==p||null==(i=p.value)?void 0:i.kind)!==m.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==p||null==(l=p.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});o||t.setHeader("x-nextjs-cache",T?"REVALIDATED":p.isMiss?"MISS":p.isStale?"STALE":"HIT"),A&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let x=(0,h.fromNodeOutgoingHttpHeaders)(p.value.headers);return o&&I||x.delete(g.NEXT_CACHE_TAGS_HEADER),!p.cacheControl||t.getHeader("Cache-Control")||x.get("Cache-Control")||x.set("Cache-Control",(0,f.getCacheControlHeader)(p.cacheControl)),await (0,u.sendResponse)(L,z,new Response(p.value.body,{headers:x,status:p.value.status||200})),null};$?await l($):await M.withPropagatedContext(e.headers,()=>M.trace(p.BaseServerSpan.handleRequest,{spanName:`${F} ${y}`,kind:i.SpanKind.SERVER,attributes:{"http.method":F,"http.target":e.url}},l))}catch(t){if(t instanceof x.NoFallbackError||await C.onRequestError(e,t,{routerKind:"App Router",routePath:q,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:D,isOnDemandRevalidate:T})},!1,N),I)throw t;return await (0,u.sendResponse)(L,z,new Response(null,{status:500})),null}}e.s(["handler",()=>P,"patchFetch",()=>T,"routeModule",()=>C,"serverHooks",()=>N,"workAsyncStorage",()=>A,"workUnitAsyncStorage",()=>k],18772)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__c0519199._.js.map