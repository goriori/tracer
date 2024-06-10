<script setup>
import {onMounted, ref} from 'vue'
import {useBrashStore} from "@/store/brashStore.js";
import {useTracerStore} from "@/store/tracerStore.js";
import {useCoordinatorStore} from "@/store/coordinatorStore.js";
import {useRegionStore} from "@/store/regionStore.js";
import {useApplicationStore} from "@/store/applicationStore.js";
import {EChart} from "@/entities/echart/index.js";
import Header from "@/components/header/header.vue";
import Footer from "@/components/footer/footer.vue";
import Aside from "@/components/aside/aside.vue";
import {Region} from "@/entities/region/index.js";


const applicationStore = useApplicationStore()
const brushStore = useBrashStore()
const regionStore = useRegionStore()
const tracerStore = useTracerStore()
const coordinatorStore = useCoordinatorStore()
const targetElement = ref(null)
const chart = ref(null)

const events = {
  download_map: () => initChart(),
  download_json: () => initChart(),
  start_drawing: () => targetElement.value.addEventListener('click', eventTargetElementHandler),
  stop_drawing: () => targetElement.value.removeEventListener('click', eventTargetElementHandler),
  clear_all: () => clearChart(),
  save_all: () => console.log('save all'),
  change_brush: () => chart.value.changeBrush(brushStore.brush)
}

const eventTargetElementHandler = (event) => {
  const listenerHandlers = {
    click: (event) => onClick(event)
  }
  return listenerHandlers[event.type](event)
}

const onUpdate = (type) => {
  if (type in events) events[type]()
}

const initChart = () => {
  const map = applicationStore.getMapSvg()
  chart.value.init()
  chart.value.registerMap(map.name, map.mapSvgText)
  chart.value.setRegions(regionStore.getRegions())
  chart.value.on('click', chartObjectClick)
}

const chartObjectClick = (event) => {
  if (!event.region) return false
  const region = new Region(event.region.name)
  const coordinatesRegion = coordinatorStore.getCoordinates(region.name)
  if (coordinatesRegion) {
    chart.value.setCoordinates(coordinatesRegion)
  } else {
    const {offsetX, offsetY} = event.event
    const coordinateRegion = [offsetX, offsetY]
    const [x, y] = chart.value.computedCoordinatesFromPixel(coordinateRegion)
    const startCoordinates = [[x, y], [x + 1, y + 1]]
    startCoordinates.forEach(coordinate => coordinatorStore.addCoordinate(region.name, coordinate))
    regionStore.setRegion(region)
    chart.value.setCoordinates(startCoordinates)

  }
}

const clearChart = () => chart.value.setCoordinates([[0, 0], [0, 0]])

const onClick = (event) => {
  const targetRegion = regionStore.getTargetRegion()
  if (!targetRegion.name) return false
  if (!tracerStore.getStateTracer()) tracerStore.start()
  const convertedCoordinates = chart.value.computedCoordinatesFromPixel([event.offsetX, event.offsetY])
  coordinatorStore.addCoordinate(targetRegion.name, convertedCoordinates)
  tracerStore.draw('point', targetRegion, convertedCoordinates)
  chart.value.addCoordinates(convertedCoordinates)
}


onMounted(async () => {
  if (targetElement.value) chart.value = new EChart(targetElement.value)
  tracerStore.init()
  coordinatorStore.init()
  brushStore.init()
})

</script>
<template>
  <div class="page">
    <h1>Редактор (Расчерчиватель)</h1>
    <Header @event-update="onUpdate"/>
    <Aside @event-update="onUpdate"/>
    <div class="tracer" id="tracer" ref="targetElement">
      <p v-if="!applicationStore.svgMap">Упс.. загрузите изображения</p>
    </div>
    <Footer @event-update="onUpdate"/>
  </div>
</template>

<style scoped lang="scss">


aside {
  position: fixed;
  top: 50%;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #5696ff;
  max-width: 70px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transform: translate(0, -50%);
  z-index: 100;
  transition: 0.3s all ease-in-out;
}

.action {
  max-width: 50px;
}

.tracer {
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
