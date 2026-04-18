export { a as useBreadcrumbSegments } from './chunk-NDPCQQBI.js';
import './chunk-SCJUEBAA.js';
import './chunk-YTFRK3SF.js';
export { a as useDisabledState } from './chunk-75QHTLFO.js';
import { useState } from 'react';

var L=(o,a,n=1)=>{let[c,r]=useState(!1),[u,f]=useState({top:0,left:0});return {isVisible:c,popoverPosition:u,handlePointerEvent:d=>{d?.stopPropagation();let e=o.current?.offsetHeight||40;if(o.current){let s=o.current.getBoundingClientRect(),{scrollY:t,scrollX:m,innerHeight:i}=window,l=s.bottom+t+n,v=s.left+m,b=l+e,P=a.current?.offsetHeight??e,h=b>t+i?Math.max(t+i-P-e-n,t)-e-n:l;f({top:h,left:v}),r(!0);}},handlePointerLeave:()=>{r(!1);}}};

export { L as usePopover };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=hooks.js.map