<script setup>

import {useRouter} from "vue-router";
import Button from "@/components/ui/button/button.vue";

const router = useRouter()
</script>

<template>
  <header>
    <div class="left">
      <Button v-if="router.currentRoute.value.name !== 'Home'" title="Назад" @click="router.back()"/>
      <h1>{{ router.currentRoute.value.meta.name }}</h1>
    </div>
    <div class="center">
    </div>
    <div class="right">
    </div>
  </header>
</template>

<style scoped lang="scss">

header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px 50px;
}

.left {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

</style>