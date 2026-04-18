import { a as a$1 } from './chunk-2Z2FNWTQ.js';
import { a } from './chunk-YTFRK3SF.js';
import e from 'react';

var l=({id:n,children:a$1,classes:r,modalRef:d,openOnMount:i,...t})=>e.createElement(a,{as:"dialog",id:n,classes:r,ref:d,open:i,onClick:o=>{o.currentTarget===o.target&&o.currentTarget.close();},...t},a$1);e.memo(l);l.displayName="Dialog";var u=({openChild:n,closeChild:a,modalHeader:r,modalFooter:d,children:i,showOpen:t=!1,...p})=>{let o=e.useRef(null),f=()=>{o.current&&(t?o.current.show():o.current.showModal());},M=()=>{o.current&&o.current.close();};return e.createElement(e.Fragment,null,e.createElement(l,{modalRef:o,openOnMount:t,...p},e.createElement("section",null,r,i,d??e.createElement("div",null,e.createElement(a$1,{type:"button",pointerDown:()=>{M();}},a||"Close")," "))),!t&&e.createElement(a$1,{type:"button",pointerDown:f},n||"Open Modal"))};u.displayName="Modal";

export { u as a };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=chunk-SSPUDG4C.js.map