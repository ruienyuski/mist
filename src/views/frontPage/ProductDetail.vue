<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <section>
      <div class="container">
        <nav aria-label="breadcrumb" role="navigation">
          <ol class="breadcrumb bg-transparent pl-0">
            <li class="breadcrumb-item">
              <router-link to="/">Home</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/products">全部商品</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">{{product.title}}</li>
          </ol>
        </nav>
        <div class="row">
          <div class="col-md-4 mb-4">
            <div>
              <h1 class="h2">{{product.title}}</h1>
              <div class="row justify-content-end align-items-end">
                <span class="text-muted col-lg-4 col-md-12 col-12">
                  <del>售價 ${{product.origin_price}}</del>
                </span>
                <div class="h4 ml-auto mb-0 text-danger col-lg-8 col-md-12 col-12">
                  <small>特價</small>
                  <strong>NT${{product.price}}</strong>
                </div>
              </div>
              <hr>購買數量:
              <div class="input-group my-3">
                <select v-model="product.num" class="form-control mr-1">
                  <option :value="num"
                  v-for="num in 10"
                  :key="num">
                  選購{{num}}{{product.unit}}
                  </option>
                </select>
                <button
                  class="btn btn-primary"
                  type="button"
                  @click="addtoCart(product,product.num)"
                >
                  加到購物車
                  <i class="fas fa-spinner fa-spin" v-if="status.loadingItem == product.id"></i>
                </button>
              </div>
            </div>
          </div>

          <div class="col-md-8">
            <div class="relative">
              <span class="product_like" @click.prevent="setFav(product.id)">
                <i class="material-icons md-32 text-danger">
                  {{ favState(product.id) }}
                </i>
              </span>
            </div>
            <div
              class="bg-cover product_card_img w-100 mb-5"
              :style="`background-image: url(${product.imageUrl})`"
            ></div>        
            <!-- <img class="img-fluid w-100 mb-5" :src="product.imageUrl"> -->
            <h3>{{product.description}}</h3>
            <p class="product_Text">{{product.content}}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// eslint-disable-next-line
import $ from 'jquery';
export default {
  name: 'ProductDetail',
  data() {
    return {
      id: '',
      cart: {},
      product: {},
      status: {
        loadingItem: '',
      },
      isLoading: false,
      favorited: JSON.parse(localStorage.getItem('favorite')) || [],
    };
  },
  methods: {
    getItem(id) {
      this.isLoading = true;
      // eslint-disable-next-line
      id = this.$route.params.id;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/product/${id}`;
      this.$http.get(api).then((response) => {
        this.product = response.data.data;
        this.product.num = 1;
        this.isLoading = false;
      });
    },
    addtoCart(item, quantity = 1) {
      this.status.loadingItem = item.id;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      const sendData = {
        product: item.id,
        quantity,
      };
      this.$http.post(api, sendData).then((response) => {
        console.log(response);
        this.status.loadingItem = '';
        this.$bus.$emit('cart_num');
        this.getItem();
      }).catch(() => {
        this.$bus.$emit('webmessage',
          '此產品已經有加入購物車',
          'warning');        
      });
    },
    setFav(id) {
      const vm = this;
      let index = vm.favorited.findIndex((el) => {
        return id === el
      });
      if(vm.favorited.indexOf(id) < 0) {
        vm.favorited.push(id);
      } else {
        console.log(vm.favorited)
        vm.favorited.splice(index, 1);
      };
      localStorage.setItem('favorite', JSON.stringify(vm.favorited));
    }    
  },
  computed: {
    favState() {
      return function(id) {
        const vm = this;
        if(vm.favorited.indexOf(id) > -1) {
          return 'favorite'
        } else {
          return 'favorite_border'
        }  
      }
    },    
  },
  created() {
    this.getItem();
  },
};
</script>
