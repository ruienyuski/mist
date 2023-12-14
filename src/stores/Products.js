import { ref, inject } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('products', () => {
    const emitter = inject('emitter')
    const products = ref([])
    const getData = () => {
      emitter.emit("isLoading",true)
      const api = `${import.meta.env.VITE_APP_URL}/products/all`
      axios.get(api).then((res) => {
        products.value = res.data.products
        emitter.emit("isLoading",false)
      })
    }
      return {
        getData, products
      }
})