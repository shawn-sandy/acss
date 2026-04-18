'use strict';

var react = require('react');

function g(T,a={}){let n=!!T,p=["handlers","className","disabledClassName","preventDefault","stopPropagation","removeFromTabOrder"],D=Object.keys(a).some(s=>p.includes(s))?a:{handlers:a},{handlers:t={},className:l="",disabledClassName:i="is-disabled",preventDefault:d=!0,stopPropagation:c=!0,removeFromTabOrder:v=!1}=D,o=react.useRef(t);return react.useEffect(()=>{o.current=t;},[t]),react.useMemo(()=>{let s=[n?i:"",l].filter(Boolean).map(e=>e.trim()).filter(e=>e.length>0).join(" "),b={"aria-disabled":n,className:s};v&&n&&(b.tabIndex=-1);let u={};return [{key:"onClick"},{key:"onChange"},{key:"onBlur"},{key:"onFocus",allowWhenDisabled:!0},{key:"onPointerDown"},{key:"onKeyDown"},{key:"onKeyUp"},{key:"onMouseDown"},{key:"onMouseUp"},{key:"onTouchStart"},{key:"onTouchEnd"}].forEach(({key:e,allowWhenDisabled:f=!1})=>{o.current[e]!==void 0&&(u[e]=r=>{if(n&&!f){d&&r.preventDefault(),c&&r.stopPropagation();return}o.current[e]?.(r);});}),{disabledProps:b,handlers:u}},[n,l,i,d,c,v])}

exports.a = g;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=chunk-TON2YGMD.cjs.map