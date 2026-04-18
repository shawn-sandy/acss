'use strict';

var chunkMRXDGGCP_cjs = require('./chunk-MRXDGGCP.cjs');
var chunkTON2YGMD_cjs = require('./chunk-TON2YGMD.cjs');
var n = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var n__default = /*#__PURE__*/_interopDefault(n);

var m=n__default.default.forwardRef(({id:e,classes:p,value:f,rows:c=5,cols:y=25,name:x,required:t,disabled:T,readOnly:b,validationState:h="none",errorMessage:u,hintText:v,onBlur:E,onPointerDown:M,onChange:N,onKeyDown:s,onEnter:i,styles:P,placeholder:g,...A},H)=>{let{disabledProps:o,handlers:I}=chunkTON2YGMD_cjs.a(T,{handlers:{onChange:N,onBlur:E,onPointerDown:M,onKeyDown:r=>{r.key==="Enter"&&!r.shiftKey&&i&&i(r),s&&s(r);}},className:p}),L=h==="invalid",a=[];u&&e&&a.push(`${e}-error`),v&&e&&a.push(`${e}-hint`);let $=a.length>0?a.join(" "):void 0;return n__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:"textarea",id:e,name:x,rows:c,cols:y,styles:P,className:o.className,"data-style":"textarea",required:t,value:f,"aria-disabled":o["aria-disabled"],"aria-required":t,"aria-invalid":L,"aria-describedby":$,readOnly:b,...I,ref:H,placeholder:g||`${t?"*":""} Message`,...A})});m.displayName="Textarea";var K=m;

exports.a = m;
exports.b = K;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=chunk-26UJBPF4.cjs.map