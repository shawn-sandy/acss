'use strict';

var chunkVJZL7B7W_cjs = require('./chunk-VJZL7B7W.cjs');
var chunkMRXDGGCP_cjs = require('./chunk-MRXDGGCP.cjs');
var e = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var e__default = /*#__PURE__*/_interopDefault(e);

var U=(r,t=15)=>r.length>t?`${r.slice(0,t)}...`:r;var i=e__default.default.memo(({children:r,id:t,styles:s,classes:a,...m})=>{let{renderStyles:n,defaultStyles:o,as:d,ref:I,...p}=m;return e__default.default.createElement("li",{id:t,style:s,className:a,"data-list":"unstyled inline",...p},r)});i.displayName="BreadcrumbItem";var y=e__default.default.memo(({children:r,...t})=>e__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:"ol","data-list":"unstyled inline",...t},r));y.displayName="BreadcrumbList";var B=e__default.default.memo(({styles:r,id:t,classes:s,children:a,...m})=>e__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:"nav",id:t,styles:r,className:s,...m},e__default.default.createElement(y,null,a)));B.displayName="BreadcrumbNav";function w(r,t){let s=e__default.default.useMemo(()=>r?r.split("/").filter(n=>n):[],[r]),a=e__default.default.useCallback(n=>{let o=t?.find(d=>d.path===n);return {path:o?.path||n,name:o?.name||n,url:o?.url||n}},[t]),m=e__default.default.useMemo(()=>s.map((n,o)=>({...a(n),isLast:o===s.length-1,index:o})),[s,a]);return {segments:m,hasSegments:m.length>0}}var l=({startRoute:r="Home",startRouteUrl:t="/",currentRoute:s,spacer:a=e__default.default.createElement(e__default.default.Fragment,null,"/"),routes:m,styles:n,id:o,classes:d,ariaLabel:I="Breadcrumb",truncateLength:p=15,linkProps:N,...k})=>{let{segments:L,hasSegments:v}=w(s,m),b=e__default.default.useId();return !s?.length||!v?null:e__default.default.createElement(B,{id:o,styles:n,className:d,"aria-label":I,...k},e__default.default.createElement(i,{key:`start-${b}`},e__default.default.createElement(chunkVJZL7B7W_cjs.d,{href:t,...N},r)),L.map(({name:$,url:x,path:u,isLast:S,index:h})=>{let c=decodeURIComponent($),C=U(c,p),P=c.length>p;if(S){let M=h>0?L[h-1].path:null;return !u||u.length<=3||u===M?null:e__default.default.createElement(i,{key:`${u}-${b}`},e__default.default.createElement("span",{"aria-hidden":"true"},a),e__default.default.createElement("span",{"aria-current":"page","aria-label":P?c:void 0},C))}return e__default.default.createElement(i,{key:`${u}-${b}`},e__default.default.createElement("span",{"aria-hidden":"true"},a),e__default.default.createElement(chunkVJZL7B7W_cjs.d,{href:x,"aria-label":P?c:void 0,...N},C))}))},H=l;l.displayName="Breadcrumb";l.Nav=B;l.List=y;l.Item=i;

exports.a = w;
exports.b = l;
exports.c = H;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=chunk-XPF62L6O.cjs.map