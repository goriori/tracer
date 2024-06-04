<script setup>
import * as echarts from 'echarts'
import {onMounted, ref} from 'vue'
import {Tracer} from "@/entities/tracer/index.js";
import {MapSVG} from "@/entities/map/index.js";

const tracerRef = ref(null)
const tracer = ref(null)

const initKeypress = () => {
  // ctrl + z
  window.addEventListener('keypress', (e)=> {
    console.log(e)
    if(e.key === '\x1A')  tracer.value.backStep()
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
    <div class="tracer" id="tracer" ref="tracerRef" @click="onClick"></div>
  </div>
</template>

<style scoped lang="scss">


.tracer {
  width: 100%;
  height: 100%;
}
</style>
