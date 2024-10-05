<script setup>
import {onBeforeUnmount, onMounted, ref} from 'vue'
import {useBrashStore} from "@/store/brashStore.js";
import {useTracerStore} from "@/store/tracerStore.js";
import {useCoordinatorStore} from "@/store/coordinatorStore.js";
import {useRegionStore} from "@/store/regionStore.js";
import {useApplicationStore} from "@/store/applicationStore.js";
import {useStateStore} from "@/store/stateStore.js";
import {EChart} from "@/entities/echart/index.js";
import {Region} from "@/entities/region/index.js";
import Aside from "@/components/aside/aside.vue";
import Modals from "@/components/modals/modals.vue";
import {useScatterStore} from "@/store/scatterStore.js";
import {useLineStore} from "@/store/lineStore.js";
import {useKeypress} from "@/utils/useKeypress.js";

const stateStore = useStateStore()
const applicationStore = useApplicationStore()
const brushStore = useBrashStore()
const regionStore = useRegionStore()
const scatterStore = useScatterStore()
const lineStore = useLineStore()
const tracerStore = useTracerStore()
const coordinatorStore = useCoordinatorStore()
const {addKeyEvent} = useKeypress()
const targetTracerElement = ref(null)
const targetSvgElement = ref(null)
const chart = ref(null)


const appEvents = {
  download_map: () => initChart(),
  download_json: () => initChart(),
  start_drawing: () => {
    targetTracerElement.value.addEventListener('click', eventTargetElementHandler)
    tracerStore.stopScatter()
  },
  stop_drawing: () => targetTracerElement.value.removeEventListener('click', eventTargetElementHandler),
  // change_brush_color: () => {
  //   setBrushColor()
  //   coordinatorStore.setOptionCoordinate(regionStore.getTargetRegion().name, {color: brushStore.getColor()})
  // },
  clear_all: () => clearChart(),
  save_all: () => console.log('save all'),
  // change_brush: () => setBrush(),
  change_state_editor: () => {
  },
  start_create_point: () => {
    targetTracerElement.value.addEventListener('click', eventTargetElementHandler)
    tracerStore.stopDraw()
  },
  stop_create_point: () => targetTracerElement.value.removeEventListener('click', eventTargetElementHandler)

}

const modalEvents = {
  confirm_delete: () => deleteRoute(),
  cancel_delete: () => stateStore.toggleModal('delete_route'),
  confirm_delete_scatter: () => deleteScatter(),
  cancel_delete_scatter: () => stateStore.toggleModal('delete_scatter'),
  close_info: () => stateStore.toggleModal('info_editor')
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
  chart.value.addSeries(lineStore.getLine())
  chart.value.on('click', chartObjectClick)
  chart.value.addSeries(scatterStore.scatter)
}

const chartObjectClick = (event) => {
  const objectTypeEvents = {
    geo: (event) => geoObjectHandler(event),
    series: (event) => seriesObjectHandler(event)
  }
  if (event.componentType in objectTypeEvents) objectTypeEvents[event.componentType](event)
}

const geoObjectHandler = (event) => {
  if (!event.region) return false
  const region = new Region(event.region.name)
  const coordinatesRegion = coordinatorStore.getCoordinates(region.name)
  if (coordinatesRegion && coordinatesRegion.length > 2) loadCoordinatesRegion(region, coordinatesRegion)
  else loadCoordinatesClick(region, event)
}

const loadCoordinatesRegion = (region, coordinatesRegion) => {
  lineStore.getLine().updateCoordinates(coordinatesRegion)
  regionStore.setRegion(region)
  chart.value.render()
}

const loadCoordinatesClick = (region, event) => {
  const {offsetX, offsetY} = event.event
  const coordinateRegion = [offsetX, offsetY]
  const [x, y] = chart.value.computedCoordinatesFromPixel(coordinateRegion)
  const haveStartPosition = coordinatorStore.getCoordinates(region.name)
  const startCoordinates = [[x, y], [x + 1, y + 1]]
  if (!haveStartPosition || haveStartPosition.length === 0) {
    startCoordinates.forEach(coordinate => coordinatorStore.addCoordinate(region.name, coordinate))
  }
  regionStore.setRegion(region)
  lineStore.getLine().updateCoordinates(startCoordinates)
  chart.value.render()
}

const seriesObjectHandler = (event) => {
  if (event.componentSubType === 'lines') return stateStore.toggleModal('delete_route')
  else if (event.componentSubType === 'scatter' && !tracerStore.getStateTracer()) {
    scatterStore.setTargetPoint(event.data)
    return stateStore.toggleModal('delete_scatter')
  } else return false

}

const deleteRoute = () => {
  const targetRegion = regionStore.getTargetRegion()
  coordinatorStore.deleteCoordinatesObject(targetRegion.name)
  stateStore.toggleModal('delete_route')
  lineStore.getLine().updateCoordinates(coordinatorStore.getCoordinates(targetRegion.name))
  chart.value.render()
}

const deleteScatter = () => {
  scatterStore.deletePoint(scatterStore.getTargetPoint())
  stateStore.toggleModal('delete_scatter')
  chart.value.render()
}

const clearChart = () => {
  lineStore.getLine().updateCoordinates([[0, 0], [0, 0]])
  chart.value.render()
}

const onClick = (event) => {
  const convertedCoordinates = chart.value.computedCoordinatesFromPixel([event.offsetX, event.offsetY])
  if (tracerStore.getStateTracer()) {
    const targetRegion = regionStore.getTargetRegion()
    if (!targetRegion.name) return false
    if (!tracerStore.getStateTracer()) tracerStore.startDraw()
    coordinatorStore.addCoordinate(targetRegion.name, convertedCoordinates)
    tracerStore.draw('point', targetRegion, convertedCoordinates)
    lineStore.getLine().addCoordinateLine(convertedCoordinates)
    chart.value.render()
  } else {
    scatterStore.addPoint(convertedCoordinates)
    chart.value.render()
  }
}

const keyCtrlZHandler = () => {
  if (tracerStore.getHistory().length === 0) return false
  const lastHistory = tracerStore.backStep()
  chart.value.removeLastCoordinates()
}

const keyFHandler = () => {
  const haveTargetObject = Object.keys(regionStore.getTargetRegion()).length > 0
  const stateDraw = tracerStore.getStateTracer()
  if (!haveTargetObject) return alert('Чтобы начать рисовать, выберите объект на карте')
  if (stateDraw) {
    tracerStore.stopDraw()
    appEvents.stop_drawing()
  } else {
    tracerStore.stopScatter()
    tracerStore.startDraw()
    appEvents.start_drawing()
  }
}

const keyGHandler = () => {
  const haveMap = applicationStore.getMapSvg()
  if (!haveMap) return alert('Чтобы раставить точки вам нужно загрузить карту')
  const stateScatter = tracerStore.getStateTracerScattering()
  if (stateScatter) {
    tracerStore.stopScatter()
    appEvents.stop_create_point()
  } else {
    tracerStore.stopDraw()
    tracerStore.startScatter()
    appEvents.start_create_point()
  }
}

const initKeypressEvent = () => {
  addKeyEvent('\x1A', keyCtrlZHandler)
  addKeyEvent('f', keyFHandler)
  addKeyEvent('g', keyGHandler)
}

// const setBrush = () => chart.value.changeBrush(brushStore.getBrush())

// const setBrushColor = () => chart.value.changeBrushColor(brushStore.getColor())


onMounted(async () => {
  if (targetTracerElement.value) chart.value = new EChart(targetTracerElement.value)
  tracerStore.init()
  lineStore.init()
  coordinatorStore.init()
  brushStore.init()
  scatterStore.init()
  initKeypressEvent()
})

onBeforeUnmount(() => {
  stateStore.toggleModal('info_editor')
})
</script>
<template>
  <div class="page">
    <Modals @event-update="onModalUpdate"/>
    <Aside @event-update="onUpdate"/>
    <div class="editor">
      <div class="target-object">
        <h3>Выбранный объект: {{ regionStore.targetRegion?.name || 'Не выбран' }}</h3>
      </div>
      <div class="tracer" id="tracer" ref="targetTracerElement">
        <p v-if="!applicationStore.svgMap">Упс.. загрузите изображения</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

@import "@/assets/scss/animation";

.action {
  max-width: 50px;
}

.tracer, .svg_editor {
  width: 100%;
  height: 100%;
  max-width: 1000px;
  max-height: 700px;
  margin: 0 auto;
  border: 2px solid #5696ff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.target-object {
  max-width: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #5696ff;
  border-radius: 10px;
  margin: 10px auto;
  padding: 10px;

}

.tracer, .target-object {
  animation: display-module 0.5s linear;
}

.editor {
  width: 100%;
  height: 100%;
}
</style>
