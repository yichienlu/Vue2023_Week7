<template>
  <div class="container">
    <div class="text-end">
      <button class="btn btn-outline-danger" type="button" @click.prevent="clearCart()">清空購物車</button>
    </div>
    <template v-if="cart.total">
      <table class="table align-middle">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 150px">數量/單位</th>
            <th>單價</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="deleteCartItem(item)"
                  :disabled="item.id === loadingItem"
                >
                  <!-- <i class="fas fa-spinner fa-pulse"></i> -->
                  x
                </button>
              </td>
              <td>
                {{ item.product.title }}
                <!-- <div class="text-success">已套用優惠券</div> -->
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <div class="input-group mb-3">
                    <select name="" id="" class="form-control" v-model="item.qty" @change="updateCartItem(item)" :disabled="item.id === loadingItem">
                      <option :value="i" v-for="i in 20" :key="`${i}unit`">
                        {{ i }}
                      </option>
                    </select>
                    <span class="input-group-text" id="basic-addon2">{{
                      item.product.unit
                    }}</span>
                  </div>
                </div>
              </td>
              <td class="text-end">
                $ {{ $filters.currency(item.total) }}
                <small class="text-success">折扣價：$ {{ $filters.currency(item.final_total) }}</small>
              </td>
            </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">$ {{$filters.currency(cart.total) }}</td>
          </tr>
          <tr>
            <td colspan="3" class="text-end text-success">
              <div v-if="cart.carts[0].coupon">
                已套用折價券 {{ cart.carts[0].coupon.title }} 
              </div>
            </td>
            <td class="text-end text-success">
              折扣價：$ {{ $filters.currency(cart.final_total) }}</td>
          </tr>
        </tfoot>
      </table>
      <div class="input-group mb-3 input-group-sm">
        <input
          type="text"
          class="form-control"
          v-model="coupon_code"
          placeholder="請輸入優惠碼"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="addCouponCode"
          >
            套用優惠碼
          </button>
        </div>
      </div>

      
    </template>
    <div class="text-center" v-else>購物車空空如也，<router-link to="/products" class="">去購物</router-link></div>

    <div class="my-5 row justify-content-center">
    <v-form ref="form" class="col-md-6" v-slot="{ errors }" @submit="createOrder">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <v-field id="email" name="email" type="email" class="form-control" :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email" rules="required|email" v-model="form.user.email"></v-field>
        <error-message name="email" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名</label>
        <v-field id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }" placeholder="請輸入姓名" rules="required" v-model="form.user.name"></v-field>
        <error-message name="姓名" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="tel" class="form-label">收件人電話</label>
        <v-field id="tel" name="電話" type="tel" class="form-control" :class="{ 'is-invalid': errors['電話'] }" placeholder="請輸入電話" :rules="isPhone" v-model="form.user.tel"></v-field>
        <error-message name="電話" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">收件人地址</label>
        <v-field id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }" placeholder="請輸入地址" rules="required"  v-model="form.user.address"></v-field>
        <error-message name="地址" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea id="message" class="form-control" cols="30" rows="10"  v-model="form.message"></textarea>
      </div>
      <div class="text-end">
        <button type="submit" class="btn btn-danger" :disabled="!cart.total">送出訂單</button>
      </div>
    </v-form>
  </div>
  </div>
</template>

<script>
import cartStore from '@/stores/cartStore.js'
import { mapState, mapActions } from 'pinia'

const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      coupon_code: ''
    }
  },
  computed:{
    ...mapState(cartStore, ['cart', 'form', 'loadingItem'])
  },
  methods: {
    ...mapActions(cartStore, ['getCarts', 'updateCartItem', 'deleteCartItem', 'clearCart', 'createOrder']),
    
    addCouponCode(){
      this.$http.post(`${VITE_URL}/api/${VITE_PATH}/coupon`, {data: { code: this.coupon_code }})
      .then((res) => {
        console.log(res.data)
        this.getCarts()
      })
      .catch((err) => {
        console.log(err)
      })
    },
    
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    }
  },
  mounted () {
    this.getCarts()
  }
}
</script>
