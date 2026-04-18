'use strict';

var chunkHWHAWV4O_cjs = require('./chunk-HWHAWV4O.cjs');
var chunkMRXDGGCP_cjs = require('./chunk-MRXDGGCP.cjs');
var e = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var e__default = /*#__PURE__*/_interopDefault(e);

var l=({id:n,children:a,classes:r,modalRef:d,openOnMount:i,...t})=>e__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:"dialog",id:n,classes:r,ref:d,open:i,onClick:o=>{o.currentTarget===o.target&&o.currentTarget.close();},...t},a);e__default.default.memo(l);l.displayName="Dialog";var u=({openChild:n,closeChild:a,modalHeader:r,modalFooter:d,children:i,showOpen:t=!1,...p})=>{let o=e__default.default.useRef(null),f=()=>{o.current&&(t?o.current.show():o.current.showModal());},M=()=>{o.current&&o.current.close();};return e__default.default.createElement(e__default.default.Fragment,null,e__default.default.createElement(l,{modalRef:o,openOnMount:t,...p},e__default.default.createElement("section",null,r,i,d??e__default.default.createElement("div",null,e__default.default.createElement(chunkHWHAWV4O_cjs.a,{type:"button",pointerDown:()=>{M();}},a||"Close")," "))),!t&&e__default.default.createElement(chunkHWHAWV4O_cjs.a,{type:"button",pointerDown:f},n||"Open Modal"))};u.displayName="Modal";

exports.a = u;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=chunk-GE52PEWN.cjs.map