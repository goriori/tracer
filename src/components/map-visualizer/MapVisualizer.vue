<script setup>
import {computed, onMounted, onUpdated, ref} from "vue";
import {EChart} from "./entities/echart.js";
import {Coordinator} from "./entities/coordinator.js";
import {Region} from "./entities/region.js";

const props = defineProps({
  config: {
    type: Object,
    default: () => {
    }
  },
  targetRegion: {
    type: String,
    default: ''
  }
})


const coordinator = ref(null)
const mapVisitor = ref(null)
const targetMapElement = ref(null)
const targetRegion = computed(() => props.targetRegion)
const emits = defineEmits(['update:targetRegion'])

const initMapVisualizer = () => {
  const configMap = props.config?.map
  const configRegions = props.config?.regions.map(region => new Region(region.name))
  if (!configMap) throw new Error('Not exist option map in config')
  mapVisitor.value = new EChart(targetMapElement.value)
  mapVisitor.value.init()
  mapVisitor.value.registerMap('map', configMap.mapSvgTxt)
  mapVisitor.value.setRegions(configRegions)
  mapVisitor.value.render()
  mapVisitor.value.on('click', chartObjectClick)
}

const initCoordinator = () => {
  const configCoordinates = props.config?.coordinates
  if (!configCoordinates) throw new Error('Not exist option coordinate in config')
  coordinator.value = new Coordinator()
  configCoordinates.forEach(coordinateObject => {
    coordinateObject.coordinates.forEach(coordinate => {
      coordinator.value.addCoordinate(coordinateObject.name, coordinate)
    })
  })
}


const chartObjectClick = (event) => {
  const objectTypeEvents = {
    geo: (event) => geoObjectHandler(event),
  }
  if (event.componentType in objectTypeEvents) objectTypeEvents[event.componentType](event)
}

const geoObjectHandler = (event) => {
  if (!event.region) return false
  const region = new Region(event.region.name)
  const coordinatesRegion = coordinator.value.getCoordinates(region.name)
  const coordinateOption = coordinator.value.getCoordinateOption(region.name)
  if (coordinatesRegion && coordinatesRegion.length > 2) loadCoordinatesRegion(region, coordinatesRegion, coordinateOption)
  else loadCoordinatesClick(region, event)
  emits('update:targetRegion', region.name)


}

const loadCoordinatesRegion = (region, coordinatesRegion, coordinateOption) => {
  mapVisitor.value.setCoordinates(coordinatesRegion)
  mapVisitor.value.changeBrushColor(coordinateOption.color)
}

const loadCoordinatesClick = (region, event) => {
  const {offsetX, offsetY} = event.event
  const coordinateRegion = [offsetX, offsetY]
  const [x, y] = mapVisitor.value.computedCoordinatesFromPixel(coordinateRegion)
  const haveStartPosition = coordinator.value.getCoordinates(region.name)
  const startCoordinates = [[x, y], [x + 1, y + 1]]
  if (!haveStartPosition || haveStartPosition.length === 0) {
    startCoordinates.forEach(coordinate => coordinator.value.addCoordinate(region.name, coordinate))
  }
  mapVisitor.value.setCoordinates(startCoordinates)
}
onUpdated(() => {
  const coordinatesRegion = coordinator.value.getCoordinates(targetRegion.value)
  const coordinateOption = coordinator.value.getCoordinateOption(targetRegion.value)
  loadCoordinatesRegion(targetRegion.value, coordinatesRegion, coordinateOption)
})
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