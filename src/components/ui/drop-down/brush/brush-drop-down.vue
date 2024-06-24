<script setup>

import DropDown from "@/components/ui/drop-down/drop-down.vue";
import DottedButton from "@/components/ui/button/dotted/dotted-button.vue";
import DashedButton from "@/components/ui/button/dashed/dashed-button.vue";
import SolidButton from "@/components/ui/button/solid/solid-button.vue";
import {markRaw, onMounted, ref} from "vue";


const emits = defineEmits(['change-brush'])
const list = [markRaw(DottedButton), markRaw(DashedButton), markRaw(SolidButton)]
const brushesEvents = ref({})

const onChange = (element) => {
  return brushesEvents.value[element.__name]()
}

const initEvents = () => {
  const events = {}
  list.forEach(brushButton => {
    const eventName = brushButton.__name
    const brush = eventName.split('-')[0]
    events[eventName] = () => emits('change-brush', brush)

  })
  return events
}

onMounted(() => {
  brushesEvents.value = initEvents()
  console.log(brushesEvents.value)
})
</script>

<template>
  <DropDown :list="list" @change="onChange"/>
</template>

<style scoped lang="scss">

</style>