<script setup>

import {ref} from "vue";
import {useBrashStore} from "@/store/brashStore.js";

const emits = defineEmits(['change-color'])
const brashStore = useBrashStore()
const color = ref('#fff')
const onInput = (event) => {
  brashStore.changeColor(event.target.value)
  emits('change-color', 'change_brush_color')
}

</script>

<template>
  <article>
    <form>
      <input type="color" v-model="color" @input="onInput">
    </form>
  </article>
</template>

<style scoped lang="scss">

</style>