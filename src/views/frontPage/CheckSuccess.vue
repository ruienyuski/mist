<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
    <div class="container p-0 container_mb">
      <div class="header bg-cover header2_mobile header2 d-flex flex-column align-items-center justify-content-center" style="background-image:url(https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2c5a2cf31c693f5c15fb08135bf1adf2&auto=format&fit=crop&w=800&q=60)">

          <div class="text-center">
              <img
              src="@/assets/static/images/logo_img/lg-payok.svg"
              alt=""
              class="img-fluid w-100">
          </div>
          <button
          class="success_btn_bg mt-5 p-3 border-0 radius-0"
          type="button"
          @click="() => router.push('/')">
            回到首頁
          </button>

      </div>
    </div>
</template>
