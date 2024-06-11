import {defineStore} from 'pinia'
import {ref} from 'vue'
import {Tracer} from "@/entities/tracer/index.js";

export const useTracerStore = defineStore('tracer', () => {

    const tracer = ref({})

    const getStateTracer = () => tracer.value.drawing
    const init = () => tracer.value = new Tracer()

    const start = () => tracer.value.start()

    const stop = () => tracer.value.stop()

    const clear = () => tracer.value.clear()
    const draw = (type, object, coordinates) => tracer.value.draw(type, object, coordinates)
    const getHistory = () => tracer.value.getHistory()
    return {
        tracer,
        getStateTracer,
        init,
        start,
        stop,
        clear,
        draw,
        getHistory
    }
})
