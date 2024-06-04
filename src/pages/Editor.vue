<script setup>
import * as echarts from 'echarts'
import {onMounted, ref} from 'vue'
import {Tracer} from "@/entities/tracer/index.js";
import {MapSVG} from "@/entities/map/index.js";
import Button from "@/components/ui/button/button.vue";
import ColorButton from "@/components/ui/button/color/color-button.vue";
import EditButton from "@/components/ui/button/edit/edit-button.vue";
import PaintButton from "@/components/ui/button/paint/paint-button.vue";
import DownloadButton from "@/components/ui/button/download/download-button.vue";

const tracerRef = ref(null)
const tracer = ref(null)

const initKeypress = () => {
  // ctrl + z
  window.addEventListener('keypress', (e) => {
    console.log(e)
    if (e.key === '\x1A') tracer.value.backStep()
  })
}
const onClick = (e) => {
  if (!tracer.value.drawing) tracer.value.start()
  const coordinates = [e.offsetX, e.offsetY]
  tracer.value.draw('point', coordinates)
}
onMounted(async () => {
  if (tracerRef.value) {
    const svg = await fetch('/public/map.svg')
    const map = new MapSVG('tracer-map', await svg.text())
    tracer.value = new Tracer(tracerRef.value, map)
    tracer.value.init()
  }
  initKeypress()
})
</script>
<template>
  <div class="page">
    <h1>Редактор (Расчерчиватель)</h1>
    <header>
      <div class="left"></div>
      <div class="center"></div>
      <div class="right">
      <DownloadButton/>
      </div>
    </header>
    <aside>
      <ColorButton/>
      <EditButton/>
      <PaintButton/>
    </aside>
    <div class="tracer" id="tracer" ref="tracerRef" @click="onClick"></div>
  </div>
</template>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

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

.tracer {
  width: 100%;
  height: 100%;
  max-width: 1000px;
  max-height: 700px;
  margin:0 auto;
  border: 2px solid #5696ff;
}
</style>
