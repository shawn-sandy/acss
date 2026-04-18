'use strict';

var chunkPW5ZQFKC_cjs = require('./chunk-PW5ZQFKC.cjs');
var chunkMHFKHEPA_cjs = require('./chunk-MHFKHEPA.cjs');
var chunkHWHAWV4O_cjs = require('./chunk-HWHAWV4O.cjs');
var chunkMRXDGGCP_cjs = require('./chunk-MRXDGGCP.cjs');
var s = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var s__default = /*#__PURE__*/_interopDefault(s);

var f=({icon:e,label:o,variant:i="icon",type:t="button",...a})=>s__default.default.createElement(chunkHWHAWV4O_cjs.a,{variant:i,"data-icon-btn":o?"has-label":"icon",...a,type:t},e,o&&s__default.default.createElement("span",{"data-icon-label":!0},o));f.displayName="IconButton";var B=({dialogTitle:e,onClick:o,id:i,type:t="h3",closeIconSize:a=24})=>{let r=s.useCallback(()=>{o();},[o]);return s__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:"div",classes:"dialog-header"},s__default.default.createElement(chunkPW5ZQFKC_cjs.b,{type:t,className:"dialog-title",id:i},e||"Dialog"),s__default.default.createElement(f,{type:"button",onClick:r,className:"dialog-close","aria-label":"Close dialog",icon:s__default.default.createElement(chunkMHFKHEPA_cjs.b,null,s__default.default.createElement(chunkMHFKHEPA_cjs.b.Remove,{size:a}))}))},H=s__default.default.memo(B);B.displayName="DialogHeader";var P=({onClose:e,onConfirm:o,confirmLabel:i,cancelLabel:t})=>{let a=s.useCallback(()=>{e();},[e]),r=s.useCallback(()=>{o&&o();},[o]);return s__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:"section",className:"dialog-footer"},t&&s__default.default.createElement(chunkHWHAWV4O_cjs.b,{type:"button",onClick:a,className:"dialog-button button-secondary","data-btn":"sm"},t),o&&s__default.default.createElement(chunkHWHAWV4O_cjs.b,{type:"button",onClick:r,className:"dialog-button button-primary","data-btn":"sm"},i))};P.displayName="DialogFooter";var v=s__default.default.memo(P);var F=(e,o)=>s.useCallback(t=>{let a=e.current?.getBoundingClientRect();a&&(t.clientY<a.top||t.clientY>a.bottom||t.clientX<a.left||t.clientX>a.right)&&o();},[e,o]);var x=({isOpen:e,onOpenChange:o,isAlertDialog:i=!1,onClose:t,dialogTitle:a,dialogLabel:r,children:U,onConfirm:E,confirmLabel:M="Confirm",cancelLabel:T="Cancel",className:W="",hideFooter:O=!1,styles:j,size:b,position:y="center",closeIconSize:w})=>{let p=s.useRef(null),C=s.useId();s.useEffect(()=>{let n=p.current;n&&(e?i?n.show():n.showModal():n.close());},[e,i]);let d=s.useCallback(()=>{o(!1),t&&t();},[o,t]),z=F(p,d),D=s.useId();return s__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:"dialog",role:i?"alertdialog":"dialog",ref:p,onClose:d,onClick:z,"aria-modal":e&&!i?"true":void 0,"aria-labelledby":C,"aria-describedby":D,"aria-label":r,className:`dialog-modal ${W}`.trim(),style:j,...b&&{"data-size":b},...y&&{"data-position":y}},s__default.default.createElement(H,{dialogTitle:a,onClick:d,id:C,closeIconSize:w}),s__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:"section",id:D,className:"dialog-content",onClick:n=>n.stopPropagation()},U,!O&&s__default.default.createElement(v,{onClose:d,onConfirm:E,confirmLabel:M,cancelLabel:T})))};x.displayName="Dialog";var uo=s__default.default.memo(x);

exports.a = f;
exports.b = x;
exports.c = uo;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=chunk-VHMRNZA5.cjs.map