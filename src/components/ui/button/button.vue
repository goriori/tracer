<script setup>
defineProps({
  titleHover: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: Object,
    default: () => {
    }
  }

})
</script>

<template>
  <button :title="titleHover">
    <div class="icon" v-if="icon">
      <component :is="icon"/>
    </div>
    <p v-if="title.length > 0">{{ title }}</p>
  </button>
</template>

<style scoped lang="scss">
.icon {
  width: 100%;
  height: 100%;
  min-width: 30px;

  svg {
    width: 100%;
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
  }
}

button {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-radius: 10px;
  background: #5696ff;
  color: white;
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