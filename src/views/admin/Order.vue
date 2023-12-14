<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, onMounted, inject } from 'vue'
import axios from 'axios'
import Pagination from '../../components/admin/Pagination.vue'
import OrderModal from '../../components/admin/OrderModal.vue'
import DeleteModal from '../../components/admin/DeleteModal.vue'
import {useDate} from '../../mixin/useDate.js'

const emitter = inject('emitter')
const { toDate } = useDate()
const orders = ref([])
const pagination = ref({})
const modaltitle = ref('')
const tempOrder = ref({
  user: {
    name:'',
    email:'',
    address:'',
    tel:''
  },
  coupon: {
    code:'',
    title:'',
    percent: '',
    enabled: '',
    deadline_at:''
  }
})
const openOrder = ref(null)
const openDelete = ref(null)

onMounted(() => {
  getOrder()
})

const getOrder = (page = 1) => {
  emitter.emit('isLoading', true)
  const api = `${import.meta.env.VITE_APIPATH}/v2/api/${
    import.meta.env.VITE_UUID
  }/admin/orders?page=${page}`
  axios.get(api).then((res) => {
    orders.value = res.data.orders
    pagination.value = res.data.pagination
    emitter.emit('isLoading', false)
  })
}

const getDetails = (item) => {
  emitter.emit('isLoading', true)
  tempOrder.value = item
  emitter.emit('isLoading', false)
  openOrder.value.show()
}

const delData = () => {
      const url = `/apipath/admin/order/${tempOrder.value.id}`
      axios.delete(url).then(() => {
        emitter.emit("webmessage",'此筆資料已經刪除', 'success')
        getOrder()
      })
      openDelete.value.hide()
    }

const openModal = (status, item) => {
  switch (status) {
    case 'edit':
      modaltitle.value = '訂單資訊'
      getDetails(item)
      break
    case 'delete':
      tempOrder.value = { ...item }
      openDelete.value.show()
      break
    default:
      break
  }
}

const updataItem = (item) => {
  const url = `/apipath/admin/order/${item.id}`

  axios.put(url, {data:item}).then((res) => {
    emitter.emit('webmessage', res.data.message, 'success')
    getOrder()
    openOrder.value.hide()
  })
}

</script>

<template>
  <div>
    <table class="table mt-5">
      <thead class="thead-dark">
        <tr>
          <th>#</th>
          <th>訂單日期</th>
          <th>客戶名稱</th>
          <th>購買產品</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th scope="col">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in orders" :key="item.id">
          <th scope="row">{{ key + 1 }}</th>
          <td >{{ toDate(item.create_at) }}</td>
          <td>{{ item.user.name }}</td>
          <td>
            <p v-for="(i, key) in item.products" :key="key">
              {{ i.product.title }} 【{{ i.qty }} {{ i.product.unit }}】
            </p>
          </td>
          <td class="text-right">
            {{ item.total }}
            <!-- <div class="text-danger" v-if="item?.coupon?.title">(優惠價)</div> -->
          </td>
          <td>
            <div class="custom-control custom-switch">
              <strong v-if="item.is_paid" class="text-success">已付款</strong>
                <span v-else class="text-danger">尚未付款</span>
            </div>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-outline-primary btn-sm mr-1"
              data-toggle="modal"
              @click="openModal('edit', item)"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              data-toggle="modal"
              @click="openModal('delete', item)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @updatapage="getOrder"></Pagination>
    <OrderModal :order="tempOrder" :title="modaltitle"
  @updata-item="updataItem" ref="openOrder"  />
    <DeleteModal :item="tempOrder" @del-data="delData" ref="openDelete" />
  </div>
</template>
