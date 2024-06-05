<script setup>

import ClearButton from "@/components/ui/button/clear/clear-button.vue";

const emits = defineEmits(['clear'])
const onClick = () => {
  emits('clear', 'clear_all')
}
</script>

<template>
  <ClearButton @click="onClick"/>
</template>

<style scoped lang="scss">

</style>