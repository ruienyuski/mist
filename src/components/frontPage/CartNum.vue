<template>
  <span class="badge badge-pill badge-danger" v-if="nowNum!== 0 ">{{nowNum}}</span>
</template>
<script>
export default {
  name: 'CartNum',
  data() {
    return {
      nowNum: null,
      message: [],
    };
  },
  methods: {
    // eslint-disable-next-line
    getCartNum(message) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`;
      const cartNum = null;
      this.$http.get(api).then((response) => {
        vm.nowNum = response.data.data.length;
        vm.message.push({ cartNum });
      });
    },
  },
  created() {
    const vm = this;
    this.getCartNum();
    vm.$bus.$on('cart_num', (item) => {
      vm.getCartNum(item);
    });
  },
};
</script>
