<script setup lang="ts">
const { t } = useI18n();

const props = defineProps<{
  description?: string;
  open: boolean;
  title: string;
}>();

const emit = defineEmits<{
  (eventName: "close", accepted: boolean): void;
}>();
</script>

<template>
  <div
    v-if="open"
    class="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
  >
    <div
      class="w-full max-w-lg overflow-hidden rounded-[28px] border border-sky-200 bg-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.65)]"
    >
      <div class="border-b border-sky-100 bg-sky-50 px-6 py-5">
        <div class="text-xs font-semibold tracking-[0.24em] text-sky-700 uppercase">
          {{ t("modals.confirm.title") }}
        </div>
        <h2 class="mt-2 text-2xl font-semibold text-slate-950">{{ title }}</h2>
      </div>

      <div class="space-y-5 px-6 py-6">
        <p class="text-sm leading-7 text-slate-600">
          {{ description }}
        </p>
        <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div class="text-sm font-medium text-slate-900">
            {{ t("modals.confirm.promiseTitle") }}
          </div>
          <p class="mt-2 text-sm leading-6 text-slate-600">
            {{ t("modals.confirm.body") }}
          </p>
        </div>
      </div>

      <div class="flex flex-wrap justify-end gap-3 border-t border-slate-100 px-6 py-5">
        <button
          class="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          @click="emit('close', false)"
        >
          {{ t("modals.confirm.cancel") }}
        </button>
        <button
          class="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          @click="emit('close', true)"
        >
          {{ t("modals.confirm.confirm") }}
        </button>
      </div>
    </div>
  </div>
</template>
