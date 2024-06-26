<script setup>
import {onMounted, ref} from "vue";
import {EChart} from "@/components/map-visualizer/entities/echart.js";
import {Coordinator} from "@/components/map-visualizer/entities/coordinator.js";

const props = defineProps({
  config: {
    type: Object,
    default: () => {
    }
  }
})

const coordinator = ref(null)
const mapVisitor = ref(null)
const targetMapElement = ref(null)


const initMapVisualizer = () => {
  const configMap = props.config?.map
  const configRegions = props.config?.regions
  mapVisitor.value = new EChart(targetMapElement.value)
  mapVisitor.value.init()
  mapVisitor.value.registerMap('map', configMap.mapSvgTxt)
  mapVisitor.value.setRegions(configRegions)
  mapVisitor.value.render()
}

const initCoordinator = () => {
  const configCoordinates = props.config?.coordinates
  coordinator.value = new Coordinator()
  configCoordinates.forEach(coordinateObject => {
    coordinateObject.coordinates.forEach(coordinate => {
      coordinator.value.addCoordinate(coordinateObject.name, coordinate)
    })
  })
}

onMounted(() => {
  if (targetMapElement.value) {
    initCoordinator()
    initMapVisualizer()
  }
})
</script>

<template>
  <div class="map" id="map" ref="targetMapElement">

  </div>
</template>

<style scoped lang="scss">
.map {
  width: 100%;
  height: 100%;
  max-width: 1000px;
  max-height: 700px;
  margin: 0 auto;
  border: 2px solid #5696ff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>