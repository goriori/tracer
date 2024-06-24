<script setup>

import ClearButton from "@/components/ui/button/clear/clear-button.vue";
import {ref} from "vue";

const emits = defineEmits(['clear'])
const isActive = ref(false)
const onClick = () => {
  isActive.value = !isActive.value
  if (isActive.value) emits('clear', 'start_clear_coordinate')
  else emits('clear', 'stop_clear_coordinate')
}
</script>

<template>
  <ClearButton @click="onClick" :class="[isActive? 'active': '' ]"/>
</template>

<style scoped lang="scss">
.active {
  background: red;
}
</style>