<template>
  <div class="container">
    <h1>文章列表</h1>
    <ul>
      <li v-for="article in articles" :key="article.id">
        <RouterLink :to="`/article/${article.id}`">{{ article.title }}</RouterLink>
      </li>
    </ul>
    <pagination :pages="pagination"  @change-page="getArticles"></pagination>

  </div>

</template>    

<script>
// import { RouterLink } from 'vue-router'
import Pagination from '@/components/PaginationComponent.vue';

const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      articles:[],
      pagination:{}
    }
  },
  components:{Pagination},
  methods:{
    getArticles(page=1) {
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/articles?page=${page}`)
        .then((res) => {
          // console.log(res.data)
          this.articles = res.data.articles
          this.pagination = res.data.pagination
        })
        .catch((err) => {
          console.log(err)
        })
    }

  },
  mounted(){
    this.getArticles()
  }
}
</script>

<!-- category 再研究一下QQ -->
<!-- <template>
  <div class="container">
    <h1>文章列表</h1>
    <select name="category" id="selectCategory" class="form-control" @change="showArticles">
      <option value="all">全部</option>
      <option :value="category" v-for="category in categories" :key="category">{{ category }}</option>
    </select>
    <ul>
      <li v-for="article in shownArticles" :key="article.id">
        <RouterLink :to="`/article/${article.id}`">{{ article.title }}( {{ article.category }})</RouterLink>
      </li>
    </ul>
  <pagination :pages="pagination"  @change-page="getCategories"></pagination>

  </div>

</template>    

<script>
// import { RouterLink } from 'vue-router'
import Pagination from '@/components/PaginationComponent.vue';

const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      articles:[],
      shownArticles:[],
      categories:[],
      currentCategory:'all',
      pagination: {}
    }
  },
  components: {
    Pagination
  },
  methods:{
    getCategories(page = 1, currentCategory = 'all'){
      console.log(page, currentCategory)
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/articles/?page=${page}?category=${currentCategory}`)
        .then((res) => {
          console.log(res)
          this.articles = res.data.articles
          this.pagination = res.data.pagination
          // 類別option
          let catNum = res.data.articles.reduce((a,c)=>{
            a[c['category']]==undefined ? a[c['category']] = 1 : a[c['category']]+=1
            return a
          }, {})
          this.categories = Object.keys(catNum)
          this.showArticles()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    showArticles(event) {
      if(event){
        if(event.target.value == 'all'){
          this.shownArticles = this.articles
        } else {
          this.shownArticles = this.articles.filter(article => article.category == event.target.value)
        }
      } else {
        this.shownArticles = this.articles
      }
    }

  },
  mounted(){
    this.getCategories()

  }
}
</script> -->