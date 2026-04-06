<script setup lang="ts">
const { alert, confirm, open } = useModals();

const lastResult = ref("nothing yet");
const interactionLog = ref<string[]>([
  "Ready. Click any demo card to open a modal.",
  "Alert resolves when the modal closes.",
  "Confirm resolves a boolean.",
  "Custom modal resolves the payload you emit from close.",
]);

const customerPayload = {
  customerId: "cus_001",
  customerName: "Ada Lovelace",
};

const appendLog = (message: string) => {
  interactionLog.value = [message, ...interactionLog.value].slice(0, 6);
};

const openAlertModal = async () => {
  appendLog("Opening AlertModal with title and description props.");
  await alert("Draft saved", "AlertModal resolves after the user closes it.");
  lastResult.value = "alert closed";
  appendLog("AlertModal closed. Promise resolved with void.");
};

const openConfirmModal = async () => {
  appendLog("Opening ConfirmModal and awaiting a boolean.");
  const accepted = await confirm(
    "Delete customer note",
    "ConfirmModal emits true or false from its close event."
  );
  lastResult.value = `confirm:${accepted}`;
  appendLog(`ConfirmModal resolved with ${accepted}.`);
};

const openCustomerModal = async () => {
  appendLog(
    `Opening ManagementCustomerFormModal with props ${JSON.stringify(customerPayload)}.`
  );
  const result = await open("ManagementCustomerFormModal", {
    props: customerPayload,
  });

  lastResult.value = JSON.stringify(result);
  appendLog(`ManagementCustomerFormModal resolved with ${JSON.stringify(result)}.`);
};

const snippets = {
  alert: `const { alert } = useModals();

await alert("Draft saved", "AlertModal resolves after close.");`,
  confirm: `const { confirm } = useModals();

const accepted = await confirm(
  "Delete customer note",
  "ConfirmModal emits true or false."
);`,
  custom: `const { open } = useModals();

const result = await open("ManagementCustomerFormModal", {
  props: {
    customerId: "cus_001",
    customerName: "Ada Lovelace",
  },
});`,
  emit: `const emit = defineEmits<{
  (
    eventName: "close",
    result: { saved: boolean; customerId: string; customerName: string }
  ): void;
}>();`,
};
</script>

<template>
  <main
    class="min-h-screen bg-[radial-gradient(circle_at_top,#fdf2f8_0%,#fff7ed_35%,#ffffff_75%)] text-slate-900"
  >
    <div class="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 lg:px-10">
      <section
        class="overflow-hidden rounded-[32px] border border-white/80 bg-white/80 shadow-[0_30px_120px_-48px_rgba(15,23,42,0.4)] backdrop-blur"
      >
        <div class="grid gap-8 px-8 py-10 lg:grid-cols-[1.25fr_0.9fr] lg:px-12 lg:py-12">
          <div class="space-y-6">
            <div
              class="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-sm font-medium text-rose-700"
            >
              <span class="h-2 w-2 rounded-full bg-rose-500" />
              nuxt-imperative-modals playground
            </div>
            <div class="space-y-4">
              <h1
                class="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl"
              >
                Typed imperative modals for Nuxt, with props in and results out.
              </h1>
              <p class="max-w-2xl text-lg leading-8 text-slate-600">
                This demo shows the full flow: global registration from
                <code class="rounded bg-slate-100 px-2 py-1 text-sm">app/modals</code>, typed props
                passed through <code class="rounded bg-slate-100 px-2 py-1 text-sm">open()</code>,
                and payloads returned from the modal's
                <code class="rounded bg-slate-100 px-2 py-1 text-sm">@close</code> event.
              </p>
            </div>

            <div class="grid gap-4 sm:grid-cols-3">
              <button
                data-test="open-alert"
                class="group rounded-3xl border border-amber-200 bg-amber-50 p-5 text-left transition hover:-translate-y-1 hover:shadow-lg"
                @click="openAlertModal"
              >
                <div class="text-sm font-medium text-amber-700">Shortcut helper</div>
                <div class="mt-2 text-2xl font-semibold text-slate-900">Alert</div>
                <p class="mt-2 text-sm leading-6 text-slate-600">
                  Demonstrates <code>alert(title, description)</code>.
                </p>
              </button>

              <button
                data-test="open-confirm"
                class="group rounded-3xl border border-sky-200 bg-sky-50 p-5 text-left transition hover:-translate-y-1 hover:shadow-lg"
                @click="openConfirmModal"
              >
                <div class="text-sm font-medium text-sky-700">Boolean result</div>
                <div class="mt-2 text-2xl font-semibold text-slate-900">Confirm</div>
                <p class="mt-2 text-sm leading-6 text-slate-600">
                  Demonstrates <code>confirm()</code> resolving to <code>true | false</code>.
                </p>
              </button>

              <button
                data-test="open-customer"
                class="group rounded-3xl border border-fuchsia-200 bg-fuchsia-50 p-5 text-left transition hover:-translate-y-1 hover:shadow-lg"
                @click="openCustomerModal"
              >
                <div class="text-sm font-medium text-fuchsia-700">Custom payload</div>
                <div class="mt-2 text-2xl font-semibold text-slate-900">Open</div>
                <p class="mt-2 text-sm leading-6 text-slate-600">
                  Demonstrates typed props and a structured return value.
                </p>
              </button>
            </div>
          </div>

          <div class="rounded-[28px] bg-slate-950 p-6 text-slate-50 shadow-2xl">
            <div class="flex items-center justify-between gap-4">
              <div>
                <div class="text-sm uppercase tracking-[0.2em] text-slate-400">Last result</div>
                <div data-test="last-result" class="mt-2 break-all font-mono text-sm leading-7">
                  {{ lastResult }}
                </div>
              </div>
              <div class="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-right">
                <div class="text-xs text-slate-400">Typed modal name</div>
                <div class="mt-1 font-mono text-sm text-emerald-300">
                  ManagementCustomerFormModal
                </div>
              </div>
            </div>

            <div class="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div class="text-sm font-medium text-white">Interaction log</div>
              <ul class="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                <li
                  v-for="entry in interactionLog"
                  :key="entry"
                  class="rounded-xl border border-white/5 bg-black/10 px-3 py-2"
                >
                  {{ entry }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article class="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm">
          <div class="flex items-center justify-between gap-4">
            <div>
              <h2 class="text-2xl font-semibold text-slate-950">How the API maps to runtime</h2>
              <p class="mt-2 text-sm leading-6 text-slate-600">
                The module scans <code>app/modals</code>, generates a <code>ModalName</code> union,
                and renders matching global components with the <code>Modals</code> prefix.
              </p>
            </div>
          </div>

          <div class="mt-6 grid gap-4">
            <div class="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div class="text-sm font-medium text-slate-500">Naming</div>
              <div class="mt-2 font-mono text-sm text-slate-900">
                app/modals/Management/CustomerFormModal.vue
              </div>
              <div class="mt-2 text-sm text-slate-600">
                <span class="font-mono text-slate-900">open("ManagementCustomerFormModal")</span>
                renders
                <span class="font-mono text-slate-900">ModalsManagementCustomerFormModal</span>.
              </div>
            </div>

            <div class="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div class="text-sm font-medium text-slate-500">Props in</div>
              <div class="mt-2 text-sm leading-6 text-slate-700">
                The object passed to <code>open(..., { props })</code> is checked against the Vue
                props type of that modal component.
              </div>
            </div>

            <div class="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div class="text-sm font-medium text-slate-500">Result out</div>
              <div class="mt-2 text-sm leading-6 text-slate-700">
                The second argument of <code>emit("close", result)</code> becomes the resolved value
                of the promise returned by <code>open()</code>.
              </div>
            </div>
          </div>
        </article>

        <article
          class="rounded-[28px] border border-slate-200 bg-slate-950 p-7 text-slate-50 shadow-sm"
        >
          <h2 class="text-2xl font-semibold">Code snippets</h2>
          <div class="mt-5 space-y-4">
            <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div class="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">Alert</div>
              <pre
                class="overflow-x-auto text-sm leading-6 text-emerald-300"
              ><code>{{ snippets.alert }}</code></pre>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div class="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">Confirm</div>
              <pre
                class="overflow-x-auto text-sm leading-6 text-sky-300"
              ><code>{{ snippets.confirm }}</code></pre>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div class="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">Custom open</div>
              <pre
                class="overflow-x-auto text-sm leading-6 text-fuchsia-300"
              ><code>{{ snippets.custom }}</code></pre>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div class="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">Close emit</div>
              <pre
                class="overflow-x-auto text-sm leading-6 text-amber-300"
              ><code>{{ snippets.emit }}</code></pre>
            </div>
          </div>
        </article>
      </section>
    </div>
  </main>
</template>
