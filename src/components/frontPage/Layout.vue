<template>
  <div class="flexcontent">
    <Header class="container"></Header>
    <Toast />
    <div class="content__footer">
      <router-view>
      </router-view>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Header from '@/components/frontPage/Header.vue';
import Footer from '@/components/frontPage/Footer.vue';
import Toast from '@/components/Toasts.vue';

export default {
  name: 'layout',
  components: {
    Header,
    Footer,
    Toast,
  },
};
</script>
