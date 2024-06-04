import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStateStore = defineStore('stateStore', () => {
  const isLoading = ref(false)
  const coordinates  = ref([])
  return {
    isLoading,
    coordinates,
  }
})
