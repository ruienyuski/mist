import{B as f,r as v,o as x,a as k,e as y,b as i,c,f as t,g as p,w as h,t as s,h as l,x as C,D as w,F as $,n as S,u as n,d as F,v as N,q as V}from"./index-fd10dcc9.js";import{u as B}from"./Cart-9ad61188.js";import{u as D}from"./Fav-b58b15b2.js";const T={class:"container"},M={"aria-label":"breadcrumb",role:"navigation"},j={class:"breadcrumb bg-transparent ps-0"},I={class:"breadcrumb-item"},U={class:"breadcrumb-item"},q={class:"breadcrumb-item active","aria-current":"page"},z={class:"row justify-content-between"},E={class:"col-md-5 mb-4"},H={class:"h2"},L={class:"row justify-content-end align-items-end"},P={class:"text-muted col-lg-4 col-md-12 col-12"},R={class:"h4 ms-auto mb-0 text-danger col-lg-8 col-md-12 col-12"},A=t("small",null,"特價",-1),G=t("hr",null,null,-1),J={class:"input-group my-3"},K=["value"],O={key:0,class:"fas fa-spinner fa-spin"},Q={class:"col-md-7"},W={class:"relative"},X={class:"material-icons md-32 text-danger"},Y={class:"product_Text"},ot={__name:"ProductDetail",setup(Z){const r=B(),d=D(),b=f(),u=v(""),e=v({});x(()=>{g()});const g=()=>{u.value=b.params.id;const _=`https://ec-course-api.hexschool.io/v2/api/207a7721/product/${u.value}`;k.get(_).then(o=>{e.value=o.data.product})};return(_,o)=>{const m=y("router-link");return i(),c("section",null,[t("div",T,[t("nav",M,[t("ol",j,[t("li",I,[p(m,{to:"/"},{default:h(()=>[l("Home")]),_:1})]),t("li",U,[p(m,{to:"/products"},{default:h(()=>[l("全部商品")]),_:1})]),t("li",q,s(e.value.title),1)])]),t("div",z,[t("div",E,[t("div",null,[t("h1",H,s(e.value.title),1),t("div",L,[t("span",P,[t("del",null,"售價 $"+s(e.value.origin_price),1)]),t("div",R,[A,t("strong",null,"NT$"+s(e.value.price),1)])]),G,l("購買數量: "),t("div",J,[C(t("select",{"onUpdate:modelValue":o[0]||(o[0]=a=>e.value.num=a),class:"form-select"},[(i(),c($,null,S(10,a=>t("option",{value:a,key:a}," 選購"+s(a)+s(e.value.unit),9,K)),64))],512),[[w,e.value.num]]),t("button",{class:"btn btn-primary",type:"button",onClick:o[1]||(o[1]=a=>n(r).addToCart(e.value,e.value.num))},[l(" 加到購物車 "),n(r).loadingItem==e.value.id?(i(),c("i",O)):F("",!0)])])])]),t("div",Q,[t("div",W,[t("span",{class:"product_like",onClick:o[2]||(o[2]=N(a=>n(d).setFav(e.value.id),["prevent"]))},[t("i",X,s(n(d).favState(e.value.id)),1)])]),t("div",{class:"bg-cover product_card_img mb-5",style:V(`background-image: url(${e.value.imageUrl})`)},null,4),t("h3",null,s(e.value.description),1),t("p",Y,s(e.value.content),1)])])])])}}};export{ot as default};