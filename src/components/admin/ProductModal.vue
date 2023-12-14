<!-- eslint-disable vue/multi-word-component-names -->
<script setup>

import { ref, inject, computed, watch } from 'vue'
import axios from 'axios'
import { useModal } from '../../mixin/useModal.js'
const emitter = inject('emitter')
const props = defineProps(['product', 'title'])
const emit = defineEmits(['updataItem'])
const tempProduct = ref({})
const modaltitle = ref('')

const fileUploading = ref(false)
const file = ref(null)
const {modalWindow, modalshow, modalhide} = useModal()

const updataItem = () => {
  emit('updataItem', tempProduct.value)
}
tempProduct.value = props.product
modaltitle.value = props.title

defineExpose({ show: modalshow, hide:modalhide })

watch(
  () => props.product,
  (n, o) => {
    if(n.id !== o.id || n.is_enabled !== o.is_enabled) {
      tempProduct.value = n
      modaltitle.value = props.title
    }
  }
)


const isFormValid = computed(() => {
  return !!tempProduct?.value?.title && !!tempProduct?.value?.category
  && !!tempProduct?.value?.unit && !!tempProduct?.value?.origin_price
  && !!tempProduct?.value?.price
})

const uploadFile = () => {
  if(!tempProduct.value.imagesUrl) {
    tempProduct.value.imagesUrl = []
  }
  const uploadedFile = file.value.files[0]
  const formData = new FormData()
  formData.append('file', uploadedFile)
  const url = `${import.meta.env.VITE_APP_URL}/admin/upload`
  fileUploading.value = true
  axios
    .post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
      fileUploading.value = false
      if (res.data.success) {
        emitter.emit("webmessage",'圖片上傳成功', 'success')
        tempProduct.value.imagesUrl.push(res.data.imageUrl)
      }
    })
    .catch((err) => {
      console.log(err)
      emitter.emit("webmessage",'圖片上傳失敗，請確認上傳不可超過 2 MB', 'warning')
      fileUploading.value = false
    })
}

</script>

<template>
    <div
      class="modal fade"
      id="productModal"
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
            <form class="row justify-content-center">
              <div class="col-4">
                <div class="mt-2">
                  <label for="img">輸入主圖網址</label>
                  <input
                    id="img"
                    v-model="tempProduct.imageUrl"
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                  >
                </div>
                <div class="mt-2">
                  <label class="form-label" for="customFile">
                    上傳圖片
                    <i v-if="fileUploading" class="fas fa-spinner fa-spin" />
                  </label>
                  <input
                    id="customFile"
                    ref="file"
                    type="file"
                    class="form-control"
                    @change="uploadFile"
                  />
                </div>
                <div class="mt-4">
                  <div class="fs-6 text-danger my-2">主圖 (商品列表預覽圖片)</div>
                  <img class="img-fluid" :src="tempProduct.imageUrl || ''" style="width:200px; height:200px; object-fit:cover"  alt />
                </div>
              </div>
              <div class="col-8">
                <div class="mt-2">
                  <label class="form-label" for="title">標題
                    <span class="text-danger">(必填)</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="tempProduct.title"
                  />
                </div>

                <div class="row">
                  <div class="mt-2 col-md-6">
                    <label class="form-label" for="category">分類
                      <span class="text-danger">(必填)</span>
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                      v-model="tempProduct.category"
                    />
                  </div>
                  <div class="mt-2 col-md-6">
                    <label class="form-label" for="price">單位
                      <span class="text-danger">(必填)</span>
                    </label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                      v-model="tempProduct.unit"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="mt-2 col-md-6">
                    <label class="form-label" for="origin_price">原價
                      <span class="text-danger">(必填)</span>
                    </label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入原價"
                      v-model="tempProduct.origin_price"
                    />
                  </div>
                  <div class="mt-2 col-md-6">
                    <label class="form-label" for="price">售價
                      <span class="text-danger">(必填)</span>
                    </label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入售價"
                      v-model="tempProduct.price"
                    />
                  </div>
                </div>
                <hr />
                <div class="mt-2">
                    <label class="form-label" for="category">廣告分類
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      v-model="tempProduct.advertise"
                    />
                  </div>
                <div class="mt-2">
                  <label class="form-label" for="content">說明內容
                  </label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder=""
                    v-model="tempProduct.content"
                  ></textarea>
                </div>
                <div class="mt-2">
                  <label class="form-label" for="content">產品描述
                  </label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="請輸入產品描述"
                    v-model="tempProduct.description"
                  ></textarea>
                </div>
                <div class="mt-2">
                  <div class="form-check">
                    <input
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      class="form-check-input"
                      type="checkbox"
                      :true-value="1"
                      :false-value="0"
                    />
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
              <div class="col row justify-content-center">
                <div class="fs-6 text-danger my-2">已上傳的圖片，勾選設定主圖</div>
                <div class="row justify-content-center row-cols-3 g-3" >
                  <div class="row justify-content-center"
                  v-for="(images, i) in tempProduct.imagesUrl" :key="i">
                  <div class="form-check w-50">
                    <input class="form-check-input" type="radio" v-model="tempProduct.imageUrl" :value="images" name="flexRadioDefault" :id="i">
                    <label class="form-check-label" :for="i">
                      設為主圖
                    </label>
                  </div>
                    <img class="img-fluid" :src="tempProduct.imagesUrl[i]" style="width:200px; height:200px; object-fit:cover"  alt />
                  </div>

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
              >取消</button>
            <button type="submit" class="btn btn-primary"  @click="updataItem" :disabled="!isFormValid">確認</button>
          </div>
        </div>
      </div>
    </div>
</template>
