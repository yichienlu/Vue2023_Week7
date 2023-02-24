import { defineStore } from 'pinia'
import axios from "axios";
const { VITE_URL, VITE_PATH } = import.meta.env;

export default defineStore('adminProductsStore', {
  state: () => ({
    tempProduct:{imagesUrl:['']},
    products:[],
    pagination: {}
  }),
  actions: {
    getAdminProducts(page = 1){
      axios.get(`${VITE_URL}/api/${VITE_PATH}/admin/products?page=${page}`)
      .then((res)=>{
        this.pagination = res.data.pagination
        this.products = res.data.products
      })
    },
    addProduct(tempProduct, modal){
      axios.post(`${VITE_URL}/api/${VITE_PATH}/admin/product`, {"data": tempProduct})
      .then((res)=>{
        // console.log(res.data)
        this.clearInputs()
        modal.hide();
        alert(res.data);
        this.getAdminProducts()
        this.tempProduct = {imagesUrl:['']}
      })
      .catch((err)=>{
        // console.log(err)
        alert(err.response.data.message)
      })
    },
    editProduct(tempProduct, modal){
      axios.put(`${VITE_URL}/api/${VITE_PATH}/admin/product/${tempProduct.id}`,{"data":tempProduct})
      .then((res)=>{
        // console.log(res.data)
        this.clearInputs()
        modal.hide();
        alert(res.data.message);
        this.getAdminProducts()
      })
      .catch((err)=>{
        console.dir(err)
        // alert(err.data.message)
      })
    },
    deleteProduct(id, modal){
      console.log(id)
      axios.delete(`${VITE_URL}/api/${VITE_PATH}/admin/product/${id}`)
      .then((res)=>{
        // console.log(res.data.message)
        modal.hide()
        alert(res.data.message)
        this.getAdminProducts()
      })
      .catch((err)=>{
        console.dir(err)
      })
    },
    uploadImage(){
      const imageUrl = document.querySelector('#imageUrl')
      const file = imageUrl.files[0]
      const formData = new FormData();
      formData.append('file-to-upload', file)

      axios.post(`${VITE_URL}/api/${VITE_PATH}/admin/upload`, formData)
      .then((res)=>{
        this.tempProduct.imageUrl = res.data.imageUrl
      })
      .catch((err)=>{
        console.log(err.response)
      })
    },
    uploadImages(index){
      const imagesUrl = document.querySelectorAll('#imagesUrl')
      const file = imagesUrl[index].files[0]
      const formData = new FormData();
      formData.append('file-to-upload', file)

      axios.post(`${VITE_URL}/api/${VITE_PATH}/admin/upload`, formData)
      .then((res)=>{
        // console.log(res)
        this.tempProduct.imagesUrl[index] = res.data.imageUrl
      })
      .catch((err)=>{
        console.log(err.response)
      })
    },
    clearInputs() {
      document.querySelector('#imageUrl').value = null
      if (Array.isArray(this.tempProduct.imagesUrl)) {
        this.images = [...document.querySelectorAll('#imagesUrl')]
        this.images.forEach(function (item) {
          item.value = null
        })
      }
    },
    selectTempProduct(product){
      this.tempProduct = product
    }
  }
})