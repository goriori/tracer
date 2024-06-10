import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useRegionStore = defineStore('regions', () => {

    const regions = ref([])
    const targetRegion = ref({})

    const setRegion = (region) => {
        targetRegion.value = region
    }
    const addRegion = (region) => {
        regions.value.push(region)
    }
    const getTargetRegion = () => {
        return targetRegion.value
    }
    const getRegions = () => {
        return regions.value
    }

    return {
        regions,
        targetRegion,
        setRegion,
        addRegion,
        getRegions,
        getTargetRegion
    }
})
