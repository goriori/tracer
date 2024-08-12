<script setup>
import {onMounted, ref} from 'vue'
import {useRouter} from "vue-router";
import Button from "@/components/ui/button/button.vue";

const router = useRouter()
const routes = ref(router.getRoutes().filter(route => route.meta?.isVisibility))
onMounted(async () => {
})
</script>
<template>
  <div class="page">
    <div class="page-menu">
      <Button
          v-for="route in routes "
          :key="route.name"
          :title="route.name"
          @click="router.push(route.path)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">

.page {
  display: flex;
  justify-content: center;
  align-items: center;

  &-menu {
    width: 100%;
    max-width: 200px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>
