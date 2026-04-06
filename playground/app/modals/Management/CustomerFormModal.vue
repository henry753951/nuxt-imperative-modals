<script setup lang="ts">
const { t } = useI18n();

const props = defineProps<{
  customerId: string;
  customerName: string;
  open: boolean;
}>();

const draftName = ref(props.customerName);

const emit = defineEmits<{
  (
    eventName: "close",
    result: { customerId: string; customerName: string; saved: boolean }
  ): void;
}>();
</script>

<template>
  <div
    v-if="open"
    class="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
  >
    <div
      class="w-full max-w-2xl overflow-hidden rounded-[32px] border border-fuchsia-200 bg-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.65)]"
    >
      <div
        class="grid gap-0 border-b border-fuchsia-100 bg-fuchsia-50 md:grid-cols-[0.85fr_1.15fr]"
      >
        <div class="space-y-3 border-b border-fuchsia-100 px-6 py-6 md:border-r md:border-b-0">
          <div class="text-xs font-semibold tracking-[0.24em] text-fuchsia-700 uppercase">
            {{ t("modals.customer.propsTitle") }}
          </div>
          <div
            class="rounded-2xl border border-white/70 bg-white/80 p-4 font-mono text-sm text-slate-700"
          >
            <div>customerId: "{{ props.customerId }}"</div>
            <div class="mt-1">customerName: "{{ props.customerName }}"</div>
          </div>
          <p class="text-sm leading-6 text-slate-600">
            {{ t("modals.customer.propsText") }}
          </p>
        </div>

        <div class="space-y-3 px-6 py-6">
          <div class="text-xs font-semibold tracking-[0.24em] text-fuchsia-700 uppercase">
            {{ t("modals.customer.resultTitle") }}
          </div>
          <div
            class="rounded-2xl border border-white/70 bg-white/80 p-4 font-mono text-sm text-slate-700"
          >
            { customerId, customerName, saved }
          </div>
          <p class="text-sm leading-6 text-slate-600">
            {{ t("modals.customer.resultText") }}
          </p>
        </div>
      </div>

      <div class="space-y-6 px-6 py-6">
        <div>
          <label class="text-sm font-medium text-slate-700">
            {{ t("modals.customer.inputLabel") }}
          </label>
          <input
            v-model="draftName"
            class="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-fuchsia-400"
          />
        </div>

        <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div class="text-sm font-medium text-slate-900">
            {{ t("modals.customer.payloadPreview") }}
          </div>
          <pre
            class="mt-2 overflow-x-auto text-sm leading-6 text-slate-600"
          ><code>{{ JSON.stringify({ customerId: props.customerId, customerName: draftName, saved: true }, null, 2) }}</code></pre>
        </div>
      </div>

      <div class="flex flex-wrap justify-end gap-3 border-t border-slate-100 px-6 py-5">
        <button
          class="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          @click="
            emit('close', {
              customerId: props.customerId,
              customerName: draftName,
              saved: false,
            })
          "
        >
          {{ t("modals.customer.close") }}
        </button>
        <button
          class="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          @click="
            emit('close', {
              customerId: props.customerId,
              customerName: draftName,
              saved: true,
            })
          "
        >
          {{ t("modals.customer.save") }}
        </button>
      </div>
    </div>
  </div>
</template>
