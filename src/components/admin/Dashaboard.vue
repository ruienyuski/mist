<template>
  <div>
    <Navbar/>
    <div class="container-fluid">
      <div class="row">
        <Sidebar/>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <router-view/>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';

export default {
  data() {
    return {
    };
  },
  components: {
    Navbar,
    Sidebar,
  },
};
</script>
