<template>
  <div>
    <loading :active.sync="isLoading" :zIndex="999"></loading>
    <table class="table mt-5">
      <thead class="thead-dark">
        <tr>
          <th>#</th>
          <th>訂單日期</th>
          <th>購買產品</th>
          <th>付款方式</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <!-- <th scope="col">編輯</th>       -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,key) in orders" :key="key">
          <th scope="row">{{key}}</th>
          <td>{{item.created.datetime}}</td>
          <td><p v-for="(i,key) in item.products" :key="key">{{i.product.title}} 【{{i.quantity}} {{i.product.unit}}】</p></td>
          <td>
            {{ item.payment }}
          </td>
          <td class="text-right">
            {{ item.amount }}
          </td>
          <td>
            <div class="custom-control custom-switch">
              <input
                :id="item.id"
                v-model="item.paid"
                type="checkbox"
                class="custom-control-input"
                @change="setOrderPaid(item)"
              >
              <label
                class="custom-control-label"
                :for="item.id"
              >
                <strong
                  v-if="item.paid"
                  class="text-success"
                >已付款</strong>
                <span
                  v-else
                  class="text-muted"
                >尚未付款</span>
              </label>
            </div>
            <!-- <span class="text-success" v-if="item.paid">是</span>
            <span class="text-danger" v-else>否</span>             -->
          </td>
          <!-- <td>
            <button type="button" class="btn btn-success" data-toggle="modal" data-target="#productModal" @click="openModal(item.id)">編輯</button>
          </td> -->
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @updatepage="getOrder"></Pagination>

  </div>
</template>

<script>
import Pagination from '@/components/admin/Pagination.vue';

export default {
  data() {
    return {
      orders: [],
      pagination: {},
      status: {
        loadingItem: '',
      },
      tempOrder: {
        id: '',
        products: {},
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      isLoading: false,
    };
  },
  components: {
    Pagination,
  },
  methods: {
    getOrder(page = 1) {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders?page=${page}`;
      this.$http.get(api).then((res) => {
        this.orders = res.data.data;
        this.pagination = res.data.meta.pagination;
        this.isLoading = false;
      });
    },
    openModal(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${id}`;
      this.$http.get(api).then((res) => {
        this.tempOrder = res.data.data;
        $('#orderModal').modal('show');
      });
    },
    // updataItem() {
    //   const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${this.tempOrder.id}`;
    //   this.$http.patch(api, {data: this.tempOrder}).then((res) => {
    //     console.log(res)
    //     this.getOrder();
    //   });
    //   $('#orderModal').modal('hide');

    // },
    setOrderPaid(item) {
      let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/paid`;
      if (!item.paid) {
        url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/unpaid`;
      }
      this.$http.patch(url, item.id).then(() => {
        this.getOrder();
      });
    },
  },
  created() {
    this.getOrder();
  },
};
</script>
