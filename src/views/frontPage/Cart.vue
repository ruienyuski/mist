<template>
  <div>
    <loading :active.sync="isLoading" :zIndex="999"></loading>
    <div class="container container_mb">
      <div class="col-lg-12 text-center" v-if="cart.length === 0">
        <div class="p-3 text-center cart_title">購物車為空</div>
      </div>
      <div class="row justify-content-between" v-else>
        <div class="col-lg-8 col-12 cart_width">
          <div class="p-3 text-center cart_title">您的購物車</div>
          <div class="text-right my-3">
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="removeAllCartItem()"
            >
              <i class="far fa-trash-alt"> 刪除所有品項</i>
            </button>
          </div>
          <div class="cart_list" v-for="item in cart" :key="item.id">
            <div class="row m-0 justify-content-between mt-4">
              <router-link
                :to="{ name: 'ProductDetail', params: { id: item.product.id } }"
                class="col-lg-2 col-md-4 col-3 align-self-center cart_product_img bg-cover"
                :style="{ backgroundImage: `url(${item.product.imageUrl})` }"
              ></router-link>
              <div class="col-lg-7 col-6 row justify-content-center">
                <div class="col-lg-6 col-md-6 col-12 row justify-content-center">
                  <div class="col-12 align-self-center cart_product_item">
                    <div class="product_title">{{ item.product.title }}</div>
                    <div>NT$ {{ item.product.price }} / {{item.product.unit}}</div>
                    <!-- <div class="text-success" v-if="item.coupon">已套用優惠卷</div> -->
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-12 row align-self-center ">
                  <div class="input-group">
                    <div class="input-group-append">
                      <button
                        class="btn btn-outline-primary"
                        type="button"
                        @click="quantityUpdata(item.product.id, item.quantity - 1)"
                        :disabled="item.quantity === 1"
                      >
                        -
                      </button>
                    </div>
                    <input
                      :id="item.product.id"
                      type="text"
                      class="form-control text-center"
                      :value="item.quantity"
                      @keyup.enter="quantityUpdata(item.product.id, $event.target.value)"
                    />
                    <div class="input-group-prepend">
                      <button
                        class="btn btn-outline-primary"
                        type="button"
                        @click="quantityUpdata(item.product.id, item.quantity + 1)"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <a
                href="#"
                class="col-lg-1 col-md-1 col-2 align-self-center"
                @click="removeCartItem(item.product.id)"
              >
                <i class="material-icons cart_delete_icon">delete_outline</i>
              </a>
            </div>
            <hr />
          </div>

        </div>
        <div class="col-lg-4 col-12 order_width">
          <div class="card text-center order_bg">
            <div class="card-head">訂單摘要</div>
            <div class="card-body">
          <div class="mt-3 mx-0 row justify-content-center">
            <div class="input-group mb-3 col-lg-12 col-10 px-0" v-if="cart.total !== 0">
              <input
                type="text"
                class="form-control"
                v-model="coupon_code"
                placeholder="請輸入優惠碼"
                aria-label="cost_number"
                aria-describedby="button-addon2"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-secondary"
                  type="button"
                  id="button-addon"
                  @click="addCouponCode"
                >
                  套用優惠碼
                </button>
              </div>
            </div>
          </div>
              <table class="table table-borderless">
                <tr class="row justify-content-between">
                  <td>小計</td>
                  <td>NT$ {{ cartTotal }}</td>
                </tr>
                <tr class="row justify-content-between mb-2">
                  <td>
                    <div v-if="coupon.enabled" class="text-left">
                      已加入優惠卷:
                      <br />
                      <!-- {{ coupon_title }} -->
                    </div>
                  </td>
                  <td>
                    <div v-if="coupon_code" class="text-left">
                      優惠卷碼:
                      <br />
                      {{ coupon_code }}
                    </div>
                  </td>
                </tr>
                <tr
                  class="row justify-content-between order_total order_sale"
                  v-if="!coupon.enabled"
                >
                  <td>總計</td>
                  <td>NT$ {{ cartTotal }}</td>
                </tr>
                <tr
                  class="row justify-content-between order_total order_sale"
                  v-else
                >
                  <td>優惠價</td>
                  <td>NT$ {{ cartTotal * (coupon.percent / 100) }}</td>
                </tr>
              </table>
            </div>
            <!-- <button
              class="btn cart-footer check_btn_bg border-0 rounded-0"
            >
              結帳
            </button> -->
          </div>
        </div>
      </div>
    </div>
    <div class="my-5 row justify-content-center" v-if="cart.length !== 0">
      <validation-observer v-slot="{ invalid }" class="col-md-6 col-10">
        <form @submit.prevent="createOrder">
          <div class="form-group">
            <validation-provider v-slot="{ errors, classes }" rules="required">
              <label for="username">收件人姓名</label>
              <input
                id="username"
                v-model="form.name"
                type="text"
                class="form-control"
                :class="classes"
              />
              <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <div class="form-group">
            <validation-provider
              v-slot="{ errors, classes }"
              name="E-mail"
              rules="required|email"
            >
              <label for="email">Email</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="form-control"
                :class="classes"
              />
              <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <div class="form-group">
            <validation-provider v-slot="{ errors, classes }" rules="required|min:8">
              <label for="tel">電話</label>
              <input
                id="tel"
                v-model="form.tel"
                type="tel"
                class="form-control"
                :class="classes"
              />
              <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <div class="form-group">
            <validation-provider v-slot="{ errors, classes }" rules="required">
              <label for="address">地址</label>
              <input
                id="address"
                v-model="form.address"
                type="text"
                class="form-control"
                :class="classes"
              />
              <span v-if="errors[0]" class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <div class="form-group">
            <label for="message">購買方式</label>
            <select v-model="form.payment" class="form-control" required>
              <option value="" disabled>
                請選擇付款方式
              </option>
              <option value="WebATM">
                WebATM
              </option>
              <option value="ATM">
                ATM
              </option>
              <option value="CVS">
                CVS
              </option>
              <option value="Barcode">
                Barcode
              </option>
              <option value="Credit">
                Credit
              </option>
              <option value="ApplePay">
                ApplePay
              </option>
              <option value="GooglePay">
                GooglePay
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="message">留言</label>
            <textarea
              id="message"
              v-model="form.message"
              class="form-control"
              cols="30"
              rows="3"
            />
          </div>
          <div class="text-right">
            <button type="submit" class="btn btn-primary" :disabled="invalid">
              送出表單
            </button>
          </div>
        </form>
      </validation-observer>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cart: {},
      form: {
        name: '',
        email: '',
        tel: '',
        address: '',
        payment: '',
        message: '',
        coupon: '',
      },
      status: {
        loadingItem: '',
      },
      isLoading: false,
      cartTotal: 0,
      coupon_code: '',
      coupon: {},
    };
  },
  methods: {
    getCart() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      // console.log(api)
      this.$http.get(api).then((response) => {
        // console.log(response);
        this.cart = response.data.data;
        this.cartTotal = 0;
        this.cart.forEach((item) => {
          this.cartTotal += item.product.price * item.quantity;
        });
        this.isLoading = false;
      });
    },
    removeCartItem(id) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/${id}`;
      console.log(api);
      this.$http.delete(api).then(() => {
        this.$bus.$emit('cart_num');
        this.getCart();
        this.isLoading = false;
      });
    },
    quantityUpdata(id, num) {
      this.isLoading = true;
      if (num < 0) {
        return;
      }
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      const cart = {
        product: id,
        quantity: num,
      };
      this.$http.patch(api, cart).then(() => {
        this.getCart();
        this.isLoading = false;
      });
    },
    removeAllCartItem() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/all/product`;
      this.$http.delete(api).then(() => {
        this.$bus.$emit('cart_num');
        this.$bus.$emit('webmessage',
          '已清空購物車',
          'success');           
        this.getCart();
        this.isLoading = false;
      });
    },
    addCouponCode() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/coupon/search`;
      this.isLoading = true;
      this.$http.post(api, { code: this.coupon_code }).then((response) => {
        this.coupon = response.data.data;
        this.isLoading = false;
      });
      this.getCart();
    },
    createOrder() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders`;
      const order = { ...this.form };
      if (this.coupon.enabled) {
        order.coupon = this.coupon.code;
      }
      this.$http.post(api, order).then((response) => {
        if (response.data.data.id) {
          this.isLoading = false;
          // 重新渲染購物車
          this.getCart();
          this.$router.push(`/payment/${response.data.data.id}`);
        }
      });
    },
  },
  created() {
    this.getCart();
  },
};
</script>
