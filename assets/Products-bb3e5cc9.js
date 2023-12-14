import{i as F,r,M as B,m as T,b as m,c as _,f as e,t as x,x as d,y as p,h as f,d as R,U as j,F as I,n as N,V as W,a as k,o as E,g as D}from"./index-fd10dcc9.js";import{u as S,_ as q,a as z}from"./DeleteModal-251ac9c7.js";const A={class:"modal-dialog modal-lg"},G={class:"modal-content border-0"},H={class:"modal-header bg-dark text-white"},J={class:"modal-title",id:"exampleModalLabel"},K=e("div",{"data-bs-theme":"dark"},[e("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),O={class:"modal-body"},Q={class:"row justify-content-center"},X={class:"col-4"},Y={class:"mt-2"},Z=e("label",{for:"img"},"輸入主圖網址",-1),P={class:"mt-2"},ee={class:"form-label",for:"customFile"},te={key:0,class:"fas fa-spinner fa-spin"},se={class:"mt-4"},le=e("div",{class:"fs-6 text-danger my-2"},"主圖 (商品列表預覽圖片)",-1),oe=["src"],ae={class:"col-8"},ie={class:"mt-2"},ne=e("label",{class:"form-label",for:"title"},[f("標題 "),e("span",{class:"text-danger"},"(必填)")],-1),de={class:"row"},ce={class:"mt-2 col-md-6"},re=e("label",{class:"form-label",for:"category"},[f("分類 "),e("span",{class:"text-danger"},"(必填)")],-1),ue={class:"mt-2 col-md-6"},pe=e("label",{class:"form-label",for:"price"},[f("單位 "),e("span",{class:"text-danger"},"(必填)")],-1),me={class:"row"},_e={class:"mt-2 col-md-6"},he=e("label",{class:"form-label",for:"origin_price"},[f("原價 "),e("span",{class:"text-danger"},"(必填)")],-1),ve={class:"mt-2 col-md-6"},fe=e("label",{class:"form-label",for:"price"},[f("售價 "),e("span",{class:"text-danger"},"(必填)")],-1),be=e("hr",null,null,-1),ge={class:"mt-2"},ye=e("label",{class:"form-label",for:"category"},"廣告分類 ",-1),xe={class:"mt-2"},ke=e("label",{class:"form-label",for:"content"},"說明內容 ",-1),we={class:"mt-2"},Ue=e("label",{class:"form-label",for:"content"},"產品描述 ",-1),$e={class:"mt-2"},Ve={class:"form-check"},Ce=e("label",{class:"form-check-label",for:"is_enabled"},"是否啟用",-1),Me={class:"col row justify-content-center"},De=e("div",{class:"fs-6 text-danger my-2"},"已上傳的圖片，勾選設定主圖",-1),Le={class:"row justify-content-center row-cols-3 g-3"},Fe={class:"form-check w-50"},je=["value","id"],Ie=["for"],Ne=["src"],Be={class:"modal-footer"},Te=e("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal","aria-label":"Close"},"取消",-1),Re=["disabled"],We={__name:"ProductModal",props:["product","title"],emits:["updataItem"],setup(L,{expose:c,emit:w}){const b=F("emitter"),n=L,g=w,s=r({}),u=r(""),h=r(!1),v=r(null),{modalWindow:$,modalshow:V,modalhide:y}=S(),C=()=>{g("updataItem",s.value)};s.value=n.product,u.value=n.title,c({show:V,hide:y}),B(()=>n.product,(o,t)=>{(o.id!==t.id||o.is_enabled!==t.is_enabled)&&(s.value=o,u.value=n.title)});const M=T(()=>{var o,t,l,a,U;return!!((o=s==null?void 0:s.value)!=null&&o.title)&&!!((t=s==null?void 0:s.value)!=null&&t.category)&&!!((l=s==null?void 0:s.value)!=null&&l.unit)&&!!((a=s==null?void 0:s.value)!=null&&a.origin_price)&&!!((U=s==null?void 0:s.value)!=null&&U.price)}),i=()=>{s.value.imagesUrl||(s.value.imagesUrl=[]);const o=v.value.files[0],t=new FormData;t.append("file",o);const l="https://ec-course-api.hexschool.io/v2/api/207a7721/admin/upload";h.value=!0,k.post(l,t,{headers:{"Content-Type":"multipart/form-data"}}).then(a=>{h.value=!1,a.data.success&&(b.emit("webmessage","圖片上傳成功","success"),s.value.imagesUrl.push(a.data.imageUrl))}).catch(a=>{console.log(a),b.emit("webmessage","圖片上傳失敗，請確認上傳不可超過 2 MB","warning"),h.value=!1})};return(o,t)=>(m(),_("div",{class:"modal fade",id:"productModal",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref_key:"modalWindow",ref:$},[e("div",A,[e("div",G,[e("div",H,[e("h5",J,[e("span",null,x(u.value),1)]),K]),e("div",O,[e("form",Q,[e("div",X,[e("div",Y,[Z,d(e("input",{id:"img","onUpdate:modelValue":t[0]||(t[0]=l=>s.value.imageUrl=l),type:"text",class:"form-control",placeholder:"請輸入圖片連結"},null,512),[[p,s.value.imageUrl]])]),e("div",P,[e("label",ee,[f(" 上傳圖片 "),h.value?(m(),_("i",te)):R("",!0)]),e("input",{id:"customFile",ref_key:"file",ref:v,type:"file",class:"form-control",onChange:i},null,544)]),e("div",se,[le,e("img",{class:"img-fluid",src:s.value.imageUrl||"",style:{width:"200px",height:"200px","object-fit":"cover"},alt:""},null,8,oe)])]),e("div",ae,[e("div",ie,[ne,d(e("input",{type:"text",class:"form-control",id:"title",placeholder:"請輸入標題","onUpdate:modelValue":t[1]||(t[1]=l=>s.value.title=l)},null,512),[[p,s.value.title]])]),e("div",de,[e("div",ce,[re,d(e("input",{type:"text",class:"form-control",id:"category",placeholder:"請輸入分類","onUpdate:modelValue":t[2]||(t[2]=l=>s.value.category=l)},null,512),[[p,s.value.category]])]),e("div",ue,[pe,d(e("input",{type:"unit",class:"form-control",id:"unit",placeholder:"請輸入單位","onUpdate:modelValue":t[3]||(t[3]=l=>s.value.unit=l)},null,512),[[p,s.value.unit]])])]),e("div",me,[e("div",_e,[he,d(e("input",{type:"number",class:"form-control",id:"origin_price",placeholder:"請輸入原價","onUpdate:modelValue":t[4]||(t[4]=l=>s.value.origin_price=l)},null,512),[[p,s.value.origin_price]])]),e("div",ve,[fe,d(e("input",{type:"number",class:"form-control",id:"price",placeholder:"請輸入售價","onUpdate:modelValue":t[5]||(t[5]=l=>s.value.price=l)},null,512),[[p,s.value.price]])])]),be,e("div",ge,[ye,d(e("input",{type:"text",class:"form-control",id:"category","onUpdate:modelValue":t[6]||(t[6]=l=>s.value.advertise=l)},null,512),[[p,s.value.advertise]])]),e("div",xe,[ke,d(e("textarea",{type:"text",class:"form-control",id:"content",placeholder:"","onUpdate:modelValue":t[7]||(t[7]=l=>s.value.content=l)},null,512),[[p,s.value.content]])]),e("div",we,[Ue,d(e("textarea",{type:"text",class:"form-control",id:"content",placeholder:"請輸入產品描述","onUpdate:modelValue":t[8]||(t[8]=l=>s.value.description=l)},null,512),[[p,s.value.description]])]),e("div",$e,[e("div",Ve,[d(e("input",{id:"is_enabled","onUpdate:modelValue":t[9]||(t[9]=l=>s.value.is_enabled=l),class:"form-check-input",type:"checkbox","true-value":1,"false-value":0},null,512),[[j,s.value.is_enabled]]),Ce])])]),e("div",Me,[De,e("div",Le,[(m(!0),_(I,null,N(s.value.imagesUrl,(l,a)=>(m(),_("div",{class:"row justify-content-center",key:a},[e("div",Fe,[d(e("input",{class:"form-check-input",type:"radio","onUpdate:modelValue":t[10]||(t[10]=U=>s.value.imageUrl=U),value:l,name:"flexRadioDefault",id:a},null,8,je),[[W,s.value.imageUrl]]),e("label",{class:"form-check-label",for:a}," 設為主圖 ",8,Ie)]),e("img",{class:"img-fluid",src:s.value.imagesUrl[a],style:{width:"200px",height:"200px","object-fit":"cover"},alt:""},null,8,Ne)]))),128))])])])]),e("div",Be,[Te,e("button",{type:"submit",class:"btn btn-primary",onClick:C,disabled:!M.value},"確認",8,Re)])])])],512))}},Ee={class:"text-end"},Se={class:"table"},qe=e("thead",{class:"thead-dark"},[e("tr",null,[e("th",{scope:"col"},"#"),e("th",{scope:"col"},"分類"),e("th",{scope:"col"},"產品名稱"),e("th",{scope:"col"},"價格"),e("th",{scope:"col"},"是否上架"),e("th",{scope:"col"},"編輯")])],-1),ze={scope:"row"},Ae={class:"form-check form-switch"},Ge=["id","onUpdate:modelValue","onChange"],He=["for"],Je={key:0,class:"text-success"},Ke={key:1,class:"text-muted"},Oe=["onClick"],Qe=["onClick"],Ze={__name:"Products",setup(L){const c=F("emitter"),w=r([]),b=r({}),n=r({}),g=r(""),s=r(!1),u=r(null),h=r(null);E(()=>{v()});const v=(i=1)=>{c.emit("isLoading",!0);const o=`https://ec-course-api.hexschool.io/v2/api/207a7721/admin/products?page=${i}`;k.get(o).then(t=>{w.value=t.data.products,b.value=t.data.pagination,c.emit("isLoading",!1)})},$=i=>{c.emit("isLoading",!0),n.value=i,c.emit("isLoading",!1),u.value.show()},V=i=>{const o=`https://ec-course-api.hexschool.io/v2/api/207a7721/admin/product/${i.id}`;k.delete(o).then(()=>{c.emit("webmessage","此筆資料已經刪除","success"),v()}),h.value.hide()},y=(i,o)=>{switch(i){case"new":g.value="新增產品",n.value={imageUrl:"",imagesUrl:[]},s.value=!0,u.value.show();break;case"edit":g.value="編輯產品",s.value=!1,$(o);break;case"delete":n.value={...o},h.value.show();break}},C=i=>{let o="https://ec-course-api.hexschool.io/v2/api/207a7721/admin/product",t="post";c.emit("isLoading",!0);let l="新增產品成功";s.value||(t="put",o=`https://ec-course-api.hexschool.io/v2/api/207a7721/admin/product/${i.id}`,l="更新產品成功"),k[t](o,{data:i}).then(()=>{c.emit("webmessage",l,"success"),v(),u.value.hide()}).catch(a=>{c.emit("isLoading",!1),u.value.hide(),c.emit("webmessage",`錯誤訊息: ${a.response.data.message}`,"danger")})},M=i=>{const o=`https://ec-course-api.hexschool.io/v2/api/207a7721/admin/product/${i.id}`;n.value={...i},k.put(o,{data:n.value}).then(()=>{v()})};return(i,o)=>(m(),_("div",null,[e("div",Ee,[e("button",{type:"button",class:"my-3 btn btn-primary",onClick:o[0]||(o[0]=t=>y("new",!0))}," 新建產品 ")]),e("table",Se,[qe,e("tbody",null,[(m(!0),_(I,null,N(w.value,(t,l)=>(m(),_("tr",{key:t.id},[e("th",ze,x(l+1),1),e("td",null,x(t.category),1),e("td",null,x(t.title),1),e("td",null,x(t.price),1),e("td",null,[e("div",Ae,[d(e("input",{id:t.id,"onUpdate:modelValue":a=>t.is_enabled=a,"true-value":1,"false-value":0,type:"checkbox",class:"form-check-input",onChange:a=>M(t)},null,40,Ge),[[j,t.is_enabled]]),e("label",{class:"form-check-label",for:t.id},[t.is_enabled===1?(m(),_("strong",Je,"已上架")):(m(),_("span",Ke,"尚未上架"))],8,He)])]),e("td",null,[e("button",{type:"button",class:"btn btn-outline-primary btn-sm mr-1",onClick:a=>y("edit",t)}," 編輯 ",8,Oe),e("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:a=>y("delete",t)}," 刪除 ",8,Qe)])]))),128))])]),D(q,{pages:b.value,onUpdatapage:v},null,8,["pages"]),D(We,{product:n.value,title:g.value,onUpdataItem:C,ref_key:"openProduct",ref:u},null,8,["product","title"]),D(z,{item:n.value,onDelData:V,ref_key:"openDelete",ref:h},null,8,["item"])]))}};export{Ze as default};