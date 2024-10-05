import {ref} from "vue";

export const useKeypress = () => {
    const keys = ref({})

    const addKeyEvent = (key = '', event = () => {
    }) => {
        keys.value[key] = event
        deleteEventKeypress()
        createEventKeypress()
    }
    const deleteKeyEvent = (key = '') => {
        delete keys.value[key]
    }
    const keypressHandler = (event) => {
        console.log(event)
        if (event.key in keys.value) keys.value[event.key]()
    }

    const createEventKeypress = () => {
        console.log(keys.value)
        window.addEventListener('keypress', keypressHandler)
    }

    const deleteEventKeypress = () => {
        window.removeEventListener('keypress', keypressHandler)
    }

    return {
        addKeyEvent,
        deleteKeyEvent
    }
}