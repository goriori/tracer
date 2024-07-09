<script setup>
import Form from "@/components/ui/form/Form.vue";
import Input from "@/components/ui/input/Input.vue";
import {ref} from "vue";
import Button from "@/components/ui/button/button.vue";


const form = ref({
  regionName: ''
})

const onSendForm = (event) => {
  emits('onSendForm', form.value)
}


const emits = defineEmits(['onSendForm', 'onCancelSendForm'])
</script>

<template>
  <Form title="Создание объекта" @onSendForm="onSendForm">
    <template #form-fields>
      <label for="regionName">Название Объекта</label>
      <Input v-model="form.regionName" type="text" placeholder="Введите название " id="regionName"/>
    </template>
    <template #form-actions>
      <Button title="Создать" />
    </template>
  </Form>
</template>

<style scoped lang="scss">
::v-deep(.form-fields) {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

::v-deep(.form-actions) {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>