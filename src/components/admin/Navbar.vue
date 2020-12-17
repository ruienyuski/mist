<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <router-link class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" to="/">回到網站前台</router-link>
      <button
        class="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-toggle="collapse"
        data-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click="signout()">登出</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token:'',
      checkSuccess:false,
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');

      // Axios 預設值
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`;

      const api = `${process.env.VUE_APP_APIPATH}/api/auth/check`;

      // eslint-disable-next-line
      this.$http.post(api, { 'api_token': this.token }).then((response) => {
        // 登入沒有問題
        console.log(response);
        if (response.data.success) {
          this.checkSuccess = true;
        }
      }).catch((res) => {
        // 驗證失敗，轉回登入頁
        this.$bus.$emit('webmessage',
          `${res.data.message}`,
          'danger');   
        this.$router.push('/login');
      });
    },
    signout() {
      document.cookie = 'token=;expires=;';
      this.$bus.$emit('webmessage',
        '目前已經登出後台',
        'success');         
      this.$router.push('/login');
    },
  },
};
</script>
