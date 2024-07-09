<script setup>

import CreateRegionForm from "@/components/ui/form/create/create-region/CreateRegionForm.vue";
import Modal from "@/components/ui/modal/modal.vue";

const emits = defineEmits(['onCreate', 'onCancel'])

const onCreate = (formData) => {
  emits('onCreate', formData)
}
const onCancel = () => {
  emits('onCancel')
}
</script>

<template>
  <Modal>
    <template #window>
      <div class="create-region">
        <CreateRegionForm @onSendForm="onCreate" @onCancelSendForm="onCancel"/>
      </div>
    </template>
  </Modal>
</template>

<style scoped lang="scss">
.create-region {
  background: #f5f3f3;
  border-radius: 10px;
  padding: 20px;
}
</style>