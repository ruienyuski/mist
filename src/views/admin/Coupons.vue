<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right">
      <button class="btn btn-primary"
      @click="openModal(true)"
      data-toggle="modal"
      data-target="#CouponsModal">建立新的優惠卷</button>
    </div>
    <table class="table mt-4">
      <thead>
        <th>名稱</th>
        <th>優惠碼</th>
        <th width="120">折扣百分比</th>
        <th width="150">到期日</th>
        <th width="150">是否啟用</th>
        <th width="150">編輯</th>
      </thead>
      <tbody>
        <tr v-for="(item,key) in coupons" :key="key">
          <td>{{item.title}}</td>
          <td>{{item.code}}</td>
          <td>
            {{item.percent}} %
          </td>
          <td>
            {{ item.deadline.datetime }}
          </td>
          <td>
            <span class="text-success" v-if="item.enabled === true">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button
            class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
            <button
            class="btn btn-outline-primary btn-sm" @click="delModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @updatepage="getCoupons"></Pagination>
    <!-- 編輯Modal -->
    <div
    class="modal fade"
    id="CouponsModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true">
      <div class="modal-dialog modal-lg" roleexample="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ tempCoupons.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">

              <div class="col-lg-12">
                <form action="" class="form-row">
                  <div class="col-md-12 mb-3">
                    <label for="titleInput">名稱</label>
                    <input type="text"
                     class="form-control"
                      id="TitleInput"
                      v-model="tempCoupons.title"
                      placeholder="請輸入名稱">
                  </div>

                  <div class="col-md-12 mb-3">
                    <label for="CategoryInput">優惠碼</label>
                    <input type="text"
                    class="form-control"
                    id="CodeInput"
                    v-model="tempCoupons.code"
                    placeholder="請輸入優惠碼">
                  </div>
                  <div class="col-md-12 mb-3">
                    <label for="CategoryInput">折扣百分比</label>
                    <input type="number"
                    class="form-control"
                    id="PercentInput"
                    v-model="tempCoupons.percent"
                    placeholder="請輸入折扣百分比">
                  </div>
                  <div class="col-md-12 mb-3">
                    <label for="due_date">到期日</label>
                    <input type="date"
                    class="form-control"
                    id="due_date"
                    v-model="due_date"
                    placeholder="請選擇到期日">
                  </div>
                  <div class="col-md-12 mb-3">
                    <label for="due_time">到期時間</label>
                    <input
                      id="due_time"
                      v-model="due_time"
                      type="time"
                      step="1"
                      class="form-control"
                    >
                  </div>
                  <div class="custom-control custom-checkbox">
                    <input type="checkbox"
                    class="custom-control-input"
                    id="enabled"
                    v-model="tempCoupons.enabled"
                    >
                    <label class="custom-control-label" for="enabled">是否啟用</label>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateCoupons">確認</button>
          </div>
        </div>
      </div>
    </div>

    <!--刪除Modal -->
    <div class="modal fade" tabindex="-1" role="dialog" id="deleteModal" >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" >{{ tempCoupons.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>資料是否確認要刪除?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="deleteItem">確認刪除</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '@/components/admin/Pagination.vue';

export default {
  name: 'Coupons',
  data() {
    return {
      coupons: [],
      tempCoupons: {
        title: '',
        enabled: false,
        percent: 0,
        deadline_at: '',
        code: '',
      },
      percent: [],
      due_date: '',
      due_time: '',
      isLoading: false,
      isNew: false,
    };
  },
  components: {
    Pagination,
  },  
  methods: {
    getCoupons(page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupons?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.coupons = response.data.data;         
        vm.isLoading = false;
      });
    },

    openModal(isNew, item) {
      const vm = this;
      if (isNew) {
        vm.tempCoupons = {};
        vm.due_date = '';
        vm.due_time = '';
        vm.isNew = isNew;
      } else {
        vm.tempCoupons = { ...item };
        const dedlineAt = vm.tempCoupons.deadline.datetime.split(' ');
        [vm.due_date, vm.due_time] = dedlineAt; // 日期
      }
      $('#CouponsModal').modal('show');
    },

    updateCoupons() {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon`;
      let httpMethod = 'post';
      const vm = this;
      let status = '新增優惠卷成功';
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${vm.tempCoupons.id}`;
        httpMethod = 'patch';
        status = '更新優惠卷成功';
      }
      this.tempCoupons.deadline_at = `${this.due_date} ${this.due_time}`;
      console.log(this.tempCoupons.deadline_at);
      this.$http[httpMethod](api, vm.tempCoupons).then((response) => {
        $('#CouponsModal').modal('hide');
        this.$bus.$emit('webmessage',
          status,
          'success');         
        vm.getCoupons();
      }).catch((err) => {
        this.$bus.$emit('webmessage',
          `更新出錯`,
          'danger');  
      });
    },

    delModal(item) {
      this.tempCoupons = item;
      $('#deleteModal').modal('show');
    },
    deleteItem() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.tempCoupons.id}`;
      this.$http.delete(api).then((response) => {
        $('#deleteModal').modal('hide');
        vm.getCoupons();
      });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
