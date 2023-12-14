<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, onMounted, inject } from 'vue'
import axios from 'axios'
import {useDate} from '../../mixin/useDate.js'
import Pagination from '../../components/admin/Pagination.vue'
import CouponModal from '../../components/admin/CouponModal.vue'
import DeleteModal from '../../components/admin/DeleteModal.vue'
const emitter = inject('emitter')
const { toDate } = useDate()
const pagination = ref({})
const modaltitle = ref('')
  const coupons = ref([])
  const tempCoupon = ref({})
  const due_date = ref(null)
  const isNew = ref(false)
  const openCoupon = ref(null)
  const openDelete = ref(null)

onMounted(() => {
  getCoupons()
})
const getCoupons = (page = 1) => {
      const api = `${import.meta.env.VITE_APIPATH}/v2/api/${
    import.meta.env.VITE_UUID
  }/admin/coupons?page=${page}`
      emitter.emit('isLoading', true)
      axios.get(api).then((res) => {
        coupons.value = res.data.coupons
        pagination.value = res.data.pagination
        emitter.emit('isLoading', false)
      })
    }
    const delData = () => {
      const url = `/apipath/admin/coupon/${tempCoupon.value.id}`
      axios.delete(url).then(() => {
        emitter.emit("webmessage",'此筆資料已經刪除', 'success')
        getCoupons()
      })
      openDelete.value.hide()
    }
    const openModal = (status, item) => {
      switch (status) {
    case 'new':
      modaltitle.value = '新增優惠卷'
      tempCoupon.value = {
        title:'',
        code:'',
        due_date:'',
        is_enabled:0,
        percent:0
      }
      isNew.value = true
      openCoupon.value.show()
      break
    case 'edit':
      modaltitle.value = '編輯優惠卷'
      isNew.value = false
      tempCoupon.value = { ...item }
      due_date.value = toDate(tempCoupon.value.due_date)
      openCoupon.value.show()
      break
    case 'delete':
      tempCoupon.value = { ...item }
      openDelete.value.show()
      break
    default:
      break
  }
}

  const updataItem = (item) => {

      let api = `${import.meta.env.VITE_APIPATH}/v2/api/${
    import.meta.env.VITE_UUID
  }/admin/coupon`
      let httpMethod = 'post'
      let status = '新增優惠卷成功'
      if (!isNew.value) {
        api = `${import.meta.env.VITE_APIPATH}/v2/api/${
    import.meta.env.VITE_UUID
  }/admin/coupon/${item.id}`
        httpMethod = 'put'
        status = '更新優惠卷成功'
      }
      tempCoupon.value = {
        ...tempCoupon.value,
        due_date:Math.floor(new Date(item.due_date) / 1000),
      }

      axios[httpMethod](api, {data:tempCoupon.value}).then(() => {
        openCoupon.value.hide()
        emitter.emit("webmessage",status, 'success')
        getCoupons()
      }).catch(() => {
        openCoupon.value.hide()
        emitter.emit("webmessage",'更新出錯', 'warning')
      })
    }
</script>

<template>
  <div>
    <div class="text-end">
      <button class="btn btn-primary"
      @click="openModal('new')"
      data-toggle="modal"
      data-target="#CouponsModal">建立新的優惠卷</button>
    </div>
    <table class="table mt-4">
      <thead class="thead-dark">
        <tr>
        <th>名稱</th>
        <th width="120">折扣百分比</th>
        <th width="150">到期日</th>
        <th width="150">是否啟用</th>
        <th width="150">編輯</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(item,key) in coupons" :key="key">
          <td>{{item.title}}</td>
          <td>
            {{item.percent}} %
          </td>
          <td>
            {{toDate(item.due_date) }}
          </td>
          <td>
            <span class="text-success" v-if="item.is_enabled === 1">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button
            class="btn btn-outline-primary btn-sm" @click="openModal('edit',item)">編輯</button>
            <button
            class="btn btn-outline-primary btn-sm" @click="openModal('delete', item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @updatapage="getCoupons"></Pagination>
    <CouponModal :coupon="tempCoupon" :title="modaltitle"
  @updata-item="updataItem" ref="openCoupon"  />
    <DeleteModal :item="tempCoupon" @del-data="delData" ref="openDelete" />
    <!-- 編輯Modal -->
    <!-- <div
      class="modal fade"
      id="CouponModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref="modalWindow"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{ modaltitle }}</span>
            </h5>
            <div data-bs-theme="dark">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
          </div>
          <div class="modal-body">
            <form>
              <div class="row row-cols-2">
                <div class="mt-2 col">
                  <label class="form-label" for="title"
                    >名稱
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="優惠卷名稱"
                    v-model="tempCoupon.title"
                  />
                </div>
                <div class="mt-2 col">
                  <label class="form-label" for="code"
                    >優惠碼
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="code"
                    placeholder="請輸入優惠碼"
                    v-model="tempCoupon.code"
                  />
                </div>
                <div class="mt-2">
                  <label class="form-label" for="percent"
                    >折扣百分比
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="percent"
                    placeholder="請輸入折扣百分比"
                    v-model.number="tempCoupon.percent"
                  />
                </div>
                <div class="mt-2">
                  <label class="form-label" for="due_date"
                    >到期日
                  </label>
                  <input
                    type="date"
                    class="form-control"
                    id="due_date"
                    placeholder="請選擇到期日"
                    v-model="due_date"
                  />
                </div>
              </div>
              <hr />
              <div class="mt-4">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    v-model="tempCoupon.is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-check-label" for="is_enabled">是否啟用
                    <span class="text-danger">(勾選更新狀態)</span>
                  </label>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
            取消
            </button>
            <button type="submit" class="btn btn-primary"  @click="updateCoupon" >確認</button>
          </div>
        </div>
      </div>
    </div> -->
    <!-- 刪除 Modal -->
    <!-- <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modalWindowDelete">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
                type="button"
                class="btn btn-outline-secondary"
                data-bs-dismiss="modal"
                aria-label="Close"
              >取消</button>
            <button type="button" class="btn btn-danger" @click="delData"
              >確認刪除</button>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
