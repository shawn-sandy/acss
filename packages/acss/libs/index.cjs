'use strict';

var chunk26UJBPF4_cjs = require('./chunk-26UJBPF4.cjs');
var chunkQWDSXFOA_cjs = require('./chunk-QWDSXFOA.cjs');
var chunkTNEJXNZA_cjs = require('./chunk-TNEJXNZA.cjs');
var chunkVHMRNZA5_cjs = require('./chunk-VHMRNZA5.cjs');
var chunkM5QDLV7R_cjs = require('./chunk-M5QDLV7R.cjs');
var chunkVUKCW3TW_cjs = require('./chunk-VUKCW3TW.cjs');
var chunkZJ4RUKI2_cjs = require('./chunk-ZJ4RUKI2.cjs');
var chunkHRNA4F4M_cjs = require('./chunk-HRNA4F4M.cjs');
var chunkPW5ZQFKC_cjs = require('./chunk-PW5ZQFKC.cjs');
var chunkXPF62L6O_cjs = require('./chunk-XPF62L6O.cjs');
var chunkMHFKHEPA_cjs = require('./chunk-MHFKHEPA.cjs');
var chunkIKQSKTY6_cjs = require('./chunk-IKQSKTY6.cjs');
var chunkGE52PEWN_cjs = require('./chunk-GE52PEWN.cjs');
var chunkHWHAWV4O_cjs = require('./chunk-HWHAWV4O.cjs');
var chunk4BZKFPEC_cjs = require('./chunk-4BZKFPEC.cjs');
var chunkE2AJURUW_cjs = require('./chunk-E2AJURUW.cjs');
require('./chunk-PNWIRCG3.cjs');
var chunkVJZL7B7W_cjs = require('./chunk-VJZL7B7W.cjs');
var chunkMRXDGGCP_cjs = require('./chunk-MRXDGGCP.cjs');
require('./chunk-TON2YGMD.cjs');
var v = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var v__default = /*#__PURE__*/_interopDefault(v);

var Ze={default:"",info:"Information: ",success:"Success: ",warning:"Warning: ",error:"Error: "},Y=({severity:e})=>{let t=Ze[e];return t?v__default.default.createElement("span",{className:"sr-only"},t):null};var et=(e,t)=>({info:v__default.default.createElement(chunkMHFKHEPA_cjs.b.InfoSolid,{...t}),success:v__default.default.createElement(chunkMHFKHEPA_cjs.b.SuccessSolid,{...t}),warning:v__default.default.createElement(chunkMHFKHEPA_cjs.b.WarnSolid,{...t}),error:v__default.default.createElement(chunkMHFKHEPA_cjs.b.AlertSolid,{...t}),default:v__default.default.createElement(chunkMHFKHEPA_cjs.b.AlertSquareSolid,{...t})})[e],q=({severity:e,iconProps:t,hideIcon:r})=>{if(r)return null;let o=et(e,t);return v__default.default.createElement(chunkMRXDGGCP_cjs.a,{"aria-hidden":"true",className:"alert-icon"},o)};var J=({title:e,titleLevel:t})=>{if(!e)return null;let r=t?`h${t}`:"strong";return v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:r,className:"alert-title"},e)};var X=({children:e,contentType:t})=>t==="node"?v__default.default.createElement(v__default.default.Fragment,null,e):v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:"p"},e);var Q=({actions:e})=>e?v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:"div",className:"alert-actions"},e):null;var ne=v__default.default.memo(({onDismiss:e,iconSize:t=16})=>v__default.default.createElement(chunkHWHAWV4O_cjs.b,{type:"button",onClick:e,"aria-label":"Close alert",className:"alert-dismiss","data-btn":"icon sm"},v__default.default.createElement(chunkMHFKHEPA_cjs.b,null,v__default.default.createElement(chunkMHFKHEPA_cjs.b.Close,{size:t})))),le=ne;ne.displayName="DismissButton";var rt={default:"polite",info:"polite",success:"polite",warning:"polite",error:"assertive"},G=v__default.default.forwardRef(({severity:e,variant:t,isVisible:r,dismissible:o,onDismiss:s,onInteractionStart:n,onInteractionEnd:l,autoFocus:a,title:c,titleLevel:d,children:p,contentType:m,actions:x,hideIcon:g,iconProps:P,...h},y)=>v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:"div",ref:y,role:"alert","aria-live":rt[e],"aria-atomic":"true",className:`alert alert-${e}`,"data-alert":e,"data-visible":r,"data-variant":t,tabIndex:a?-1:void 0,onMouseEnter:n,onMouseLeave:l,onFocus:n,onBlur:l,...h},v__default.default.createElement(Y,{severity:e}),v__default.default.createElement(q,{severity:e,iconProps:P,hideIcon:g}),v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:"div",classes:"alert-message"},v__default.default.createElement(J,{title:c,titleLevel:d}),v__default.default.createElement(X,{contentType:m},p),v__default.default.createElement(Q,{actions:x})),o&&v__default.default.createElement(le,{onDismiss:s})));G.displayName="AlertView";var st=({open:e,onDismiss:t,dismissible:r,autoHideDuration:o,pauseOnHover:s,autoFocus:n,alertRef:l})=>{let[a,c]=v__default.default.useState(e),[d,p]=v__default.default.useState(e),[m,x]=v__default.default.useState(!1),g=v__default.default.useCallback(()=>{c(!1),setTimeout(()=>{p(!1),t?.();},300);},[t]);v__default.default.useEffect(()=>{e?(p(!0),c(!0)):c(!1);},[e]),v__default.default.useEffect(()=>{if(!o||!a||m)return;let y=setTimeout(()=>{g();},o);return ()=>clearTimeout(y)},[o,a,m,g]),v__default.default.useEffect(()=>{if(!r||!a)return;let y=T=>{T.key==="Escape"&&g();};return document.addEventListener("keydown",y),()=>document.removeEventListener("keydown",y)},[r,a,g]),v__default.default.useEffect(()=>{n&&a&&l.current&&l.current.focus();},[n,a,l]);let P=v__default.default.useCallback(()=>{s&&o&&x(!0);},[s,o]),h=v__default.default.useCallback(()=>{s&&o&&x(!1);},[s,o]);return {isVisible:a,shouldRender:d,handleDismiss:g,handleInteractionStart:P,handleInteractionEnd:h}},ae=({open:e,severity:t="default",children:r,title:o,dismissible:s=!1,onDismiss:n,iconSize:l,iconProps:a,hideIcon:c,autoHideDuration:d,pauseOnHover:p=!0,titleLevel:m=3,actions:x,autoFocus:g=!1,variant:P="outlined",contentType:h="text",...y})=>{let T=v__default.default.useRef(null),{isVisible:u,shouldRender:f,handleDismiss:w,handleInteractionStart:I,handleInteractionEnd:b}=st({open:e,onDismiss:n,dismissible:s,autoHideDuration:d,pauseOnHover:p,autoFocus:g,alertRef:T});if(!f)return null;let k={size:l||16,...a};return v__default.default.createElement(G,{ref:T,severity:t,variant:P,isVisible:u,dismissible:s,onDismiss:w,onInteractionStart:I,onInteractionEnd:b,autoFocus:g,title:o,titleLevel:m,contentType:h,actions:x,hideIcon:c,iconProps:k,...y},r)};ae.displayName="Alert";var ie=v__default.default.forwardRef(({id:e,label:t,checked:r,defaultChecked:o,value:s="on",onChange:n,classes:l,inputClasses:a,styles:c,size:d,name:p,disabled:m,required:x,validationState:g,errorMessage:P,hintText:h,onBlur:y,onFocus:T,autoFocus:u,...f},w)=>{let I=v__default.default.useCallback(Le=>{n?.(Le.target.checked);},[n]),b=r!==void 0,k=b?{checked:r}:{},N=!b&&o!==void 0?{defaultChecked:o}:{},z=v__default.default.useRef(b);return v__default.default.useEffect(()=>{process.env.NODE_ENV==="development"&&(z.current!==b&&console.warn(`Checkbox with id="${e}" is changing from ${z.current?"controlled":"uncontrolled"} to ${b?"controlled":"uncontrolled"}. This is likely a bug. Decide between using "checked" (controlled) or "defaultChecked" (uncontrolled) and stick with it.`),z.current=b);},[b,e]),v__default.default.createElement("div",{className:l,style:c,"data-checkbox-size":d},v__default.default.createElement(chunk4BZKFPEC_cjs.a,{ref:w,type:"checkbox",id:e,name:p,value:s,...k,...N,classes:a||"checkbox-input",disabled:m,required:x,validationState:g,errorMessage:P,hintText:h,onChange:I,onBlur:y,onFocus:T,autoFocus:u,...f}),v__default.default.createElement("label",{htmlFor:e,className:"checkbox-label"},t,x&&v__default.default.createElement("span",{className:"checkbox-required","aria-label":"required"}," *")))});ie.displayName="Checkbox";var pe=({src:e="//",alt:t,width:r=480,height:o,styles:s,loading:n="lazy",placeholder:l,fetchpriority:a="low",decoding:c="auto",srcSet:d,sizes:p,onError:m,onLoad:x,...g})=>{let P=v.useMemo(()=>{let u=typeof r=="number"?r:480,f=typeof o=="number"?o:Math.round(u*.75),w=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${u} ${f}">
      <defs>
        <linearGradient id="grad-${u}-${f}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#8b5cf6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${u}" height="${f}" fill="url(#grad-${u}-${f})"/>
      <circle cx="${u*.15}" cy="${f*.2}" r="${Math.min(u,f)*.08}" fill="rgba(255,255,255,0.2)"/>
      <path d="M0,${f*.75} Q${u*.25},${f*.65} ${u*.5},${f*.75} T${u},${f*.75} L${u},${f} L0,${f} Z" fill="rgba(0,0,0,0.15)"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-size="${Math.max(16,Math.min(u,f)*.05)}" font-weight="500" fill="rgba(255,255,255,0.9)">${u}\xD7${f}</text>
    </svg>`;return `data:image/svg+xml,${encodeURIComponent(w)}`},[r,o]),h=l??P;return v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:"img",src:e,alt:t,width:r,height:o||"auto",loading:n,style:s,srcSet:d,sizes:p,onError:u=>{m&&m(u),u.defaultPrevented||u.currentTarget.src!==h&&(u.currentTarget.src=h);},onLoad:u=>{x?.(u);},decoding:c,...g,...a&&{fetchpriority:a}})};pe.displayName="Img";var me=({isAlertDialog:e=!1,onClose:t,dialogTitle:r,dialogLabel:o,btnLabel:s="Open Dialog",btnSize:n="sm",btnOnClick:l,children:a,onConfirm:c,confirmLabel:d="Confirm",cancelLabel:p="Cancel",className:m,hideFooter:x=!1,btnProps:g,icon:P,size:h,position:y,closeIconSize:T})=>{let[u,f]=v.useState(!1),w=v.useRef(null),I=v.useCallback(N=>{f(N),!N&&t&&t();},[t]),b=v.useCallback(()=>{w.current=document.activeElement,f(!0),l&&l();},[l]);v.useEffect(()=>{if(!u&&w.current){let N=setTimeout(()=>{w.current?.focus();},100);return ()=>clearTimeout(N)}},[u]);let k={type:"button",onClick:b,"aria-haspopup":"dialog",...g};return v__default.default.createElement(v__default.default.Fragment,null,P?v__default.default.createElement(chunkVHMRNZA5_cjs.a,{icon:P,"aria-label":s,label:s,size:n,...k}):v__default.default.createElement(chunkHWHAWV4O_cjs.b,{"data-btn":n,...k},s),v__default.default.createElement(chunkVHMRNZA5_cjs.c,{isOpen:u,onOpenChange:I,dialogTitle:r,dialogLabel:o,className:m,isAlertDialog:e,onConfirm:c,confirmLabel:d,cancelLabel:p,hideFooter:x,size:h,position:y,closeIconSize:T},a))};me.displayName="DialogModal";var F=e=>v__default.default.createElement(v__default.default.Fragment,null,e),ct=({id:e,children:t,headerBackground:r,styles:o,classes:s,...n})=>v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:"header",id:e,styles:o,className:s,...n},r,v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:"section"},t)),mt=({id:e,children:t,styles:r,classes:o,...s})=>v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:"main",id:e,styles:r,...s,className:o},t),ft=({id:e,classes:t,children:r,styles:o={},...s})=>v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:"footer",id:e,className:t,styles:o,...s},v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:"section"},r||"Copyright \xA9 2022")),dt=({id:e,children:t,styles:r={},classes:o,...s})=>v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:"aside",id:e,styles:r,className:o,...s},v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:"section"},t)),ut=({id:e,children:t,styles:r,classes:o,...s})=>v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:"section",id:e,styles:r,className:o,...s},t),xt=({id:e,children:t,styles:r,classes:o,...s})=>v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:"article",id:e,styles:r,className:o,...s},t),ht=({id:e,children:t,legend:r,description:o,descriptionId:s,styles:n,classes:l,...a})=>{let c=s||(o?`${e}-desc`:void 0);return v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:"fieldset",id:e,styles:n,className:l,"aria-describedby":c,...a},r&&v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:"legend"},r),o&&v__default.default.createElement("p",{id:c,className:"fieldset-description"},o),t)};F.displayName="Landmarks";F.Header=ct;F.Main=mt;F.Footer=ft;F.Aside=dt;F.Section=ut;F.Article=xt;F.Fieldset=ht;var de=v__default.default.forwardRef(({padding:e,paddingInline:t,paddingBlock:r,margin:o,marginInline:s,marginBlock:n,width:l,maxWidth:a,radius:c,as:d="div",className:p,classes:m,children:x,...g},P)=>{let h=[];e&&h.push(`box-padding-${e}`),t&&h.push(`box-padding-inline-${t}`),r&&h.push(`box-padding-block-${r}`),o&&h.push(`box-margin-${o}`),s&&h.push(`box-margin-inline-${s}`),n&&h.push(`box-margin-block-${n}`),l&&h.push(`box-width-${l}`),a&&h.push(`box-max-width-${a}`),c&&h.push(`box-radius-${c}`);let y=[...h,p,m].filter(Boolean).join(" ");return v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:d,ref:P,classes:y||void 0,...g},x)});de.displayName="Box";var xe=v__default.default.forwardRef(({gap:e,direction:t="vertical",align:r,justify:o,wrap:s,as:n="div",className:l,classes:a,children:c,...d},p)=>{let m=["stack"];t==="horizontal"?m.push("stack-horizontal"):m.push("stack-vertical"),e&&m.push(`stack-gap-${e}`),r&&m.push(`stack-align-${r}`),o&&m.push(`stack-justify-${o}`),s&&m.push(`stack-${s}`);let x=[...m,l,a].filter(Boolean).join(" ");return v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:n,ref:p,classes:x,...d},c)});xe.displayName="Stack";var ye=v__default.default.forwardRef(({gap:e,justify:t,align:r,as:o="div",className:s,classes:n,children:l,...a},c)=>{let d=["cluster"];e&&d.push(`cluster-gap-${e}`),t&&d.push(`cluster-justify-${t}`),r&&d.push(`cluster-align-${r}`);let p=[...d,s,n].filter(Boolean).join(" ");return v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:o,ref:c,classes:p,...a},l)});ye.displayName="Cluster";var ge=v__default.default.forwardRef(({columns:e,auto:t,minColumnWidth:r,gap:o,gapX:s,gapY:n,justifyItems:l,alignItems:a,as:c="div",className:d,classes:p,children:m,style:x,styles:g,...P},h)=>{let y=["grid"];e&&y.push(`grid-cols-${e}`),t&&y.push(`grid-auto-${t}`),o&&y.push(`grid-gap-${o}`),s&&y.push(`grid-gap-x-${s}`),n&&y.push(`grid-gap-y-${n}`),l&&y.push(`grid-justify-items-${l}`),a&&y.push(`grid-align-items-${a}`);let T=[...y,d,p].filter(Boolean).join(" "),u={...x||{},...g||{}};return t&&r&&(u.gridTemplateColumns=`repeat(auto-${t}, minmax(${r}, 1fr))`),v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:c,ref:h,classes:T,style:Object.keys(u).length>0?u:void 0,...P},m)});ge.displayName="Grid";var Z=v__default.default.forwardRef(({span:e,rowSpan:t,as:r="div",className:o,classes:s,children:n,...l},a)=>{let c=[];e&&c.push(`grid-col-span-${e}`),t&&c.push(`grid-row-span-${t}`);let d=[...c,o,s].filter(Boolean).join(" ");return v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:r,ref:a,classes:d,...l},n)});Z.displayName="GridItem";var Pe=ge;Pe.Item=Z;var yt=Pe;var Ie=v__default.default.forwardRef(({gap:e,justify:t,align:r,wrap:o,alwaysProportional:s=!1,as:n="div",className:l,classes:a,children:c,...d},p)=>{process.env.NODE_ENV==="development"&&s&&console.warn('[fpkit] Row: alwaysProportional is deprecated and will be removed in v5.0.0. Use responsive column utilities instead: className="col-sm-6 col-md-4"');let m=["col-row"];e&&m.push(`col-row-gap-${e}`),t&&m.push(`col-row-justify-${t}`),r&&m.push(`col-row-align-${r}`),o&&o!=="wrap"&&m.push(`col-row-${o}`),s&&m.push("col-row-proportional");let x=[...m,l,a].filter(Boolean).join(" ");return v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:n,ref:p,classes:x,...d},c)});Ie.displayName="Row";var be=v__default.default.forwardRef(({span:e,offset:t,order:r,auto:o=!1,as:s="div",className:n,classes:l,children:a,...c},d)=>{let p=[];o?p.push("col-auto"):e==="flex"?p.push("col-flex"):e&&p.push(`col-${e}`),t!==void 0&&p.push(`col-offset-${t}`),r!==void 0&&p.push(`col-order-${r}`);let m=[...p,n,l].filter(Boolean).join(" ");return v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:s,ref:d,classes:m,...c},a)});be.displayName="Col";var B=(e,t="")=>{let r=[];if(e.direction){let o={row:"flex-row","row-reverse":"flex-row-reverse",column:"flex-col","column-reverse":"flex-col-reverse"};r.push(`${t}${o[e.direction]}`);}if(e.wrap){let o={wrap:"flex-wrap",nowrap:"flex-nowrap","wrap-reverse":"flex-wrap-reverse"};r.push(`${t}${o[e.wrap]}`);}if(e.gap&&r.push(`${t}gap-${e.gap}`),e.rowGap&&r.push(`${t}row-gap-${e.rowGap}`),e.colGap&&r.push(`${t}col-gap-${e.colGap}`),e.justify){let o={start:"justify-start",end:"justify-end",center:"justify-center",between:"justify-between",around:"justify-around",evenly:"justify-evenly"};r.push(`${t}${o[e.justify]}`);}if(e.align){let o={start:"items-start",end:"items-end",center:"items-center",baseline:"items-baseline",stretch:"items-stretch"};r.push(`${t}${o[e.align]}`);}if(e.alignContent){let o={start:"content-start",end:"content-end",center:"content-center",between:"content-between",around:"content-around",evenly:"content-evenly",stretch:"content-stretch"};r.push(`${t}${o[e.alignContent]}`);}return r},Ce=v__default.default.forwardRef((e,t)=>{let{variant:r,inline:o=!1,as:s="div",className:n="",styles:l,children:a,sm:c,md:d,lg:p,xl:m,direction:x,wrap:g,gap:P,rowGap:h,colGap:y,justify:T,align:u,alignContent:f,...w}=e,I=[];if(I.push(o?"flex-inline":"flex"),r){let k={center:"flex-center",between:"flex-between",around:"flex-around",stack:"flex-stack",spread:"flex-spread"};I.push(k[r]);}I.push(...B({direction:x,wrap:g,gap:P,rowGap:h,colGap:y,justify:T,align:u,alignContent:f})),c&&I.push(...B(c,"sm:")),d&&I.push(...B(d,"md:")),p&&I.push(...B(p,"lg:")),m&&I.push(...B(m,"xl:"));let b=[...I,n].filter(Boolean).join(" ");return v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:s,ref:t,classes:b,styles:l,...w},a)});Ce.displayName="Flex";var we=v__default.default.forwardRef((e,t)=>{let{grow:r,shrink:o,basis:s,flex:n,alignSelf:l,order:a,as:c="div",className:d="",styles:p,children:m,sm:x,md:g,lg:P,xl:h,...y}=e,T=[];if(n){let f={1:"flex-1",auto:"flex-auto",initial:"flex-initial",none:"flex-none"};T.push(f[n]);}if(r!==void 0&&T.push(`flex-grow-${r}`),o!==void 0&&T.push(`flex-shrink-${o}`),s){let f={auto:"flex-basis-auto",0:"flex-basis-0",full:"flex-basis-full"};T.push(f[s]);}if(l){let f={auto:"self-auto",start:"self-start",end:"self-end",center:"self-center",baseline:"self-baseline",stretch:"self-stretch"};T.push(f[l]);}if(a){let f={first:"order-first",last:"order-last",none:"order-none"};T.push(f[a]);}if(x?.flex){let f={1:"flex-1",auto:"flex-auto",none:"flex-none"};T.push(`sm:${f[x.flex]}`);}if(g?.flex){let f={1:"flex-1",auto:"flex-auto",none:"flex-none"};T.push(`md:${f[g.flex]}`);}if(P?.flex){let f={1:"flex-1",auto:"flex-auto",none:"flex-none"};T.push(`lg:${f[P.flex]}`);}if(h?.flex){let f={1:"flex-1",auto:"flex-auto",none:"flex-none"};T.push(`xl:${f[h.flex]}`);}let u=[...T,d].filter(Boolean).join(" ");return v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:c,ref:t,classes:u,styles:p,...y},m)});we.displayName="Flex.Item";var Ee=v__default.default.forwardRef((e,t)=>{let{as:r="div",className:o="",styles:s,...n}=e,l=["flex-1",o].filter(Boolean).join(" ");return v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:r,ref:t,classes:l,styles:s,...n})});Ee.displayName="Flex.Spacer";var ee=Ce;ee.Item=we;ee.Spacer=Ee;var gt=ee;var Se=({id:e,styles:t,classes:r,children:o,variant:s,...n})=>v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:"sup",id:e,styles:t,className:r,"data-badge":s||void 0,role:"status",...n},v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:"span"},o));Se.displayName="Badge";var Tt=({elm:e="span",role:t="note",variant:r,children:o,styles:s,...n})=>v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:e,role:t,"data-tag":r||void 0,styles:s,...n},o);Tt.displayName="Tag";var It=v__default.default.forwardRef(({summary:e,icon:t,styles:r,classes:o,ariaLabel:s,name:n,open:l,onPointerDown:a,onToggle:c,children:d,...p},m)=>{let x=v.useCallback(P=>{a?.(P);},[a]),g=v.useCallback(P=>{c?.(P);},[c]);return v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:"details",styles:r,classes:o,onToggle:g,ref:m,open:l,"aria-label":s,name:n,...p},v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:"summary",onPointerDown:x},t,e),v__default.default.createElement(chunkMRXDGGCP_cjs.a,{as:"section"},d))});It.displayName="Details";var D="fpkit-theme-preference",Me="data-theme",Fe="(prefers-color-scheme: dark)",Ne=v__default.default.createContext(null);function vt(e){if(typeof window>"u")return "system";try{let t=window.localStorage.getItem(e);if(t==="light"||t==="dark"||t==="system")return t}catch{}return "system"}function bt(){return typeof window>"u"||!window.matchMedia?!1:window.matchMedia(Fe).matches}function te(e){return e==="system"?bt()?"dark":"light":e}function Ae({children:e,defaultPreference:t="system",storageKey:r=D}){let[o,s]=v__default.default.useState(()=>t),[n,l]=v__default.default.useState(()=>te(t));v__default.default.useEffect(()=>{let p=vt(r);s(p),l(te(p));},[r]),v__default.default.useEffect(()=>{if(typeof document>"u")return;let p=te(o);l(p),document.documentElement.setAttribute(Me,p);},[o]),v__default.default.useEffect(()=>{if(o!=="system"||typeof window>"u"||!window.matchMedia)return;let p=window.matchMedia(Fe),m=()=>{let x=p.matches?"dark":"light";l(x),document.documentElement.setAttribute(Me,x);};return p.addEventListener("change",m),()=>p.removeEventListener("change",m)},[o]);let a=v__default.default.useCallback(p=>{s(p);try{window.localStorage.setItem(r,p);}catch{}},[r]),c=v__default.default.useCallback(()=>{a(o==="light"?"dark":o==="dark"?"system":"light");},[o,a]),d=v__default.default.useMemo(()=>({preference:o,theme:n,setPreference:a,toggleTheme:c}),[o,n,a,c]);return v__default.default.createElement(Ne.Provider,{value:d},e)}function _(){let e=v__default.default.useContext(Ne);if(!e)throw new Error("useTheme must be used within a <ThemeProvider>");return e}var Ct={light:"Light",dark:"Dark",system:"System"},wt={light:"\u2600",dark:"\u263E",system:"\u2699"};function Re({display:e="both",srLabel:t="Current theme:",className:r}){let{preference:o,toggleTheme:s}=_(),n=wt[o],l=Ct[o],a=`${t} ${l}. Click to cycle.`;return v__default.default.createElement(chunkHWHAWV4O_cjs.b,{type:"button",variant:"text",onClick:s,"aria-label":a,title:a,className:r,"data-theme-toggle":o},e!=="text"&&v__default.default.createElement("span",{"aria-hidden":"true"},n),e!=="icon"&&v__default.default.createElement("span",null,l))}function Ue(e=D){return `
(function(){
  try {
    var k = ${JSON.stringify(e)};
    var s = window.localStorage.getItem(k);
    var t = (s === 'light' || s === 'dark')
      ? s
      : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', t);
  } catch (_) {}
})();
`.trim()}

Object.defineProperty(exports, 'Textarea', {
  enumerable: true,
  get: function () { return chunk26UJBPF4_cjs.a; }
});
Object.defineProperty(exports, 'Field', {
  enumerable: true,
  get: function () { return chunkQWDSXFOA_cjs.a; }
});
Object.defineProperty(exports, 'Caption', {
  enumerable: true,
  get: function () { return chunkTNEJXNZA_cjs.a; }
});
Object.defineProperty(exports, 'TBL', {
  enumerable: true,
  get: function () { return chunkTNEJXNZA_cjs.i; }
});
Object.defineProperty(exports, 'Table', {
  enumerable: true,
  get: function () { return chunkTNEJXNZA_cjs.f; }
});
Object.defineProperty(exports, 'Tbody', {
  enumerable: true,
  get: function () { return chunkTNEJXNZA_cjs.c; }
});
Object.defineProperty(exports, 'Td', {
  enumerable: true,
  get: function () { return chunkTNEJXNZA_cjs.e; }
});
Object.defineProperty(exports, 'Thead', {
  enumerable: true,
  get: function () { return chunkTNEJXNZA_cjs.b; }
});
Object.defineProperty(exports, 'Tr', {
  enumerable: true,
  get: function () { return chunkTNEJXNZA_cjs.d; }
});
Object.defineProperty(exports, 'Dialog', {
  enumerable: true,
  get: function () { return chunkVHMRNZA5_cjs.b; }
});
Object.defineProperty(exports, 'IconButton', {
  enumerable: true,
  get: function () { return chunkVHMRNZA5_cjs.a; }
});
Object.defineProperty(exports, 'Nav', {
  enumerable: true,
  get: function () { return chunkM5QDLV7R_cjs.c; }
});
Object.defineProperty(exports, 'NavItem', {
  enumerable: true,
  get: function () { return chunkM5QDLV7R_cjs.b; }
});
Object.defineProperty(exports, 'NavList', {
  enumerable: true,
  get: function () { return chunkM5QDLV7R_cjs.a; }
});
Object.defineProperty(exports, 'List', {
  enumerable: true,
  get: function () { return chunkVUKCW3TW_cjs.c; }
});
Object.defineProperty(exports, 'Popover', {
  enumerable: true,
  get: function () { return chunkZJ4RUKI2_cjs.a; }
});
Object.defineProperty(exports, 'Text', {
  enumerable: true,
  get: function () { return chunkHRNA4F4M_cjs.a; }
});
Object.defineProperty(exports, 'Heading', {
  enumerable: true,
  get: function () { return chunkPW5ZQFKC_cjs.b; }
});
Object.defineProperty(exports, 'Title', {
  enumerable: true,
  get: function () { return chunkPW5ZQFKC_cjs.a; }
});
Object.defineProperty(exports, 'Breadcrumb', {
  enumerable: true,
  get: function () { return chunkXPF62L6O_cjs.b; }
});
Object.defineProperty(exports, 'useBreadcrumbSegments', {
  enumerable: true,
  get: function () { return chunkXPF62L6O_cjs.a; }
});
Object.defineProperty(exports, 'Icon', {
  enumerable: true,
  get: function () { return chunkMHFKHEPA_cjs.a; }
});
Object.defineProperty(exports, 'Card', {
  enumerable: true,
  get: function () { return chunkIKQSKTY6_cjs.d; }
});
Object.defineProperty(exports, 'CardContent', {
  enumerable: true,
  get: function () { return chunkIKQSKTY6_cjs.b; }
});
Object.defineProperty(exports, 'CardFooter', {
  enumerable: true,
  get: function () { return chunkIKQSKTY6_cjs.c; }
});
Object.defineProperty(exports, 'CardTitle', {
  enumerable: true,
  get: function () { return chunkIKQSKTY6_cjs.a; }
});
Object.defineProperty(exports, 'Modal', {
  enumerable: true,
  get: function () { return chunkGE52PEWN_cjs.a; }
});
Object.defineProperty(exports, 'Button', {
  enumerable: true,
  get: function () { return chunkHWHAWV4O_cjs.a; }
});
Object.defineProperty(exports, 'Input', {
  enumerable: true,
  get: function () { return chunk4BZKFPEC_cjs.a; }
});
Object.defineProperty(exports, 'FP', {
  enumerable: true,
  get: function () { return chunkE2AJURUW_cjs.a; }
});
Object.defineProperty(exports, 'Link', {
  enumerable: true,
  get: function () { return chunkVJZL7B7W_cjs.d; }
});
Object.defineProperty(exports, 'To', {
  enumerable: true,
  get: function () { return chunkVJZL7B7W_cjs.d; }
});
Object.defineProperty(exports, 'UI', {
  enumerable: true,
  get: function () { return chunkMRXDGGCP_cjs.a; }
});
exports.Alert = ae;
exports.Article = xt;
exports.Aside = dt;
exports.Badge = Se;
exports.Box = de;
exports.Checkbox = ie;
exports.Cluster = ye;
exports.Col = be;
exports.Details = It;
exports.DialogModal = me;
exports.Fieldset = ht;
exports.Flex = gt;
exports.Footer = ft;
exports.Grid = yt;
exports.GridItem = Z;
exports.Header = ct;
exports.Img = pe;
exports.Landmarks = F;
exports.Main = mt;
exports.Row = Ie;
exports.Section = ut;
exports.Stack = xe;
exports.THEME_STORAGE_KEY = D;
exports.Tag = Tt;
exports.ThemeProvider = Ae;
exports.ThemeToggle = Re;
exports.getThemeFoucScript = Ue;
exports.useTheme = _;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.cjs.map