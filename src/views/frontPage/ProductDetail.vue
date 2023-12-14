<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useCartStore } from '../../stores/Cart.js'
import { useFavStore } from '../../stores/Fav.js'


const Cartstore = useCartStore()
const Favstore = useFavStore()
const route = useRoute()

const id = ref('')
const product = ref({})


onMounted(() => {
  getItem()
})

const getItem = () => {
      // eslint-disable-next-line
      id.value = route.params.id
      const api = `/apipath/product/${id.value}`
      axios.get(api).then((res) => {
        product.value = res.data.product
      })
    }

</script>

<template>
    <section>
      <div class="container">
        <nav aria-label="breadcrumb" role="navigation">
          <ol class="breadcrumb bg-transparent ps-0">
            <li class="breadcrumb-item">
              <router-link to="/">Home</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/products">全部商品</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">{{product.title}}</li>
          </ol>
        </nav>
        <div class="row justify-content-between">
          <div class="col-md-5 mb-4">
            <div>
              <h1 class="h2">{{product.title}}</h1>
              <div class="row justify-content-end align-items-end">
                <span class="text-muted col-lg-4 col-md-12 col-12">
                  <del>售價 ${{product.origin_price}}</del>
                </span>
                <div class="h4 ms-auto mb-0 text-danger col-lg-8 col-md-12 col-12">
                  <small>特價</small>
                  <strong>NT${{product.price}}</strong>
                </div>
              </div>
              <hr>購買數量:
              <div class="input-group my-3">
                <select v-model="product.num" class="form-select">
                  <option :value="num"
                  v-for="num in 10"
                  :key="num">
                  選購{{num}}{{product.unit}}
                  </option>
                </select>
                <button
                  class="btn btn-primary"
                  type="button"
                  @click="Cartstore.addToCart(product,product.num)"
                >
                  加到購物車
                  <i class="fas fa-spinner fa-spin" v-if="Cartstore.loadingItem == product.id"></i>
                </button>
              </div>
            </div>
          </div>

          <div class="col-md-7">
            <div class="relative">
              <span class="product_like" @click.prevent="Favstore.setFav(product.id)">
                <i class="material-icons md-32 text-danger">
                  {{ Favstore.favState(product.id) }}
                </i>
              </span>
            </div>
            <div
              class="bg-cover product_card_img mb-5"
              :style="`background-image: url(${product.imageUrl})`"
            ></div>
            <h3>{{product.description}}</h3>
            <p class="product_Text">{{product.content}}</p>
          </div>
        </div>
      </div>
    </section>
</template>
