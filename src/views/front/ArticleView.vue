<template>
  <div class="container">
      <RouterLink :to="`/articles`">← 回列表</RouterLink>

    <h2>{{ article.title }}</h2>
    <small>{{ article.author }}</small>
    <p id="content"></p>    
  </div>

</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env
export default {
  data(){
    return {
      article:{}
    }
  }, 
  methods: {
    getArticle(){
      const { id } = this.$route.params
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/article/${id}`)
      .then((res) => {
          // console.log(res.data)
          this.article = res.data.article
          document.querySelector('#content').innerHTML = res.data.article.content
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted(){
    this.getArticle()
  }
}
</script>