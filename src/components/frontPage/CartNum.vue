<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, inject, onMounted } from 'vue'
import axios from 'axios';
const emitter = inject('emitter')
const nowNum = ref(null)
const message = ref([])

onMounted(() => {
    getCartNum();
    emitter.on('cart_num', (item) => {   // *Listen* for event
        getCartNum(item)
    });
})

const getCartNum = (num) => {
      const api = `${import.meta.env.VITE_APP_URL}/cart`;
      axios.get(api).then((res) => {
        nowNum.value = res.data.data.carts.length;
        message.value.push({ num });
      });
    }

</script>

<template>
<span class="badge rounded-pill text-bg-danger" v-if="nowNum!== 0 ">{{nowNum}}</span>
</template>
