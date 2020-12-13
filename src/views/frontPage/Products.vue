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
                    <!-- <span class="product_today">本日精選</span> -->
                    <!-- <span class="product_like">
                      <i class="material-icons text-danger">
                        favorite_border
                      </i>
                    </span>-->
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

    <!-- <div class="px-4">
      <div class="row mt-4 justify-content-center">
        <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
          <div class="card">
            <img :src="item.imageUrl[0]" class="card-img-top" alt="" />
            <div class="card-body">
              <h5 class="card-title">{{ item.title }}</h5>
              <p class="card-text">{{ item.content }}</p>
            </div>
            <div class="card-footer d-flex">
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-toggle="modal"
                @click="getProductDetails(item.id)"
              >
                查看更多
              </button>
              <button
                type="button"
                class="btn btn-outline-danger ml-auto"
                @click="addToCart(item, item.num)"
              >
                <i
                  v-if="item.id === status.loadingItem"
                  class="fas fa-spinner fa-spin"
                ></i>
                加到購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <!-- 產品 Modal -->
    <!-- <div
      id="productdetailModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="exampleModalLabel" class="modal-title">
              {{ tempProduct.title }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="tempProduct.image" class="img-fluid" alt />
            <blockquote class="blockquote mt-3">
              <p class="mb-0" v-html="tempProduct.content"></p>
              <footer class="blockquote-footer text-right">
                {{ tempProduct.description }}
              </footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div v-if="!tempProduct.price" class="h4">
                {{ tempProduct.origin_price }} 元
              </div>
              <del v-if="tempProduct.price" class="h6"
                >原價 {{ tempProduct.origin_price }} 元</del
              >
              <div v-if="tempProduct.price" class="h4">
                現在只要 {{ tempProduct.price }} 元
              </div>
            </div>
            <select v-model="tempProduct.num" name class="form-control mt-3">
              <option value="0" disabled selected>
                請選擇數量
              </option>
              <option v-for="num in 10" :key="num" :value="num">
                選購 {{ num }} {{ tempProduct.unit }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div v-if="tempProduct.num" class="text-muted text-nowrap mr-3">
              小計
              <strong>{{ tempProduct.num * tempProduct.price }}</strong> 元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addToCart(tempProduct, tempProduct.num)"
            >
              <i
                v-if="tempProduct.id === status.loadingItem"
                class="fas fa-spinner fa-spin"
              ></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div> -->
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
      // console.log(api);
      this.$http.get(api).then((response) => {
        // eslint-disable-next-line
        this.cart = response.data.data;
        this.cart.forEach((item) => {
          this.isLoading = false;
          this.cartTotal += item.product.price;
        });
      });
    },
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
  },
  created() {
    this.getData();
    this.getCart();
  },
};
</script>
