<!-- eslint-disable vue/multi-word-component-names -->
<script setup>

import { ref, watch } from 'vue'
import { useModal } from '../../mixin/useModal.js'
import { useDate } from '../../mixin/useDate.js'
const props = defineProps(['coupon', 'title'])
const emit = defineEmits(['updataItem'])
const { toDate } = useDate()
const due_date = ref(null)
const tempCoupon = ref({
        title:'',
        code:'',
        due_date:'',
        is_enabled:0,
        percent:0
      })
const modaltitle = ref('')


const {modalWindow, modalshow, modalhide} = useModal()

const updataItem = () => {
    tempCoupon.value = {
        ...tempCoupon.value,
        due_date:due_date.value
    }
  emit('updataItem', tempCoupon.value)
}
tempCoupon.value = props.coupon
modaltitle.value = props.title

defineExpose({ show: modalshow, hide:modalhide })

watch(
  () => props.coupon,
  (n, o) => {
    if(n.id !== o.id || n.is_enabled !== o.is_enabled) {
      tempCoupon.value = n
      modaltitle.value = props.title
      if(tempCoupon.value.due_date !== '') {
        due_date.value = toDate(tempCoupon.value.due_date)
      } else {
        due_date.value =''
      }

    }
  }
)

</script>

<template>
    <div
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
            <button type="submit" class="btn btn-primary"  @click="updataItem" >確認</button>
          </div>
        </div>
      </div>
    </div>
</template>
