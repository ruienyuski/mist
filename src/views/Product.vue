<template>
  <div>
    <loading :active.sync="isLoading" :zIndex="999"></loading>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-body">
              <blockquote class="blockquote mt-3">
                <p class="mb-0" v-html="product.content"></p>
                <footer class="blockquote-footer text-right">
                  {{ product.description }}
                </footer>
              </blockquote>
              <div class="d-flex justify-content-between align-items-baseline">
                <div v-if="!product.price" class="h4">
                  {{ product.origin_price }} 元
                </div>
                <del v-if="product.price" class="h6"
                  >原價 {{ product.origin_price }} 元</del
                >
                <div v-if="product.price" class="h4">
                  現在只要 {{ product.price }} 元
                </div>
              </div>
              <select v-model="product.num" name class="form-control mt-3">
                <option value="0" disabled selected>
                  請選擇數量
                </option>
                <option v-for="num in 10" :key="num" :value="num">
                  選購 {{ num }} {{ product.unit }}
                </option>
              </select>
            </div>
            <div class="card-footer d-flex">
              <button
                type="button"
                class="btn btn-primary"
                @click="addToCart(product, product.num)"
              >
                <i
                  v-if="product.id === status.loadingItem"
                  class="fas fa-spinner fa-spin"
                ></i>
                加到購物車
              </button>
              <div v-if="product.num" class="text-muted text-nowrap ml-auto">
                小計
                <strong>{{ product.num * product.price }}</strong> 元
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <img :src="product.imageUrl[0]" class="card-img-top" alt="...">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      status: {
        loadingItem: '',
      },
      product: {
        num: 0,
      },
      isLoading: false,
      id: '',
    };
  },
  methods: {
    addToCart(item, quantity = 1) {
      this.status.loadingItem = item.id;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      const sendData = {
        product: item.id,
        quantity,
      };
      // console.log(sendData)
      this.$http.post(api, sendData).then((response) => {
        console.log(response);
        // $('#productdetailModal').modal('hide')
        this.status.loadingItem = '';
        // this.$router.push('/cart');
      }).catch(() => {
        alert('已經有加入購物車');
      });
    },
  },
  created() {
    this.isLoading = true;
    this.id = this.$route.params.id;
    const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/product/${this.id}`;
    this.$http.get(api).then((response) => {
      this.product = response.data.data;
      console.log(this.product);
      this.isLoading = false;
    });
  },
};
</script>
