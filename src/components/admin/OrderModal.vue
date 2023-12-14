<!-- eslint-disable vue/multi-word-component-names -->
<script setup>

import { ref, watch } from 'vue'
import { useModal } from '../../mixin/useModal.js'
const props = defineProps(['order', 'title'])
const emit = defineEmits(['updataItem'])
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
const modaltitle = ref('')


const {modalWindow, modalshow, modalhide} = useModal()

const updataItem = () => {
  emit('updataItem', tempOrder.value)
}
tempOrder.value = props.order
modaltitle.value = props.title

defineExpose({ show: modalshow, hide:modalhide })

watch(
  () => props.order,
  (n, o) => {
    if(n.id !== o.id || n.is_enabled !== o.is_enabled) {
      tempOrder.value = n
      modaltitle.value = props.title
    }
  }
)


</script>

<template>
    <div
      class="modal fade"
      id="orderModal"
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
                    >客戶名稱
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="客戶名稱"
                    v-model="tempOrder.user.name"
                  />
                </div>
                <div class="mt-2 col">
                  <label class="form-label" for="email"
                    >Email
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="Email"
                    v-model="tempOrder.user.email"
                  />
                </div>
                <div class="mt-2">
                  <label class="form-label" for="tel"
                    >電話
                  </label>
                  <input
                    type="tel"
                    class="form-control"
                    id="tel"
                    placeholder="電話"
                    v-model="tempOrder.user.tel"
                  />
                </div>
                <div class="mt-2">
                  <label class="form-label" for="address"
                    >地址
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="address"
                    placeholder="地址"
                    v-model="tempOrder.user.address"
                  />
                </div>
              </div>
              <hr />

              <div class="mt-2">
                <ul class="list-group">
                  <li class="list-group-item active" aria-current="true">購買項目</li>
                  <li class="list-group-item" v-for="(item, key) in tempOrder.products" :key="key">
                    {{ item.product.title }} x {{ item.qty }}
                  </li>
                </ul>
              </div>
              <div class="mt-2">
                <ul class="list-group" v-if="tempOrder?.coupon?.title">
                  <li class="list-group-item active" aria-current="true">優惠卷</li>
                  <li class="list-group-item">活動：{{ tempOrder?.coupon?.title }}</li>
                  <li class="list-group-item">折扣：{{ tempOrder?.coupon?.percent }} </li>
                </ul>
              </div>

              <hr />
              <div class="mt-2">
                    <label class="form-label" for="amount">應付金額</label>
                    <input
                      type="number"
                      class="form-control"
                      id="amount"
                      placeholder="應付金額"
                      :value="tempOrder.total"
                      disabled
                    />
                </div>
              <div class="mt-4">
                <div class="form-check">
                  <input
                    id="is_paid"
                    v-model="tempOrder.is_paid"
                    class="form-check-input"
                    type="checkbox"
                  />
                  <label class="form-check-label" for="is_paid">是否付款
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
            <button type="submit" class="btn btn-primary"  @click="updataItem" >確認</button>
          </div>
        </div>
      </div>
    </div>
</template>
