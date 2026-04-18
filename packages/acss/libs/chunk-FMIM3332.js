import { a as a$1 } from './chunk-6SAHIYCZ.js';
import r from 'react';

var s=({children:e,...o})=>r.createElement(a$1,{as:"caption",...o},e),m=({children:e,...o})=>r.createElement(a$1,{as:"thead",...o},e),a=({children:e,...o})=>r.createElement(a$1,{as:"tbody",...o},e),i=({children:e,...o})=>r.createElement(a$1,{as:"tr",...o},e),y=({children:e,...o})=>r.createElement(a$1,{as:"td",...o},e),T=({id:e,children:o,...n})=>r.createElement(a$1,{as:"section",id:e,...n,"data-style":"table-wrapper"},r.createElement("table",null,o));T.displayName="Table";s.displayName="Caption";m.displayName="Thead";a.displayName="Tbody";i.displayName="Tr";y.displayName="Td";var l=e=>{let o=e.map((n,d)=>r.createElement("th",{key:d},n));return r.createElement("tr",null,o)},b=e=>{let o=e.map((n,d)=>r.createElement("tr",{key:d}));return r.createElement(a,null,o)},P=({tblBody:e,tblCaption:o,tblHead:n})=>r.createElement(T,null,o&&r.createElement(s,null,o),r.createElement(m,null,r.createElement(i,null,n)),r.createElement(a,null,e));P.displayName="TBL";b.displayName="renderBody";l.displayName="renderHead";

export { s as a, m as b, a as c, i as d, y as e, T as f, l as g, b as h, P as i };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=chunk-FMIM3332.js.map