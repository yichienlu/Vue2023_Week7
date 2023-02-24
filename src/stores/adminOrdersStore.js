import { defineStore } from 'pinia'
import axios from "axios";
const { VITE_URL, VITE_PATH } = import.meta.env;

export default defineStore('adminOrdersStore',{
  state: () => ({
    tempOrder: {},
    orders: [],
    pagination: {}
  }),
  actions: {
    getAdminOrders(page = 1){
      axios.get(`${VITE_URL}/api/${VITE_PATH}/admin/orders?page=${page}`)
      .then((res)=>{
        // console.log(res.data)
        this.pagination = res.data.pagination
        this.orders = res.data.orders
      })
      .catch((err) => {
        console.log(err)
      })
    },
    editOrder(tempOrder, modal = null){
      axios.put(`${VITE_URL}/api/${VITE_PATH}/admin/order/${tempOrder.id}`,{"data": tempOrder})
      .then((res)=>{
        console.log(res.data)
        if(modal){
          modal.hide();
        }
        // console.log(modal)
        // alert(res.data.message);
        this.getAdminOrders()
      })
      .catch((err)=>{
        console.dir(err)
        // alert(err.data.message)
      })
    },
    deleteOrder(id){
      axios.delete(`${VITE_URL}/api/${VITE_PATH}/admin/order/${id}`)
      .then((res)=>{
        console.log(res.data)
        this.getAdminOrders()
      })
      .catch((err)=>{
        console.dir(err)
      })
    },
    selectTempOrder(order){
      this.tempOrder = order
    }
  }
})
