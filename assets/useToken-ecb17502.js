import{s as u,r,a as o}from"./index-a98e8c24.js";function h(){const e=u(),s=r(!1),c=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");o.defaults.headers.common.Authorization=c;const t="https://ec-course-api.hexschool.io/v2/api/user/check";return o.post(t).then(a=>{a.data.success?s.value=!0:e.push("/login")}).catch(()=>{e.push("/")}),{checkSuccess:s}}export{h as u};
