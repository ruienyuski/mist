import{u as g}from"./Products-78e51be8.js";import{o as h,m,e as b,b as c,c as l,f as t,F as n,n as _,l as f,t as o,g as a,w as d,q as u,h as r}from"./index-ecf196f6.js";const x=f('<div class="container"><div class="row"><div class="col-lg-12 mobile_header relative"><div class="header bg-cover" style="background-image:url(https://images.unsplash.com/photo-1482242248426-c4e9fe3a559a?ixlib=rb-1.2.1);"></div><div class="salemenu"><div class="opacity"><div class="bg_blur blur_img01"></div><a href="#本日精選" class="salemenu_item"><span>本日精選</span></a></div><div class="opacity"><div class="bg_blur blur_img02"></div><a href="#人氣推薦" class="salemenu_item salemenu_item_border"><span>人氣推薦</span></a></div><div class="opacity"><div class="bg_blur blur_img03"></div><a href="#新品上市" class="salemenu_item"><span>新品上市</span></a></div></div></div></div></div><div class="container-fluid desktop"><div class="content"><div class="row home_ad_bg justify-content-center"><div class="home_ad_img col-lg-4 col-12 bg-cover" style="background-image:url(https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-1.2.1);"></div><div class="col-lg-5 col-12 pl-5 pt-4 home_ad_txt row justify-content-around align-items-center"><div class="h3 col-lg-12 mb-5 desktop"> 關於我們 </div><div class="home_ad_p_txt col-lg-12 col-12"><p>不管未來有何嚴峻挑戰，請放鬆心情享受這一刻美好!</p><p class="blockquote-footer">網站內容皆從網路蒐集，僅作參考用!!</p></div></div></div></div><h1 class="text-center">─ 最新優惠活動 ─</h1></div>',2),y={class:"container my-5"},k={class:"home_sale row justify-content-center"},D={class:"card"},P={class:"relative"},w={class:"product_home_list product_today"},N={class:"card-body p-0"},j={class:"row product_card_product_txt"},z={class:"col-lg-7 p-3 align-self-center product_product_border text-center"},B={class:"col-lg-5 text_bold p-3 text-center"},S={style:{"text-decoration":"line-through","font-size":"0.8rem"}},V=t("br",null,null,-1),U={class:"text-danger"},$={class:"card"},q={class:"relative"},C={class:"product_home_list bg-danger"},E={class:"card-body p-0"},F={class:"row product_card_product_txt"},I={class:"col-lg-7 p-3 align-self-center product_product_border text-center"},L={class:"col-lg-5 text_bold p-3 text-center"},M={style:{"text-decoration":"line-through","font-size":"0.8rem"}},O=t("br",null,null,-1),T={class:"text-danger"},W={class:"card"},A={class:"relative"},G={class:"product_home_list product_NEW"},H={class:"card-body p-0"},J={class:"row product_card_product_txt"},K={class:"col-lg-7 p-3 align-self-center product_product_border text-center"},Q={class:"col-lg-5 text_bold p-3 text-center"},R={style:{"text-decoration":"line-through","font-size":"0.8rem"}},X=t("br",null,null,-1),Y={class:"text-danger"},ot={__name:"Index",setup(Z){const p=g();h(()=>{p.getData()});const i=m(()=>Object.groupBy(p.products,v=>v.advertise));return(v,tt)=>{const e=b("router-link");return c(),l("div",null,[x,t("div",y,[t("div",k,[(c(!0),l(n,null,_(i.value.本日精選,s=>(c(),l("div",{class:"col-md-4 col-lg-4 col-12 mb-4",id:"本日精選",key:s.id},[t("div",D,[t("div",P,[t("span",w,o(s.advertise),1)]),a(e,{to:{name:"ProductDetail",params:{id:s.id}}},{default:d(()=>[t("div",{class:"bg-cover product_card_img",style:u(`background-image: url(${s.imageUrl})`)},null,4)]),_:2},1032,["to"]),t("div",N,[t("div",j,[t("div",z,[a(e,{to:{name:"ProductDetail",params:{id:s.id}}},{default:d(()=>[r(o(s.title),1)]),_:2},1032,["to"])]),t("div",B,[a(e,{to:{name:"ProductDetail",params:{id:s.id}}},{default:d(()=>[t("span",S,"原價:"+o(s.origin_price),1),V,t("span",U,"特價"+o(s.price),1)]),_:2},1032,["to"])])])]),a(e,{to:{name:"ProductDetail",params:{id:s.id}},class:"card-footer card_footer_bg text-center"},{default:d(()=>[r("查看更多")]),_:2},1032,["to"])])]))),128)),(c(!0),l(n,null,_(i.value.人氣推薦,s=>(c(),l("div",{class:"col-md-4 col-lg-4 col-12 mb-4",id:"人氣推薦",key:s.id},[t("div",$,[t("div",q,[t("span",C,o(s.advertise),1)]),a(e,{to:{name:"ProductDetail",params:{id:s.id}}},{default:d(()=>[t("div",{class:"bg-cover product_card_img",style:u(`background-image: url(${s.imageUrl})`)},null,4)]),_:2},1032,["to"]),t("div",E,[t("div",F,[t("div",I,[a(e,{to:{name:"ProductDetail",params:{id:s.id}}},{default:d(()=>[r(o(s.title),1)]),_:2},1032,["to"])]),t("div",L,[a(e,{to:{name:"ProductDetail",params:{id:s.id}}},{default:d(()=>[t("span",M,"原價:"+o(s.origin_price),1),O,t("span",T,"特價"+o(s.price),1)]),_:2},1032,["to"])])])]),a(e,{to:{name:"ProductDetail",params:{id:s.id}},class:"card-footer card_footer_bg text-center"},{default:d(()=>[r("查看更多")]),_:2},1032,["to"])])]))),128)),(c(!0),l(n,null,_(i.value.新品上市,s=>(c(),l("div",{class:"col-md-4 col-lg-4 col-12 mb-4",id:"新品上市",key:s.id},[t("div",W,[t("div",A,[t("span",G,o(s.advertise),1)]),a(e,{to:{name:"ProductDetail",params:{id:s.id}}},{default:d(()=>[t("div",{class:"bg-cover product_card_img",style:u(`background-image: url(${s.imageUrl})`)},null,4)]),_:2},1032,["to"]),t("div",H,[t("div",J,[t("div",K,[a(e,{to:{name:"ProductDetail",params:{id:s.id}}},{default:d(()=>[r(o(s.title),1)]),_:2},1032,["to"])]),t("div",Q,[a(e,{to:{name:"ProductDetail",params:{id:s.id}}},{default:d(()=>[t("span",R,"原價:"+o(s.origin_price),1),X,t("span",Y,"特價"+o(s.price),1)]),_:2},1032,["to"])])])]),a(e,{to:{name:"ProductDetail",params:{id:s.id}},class:"card-footer card_footer_bg text-center"},{default:d(()=>[r("查看更多")]),_:2},1032,["to"])])]))),128))])])])}}};export{ot as default};