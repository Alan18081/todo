"use strict";var precacheConfig=[["/todo/index.html","106f1087a2c1c9b3f088daca42f71e79"],["/todo/static/css/main.706cd95e.css","0d0f0873af267fc96d48417bf15c905d"],["/todo/static/js/main.00f9bf93.js","ef5257776ee5f38523a1cdbdff157fe8"],["/todo/static/media/BadScriptRegular.d47601df.woff","d47601dfccbf9991baedfdcfae794191"],["/todo/static/media/BadScriptRegular.d5cc3f06.ttf","d5cc3f06dce4a2ff8e61494ba870b5d3"],["/todo/static/media/BadScriptRegular.e7c71c0e.eot","e7c71c0e0f06747c6b81051a661aa1ba"],["/todo/static/media/LatoBold.0958bee1.eot","0958bee1aab4a541adb8a385c8c0a89b"],["/todo/static/media/LatoBold.5ff0c767.ttf","5ff0c76777f2da0cfdc3c83cb2b3fe5b"],["/todo/static/media/LatoBold.69827817.woff","69827817e7ae6374ceec8a4a5bb48031"],["/todo/static/media/LatoRegular.86c5fe93.woff","86c5fe9368fb3e32640c10eef2693878"],["/todo/static/media/LatoRegular.9842b6be.eot","9842b6be6cb4ccc6358f31871381e472"],["/todo/static/media/LatoRegular.f844c058.ttf","f844c0585208a53a41b1b71909e8b499"],["/todo/static/media/no_user_image.ab222585.jpg","ab222585a6cb00e2afa1fd4aa81d5770"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var n=new Request(a,{credentials:"same-origin"});return fetch(n).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),n="index.html";(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),t=urlsToCacheKeys.has(a));var r="/todo/index.html";!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL(r,self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});