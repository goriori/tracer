<script setup>

import AddPoint from "@/components/ui/button/add-point/AddPoint.vue";
import {useTracerStore} from "@/store/tracerStore.js";

const emits = defineEmits(['point'])
const tracerStore = useTracerStore()
const createPoint = () => {
  if (tracerStore.getStateTracerScattering()) {
    tracerStore.stopScatter()
    emits('point', 'stop_create_point')
  } else {
    tracerStore.startScatter()
    emits('point', 'start_create_point')
  }

}
</script>

<template>
  <AddPoint @click="createPoint" :class="tracerStore.getStateTracerScattering()? 'active': ''"/>
</template>

<style scoped lang="scss">
.active {
  background-color: red;
}
</style>