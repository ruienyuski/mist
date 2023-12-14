<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, inject, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const route = useRoute()
const emitter = inject('emitter')
const order = ref({
  user: {},
  products: [],
  total:0,
  message:'',
  is_paid:false,
  id:''
})
const has_coupon = ref(false)
const coupon_title = ref('')
const coupon_percent = ref(0)
const orderId = ref('')
      onMounted(() => {
        orderId.value = route.params.orderId
        getOrder()
      })
     const getOrder = () => {
      emitter.emit('isLoading', true)
      const api = `/apipath/order/${orderId.value}`
      axios.get(api).then((res) => {
        const coupondata = Object.values(res?.data?.order?.products)[0].coupon
        if(!coupondata) {
          has_coupon.value = false
          coupon_title.value = ''
          coupon_percent.value = 0
        } else {
          has_coupon.value = true
          coupon_title.value = coupondata?.title
          coupon_percent.value = coupondata?.percent
        }
        order.value = res.data.order
        emitter.emit('isLoading', false)
      })
    }

    const payOrder = () => {
      const api = `/apipath/pay/${orderId.value}`
      emitter.emit('isLoading', true)
      axios.post(api).then(() => {
        getOrder()
        router.push('/checksuccess')
        emitter.emit('isLoading', false)
      }).catch(() => {
        emitter.emit('webmessage',
          '付款確認失敗',
          'danger')
      })
    }

    const onCopy = () => {
      emitter.emit('webmessage',
          '已複製完成',
          'success')
    }
</script>

<template>
    <div class="container container_mb">
      <div v-if="!order" >
        <div class="alert alert-warning" role="alert">
          <h2 class="text-center">找不到訂單</h2>
          <div class="text-center my-2">
            <router-link  to="/checkpayment" style="font-size:1.2rem">回訂單查詢</router-link>
          </div>
        </div>
      </div>
      <form @submit.prevent = "payOrder" v-else>
        <div class=" row justify-content-center">
          <div class="check_order_width col-md-8 ">
            <div class=" p-3 text-center check_list_title">訂單內容</div>
            <div class=" my-3 p-3">
              <table class="table text-dark align-middle">
                <thead>
                  <tr>
                    <th>品名</th>
                    <th>數量</th>
                    <th class="text-end">單價</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in order.products" :key="item.id" >
                    <td>{{ item.product.title }}</td>
                    <td>{{ item.qty }}/{{ item.product.unit }}</td>
                    <td class="text-end">{{ item.product.price }} </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr class="check_order_total"  v-if="has_coupon">
                    <td class="text-danger fs-6 lh-lg" >
                      優惠卷名稱: {{ coupon_title }}
                      <p>折扣：{{coupon_percent}} %</p>
                    </td>
                    <td class="text-end" >總計</td>
                    <td class="text-end">{{ order.total }} 元</td>
                  </tr>
                  <tr class="check_order_total" v-else>
                    <td colspan="2" class="text-end" >總計</td>
                    <td class="text-end">{{ order.total }} 元</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div class="check_order_width col-md-8 ">
            <div class=" p-3 text-center check_list_title">付款內容</div>
            <div class=" my-3 p-3">
                <table class="table text-dark ">
                  <tbody>
                    <tr>
                      <th>Email</th>
                      <td>{{ order.user.email }}</td>
                    </tr>
                    <tr>
                      <th>姓名</th>
                      <td>{{ order.user.name }}</td>
                    </tr>
                    <tr>
                      <th>收件人電話</th>
                      <td>{{ order.user.tel }}</td>
                    </tr>
                    <tr>
                      <th>收件人地址</th>
                      <td>{{ order.user.address }}</td>
                    </tr>
                    <tr>
                      <th>訂單編號

                      </th>
                      <td >
                        <p class="text-danger lh-1">{{ orderId }}
                        <button type="button" class="btn btn-info "
                        v-clipboard:copy="orderId"
                        v-clipboard:success="onCopy"
                        >
                          複製
                        </button></p>
                        <p class="text-secondary lh-1 fs-6 ">
                          (若要查詢訂單付款狀況，請複製訂單編號)</p>
                        </td>
                    </tr>
                    <tr>
                      <th>付款狀態</th>
                      <td>
                        <span v-if="!order.is_paid" class="text-danger">尚未付款</span>
                        <span v-else class="text-success fw-bold fs-6">付款完成</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
            </div>

          <div class="text-center col" v-if="order.is_paid === false">
            <button class="btn btn-danger mb-3">確認付款去</button>
          </div>
          </div>

        </div>

      </form>
    </div>
</template>
