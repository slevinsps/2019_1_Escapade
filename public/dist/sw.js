var serviceWorkerOption = {
  "assets": [
    "/img/arrow-left.png",
    "/img/arrow-right.png",
    "/img/qrosh.png",
    "/bundle.js",
    "/index.html"
  ]
};
        
        !function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=0)}([function(e,t,n){(function(e){const{assets:t}=e.serviceWorkerOption;let n=[...t,"./"];n=n.map(t=>new URL(t,e.location).toString()),self.addEventListener("install",t=>{console.log("[SW] Install event"),t.waitUntil(e.caches.open("Escapade").then(e=>e.addAll(n)).then(()=>{console.log("Cached assets: main",n)}).catch(e=>{throw console.error(e),e}))}),self.addEventListener("fetch",e=>{e.respondWith(caches.match(e.request).then(t=>!navigator.onLine&&t?t:fetch(e.request)))})}).call(this,n(1))},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n}]);