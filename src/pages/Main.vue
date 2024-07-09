<script setup>
import {useRouter} from "vue-router";

const router = useRouter()


</script>
<template>
  <div class="page">
    <section class="navigate">
      <nav>
        <a href="/editor/map" v-ripple>Editor Map</a>
        <a href="/editor/svg" v-ripple>Editor SVG</a>
      </nav>
    </section>
  </div>
</template>

<style scoped lang="scss">
nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

a {
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 200px;
  background: #5696ff;
  padding: 10px;
  text-align: center;
  border-radius: 10px;
  color: white;
}
</style>
