<script setup>

import StateDropDown from "@/components/ui/drop-down/state/state-drop-down.vue";
import {useApplicationStore} from "@/store/applicationStore.js";

const emits = defineEmits(['change'])
const applicationStore = useApplicationStore()
const changeStateEditor = (state) => {
  applicationStore.changeStateEditor(state)
  emits('change', 'change_state_editor')
}
</script>

<template>
  <StateDropDown @change-state-editor="changeStateEditor"/>
</template>

<style scoped lang="scss">

</style>