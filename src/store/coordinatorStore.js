import {defineStore} from 'pinia'
import {ref} from 'vue'
import {Coordinator} from "@/entities/coordinator/index.js";

export const useCoordinatorStore = defineStore('coordinator', () => {

    const coordinator = ref({})
    const init = () => coordinator.value = new Coordinator()
    const addCoordinate = (name, coordinate) => coordinator.value.addCoordinate(name, coordinate)
    const clearCoordinates = (name) => coordinator.value.clearCoordinates()
    const getCoordinates = (name) => coordinator.value.getCoordinates(name)
    const getCoordinateOption = (name) => coordinator.value.getCoordinateOption(name)
    const getCoordinateAll = () => coordinator.value.getCoordinateAll()
    const deleteCoordinatesObject = (name) => coordinator.value.deleteCoordinatesObject(name)
    const setOptionCoordinate = (name, option) => coordinator.value.setOptionCoordinate(name, option)
    return {
        coordinator,
        init,
        getCoordinates,
        addCoordinate,
        clearCoordinates,
        getCoordinateAll,
        getCoordinateOption,
        deleteCoordinatesObject,
        setOptionCoordinate,
    }
})
