<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
const emitter = inject('emitter')

const user = ref({
  username: '',
  password: ''
})
const router = useRouter()
const signin =  () => {
  const api = `${import.meta.env.VITE_APIPATH}/v2/admin/signin`

  axios
    .post(api, user.value)
    .then((res) => {
      const {token, expired} = res.data
      document.cookie = `hexToken=${token};expires=${new Date(expired)};`
      emitter.emit("webmessage",res.data.message, 'success')
      router.push({ path: '/admin' })
    })
    .catch((err) => {
      emitter.emit("webmessage",err.response.data.message, 'danger')
      router.push({ path: '/login' })
    })
}
</script>
<template>
  <div>
    <div class="container">
      <div class="row justify-content-center mb-5">
        <div class="col-lg-5 login_width">
          <form @submit.prevent="signin">
            <div class="card text-center login_bg">
              <div class="card-body">
                <h5 class="card-title">後台登入</h5>
                <div class="row justify-content-center ">
                  <div class="col-10 mb-0">
                    <div class="relative input_icon ">
                      <label for="email"></label>
                      <input
                        type="email"
                        class="form-control form-control-lg"
                        id="email"
                        v-model="user.username"
                        placeholder="請輸入email"
                        required
                      />
                      <i class="material-icons">person</i>
                    </div>
                  </div>
                  <div class="col-10 mb-0">
                    <div class="relative input_icon ">
                      <label for="password"></label>
                      <input
                        type="password"
                        class="form-control form-control-lg"
                        id="password"
                        v-model="user.password"
                        placeholder="請輸入密碼"
                        required
                      />
                      <i class="material-icons">vpn_key</i>
                    </div>
                  </div>
                </div>
              </div>

              <button class="btn card-footer login_btn_bg border-0 rounded-0" type="submit">
                登入帳號
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>