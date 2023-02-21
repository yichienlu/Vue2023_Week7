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
      <template v-for="(item, key) in orders" :key="key">
        <tr v-if="orders.length" :class="{ 'text-secondary': !item.is_paid }">
          <!-- <td>{{ $filters.date(item.create_at) }}</td> -->
          <td>{{ item.create_at }}</td>
          <td><span v-text="item.user.email" v-if="item.user"></span></td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ item.total }}</td>
          <td>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                :id="`paidSwitch${item.id}`"
                v-model="item.is_paid"
                @change="editOrder(item)"
              />
              <label class="form-check-label" :for="`paidSwitch${item.id}`">
                <span v-if="item.is_paid">已付款</span>
                <span v-else>未付款</span>
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" type="button">
                檢視
              </button>
              <button class="btn btn-outline-danger btn-sm" type="button" @click="deleteOrder(item.id)">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
    <pagination :pages="pagination"  @change-page="getOrders"></pagination>
  </div>
</template>

<script>
import Pagination from '@/components/PaginationComponent.vue';
import AdminOrderModal from '@/components/AdminOrderModal.vue';
import DeleteModal from '@/components/DeleteModal.vue';

const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data(){
    return {
      orders:[],
      tempOrder:{},
      pagination: {}
    }
  },
  components: {
    Pagination, AdminOrderModal, DeleteModal
  },
  methods: {
    getOrders(page = 1){
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/admin/orders?page=${page}`)
      .then((res)=>{
        // console.log(res.data)
        this.pagination = res.data.pagination
        this.orders = res.data.orders
      })
      .catch((err) => {
        console.log(err)
      })
    },
    editOrder(id){
      this.$http.put(`${VITE_URL}/api/${VITE_PATH}/admin/order/${id}`,{"data":this.tempOrder})
      .then((res)=>{
        console.log(res.data)
        // productModal.hide();
        // alert(res.data.message);
        // this.getOrders()
      })
      .catch((err)=>{
        // console.dir(err)
        alert(err.data.message)
      })
    },
    deleteOrder(id){
      this.$http.delete(`${VITE_URL}/api/${VITE_PATH}/admin/order/${id}`)
      .then((res)=>{
        console.log(res.data)
        this.getOrders()
      })
      .catch((err)=>{
        console.dir(err)
      })
    }
  },

  mounted(){
    this.getOrders(1)
    // modal
    // productModal = new bootstrap.Modal(document.getElementById('productModal'), {
    //   keyboard: false
    // });
  }
}
</script>
