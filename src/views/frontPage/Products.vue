<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '../../stores/Products.js'
import { useCartStore } from '../../stores/Cart.js'
import { useFavStore } from '../../stores/Fav.js'

const Productstore = useProductStore()
const Cartstore = useCartStore()
const Favstore = useFavStore()
const currentpage = ref(0)
const visibility = ref('all')

onMounted(() => {
  Productstore.getData()
  Cartstore.getCart()
})

const filterData = computed(() => {
      const newData = []
      let items = []
      items = Productstore.products
      const categoryItem = []
      items.forEach((item) => {
        if (visibility.value === item.category) {
          currentpage.value = 0
          categoryItem.push(item)
        } else if (visibility.value === 'all') {
          categoryItem.push(item)
        }
      })
      categoryItem.forEach((item, i) => {
        if (i % 6 === 0) {
          newData.push([])
        }
        // eslint-disable-next-line
        const pagenum = parseInt(i / 6)
        newData[pagenum].push(item)
      })
      return newData
    })

const filterCategory = computed(() => {
      const list = []
      let items = []
      items = Productstore.products
      // eslint-disable-next-line
      items.filter((item, i) => {
        if (item.is_enabled === false) { return }
        list.push(item.category)
      })
      // eslint-disable-next-line
      let category = list.filter((item, i, arr) => {
        return arr.indexOf(item) === i
      }) // filter category norepeat
      return category
    })

</script>

<template>
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-12 col-12 mb-3">
          <ul class="list-group product_list">
            <li class="list-group-item list-style active">商品類別</li>
            <li class="list-group-item list-style" :class="{select:visibility == 'all'}">
              <a href="#" @click.prevent="visibility = 'all'" style="display:block;">全部商品</a>
            </li>
            <li
              class="list-group-item list-style"
              v-for="(item,key) in filterCategory"
              :key="key"
              :class="{select:visibility == item}"
            >
              <a href="#" @click.prevent="visibility = item" style="display:block;">{{item}}</a>
            </li>
          </ul>
        </div>
        <div class="col-lg-9 col-md-12 mb-5">
          <div class="row product mb-4">
            <div
              class="col-lg-4 col-md-6 col-12 mb-3"
              v-for="(item,key) in filterData[currentpage]"
              :key="key"
            >
              <div class="product_sale_item">
                <div class="card card_size">
                  <div class="relative">
                    <span class="product_like" @click.prevent="Favstore.setFav(item.id)">
                      <i class="material-icons md-32 text-danger">
                        {{ Favstore.favState(item.id) }}
                      </i>
                    </span>
                  </div>
                  <router-link :to="{name:'ProductDetail',params:{id:item.id}}">
                    <div
                      class="bg-cover product_card_img"
                      :style="`background-image: url(${item.imageUrl})`"
                    ></div>
                  </router-link>
                  <div class="card-body p-0">
                    <div class="row product_card_product_txt">
                      <div
                        class="col-lg-7 p-3 align-self-center product_product_border text-center"
                      >
                        <router-link
                        :to="{name:'ProductDetail',
                        params:{id:item.id}}">
                        {{item.title}}
                        </router-link>
                      </div>
                      <div class="col-lg-5 text_bold p-3 text-center">
                        <router-link :to="{name:'ProductDetail',params:{id:item.id}}">
                          <span
                            style="text-decoration:line-through; font-size:0.8rem;"
                          >原價:{{item.origin_price}}</span>
                          <br>
                          <span class="text-danger">特價{{item.price}}</span>
                        </router-link>
                      </div>
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
          <nav aria-label="Page navigation">
            <ul class="pagination justify-content-end pagination-lg product_page">
              <li class="page-item">
                <a class="page-link" href="#" @click.prevent="currentpage = 0" tabindex="-1">
                  <i class="material-icons">arrow_left</i>
                </a>
              </li>

              <li
                class="page-item"
                v-for="page in filterData.length"
                :key="page"
                :class="{'active': currentpage === page - 1}"
              >
                <a class="page-link" @click.prevent="currentpage = page - 1" href="#">{{page}}</a>
              </li>

              <li class="page-item">
                <a
                  class="page-link"
                  href="#"
                  @click.prevent="currentpage = (filterData.length % 6) - 1"
                >
                  <i class="material-icons">arrow_right</i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
</template>
