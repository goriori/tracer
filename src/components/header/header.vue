<script setup>

import DownloadSbgAction from "@/actions/download/download-svg/download-svg-action.vue";
import SaveSvgAction from "@/actions/save/save-svg/save-svg-action.vue";
import {useApplicationStore} from "@/store/applicationStore.js";
import {useRegionStore} from "@/store/regionStore.js";
import SaveAllAction from "@/actions/save/save-all/save-all-action.vue";
import DownloadJsonAction from "@/actions/download/download-json/download-json-action.vue";

const regionStore = useRegionStore()
const emits = defineEmits(['event-update']);

const actionsEmits = {
  download_map: (type) => eventUpdate(type),
  save_svg: (type) => eventUpdate(type),
  save_all: (type) => eventUpdate(type)
}

const eventUpdate = (type) => emits('event-update', type)
const onEmitHandler = (type) => {
  if (type in actionsEmits) actionsEmits[type](type);
}
</script>

<template>
  <header>
    <div class="left"></div>
    <div class="center">
      <h3>Выбранный объект: {{ regionStore.targetRegion?.name || 'Не выбран' }}</h3>
    </div>
    <div class="right">
        <DownloadSbgAction @download="onEmitHandler"/>
        <SaveAllAction @save="onEmitHandler"/>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.right {
  max-width: 130px;
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 20px;

  div {
    width: 100%;
  }
}
</style>