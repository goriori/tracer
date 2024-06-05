<script setup>

import DownloadButton from "@/components/ui/button/download/download-button.vue";
import {useApplicationStore} from "@/store/applicationStore.js";

const emits = defineEmits(["download"]);
const applicationStore = useApplicationStore();
const onDownload = () => {
  const createFileInput = document.createElement('input');
  createFileInput.type = 'file';
  createFileInput.accept = 'application/svg';
  createFileInput.click();
  createFileInput.onchange = () => {
    const file = createFileInput.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event) => {
      const svg = reader.result;
      applicationStore.downloadSvg(svg);
      emits("download", 'download_map');
    }
  }
}
</script>

<template>
  <DownloadButton @click="onDownload"/>
</template>

<style scoped lang="scss">

</style>