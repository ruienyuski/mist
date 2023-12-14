<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { onMounted, ref } from 'vue'
import Toast from 'bootstrap/js/dist/toast'
const props = defineProps(['msg'])
const toastRef = ref(null)
const toastItem = ref({})
onMounted(() => {
  toastItem.value = new Toast(toastRef.value)
})

</script>
<template>
  <div class='toast-container position-fixed'
      style="top: 150px;right: 15px">
    <div
      class ="toast show"
        role='alert'
        aria-live='assertive'
        aria-atomic='true'
        ref="toastRef"
        v-if="props.msg.message"
    >
      <div class="toast-header">
        <div
          class="inline-block rounded me-2"
          style="width: 20px; height: 20px"
          :class="`bg-${ props.msg.status }`"
        />
        <strong class="me-auto">Mist Coffee</strong>
        <small>現在</small>
        <button type="button" class="btn-close"  data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">{{ props.msg.message }}</div>
    </div>
  </div>
</template>

<style scoped>
</style>
