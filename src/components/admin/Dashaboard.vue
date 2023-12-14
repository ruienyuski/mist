<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import Navbar from './Navbar.vue'
import Sidebar from './Sidebar.vue'
import { useToken } from '../../mixin/useToken.js'

useToken()

</script>

<template>
  <div>
    <Navbar/>
    <div class="container-fluid">
      <div class="row">
        <Sidebar/>
        <main role="main" class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <router-view/>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
