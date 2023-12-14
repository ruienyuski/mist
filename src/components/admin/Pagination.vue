<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const props = defineProps(['pages'])
const emit = defineEmits(['updatapage'])

const pageItem = (num) => {
  emit('updatapage', num)
}
</script>

<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: props.pages.current_page === 1 }">
        <a class="page-link" href="#" @click.prevent="pageItem(props.pages.current_page - 1)">Previous</a>
      </li>
      <li class="page-item" :class="{active:item === props.pages.current_page}" v-for="(item,key) in props.pages.total_pages" :key="key">
        <a class="page-link" href="#" @click.prevent="pageItem(item)">{{item}}</a>
      </li>

      <li class="page-item" :class="{disabled:props.pages.current_page === props.pages.total_pages}">
        <a class="page-link" href="#" @click.prevent="pageItem(props.pages.current_page + 1)">Next</a>
      </li>
    </ul>
  </nav>
</template>
