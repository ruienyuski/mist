<template>
  <div>
    <div class="footer">
      <div class="row footer_bg01 justify-content-center">
        <!-- <div class="col-lg-3 row align-items-center mail_title">
          <img src="@/assets/static/images/logo_img/logo-light.svg" alt class="footer_logo01">
          <span class="footer_mail_txt">訂閱你我的甜蜜郵件</span>
        </div>
        <div class="col-lg-5 footer_input">
          <div class="row justify-content-center">
            <div class="relative input_icon">
              <input type="text" name="email" title="email">
              <i class="material-icons">email</i>
            </div>
            <button class="btn btn_send" type="button">
              <i class="material-icons">arrow_forward</i>
            </button>
          </div>
        </div> -->
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
                <img class="ml-2" src="@/assets/static/images/logo_img/ic-facebook.svg" alt>
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
    </div>
  </div>
</template>
