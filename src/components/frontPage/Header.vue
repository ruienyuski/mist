<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-white py-4">
      <button
        class="navbar-toggler hamger"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="material-icons">dehaze</i>
      </button>
      <router-link class="navbar-brand Logo" to="/"></router-link>
      <div class="top mobile" @click="top">top</div>
      <router-link class="mobile ipad" to="/cart">
        <button class="btn btn-sm btn-cart">
          <i class="material-icons mobile ipad">shopping_cart</i>
          <CartNum></CartNum>
        </button>
      </router-link>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto menu">
          <li class="nav-item">
            <router-link class="nav-link" to="/">首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products">商品</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/favlist">收藏清單</router-link>
          </li>          
          <li class="nav-item">
            <router-link class="nav-link" to="/checkpayment">訂單查詢</router-link>
          </li>
          <li class="nav-item desktop">
            <router-link class="nav-link" to="/admin" v-if="token!==''">後台</router-link>
            <router-link class="nav-link" to="/login" v-else>後台登入</router-link>
          </li>             
        </ul>
      </div>
      <router-link class="desktop mt-4" to="/cart">
        <button class="btn btn-sm btn-cart">
          <i class="material-icons">shopping_cart</i>
          <CartNum></CartNum>
        </button>
      </router-link>      
    </nav>
  </header>
</template>
<style>
.btn-cart {
  background-color: transparent;
  position: relative;
}
</style>
<script>
import $ from 'jquery';
import CartNum from '@/components/frontPage/CartNum.vue';

export default {
  components: {
    CartNum,
  },
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
      if(this.token !== '') {return}
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
      // Axios 預設值
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`;
      const api = `${process.env.VUE_APP_APIPATH}/api/auth/check`;
      // eslint-disable-next-line
      this.$http.post(api, { 'api_token': this.token }).then((response) => {
        // 登入沒有問題
        if (response.data.success) {
          this.checkSuccess = true;
        }
        console.log(response)
      }).catch((res) => {
        // 驗證失敗，轉回登入頁
        this.$bus.$emit('webmessage',
          `${res.data}`,
          'danger');   
        this.$router.push('/login');
      });
    },    
    top() {
      $('html,body').animate(
      // eslint-disable-next-line
        {scrollTop: 0}, 700);
    },
  },
};
</script>
