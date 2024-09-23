<script setup>

import {useRouter} from "vue-router";
import Button from "@/components/ui/button/button.vue";
import {computed, ref} from "vue";

const router = useRouter()
const namePage = computed(() => router.currentRoute.value.meta.name)
const isHomePage = computed(() => namePage.value === 'Главная страница')
</script>

<template>
  <header>
    <div class="left">
      <Button v-if="router.currentRoute.value.name !== 'Home'" title="Назад" @click="router.back()"/>
      <h1>{{ isHomePage ? '' : namePage }}</h1>
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