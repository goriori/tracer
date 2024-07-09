<script setup>
import CreateRegionModal from "@/components/ui/modal/create/create-region/create-region-modal.vue";
import {useRegionStore} from "@/store/regionStore.js";
import {Region} from "@/entities/region/index.js";
import {useStateStore} from "@/store/stateStore.js";

const emits = defineEmits(['update'])
const stateStore = useStateStore()
const regionStore = useRegionStore()

const createRegion = (formData) => {
  const newRegion = new Region(formData.regionName)
  regionStore.addRegion(newRegion)
  regionStore.setRegion(newRegion)
  stateStore.toggleModal('create_region')
  onUpdate('create_region')
}

const onCancel = () => {
  stateStore.toggleModal('create_region')
  onUpdate('cancel_create_region')
}

const onUpdate = (value) => {
  emits('update', value)
}

</script>

<template>
  <CreateRegionModal
      @on-create="createRegion"
      @onCancel="onCancel"
  />
</template>

<style scoped lang="scss">

</style>