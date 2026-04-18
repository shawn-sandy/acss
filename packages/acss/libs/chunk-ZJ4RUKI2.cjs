'use strict';

var t = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var t__default = /*#__PURE__*/_interopDefault(t);

var u=({id:g,children:f,trigger:s,triggerLabel:i="Open",mode:l="auto",placement:v="bottom",isOpen:r,onToggle:p,showCloseButton:c,showArrow:m=!0,closeButtonLabel:b="Close",className:h="",styles:P})=>{let y=t.useId(),n=g||y,a=t.useRef(null),E=c!==void 0?c:l==="manual";return t.useEffect(()=>{let e=a.current;if(e&&r!==void 0)try{let o=e.matches(":popover-open")||e.hasAttribute("data-popover-open");r&&!o?e.showPopover():!r&&o&&e.hidePopover();}catch{let o=e.hasAttribute("data-popover-open");r&&!o?e.showPopover():!r&&o&&e.hidePopover();}},[r]),t.useEffect(()=>{let e=a.current;if(!e||!p)return;let o=N=>{p(N.newState==="open");};return e.addEventListener("toggle",o),()=>e.removeEventListener("toggle",o)},[p]),t__default.default.createElement(t__default.default.Fragment,null,(()=>s?t__default.default.cloneElement(s,{popovertarget:n,popovertargetaction:"toggle"}):t__default.default.createElement("button",{type:"button",popovertarget:n,popovertargetaction:"toggle","aria-label":i,className:"fpkit-popover-trigger"},i))(),t__default.default.createElement("div",{ref:a,id:n,popover:l,className:`fpkit-popover ${h}`.trim(),"data-placement":v,style:P},m&&t__default.default.createElement("div",{className:"fpkit-popover-arrow","data-placement":v}),t__default.default.createElement("div",{className:"fpkit-popover-content"},f,E&&t__default.default.createElement("button",{type:"button",popovertarget:n,popovertargetaction:"hide","aria-label":b,className:"fpkit-popover-close"},"\u2715"))))},S=u;u.displayName="Popover";

exports.a = u;
exports.b = S;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=chunk-ZJ4RUKI2.cjs.map