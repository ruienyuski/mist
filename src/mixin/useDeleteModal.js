import { ref, onMounted  } from "vue"
import Modal from 'bootstrap/js/dist/modal'
export function useDeleteModal(){

    const DelModal = ref({})
    const modalWindowDelete = ref(null)

    onMounted(() => {
        DelModal.value = new Modal(modalWindowDelete.value)
        })

    const modalDelshow = () => {
        DelModal.value.show()
    }
    const modalDelhide = () => {
        DelModal.value.hide()
    }
    return {
        modalWindowDelete,
        modalDelshow,
        modalDelhide
    }
}