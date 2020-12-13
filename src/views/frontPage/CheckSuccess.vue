<template>
  <div>
    <div class="container p-0 container_mb">
      <div class="header bg-cover header2_mobile header2" style="background-image:url(https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2c5a2cf31c693f5c15fb08135bf1adf2&auto=format&fit=crop&w=800&q=60)">
        <div class="flex-column align-items-center align-self-center">
          <!-- <div class="progress progress_color2 my-5">
            <div class="step in done done_color2"></div>
            <div class="step in done done_color2"></div>
            <div class="step in done done_color2"></div>
          </div> -->
          <div class="text-center">
              <img
              src="@/assets/static/images/logo_img/lg-payok.svg"
              alt=""
              class="img-fluid fin_text">
          </div>
          <button
          class="success_btn_bg mt-5 desktop border-0 radius-0"
          type="button"
          @click="finish">
            繼續逛逛
          </button>

        </div>

        <!-- <table class="table table-borderless">
          <tr>
            <td>

            </td>
          </tr>
          <tr>

          </tr>
          <tr class="desktop">
            <td class="text-center">

            </td>
          </tr>
        </table> -->
      </div>

      <button
      class="mobile_success_btn_bg border-0 radius-0"
      type="submit"
      @click="finish">
        繼續逛逛
      </button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    finish() {
      const vm = this;
      vm.$router.push('/product');
    },
  },
};
</script>
