<script setup>


import {useApplicationStore} from "@/store/applicationStore.js";
import {ref} from "vue";

const applicationStore = useApplicationStore()
const targetTracerElement = ref(null)
</script>

<template>
  <div class="tracer" id="tracer" ref="targetTracerElement">
    <p v-if="!applicationStore.svgMap">Упс.. загрузите изображения</p>
  </div>
</template>

<style scoped lang="scss">
.tracer, .svg_editor {
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