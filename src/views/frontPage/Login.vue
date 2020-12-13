<template>
  <div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-5 login_width">
          <form @submit.prevent="signin">
            <div class="card text-center login_bg">
              <div class="card-body">
                <h5 class="card-title">後台登入</h5>
                <!-- <div class="mobile mobile_social_btn_bg mb-5">
                  <div class="btn-group  social_btn">
                    <button type="button" class="btn mx-1 btn_bg">
                      <img
                      src="@/assets/static/images/logo_img/ic-facebook-logotype.svg"
                      alt=""
                      class="social_icon">

                    </button>
                    <button type="button" class="btn mx-1 btn_bg">
                      <img
                      src="@/assets/static/images/logo_img/ic-google.svg"
                      alt=""
                      class="social_icon">

                    </button>
                    <button type="button" class="btn mx-1 btn_bg">
                      <img
                      src="@/assets/static/images/logo_img/ic-yahoo.svg"
                      alt=""
                      class="social_icon">

                    </button>
                  </div>
                </div> -->
                <div class="form-row justify-content-center">
                  <div class="form-group col-lg-11 col-10 mb-0">
                    <div class="relative input_icon">
                      <label for="email"></label>
                      <input
                        type="email"
                        class="form-control form-control-lg"
                        id="email"
                        v-model="user.email"
                        placeholder="請輸入email"
                        required
                      >
                      <i class="material-icons">person</i>
                    </div>
                  </div>
                  <div class="form-group col-lg-11 col-10 mb-0">
                    <div class="relative input_icon">
                      <label for="password"></label>
                      <input
                        type="password"
                        class="form-control form-control-lg"
                        id="password"
                        v-model="user.password"
                        placeholder="請輸入密碼"
                        required
                      >
                      <i class="material-icons">vpn_key</i>
                    </div>
                  </div>
                </div>
              </div>

              <button
              class="btn card-footer login_btn_bg border-0 rounded-0"
              type="submit">登入帳號</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    signin() {
      const api = `${process.env.VUE_APP_APIPATH}/api/auth/login`;
      this.$http.post(api, this.user).then((response) => {
        const data = {
          token: response.data.token,
          expires: response.data.expires,
        };
        console.log(response.data.token);
        // 寫入 cookie token
        // expires 設置有效時間
        document.cookie = `token=${data.token};expires=${new Date(data.expired * 1000)}; path=/`;
        this.$bus.$emit('webmessage',
          '登入成功',
          'success');
        this.$router.push('/admin');
      }).catch((error) => {
        // eslint-disable-next-line
        console.log(error);
      });
    },
  },
};
</script>
