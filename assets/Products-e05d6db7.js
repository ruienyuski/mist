import{r as w,o as $,m as D,e as S,b as l,c as r,f as e,z as y,v as _,F as k,n as b,t as u,u as p,g as v,w as h,q as z,h as C,d as F}from"./index-a98e8c24.js";import{u as N}from"./Products-95c02508.js";import{u as V}from"./Cart-e9906d83.js";import{u as B}from"./Fav-13b51e6e.js";const E={class:"container"},I={class:"row"},j={class:"col-lg-3 col-md-12 col-12 mb-3"},M={class:"list-group product_list"},T=e("li",{class:"list-group-item list-style active"},"商品類別",-1),q=["onClick"],L={class:"col-lg-9 col-md-12 mb-5"},O={class:"row product mb-4"},U={class:"product_sale_item"},A={class:"card card_size"},G={class:"relative"},H=["onClick"],J={class:"material-icons md-32 text-danger"},K={class:"card-body p-0"},Q={class:"row product_card_product_txt"},R={class:"col-lg-7 p-3 align-self-center product_product_border text-center"},W={class:"col-lg-5 text_bold p-3 text-center"},X={style:{"text-decoration":"line-through","font-size":"0.8rem"}},Y=e("br",null,null,-1),Z={class:"text-danger"},tt={class:"card-footer card_footer_bg d-flex py-3 px-0 justify-content-between"},et=["onClick"],st={key:0,class:"fas fa-spinner fa-spin"},ot={class:"col"},at={"aria-label":"Page navigation"},lt={class:"pagination justify-content-end pagination-lg product_page"},rt={class:"page-item"},ct=e("i",{class:"material-icons"},"arrow_left",-1),it=[ct],nt=["onClick"],dt={class:"page-item"},_t=e("i",{class:"material-icons"},"arrow_right",-1),ut=[_t],mt={__name:"Products",setup(pt){const g=N(),f=V(),x=B(),i=w(0),n=w("all");$(()=>{g.getData(),f.getCart()});const m=D(()=>{const c=[];let s=[];s=g.products;const a=[];return s.forEach(t=>{n.value===t.category?(i.value=0,a.push(t)):n.value==="all"&&a.push(t)}),a.forEach((t,o)=>{o%6===0&&c.push([]);const d=parseInt(o/6);c[d].push(t)}),c}),P=D(()=>{const c=[];let s=[];return s=g.products,s.filter((t,o)=>{t.is_enabled!==!1&&c.push(t.category)}),c.filter((t,o,d)=>d.indexOf(t)===o)});return(c,s)=>{const a=S("router-link");return l(),r("div",E,[e("div",I,[e("div",j,[e("ul",M,[T,e("li",{class:y(["list-group-item list-style",{select:n.value=="all"}])},[e("a",{href:"#",onClick:s[0]||(s[0]=_(t=>n.value="all",["prevent"])),style:{display:"block"}},"全部商品")],2),(l(!0),r(k,null,b(P.value,(t,o)=>(l(),r("li",{class:y(["list-group-item list-style",{select:n.value==t}]),key:o},[e("a",{href:"#",onClick:_(d=>n.value=t,["prevent"]),style:{display:"block"}},u(t),9,q)],2))),128))])]),e("div",L,[e("div",O,[(l(!0),r(k,null,b(m.value[i.value],(t,o)=>(l(),r("div",{class:"col-lg-4 col-md-6 col-12 mb-3",key:o},[e("div",U,[e("div",A,[e("div",G,[e("span",{class:"product_like",onClick:_(d=>p(x).setFav(t.id),["prevent"])},[e("i",J,u(p(x).favState(t.id)),1)],8,H)]),v(a,{to:{name:"ProductDetail",params:{id:t.id}}},{default:h(()=>[e("div",{class:"bg-cover product_card_img",style:z(`background-image: url(${t.imageUrl})`)},null,4)]),_:2},1032,["to"]),e("div",K,[e("div",Q,[e("div",R,[v(a,{to:{name:"ProductDetail",params:{id:t.id}}},{default:h(()=>[C(u(t.title),1)]),_:2},1032,["to"])]),e("div",W,[v(a,{to:{name:"ProductDetail",params:{id:t.id}}},{default:h(()=>[e("span",X,"原價:"+u(t.origin_price),1),Y,e("span",Z,"特價"+u(t.price),1)]),_:2},1032,["to"])])])]),e("button",tt,[e("div",{class:"col border-end border-secondary",onClick:d=>p(f).addToCart(t)},[C(" 加入購物車 "),p(f).loadingItem==t.id?(l(),r("i",st)):F("",!0)],8,et),e("div",ot,[v(a,{to:{name:"ProductDetail",params:{id:t.id}}},{default:h(()=>[C(" 查看更多 ")]),_:2},1032,["to"])])])])])]))),128))]),e("nav",at,[e("ul",lt,[e("li",rt,[e("a",{class:"page-link",href:"#",onClick:s[1]||(s[1]=_(t=>i.value=0,["prevent"])),tabindex:"-1"},it)]),(l(!0),r(k,null,b(m.value.length,t=>(l(),r("li",{class:y(["page-item",{active:i.value===t-1}]),key:t},[e("a",{class:"page-link",onClick:_(o=>i.value=t-1,["prevent"]),href:"#"},u(t),9,nt)],2))),128)),e("li",dt,[e("a",{class:"page-link",href:"#",onClick:s[2]||(s[2]=_(t=>i.value=m.value.length%6-1,["prevent"]))},ut)])])])])])])}}};export{mt as default};