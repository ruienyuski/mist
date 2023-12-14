import { useRouter } from 'vue-router'
import { ref } from 'vue'
import axios from 'axios'
export function useToken(){
    const router = useRouter()
    const checkSuccess = ref(false)
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
        axios.defaults.headers.common.Authorization = token
        const api = `${import.meta.env.VITE_APIPATH}/v2/api/user/check`
        axios.post(api).then((res) => {
          if (!res.data.success) {
            router.push('/login')
          } else {
            checkSuccess.value = true
          }
        }).catch(() => {
          router.push('/')
        })
        return {
            checkSuccess
        }
}