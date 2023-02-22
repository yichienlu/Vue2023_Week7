<template>
<div id="adminProductModal" ref="adminProductModal" class="modal fade" tabindex="-1">
  <div class="modal-dialog modal-xl">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 id="productModalLabel" class="modal-title">
          <span v-if="tempProduct.id">編輯產品</span>
          <span v-else>新增產品</span>
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
              <div class="mb-2">
                <div class="mb-3">
                  <h5>主要圖片</h5>
                  <form enctype="multipart/form-data"  method="post">
                    <input type="file" name="file-to-upload" id="imageUrl"  placeholder="請選擇圖片" @change="$emit('upload-image')" class="form-control">
                    <!-- <input type="submit" value="上傳"> -->
                  </form>  
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
              </div>
              <div class="mb-2">
                <h5>次要圖片</h5>
                  <div v-for="(image, index) in tempProduct.imagesUrl" :key="index">
                    <div class="mb-3">
                        <!-- <label for="imageUrl" class="form-label">輸入次要圖片網址</label>
                        <input type="text" class="form-control" placeholder="請輸入圖片連結" v-model="tempProduct.imagesUrl[index]" id=`imageUrl-${index}`> -->
                        <form enctype="multipart/form-data"  method="post">
                          <input type="file" name="file-to-upload" id="imagesUrl"  placeholder="請選擇圖片" @change="$emit('upload-images', index)" class="form-control">
                          <!-- <input type="submit" value="上傳"> -->
                        </form>  
                    </div>
                    <img class="img-fluid" :src="image" alt="">
                  </div>
              </div>

              <template v-if="tempProduct.imagesUrl[tempProduct.imagesUrl.length-1]">
                <button class="btn btn-outline-danger btn-sm d-block w-100" @click="tempProduct.imagesUrl.length > 1 ? tempProduct.imagesUrl.pop() : tempProduct.imagesUrl[0]=''">
                  刪除圖片
                </button>
              </template>
              <div v-if="tempProduct.imagesUrl[tempProduct.imagesUrl.length-1] != ''">
                <button class="btn btn-outline-primary btn-sm d-block w-100" @click="tempProduct.imagesUrl.push('')">
                  新增次要圖片
                </button>
              </div>
          </div>
          <div class="col-sm-8">
            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="title" class="form-label">標題</label>
                <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="tempProduct.title">
              </div>
              <div class="mb-3 col-md-6">
                <label for="category" class="form-label">分類</label>
                <input id="category" type="text" class="form-control" placeholder="請輸入分類" v-model="tempProduct.category">
              </div>
            </div>

            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="num" class="form-label">數量</label>
                <input id="num" type="number" class="form-control" placeholder="請輸入數量" v-model="tempProduct.num">
              </div>
              <div class="mb-3 col-md-6">
                <label for="price" class="form-label">單位</label>
                <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="tempProduct.unit">
              </div>
            </div>

            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="origin_price" class="form-label">原價</label>
                <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價" v-model="tempProduct.origin_price">
              </div>
              <div class="mb-3 col-md-6">
                <label for="price" class="form-label">售價</label>
                <input id="price" type="number" min="0" class="form-control"
                        placeholder="請輸入售價" v-model="tempProduct.price">
              </div>
            </div>
            <hr>

            <div class="mb-3">
              <label for="description" class="form-label">產品描述</label>
              <textarea id="description" type="text" class="form-control"
                        placeholder="請輸入產品描述" v-model="tempProduct.description">
              </textarea>
            </div>
            <div class="mb-3">
              <label for="content" class="form-label">說明內容</label>
              <textarea id="description" type="text" class="form-control"
                        placeholder="請輸入說明內容" v-model="tempProduct.content">
              </textarea>
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input id="is_enabled" class="form-check-input" type="checkbox"
                        :true-value="1" :false-value="0" v-model="tempProduct.is_enabled">
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
          取消
        </button>
        <button type="button" class="btn btn-primary" v-if="tempProduct.id" @click="editProduct(tempProduct.id)">
          確認編輯
        </button>
        <button type="button" class="btn btn-primary" v-else @click="addProduct">
          確認新增
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {Modal} from 'bootstrap'

export default {
  data(){
    return {
      adminProductModal: {},
      tempProduct:{},

    }
  },
  props:[],
  methods:{

  },
  mounted(){
    this.adminProductModal = new Modal(this.$refs.adminProductModal)
    console.log(this.adminProductModal)
  }
}

</script>