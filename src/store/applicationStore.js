import {defineStore} from 'pinia'
import {ref} from 'vue'
import {Brush} from "@/entities/brush/index.js";
import {MapSVG} from "@/entities/map/index.js";

export const useApplicationStore = defineStore('application', () => {
    const svgMap = ref(null)
    const downloadSvg = (mapSvgText = '') => {
        svgMap.value = new MapSVG('tracer', mapSvgText)
    }
    const getMapSvg = () => {
        return svgMap.value
    }
    return {
        svgMap,
        downloadSvg,
        getMapSvg
    }
})
