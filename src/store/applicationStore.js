import {defineStore} from 'pinia'
import {ref} from 'vue'
import {MapSVG} from "@/entities/map/index.js";
import {Tracer} from "@/entities/tracer/index.js";
import {Coordinator} from "@/entities/coordinator/index.js";

export const useApplicationStore = defineStore('application', () => {
    const tracer = ref(null)
    const coordinator = ref(null)
    const targetMap = ref(null)
    const targetElement = ref(null)
    const targetRegion = ref(null)

    const downloadSvg = async (svg) => {
        targetMap.value = new MapSVG('tracer-map', svg)
    }

    const initElement = async (element) => {
        targetElement.value = element
    }

    const initTracer = () => {
        if (targetMap.value) {
            console.log('init tracer', targetMap.value)
            tracer.value = new Tracer(targetElement.value, targetMap.value)
            tracer.value.init()
        }
        return tracer.value
    }

    const initCoordinator = () => {
        coordinator.value = new Coordinator()
        return coordinator.value
    }

    const initRegion = (region) => {
        if (targetMap.value) {
            targetRegion.value = region
        }
    }

    return {
        targetMap,
        targetElement,
        targetRegion,
        downloadSvg,
        initElement,
        initTracer,
        initCoordinator,
        initRegion,
    }
})
