import { b } from './chunk-GCGKYLDG.js';
import { a, c } from './chunk-QHIABQNQ.js';
export { b as Icon } from './chunk-QHIABQNQ.js';
import * as u from 'react';
import u__default, { useState, useEffect } from 'react';

var w=({type:e="button",children:t,styles:r,disabled:o,classes:n,onPointerDown:s,onPointerOver:i,onPointerLeave:p,...l})=>{let m=y=>{o||s?.(y);};return u__default.createElement(a,{as:"button",type:e,onPointerOver:y=>{o||i?.(y);},onPointerDown:m,onPointerLeave:y=>{o||p?.(y);},style:r,className:n,"aria-disabled":o,onClick:m,...l},t)};w.displayName="Button";var ae=({children:e,className:t,styles:r,as:o="h3",...n})=>u__default.createElement(a,{as:o,className:`card-title ${t||""}`,styles:r,...n},e);ae.displayName="Title";var pe=({children:e,className:t,styles:r,...o})=>u__default.createElement(a,{as:"article",className:`card-content ${t||""}`,styles:r,...o},e);pe.displayName="Content";var ie=({children:e,className:t,styles:r,...o})=>u__default.createElement(a,{as:"div",className:`card-footer ${t||""}`,styles:r,...o},e);ie.displayName="Footer";var M=({elm:e="div",styles:t,children:r,classes:o="shadow",id:n,...s})=>u__default.createElement(a,{as:e,id:n,styles:t,className:o,"data-card":!0,...s},r);M.displayName="Card";M.Title=ae;M.Content=pe;M.Footer=ie;var A=({id:e,children:t,classes:r,modalRef:o,openOnMount:n,...s})=>u__default.createElement(a,{as:"dialog",id:e,classes:r,ref:o,open:n,onClick:p=>{p.currentTarget===p.target&&p.currentTarget.close();},...s},t);A.displayName="Dialog";var me=({label:e,labelFor:t,id:r,styles:o,classes:n,children:s,...i})=>u__default.createElement(a,{as:"div",id:r,styles:o,className:n,"data-style":"fields",...i},u__default.createElement("label",{htmlFor:t},e),s);me.displayName="Field";var L=e=>u__default.createElement(u__default.Fragment,null,e),Le=({id:e,children:t,headerBackground:r,styles:o,classes:n,...s})=>u__default.createElement(a,{as:"header",id:e,styles:o,className:n,...s},r,u__default.createElement(a,{as:"section"},t)),Ee=({id:e,children:t,styles:r,classes:o,...n})=>u__default.createElement(a,{as:"main",id:e,styles:r,...n,className:o},t),ke=({id:e,classes:t,children:r,styles:o={},...n})=>u__default.createElement(a,{as:"footer",id:e,className:t,styles:o,...n},u__default.createElement(a,{as:"section"},r||"Copyright \xA9 2022")),Be=({id:e,children:t,styles:r={},classes:o,...n})=>u__default.createElement(a,{as:"aside",id:e,styles:r,className:o,...n},u__default.createElement(a,{as:"section"},t)),we=({id:e,children:t,styles:r,classes:o,...n})=>u__default.createElement(a,{as:"section",id:e,styles:r,className:o,...n},t),Me=({id:e,children:t,styles:r,classes:o,...n})=>u__default.createElement(a,{as:"article",id:e,styles:r,className:o,...n},t);L.displayName="Landmarks";L.Header=Le;L.Main=Ee;L.Footer=ke;L.Aside=Be;L.Section=we;L.Article=Me;var ce=({src:e="//",alt:t,width:r=480,height:o,styles:n,loading:s="lazy",placeholder:i=`https://via.placeholder.com/${r}?text=PLACEHOLDER`,fetchpriority:p="low",decoding:l="auto",imgLoaded:m,imgError:f,...C})=>u__default.createElement(a,{as:"img",src:e,alt:t,width:r,height:o||"auto",loading:s,style:n,onError:T=>{if(f){f?.(T);return}T.currentTarget.src!==i&&(T.currentTarget.src=i);},onLoad:T=>{m?.(T);},fetchPriority:p,decoding:l,...C});ce.displayName="Img";var He=u__default.forwardRef(({as:e,styles:t,classes:r,children:o,defaultStyles:n,...s},i)=>{let p=e||"div",l={...n,...t};return u__default.createElement(p,{ref:i,style:l,className:r,...s},o)}),N=He;var ue=({type:e="text",name:t,value:r,placeholder:o,id:n,styles:s,classes:i,isDisabled:p,disabled:l,readonly:m,required:f,ref:C,onChange:y,onBlur:I,onPointerDown:T,...h})=>{let g=c=>{y&&!l&&y?.(c);},x=c=>{I&&!l&&I?.(c);},d=c=>{T&&!l&&(c.preventDefault(),T?.(c));};return u__default.createElement(N,{as:"input",id:n,type:e,placeholder:o||`${f?"*":""} ${e} input `,className:i,styles:s,onChange:g,onBlur:x,onKeyDown:d,value:r,name:t,ref:C,"aria-disabled":p,tabIndex:p?-1:void 0,"aria-readonly":m,"aria-required":f,required:f,readOnly:m,...h})};ue.displayName="Input";var K=({href:e,target:t,rel:r,children:o,styles:n,prefetch:s,btnStyle:i,onPointerDown:p,...l})=>{let m=r;return t==="_blank"&&(m=`noopener noreferrer ${s?"prefetch":""}`),u__default.createElement(a,{as:"a",href:e,target:t,styles:n,rel:m,onPointerDown:C=>{p&&p?.(C);},"data-btn":i,prefetch:s,...l},o)},F=K;K.displayName="Link";var Ae=({type:e="li",id:t,styles:r,children:o,classes:n,...s})=>u.createElement(a,{id:t,as:e,className:n,...s,style:r},o),O=({children:e,classes:t,type:r="ul",variant:o,styles:n,role:s,...i})=>u.createElement(a,{as:r,"data-variant":o,className:t,style:n,role:s,...i},e),j=O;O.displayName="List";O.ListItem=Ae;var fe=({openChild:e,closeChild:t,modalHeader:r,modalFooter:o,children:n,showOpen:s=!1,...i})=>{let p=u__default.useRef(null),l=()=>{p.current&&(s?p.current.show():p.current.showModal());},m=()=>{p.current&&p.current.close();};return u__default.createElement(u__default.Fragment,null,u__default.createElement(A,{modalRef:p,openOnMount:s,...i},u__default.createElement("section",null,r,n,o??u__default.createElement("div",null,u__default.createElement(w,{type:"button",pointerDown:()=>{m();}},t||"Close")," "))),!s&&u__default.createElement(w,{type:"button",pointerDown:l},e||"Open Modal"))};fe.displayName="Modal";var Oe=({isBlock:e,children:t,...r})=>u__default.createElement(j,{type:"ul",...r,"data-list":`unstyled ${e?"block":""}`},t),$e=({id:e,styles:t,classes:r,children:o,...n})=>u__default.createElement(j.ListItem,{type:"li",id:e,classes:r,styles:t,...n},o),_=({children:e,...t})=>u__default.createElement(a,{as:"nav",...t},e);_.displayName="Nav";_.List=Oe;_.Item=$e;var ze={display:"block",position:"absolute",background:"#000",border:"1px solid #010101",padding:"10px",color:"#fff",transition:"opacity .5s ease-in-out"},G=({children:e,popoverTrigger:t,styles:r,...o})=>{let n=u__default.useRef(null),s=u__default.useRef(null),{isVisible:i,popoverPosition:p,handlePointerEvent:l,handlePointerLeave:m}=b(n,s),f={opacity:i?1:0,top:p.top,left:p.left,zIndex:999};return u__default.createElement(u__default.Fragment,null,u__default.createElement("div",{ref:n,onPointerEnter:l,onPointerLeave:m,...o},t),i&&u__default.createElement("div",{ref:s,style:{...f,...r}},e))};G.displayName="Popover";G.styles=ze;var Q=({children:e,...t})=>u__default.createElement(N,{as:"caption",...t},e),Y=({children:e,...t})=>u__default.createElement(N,{as:"thead",...t},e),$=({children:e,...t})=>u__default.createElement(N,{as:"tbody",...t},e),Z=({children:e,...t})=>u__default.createElement(N,{as:"tr",...t},e),We=({children:e,...t})=>u__default.createElement(N,{as:"td",...t},e),ee=({id:e,dataStyle:t,children:r,...o})=>u__default.createElement(N,{as:"section",id:e,...o,"data-style":"table-wrapper"},u__default.createElement("table",null,r));ee.displayName="Table";Q.displayName="Caption";Y.displayName="Thead";$.displayName="Tbody";Z.displayName="Tr";We.displayName="Td";var ye=({tblBody:e,tblCaption:t,tblHead:r})=>u__default.createElement(ee,null,t&&u__default.createElement(Q,null,t),u__default.createElement(Y,null,u__default.createElement(Z,null,r)),u__default.createElement($,null,e));ye.displayName="TBL";var je=({elm:e="span",role:t="note",children:r,styles:o,...n})=>u__default.createElement(a,{as:e,role:t,styles:o,...n},r);je.displayName="Tag";var qe=({summary:e,icon:t,styles:r,classes:o,ariaLabel:n,name:s,open:i,onPointerDown:p,onToggle:l,children:m,ref:f,...C})=>{let y={...r},I=h=>{p&&p?.(h),p&&p?.(h);};return u__default.createElement(a,{as:"details",style:y,className:o,onToggle:h=>{l&&p?.(h);},ref:f,open:i,"aria-label":n||"Details dropdown",name:s,...C},u__default.createElement(a,{as:"summary",onPointerDown:I},t,e),u__default.createElement(a,{as:"section"},m))};qe.displayName="Details";var Pe=({elm:e="p",id:t,text:r,styles:o,classes:n,children:s,...i})=>u__default.createElement(a,{as:e,id:t,styles:o,className:n,...i},u__default.createElement(a,{as:e,id:t,styles:o,className:n,...i},s||r)),_e=({elm:e="h3",id:t,children:r,styles:o,classes:n,...s})=>u__default.createElement(Pe,{as:e,id:t,styles:o,className:n,...s},r);Pe.displayName="Text";_e.displayName="Title";var he=({id:e,classes:t,value:r,rows:o=5,cols:n=25,name:s,required:i,disabled:p,readOnly:l,onBlur:m,onPointerDown:f,onChange:C,ref:y,styles:I,placeholder:T,...h})=>u__default.createElement(a,{as:"textarea",id:e,name:s,rows:o,cols:n,styles:I,className:t,"data-style":"textarea",required:i,value:r,"aria-disabled":p,readOnly:l,onChange:c=>{C&&!p&&C?.(c);},onBlur:c=>{m&&!p&&m?.(c);},onPointerDown:c=>{f&&!p&&f?.(c);},ref:y,placeholder:T||`${i?"*":""} Message`,...h}),xe=he;he.displayName="Textarea";var re=(e,t=15)=>e.length>t?`${e.slice(0,t)}...`:e;var z=({styles:e,id:t,classes:r,children:o,...n})=>u__default.createElement("li",{"data-list":"unstyled inline",...n},o),Ce=({children:e,...t})=>u__default.createElement(a,{as:"ol","data-list":"unstyled inline",...t},e),Te=({styles:e,id:t,classes:r,children:o,...n})=>u__default.createElement(a,{as:"nav",id:t,styles:e,className:r,...n},u__default.createElement(Ce,null,o)),W=({startRoute:e="Home",startRouteUrl:t="/",currentRoute:r,spacer:o=u__default.createElement(u__default.Fragment,null,"/"),routes:n,styles:s,id:i,classes:p,ariaLabelPrefix:l,truncateLength:m=15,linkProps:f,...C})=>{let[y,I]=u__default.useState("");u__default.useEffect(()=>{let d=r||window.location.pathname;d.length&&I(d);},[r]);let T=d=>{let c=n?.find(P=>P.path===d);return {path:c?.path||d,name:c?.name||d,url:c?.url||d}},h=y.split("/").filter(d=>d),g=h.length-1,x=u__default.useId();return y.length?u__default.createElement(Te,{id:i,...C,styles:s,className:p,"aria-label":l},u__default.createElement(z,{key:`${e}-${x}`},u__default.createElement(F,{href:t,...f},e)),u__default.createElement(u__default.Fragment,null,h.length?h.map((d,c)=>{let P=T(d),{name:b,url:ve,path:Ne}=P;return c===g?u__default.createElement(u__default.Fragment,null,typeof h[g]=="string"&&h[g].length>3&&h[g]!==h[g-1]&&u__default.createElement(z,{key:`${Ne||c}-${x}`},u__default.createElement("span",{"aria-hidden":"true"},o),u__default.createElement(F,{"aria-current":"page","aria-label":b.length>m?b:void 0},re(decodeURIComponent(b),m)))):u__default.createElement(z,{key:`${P?.name}-${x}`},u__default.createElement("span",{"aria-hidden":"true"},o),u__default.createElement("span",null,u__default.createElement(F,{href:ve,"aria-label":b.length>m?b:void 0,...f},re(decodeURIComponent(b),m))))}):null)):u__default.createElement(u__default.Fragment,null)};W.displayName="BreadCrumb";W.Nav=Te;W.List=Ce;W.Items=z;var ge=e=>{let[t,r]=useState([]),[o,n]=useState(e),[s,i]=useState(!1),[p,l]=useState(!1),[m,f]=useState(null);return useEffect(()=>{let x=()=>{let d=window.speechSynthesis.getVoices();r(d);let c=d.find(P=>P.name==="Google US English");if(c)n(c);else {let P=d.find(b=>b.lang.startsWith("en-"));P&&n(P);}};return x(),window.speechSynthesis.onvoiceschanged=x,()=>{window.speechSynthesis.onvoiceschanged=null;}},[]),{speak:(x,d={},c)=>{let P=new SpeechSynthesisUtterance(x);P.lang=d.lang??"en-US",P.pitch=d.pitch??1,P.rate=d.rate??1,P.voice=o??d.voice??null,P.onend=()=>{i(!1),l(!1),c&&c();},"speechSynthesis"in window?(window.speechSynthesis.speak(P),f(P),i(!0),l(!1)):console.error("Speech synthesis not supported");},pause:()=>{s&&!p&&(window.speechSynthesis.pause(),l(!0));},resume:()=>{s&&p&&(window.speechSynthesis.resume(),l(!1));},cancel:()=>{s&&(window.speechSynthesis.cancel(),i(!1),l(!1));},isSpeaking:s,isPaused:p,availableVoices:t,changeVoice:x=>{n(x);},currentVoice:o,getAvailableLanguages:()=>[...new Set(t.map(x=>x.lang))]}};var et=({children:e,onClick:t})=>u__default.createElement(a,{as:"button",type:"button",className:"tts-border","data-btn":"sm text pill",onClick:t},e),D=u__default.memo(et),ne=({label:e,isSpeaking:t,isPaused:r,onSpeak:o,onPause:n,onResume:s,onCancel:i})=>u__default.createElement(a,{as:"div","data-tts":!0},e&&u__default.createElement("p",null,e),!t&&u__default.createElement(D,{"aria-label":"Speak",onClick:o},u__default.createElement(c.PlaySolid,{size:16})),t&&!r&&u__default.createElement(D,{"aria-label":"Pause",onClick:n},u__default.createElement(c.PauseSolid,{size:16})),r&&u__default.createElement(D,{"aria-label":"Resume",onClick:s},u__default.createElement(c.ResumeSolid,{size:16})),u__default.createElement(D,{"aria-label":"Stop",onClick:i},u__default.createElement(c.StopSolid,{size:16})));ne.displayName="TextToSpeechControls";ne.TTSButton=D;var Ie=ne;var Se=({initialText:e="",showTextInput:t=!1,voice:r,pitch:o=1,rate:n=1,language:s,label:i,onEnd:p})=>{let{speak:l,pause:m,resume:f,cancel:C,isSpeaking:y,isPaused:I,getAvailableLanguages:T,availableVoices:h}=ge(),[g,x]=useState(e);console.log(T()),useEffect(()=>{x(e);},[e]);let d=()=>{g.trim()!==""&&l(g,{voice:r,pitch:o,rate:n},P);},c=b=>{x(b.target.value);},P=()=>{p&&p();};return u__default.createElement(u__default.Fragment,null,t&&u__default.createElement(xe,{value:g,onChange:c}),u__default.createElement(Ie,{label:i,isSpeaking:y,isPaused:I,onSpeak:d,onPause:m,onResume:f,onCancel:C}))};Se.displayName="TextToSpeechComponent";

export { Me as Article, Be as Aside, N as Box, W as Breadcrumb, w as Button, Q as Caption, M as Card, qe as Details, A as Dialog, N as FP, me as Field, ke as Footer, Le as Header, ce as Img, ue as Input, L as Landmarks, K as Link, O as List, Ee as Main, fe as Modal, _ as Nav, $e as NavItem, Oe as NavList, G as Popover, we as Section, ye as TBL, ee as Table, je as Tag, $ as Tbody, We as Td, Pe as Text, Se as TextToSpeech, he as Textarea, Y as Thead, _e as Title, F as To, Z as Tr };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map