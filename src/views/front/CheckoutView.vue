<template>
  <div>
    <h1>付款</h1>
    <div>{{order}}</div>
    <button class="btn btn-primary" @click="payOrder">付款</button>
  </div>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data(){
    return {
      order: {},
      orderId: ''
    }
  },
  methods:{
    getOrder(){
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/order/${this.orderId}`)
        .then((res) => {
          console.log(res.data)
          this.order = res.data.order
        })
        .catch((err) => {
          console.log(err)
        })
    },
    payOrder(){
      this.$http.post(`${VITE_URL}/api/${VITE_PATH}/pay/${this.orderId}`)
        .then((res) => {
          console.log(res)
          this.$router.push(`/checkoutSuccess`)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted(){
    this.orderId = this.$route.params.id
    this.getOrder()
  }
}
</script>
