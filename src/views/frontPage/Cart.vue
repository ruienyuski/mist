<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import {
  Field as VField, Form as VForm, ErrorMessage, defineRule, configure,
} from 'vee-validate'
import * as AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import { useCartStore } from '../../stores/Cart.js'
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
})
setLocale('zh_TW')
const Cartstore = useCartStore()
const emitter = inject('emitter')
const router = useRouter()
const form = ref({
  user: {},
  message: '',
})
const coupon_code = ref('')
const coupon = ref(0)
const coupon_now = ref('666')


onMounted(() => {
  Cartstore.getCart()
})

const removeCartItem = (id) => {
  emitter.emit('isLoading', true)
  const api = `/apipath/cart/${id}`
  axios.delete(api).then(() => {
    Cartstore.getCart()
    emitter.emit('cart_num')
    emitter.emit('isLoading', false)
  })
}

const quantityUpdata = (item, quantity) => {
  emitter.emit('isLoading', true)
  if (quantity < 0) {
    return
  }
  const api = `/apipath/cart/${item.id}`
  const cart = {
    product_id: item.product_id,
    qty: quantity
  }
  axios.put(api, { data: cart }).then(() => {
    Cartstore.getCart()
    emitter.emit('isLoading', false)
  })
}
const removeAllCartItem = () => {
  emitter.emit('isLoading', true)
  const api = `/apipath/carts`
  axios.delete(api).then(() => {
    Cartstore.getCart()
    emitter.emit('cart_num')
    emitter.emit('isLoading', false)
    emitter.emit('webmessage', '已清空購物車', 'success')
  })
}

const createOrder = (value) => {
  form.value.user = {
    name: value['姓名'],
    email: value.email,
    tel: value['電話'],
    address: value['收件地址'],
  }
  const order = {
    data:form.value
  }
  emitter.emit('isLoading', true)
      const api = `/apipath/order`
      axios.post(api, order).then((res) => {
        if(res.data.success) {
          emitter.emit('cart_num')
          Cartstore.getCart()
          router.push(`/payment/${res.data.orderId}`)
          emitter.emit('isLoading', false)
        }
      })
}
const addCouponCode = () => {
  const api = `/apipath/coupon`
  emitter.emit('isLoading', true)
  axios.post(api, { data: {code: coupon_code.value} }).then((res) => {
    coupon.value = res.data
    emitter.emit('isLoading', false)
  }).catch((err) => {
    emitter.emit('webmessage', err.response.data.message, 'warning')
  })
  Cartstore.getCart()
}

const onCopy = () => {
      emitter.emit('webmessage',
          '已複製完成',
          'success')
    }
</script>

<template>
  <div>
    <div class="container container_mb">
      <div class="col-lg-12 text-center" v-if="Cartstore.cart.length === 0">
        <div class="p-3 text-center cart_title">購物車為空</div>
      </div>
      <div class="row justify-content-between" v-else>
        <div class="col-lg-8 col-12 cart_width">
          <div class="p-3 text-center cart_title">您的購物車</div>
          <div class="text-end my-3">
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="removeAllCartItem()"
            >
              <i class="far fa-trash-alt"> 刪除所有品項</i>
            </button>
          </div>
          <div class="card mb-3" v-for="item in Cartstore.cart" :key="item.id" >
            <div class="row justify-content-between g-0">
              <div class="col-md-4">
                <router-link
                  :to="{ name: 'ProductDetail', params: { id: item.product.id } }"
                >
                <img class="object-fit-cover card-img-top" height="250" :src="item.product.imageUrl" />
                </router-link>
              </div>
              <div class="col-md-8 align-self-center">
                <div class="card-body row ">
                  <div class="col-6 row justify-content-center">
                    <div class="col align-self-center cart_product_item">
                      <div class="product_title">{{ item.product.title }}</div>
                      <div>NT$ {{ item.product.price }} / {{ item.product.unit }}</div>
                      <div class="text-success" v-if="item?.coupon?.title">已套用優惠卷</div>
                    </div>
                  </div>
                  <div class="col-6 row align-self-center">
                    <select
                      class="form-select col"
                      aria-label="Default select example"
                      v-model="item.qty"
                      @change="quantityUpdata(item, $event.target.value * 1)"
                    >
                      <option v-for="i in 20" :key="i" :value="i">{{ i }}</option>
                    </select>
                  <a
                    href="#"
                    class="col-lg-1 col-md-1 col-2 align-self-center"
                    @click.prevent="removeCartItem(item.id)"
                  >
                    <i class="material-icons cart_delete_icon">delete_outline</i>
                  </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-12 order_width">
          <div class="card text-center order_bg">
            <div class="card-head">訂單摘要</div>
            <div class="card-body">
                <div class="text-warning text-start lh-1">
                  <div class="alert alert-warning text-dark">可用優惠卷：{{ coupon_now }}

                        <button type="button" class=" ms-2 btn btn-danger "
                        v-clipboard:copy="coupon_now"
                        v-clipboard:success="onCopy"
                        >
                          複製
                        </button>
                  </div>
                </div>
              <div class="mt-3 mx-0 row justify-content-center">
                <div class="input-group mb-3 col-lg-12 col-10 px-0" v-if="Cartstore.cartTotal !== 0">
                  <input
                    type="text"
                    class="form-control"
                    v-model="coupon_code"
                    placeholder="請輸入優惠碼"
                    aria-label="cost_number"
                    aria-describedby="button-addon2"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-secondary"
                      type="button"
                      id="button-addon"
                      @click="addCouponCode"
                    >
                      套用優惠碼
                    </button>
                  </div>
                </div>
              </div>
              <table class="table table-borderless lh-lg">
                <tr>
                  <td class="text-start">小計</td>
                  <td class="text-end">NT$ {{ Cartstore.cartTotal }}</td>
                </tr>
                <tr
                  class="order_total order_sale my-2"
                  v-if="Cartstore.cartFinalTotal === Cartstore.cartTotal"
                >
                  <td class="text-start">總計</td>
                  <td class="text-end">NT$ {{ Cartstore.cartTotal }}</td>
                </tr>
                <tr
                  class="order_total order_sale my-2"
                  v-else
                >
                  <td class="text-start">優惠價</td>
                  <td class="text-end">NT$ {{ Cartstore.cartFinalTotal }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="my-5 row justify-content-center" v-if="Cartstore.cart.length !== 0">
      <VForm @submit="createOrder" v-slot="{ meta }" class="col-md-6 col-10">
      <div class="mb-3">
        <label for="username" class="form-label">收件人姓名</label>
        <VField type="text" name="姓名" rules="required" class="form-control"  id="username" />
        <ErrorMessage class="text-danger" name="姓名"/>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">E-mail</label>
        <VField type="email" name="email" rules="required|email" class="form-control"  id="email" />
        <ErrorMessage class="text-danger" name="email"/>
      </div>
      <div class="mb-3">
        <label for="tel" class="form-label">電話</label>
        <VField type="tel" name="電話" :rules="{ numeric: true, min:8, required:true }" class="form-control" id="tel" />
        <ErrorMessage class="text-danger" name="電話"/>
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">地址</label>
        <VField type="text" name="收件地址" rules="required" class="form-control"  id="address" />
        <ErrorMessage class="text-danger" name="收件地址"/>
      </div>
      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea class="form-control" id="message" rows="3" v-model="form.message"></textarea>
      </div>
      <div class="text-end">
      <button type="submit" class="btn btn-primary" :disabled="!meta.valid">送出訂單</button>
      </div>
    </VForm>
    </div>

  </div>
</template>
