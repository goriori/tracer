<script setup>
defineProps({
  title: {
    type: String,
    default: ' '
  },
  icon: {
    type: Object,
    default: () => {
    }
  }

})
</script>

<template>
  <button>
    <div class="icon" v-if="icon">
      <component :is="icon"/>
    </div>
    <p v-if="title">{{ title }}</p>
  </button>
</template>

<style scoped lang="scss">
button {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #5696ff;
  color: white;
  font-weight: 700;
  padding: 10px;
  transition: 0.3s all ease-in-out;

  &:hover {
    opacity: 0.7;
  }

  &:active {
    transform: scale(90%);
  }
}
</style>