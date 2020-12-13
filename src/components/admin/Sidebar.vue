<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
          <div class="sidebar-sticky pt-3">
            <ul class="nav flex-column">
              <li class="nav-item">
                <a class="nav-link active" href="#">
                  <span data-feather="home"></span>
                  Dashboard <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin">產品列表</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/coupons">優惠卷</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/order">訂單列表</router-link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>
