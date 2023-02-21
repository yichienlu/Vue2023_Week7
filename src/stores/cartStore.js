import { defineStore } from "pinia"

export default defineStore('cartStore', {
  state: () => ({
    products: [],
    productId: '',
    cart: [],
    form: {
      user: {
        name: '',
        email: '',
        tel: '',
        address: '',
      },
      message: '',
    },
    loadingItem: ''
  }),
  actions: {
    getCarts () {
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/cart`)
        .then((res) => {
          // console.log('購物車' , res.data)
          this.cart = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addToCart (id, qty) {
      const data = {
        product_id: id,
        qty
      }
      this.$http.post(`${VITE_URL}/api/${VITE_PATH}/cart/`, { data })
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updateCartItem (item) {
      const data = {
        product_id: item.product.id,
        qty: item.qty
      }
      this.loadingItem = item.id
      this.$http.put(`${VITE_URL}/api/${VITE_PATH}/cart/${item.id}`, { data }) // 購物車 ID
        .then((res) => {
          this.cart = res.data.data
          this.getCarts()
          this.loadingItem = ''
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteCartItem (item) {
      this.loadingItem = item.id
      this.$http.delete(`${VITE_URL}/api/${VITE_PATH}/cart/${item.id}`) // 購物車 ID
        .then((res) => {
          console.log('更新購物車', res.data)
          this.getCarts()
          this.loadingItem = ''
        })
        .catch((err) => {
          console.log(err)
        })
    },
    clearCart () {
      this.$http.delete(`${VITE_URL}/api/${VITE_PATH}/carts`)
        .then(() => {
          this.getCarts()
          this.loadingItem = ''
        })
        .catch((err) => {
          console.log(err)
        })
    },
    createOrder () {
      console.log({data: this.form})
      this.$http.post(`${VITE_URL}/api/${VITE_PATH}/order`,{ data: this.form })
        .then((res) => {
          console.log(res)
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
  getters: {

  }
})