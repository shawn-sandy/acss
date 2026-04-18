'use strict';

var chunkMRXDGGCP_cjs = require('./chunk-MRXDGGCP.cjs');
var chunkTON2YGMD_cjs = require('./chunk-TON2YGMD.cjs');
var e = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var e__default = /*#__PURE__*/_interopDefault(e);

var i=e__default.default.forwardRef(({href:r,target:o,rel:n,children:t,styles:u,prefetch:p=!1,btnStyle:h,onClick:y,onPointerDown:A,disabled:s,className:a,...P},w)=>{let{disabledProps:x,handlers:c}=chunkTON2YGMD_cjs.a(s,{handlers:{onClick:y,onPointerDown:A},className:a}),E=e__default.default.useMemo(()=>{if(o==="_blank"){let f=new Set(["noopener","noreferrer"]);return p&&f.add("prefetch"),n&&n.split(/\s+/).forEach(L=>{L&&f.add(L);}),Array.from(f).join(" ")}return n},[o,n,p]),b=s?void 0:r,H=s?{...x}:{className:a||void 0};return e__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:"a",ref:w,href:b,target:o,rel:E,styles:u,"data-btn":h,...H,onClick:c.onClick,onPointerDown:c.onPointerDown,...P},t)}),d=e__default.default.forwardRef(({href:r,icon:o,...n},t)=>e__default.default.createElement(i,{ref:t,href:r,...n},o)),l=e__default.default.forwardRef(({href:r,children:o,...n},t)=>e__default.default.createElement(i,{ref:t,href:r,...n},e__default.default.createElement("i",null,o)));i.displayName="Link";d.displayName="IconLink";l.displayName="LinkButton";var I=Object.assign(i,{LinkButton:l,IconLink:d}),R=I;

exports.a = i;
exports.b = d;
exports.c = l;
exports.d = R;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=chunk-VJZL7B7W.cjs.map