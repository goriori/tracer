<script setup>

import DeleteRouteModal from "@/components/modals/confirm/delete-route/delete-route-modal.vue";
import {computed, ref, shallowRef} from "vue";
import {useStateStore} from "@/store/stateStore.js";


const stateStore = useStateStore()
const emits = defineEmits(['event-update'])
const onUpdate = (modalData) => {
  emits('event-update', modalData)
  console.log(modalData)
}
const modals = ref([
  {
    id: 1,
    modalComponent: shallowRef(DeleteRouteModal),
    conditionVisibility: computed(() => stateStore.getModal('delete_route').show)
  }
])
</script>

<template>
  <Teleport to="body">
    <template v-for="modal in modals" :key="modal.id">
      <Transition name="fade">
        <component :is="modal.modalComponent" v-if="modal.conditionVisibility" @update="onUpdate"/>
      </Transition>
    </template>
  </Teleport>
</template>

<style scoped lang="scss">

</style>