<script setup>

import SaveButton from "@/components/ui/button/save/save-button.vue";
import {SaverJsonTracker} from "@/entities/saver-tracker/saver-json-tracker/index.js";
import {useApplicationStore} from "@/store/applicationStore.js";
import {useRegionStore} from "@/store/regionStore.js";
import {useCoordinatorStore} from "@/store/coordinatorStore.js";
import {useTracerStore} from "@/store/tracerStore.js";
import {useScatterStore} from "@/store/scatterStore.js";

const emits = defineEmits(['save'])
const applicationStore = useApplicationStore()
const tracerStore = useTracerStore()
const regionStore = useRegionStore()
const scattersStore = useScatterStore()
const coordinatorStore = useCoordinatorStore()
const save = () => {
  const saveData = {
    map: {
      mapSvgTxt: applicationStore.svgMap.mapSvgText,
      mapDom: applicationStore.svgMap.mapSvgDOM
    },
    tracer: {
      history: tracerStore.getHistory()
    },
    regions: regionStore.getRegions(),
    scatters: scattersStore.getPoints(),
    coordinates: coordinatorStore.getCoordinateAll(),

  }
  const saverJSON = new SaverJsonTracker()
  saverJSON.save('map', saveData)
  emits('save', 'save_all')
}
</script>

<template>
  <SaveButton @click="save"/>
</template>

<style scoped lang="scss">

</style>