import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useStateStore = defineStore('stateStore', () => {
    const isLoading = ref(false)
    const modalSettings = ref({
        delete_route: {
            show: false
        }
    })
    const getModals = () => Object.keys(modalSettings.value)
    const getModal = (name) => {
        if (name in modalSettings.value) return modalSettings.value[name]
    }
    const toggleModal = (name) => {
        if (name in modalSettings.value) modalSettings.value[name].show = !modalSettings.value[name].show
    }
    return {
        isLoading,
        toggleModal,
        getModals,
        getModal,
    }
})
