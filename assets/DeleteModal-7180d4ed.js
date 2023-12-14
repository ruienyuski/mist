import{b as N,c as C,f as h,z as M,v as L,F as ct,n as dt,t as z,W as $,X as G,Y as B,Z as S,$ as W,a0 as ut,a1 as ht,a2 as _t,a3 as mt,r as y,o as U,M as ft,h as Y}from"./index-a98e8c24.js";const pt={"aria-label":"Page navigation example"},gt={class:"pagination justify-content-center"},bt=["onClick"],Mt={__name:"Pagination",props:["pages"],emits:["updatapage"],setup(c,{emit:f}){const i=c,e=f,a=_=>{e("updatapage",_)};return(_,m)=>(N(),C("nav",pt,[h("ul",gt,[h("li",{class:M(["page-item",{disabled:i.pages.current_page===1}])},[h("a",{class:"page-link",href:"#",onClick:m[0]||(m[0]=L(l=>a(i.pages.current_page-1),["prevent"]))},"Previous")],2),(N(!0),C(ct,null,dt(i.pages.total_pages,(l,r)=>(N(),C("li",{class:M(["page-item",{active:l===i.pages.current_page}]),key:r},[h("a",{class:"page-link",href:"#",onClick:L(b=>a(l),["prevent"])},z(l),9,bt)],2))),128)),h("li",{class:M(["page-item",{disabled:i.pages.current_page===i.pages.total_pages}])},[h("a",{class:"page-link",href:"#",onClick:m[1]||(m[1]=L(l=>a(i.pages.current_page+1),["prevent"]))},"Next")],2)])]))}};var Q={exports:{}},x={exports:{}};/*!
  * Bootstrap backdrop.js v5.3.2 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */var P;function Et(){return P||(P=1,function(c,f){(function(i,e){c.exports=e($(),G(),B())})(S,function(i,e,a){const _="backdrop",m="fade",l="show",r=`mousedown.bs.${_}`,b={className:"modal-backdrop",clickCallback:null,isAnimated:!1,isVisible:!0,rootElement:"body"},E={className:"string",clickCallback:"(function|null)",isAnimated:"boolean",isVisible:"boolean",rootElement:"(element|string)"};class o extends e{constructor(s){super(),this._config=this._getConfig(s),this._isAppended=!1,this._element=null}static get Default(){return b}static get DefaultType(){return E}static get NAME(){return _}show(s){if(!this._config.isVisible){a.execute(s);return}this._append();const p=this._getElement();this._config.isAnimated&&a.reflow(p),p.classList.add(l),this._emulateAnimation(()=>{a.execute(s)})}hide(s){if(!this._config.isVisible){a.execute(s);return}this._getElement().classList.remove(l),this._emulateAnimation(()=>{this.dispose(),a.execute(s)})}dispose(){this._isAppended&&(i.off(this._element,r),this._element.remove(),this._isAppended=!1)}_getElement(){if(!this._element){const s=document.createElement("div");s.className=this._config.className,this._config.isAnimated&&s.classList.add(m),this._element=s}return this._element}_configAfterMerge(s){return s.rootElement=a.getElement(s.rootElement),s}_append(){if(this._isAppended)return;const s=this._getElement();this._config.rootElement.append(s),i.on(s,r,()=>{a.execute(this._config.clickCallback)}),this._isAppended=!0}_emulateAnimation(s){a.executeAfterTransition(s,this._getElement(),this._config.isAnimated)}}return o})}(x)),x.exports}var V={exports:{}};/*!
  * Bootstrap focustrap.js v5.3.2 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */var K;function At(){return K||(K=1,function(c,f){(function(i,e){c.exports=e($(),W(),G())})(S,function(i,e,a){const _="focustrap",l=".bs.focustrap",r=`focusin${l}`,b=`keydown.tab${l}`,E="Tab",o="forward",t="backward",s={autofocus:!0,trapElement:null},p={autofocus:"boolean",trapElement:"element"};class A extends a{constructor(u){super(),this._config=this._getConfig(u),this._isActive=!1,this._lastTabNavDirection=null}static get Default(){return s}static get DefaultType(){return p}static get NAME(){return _}activate(){this._isActive||(this._config.autofocus&&this._config.trapElement.focus(),i.off(document,l),i.on(document,r,u=>this._handleFocusin(u)),i.on(document,b,u=>this._handleKeydown(u)),this._isActive=!0)}deactivate(){this._isActive&&(this._isActive=!1,i.off(document,l))}_handleFocusin(u){const{trapElement:T}=this._config;if(u.target===document||u.target===T||T.contains(u.target))return;const D=e.focusableChildren(T);D.length===0?T.focus():this._lastTabNavDirection===t?D[D.length-1].focus():D[0].focus()}_handleKeydown(u){u.key===E&&(this._lastTabNavDirection=u.shiftKey?t:o)}}return A})}(V)),V.exports}var I={exports:{}};/*!
  * Bootstrap scrollbar.js v5.3.2 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */var q;function wt(){return q||(q=1,function(c,f){(function(i,e){c.exports=e(ut(),W(),B())})(S,function(i,e,a){const _=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",m=".sticky-top",l="padding-right",r="margin-right";class b{constructor(){this._element=document.body}getWidth(){const o=document.documentElement.clientWidth;return Math.abs(window.innerWidth-o)}hide(){const o=this.getWidth();this._disableOverFlow(),this._setElementAttributes(this._element,l,t=>t+o),this._setElementAttributes(_,l,t=>t+o),this._setElementAttributes(m,r,t=>t-o)}reset(){this._resetElementAttributes(this._element,"overflow"),this._resetElementAttributes(this._element,l),this._resetElementAttributes(_,l),this._resetElementAttributes(m,r)}isOverflowing(){return this.getWidth()>0}_disableOverFlow(){this._saveInitialAttribute(this._element,"overflow"),this._element.style.overflow="hidden"}_setElementAttributes(o,t,s){const p=this.getWidth(),A=w=>{if(w!==this._element&&window.innerWidth>w.clientWidth+p)return;this._saveInitialAttribute(w,t);const u=window.getComputedStyle(w).getPropertyValue(t);w.style.setProperty(t,`${s(Number.parseFloat(u))}px`)};this._applyManipulationCallback(o,A)}_saveInitialAttribute(o,t){const s=o.style.getPropertyValue(t);s&&i.setDataAttribute(o,t,s)}_resetElementAttributes(o,t){const s=p=>{const A=i.getDataAttribute(p,t);if(A===null){p.style.removeProperty(t);return}i.removeDataAttribute(p,t),p.style.setProperty(t,A)};this._applyManipulationCallback(o,s)}_applyManipulationCallback(o,t){if(a.isElement(o)){t(o);return}for(const s of e.find(o,this._element))t(s)}}return b})}(I)),I.exports}/*!
  * Bootstrap modal.js v5.3.2 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */(function(c,f){(function(i,e){c.exports=e(ht(),$(),W(),Et(),_t(),At(),B(),wt())})(S,function(i,e,a,_,m,l,r,b){const E="modal",t=".bs.modal",s=".data-api",p="Escape",A=`hide${t}`,w=`hidePrevented${t}`,u=`hidden${t}`,T=`show${t}`,D=`shown${t}`,Z=`resize${t}`,J=`click.dismiss${t}`,j=`mousedown.dismiss${t}`,H=`keydown.dismiss${t}`,tt=`click${t}${s}`,R="modal-open",et="fade",F="show",O="modal-static",st=".modal.show",it=".modal-dialog",nt=".modal-body",ot='[data-bs-toggle="modal"]',at={backdrop:!0,focus:!0,keyboard:!0},lt={backdrop:"(boolean|string)",focus:"boolean",keyboard:"boolean"};class v extends i{constructor(n,d){super(n,d),this._dialog=a.findOne(it,this._element),this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._isShown=!1,this._isTransitioning=!1,this._scrollBar=new b,this._addEventListeners()}static get Default(){return at}static get DefaultType(){return lt}static get NAME(){return E}toggle(n){return this._isShown?this.hide():this.show(n)}show(n){this._isShown||this._isTransitioning||e.trigger(this._element,T,{relatedTarget:n}).defaultPrevented||(this._isShown=!0,this._isTransitioning=!0,this._scrollBar.hide(),document.body.classList.add(R),this._adjustDialog(),this._backdrop.show(()=>this._showElement(n)))}hide(){!this._isShown||this._isTransitioning||e.trigger(this._element,A).defaultPrevented||(this._isShown=!1,this._isTransitioning=!0,this._focustrap.deactivate(),this._element.classList.remove(F),this._queueCallback(()=>this._hideModal(),this._element,this._isAnimated()))}dispose(){e.off(window,t),e.off(this._dialog,t),this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}handleUpdate(){this._adjustDialog()}_initializeBackDrop(){return new _({isVisible:!!this._config.backdrop,isAnimated:this._isAnimated()})}_initializeFocusTrap(){return new l({trapElement:this._element})}_showElement(n){document.body.contains(this._element)||document.body.append(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.scrollTop=0;const d=a.findOne(nt,this._dialog);d&&(d.scrollTop=0),r.reflow(this._element),this._element.classList.add(F);const g=()=>{this._config.focus&&this._focustrap.activate(),this._isTransitioning=!1,e.trigger(this._element,D,{relatedTarget:n})};this._queueCallback(g,this._dialog,this._isAnimated())}_addEventListeners(){e.on(this._element,H,n=>{if(n.key===p){if(this._config.keyboard){this.hide();return}this._triggerBackdropTransition()}}),e.on(window,Z,()=>{this._isShown&&!this._isTransitioning&&this._adjustDialog()}),e.on(this._element,j,n=>{e.one(this._element,J,d=>{if(!(this._element!==n.target||this._element!==d.target)){if(this._config.backdrop==="static"){this._triggerBackdropTransition();return}this._config.backdrop&&this.hide()}})})}_hideModal(){this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._backdrop.hide(()=>{document.body.classList.remove(R),this._resetAdjustments(),this._scrollBar.reset(),e.trigger(this._element,u)})}_isAnimated(){return this._element.classList.contains(et)}_triggerBackdropTransition(){if(e.trigger(this._element,w).defaultPrevented)return;const d=this._element.scrollHeight>document.documentElement.clientHeight,g=this._element.style.overflowY;g==="hidden"||this._element.classList.contains(O)||(d||(this._element.style.overflowY="hidden"),this._element.classList.add(O),this._queueCallback(()=>{this._element.classList.remove(O),this._queueCallback(()=>{this._element.style.overflowY=g},this._dialog)},this._dialog),this._element.focus())}_adjustDialog(){const n=this._element.scrollHeight>document.documentElement.clientHeight,d=this._scrollBar.getWidth(),g=d>0;if(g&&!n){const k=r.isRTL()?"paddingLeft":"paddingRight";this._element.style[k]=`${d}px`}if(!g&&n){const k=r.isRTL()?"paddingRight":"paddingLeft";this._element.style[k]=`${d}px`}}_resetAdjustments(){this._element.style.paddingLeft="",this._element.style.paddingRight=""}static jQueryInterface(n,d){return this.each(function(){const g=v.getOrCreateInstance(this,n);if(typeof n=="string"){if(typeof g[n]>"u")throw new TypeError(`No method named "${n}"`);g[n](d)}})}}return e.on(document,tt,ot,function(rt){const n=a.getElementFromSelector(this);["A","AREA"].includes(this.tagName)&&rt.preventDefault(),e.one(n,T,k=>{k.defaultPrevented||e.one(n,u,()=>{r.isVisible(this)&&this.focus()})});const d=a.findOne(st);d&&v.getInstance(d).hide(),v.getOrCreateInstance(n).toggle(this)}),m.enableDismissTrigger(v),r.defineJQueryPlugin(v),v})})(Q);var Tt=Q.exports;const X=mt(Tt);function Lt(){const c=y({}),f=y(null);return U(()=>{c.value=new X(f.value)}),{modalWindow:f,modalshow:()=>{c.value.show()},modalhide:()=>{c.value.hide()}}}function vt(){const c=y({}),f=y(null);return U(()=>{c.value=new X(f.value)}),{modalWindowDelete:f,modalDelshow:()=>{c.value.show()},modalDelhide:()=>{c.value.hide()}}}const Dt={class:"modal-dialog",role:"document"},kt={class:"modal-content border-0"},yt=h("div",{class:"modal-header bg-danger text-white"},[h("h5",{class:"modal-title",id:"exampleModalLabel"},[h("span",null,"刪除資料")]),h("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),Nt={class:"modal-body"},Ct={class:"text-danger"},St=h("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal","aria-label":"Close"},"取消",-1),xt={__name:"DeleteModal",props:["item"],emits:["delData"],setup(c,{expose:f,emit:i}){const e=c,a=i,{modalWindowDelete:_,modalDelshow:m,modalDelhide:l}=vt(),r=y({});r.value=e.item;const b=()=>{a("delData",r.value)};return f({show:m,hide:l}),ft(()=>e.item,(E,o)=>{E.id!==o.id&&(r.value=E)}),(E,o)=>(N(),C("div",{class:"modal fade",id:"delModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref_key:"modalWindowDelete",ref:_},[h("div",Dt,[h("div",kt,[yt,h("div",Nt,[Y(" 是否刪除 "),h("strong",Ct,z(r.value.title),1),Y(" 商品(刪除後將無法恢復)。 ")]),h("div",{class:"modal-footer"},[St,h("button",{type:"button",class:"btn btn-danger",onClick:b},"確認刪除")])])])],512))}};export{Mt as _,xt as a,Lt as u};
