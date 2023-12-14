import { ref, inject } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useCartStore = defineStore('cart', () => {
    const emitter = inject('emitter')
    const cart = ref({})
    const cartTotal = ref(0)
    const cartFinalTotal = ref(0)
    const loadingItem = ref('')
    const getCart = () => {
        emitter.emit("isLoading",true)
          const api = `/apipath/cart`
          axios.get(api).then((res) => {
            // eslint-disable-next-line
            cart.value = res.data.data.carts
            cartTotal.value = res.data.data.total
            cartFinalTotal.value = res.data.data.final_total
            emitter.emit("isLoading",false)
          })
        }

        const addToCart = (item, quantity = 1) => {
            loadingItem.value = item.id
            const api = `/apipath/cart`
            const sendData = {
              product_id: item.id,
              qty:quantity,
            }
            axios.post(api, {data:sendData}).then((res) => {
              loadingItem.value = ''
              emitter.emit("cart_num")
              emitter.emit("webmessage",res.data.message, 'success')
              getCart()
            })
          }

      return {
        getCart, cart, cartTotal, cartFinalTotal, addToCart,loadingItem
      }
})