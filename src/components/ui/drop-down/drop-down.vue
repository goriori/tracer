<script setup>
import {ref} from "vue";

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})

const list = ref(props.list)
const emits = defineEmits(['change'])
const targetElement = ref(props.list[0])
const isOpen = ref(false)

const onChangeElement = (element) => {
  targetElement.value = element
  isOpen.value = false
  emits('change', element)
}
</script>

<template>
  <div class="dropdown">
    <section class="dropdown-element">
      <component :is="targetElement" @click="isOpen=!isOpen" class="icon"/>
      <Transition name="fade">
        <section class="dropdown-content" v-if="isOpen">
          <component v-for="element in list" :key="element.id" :is="element" @click="onChangeElement(element)"/>
        </section>
      </Transition>
    </section>

  </div>
</template>

<style scoped lang="scss">
.dropdown {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  &-element {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &-content {
    display: flex;
    justify-items: center;
    align-items: center;
    gap: 10px;
  }
}

.icon {
  max-width: 50px;
  max-height: 50px;
}
</style>