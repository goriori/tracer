<script setup>

import DownloadButton from "@/components/ui/button/download/download-button.vue";
import {useApplicationStore} from "@/store/applicationStore.js";
import {convertToDomElement} from "@/utils/helpers/convertDomElement.js";
import {useRegionStore} from "@/store/regionStore.js";
import {Region} from "@/entities/region/index.js";

const emits = defineEmits(["download"]);
const applicationStore = useApplicationStore();
const regionStore = useRegionStore()
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
      for (const node of svgElement.children) {
        const haveAttr = node.hasAttribute('name')
        const attrValue = node.getAttribute('name')
        if (haveAttr) regionStore.addRegion(new Region(attrValue))
      }
      applicationStore.downloadSvg(svgText);
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