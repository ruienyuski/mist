<template>
  <div>
    <loading :active.sync="isLoading" :zIndex="999"></loading>
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
                    <span class="product_like" @click.prevent="setFav(item.id)">
                      <i class="material-icons md-32 text-danger">
                        {{ favState(item.id) }}
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
                    class="btn card-footer card_footer_bg d-flex py-3 px-0 justify-content-between"
                  >
                    <div class="col-lg col-6" @click="addToCart(item)">
                      加入購物車
                      <i class="fas fa-spinner fa-spin" v-if="status.loadingItem == item.id"></i>
                    </div>
                    <div class="col-lg-5 col-6">
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      cart: {},
      category: [],
      currentpage: 0,
      has_pre: false,
      has_next: false,
      pagenum: [],
      visibility: 'all',
      products: [],
      status: {
        loadingItem: '',
      },
      tempProduct: {
        num: 0,
      },
      isLoading: false,
      favorited: JSON.parse(localStorage.getItem('favorite')) || [],
    };
  },
  methods: {
    getData(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products?page=${page}`;
      this.$http.get(api).then((res) => {
        this.products = res.data.data;
        this.isLoading = false;
      });
    },
    addToCart(item, quantity = 1) {
      this.status.loadingItem = item.id;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      const sendData = {
        product: item.id,
        quantity,
      };
      this.$http.post(api, sendData).then((response) => {
        this.status.loadingItem = '';
        this.$bus.$emit('cart_num');
        this.getCart();
      }).catch(() => {
        this.$bus.$emit('webmessage',
          '此產品已經有加入購物車',
          'warning');          
        this.status.loadingItem = '';
      });
    },
    getProductDetails(id) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/product/${id}`;
      this.$http.get(api).then((response) => {
        this.tempProduct = response.data.data;
        this.$router.push(`/products/${id}`);
        this.isLoading = false;
      });
    },
    getCart() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      this.$http.get(api).then((response) => {
        // eslint-disable-next-line
        this.cart = response.data.data;
        this.cart.forEach((item) => {
          this.isLoading = false;
          this.cartTotal += item.product.price;
        });
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
        vm.favorited.splice(index, 1);
      };
      localStorage.setItem('favorite', JSON.stringify(vm.favorited));
    }
  },
  computed: {
    filterData() {
      const vm = this;
      const newData = [];
      let items = [];
      items = vm.products;
      const categoryItem = [];
      items.forEach((item) => {
        if (vm.visibility === item.category) {
          this.currentpage = 0;
          categoryItem.push(item);
        } else if (vm.visibility === 'all') {
          categoryItem.push(item);
        }
      });
      categoryItem.forEach((item, i) => {
        if (i % 6 === 0) {
          newData.push([]);
        }
        // eslint-disable-next-line
        const pagenum = parseInt(i / 6);
        newData[pagenum].push(item);
      });
      return newData;
    },
    filterCategory() {
      const vm = this;
      const list = [];
      let items = [];
      items = vm.products;
      // eslint-disable-next-line
      items.filter((item, i) => {
        if (item.enabled === false) { return; }
        list.push(item.category);
      });
      // eslint-disable-next-line
      let category = list.filter((item, i, arr) => {
        return arr.indexOf(item) === i;
      }); // filter category norepeat
      return category;
    },
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
    this.getData();
    this.getCart();
  },
};
</script>
