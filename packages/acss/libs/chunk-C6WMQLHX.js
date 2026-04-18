import { a as a$1 } from './chunk-YTFRK3SF.js';
import { a } from './chunk-75QHTLFO.js';
import n from 'react';

var m=n.forwardRef(({id:e,classes:p,value:f,rows:c=5,cols:y=25,name:x,required:t,disabled:T,readOnly:b,validationState:h="none",errorMessage:u,hintText:v,onBlur:E,onPointerDown:M,onChange:N,onKeyDown:s,onEnter:i,styles:P,placeholder:g,...A},H)=>{let{disabledProps:o,handlers:I}=a(T,{handlers:{onChange:N,onBlur:E,onPointerDown:M,onKeyDown:r=>{r.key==="Enter"&&!r.shiftKey&&i&&i(r),s&&s(r);}},className:p}),L=h==="invalid",a$2=[];u&&e&&a$2.push(`${e}-error`),v&&e&&a$2.push(`${e}-hint`);let $=a$2.length>0?a$2.join(" "):void 0;return n.createElement(a$1,{as:"textarea",id:e,name:x,rows:c,cols:y,styles:P,className:o.className,"data-style":"textarea",required:t,value:f,"aria-disabled":o["aria-disabled"],"aria-required":t,"aria-invalid":L,"aria-describedby":$,readOnly:b,...I,ref:H,placeholder:g||`${t?"*":""} Message`,...A})});m.displayName="Textarea";var K=m;

export { m as a, K as b };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=chunk-C6WMQLHX.js.map