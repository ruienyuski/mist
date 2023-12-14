<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, watch } from 'vue'
import { useDeleteModal } from '../../mixin/useDeleteModal.js'

const props = defineProps(['item'])
const emit = defineEmits(['delData'])
const {modalWindowDelete, modalDelshow, modalDelhide} = useDeleteModal()
const tempData = ref({})
tempData.value = props.item

const delData = () => {
  emit('delData', tempData.value)
}

defineExpose({ show: modalDelshow, hide:modalDelhide })

watch(
  () => props.item,
  (n, o) => {
    if(n.id !== o.id) {
        tempData.value = n
    }
  }
)

</script>

<template>
    <div class="modal fade" id="delModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modalWindowDelete">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除資料</span>
            </h5>
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempData.title }}</strong> 商品(刪除後將無法恢復)。
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
    </div>
</template>
