import {defineStore} from 'pinia'
import {ref} from 'vue'
import {Tracer} from "@/entities/tracer/index.js";

export const useTracerStore = defineStore('tracer', () => {

    const tracer = ref({})

    const getStateTracer = () => tracer.value.drawing
    const getStateTracerScattering = () => tracer.value.scattering
    const init = () => tracer.value = new Tracer()

    const startDraw = () => tracer.value.startDraw()
    const startScatter = () => tracer.value.startScatter()
    const stopDraw = () => tracer.value.stopDraw()
    const stopScatter = () => tracer.value.stopScatter()
    const clear = () => tracer.value.clear()
    const draw = (type, object, coordinates) => tracer.value.draw(type, object, coordinates)

    const backStep = () => tracer.value.backStep()

    const getHistory = () => tracer.value.getHistory()

    return {
        tracer,
        getStateTracer,
        getStateTracerScattering,
        init,
        startDraw,
        startScatter,
        stopDraw,
        stopScatter,
        clear,
        draw,
        backStep,
        getHistory

    }
})
