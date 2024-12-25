'use strict';

var chunkPDD4N5P5_cjs = require('./chunk-PDD4N5P5.cjs');
var chunkZOHIKF6I_cjs = require('./chunk-ZOHIKF6I.cjs');
var u = require('react');

function _interopNamespace(e) {
	if (e && e.__esModule) return e;
	var n = Object.create(null);
	if (e) {
		Object.keys(e).forEach(function (k) {
			if (k !== 'default') {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () { return e[k]; }
				});
			}
		});
	}
	n.default = e;
	return Object.freeze(n);
}

var u__namespace = /*#__PURE__*/_interopNamespace(u);

var w=({type:e="button",children:t,styles:o,disabled:r,classes:n,onPointerDown:s,onPointerOver:i,onPointerLeave:p,...l})=>{let c=x=>{r||s?.(x);};return u__namespace.default.createElement(chunkZOHIKF6I_cjs.a,{as:"button",type:e,onPointerOver:x=>{r||i?.(x);},onPointerDown:c,onPointerLeave:x=>{r||p?.(x);},style:o,className:n,"aria-disabled":r,onClick:c,...l},t)};w.displayName="Button";var ae=({children:e,className:t,styles:o,as:r="h3",...n})=>u__namespace.default.createElement(chunkZOHIKF6I_cjs.a,{as:r,className:`card-title ${t||""}`,styles:o,...n},e);ae.displayName="Title";var pe=({children:e,className:t,styles:o,...r})=>u__namespace.default.createElement(chunkZOHIKF6I_cjs.a,{as:"article",className:`card-content ${t||""}`,styles:o,...r},e);pe.displayName="Content";var ie=({children:e,className:t,styles:o,...r})=>u__namespace.default.createElement(chunkZOHIKF6I_cjs.a,{as:"div",className:`card-footer ${t||""}`,styles:o,...r},e);ie.displayName="Footer";var M=({elm:e="div",styles:t,children:o,classes:r="shadow",id:n,...s})=>u__namespace.default.createElement(chunkZOHIKF6I_cjs.a,{as:e,id:n,styles:t,className:r,"data-card":!0,...s},o);M.displayName="Card";M.Title=ae;M.Content=pe;M.Footer=ie;var V=({id:e,children:t,classes:o,modalRef:r,openOnMount:n,...s})=>u__namespace.default.createElement(chunkZOHIKF6I_cjs.a,{as:"dialog",id:e,classes:o,ref:r,open:n,onClick:p=>{p.currentTarget===p.target&&p.currentTarget.close();},...s},t);V.displayName="Dialog";var me=({label:e,labelFor:t,id:o,styles:r,classes:n,children:s,...i})=>u__namespace.default.createElement(chunkZOHIKF6I_cjs.a,{as:"div",id:o,styles:r,className:n,"data-style":"fields",...i},u__namespace.default.createElement("label",{htmlFor:t},e),s);me.displayName="Field";var U=e=>u__namespace.default.createElement(u__namespace.default.Fragment,null,e),Ue=({id:e,children:t,headerBackground:o,styles:r,classes:n,...s})=>u__namespace.default.createElement(chunkZOHIKF6I_cjs.a,{as:"header",id:e,styles:r,className:n,...s},o,u__namespace.default.createElement(chunkZOHIKF6I_cjs.a,{as:"section"},t)),Le=({id:e,children:t,styles:o,classes:r,...n})=>u__namespace.default.createElement(chunkZOHIKF6I_cjs.a,{as:"main",id:e,styles:o,...n,className:r},t),Ee=({id:e,classes:t,children:o,styles:r={},...n})=>u__namespace.default.createElement(chunkZOHIKF6I_cjs.a,{as:"footer",id:e,className:t,styles:r,...n},u__namespace.default.createElement(chunkZOHIKF6I_cjs.a,{as:"section"},o||"Copyright \xA9 2022")),ke=({id:e,children:t,styles:o={},classes:r,...n})=>u__namespace.default.createElement(chunkZOHIKF6I_cjs.a,{as:"aside",id:e,styles:o,className:r,...n},u__namespace.default.createElement(chunkZOHIKF6I_cjs.a,{as:"section"},t)),Be=({id:e,children:t,styles:o,classes:r,...n})=>u__namespace.default.createElement(chunkZOHIKF6I_cjs.a,{as:"section",id:e,styles:o,className:r,...n},t),we=({id:e,children:t,styles:o,classes:r,...n})=>u__namespace.default.createElement(chunkZOHIKF6I_cjs.a,{as:"article",id:e,styles:o,className:r,...n},t);U.displayName="Landmarks";U.Header=Ue;U.Main=Le;U.Footer=Ee;U.Aside=ke;U.Section=Be;U.Article=we;var ce=({src:e="//",alt:t,width:o=480,height:r,styles:n,loading:s="lazy",placeholder:i=`https://via.placeholder.com/${o}?text=PLACEHOLDER`,fetchpriority:p="low",decoding:l="auto",imgLoaded:c,imgError:y,...C})=>u__namespace.default.createElement(chunkZOHIKF6I_cjs.a,{as:"img",src:e,alt:t,width:o,height:r||"auto",loading:s,style:n,onError:f=>{if(y){y?.(f);return}f.currentTarget.src!==i&&(f.currentTarget.src=i);},onLoad:f=>{c?.(f);},fetchPriority:p,decoding:l,...C});ce.displayName="Img";var Fe=u__namespace.default.forwardRef(({as:e,styles:t,classes:o,children:r,defaultStyles:n,...s},i)=>{let p=e||"div",l={...n,...t};return u__namespace.default.createElement(p,{ref:i,style:l,className:o,...s},r)}),N=Fe;var ue=({type:e="text",name:t,value:o,placeholder:r,id:n,styles:s,classes:i,isDisabled:p,disabled:l,readonly:c,required:y,ref:C,onChange:x,onBlur:g,onPointerDown:f,...T})=>{let S=d=>{x&&!l&&x?.(d);},m=d=>{g&&!l&&g?.(d);},h=d=>{f&&!l&&(d.preventDefault(),f?.(d));};return u__namespace.default.createElement(N,{as:"input",id:n,type:e,placeholder:r||`${y?"*":""} ${e} input `,className:i,styles:s,onChange:S,onBlur:m,onKeyDown:h,value:o,name:t,ref:C,"aria-disabled":p,tabIndex:p?-1:void 0,"aria-readonly":c,"aria-required":y,required:y,readOnly:c,...T})};ue.displayName="Input";var K=({href:e,target:t,rel:o,children:r,styles:n,prefetch:s,btnStyle:i,onPointerDown:p,...l})=>{let c=o;return t==="_blank"&&(c=`noopener noreferrer ${s?"prefetch":""}`),u__namespace.default.createElement(chunkZOHIKF6I_cjs.a,{as:"a",href:e,target:t,styles:n,rel:c,onPointerDown:C=>{p&&p?.(C);},"data-btn":i,prefetch:s,...l},r)},A=K;K.displayName="Link";var Ve=({type:e="li",id:t,styles:o,children:r,classes:n,...s})=>u__namespace.createElement(chunkZOHIKF6I_cjs.a,{id:t,as:e,className:n,...s,style:o},r),O=({children:e,classes:t,type:o="ul",variant:r,styles:n,role:s,...i})=>u__namespace.createElement(chunkZOHIKF6I_cjs.a,{as:o,"data-variant":r,className:t,style:n,role:s,...i},e),j=O;O.displayName="List";O.ListItem=Ve;var fe=({openChild:e,closeChild:t,modalHeader:o,modalFooter:r,children:n,showOpen:s=!1,...i})=>{let p=u__namespace.default.useRef(null),l=()=>{p.current&&(s?p.current.show():p.current.showModal());},c=()=>{p.current&&p.current.close();};return u__namespace.default.createElement(u__namespace.default.Fragment,null,u__namespace.default.createElement(V,{modalRef:p,openOnMount:s,...i},u__namespace.default.createElement("section",null,o,n,r??u__namespace.default.createElement("div",null,u__namespace.default.createElement(w,{type:"button",pointerDown:()=>{c();}},t||"Close")," "))),!s&&u__namespace.default.createElement(w,{type:"button",pointerDown:l},e||"Open Modal"))};fe.displayName="Modal";var Ae=({isBlock:e,children:t,...o})=>u__namespace.default.createElement(j,{type:"ul",...o,"data-list":`unstyled ${e?"block":""}`},t),Oe=({id:e,styles:t,classes:o,children:r,...n})=>u__namespace.default.createElement(j.ListItem,{type:"li",id:e,classes:o,styles:t,...n},r),_=({children:e,...t})=>u__namespace.default.createElement(chunkZOHIKF6I_cjs.a,{as:"nav",...t},e);_.displayName="Nav";_.List=Ae;_.Item=Oe;var $e={display:"block",position:"absolute",background:"#000",border:"1px solid #010101",padding:"10px",color:"#fff",transition:"opacity .5s ease-in-out"},G=({children:e,popoverTrigger:t,styles:o,...r})=>{let n=u__namespace.default.useRef(null),s=u__namespace.default.useRef(null),{isVisible:i,popoverPosition:p,handlePointerEvent:l,handlePointerLeave:c}=chunkPDD4N5P5_cjs.b(n,s),y={opacity:i?1:0,top:p.top,left:p.left,zIndex:999};return u__namespace.default.createElement(u__namespace.default.Fragment,null,u__namespace.default.createElement("div",{ref:n,onPointerEnter:l,onPointerLeave:c,...r},t),i&&u__namespace.default.createElement("div",{ref:s,style:{...y,...o}},e))};G.displayName="Popover";G.styles=$e;var Q=({children:e,...t})=>u__namespace.default.createElement(N,{as:"caption",...t},e),Y=({children:e,...t})=>u__namespace.default.createElement(N,{as:"thead",...t},e),$=({children:e,...t})=>u__namespace.default.createElement(N,{as:"tbody",...t},e),Z=({children:e,...t})=>u__namespace.default.createElement(N,{as:"tr",...t},e),ze=({children:e,...t})=>u__namespace.default.createElement(N,{as:"td",...t},e),ee=({id:e,dataStyle:t,children:o,...r})=>u__namespace.default.createElement(N,{as:"section",id:e,...r,"data-style":"table-wrapper"},u__namespace.default.createElement("table",null,o));ee.displayName="Table";Q.displayName="Caption";Y.displayName="Thead";$.displayName="Tbody";Z.displayName="Tr";ze.displayName="Td";var ye=({tblBody:e,tblCaption:t,tblHead:o})=>u__namespace.default.createElement(ee,null,t&&u__namespace.default.createElement(Q,null,t),u__namespace.default.createElement(Y,null,u__namespace.default.createElement(Z,null,o)),u__namespace.default.createElement($,null,e));ye.displayName="TBL";var Xe=({elm:e="span",role:t="note",children:o,styles:r,...n})=>u__namespace.default.createElement(chunkZOHIKF6I_cjs.a,{as:e,role:t,styles:r,...n},o);Xe.displayName="Tag";var je=({summary:e,icon:t,styles:o,classes:r,ariaLabel:n,name:s,open:i,onPointerDown:p,onToggle:l,children:c,ref:y,...C})=>{let x={...o},g=T=>{p&&p?.(T),p&&p?.(T);};return u__namespace.default.createElement(chunkZOHIKF6I_cjs.a,{as:"details",style:x,className:r,onToggle:T=>{l&&p?.(T);},ref:y,open:i,"aria-label":n||"Details dropdown",name:s,...C},u__namespace.default.createElement(chunkZOHIKF6I_cjs.a,{as:"summary",onPointerDown:g},t,e),u__namespace.default.createElement(chunkZOHIKF6I_cjs.a,{as:"section"},c))};je.displayName="Details";var Pe=({elm:e="p",id:t,text:o,styles:r,classes:n,children:s,...i})=>u__namespace.default.createElement(chunkZOHIKF6I_cjs.a,{as:e,id:t,styles:r,className:n,...i},u__namespace.default.createElement(chunkZOHIKF6I_cjs.a,{as:e,id:t,styles:r,className:n,...i},s||o)),qe=({elm:e="h3",id:t,children:o,styles:r,classes:n,...s})=>u__namespace.default.createElement(Pe,{as:e,id:t,styles:r,className:n,...s},o);Pe.displayName="Text";qe.displayName="Title";var he=({id:e,classes:t,value:o,rows:r=5,cols:n=25,name:s,required:i,disabled:p,readOnly:l,onBlur:c,onPointerDown:y,onChange:C,ref:x,styles:g,placeholder:f,...T})=>u__namespace.default.createElement(chunkZOHIKF6I_cjs.a,{as:"textarea",id:e,name:s,rows:r,cols:n,styles:g,className:t,"data-style":"textarea",required:i,value:o,"aria-disabled":p,readOnly:l,onChange:d=>{C&&!p&&C?.(d);},onBlur:d=>{c&&!p&&c?.(d);},onPointerDown:d=>{y&&!p&&y?.(d);},ref:x,placeholder:f||`${i?"*":""} Message`,...T}),xe=he;he.displayName="Textarea";var re=(e,t=15)=>e.length>t?`${e.slice(0,t)}...`:e;var z=({styles:e,id:t,classes:o,children:r,...n})=>u__namespace.default.createElement("li",{"data-list":"unstyled inline",...n},r),Ce=({children:e,...t})=>u__namespace.default.createElement(chunkZOHIKF6I_cjs.a,{as:"ol","data-list":"unstyled inline",...t},e),Te=({styles:e,id:t,classes:o,children:r,...n})=>u__namespace.default.createElement(chunkZOHIKF6I_cjs.a,{as:"nav",id:t,styles:e,className:o,...n},u__namespace.default.createElement(Ce,null,r)),W=({startRoute:e="Home",currentRoute:t,spacer:o=u__namespace.default.createElement(u__namespace.default.Fragment,null,"/"),routes:r,styles:n,id:s,classes:i,ariaLabelPrefix:p,truncateLength:l=15,linkProps:c,...y})=>{let[C,x]=u__namespace.default.useState("");u__namespace.default.useEffect(()=>{let m=t||window.location.pathname;m.length&&x(m);},[t]);let g=m=>{let h=r?.find(d=>d.path===m);return {path:h?.path||m,name:h?.name||m,url:h?.url||m}},f=C.split("/").filter(m=>m),T=f.length-1,S=u__namespace.default.useId();return C.length?u__namespace.default.createElement(Te,{id:s,...y,styles:n,className:i,"aria-label":p},u__namespace.default.createElement(z,{key:`${e}-${S}`},u__namespace.default.createElement(A,{href:"/",...c},e)),u__namespace.default.createElement(u__namespace.default.Fragment,null,f.length?f.map((m,h)=>{let d=g(m),{name:P,url:k,path:ve}=d;return h===T?u__namespace.default.createElement(u__namespace.default.Fragment,null,typeof f[T]=="string"&&f[T].length>3&&f[T]!==f[T-1]&&u__namespace.default.createElement(z,{key:`${ve||h}-${S}`},u__namespace.default.createElement("span",{"aria-hidden":"true"},o),u__namespace.default.createElement("a",{"aria-current":"page","aria-label":P.length>l?P:void 0},re(decodeURIComponent(P),l)))):u__namespace.default.createElement(z,{key:`${d?.name}-${S}`},u__namespace.default.createElement("span",{"aria-hidden":"true"},o),u__namespace.default.createElement("span",null,u__namespace.default.createElement(A,{href:k,"aria-label":P.length>l?P:void 0,...c},re(decodeURIComponent(P),l))))}):null)):u__namespace.default.createElement(u__namespace.default.Fragment,null)};W.displayName="BreadCrumb";W.Nav=Te;W.List=Ce;W.Items=z;var ge=e=>{let[t,o]=u.useState([]),[r,n]=u.useState(e),[s,i]=u.useState(!1),[p,l]=u.useState(!1),[c,y]=u.useState(null);return u.useEffect(()=>{let m=()=>{let h=window.speechSynthesis.getVoices();o(h);let d=h.find(P=>P.name==="Google US English");if(d)n(d);else {let P=h.find(k=>k.lang.startsWith("en-"));P&&n(P);}};return m(),window.speechSynthesis.onvoiceschanged=m,()=>{window.speechSynthesis.onvoiceschanged=null;}},[]),{speak:(m,h={},d)=>{let P=new SpeechSynthesisUtterance(m);P.lang=h.lang??"en-US",P.pitch=h.pitch??1,P.rate=h.rate??1,P.voice=r??h.voice??null,P.onend=()=>{i(!1),l(!1),d&&d();},"speechSynthesis"in window?(window.speechSynthesis.speak(P),y(P),i(!0),l(!1)):console.error("Speech synthesis not supported");},pause:()=>{s&&!p&&(window.speechSynthesis.pause(),l(!0));},resume:()=>{s&&p&&(window.speechSynthesis.resume(),l(!1));},cancel:()=>{s&&(window.speechSynthesis.cancel(),i(!1),l(!1));},isSpeaking:s,isPaused:p,availableVoices:t,changeVoice:m=>{n(m);},currentVoice:r,getAvailableLanguages:()=>[...new Set(t.map(m=>m.lang))]}};var Ze=({children:e,onClick:t})=>u__namespace.default.createElement(chunkZOHIKF6I_cjs.a,{as:"button",type:"button",className:"tts-border","data-btn":"sm text pill",onClick:t},e),H=u__namespace.default.memo(Ze),ne=({label:e,isSpeaking:t,isPaused:o,onSpeak:r,onPause:n,onResume:s,onCancel:i})=>u__namespace.default.createElement(chunkZOHIKF6I_cjs.a,{as:"div","data-tts":!0},e&&u__namespace.default.createElement("p",null,e),!t&&u__namespace.default.createElement(H,{"aria-label":"Speak",onClick:r},u__namespace.default.createElement(chunkZOHIKF6I_cjs.c.PlaySolid,{size:16})),t&&!o&&u__namespace.default.createElement(H,{"aria-label":"Pause",onClick:n},u__namespace.default.createElement(chunkZOHIKF6I_cjs.c.PauseSolid,{size:16})),o&&u__namespace.default.createElement(H,{"aria-label":"Resume",onClick:s},u__namespace.default.createElement(chunkZOHIKF6I_cjs.c.ResumeSolid,{size:16})),u__namespace.default.createElement(H,{"aria-label":"Stop",onClick:i},u__namespace.default.createElement(chunkZOHIKF6I_cjs.c.StopSolid,{size:16})));ne.displayName="TextToSpeechControls";ne.TTSButton=H;var Ie=ne;var Se=({initialText:e="",showTextInput:t=!1,voice:o,pitch:r=1,rate:n=1,language:s,label:i,onEnd:p})=>{let{speak:l,pause:c,resume:y,cancel:C,isSpeaking:x,isPaused:g,getAvailableLanguages:f,availableVoices:T}=ge(),[S,m]=u.useState(e);console.log(f()),u.useEffect(()=>{m(e);},[e]);let h=()=>{S.trim()!==""&&l(S,{voice:o,pitch:r,rate:n},P);},d=k=>{m(k.target.value);},P=()=>{p&&p();};return u__namespace.default.createElement(u__namespace.default.Fragment,null,t&&u__namespace.default.createElement(xe,{value:S,onChange:d}),u__namespace.default.createElement(Ie,{label:i,isSpeaking:x,isPaused:g,onSpeak:h,onPause:c,onResume:y,onCancel:C}))};Se.displayName="TextToSpeechComponent";

Object.defineProperty(exports, 'Icon', {
	enumerable: true,
	get: function () { return chunkZOHIKF6I_cjs.b; }
});
exports.Article = we;
exports.Aside = ke;
exports.Box = N;
exports.Breadcrumb = W;
exports.Button = w;
exports.Caption = Q;
exports.Card = M;
exports.Details = je;
exports.Dialog = V;
exports.FP = N;
exports.Field = me;
exports.Footer = Ee;
exports.Header = Ue;
exports.Img = ce;
exports.Input = ue;
exports.Landmarks = U;
exports.Link = K;
exports.List = O;
exports.Main = Le;
exports.Modal = fe;
exports.Nav = _;
exports.NavItem = Oe;
exports.NavList = Ae;
exports.Popover = G;
exports.Section = Be;
exports.TBL = ye;
exports.Table = ee;
exports.Tag = Xe;
exports.Tbody = $;
exports.Td = ze;
exports.Text = Pe;
exports.TextToSpeech = Se;
exports.Textarea = he;
exports.Thead = Y;
exports.Title = qe;
exports.To = A;
exports.Tr = Z;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.cjs.map