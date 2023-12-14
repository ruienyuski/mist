<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, inject, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
const router = useRouter()
const route = useRoute()
const emitter = inject('emitter')

const orderId = ref('')
onMounted(() => {
    orderId.value = route.params.orderId
})

const nextStep = () => {
    emitter.emit('isLoading', true)
    const api = `/apipath/order/${orderId.value}`
    axios.get(api).then(() => {
        router.push(`/payment/${orderId.value}`)
        emitter.emit('isLoading', false)
      }).catch(() => {
        emitter.emit('webmessage',
          '找不到該筆訂單資料，請重新確認~',
          'danger')
      })
    }

</script>

<template>
    <div class="container container_mb">
      <div class="row justify-content-center">
        <div class="alert alert-info" role="alert">
          輸入「訂單內容」的頁面所複製的訂單編號，可查詢付款狀況
                </div>
        <div class="col-lg-6 col order_width">
          <div class="card order_bg">
            <div class="card-head text-center">訂單查詢</div>
            <div class="card-body mb-3">
                <div>
                    <label for="OrderNumInput"></label>
                    <input
                    type="text"
                    class="form-control"
                    id="OrderNumInput"
                    placeholder="請輸入訂單編號"
                    v-model="orderId">
                </div>
            </div>

            <button
            class="btn cart-footer check_btn_bg border-0 rounded-0"
            type="submit"
            @click="nextStep">
            送出
            </button>

          </div>
        </div>

      </div>
    </div>
</template>
