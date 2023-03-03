<template>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#adminProductModal" @click="selectTempProduct({imagesUrl:['']})">
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
          <td class="text-end">$ {{ $filters.currency(product.origin_price) }}</td>
          <td class="text-end">$ {{ $filters.currency(product.price) }}</td>
          <td>
            <span class="text-success" v-if="product.is_enabled == 1">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#adminProductModal" @click="selectTempProduct(JSON.parse(JSON.stringify(product)))">
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal" @click="selectTempProduct(product)">
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
    <admin-product-modal :admin-product-modal="adminProductModal" ></admin-product-modal>
  </div>
  <div id="deleteModal" ref="deleteModal" class="modal fade"  tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <delete-modal :delete-modal="deleteModal" ></delete-modal>
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
      // tempProduct:{
      //   imagesUrl:['']
      // },
      // pagination: {}
      adminProductModal: null,
      deleteModal: null
    }
  },
  computed:{
    ...mapState(adminProductsStore, ['tempProduct','products', 'pagination'])
  },
  components: {
    Pagination, AdminProductModal, DeleteModal
  },
  methods:{
    ...mapActions(adminProductsStore, ['getAdminProducts', 'selectTempProduct'])
  },
  mounted(){
    console.log()
    this.getAdminProducts();
    this.adminProductModal = new Modal('#adminProductModal')
    this.deleteModal = new Modal('#deleteModal')

  }
}
</script>
