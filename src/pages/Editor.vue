<script setup>
import {onMounted, ref} from 'vue'
import {useBrashStore} from "@/store/brashStore.js";
import {useTracerStore} from "@/store/tracerStore.js";
import {useCoordinatorStore} from "@/store/coordinatorStore.js";
import {useRegionStore} from "@/store/regionStore.js";
import {useApplicationStore} from "@/store/applicationStore.js";
import {useStateStore} from "@/store/stateStore.js";
import {EChart} from "@/entities/echart/index.js";
import {Region} from "@/entities/region/index.js";
import Header from "@/components/header/header.vue";
import Footer from "@/components/footer/footer.vue";
import Aside from "@/components/aside/aside.vue";
import Modals from "@/components/modals/modals.vue";

const stateStore = useStateStore()
const applicationStore = useApplicationStore()
const brushStore = useBrashStore()
const regionStore = useRegionStore()
const tracerStore = useTracerStore()
const coordinatorStore = useCoordinatorStore()
const targetElement = ref(null)
const chart = ref(null)

const appEvents = {
  download_map: () => initChart(),
  download_json: () => initChart(),
  start_drawing: () => targetElement.value.addEventListener('click', eventTargetElementHandler),
  stop_drawing: () => targetElement.value.removeEventListener('click', eventTargetElementHandler),
  change_brush_color: () => setBrushColor(),
  clear_all: () => clearChart(),
  save_all: () => console.log('save all'),
  change_brush: () => {
    setBrush()
    console.log(chart.value)
  }
}

const modalEvents = {
  confirm_delete: () => deleteRoute(),
  cancel_delete: () => stateStore.toggleModal('delete_route')
}

const objectTypeEvents = {
  geo: (event) => geoObjectHandler(event),
  series: (event) => seriesObjectHandler(event)
}

const eventTargetElementHandler = (event) => {
  const listenerHandlers = {
    click: (event) => onClick(event)
  }
  if (event.type in listenerHandlers) return listenerHandlers[event.type](event)
}

const onUpdate = (type) => {
  if (type in appEvents) appEvents[type]()
}

const onModalUpdate = (type) => {
  if (type in modalEvents) modalEvents[type]()
}

const initChart = () => {
  const map = applicationStore.getMapSvg()
  chart.value.init()
  chart.value.registerMap(map.name, map.mapSvgText)
  chart.value.setRegions(regionStore.getRegions())
  chart.value.on('click', chartObjectClick)
}

const chartObjectClick = (event) => {
  if (event.componentType in objectTypeEvents) objectTypeEvents[event.componentType](event)
}

const geoObjectHandler = (event) => {
  if (!event.region) return false
  const region = new Region(event.region.name)
  const coordinatesRegion = coordinatorStore.getCoordinates(region.name)
  if (coordinatesRegion && coordinatesRegion.length > 2) {
    chart.value.setCoordinates(coordinatesRegion)
    regionStore.setRegion(region)
  } else {
    const {offsetX, offsetY} = event.event
    const coordinateRegion = [offsetX, offsetY]
    const [x, y] = chart.value.computedCoordinatesFromPixel(coordinateRegion)
    const haveStartPosition = coordinatorStore.getCoordinates(region.name)
    const startCoordinates = [[x, y], [x + 1, y + 1]]
    if (!haveStartPosition || haveStartPosition.length === 0) {
      startCoordinates.forEach(coordinate => coordinatorStore.addCoordinate(region.name, coordinate))
    }
    regionStore.setRegion(region)
    chart.value.setCoordinates(startCoordinates)
  }
}

const seriesObjectHandler = (event) => {
  if (event.componentSubType !== 'lines') return false
  stateStore.toggleModal('delete_route')
}

const deleteRoute = () => {
  const targetRegion = regionStore.getTargetRegion()
  coordinatorStore.deleteCoordinatesObject(targetRegion.name)
  stateStore.toggleModal('delete_route')
  chart.value.setCoordinates(coordinatorStore.getCoordinates(targetRegion.name))
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

const setBrush = () => chart.value.changeBrush(brushStore.getBrush())
const setBrushColor = () => chart.value.changeBrushColor(brushStore.getColor())
const initKeypressEvents = () => {

  const keys = {
    '\x1A': () => {
      if (tracerStore.getHistory().length === 0) return false
      const lastHistory = tracerStore.backStep()
      chart.value.removeLastCoordinates()
    }
  }

  window.addEventListener('keypress', (event) => {
    if (event.key in keys) keys[event.key]()
  })

}

onMounted(async () => {
  if (targetElement.value) chart.value = new EChart(targetElement.value)
  tracerStore.init()
  coordinatorStore.init()
  brushStore.init()
  initKeypressEvents()
})

</script>
<template>
  <div class="page">
    <Modals @event-update="onModalUpdate"/>
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
