<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Header from './Header.vue'
import Footer from './Footer.vue'
</script>

<template>
  <div class="flexcontent">
    <div class="container sticky-top">
      <Header></Header>
    </div>
    <div class="content__footer">
      <router-view>
      </router-view>
      <Footer></Footer>
    </div>
  </div>
</template>
