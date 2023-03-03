import{P as u}from"./PaginationComponent-d57e945e.js";import{_ as g,r as i,o as a,c as o,d as r,F as d,h,e as c,w as m,f,t as V}from"./index-5511e744.js";const{VITE_URL:E,VITE_PATH:A}={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"yclu",BASE_URL:"/Vue2023_Week7/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},P={data(){return{articles:[],pagination:{}}},components:{Pagination:u},methods:{getArticles(n=1){this.$http.get(`${E}/api/${A}/articles?page=${n}`).then(t=>{this.articles=t.data.articles,this.pagination=t.data.pagination}).catch(t=>{console.log(t)})}},mounted(){this.getArticles()}},R={class:"container"},T=r("h1",null,"文章列表",-1);function k(n,t,x,L,s,l){const p=i("RouterLink"),_=i("pagination");return a(),o("div",R,[T,r("ul",null,[(a(!0),o(d,null,h(s.articles,e=>(a(),o("li",{key:e.id},[c(p,{to:`/article/${e.id}`},{default:m(()=>[f(V(e.title),1)]),_:2},1032,["to"])]))),128))]),c(_,{pages:s.pagination,onChangePage:l.getArticles},null,8,["pages","onChangePage"])])}const B=g(P,[["render",k]]);export{B as default};
