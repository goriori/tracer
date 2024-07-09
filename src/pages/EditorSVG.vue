<script setup>
import {onMounted, ref} from 'vue'
import {useApplicationStore} from "@/store/applicationStore.js";
import {useStateStore} from "@/store/stateStore.js";
import PinchScrollZoom from '@coddicat/vue-pinch-scroll-zoom'
import Header from "@/components/header/header.vue";
import Aside from "@/components/aside/aside.vue";
import Modals from "@/components/modals/modals.vue";
import {useRegionStore} from "@/store/regionStore.js";

const stateStore = useStateStore()
const regionStore = useRegionStore()
const applicationStore = useApplicationStore()
const targetContainer = ref(null)
const targetSvg = ref(null)
const targetElement = ref(null)
const zoomer = ref(null)
const appEvents = {
  download_svg: () => {
    console.log('download svg')
    setTimeout(initEditorSvg, 1000)
  },
}

const modalEvents = {
  create_region: (regionName) => {
    targetElement.value.setAttribute('name', regionStore.getTargetRegion().name)
    targetElement.value.style.fill = 'red'
    applicationStore.getMapSvg().update(targetSvg.value)
    console.log('create region', targetElement.value)
  },
  cancel_create_region: () => console.log('cancel create region')
}

const initEditorSvg = () => Promise.resolve().then(initTargetSvg).then(initEventsTargetSvg)
const initTargetSvg = () => targetSvg.value = targetContainer.value.children[0].firstChild
const initEventsTargetSvg = () => {
  targetSvg.value.addEventListener('click', (event) => {
    const elementName = event.target.nodeName
    if (elementName === 'rect') {
      targetElement.value = event.target
      stateStore.toggleModal('create_region')
    }
  })
}

const onUpdate = (type) => {
  if (type in appEvents) appEvents[type]()
}

const onModalUpdate = (type) => {
  if (type in modalEvents) modalEvents[type]()
}

onUpdate(()=> console.log('update editor svg'))
onMounted(async () => {

})

</script>
<template>
  <div class="page">
    <Modals @event-update="onModalUpdate"/>
    <h1>Редактор SVG</h1>
    <Header @event-update="onUpdate"/>
    <div class="editor_svg" id="editor_svg" ref="targetContainer">
      <p v-if="!applicationStore.svgMap">Упс.. загрузите изображения</p>
      <div v-else v-html="applicationStore.svgMap.mapSvgText"></div>
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

.editor_svg {
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 1000px;
  max-height: 700px;
  margin: 0 auto;
  border: 2px solid #5696ff;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
</style>
