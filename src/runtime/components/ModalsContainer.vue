<script setup lang="ts">
import { useModals } from "../composables/useModals";

const { modals, close } = useModals();
</script>

<template>
  <div
    v-if="modals.length > 0"
    id="modals-container"
    class="pointer-events-none fixed inset-0 z-50"
  >
    <template v-for="modal in modals" :key="modal.id">
      <component
        :is="modal.modalName"
        v-bind="modal.props"
        :open="modal.isOpen"
        @close="(result: unknown) => close(modal.id, result)"
      />
    </template>
  </div>
</template>
