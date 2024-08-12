<script setup>

import BrushAction from "@/actions/brush/brush-action.vue";
import ClearAction from "@/actions/clear/clear-action.vue";
import ColorButton from "@/components/ui/button/color/color-button.vue";
import DrawAction from "@/actions/draw/draw-action.vue";
import EditButton from "@/components/ui/button/edit/edit-button.vue";
import BrushColorAction from "@/actions/brush-color/brush-color-action.vue";
import DownloadSbgAction from "@/actions/download/download-svg/download-svg-action.vue";
import SaveAllAction from "@/actions/save/save-all/save-all-action.vue";
import DownloadJsonAction from "@/actions/download/download-json/download-json-action.vue";
import Button from "@/components/ui/button/button.vue";
import Menu from "@/components/ui/icons/menu.vue";
import {ref} from "vue";
import Close from "@/components/ui/icons/close.vue";

const emits = defineEmits(['event-update'])

const menuActive = ref(false)
const toggleActive = () => menuActive.value = !menuActive.value
const actionsEmits = {
  change_brush_color: (type) => eventUpdate(type),
  change_brush: (type) => eventUpdate(type),
  start_drawing: (type) => eventUpdate(type),
  stop_drawing: (type) => eventUpdate(type),
  clear_all: (type) => eventUpdate(type),
  download_json: (type) => eventUpdate(type),
  download_map: (type) => eventUpdate(type)
}

const eventUpdate = (type) => emits('event-update', type)
const onEmitHandler = (type) => {
  if (type in actionsEmits) actionsEmits[type](type);
}
</script>

<template>
  <aside>
    <Button v-if="!menuActive" :icon="Menu" @click="toggleActive" class="menu"/>
    <Button v-if="menuActive" :icon="Close" @click="toggleActive" class="close"/>
    <BrushColorAction v-if="menuActive" @change-color="onEmitHandler" class="action"/>
    <!--        <EditButton class="action"/>-->
    <BrushAction v-if="menuActive" @change-brush="onEmitHandler" class="action"/>
    <DrawAction v-if="menuActive" @start-drawing="onEmitHandler" @stop-drawing="onEmitHandler" class="action"/>
    <DownloadSbgAction v-if="menuActive" @download="onEmitHandler" class="action"/>
    <DownloadJsonAction v-if="menuActive" @download="onEmitHandler" class="action"/>
    <SaveAllAction v-if="menuActive" @save="onEmitHandler" class="action"/>
    <!--    <ClearAction @clear="onEmitHandler" class="action"/>-->
  </aside>
</template>

<style scoped lang="scss">
@import '@/assets/scss/animation.scss';

aside {
  position: fixed;
  top: 50%;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #5696ff;
  max-width: 70px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transform: translate(0, -50%);
  z-index: 100;
  transition: 0.3s all ease-in-out;
}

.action {
  animation: display-action 0.3s linear;
}

.close,.menu {
  animation:  toggle-effect 0.2s linear;
}


</style>