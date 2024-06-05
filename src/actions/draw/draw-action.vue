<script setup>

import PaintButton from "@/components/ui/button/paint/paint-button.vue";
import {ref} from "vue";

const emits = defineEmits(["start-drawing", 'stop-drawing'])
const isDrawing = ref(false)
const onStartDrawing = () => {
  isDrawing.value = true
  emits('start-drawing', 'start_drawing')
}
const onStopDrawing = () => {
  isDrawing.value = false
  emits('stop-drawing', 'stop_drawing')
}
const onClick = () => {
  if (isDrawing.value) onStopDrawing()
  else onStartDrawing()
}
</script>

<template>
  <PaintButton @click="onClick" :class="[isDrawing? 'active':'']"/>
</template>

<style scoped lang="scss">
.active {
  background: red;
}
</style>