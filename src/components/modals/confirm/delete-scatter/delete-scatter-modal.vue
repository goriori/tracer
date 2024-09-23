<script setup>

import ConfirmModal from "@/components/ui/modal/confirm/confirm-modal.vue";

const emits = defineEmits(['update'])
const update = (modalData) => {
  const {value: confirmValue} = modalData.data
  confirmValue
      ? emits('update', 'confirm_delete_scatter')
      : emits('update', 'cancel_delete_scatter')
}

</script>

<template>
  <ConfirmModal message="Вы уверены, что хотите удалить точку?" @update="update"/>
</template>

<style scoped lang="scss">

</style>