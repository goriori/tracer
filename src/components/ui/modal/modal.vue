<script setup>


</script>

<template>
  <div class="popup-base" >
    <div class="popup-content">
      <slot name="window"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.popup {
  &-base {
    position: fixed;
    inset: 0;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>