import {ref} from 'vue'
import {defineStore} from 'pinia'
import {Scatter} from "@/entities/echart/scatter/index.js";

export const useScatterStore = defineStore('scatter', () => {

    const scatter = ref({})
    const targetPoint = ref([])
    const addPoint = (positionPoint = [0, 0]) => {
        scatter.value.addPoint(positionPoint)
    }
    const getPoints = () => scatter.value.getPoints()
    const getTargetPoint = () => targetPoint.value
    const setTargetPoint = (point = [0, 0]) => targetPoint.value = point
    const deletePoint = (point = [0, 0]) => scatter.value.removePoint(point)
    const init = () => {
        scatter.value = new Scatter('circle', 'Terminal')
    }
    return {
        scatter,
        init,
        addPoint,
        getPoints,
        getTargetPoint,
        setTargetPoint,
        deletePoint

    }
})
