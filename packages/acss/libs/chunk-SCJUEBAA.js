import { a as a$1 } from './chunk-YTFRK3SF.js';
import { a } from './chunk-75QHTLFO.js';
import e from 'react';

var i=e.forwardRef(({href:r,target:o,rel:n,children:t,styles:u,prefetch:p=!1,btnStyle:h,onClick:y,onPointerDown:A,disabled:s,className:a$2,...P},w)=>{let{disabledProps:x,handlers:c}=a(s,{handlers:{onClick:y,onPointerDown:A},className:a$2}),E=e.useMemo(()=>{if(o==="_blank"){let f=new Set(["noopener","noreferrer"]);return p&&f.add("prefetch"),n&&n.split(/\s+/).forEach(L=>{L&&f.add(L);}),Array.from(f).join(" ")}return n},[o,n,p]),b=s?void 0:r,H=s?{...x}:{className:a$2||void 0};return e.createElement(a$1,{as:"a",ref:w,href:b,target:o,rel:E,styles:u,"data-btn":h,...H,onClick:c.onClick,onPointerDown:c.onPointerDown,...P},t)}),d=e.forwardRef(({href:r,icon:o,...n},t)=>e.createElement(i,{ref:t,href:r,...n},o)),l=e.forwardRef(({href:r,children:o,...n},t)=>e.createElement(i,{ref:t,href:r,...n},e.createElement("i",null,o)));i.displayName="Link";d.displayName="IconLink";l.displayName="LinkButton";var I=Object.assign(i,{LinkButton:l,IconLink:d}),R=I;

export { i as a, d as b, l as c, R as d };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=chunk-SCJUEBAA.js.map