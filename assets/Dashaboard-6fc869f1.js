import{s as p,e as l,b as r,c as i,g as a,w as e,h as n,f as s,a as m,_ as v}from"./index-ecf196f6.js";import{u as b}from"./useToken-5a7149cc.js";const h={class:"navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow"},f=s("button",{class:"navbar-toggler position-absolute d-md-none collapsed",type:"button","data-bs-toggle":"collapse","data-bs-target":"#sidebarMenu","aria-controls":"sidebarMenu","aria-expanded":"false","aria-label":"Toggle navigation"},[s("span",{class:"navbar-toggler-icon"})],-1),g={class:"navbar-nav px-3"},x={class:"nav-item text-nowrap"},k={__name:"Navbar",setup(_){const c=p(),o=()=>{const t="https://ec-course-api.hexschool.io/v2/logout";m.post(t).then(()=>{c.push("/login")})};return(t,d)=>{const u=l("router-link");return r(),i("nav",h,[a(u,{class:"navbar-brand col-md-3 col-lg-2 mr-0 px-3",to:"/"},{default:e(()=>[n("回到網站前台")]),_:1}),f,s("ul",g,[s("li",x,[s("a",{class:"nav-link",href:"#",onClick:d[0]||(d[0]=S=>o())},"登出")])])])}}},$={},w={id:"sidebarMenu",class:"col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"},N={class:"sidebar-sticky pt-3"},B={class:"nav flex-column"},C={class:"nav-item"},M={class:"nav-item"},T={class:"nav-item"};function V(_,c){const o=l("router-link");return r(),i("nav",w,[s("div",N,[s("ul",B,[s("li",C,[a(o,{class:"nav-link",to:"/admin"},{default:e(()=>[n("產品列表")]),_:1})]),s("li",M,[a(o,{class:"nav-link",to:"/admin/coupons"},{default:e(()=>[n("優惠卷")]),_:1})]),s("li",T,[a(o,{class:"nav-link",to:"/admin/order"},{default:e(()=>[n("訂單列表")]),_:1})])])])])}const y=v($,[["render",V]]),D={class:"container-fluid"},E={class:"row"},R={role:"main",class:"col-md-9 ms-sm-auto col-lg-10 px-md-4"},z={__name:"Dashaboard",setup(_){return b(),(c,o)=>{const t=l("router-view");return r(),i("div",null,[a(k),s("div",D,[s("div",E,[a(y),s("main",R,[a(t)])])])])}}};export{z as default};