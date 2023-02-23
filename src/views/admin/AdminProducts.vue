<!-- https://github.com/yichienlu/Vue_2023/blob/main/Vue_Week4/admin_products.js -->
<!-- https://github.com/hexschool/live-vue3-dashboard-vite/blob/main/src/views/Products.vue -->
<!-- https://github.com/n0918679182/Vue-week7/blob/master/src/views/admin/AdminProducts.vue -->
<template>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#adminProductModal" @click="tempProduct={};tempProduct.imagesUrl=['']">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">
            分類
          </th>
          <th>產品名稱</th>
          <th width="120">
            原價
          </th>
          <th width="120">
            售價
          </th>
          <th width="100">
            是否啟用
          </th>
          <th width="120">
            編輯
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td class="text-end">{{ product.origin_price }}</td>
          <td class="text-end">{{ product.price }}</td>
          <td>
            <span class="text-success" v-if="product.is_enabled == 1">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#adminProductModal" @click="tempProduct = JSON.parse(JSON.stringify(product))">
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal" @click="tempProduct=product">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :pages="pagination"  @change-page="getAdminProducts"></pagination>
  </div>

  <div id="adminProductModal" ref="adminProductModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
    <admin-product-modal :temp-product="tempProduct" :admin-product-modal="adminProductModal"></admin-product-modal>
  </div>
  <div id="deleteModal" ref="deleteModal" class="modal fade"  tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <delete-modal :temp-product="tempProduct" :delete-modal="deleteModal" ></delete-modal>
  </div>
</template>

<script>
import Pagination from '@/components/PaginationComponent.vue';
import AdminProductModal from '@/components/AdminProductModal.vue';
import DeleteModal from '@/components/DeleteModal.vue';
import adminProductsStore from '@/stores/adminProductsStore.js'
import { mapState, mapActions } from "pinia";
import { Modal } from 'bootstrap'
// const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      // products:[],
      tempProduct:{
        imagesUrl:['']
      },
      // pagination: {}
      adminProductModal: null,
      deleteModal: null
    }
  },
  computed:{
    ...mapState(adminProductsStore, ['products', 'pagination'])
  },
  components: {
    Pagination, AdminProductModal, DeleteModal
  },
  methods:{
    ...mapActions(adminProductsStore, ['getAdminProducts'])
  },
  mounted(){
    console.log()
    this.getAdminProducts();
    this.adminProductModal = new Modal('#adminProductModal')
    this.deleteModal = new Modal('#deleteModal')

  }
}
</script>
