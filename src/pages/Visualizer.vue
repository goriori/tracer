<script setup>

import MapVisualizer from "@/components/map-visualizer/MapVisualizer.vue";
import {onBeforeMount, onMounted, ref} from "vue";

const config = ref(null)
const targetRegion = ref('OBJECT_6')
const onChangeRegion = () => {
  targetRegion.value = 'OBJECT_5'
}

onBeforeMount(async () => {
  const responseConfig = await fetch('https://rosneft-info.itlabs.top/download/file?file=files%2Fmap%2Fmap-7-667d4128ddc27823036475.json')
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