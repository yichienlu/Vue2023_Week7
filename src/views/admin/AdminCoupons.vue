<template>
<h1>優惠管理</h1>
{{coupons}}


</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data(){
    return {
      coupons: []
    }
  },
  methods: {
    getAdminCoupons(){
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/admin/coupons`)
        .then((res) => {
          console.log(res.data)
          this.coupons = res.data.coupons
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted(){
    this.getAdminCoupons()
  }
}
</script>