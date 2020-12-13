import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import {
  ValidationObserver,
  ValidationProvider, configure, localize, extend,
} from 'vee-validate'; // 驗證套件
import * as rules from 'vee-validate/dist/rules'; // 規則檔案（ex: email...）
import zhTW from 'vee-validate/dist/locale/zh_TW.json'; // 語系檔案
import {
  Swiper as SwiperClass, Pagination, Mousewheel, Autoplay,
} from 'swiper/core';
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter';
import App from './App.vue';
import router from './router';
import './bus';

// Swiper modules
SwiperClass.use([Pagination, Mousewheel, Autoplay]);
// Global use
Vue.use(getAwesomeSwiper(SwiperClass));
// vee-validate
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
}); // 所有驗證規則
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});
localize('tw', zhTW);
// 將 VeeValidate input 驗證工具載入 作為全域註冊
Vue.component('ValidationProvider', ValidationProvider);
// 將 VeeValidate 完整表單 驗證工具載入 作為全域註冊
Vue.component('ValidationObserver', ValidationObserver);

Vue.component('Loading', Loading);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
