<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import CartNum from './CartNum.vue'
import { useToken } from '../../mixin/useToken.js'
const { checkSuccess } = useToken()

</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-white py-4">
      <button
        class="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="material-icons">dehaze</i>
      </button>
      <router-link class="navbar-brand Logo" to="/"></router-link>
      <router-link class="mobile ipad" to="/cart">
        <button class="btn btn-sm btn-cart">
          <i class="material-icons mobile ipad">shopping_cart</i>
          <CartNum></CartNum>
        </button>
      </router-link>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto menu">
          <li class="nav-item">
            <router-link class="nav-link" to="/">首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products">商品</router-link>
          </li>
          <li class="nav-item desktop">
            <router-link class="nav-link" to="/favlist">收藏清單</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/checkpayment">訂單查詢</router-link>
          </li>
          <li class="nav-item desktop">
            <router-link class="nav-link" to="/admin" v-if="checkSuccess">後台</router-link>
            <router-link class="nav-link" to="/login" v-else>後台登入</router-link>
          </li>
        </ul>
      </div>
      <router-link class="desktop mt-4" to="/cart">
        <button class="btn btn-sm btn-cart">
          <i class="material-icons">shopping_cart</i>
          <CartNum></CartNum>
        </button>
      </router-link>
    </nav>
  </header>
</template>

<style scoped>
.btn-cart {
  background-color: transparent;
  position: relative;
}
</style>
