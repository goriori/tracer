<script setup>

import SaveButton from "@/components/ui/button/save/save-button.vue";
import {SaverJsonTracker} from "@/entities/saver-tracker/saver-json-tracker/index.js";
import {useApplicationStore} from "@/store/applicationStore.js";
import {useRegionStore} from "@/store/regionStore.js";
import {useCoordinatorStore} from "@/store/coordinatorStore.js";

const emits = defineEmits(['save'])
const applicationStore = useApplicationStore()
const regionStore = useRegionStore()
const coordinatorStore = useCoordinatorStore()
const save = () => {
  const saveData = {
    map: {
      mapSvgTxt: applicationStore.svgMap.mapSvgText,
      mapDom: applicationStore.svgMap.mapSvgDOM
    },
    regions: regionStore.getRegions(),
    coordinates: coordinatorStore.getCoordinateAll()
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