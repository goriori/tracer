<script setup>

import BrushAction from "@/actions/brush/brush-action.vue";
import ClearAction from "@/actions/clear/clear-action.vue";
import ColorButton from "@/components/ui/button/color/color-button.vue";
import DrawAction from "@/actions/draw/draw-action.vue";
import EditButton from "@/components/ui/button/edit/edit-button.vue";
import BrushColorAction from "@/actions/brush-color/brush-color-action.vue";

const emits = defineEmits(['event-update'])

const actionsEmits = {
  change_brush_color: (type) => eventUpdate(type),
  change_brush: (type) => eventUpdate(type),
  start_drawing: (type) => eventUpdate(type),
  stop_drawing: (type) => eventUpdate(type),
  clear_all: (type) => eventUpdate(type)
}

const eventUpdate = (type) => emits('event-update', type)
const onEmitHandler = (type) => {
  if (type in actionsEmits) actionsEmits[type](type);
}
</script>

<template>
  <aside>
    <BrushColorAction @change-color="onEmitHandler" class="action"/>
    <EditButton class="action"/>
    <BrushAction @change-brush="onEmitHandler"/>
    <DrawAction @start-drawing="onEmitHandler" @stop-drawing="onEmitHandler" class="action"/>
    <ClearAction @clear="onEmitHandler" class="action"/>
  </aside>
</template>

<style scoped lang="scss">

</style>