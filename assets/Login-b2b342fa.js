import{i as _,r as u,s as m,b as p,c as h,f as s,v,x as c,y as l,a as g}from"./index-a98e8c24.js";const f={class:"container"},b={class:"row justify-content-center mb-5"},w={class:"col-lg-5 login_width"},x={class:"card text-center login_bg"},y={class:"card-body"},k=s("h5",{class:"card-title"},"後台登入",-1),j={class:"form-row justify-content-center"},B={class:"form-group col-lg-11 col-10 mb-0"},V={class:"relative input_icon"},$=s("label",{for:"email"},null,-1),q=s("i",{class:"material-icons"},"person",-1),D={class:"form-group col-lg-11 col-10 mb-0"},M={class:"relative input_icon"},T=s("label",{for:"password"},null,-1),U=s("i",{class:"material-icons"},"vpn_key",-1),E=s("button",{class:"btn card-footer login_btn_bg border-0 rounded-0",type:"submit"}," 登入帳號 ",-1),R={__name:"Login",setup(L){const a=_("emitter"),o=u({username:"",password:""}),i=m(),r=()=>{const n="https://ec-course-api.hexschool.io/v2/admin/signin";g.post(n,o.value).then(e=>{const{token:t,expired:d}=e.data;document.cookie=`hexToken=${t};expires=${new Date(d)};`,a.emit("webmessage",e.data.message,"success"),i.push({path:"/admin"})}).catch(e=>{a.emit("webmessage",e.response.data.message,"danger"),i.push({path:"/login"})})};return(n,e)=>(p(),h("div",null,[s("div",f,[s("div",b,[s("div",w,[s("form",{onSubmit:v(r,["prevent"])},[s("div",x,[s("div",y,[k,s("div",j,[s("div",B,[s("div",V,[$,c(s("input",{type:"email",class:"form-control form-control-lg",id:"email","onUpdate:modelValue":e[0]||(e[0]=t=>o.value.username=t),placeholder:"請輸入email",required:""},null,512),[[l,o.value.username]]),q])]),s("div",D,[s("div",M,[T,c(s("input",{type:"password",class:"form-control form-control-lg",id:"password","onUpdate:modelValue":e[1]||(e[1]=t=>o.value.password=t),placeholder:"請輸入密碼",required:""},null,512),[[l,o.value.password]]),U])])])]),E])],32)])])])]))}};export{R as default};
