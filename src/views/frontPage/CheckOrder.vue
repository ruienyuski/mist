<template>
  <div>
    <div class="container container_mb">
      <div class="row justify-content-center">
        <div class="col-lg-6 col-12 pay_width">
          <validation-observer v-slot="{ invalid }">
          <form @submit.prevent="createOrder">
            <div class="card text-center check_bg">
              <div class="card-head row justify-content-between">
                <div class="check_step_title col-lg-3 col-5">運送</div>
                <!-- <div class="col-lg-6 col-6 align-self-center">
                  <div class="progress">
                    <div class="step in"></div>
                    <div class="step"></div>
                    <div class="step"></div>
                  </div>
                </div>-->
              </div>

              <div class="card-body">
                <div class="form-row">
                  <div class="form-group col-lg-12 col-12">
                    <validation-provider v-slot="{ errors, classes }" rules="required">
                      <label for="username">姓名</label>
                      <input
                        id="username"
                        v-model="form.name"
                        type="text"
                        class="form-control form-control-lg"
                        :class="classes"
                        name="name"
                        placeholder="王小明"
                      />
                      <span v-if="errors[0]" class="text-warning">{{ errors[0] }}</span>
                    </validation-provider>

                    <!-- <label for="name">姓名</label>
                    <input
                      type="text"
                      v-model="form.name"
                      v-validate="'required'"
                      class="form-control form-control-lg"
                      :class="{'is-invalid':errors.has('name')}"
                      name="name"
                      id="name"
                      placeholder="王小明"
                    >
                    <span class="text-warning" v-if="errors.has('name')">姓名必須填入</span> -->
                  </div>

                  <div class="form-group col-lg-12 col-12">

                    <validation-provider v-slot="{ errors, classes }" rules="required|min:8">
                      <label for="phone">電話</label>
                      <input
                        id="phone"
                        v-model="form.tel"
                        type="tel"
                        class="form-control form-control-lg"
                        :class="classes"
                        name="tel"
                        placeholder="0912-345-678"
                      />
                      <span v-if="errors[0]" class="text-warning">{{ errors[0] }}</span>
                    </validation-provider>

                    <!-- <label for="phone">電話</label>
                    <input
                      type="tel"
                      v-model="form.tel"
                      class="form-control form-control-lg"
                      :class="{'is-invalid':errors.has('tel')}"
                      id="phone"
                      name="tel"
                      placeholder="0912-345-678"
                      v-validate="'required'"
                    >
                    <span class="text-warning" v-if="errors.has('tel')">電話必須輸入</span> -->
                  </div>

                  <div class="form-group col-lg-12 col-12">
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="E-mail"
                      rules="required|email"
                    >
                      <label for="email">電子郵件信箱</label>
                      <input
                        id="email"
                        name="email"
                        v-model="form.email"
                        type="email"
                        class="form-control form-control-lg"
                        :class="classes"
                        placeholder="example@email.com"
                      />
                      <span v-if="errors[0]" class="text-warning">{{ errors[0] }}</span>
                    </validation-provider>

                    <!-- <label for="email">電子郵件信箱</label>
                    <input
                      type="email"
                      v-model="form.email"
                      v-validate="'required|email'"
                      class="form-control form-control-lg"
                      name="email"
                      id="email"
                      placeholder="example@email.com"
                      required
                    >
                    <span
                      class="text-warning"
                      v-if="errors.has('email')"
                    >{{ errors.first('email') }}</span> -->
                  </div>

                  <div class="form-group col-lg-12 col-12">
                    <validation-provider v-slot="{ errors, classes }" rules="required">
                      <label for="address">地址</label>
                      <input
                        id="address"
                        name="address"
                        v-model="form.address"
                        type="text"
                        class="form-control form-control-lg"
                        :class="classes"
                        placeholder="xx 市 xx 區 xx 路 xx 號"
                      />
                      <span v-if="errors[0]" class="text-warning">{{ errors[0] }}</span>
                    </validation-provider>

                    <!-- <label for="address">地址</label>
                    <input
                      type="text"
                      v-model="form.address"
                      class="form-control form-control-lg"
                      :class="{'is-invalid':errors.has('address')}"
                      id="address"
                      name="address"
                      placeholder="xx 市 xx 區 xx 路 xx 號"
                      v-validate="'required'"
                    >
                    <span class="text-warning" v-if="errors.has('address')">地址必須輸入</span> -->
                  </div>
                  <div class="form-group col-lg-12 col-12">
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
                  <div class="form-group col-lg-12 col-12">
                    <label for="InputTextarea">留言</label>
                    <textarea
                      class="form-control"
                      v-model="form.message"
                      id="InputTextarea"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </div>

              <button class="btn cart-footer check_btn_bg border-0 rounded-0"
              type="submit" :disabled="invalid">
              下一步
              </button>
            </div>
          </form>
          </validation-observer>
        </div>

        <div class="col-lg-4 col-12 align-items-start desktop">
          <div class="check_order_width">
            <div class="p-3 text-center check_list_title">訂單摘要</div>
            <table class="table table-borderless">
              <tr>
                <td class="text-left">小計</td>
                <td class="text-right">NT$ {{cart.total}}</td>
              </tr>
              <tr class="mb-2 check_order_total" v-if="cart.final_total === cart.total">
                <td class="text-left">總計</td>
                <td class="text-right">NT$ {{cart.total}}</td>
              </tr>
              <tr class="check_order_total" v-if="cart.final_total !== cart.total">
                <td class="text-left">優惠價</td>
                <td class="text-right">NT$ {{cart.final_total}}</td>
              </tr>
            </table>
          </div>
          <div class="check_order_width">
            <div class="p-3 text-center check_list_title">購物清單</div>
            <div class="my-3" v-for="item in cart.carts" :key="item.id">
              <div class="row justify-content-around" >
                <div
                  class="col-lg-7 col-5 align-self-center p-0 check_product_img bg-cover"
                  :style="{backgroundImage: `url(${item.product.imageUrl})`}"
                ></div>
                <div class="col-lg-5 col-7 row p-0 justify-content-center">
                  <div class="col-lg-12 col-12 align-self-center check_product_item">
                    <div>{{item.product.title}} ({{item.qty}})</div>
                    <div class="product_price">NT$ {{item.final_total}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      <!-- <div class="my-5 row justify-content-center">
        <validation-observer v-slot="{ invalid }" class="col-md-6">
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
      </div>     -->
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
      },
      status: {
        loadingItem: '',
      },
      isLoading: false,
    };
  },
  methods: {
    getCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${
        process.env.VUE_APP_CUSTOMPATH
      }/cart`;
      this.$http.get(api).then((response) => {
        vm.cart = response.data.data;
        // const cartItem = {};
        vm.cartItem = vm.cart.carts;
        vm.cart.final_total = Math.round((vm.cart.final_total * 10) / 10);
        vm.cartItem.forEach((item) => {
          // eslint-disable-next-line
          item.final_total = Math.round((item.final_total * 10) / 10);
        });
      });
    },
    createOrder() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/orders`;
      this.$http.post(api, this.form).then((response) => {
        if (response.data.data.id) {
          this.isLoading = false;
          // 重新渲染購物車
          this.getCart();
          this.$router.push('/products');
        }
      });
    },
  },
  created() {
    this.getCart();
  },
};
</script>
