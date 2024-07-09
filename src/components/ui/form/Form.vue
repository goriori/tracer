<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['onSendForm'])
const onSendForm = (event) => {
  emits('onSendForm', event)
}
</script>

<template>
  <form class="form" @submit.prevent="onSendForm">
    <section class="form-title">
      {{ title }}
    </section>
    <section class="form-fields">
      <slot name="form-fields"/>
    </section>
    <section class="form-actions">
      <slot name="form-actions"/>
    </section>
  </form>
</template>

<style scoped lang="scss">

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-title {
  font-size: 20px;
  font-weight: 800;
}
</style>