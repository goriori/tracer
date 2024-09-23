<script setup>

import InfoModal from "@/components/ui/modal/info/info-modal.vue";

const emits = defineEmits(['update'])
const update = () => {
  localStorage.setItem('checkAppointment', JSON.stringify(true))
  emits('update', 'close_info')
}

const info_editor = 'Предназначение проекта дать возможность реализовывать маршрутизацию путем разметки SVG карт, с определнными областями от которых можно прокладывать маршруты к тем или иным областям на карте. Размеченную карту можно сохранить в виде json файла, который в дальнейшем можно использовать в качестве входных данных для компонента визуализатора карт.'

</script>

<template>
  <info-modal :info="info_editor" @update="update"/>
</template>

<style scoped lang="scss">

</style>