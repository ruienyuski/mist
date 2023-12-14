<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
</script>

<template>
  <footer class="footer">
    <div class="row footer_bg01 justify-content-center">
    </div>
    <div class="footer_bg02">
      <div class="footer_width row justify-content-center">
        <div class="col-lg-12 col-md-12 col-12 row justify-content-between">
          <div class="col-lg-7 col-md-5 col-12  desktop align-self-center">
            <router-link to="/">
              <img
                src="@/assets/static/images/logo_img/logo_coffee.svg"
                class="footer_logo02"
                alt
              >
              <div class="text-center desktop mt-3">© 2019 MistCoffee All Rights Reserved</div>
            </router-link>

          </div>

          <div class="col-lg-2 col-md-2 col-12  mobile align-self-center">
            <router-link to="/">
              <img
                src="@/assets/static/images/logo_img/logo_coffee.svg"
                class="footer_logo02"
                alt
              >
            </router-link>
          </div>

          <div class="col-lg-4 col-md-6 col-12">
            <div class="footer_icon">
              <img src="@/assets/static/images/logo_img/ic-line@.svg" alt>
              <img class="ms-2" src="@/assets/static/images/logo_img/ic-facebook.svg" alt>
            </div>
            <div class="address">
              <p>07-6666-7777</p>
              <p>mistcoffee@email.com</p>
              <p>807 高雄市三民區迷霧路 999 號</p>
            </div>
            <div class="mobile mobile_copyright">© 2019 MistCoffee All Rights Reserved</div>

          </div>
        </div>

      </div>
    </div>
  </footer>
</template>
