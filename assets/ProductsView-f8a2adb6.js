import{_ as p,e as m,r as b,o as n,c as a,a as t,F as f,f as g,d as V,t as l,b as $,w as k}from"./index-96d67554.js";const{VITE_URL:d,VITE_PATH:i}={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"yclu",BASE_URL:"/Vue2023_Week7/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},T={data(){return{products:[]}},compoente:{RouterLink:m},methods:{getProducts(){this.$http.get(`${d}/api/${i}/products/all`).then(o=>{this.products=o.data.products}).catch(o=>{console.log(o)})},addToCart(o,c){const r={product_id:o,qty:c};this.$http.post(`${d}/api/${i}/cart/`,{data:r}).then(s=>{console.log(s.data)}).catch(s=>{console.log(s)})}},mounted(){this.getProducts()}},E=t("h2",null,"產品列表頁面",-1),R={class:"table"},y=t("thead",null,[t("th",null,"品項"),t("th",null,"價格"),t("th",null,"剩餘數量"),t("th")],-1),L=["src"],v=t("button",{class:"btn btn-outline-secondary"},"查看詳情",-1),x=["onClick"];function C(o,c,r,s,u,h){const _=b("RouterLink");return n(),a("div",null,[E,t("table",R,[y,t("tbody",null,[(n(!0),a(f,null,g(u.products,e=>(n(),a("tr",{key:e.id},[t("td",null,[t("img",{src:e.imageUrl,width:"100",height:"100",alt:"",class:"object-fit-cover"},null,8,L),V(" "+l(e.title),1)]),t("td",null,l(e.price),1),t("td",null,l(e.num),1),t("td",null,[$(_,{to:`/product/${e.id}`},{default:k(()=>[v]),_:2},1032,["to"]),t("button",{type:"button",class:"btn btn-secondary",onClick:P=>h.addToCart(e.id,1)},"加入購物車",8,x)])]))),128))])])])}const B=p(T,[["render",C]]);export{B as default};
