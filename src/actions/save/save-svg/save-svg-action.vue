<script setup>

import SaveButton from "@/components/ui/button/save/save-button.vue";
import {useApplicationStore} from "@/store/applicationStore.js";

const applicationStore = useApplicationStore();

const emits = defineEmits(['save']);
const save = () => {
 emits('save', 'save_svg');
}
</script>

<template>
  <SaveButton @click="save"/>
</template>

<style scoped lang="scss">

</style>