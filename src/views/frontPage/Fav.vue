<template>
  <div>
    <loading :active.sync="isLoading" :zIndex="999"></loading>
    <div class="container container_mb">
      <div class="col-lg-12 text-center" v-if="favorited.length === 0">
        <div class="p-3 text-center cart_title">尚未加入最愛</div>
      </div>
      <div class="row justify-content-between" v-else>
        <div class="col-lg-12 col-12 cart_width">
          <div class="text-right my-1">
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
          <div class="cart_list" v-for="item in favlist" :key="item.id">
            <div class="row m-0 justify-content-between mt-4">
              <router-link
                :to="{ name: 'ProductDetail', params: { id: item.id } }"
                class="col-lg-2 col-md-4 col-12 align-self-center cart_product_img bg-cover"
                :style="{ backgroundImage: `url(${item.imageUrl})` }"
              ></router-link>
              <div class="col-lg-4 col-md-4 col-12 row justify-content-center">
                <div class="col-lg-6 col-md-12 col-12 row justify-content-center">
                  <div class="col-12 align-self-center cart_product_item">
                    <div class="product_title">{{ item.title }}</div>
                    <div>NT$ {{ item.price }} / {{item.unit}}</div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-4 col-12 row justify-content-center">
                <div class="col-12 align-self-center cart_product_item">
                  <div class="my-1">
                    <button
                      class="btn btn-primary col-7"
                      type="button"
                      @click="addtoCart(item)"
                    >
                      加到購物車
                      <i class="fas fa-spinner fa-spin" v-if="status.loadingItem == item.id"></i>
                    </button>                    
                  </div>
                  <div class="my-1">
                    <button
                      class="btn btn-outline-primary col-7"
                      type="button"
                      @click="ProductDetail(item.id)"
                    >
                      查看更多
                    </button>                     
                  </div>
                </div>
              </div>
              <a
                href="#"
                class="col-lg-1 col-md-1 col-2 align-self-center"
                @click="removeFavItem(item.id)"
              >
                <i class="material-icons cart_delete_icon">delete_outline</i>
              </a>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      products:[],
      status: {
        loadingItem: '',
      },
      isLoading: false,
      favorited: JSON.parse(localStorage.getItem('favorite')) || [],
    };
  },
  methods: {
    getData() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products`;
      this.$http.get(api).then((res) => {
        this.products = res.data.data;
        this.isLoading = false;
      });
    },
    ProductDetail(id) {
      this.$router.push(`/product/${id}`);
    },
    addtoCart(item, quantity = 1) {
      const vm = this;
      vm.status.loadingItem = item.id;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      const sendData = {
        product: item.id,
        quantity,
      };
      let index = vm.favorited.indexOf(item.id);
      vm.favorited.splice(index, 1);
      localStorage.setItem('favorite', JSON.stringify(vm.favorited));     
      vm.$http.post(api, sendData).then((response) => {
        console.log(response);
        vm.status.loadingItem = '';
        vm.$bus.$emit('cart_num');
        vm.getData();
      }).catch(() => {
         vm.status.loadingItem = '';
        vm.$bus.$emit('webmessage',
          '此產品已經加入購物車',
          'warning');        
      });
    },    
    removeFavItem(id) {
      const vm = this;
      let index = vm.favorited.findIndex((el) => {
        return id === el
      });
      vm.favorited.splice(index, 1);
      localStorage.setItem('favorite', JSON.stringify(vm.favorited));  
    },
    removeAllFavItem() {
      const vm = this;
      vm.favorited = [];
      localStorage.setItem('favorite', JSON.stringify(vm.favorited));
    },
    addAllFavItem() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;

      vm.favorited.forEach((id) => {
        let sendData = {
          product: id,
          quantity: 1,
        };
        vm.$http.post(api, sendData).then((response) => {
          let index = vm.favorited.indexOf(id);
          vm.favorited.splice(index, 1);
          localStorage.setItem('favorite', JSON.stringify(vm.favorited));         
          vm.status.loadingItem = '';
          vm.$bus.$emit('cart_num');
          vm.getData();
        }).catch((err) => {
          vm.status.loadingItem = '';
          vm.$bus.$emit('webmessage',
            '此產品已經加入購物車',
            'warning');        
        });
      });

      // Promise.all(apiary).then(res => {
      //     this.$bus.$emit('cart_num');
      //     this.$bus.$emit('webmessage',
      //       '收藏的產品已經全加入購物車',
      //       'success');
      //     vm.favorited = [];
      //     localStorage.setItem('favorite', JSON.stringify(vm.favorited));       
      //     vm.getData();
      // }).catch(() => {
      //     this.$bus.$emit('webmessage',
      //       '部分產品已加入購物車',
      //       'danger');
      // })   
      
    },    
  },
  computed: {
    favlist() {
      const vm = this;
      return vm.products.filter((item) => {
        return vm.favorited.indexOf(item.id) > -1
      })
    }    
  },
  created() {
    this.getData();
  },
};
</script>
