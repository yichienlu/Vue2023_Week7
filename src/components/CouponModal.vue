<template>
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="coupon.id">編輯優惠券</span>
            <span v-else>新增優惠券</span>
          </h5>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title">標題</label>
            <input type="text" class="form-control" id="title" v-model="tempCoupon.title"
                   placeholder="請輸入標題">
          </div>
          <div class="mb-3">
            <label for="coupon_code">優惠碼</label>
            <input type="text" class="form-control" id="coupon_code" v-model="tempCoupon.code"
                   placeholder="請輸入優惠碼">
          </div>
          <div class="mb-3">
            <label for="due_date">到期日</label>
            <input type="number" class="form-control" id="due_date" v-model="tempCoupon.due_date">
          </div>
          <div class="mb-3">
            <label for="price">折扣百分比</label>
            <input type="number" class="form-control" id="price"
            min="0" max="100" v-model.number="tempCoupon.percent" placeholder="請輸入折扣百分比">
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="1" :false-value="0" v-model="tempCoupon.is_enabled" >
              <label class="form-check-label" for="is_enabled">是否啟用</label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" v-if="coupon.id" @click="this.$emit('editCoupon', tempCoupon)">
            確認編輯
          </button>
          <button type="button" class="btn btn-primary" v-else  @click="this.$emit('addCoupon', tempCoupon)">
            確認新增
          </button>
        </div>
      </div>
    </div>
</template>

<script>
// import { Modal } from 'bootstrap'
// const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data(){
    return {
      tempCoupon:{}
    }
  },
  props:['couponModal', 'coupon'],
  watch:{
    coupon(){
      this.tempCoupon = this.coupon
    }
  },
  // methods:{
    // addCoupon (coupon) {

      // console.log(coupon)
      // this.$http.post(`${VITE_URL}/api/${VITE_PATH}/admin/coupon`, { data: coupon })
      //   .then((res) => {
      //     alert(res.data.message)
      //     this.couponModal.hide()
      //     // this.getAdminCoupons()

      //   })
      //   .catch((err) => {
      //     console.log(err)
      //     // alert(err.response.data.message)
      //   })
    // },
  //   editCoupon (coupon) {
  //     this.$http.put(`${VITE_URL}/api/${VITE_PATH}/admin/coupon/${this.tempCoupon.id}`, { data: coupon })
  //       .then((res) => {
  //         alert(res.data.message)
  //         this.couponModal.hide()
  //         // this.getAdminCoupons()

  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })
  //   },
  // },
  mounted(){
    console.log('modal mounted')
  }
}

</script>