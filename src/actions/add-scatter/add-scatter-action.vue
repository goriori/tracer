<script setup>

import AddPoint from "@/components/ui/button/add-point/AddPoint.vue";
import {ref} from "vue";

const emits = defineEmits(['point'])
const isActive = ref(false)
const createPoint = () => {
  isActive.value = !isActive.value
  if (isActive.value) emits('point', 'start_create_point')
  else emits('point', 'stop_create_point')
}
</script>

<template>
  <AddPoint @click="createPoint" :class="isActive? 'active': ''"/>
</template>

<style scoped lang="scss">
.active {
  background-color: red;
}
</style>