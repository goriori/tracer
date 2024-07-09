<script setup>
import {ref} from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  text_position: {
    type: String,
    default: 'left'
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
})

const emits = defineEmits(['update:modelValue', 'onChange', 'onInput'])

const modelValue = ref(props.modelValue)

const onChange = (event) => {
  modelValue.value = event.target.value
  emits('update:modelValue', modelValue.value)
  emits('onChange', modelValue.value)

}

const onInput = (event) => {
  modelValue.value = event.target.value
  emits('update:modelValue', modelValue.value)
  emits('onInput', modelValue.value)
}
</script>

<template>
  <input
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="['input', text_position]"
      :required="required"
      v-model="modelValue"
      @change="onChange"
      @input="onInput"
  >
</template>

<style scoped lang="scss">
.input {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: start;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid transparent;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  &:disabled {
    background-color: #fff;
    opacity: 0.5;
  }

  &:focus {
    transition: 0.3s all ease-in-out;
    border-color: #5696ff;
    outline: none;
  }

  &::placeholder {
    font-size: 16px;
  }
}

.left {
  text-align: start;
}

.center {
  text-align: center;
}

.right {
  text-align: end;
}
</style>