<script setup>
import {onMounted, ref} from 'vue'
import {useApplicationStore} from "@/store/applicationStore.js";
import ColorButton from "@/components/ui/button/color/color-button.vue";
import EditButton from "@/components/ui/button/edit/edit-button.vue";
import PaintButton from "@/components/ui/button/paint/paint-button.vue";
import Header from "@/components/header/header.vue";
import DrawAction from "@/actions/draw/draw-action.vue";
import ClearAction from "@/actions/clear/clear-action.vue";

const applicationStore = useApplicationStore()
const targetElement = ref(null)
const tracer = ref(null)
const coordinator = ref(null)


const events = {
  download_map: () => {
    tracer.value = applicationStore.initTracer()
  },
  start_drawing: () => {
    tracer.value.on('click', (event) => {
      if (!event.region) return false
      applicationStore.initRegion(event.region)
      targetElement.value.addEventListener('click', eventHandler)
    })
  },
  stop_drawing: () => {
    tracer.value.off('click')
    tracer.value.stop()
    targetElement.value.removeEventListener('click', eventHandler)
  },
  clear_all: () => {
    tracer.value.clear()
    coordinator.value.clearCoordinates()
  }
}

const eventHandler = (event) => {
  const listenerHandlers = {
    click: (event) => onClick(event, applicationStore.targetRegion)
  }
  return listenerHandlers[event.type](event)
}

const onUpdate = (type) => {
  console.log(type)
  if (type in events) events[type]()
}

const onClick = (event, region) => {
  const coordinates = [event.offsetX, event.offsetY]
  const convertedCoordinates = tracer.value.convertCoordinates(coordinates)
  if (!tracer.value.drawing) tracer.value.start()
  coordinator.value.addCoordinate(region.name, convertedCoordinates)
  tracer.value.draw('point', convertedCoordinates)
}

const test = () => {
  tracer.value.setDraw([[2972.845905172413, 1421.9482758620688], [1327.5172413793102, 3127.3254310344823], [282.67349137931046, 4880.741379310344], [1543.6918103448274, 6045.682112068965], [4846.358836206896, 6081.711206896551], [6743.891163793101, 4184.178879310344], [6143.406249999998, 2779.0441810344823], [4714.252155172413, 3968.0043103448265], [3225.0495689655163, 2803.0635775862065], [5951.251077586206, 1277.8318965517242], [8329.171336206895, 737.3954741379313], [8689.462284482757, 1818.2683189655172], [9794.354525862067, 3823.8879310344823], [8317.161637931033, 6105.730603448275]])
}

onMounted(async () => {
  if (targetElement.value) await applicationStore.initElement(targetElement.value)
  coordinator.value = applicationStore.initCoordinator()
})

</script>
<template>
  <div class="page">
    <h1>Редактор (Расчерчиватель)</h1>
    <Header @event-update="onUpdate"/>
    <aside>
      <ColorButton @click="test" class="action"/>
      <EditButton class="action"/>
      <DrawAction @start-drawing="onUpdate" @stop-drawing="onUpdate" class="action"/>
      <ClearAction @clear="onUpdate" class="action"/>
    </aside>
    <div class="tracer" id="tracer" ref="targetElement">
      <p v-if="!applicationStore.targetMap">Упс.. загрузите изображения</p>
    </div>
  </div>
</template>

<style scoped lang="scss">


aside {
  position: fixed;
  top: 50%;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #5696ff;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transform: translate(0, -50%);
  z-index: 100;
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
