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
import Header from "@/components/header/header.vue";
import Footer from "@/components/footer/footer.vue";
import Aside from "@/components/aside/aside.vue";
import Modals from "@/components/modals/modals.vue";
import {Scatter} from "@/entities/echart/scatter/index.js";
import {useScatterStore} from "@/store/scatterStore.js";
import {Lines} from "@/entities/echart/lines/index.js";

const stateStore = useStateStore()
const applicationStore = useApplicationStore()
const brushStore = useBrashStore()
const regionStore = useRegionStore()
const scatterStore = useScatterStore()
const tracerStore = useTracerStore()
const coordinatorStore = useCoordinatorStore()
const targetTracerElement = ref(null)
const targetSvgElement = ref(null)
const chart = ref(null)

const appEvents = {
  download_map: () => initChart(),
  download_json: () => initChart(),
  start_drawing: () => targetTracerElement.value.addEventListener('click', eventTargetElementHandler),
  stop_drawing: () => targetTracerElement.value.removeEventListener('click', eventTargetElementHandler),
  // change_brush_color: () => {
  //   setBrushColor()
  //   coordinatorStore.setOptionCoordinate(regionStore.getTargetRegion().name, {color: brushStore.getColor()})
  // },
  clear_all: () => clearChart(),
  save_all: () => console.log('save all'),
  // change_brush: () => setBrush(),
  change_state_editor: () => {
    console.log('change state editor')
  },
  start_create_point: () => {
    targetTracerElement.value.addEventListener('click', eventTargetElementHandler)
    console.log('add point')
  },
  stop_create_point: () => {
    targetTracerElement.value.removeEventListener('click', eventTargetElementHandler)
    console.log('stop add point')
  },
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
  chart.value.addSeries(new Lines([[0, 0], [0, 0]], 'Way'))
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
  chart.value.setCoordinates(coordinatesRegion)
  regionStore.setRegion(region)
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
  chart.value.setCoordinates(startCoordinates)
}

const seriesObjectHandler = (event) => {
  if (event.componentSubType === 'lines') return stateStore.toggleModal('delete_route')
  else if (event.componentSubType === 'scatter' && !tracerStore.getStateTracer()) {
    console.log(event)
    scatterStore.setTargetPoint(event.data)
    return stateStore.toggleModal('delete_scatter')
  } else return false

}

const deleteRoute = () => {
  console.log('delete')
  const targetRegion = regionStore.getTargetRegion()
  coordinatorStore.deleteCoordinatesObject(targetRegion.name)
  stateStore.toggleModal('delete_route')
  chart.value.setCoordinates(coordinatorStore.getCoordinates(targetRegion.name))
}

const deleteScatter = () => {
  scatterStore.deletePoint(scatterStore.getTargetPoint())
  stateStore.toggleModal('delete_scatter')
  chart.value.render()
}

const clearChart = () => chart.value.setCoordinates([[0, 0], [0, 0]])

const onClick = (event) => {
  const convertedCoordinates = chart.value.computedCoordinatesFromPixel([event.offsetX, event.offsetY])
  if (tracerStore.getStateTracer()) {
    const targetRegion = regionStore.getTargetRegion()
    if (!targetRegion.name) return false
    if (!tracerStore.getStateTracer()) tracerStore.start()
    coordinatorStore.addCoordinate(targetRegion.name, convertedCoordinates)
    tracerStore.draw('point', targetRegion, convertedCoordinates)
    chart.value.addCoordinates(convertedCoordinates)
  } else {
    scatterStore.addPoint(convertedCoordinates)
    chart.value.render()
    console.log(chart.value)
  }

}

// const setBrush = () => chart.value.changeBrush(brushStore.getBrush())

// const setBrushColor = () => chart.value.changeBrushColor(brushStore.getColor())

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
  if (targetTracerElement.value) chart.value = new EChart(targetTracerElement.value)
  tracerStore.init()
  coordinatorStore.init()
  brushStore.init()
  scatterStore.init()
  initKeypressEvents()
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
