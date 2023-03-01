<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <router-link to="/"  class="navbar-brand">PET PET</router-link>
        <button class="navbar-toggler ms-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarMenu">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item" @click="this.navbarToggle.hide()">
              <router-link to="/about" class="nav-link" >About</router-link>
            </li>
            <li class="nav-item" @click="this.navbarToggle.hide()">
              <router-link to="/products" class="nav-link">產品列表</router-link>
            </li>
            <li class="nav-item" @click="this.navbarToggle.hide()">
              <router-link to="/cart" class="nav-link">
                購物車
                <small class="badge rounded-pill bg-danger">{{ cart.length }}</small>
              </router-link>
            </li>
            <li class="nav-item" @click="this.navbarToggle.hide()">
              <router-link to="/articles" class="nav-link">文章列表</router-link>
            </li>
            <li class="nav-item" @click="this.navbarToggle.hide()">
              <router-link to="/login" class="nav-link">登入</router-link>
            </li>
            <li class="nav-item" @click="this.navbarToggle.hide()">
              <router-link to="/admin/products" class="nav-link">去後台</router-link>
            </li>
            <li class="nav-item" @click="this.navbarToggle.hide()">
              <router-link to="/gift" class="nav-link">點此領取神秘禮品</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <router-view></router-view>
    <!-- <footer class="text-center bg-primary py-3">
      2023 All rights reserved.
    </footer> -->
  </div>
</template>

<script>
import { RouterView, RouterLink } from 'vue-router'
import { mapState, mapActions } from 'pinia'
import cartStore  from '../stores/cartStore.js'
import { Collapse } from 'bootstrap'

export default {
  data(){
    return {
      navbarToggle: null
    }
  },
  components: {
    RouterView,
    RouterLink
  },
  computed: {
    ...mapState(cartStore, ['cart'])
  },
  methods: {
    ...mapActions(cartStore, ['getCarts'])
  },
  mounted(){
    this.navbarToggle = new Collapse('#navbarMenu',{
      toggle: false
    })
    this.getCarts()
  }
}
</script>
