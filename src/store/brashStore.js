import {defineStore} from 'pinia'
import {ref} from 'vue'
import {Brush} from "@/entities/brush/index.js";

export const useBrashStore = defineStore('brash', () => {
    const brush = ref({})
    const init = () => {
        brush.value = new Brush()
    }
    const changeBrush = (type = brush.value.brushTypes[0]) => {
        brush.value.changeBrush(type)
    }
    const changeColor = (color) => {
        brush.value.changeColor(color)
    }
    const getBrush = () => brush.value.getBrush()
    const getColor = () => brush.value.getColor()
    return {
        brush,
        init,
        changeBrush,
        changeColor,
        getBrush,
        getColor
    }
})
