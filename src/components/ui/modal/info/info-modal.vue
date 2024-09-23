<script setup>

import Button from "@/components/ui/button/button.vue";
import Modal from "@/components/ui/modal/modal.vue";

const props = defineProps({
  info: {
    type: String,
    required: true,
  }
})
const emits = defineEmits(['update'])

const onClose = () => emits('update', {
  type: 'close',
  data: {
    value: true
  }
})
</script>

<template>
  <Modal>
    <template #window>
      <div class="info-modal">
        <h3>К ознакомлению</h3>
        <p>{{ info }}</p>
        <section class="actions">
          <Button title="Закрыть" @click="onClose"/>
        </section>
      </div>
    </template>
  </Modal>
</template>

<style scoped lang="scss">
@import '@/assets/scss/animation';
.info-modal {
  line-height: normal;
  max-width: 800px;
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