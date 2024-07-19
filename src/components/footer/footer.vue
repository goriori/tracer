<script setup>
import DownloadJsonAction from "@/actions/download/download-json/download-json-action.vue";

const emits = defineEmits(['event-update']);
const actionsEmits = {
  download_json: (type) => eventUpdate(type),
}
const eventUpdate = (type) => emits('event-update', type)
const onEmitHandler = (type) => {
  if (type in actionsEmits) actionsEmits[type](type);
}
</script>

<template>
  <footer class="footer">
    <section class="left">
      VdoxnovenieMayaMuza
    </section>
    <section class="center"></section>
    <section class="right">
      <DownloadJsonAction @download="onEmitHandler"/>
    </section>
  </footer>
</template>

<style scoped lang="scss">
footer {
  display: flex;
  justify-content: space-between;
  align-content: center;
}
</style>