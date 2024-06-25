import {defineStore} from 'pinia'
import {ref} from 'vue'
import {Brush} from "@/entities/brush/index.js";
import {MapSVG} from "@/entities/map/index.js";

export const useApplicationStore = defineStore('application', () => {
    const STATES = ['tracer', 'svg_editor']
    const svgMap = ref(null)
    const editorState = ref(STATES[0])
    const downloadSvg = (svg) => {
        svgMap.value = new MapSVG('tracer', svg)
    }
    const getMapSvg = () => {
        return svgMap.value
    }
    const getStateEditor = () => editorState.value
    const changeStateEditor = (state = STATES[0]) => editorState.value = state
    return {
        svgMap,
        downloadSvg,
        getMapSvg,
        getStateEditor,
        changeStateEditor
    }
})
