<script setup>

import {useApplicationStore} from "@/store/applicationStore.js";
import {useRegionStore} from "@/store/regionStore.js";
import {useCoordinatorStore} from "@/store/coordinatorStore.js";
import DownloadFileButton from "@/components/ui/button/download-file/download-file-button.vue";


const applicationStore = useApplicationStore()
const regionStore = useRegionStore()
const coordinatorStore = useCoordinatorStore()
const emits = defineEmits(['download'])
const REQUIRED_ENTITIES = ['regions', 'map', 'coordinates']
const onDownload = () => {
  const createFileInput = document.createElement('input');
  createFileInput.type = 'file';
  createFileInput.accept = 'application/json';
  createFileInput.click();
  createFileInput.onchange = async () => {
    const file = createFileInput.files[0];
    const fileTextContent = await file.text()
    const config = JSON.parse(fileTextContent)
    await loadEntities(config)

  }
}

const loadEntities = (config) => new Promise((resolve, reject) => {
  const entities = REQUIRED_ENTITIES
  const isValid = entities.map(entity => config[entity] !== undefined).filter(result => result).length === entities.length
  if (!isValid) reject('not_valid_config')
  resolve(config)
})
    .then((config) => {
      loadMap(config.map.mapSvgTxt)
      return config
    })
    .then((config) => {
      loadRegions(config.regions)
      return config
    })
    .then((config) => {
      loadCoordinator(config.coordinates)
      return config
    })
    .then(() => {
      emits('download', 'download_json')
    })

const loadMap = (mapTxt) => applicationStore.downloadSvg(mapTxt)
const loadRegions = (regions) => regions.forEach(region => regionStore.addRegion(region))
const loadCoordinator = (coordinates) => {
  coordinates.forEach(object => {
    object.coordinates.forEach(coordinate => {
      coordinatorStore.addCoordinate(object.name, coordinate)
    })
  })
}
</script>

<template>
  <DownloadFileButton @click="onDownload"/>
</template>

<style scoped lang="scss">

</style>