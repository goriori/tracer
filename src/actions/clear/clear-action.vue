<script setup>

import ClearButton from "@/components/ui/button/clear/clear-button.vue";
import {useTracerStore} from "@/store/tracerStore.js";
import {useCoordinatorStore} from "@/store/coordinatorStore.js";

const tracerStore = useTracerStore()
const coordinatorStore = useCoordinatorStore()
const emits = defineEmits(['clear'])
const onClick = () => {
  tracerStore.clear()
  coordinatorStore.clearCoordinates()
  emits('clear', 'clear_all')
}
</script>

<template>
  <ClearButton @click="onClick"/>
</template>

<style scoped lang="scss">

</style>