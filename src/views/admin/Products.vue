<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, onMounted, inject } from 'vue'
import axios from 'axios'
import Pagination from '../../components/admin/Pagination.vue'
import ProductModal from '../../components/admin/ProductModal.vue'
import DeleteModal from '../../components/admin/DeleteModal.vue'

const emitter = inject('emitter')
const products = ref([])
const pagination = ref({})
const tempProduct = ref({})
const modaltitle = ref('')
const isNew = ref(false)
const openProduct = ref(null)
const openDelete = ref(null)

onMounted(() => {
  getProduct()
})


const getProduct = (page = 1) => {
  emitter.emit("isLoading",true)
  const api = `${import.meta.env.VITE_APIPATH}/v2/api/${import.meta.env.VITE_UUID}/admin/products?page=${page}`
  axios.get(api).then((res) => {
    products.value = res.data.products
    pagination.value = res.data.pagination
    emitter.emit("isLoading",false)
  })
}
const getDetails = (item) => {
  emitter.emit("isLoading",true)
  tempProduct.value = item
  emitter.emit("isLoading",false)
  openProduct.value.show()
}
const delData = (item) => {
      const url = `${import.meta.env.VITE_APIPATH}/v2/api/${import.meta.env.VITE_UUID}/admin/product/${item.id}`
      axios.delete(url).then(() => {
        emitter.emit("webmessage",'此筆資料已經刪除', 'success')
        getProduct()
      })
      openDelete.value.hide()
    }
const openModal = (status, item) => {
  switch (status) {
    case 'new':
      modaltitle.value = '新增產品'
      tempProduct.value = {
        imageUrl: '',
        imagesUrl: []
      }
      isNew.value = true
      openProduct.value.show()
      break
    case 'edit':
      modaltitle.value = '編輯產品'
      isNew.value = false
      getDetails(item)
      break
    case 'delete':
      tempProduct.value = { ...item }
      openDelete.value.show()
      break
    default:
      break
  }
}

const updataItem = (item) => {
  let api = `${import.meta.env.VITE_APIPATH}/v2/api/${import.meta.env.VITE_UUID}/admin/product`
  let httpMethod = 'post'
  emitter.emit("isLoading",true)
    let status = '新增產品成功'
  if (!isNew.value) {
    httpMethod = 'put'
    api = `${import.meta.env.VITE_APIPATH}/v2/api/${import.meta.env.VITE_UUID}/admin/product/${
      item.id
    }`
    status = '更新產品成功'
  }
  axios[httpMethod](api, {data:item})
    .then(() => {
        emitter.emit("webmessage",status, 'success')
      getProduct()
      openProduct.value.hide()
    })
    .catch((err) => {
      emitter.emit("isLoading",false)
      openProduct.value.hide()
      emitter.emit("webmessage",`錯誤訊息: ${err.response.data.message}`, 'danger')
    })
}

const setProductPaid = (item) => {
  const url = `${import.meta.env.VITE_APIPATH}/v2/api/${import.meta.env.VITE_UUID}/admin/product/${
    item.id
  }`
  tempProduct.value = {...item}
  axios.put(url, {data:tempProduct.value}).then(() => {
    getProduct()
  })
}

</script>
<template>
  <div>
    <div class="text-end">
      <!-- Button trigger modal -->
      <button
        type="button"
        class="my-3 btn btn-primary"
        @click="openModal('new', true)"
      >
        新建產品
      </button>
    </div>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">分類</th>
          <th scope="col">產品名稱</th>
          <th scope="col">價格</th>
          <th scope="col">是否上架</th>
          <th scope="col">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in products" :key="item.id">
          <th scope="row">{{ key + 1 }}</th>
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.price }}</td>
          <td>
            <div class="form-check form-switch">
              <input
                :id="item.id"
                v-model="item.is_enabled"
                :true-value="1"
                :false-value="0"
                type="checkbox"
                class="form-check-input"
                @change="setProductPaid(item)"
              />
              <label class="form-check-label" :for="item.id">
                <strong v-if="item.is_enabled === 1" class="text-success">已上架</strong>
                <span v-else class="text-muted">尚未上架</span>
              </label>
            </div>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-outline-primary btn-sm mr-1"
              @click="openModal('edit', item)"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="openModal('delete', item)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :pages="pagination" @updatapage="getProduct" />
    <ProductModal :product="tempProduct" :title="modaltitle"
  @updata-item="updataItem" ref="openProduct"  />
    <DeleteModal :item="tempProduct" @del-data="delData" ref="openDelete" />

  </div>
</template>

<style scoped>
</style>