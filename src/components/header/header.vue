<script setup>

import DownloadSbgAction from "@/actions/download/download-svg/download-svg-action.vue";

const emits = defineEmits(['event-update']);
const actionsEmits = {
  download_map: (type) => emits('event-update',type)
}

const onEmitHandler = (type) => {
  if (type in actionsEmits) actionsEmits[type](type);
}
</script>

<template>
  <header>
    <div class="left"></div>
    <div class="center"></div>
    <div class="right">
      <DownloadSbgAction @download="onEmitHandler"/>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>