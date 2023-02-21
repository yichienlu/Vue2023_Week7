<template>
  <div>
    <h1>付款</h1>

  </div>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data(){
    return {
      order: {},
      orderId: 0
    }
  },
  methods:{
    payOrder(){
      this.$http.post(`${VITE_URL}/api/${VITE_PATH}/pay/${this.orderId}`)
        .then((res) => {
          console.log(res)
        })
        .cath((err) => {
          console.log(err)
        })
    }
  },
  mounted(){

  }
}
</script>
