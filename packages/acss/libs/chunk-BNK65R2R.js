import { a } from './chunk-YTFRK3SF.js';
import p from 'react';

function i(...e){return e.filter(Boolean).join(" ")}var C={CARD:"card",TITLE:"card-title",CONTENT:"card-content",FOOTER:"card-footer"};function y(e,r){r&&(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),r(e));}var f=({children:e,className:r,style:o,as:t="h3",...a$1})=>p.createElement(a,{as:t,classes:i(C.TITLE,r),styles:o,...a$1},e);f.displayName="Card.Title";var b=({children:e,className:r,style:o,as:t="article",...a$1})=>p.createElement(a,{as:t,classes:i(C.CONTENT,r),styles:o,...a$1},e);b.displayName="Card.Content";var m=({children:e,className:r,style:o,as:t="div",...a$1})=>p.createElement(a,{as:t,classes:i(C.FOOTER,r),styles:o,...a$1},e);m.displayName="Card.Footer";var I=({as:e="div",styles:r,children:o,classes:t="shadow-sm",id:a$1,interactive:n=!1,onClick:s,tabIndex:u,role:c,"aria-label":T,"aria-labelledby":E,"aria-describedby":P,...v})=>(p.useEffect(()=>{},[s,n]),p.createElement(a,{as:e,id:a$1,styles:r,classes:t,"aria-label":T,"aria-labelledby":E,"aria-describedby":P,"data-card":n?"interactive":!0,...n?{role:c||"button",tabIndex:u??0,onClick:s,onKeyDown:x=>{(n||s)&&y(x,s);}}:{role:c,onClick:s},...v},o)),l=I;l.displayName="Card";l.Title=f;l.Content=b;l.Footer=m;var h=l;

export { f as a, b, m as c, l as d, h as e };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=chunk-BNK65R2R.js.map