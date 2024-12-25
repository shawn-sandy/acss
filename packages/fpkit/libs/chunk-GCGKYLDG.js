import { useState } from 'react';

var E=(o,p,n=1)=>{let[a,r]=useState(!1),[u,f]=useState({top:0,left:0});return {isVisible:a,popoverPosition:u,handlePointerEvent:v=>{v?.stopPropagation();let t=o.current?.offsetHeight||40;if(o.current){let s=o.current.getBoundingClientRect(),{scrollY:e,scrollX:h,innerHeight:i}=window,c=s.bottom+e+n,m=s.left+h,P=c+t,H=p.current?.offsetHeight??t,d=P>e+i?Math.max(e+i-H-t-n,e)-t-n:c;f({top:d,left:m}),r(!0);}},handlePointerLeave:()=>{r(!1);}}},b=E;

export { E as a, b };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=chunk-GCGKYLDG.js.map