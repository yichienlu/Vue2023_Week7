<template>
  <div class="container">
    <h1>{{ product.title }}</h1>
    <img :src="product.imageUrl" height="200" alt="">
    <div class="fs-4" v-if="product.price==product.origin_price">{{ product.price }} 元</div>
    <div class="fs-4" v-else><small class="fs-6"><del>{{ product.origin_price }}</del></small> {{ product.price }} 元</div>
  </div>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      product: {}
    }
  },
  methods: {
    getProduct () {
      // console.log(this.$route.params)
      const { id } = this.$route.params
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/product/${id}`)
        .then((res) => {
          console.log(res.data)
          this.product = res.data.product
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getProduct()
  }
}

</script>
