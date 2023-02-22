<template>
<h1>文章管理</h1>
{{articles}}
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data(){
    return {
      articles:[]
    }
  },
  methods: {
    getAdminArticles(){
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/admin/articles`)
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
    this.getAdminArticles()
  }
}
</script>