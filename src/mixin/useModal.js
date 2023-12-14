import { ref, onMounted  } from "vue"
import Modal from 'bootstrap/js/dist/modal'
export function useModal(){
    const AddEditModal = ref({})
    const modalWindow = ref(null)

    onMounted(() => {
        AddEditModal.value = new Modal(modalWindow.value)
        })
    const modalshow = () => {
        AddEditModal.value.show()
    }
    const modalhide = () => {
        AddEditModal.value.hide()
    }

    return {
        modalWindow,
        modalshow,
        modalhide,
    }
}