import{A as p,i as g,r as s,a as d}from"./index-a98e8c24.js";const h=p("cart",()=>{const t=g("emitter"),i=s({}),c=s(0),n=s(0),o=s(""),r=()=>{t.emit("isLoading",!0);const e="/apipath/cart";d.get(e).then(a=>{i.value=a.data.data.carts,c.value=a.data.data.total,n.value=a.data.data.final_total,t.emit("isLoading",!1)})};return{getCart:r,cart:i,cartTotal:c,cartFinalTotal:n,addToCart:(e,a=1)=>{o.value=e.id;const l="/apipath/cart",u={product_id:e.id,qty:a};d.post(l,{data:u}).then(m=>{o.value="",t.emit("cart_num"),t.emit("webmessage",m.data.message,"success"),r()})},loadingItem:o}});export{h as u};
