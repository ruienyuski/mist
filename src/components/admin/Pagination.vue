<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{disabled:pages.current_page === 1}"><a class="page-link" href="#" @click.prevent="pageItem(pages.current_page - 1)">Previous</a></li>
      <li class="page-item" :class="{active:item === pages.current_page}" v-for="(item,key) in pages.total_pages" :key="key"><a class="page-link" href="#" @click.prevent="pageItem(item)">{{item}}</a></li>
      <li class="page-item" :class="{disabled:pages.current_page === pages.total_pages}"><a class="page-link" href="#"  @click.prevent="pageItem(pages.current_page + 1)">Next</a></li>
    </ul>
  </nav>
</template>
<script>
export default {
  props: ['pages'],
  data() {
    return {

    };
  },
  methods: {
    pageItem(num) {
      this.$emit('updatepage', num);
      console.log(this.pages, num);
    },
  },
  created() {

  },
};
</script>
