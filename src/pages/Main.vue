<script setup>
import {onMounted} from 'vue'
import {useRouter} from "vue-router";

const router = useRouter()

onMounted(async () => {
  await router.push('/editor')
})
</script>
<template>
  <div class="page">
    <div class="tracer" id="tracer" ref="tracerRef" @click="onClick"></div>
  </div>
</template>

<style scoped lang="scss">


.tracer {
  width: 100%;
  height: 100%;
}
</style>
