import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useStateStore = defineStore('stateStore', () => {
    const isLoading = ref(false)
    const modalSettings = ref({
        delete_route: {
            show: false
        },
        info_editor: {
            show: !JSON.parse(localStorage.getItem('checkAppointment'))
        },
        delete_scatter: {
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
