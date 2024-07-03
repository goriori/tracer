<script setup>

import MapVisualizer from "@/components/map-visualizer/MapVisualizer.vue";
import {onBeforeMount, onMounted, ref} from "vue";

const config = ref(null)
const targetRegion = ref('OBJECT_6')
const onChangeRegion = () => {
  targetRegion.value = 'OBJECT_5'
}

onBeforeMount(async () => {
  const urlFile = encodeURIComponent('files/map/map-3-6683fc67d8e71768463439.json')
  const responseConfig = await fetch(`https://rosneft-info.itlabs.top/download/file?file=${urlFile}`)
  config.value = await responseConfig.json()
  console.log(config.value)
})
</script>

<template>
  <div class="page">
    <h1>Visualizer</h1>
    <button @click="onChangeRegion">change target Region</button>
    <MapVisualizer
        v-if="config"
        v-model:target-region="targetRegion"
        :config="config"
    />
  </div>
</template>

<style scoped lang="scss">

</style>