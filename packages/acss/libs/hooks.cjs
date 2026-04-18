'use strict';

var chunkXPF62L6O_cjs = require('./chunk-XPF62L6O.cjs');
require('./chunk-VJZL7B7W.cjs');
require('./chunk-MRXDGGCP.cjs');
var chunkTON2YGMD_cjs = require('./chunk-TON2YGMD.cjs');
var react = require('react');

var L=(o,a,n=1)=>{let[c,r]=react.useState(!1),[u,f]=react.useState({top:0,left:0});return {isVisible:c,popoverPosition:u,handlePointerEvent:d=>{d?.stopPropagation();let e=o.current?.offsetHeight||40;if(o.current){let s=o.current.getBoundingClientRect(),{scrollY:t,scrollX:m,innerHeight:i}=window,l=s.bottom+t+n,v=s.left+m,b=l+e,P=a.current?.offsetHeight??e,h=b>t+i?Math.max(t+i-P-e-n,t)-e-n:l;f({top:h,left:v}),r(!0);}},handlePointerLeave:()=>{r(!1);}}};

Object.defineProperty(exports, 'useBreadcrumbSegments', {
	enumerable: true,
	get: function () { return chunkXPF62L6O_cjs.a; }
});
Object.defineProperty(exports, 'useDisabledState', {
	enumerable: true,
	get: function () { return chunkTON2YGMD_cjs.a; }
});
exports.usePopover = L;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=hooks.cjs.map