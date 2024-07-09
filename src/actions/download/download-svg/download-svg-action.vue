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
        const isRectElement = node.tagName === 'rect'
        console.log(node)
        if (isRectElement) {
          const nameValue = `OBJECT_${Math.floor(Math.random() * 100000)}`
          node.setAttribute('name', nameValue)
          regionStore.addRegion(new Region(nameValue))
        }
      }
      applicationStore.downloadSvg(svgElement);
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