<script setup>

import DownloadButton from "@/components/ui/button/download/download-button.vue";
import {useApplicationStore} from "@/store/applicationStore.js";
import {convertToDomElement} from "@/utils/helpers/convertDomElement.js";

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
      const svgText = reader.result;
      const svgElement = convertToDomElement(svgText, 'image/svg+xml')
      for (const element of svgElement.children) {
        const elementName = element.nodeName
        if (elementName === 'rect') element.style.cursor = 'pointer'
      }
      applicationStore.downloadSvg(svgElement);
      emits("download", 'download_svg');
    }
  }
}
</script>

<template>
  <DownloadButton @click="onDownload"/>
</template>

<style scoped lang="scss">

</style>