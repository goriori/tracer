import {defineStore} from "pinia";
import {ref} from "vue";
import {Lines} from "@/entities/echart/lines/index.js";


export const useLineStore = defineStore('line', () => {
    const line = ref()

    const getLine = () => line.value
    const init = () => {
        line.value = new Lines([[0, 0], [0, 0]], 'Way')
    }

    return {
        getLine,
        init
    }
})