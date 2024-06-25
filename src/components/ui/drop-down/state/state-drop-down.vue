<script setup>

import DropDown from "@/components/ui/drop-down/drop-down.vue";
import {markRaw} from "vue";
import SvgButton from "@/components/ui/button/svg/svg-button.vue";
import MapButton from "@/components/ui/button/map/map-button.vue";

const emits = defineEmits(['change-state-editor'])
const list = [markRaw(SvgButton), markRaw(MapButton)]
const stateEvents = {
  svg: () => emits('change-state-editor', 'svg_editor'),
  map: () => emits('change-state-editor', 'tracer')
}
const onChange = (element) => {
  const elementName = element.__name
  const nameEvent = elementName.split('-')[0]
  return stateEvents[nameEvent]()
}
</script>

<template>
  <DropDown :list="list" @change="onChange"/>
</template>

<style scoped lang="scss">

</style>