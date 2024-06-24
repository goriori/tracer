<script setup>
defineProps({})
</script>

<template>
  <article class="card">
    <slot/>
  </article>
</template>

<style scoped lang="scss">
.card {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
  background: #5696ff;

}
</style>