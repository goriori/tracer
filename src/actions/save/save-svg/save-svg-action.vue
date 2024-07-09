<script setup>

import SaveButton from "@/components/ui/button/save/save-button.vue";
import {useApplicationStore} from "@/store/applicationStore.js";
import {useStateStore} from "@/store/stateStore.js";
import {convertToDomElement} from "@/utils/helpers/convertDomElement.js";
import {SaverSvgTracker} from "@/entities/saver-tracker/saver-svg-tracker/index.js";

const applicationStore = useApplicationStore();
const emits = defineEmits(['save']);
const save = () => {
  const svgElement = convertToDomElement(applicationStore.svgMap.mapSvgText, 'image/svg+xml')
  const saverSvg = new SaverSvgTracker()
  saverSvg.save(applicationStore.svgMap.mapSvgText)
  emits('save', 'save_svg');
}
</script>

<template>
  <SaveButton @click="save"/>
</template>

<style scoped lang="scss">

</style>