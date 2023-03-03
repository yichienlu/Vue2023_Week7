<template>
  <div class="container">
    <table class="table mt-4">
    <thead>
      <tr>
        <th>購買時間</th>
        <th>Email</th>
        <th>購買款項</th>
        <th>應付金額</th>
        <th>是否付款</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(order, key) in orders" :key="key">
        <tr v-if="orders.length" :class="{ 'text-secondary': !order.is_paid }">
          <td>{{ $filters.date(order.create_at) }}</td>
          <td><span v-text="order.user.email" v-if="order.user"></span></td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in order.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">$ {{ $filters.currency(order.total) }}</td>
          <td>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                :id="`paidSwitch${order.id}`"
                v-model="order.is_paid"
                @change="editOrder(order)"
              />
              <label class="form-check-label" :for="`paidSwitch${order.id}`">
                <span v-if="order.is_paid">已付款</span>
                <span v-else>未付款</span>
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" type="button" 
              data-bs-toggle="modal" data-bs-target="#adminOrderModal" @click="selectTempOrder(JSON.parse(JSON.stringify(order)))">
                檢視
              </button>
              <button class="btn btn-outline-danger btn-sm" type="button" @click="deleteOrder(order.id)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
    <pagination :pages="pagination"  @change-page="getAdminOrders"></pagination>
  </div>
  <div id="adminOrderModal" ref="adminOrderModal" class="modal fade" tabindex="-1" aria-labelledby="orderModalLabel" aria-hidden="true">
    <admin-order-modal :admin-order-modal="adminOrderModal" ></admin-order-modal>
  </div>
</template>

<script>
import Pagination from '@/components/PaginationComponent.vue';
import AdminOrderModal from '@/components/AdminOrderModal.vue';

import adminOrdersStore from '@/stores/adminOrdersStore.js'
import { mapState, mapActions } from "pinia";
import { Modal } from 'bootstrap'
// const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data(){
    return {
      // orders:[],
      // tempOrder:{},
      // pagination: {}
      adminOrderModal: null
    }
  },
  components: {
    Pagination, AdminOrderModal
  },
  computed:{
    ...mapState(adminOrdersStore, ['tempOrder','orders', 'pagination'])
  },
  methods: {
    ...mapActions(adminOrdersStore, ['getAdminOrders', 'editOrder', 'selectTempOrder', 'deleteOrder'])
  },

  mounted(){
    this.getAdminOrders()
    // modal
    this.adminOrderModal = new Modal('#adminOrderModal');
  }
}
</script>
