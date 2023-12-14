import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFavStore = defineStore('fav', () => {
    const favorited = ref(JSON.parse(localStorage.getItem('favorite')) || [])
    const setFav = (id) => {
      let index = favorited.value.findIndex((el) => {
        return id === el
      })
      if(favorited.value.indexOf(id) < 0) {
        favorited.value.push(id)
      } else {
        favorited.value.splice(index, 1)
      }
      localStorage.setItem('favorite', JSON.stringify(favorited.value))
    }

    const favState = computed(() => {
      return function(id) {
        if(favorited.value.indexOf(id) > -1) {
          return 'favorite'
        } else {
          return 'favorite_border'
        }
      }
    })

      return {
        setFav,favorited, favState
      }
})