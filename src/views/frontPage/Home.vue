<template>
  <div>
    <!-- swiper 測試 -->
    <!-- <div class="swiper-container banner-img">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide d-flex justify-content-center"
        >
        <img src="https://images.unsplash.com/photo-1605704366546-e3632af0c5c6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1342&q=80" alt="">
        </div>
        <div
          class="swiper-slide d-flex justify-content-center"
        >
        <img src="https://images.unsplash.com/photo-1602524818604-fb5277190621?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" alt="">
        </div>
        <div
          class="swiper-slide d-flex justify-content-center"
        >
        <img src="https://images.unsplash.com/photo-1605790194685-2c1f695de2b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="">
        </div>
        <div
          class="swiper-slide d-flex justify-content-center"
        >
        <img src="https://images.unsplash.com/photo-1605688180060-d86e3caf88e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="">
        </div>
        <div
          class="swiper-slide d-flex justify-content-center"
        >
        <img src="https://images.unsplash.com/photo-1601649705707-13b54dc57b87?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1313&q=80" alt="">
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev d-none d-md-block"></div>
      <div class="swiper-button-next d-none d-md-block"></div>
    </div> -->
    <div class="container">
      <div class="row">
        <div class="col-lg-12 mobile_header relative">
          <div class="header bg-cover" style="background-image:url(https://images.unsplash.com/photo-1482242248426-c4e9fe3a559a?ixlib=rb-1.2.1)"></div>
          <div class="salemenu">
            <div class="opacity">
              <div class="bg_blur blur_img01"></div>
              <a href="#本日精選" class="salemenu_item">
                <span>本日精選</span>
              </a>
            </div>
            <div class="opacity">
              <div class="bg_blur blur_img02"></div>
              <a href="#人氣推薦" class="salemenu_item salemenu_item_border">
                <span>人氣推薦</span>
              </a>
            </div>
            <div class="opacity">
              <div class="bg_blur blur_img03"></div>
              <a href="#新品上市" class="salemenu_item">
                <span>新品上市</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid desktop">
      <div class="content">
        <div class="row home_ad_bg justify-content-center">
          <div
            class="home_ad_img col-lg-4 col-12 bg-cover"
            style="background-image:url(https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-1.2.1)"
          ></div>
          <div
            class="col-lg-5 col-12 pl-5 pt-4 home_ad_txt row
            justify-content-around align-items-center"
          >
            <div class="h3 col-lg-12 mb-5 desktop">
              關於我們
            </div>
            <div class="home_ad_p_txt col-lg-12 col-12">
              <p>不管未來有何嚴峻挑戰，請放鬆心情享受這一刻美好!</p>
              <p class="blockquote-footer">網站內容皆從網路蒐集，僅作參考用!!</p>
            </div>
          </div>
        </div>
      </div>

      <h1 class="text-center">─ 最新優惠活動 ─</h1>
    </div>
    <div class="container my-5">
      <div class="home_sale row justify-content-center">
        <div
          class="col-md-4 col-lg-4 col-12 mb-4"
          id="本日精選"
          v-for="item in filterData.today"
          :key="item.id"
        >
          <div class="card">
            <div class="relative">
              <span class="product_home_list product_today">{{item.category}}</span>
              <!-- <span class="product_like">
                <i class="material-icons">
                  favorite_border
                </i>
              </span>-->
            </div>

            <router-link :to="{name:'ProductDetail',params:{id:item.id}}">
              <div
                class="bg-cover product_card_img"
                :style="`background-image: url(${item.imageUrl[0]})`"
              ></div>
            </router-link>

            <div class="card-body p-0">
              <div class="row product_card_product_txt">
                <div class="col-lg-7 p-3 align-self-center
                product_product_border text-center">
                  <router-link :to="{name:'ProductDetail',params:{id:item.id}}">
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

            <router-link
              :to="{name:'ProductDetail',params:{id:item.id}}"
              class="btn card-footer card_footer_bg text-center"
            >查看更多</router-link>
          </div>
        </div>
        <div class="col-md-4 col-lg-4 col-12 mb-4" id="人氣推薦"
        v-for="item in filterData.hot" :key="item.id">
          <div class="card">
            <div class="relative">
              <span class="product_home_list bg-danger">{{item.category}}</span>
              <!-- <span class="product_like">
                <i class="material-icons">
                  favorite_border
                </i>
              </span>-->
            </div>

            <router-link :to="{name:'ProductDetail',params:{id:item.id}}">
              <div
                class="bg-cover product_card_img"
                :style="`background-image: url(${item.imageUrl[0]})`"
              ></div>
            </router-link>

            <div class="card-body p-0">
              <div class="row product_card_product_txt">
                <div class="col-lg-7 p-3 align-self-center product_product_border text-center">
                  <router-link :to="{name:'ProductDetail',params:{id:item.id}}">
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
            <router-link
              :to="{name:'ProductDetail',params:{id:item.id}}"
              class="btn card-footer card_footer_bg text-center"
            >查看更多</router-link>
          </div>
        </div>
        <div
          class="col-md-4 col-lg-4 col-12 mb-4"
          id="新品上市"
          v-for="item in filterData.newProduct"
          :key="item.id"
        >
          <div class="card">
            <div class="relative">
              <span class="product_home_list product_NEW">{{item.category}}</span>
              <!-- <span class="product_like">
                <i class="material-icons">
                  favorite_border
                </i>
              </span>-->
            </div>

            <router-link :to="{name:'ProductDetail',params:{id:item.id}}">
              <div
                class="bg-cover product_card_img"
                :style="`background-image: url(${item.imageUrl[0]})`"
              ></div>
            </router-link>

            <div class="card-body p-0">
              <div class="row product_card_product_txt">
                <div class="col-lg-7 p-3 align-self-center
                product_product_border text-center">
                  <router-link :to="{name:'ProductDetail',params:{id:item.id}}">
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
            <router-link
              :to="{name:'ProductDetail',params:{id:item.id}}"
              class="btn card-footer card_footer_bg text-center"
            >查看更多</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

// import SwiperCore, { Swiper, Navigation, Pagination, Autoplay } from 'swiper'
// import 'swiper/swiper-bundle.css'
export default {
  name: 'Home',
  data() {
    return {
      products: [],
      category: [],
    };
  },
  methods: {
    getProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products`;
      this.$http.get(api).then((response) => {
        console.log(response);
        vm.products = response.data.data;
        console.log(vm.products);
      });
    },
  },
  computed: {
    filterData() {
      const vm = this;
      const items = vm.products;
      const hot = [];
      const today = [];
      const newProduct = [];
      items.forEach((item) => {
        if (item.category === '本日精選') {
          today.push(item);
        } else if (item.category === '人氣推薦') {
          hot.push(item);
        } else if (item.category === '新品上市') {
          newProduct.push(item);
        }
      });
      const category = { today, hot, newProduct };
      return category;
    },
  },
  created() {
    this.getProduct();
  },
  // components: {
  //   SwiperCore,
  //   Swiper,
  // },
  // mounted () {
  // /* eslint-disable no-new */
  //   const swiper = new Swiper('.swiper-container', {
  //     direction: 'horizontal',
  //     loop: true,
  //     speed: 1000,
  //     autoplay: {
  //       delay: 2000,
  //       disableOnInteraction: false
  //     },
  //     pagination: {
  //       el: '.swiper-pagination'
  //     },
  //     navigation: {
  //       nextEl: '.swiper-button-next',
  //       prevEl: '.swiper-button-prev'
  //     }
  //   })
  // }
};
</script>
