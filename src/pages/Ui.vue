<script setup>

import ColorButton from "@/components/ui/button/color/color-button.vue";
import PaintButton from "@/components/ui/button/paint/paint-button.vue";
import ClearButton from "@/components/ui/button/clear/clear-button.vue";
import EditButton from "@/components/ui/button/edit/edit-button.vue";
import Color from "@/components/ui/icons/color.vue";
import Paint from "@/components/ui/icons/paint.vue";
import Clear from "@/components/ui/icons/clear.vue";
import Edit from "@/components/ui/icons/edit.vue";
import Button from  "@/components/ui/button/button.vue";
</script>

<template>
  <div class="page">
    <h1>Ui kit</h1>
    <section class="page-section">
      <h3>Icons</h3>
      <div class="page-section-content">
        <Color/>
        <Paint/>
        <Clear/>
        <Edit/>
      </div>
    </section>
    <section class="page-section">
      <h3>Buttons</h3>
      <div class="page-section-content">
        <ColorButton class="btn"/>
        <PaintButton class="btn"/>
        <ClearButton class="btn"/>
        <EditButton class="btn"/>
        <Button title="Button title" class="btn"/>
        <Button :icon="Paint" title="Button title" class="btn"/>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow: auto;
  gap: 20px;

  &-section {
    width: 100%;
    max-width: 400px;
    max-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    &-content {
      display: flex;
      align-items: center;
      justify-items: center;
      gap: 20px;
    }
  }
}

</style>