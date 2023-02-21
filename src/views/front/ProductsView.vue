<template>
  <div>
    <h2>產品列表頁面</h2>
    <table class="table">
      <thead>
        <th>品項</th>
        <th>價格</th>
        <th>剩餘數量</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>
            <img :src="product.imageUrl" width="100" height="100" alt="" class="object-fit-cover">
            {{ product.title }}
          </td>
          <td>{{ product.price }}</td>
          <td>{{ product.num }}</td>
          <td>
            <RouterLink :to="`/product/${product.id}`">
              <button class="btn btn-outline-secondary">查看詳情</button>
            </RouterLink>
            <button type="button" class="btn btn-secondary" @click="addToCart(product.id, 1)">加入購物車</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'
import { mapState, mapActions } from 'pinia'
import productsStore from '@/stores/productsStore.js'
import cartStore from '@/stores/cartStore.js'

const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      products: []
    }
  },
  computed: {
    ...mapState(productsStore, ['sortProducts'])
  },
  component: {
    RouterLink
  },
  methods: {
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
  ...mapActions(cartStore, ['addToCart'])
  },
  mounted () {
    this.getProducts()
  }
}
</script>
