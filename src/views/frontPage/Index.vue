<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-lg-12 mobile_header relative">
          <div class="header bg-cover" style="background-image:url(http://t.cn/EKMFEvz)"></div>
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
            style="background-image:url(http://t.cn/EKMshnJ)"
          ></div>
          <div
            class="col-lg-5 col-12 pl-5 pt-4 home_ad_txt row
            justify-content-around align-items-center"
          >
            <div class="h3 col-lg-12 mb-5 desktop">
              關於我們
            </div>
            <div class="home_ad_p_txt col-lg-12 col-12">
              <p>從咖啡分析性格與個性，不管未來有何嚴峻挑戰，請放鬆心情享受這一刻美好!</p>
              <p>性格分析皆從網路蒐集，僅作參考用!!</p>
              <p class="blockquote-footer">文章來源：<a href="http://blog.udn.com/anna61224/7285293" target="blank">網路</a></p>
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
                :style="`background-image: url(${item.image})`"
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
                :style="`background-image: url(${item.image})`"
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
                :style="`background-image: url(${item.image})`"
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
export default {
  name: 'index',
  data() {
    return {
      products: [],
      category: [],
    };
  },
  methods: {
    getProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/products/all`;
      this.$http.get(api).then((response) => {
        // console.log(response.data.products)
        vm.products = response.data.products;
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
};
</script>
