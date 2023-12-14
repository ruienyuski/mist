<script setup>
import { inject,ref } from 'vue'
import Loading from './components/Loading.vue'
import Toast from './components/Toast.vue'

const emitter = inject('emitter')
const loadstatus = ref(false)
const messages = ref([])


emitter.on('isLoading', (isLoading) => {   // *Listen* for event
      loadstatus.value = isLoading
    });


emitter.on('webmessage', (message, status = 'warning') => {
  messages.value = {message, status}
  setTimeout(() => {
    messages.value = {}
      }, 3000)
})

</script>

<template>
  <Toast :msg="messages" />
  <Loading :load="loadstatus" />
  <RouterView />
</template>

