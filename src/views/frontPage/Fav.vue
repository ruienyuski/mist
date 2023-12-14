<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { inject, computed, onMounted } from 'vue'
import axios from 'axios'
import { useProductStore } from '../../stores/Products.js'
import { useFavStore } from '../../stores/Fav.js'
import { useCartStore } from '../../stores/Cart.js'
const Productstore = useProductStore()
const Favstore = useFavStore()
const Cartstore = useCartStore()
const emitter = inject('emitter')

onMounted(() => {
  Productstore.getData()
})

const removeFavItem = (id) => {
      let index = Favstore.favorited.findIndex((el) => id === el)
      Favstore.favorited.splice(index, 1)
      localStorage.setItem('favorite', JSON.stringify(Favstore.favorited))
    }
const removeAllFavItem = () => {
      Favstore.favorited = []
      localStorage.setItem('favorite', JSON.stringify(Favstore.favorited))
    }
const addAllFavItem = () => {
      const api = `${import.meta.env.VITE_APP_URL}/cart`

      Favstore.favorited.forEach((id) => {
        const sendData = {
          product_id: id,
          qty: 1,
        }
        axios.post(api, {data:sendData}).then(() => {
          let index = Favstore.favorited.indexOf(id)
          Favstore.favorited.splice(index, 1)
          localStorage.setItem('favorite', JSON.stringify(Favstore.favorited))
          Cartstore.loadingItem = ''
          Productstore.getData()
          emitter.emit("cart_num")
        })
      })
    }

 const favlist = computed(() => {
      return Productstore.products.filter((item) => {
        return Favstore.favorited.indexOf(item.id) > -1
      })
    })

</script>

<template>
    <div class="container container_mb">
      <div class="col text-center" v-if="Favstore.favorited.length === 0">
        <div class="p-3 text-center cart_title">尚未加入最愛</div>
      </div>
      <div class="row row-cols-1 justify-content-between" v-else>
        <div class="col cart_width">
          <div class="text-end my-1">
            <button
              type="button"
              class="btn btn-outline-danger btn-sm mx-1 my-1"
              @click="removeAllFavItem()"
            >
              <i class="far fa-trash-alt"> 刪除所有最愛</i>
            </button>
            <button
              type="button"
              class="btn btn-outline-success btn-sm mx-1 my-1"
              @click="addAllFavItem()"
            >
              全部加入購物車
            </button>
          </div>
            <div class="row row-cols-1 row-cols-md-4 g-2">
                <div class="col"   v-for="item in favlist" :key="item.id">
                    <div class="card">
                        <router-link class="relative"
                            :to="{ name: 'ProductDetail', params: { id: item.id } }"
                            >
                            <span class="product_like" @click.prevent="removeFavItem(item.id)">
                              <i class="material-icons md-32 text-danger">
                                {{ Favstore.favState(item.id) }}
                              </i>
                            </span>
                            <img class="object-fit-cover card-img-top" height="250" :src="item.imageUrl" />
                        </router-link>
                        <div class="card-body">
                            <div class="col-12 align-self-center cart_product_item">
                                <div class="product_title">{{ item.title }}</div>
                                <div>NT$ {{ item.price }} / {{item.unit}}</div>
                            </div>
                        </div>
                        <button
                                class="card-footer card_footer_bg d-flex py-3 px-0 justify-content-between"
                            >
                                <div class="col border-end border-secondary" @click="Cartstore.addToCart(item)">
                                加入購物車
                                <i class="fas fa-spinner fa-spin" v-if="Cartstore.loadingItem == item.id"></i>
                                </div>
                                <div class="col">
                                <router-link
                                :to="{name:'ProductDetail',
                                params:{id:item.id}}">
                                查看更多
                                </router-link>
                                </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>