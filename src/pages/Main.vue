<script setup>
import {useRouter} from "vue-router";

const router = useRouter()


</script>
<template>
  <div class="page">
    <section class="navigate">
      <nav>
        <a href="/editor/map">Editor Map</a>
        <a href="/editor/svg">Editor SVG</a>
      </nav>
    </section>
  </div>
</template>

<style scoped lang="scss">


.tracer {
  width: 100%;
  height: 100%;
}
</style>
