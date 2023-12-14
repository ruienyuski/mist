<!-- eslint-disable vue/multi-word-component-names -->
<script setup>

const props = defineProps(['load'])

</script>
<template>
    <div>
        <div className="loading" :style="{display: props.load ? 'flex' : 'none'}">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </template>

  <style scoped>
.img-object-cover {
  object-fit: cover;
}
.loading {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  align-items: center;
  justify-content: center;
  z-index: 9999;
  display: none;
}
</style>
