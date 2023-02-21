import { defineStore } from "pinia"

export default defineStore('productsStore', {
  state: () => ({
    products:[]
  }),
  actions: {
    getProducts () {
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/products/all`)
        .then((res) => {
          // console.log(res.data)
          this.products = res.data.products
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  getters: {
    sortProducts: ({ products }) => {
      return products
    }
  }
})