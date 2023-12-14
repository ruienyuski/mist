<!-- eslint-disable vue/multi-word-component-names -->
<script setup>

  import { useRouter } from "vue-router";
  import axios from 'axios'

  const router = useRouter();

  const signout = ()  => {
    const api = `${import.meta.env.VITE_APIPATH}/v2/logout`
    axios.post(api).then(() =>{
      router.push('/login')
    })
    }

</script>

<template>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <router-link class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" to="/">回到網站前台</router-link>
      <button
        class="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click="signout()">登出</a>
        </li>
      </ul>
    </nav>
</template>
