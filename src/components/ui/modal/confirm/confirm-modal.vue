<script setup>

import Modal from "@/components/ui/modal/modal.vue";
import Button from "@/components/ui/button/button.vue";

defineProps({
  message: {
    type: String,
    default: ''
  }
})
const emits = defineEmits(['update'])
const onClick = (confirmResponse) => {
  return confirmResponse ? emits('update', {
        type: 'confirm',
        data: {
          value: true,
        }
      })
      : emits('update', {
        type: 'confirm',
        data: {
          value: false
        }
      })
}
</script>

<template>
  <Modal>
    <template #window>
      <div class="confirm-modal">
        <h3>{{ message }}</h3>
        <section class="actions">
          <Button title="Да" @click="onClick(true)"/>
          <Button title="Нет" @click="onClick(false)"/>
        </section>
      </div>
    </template>
  </Modal>
</template>

<style scoped lang="scss">
.confirm-modal {
  background: #f5f3f3;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
}

.actions {
  display: flex;
  justify-content: center;
  align-content: center;
  gap: 10px;
}

</style>