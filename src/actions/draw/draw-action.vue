<script setup>

import {ref} from "vue";
import {useTracerStore} from "@/store/tracerStore.js";
import PaintButton from "@/components/ui/button/paint/paint-button.vue";
import {useApplicationStore} from "@/store/applicationStore.js";
import {useRegionStore} from "@/store/regionStore.js";

const tracerStore = useTracerStore()
const applicationStore = useApplicationStore()
const regionStore = useRegionStore()
const emits = defineEmits(["start-drawing", 'stop-drawing'])

const isDrawing = ref(false)

const onStartDrawing = () => {
  isDrawing.value = true
  tracerStore.start()
  emits('start-drawing', 'start_drawing')
}
const onStopDrawing = () => {
  isDrawing.value = false
  tracerStore.stop()
  emits('stop-drawing', 'stop_drawing')
}
const onClick = () => {
  const haveMap = applicationStore.getMapSvg()
  if (haveMap) {
    const haveTargetObject = Object.keys(regionStore.getTargetRegion()).length > 0
    if (isDrawing.value) {
      onStopDrawing()
    } else if (!haveTargetObject) {
      alert('Чтобы начать рисовать, выберите объект на карте')
    } else {
      onStartDrawing()
    }
  } else {
    alert('Чтобы начать рисовать, необходимо загрузить карту')
  }

}
</script>

<template>
  <PaintButton  @click="onClick" :class="[isDrawing? 'active':'']"/>
</template>

<style scoped lang="scss">
.active {
  background: red;
}
</style>