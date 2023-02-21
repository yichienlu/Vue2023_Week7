<template>
<h1>文章列表</h1>
<ul>
  <li v-for="article in articles">
    <RouterLink :to="`/article/${article.id}`">{{ article.title }}</RouterLink>
  </li>
</ul>
</template>

<script>
import { RouterLink } from 'vue-router'
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      articles:[]
    }
  },
  methods:{
    getArticles() {
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/articles`)
        .then((res) => {
          console.log(res.data)
          this.articles = res.data.articles
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