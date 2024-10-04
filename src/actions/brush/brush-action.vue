<script setup>

import BrushDropDown from "@/components/ui/drop-down/brush/brush-drop-down.vue";
import {useApplicationStore} from "@/store/applicationStore.js";
import {useBrashStore} from "@/store/brashStore.js";

const brushStore = useBrashStore()
const emits = defineEmits(['change-brush'])

const changeEvents = {
  dashed: (brush) => changeBrushHandler(brush),
  dotted: (brush) => changeBrushHandler(brush),
  solid: (brush) => changeBrushHandler(brush)
}

const changeBrushHandler = (brush) => {
  brushStore.changeBrush(brush)
  emits('change-brush', 'change_brush')
}
const changeBrush = (brush) => {
  if (!changeEvents[brush]) return false
  return changeEvents[brush](brush)
}

</script>

<template>
  <BrushDropDown title="Выбрать кисть" @change-brush="changeBrush"/>
</template>

<style scoped lang="scss">

</style>