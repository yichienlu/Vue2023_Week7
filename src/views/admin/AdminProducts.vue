<template>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#productModal" @click="tempProduct={};tempProduct.imagesUrl=['']">
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
              <button type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#productModal" @click="tempProduct = JSON.parse(JSON.stringify(product))">
                編輯
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#delProductModal" @click="tempProduct=product">
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <pagination :pages="pagination"  @change-page="getAdminProducts"></pagination> -->
  </div>
</template>

<script>
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data(){
    return {
      products:[],
      tempProduct:{
        imagesUrl:['']
      },
      pagination: {}
    }
  },
  methods: {
    getAdminProducts(page = 1){
      this.$http.get(`${VITE_URL}/api/${VITE_PATH}/admin/products?page=${page}`)
      .then((res)=>{
        console.log(res.data)
        // this.pagination = res.data.pagination
        this.products = res.data.products
      })
    },
    addProduct(){
      this.$http.post(`${VITE_URL}/api/${VITE_PATH}/admin/product`, {"data":this.tempProduct})
      .then((res)=>{
        console.log(res.data)
        // productModal.hide();
        // alert(res.data.message);
        this.getAdminProducts()
        
      })
      .catch((err)=>{
        // console.dir(err.data.message)
        alert(err.data.message)
      })
    },
    editProduct(id){
      this.$http.put(`${VITE_URL}/api/${VITE_PATH}/admin/product/${id}`,{"data":this.tempProduct})
      .then((res)=>{
        console.log(res.data)
        // productModal.hide();
        // alert(res.data.message);
        this.getAdminProducts()
      })
      .catch((err)=>{
        // console.dir(err)
        alert(err.data.message)
      })
    },
    deleteProduct(id){
      this.$http.delete(`${VITE_URL}/api/${VITE_PATH}/admin/product/${id}`)
      .then((res)=>{
        // console.log(res.data)
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

      this.$http.post(`${VITE_URL}/api/${VITE_PATH}/admin/upload`, formData)
      .then((res)=>{
        // console.log(res)
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

      this.$http.post(`${VITE_URL}/api/${VITE_PATH}/admin/upload`, formData)
      .then((res)=>{
        // console.log(res)
        this.tempProduct.imagesUrl[index] = res.data.imageUrl
      })
      .catch((err)=>{
        console.log(err.response)
      })
    }
  },
  components:{
    // pagination
  },

  mounted(){
    this.getAdminProducts(1)
    // modal
    // productModal = new bootstrap.Modal(document.getElementById('productModal'), {
    //   keyboard: false
    // });

  }
}
</script>
