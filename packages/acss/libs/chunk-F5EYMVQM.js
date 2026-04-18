import { a as a$2 } from './chunk-6SAHIYCZ.js';
import { a } from './chunk-BFK62VX5.js';
import { a as a$1 } from './chunk-75QHTLFO.js';
import f from 'react';

var c=f.forwardRef(({type:a$3="text",name:b,value:y,defaultValue:I,placeholder:h,id:e,styles:v,classes:D,isDisabled:P,disabled:g,readOnly:n,required:s=!1,validationState:i="none",errorMessage:x,hintText:E,onChange:L,onBlur:M,onFocus:N,onKeyDown:o,onEnter:l,maxLength:$,minLength:F,pattern:H,autoComplete:R,autoFocus:T=!1,inputMode:w,...A},B)=>{let S=a(g,P),{disabledProps:p,handlers:j}=a$1(S,{handlers:{onChange:L,onBlur:M,onKeyDown:r=>{r.key==="Enter"&&l&&l(r),o&&o(r);}},className:D}),k=i==="invalid",t=[];x&&e&&t.push(`${e}-error`),E&&e&&t.push(`${e}-hint`);let C=t.length>0?t.join(" "):void 0,K=h||(s?`* ${a$3} input`:`${a$3} input`);return f.createElement(a$2,{as:"input",ref:B,id:e,type:a$3,name:b,value:y,defaultValue:I,placeholder:K,className:p.className,styles:v,readOnly:n,required:s,maxLength:$,minLength:F,pattern:H,autoComplete:R,autoFocus:T,inputMode:w,...j,onFocus:N,"aria-disabled":p["aria-disabled"],"aria-readonly":n,"aria-required":s,"aria-invalid":k,"aria-describedby":C,"data-validation":i,...A})});c.displayName="Input";var J=c;

export { c as a, J as b };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=chunk-F5EYMVQM.js.map