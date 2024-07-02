<script setup>

import DownloadSbgAction from "@/actions/download/download-svg/download-svg-action.vue";
import SaveSvgAction from "@/actions/save/save-svg/save-svg-action.vue";
import {useApplicationStore} from "@/store/applicationStore.js";
import {useRegionStore} from "@/store/regionStore.js";
import SaveAllAction from "@/actions/save/save-all/save-all-action.vue";
import DownloadJsonAction from "@/actions/download/download-json/download-json-action.vue";
import BrushAction from "@/actions/brush/brush-action.vue";
import StateEditorAction from "@/actions/state-editor/state-editor-action.vue";

const regionStore = useRegionStore()
const applicationStore = useApplicationStore()
const emits = defineEmits(['event-update']);

const actionsEmits = {
  download_map: (type) => eventUpdate(type),
  save_svg: (type) => eventUpdate(type),
  save_all: (type) => eventUpdate(type),
  change_state_editor: (type) => eventUpdate(type)
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
<!--      <div class="state">-->
<!--        <h4>Состояние редактора: {{ applicationStore.getStateEditor() }} </h4>-->
<!--        <StateEditorAction @change="onEmitHandler" class="action"/>-->
<!--      </div>-->
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

.state {
  display: flex;
  align-items: center;
  gap: 20px;
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

.action {
  max-width: 50px;
}
</style>