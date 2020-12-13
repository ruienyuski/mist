<template>
  <div class="flexcontent">
    <div class="container fixed-top" >
      <Header></Header>
    </div>
    <Toast />
    <router-view>
    </router-view>
    <Footer></Footer>
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
