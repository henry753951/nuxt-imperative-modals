<script setup lang="ts">
type Locale = "en" | "zh-TW";
type EventTone = "accent" | "info" | "success";

interface EventEntry {
  id: string;
  detail: string;
  title: string;
  tone: EventTone;
}

interface InfoCard {
  body: string;
  eyebrow?: string;
  title: string;
}

interface CodeCard extends InfoCard {
  code: string;
}

type ResultState =
  | { kind: "none" }
  | { kind: "json"; value: unknown }
  | { kind: "text"; value: string };

const { alert, confirm, open } = useModals();
const { locale, setLocale, t } = useI18n();

const lastResult = ref<ResultState>({ kind: "none" });
const interactionLog = ref<EventEntry[]>([]);

const codeSnippets = {
  en: {
    alert: `const { alert } = useModals();

await alert(
  "Draft saved",
  "This is the simplest informational modal."
);`,
    confirm: `const { confirm } = useModals();

const accepted = await confirm(
  "Delete customer note",
  "Confirm returns true, cancel returns false."
);`,
    emit: `const emit = defineEmits<{
  (
    eventName: "close",
    result: { customerId: string; customerName: string; saved: boolean }
  ): void;
}>();`,
    open: `const result = await open("ManagementCustomerFormModal", {
  props: {
    customerId: "cus_001",
    customerName: "Ada Lovelace",
  },
});`,
    scan: `app/modals/
  AlertModal.vue
  ConfirmModal.vue
  Management/
    CustomerFormModal.vue

// generated union
type ModalName =
  | "AlertModal"
  | "ConfirmModal"
  | "ManagementCustomerFormModal";`,
    types: `type ModalName = "AlertModal" | "ConfirmModal" | "ManagementCustomerFormModal";

type ModalsPropsTypeMap = {
  AlertModal: { open: boolean; title: string; description?: string };
  ConfirmModal: { open: boolean; title: string; description?: string };
  ManagementCustomerFormModal: {
    open: boolean;
    customerId: string;
    customerName: string;
  };
};`,
    usage: `<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ModalsContainer />
</template>`,
  },
  "zh-TW": {
    alert: `const { alert } = useModals();

await alert(
  "草稿已儲存",
  "這是一個最基本的提示視窗。"
);`,
    confirm: `const { confirm } = useModals();

const accepted = await confirm(
  "刪除客戶備註",
  "使用者確認後回傳 true，取消時回傳 false。"
);`,
    emit: `const emit = defineEmits<{
  (
    eventName: "close",
    result: { customerId: string; customerName: string; saved: boolean }
  ): void;
}>();`,
    open: `const result = await open("ManagementCustomerFormModal", {
  props: {
    customerId: "cus_001",
    customerName: "Ada Lovelace",
  },
});`,
    scan: `app/modals/
  AlertModal.vue
  ConfirmModal.vue
  Management/
    CustomerFormModal.vue

// generated union
type ModalName =
  | "AlertModal"
  | "ConfirmModal"
  | "ManagementCustomerFormModal";`,
    types: `type ModalName = "AlertModal" | "ConfirmModal" | "ManagementCustomerFormModal";

type ModalsPropsTypeMap = {
  AlertModal: { open: boolean; title: string; description?: string };
  ConfirmModal: { open: boolean; title: string; description?: string };
  ManagementCustomerFormModal: {
    open: boolean;
    customerId: string;
    customerName: string;
  };
};`,
    usage: `<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ModalsContainer />
</template>`,
  },
} satisfies Record<Locale, Record<string, string>>;

const customerPayload = {
  customerId: "cus_001",
  customerName: "Ada Lovelace",
};

const toneClasses: Record<EventTone, string> = {
  accent: "border-fuchsia-400/25 bg-fuchsia-500/10 text-fuchsia-100",
  info: "border-cyan-400/25 bg-cyan-500/10 text-cyan-100",
  success: "border-emerald-400/25 bg-emerald-500/10 text-emerald-100",
};

const snippets = computed(() => codeSnippets[locale.value as Locale]);

const heroStats = computed(() => [
  {
    label: t("playground.metrics.scan"),
    value: "app/modals/**",
  },
  {
    label: t("playground.metrics.resolve"),
    value: "emit('close')",
  },
  {
    label: t("playground.metrics.types"),
    value: "ModalName",
  },
]);

const featureCards = computed<InfoCard[]>(() => [
  {
    body: t("playground.features.scanBody"),
    eyebrow: t("playground.features.scanEyebrow"),
    title: t("playground.features.scanTitle"),
  },
  {
    body: t("playground.features.typesBody"),
    eyebrow: t("playground.features.typesEyebrow"),
    title: t("playground.features.typesTitle"),
  },
  {
    body: t("playground.features.flowBody"),
    eyebrow: t("playground.features.flowEyebrow"),
    title: t("playground.features.flowTitle"),
  },
]);

const helperCards = computed<InfoCard[]>(() => [
  {
    body: t("playground.actions.alertDescription"),
    eyebrow: t("playground.actions.alertCard"),
    title: t("playground.actions.alertAction"),
  },
  {
    body: t("playground.actions.confirmDescription"),
    eyebrow: t("playground.actions.confirmCard"),
    title: t("playground.actions.confirmAction"),
  },
  {
    body: t("playground.actions.customDescription"),
    eyebrow: t("playground.actions.customCard"),
    title: t("playground.actions.customAction"),
  },
]);

const apiCards = computed<CodeCard[]>(() => [
  {
    body: t("playground.docs.helperAlertBody"),
    code: snippets.value.alert,
    eyebrow: t("playground.docs.apiReferenceEyebrow"),
    title: t("playground.docs.helperAlertTitle"),
  },
  {
    body: t("playground.docs.helperConfirmBody"),
    code: snippets.value.confirm,
    eyebrow: t("playground.docs.apiReferenceEyebrow"),
    title: t("playground.docs.helperConfirmTitle"),
  },
  {
    body: t("playground.docs.helperOpenBody"),
    code: snippets.value.open,
    eyebrow: t("playground.docs.apiReferenceEyebrow"),
    title: t("playground.docs.helperOpenTitle"),
  },
  {
    body: t("playground.events.contractBody"),
    code: snippets.value.emit,
    eyebrow: t("playground.docs.contractEyebrow"),
    title: t("playground.docs.emitSnippetTitle"),
  },
]);

const setupSteps = computed<InfoCard[]>(() => [
  {
    body: t("playground.docs.quickStartStep1Body"),
    eyebrow: "01",
    title: t("playground.docs.quickStartStep1Title"),
  },
  {
    body: t("playground.docs.quickStartStep2Body"),
    eyebrow: "02",
    title: t("playground.docs.quickStartStep2Title"),
  },
  {
    body: t("playground.docs.quickStartStep3Body"),
    eyebrow: "03",
    title: t("playground.docs.quickStartStep3Title"),
  },
]);

const systemCards = computed<CodeCard[]>(() => [
  {
    body: t("playground.docs.scanGeneratedBody"),
    code: snippets.value.types,
    eyebrow: t("playground.docs.scanGeneratedEyebrow"),
    title: t("playground.docs.scanGeneratedTitle"),
  },
  {
    body: t("playground.docs.scanRuntimeBody"),
    code: snippets.value.scan,
    eyebrow: t("playground.docs.scanRuntimeEyebrow"),
    title: t("playground.docs.scanRuntimeTitle"),
  },
]);

const actionLabels = computed<Record<EventTone, string>>(() => ({
  accent: t("playground.events.actionAccent"),
  info: t("playground.events.actionInfo"),
  success: t("playground.events.actionSuccess"),
}));

const lastResultDisplay = computed(() => {
  if (lastResult.value.kind === "none") {
    return t("playground.panel.noResult");
  }

  if (lastResult.value.kind === "json") {
    return JSON.stringify(lastResult.value.value, null, 2);
  }

  return lastResult.value.value;
});

const resetLog = () => {
  interactionLog.value = [
    {
      id: crypto.randomUUID(),
      title: t("playground.events.bootstrapTitle"),
      detail: t("playground.events.bootstrapDetail"),
      tone: "info",
    },
    {
      id: crypto.randomUUID(),
      title: t("playground.events.contractTitle"),
      detail: t("playground.events.contractBody"),
      tone: "info",
    },
  ];
};

const updateLog = (entry: Omit<EventEntry, "id">) => {
  interactionLog.value = [{ ...entry, id: crypto.randomUUID() }, ...interactionLog.value].slice(0, 5);
};

const openAlertModal = async () => {
  updateLog({
    title: t("playground.events.alertOpenTitle"),
    detail: t("playground.events.alertOpenDetail"),
    tone: "accent",
  });

  await alert(t("playground.actions.alertTitle"), t("playground.actions.alertText"));

  lastResult.value = { kind: "text", value: t("playground.actions.alertResult") };
  updateLog({
    title: t("playground.events.alertCloseTitle"),
    detail: t("playground.events.alertCloseDetail"),
    tone: "success",
  });
};

const openConfirmModal = async () => {
  updateLog({
    title: t("playground.events.confirmOpenTitle"),
    detail: t("playground.events.confirmOpenDetail"),
    tone: "accent",
  });

  const accepted = await confirm(
    t("playground.actions.confirmTitle"),
    t("playground.actions.confirmText"),
  );

  lastResult.value = {
    kind: "text",
    value: `${t("playground.actions.confirmResultPrefix")}${accepted}`,
  };
  updateLog({
    title: `${t("playground.actions.confirmResultPrefix")}${accepted}`,
    detail: t("playground.events.contractBody"),
    tone: "success",
  });
};

const openCustomerModal = async () => {
  updateLog({
    title: t("playground.actions.customAction"),
    detail: t("playground.actions.customLogOpen"),
    tone: "accent",
  });

  const result = await open("ManagementCustomerFormModal", {
    props: customerPayload,
  });

  lastResult.value = { kind: "json", value: result };
  updateLog({
    title: t("playground.events.customResolveTitle"),
    detail: t("playground.events.customResolveDetail"),
    tone: "success",
  });
};

watch(
  locale,
  () => {
    resetLog();
  },
  { immediate: true },
);
</script>

<template>
  <main class="docs-shell min-h-screen text-slate-950">
    <div class="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-4 sm:px-6 lg:px-8 lg:py-8">
      <section
        class="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/82 p-5 shadow-[0_30px_120px_-52px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:p-7 lg:p-8"
      >
        <div
          class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-900/20 to-transparent"
        />
        <div class="absolute -top-20 right-10 h-56 w-56 rounded-full bg-cyan-300/25 blur-3xl" />
        <div class="absolute -left-16 top-16 h-48 w-48 rounded-full bg-fuchsia-300/20 blur-3xl" />

        <div class="relative flex flex-wrap items-center justify-between gap-4">
          <div class="flex flex-wrap items-center gap-3">
            <div
              class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-xs font-semibold tracking-[0.24em] text-slate-700 uppercase"
            >
              <span
                class="h-2.5 w-2.5 rounded-full bg-rose-500 shadow-[0_0_0_6px_rgba(244,63,94,0.14)]"
              />
              {{ t("playground.badge") }}
            </div>
            <div
              class="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-emerald-700 uppercase"
            >
              {{ t("playground.hero.eyebrow") }}
            </div>
          </div>

          <div class="inline-flex rounded-full border border-slate-200 bg-white/85 p-1 shadow-sm">
            <button
              class="rounded-full px-3 py-2 text-sm font-medium transition"
              :class="
                locale === 'zh-TW'
                  ? 'bg-slate-950 text-white'
                  : 'text-slate-600 hover:text-slate-950'
              "
              @click="setLocale('zh-TW' as Locale)"
            >
              {{ t("playground.languageTraditionalChinese") }}
            </button>
            <button
              class="rounded-full px-3 py-2 text-sm font-medium transition"
              :class="
                locale === 'en'
                  ? 'bg-slate-950 text-white'
                  : 'text-slate-600 hover:text-slate-950'
              "
              @click="setLocale('en' as Locale)"
            >
              {{ t("playground.languageEnglish") }}
            </button>
          </div>
        </div>

        <div class="relative mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
          <div class="space-y-8">
            <div class="space-y-5">
              <p class="text-xs font-semibold tracking-[0.34em] text-slate-500 uppercase">
                {{ t("playground.hero.kicker") }}
              </p>
              <h1
                class="max-w-4xl text-4xl leading-none font-semibold tracking-[-0.05em] sm:text-6xl"
              >
                {{ t("playground.hero.heading") }}
              </h1>
              <p class="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                {{ t("playground.hero.intro") }}
              </p>
            </div>

            <div class="grid gap-3 sm:grid-cols-3">
              <button
                data-test="open-alert"
                class="group rounded-[24px] border border-amber-200/80 bg-[linear-gradient(180deg,rgba(255,251,235,1),rgba(255,255,255,0.94))] px-5 py-5 text-left shadow-[0_16px_40px_-28px_rgba(245,158,11,0.7)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(245,158,11,0.45)]"
                @click="openAlertModal"
              >
                <div class="text-[11px] font-semibold tracking-[0.26em] text-amber-700 uppercase">
                  {{ helperCards[0]?.eyebrow }}
                </div>
                <div class="mt-4 text-xl font-semibold text-slate-950">
                  {{ helperCards[0]?.title }}
                </div>
                <p class="mt-2 text-sm leading-6 text-slate-600">
                  {{ helperCards[0]?.body }}
                </p>
                <div
                  class="mt-5 text-sm font-medium text-amber-700 transition group-hover:translate-x-1"
                >
                  {{ t("playground.hero.tryNow") }}
                </div>
              </button>

              <button
                data-test="open-confirm"
                class="group rounded-[24px] border border-cyan-200/80 bg-[linear-gradient(180deg,rgba(236,254,255,1),rgba(255,255,255,0.94))] px-5 py-5 text-left shadow-[0_16px_40px_-28px_rgba(6,182,212,0.7)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(6,182,212,0.45)]"
                @click="openConfirmModal"
              >
                <div class="text-[11px] font-semibold tracking-[0.26em] text-cyan-700 uppercase">
                  {{ helperCards[1]?.eyebrow }}
                </div>
                <div class="mt-4 text-xl font-semibold text-slate-950">
                  {{ helperCards[1]?.title }}
                </div>
                <p class="mt-2 text-sm leading-6 text-slate-600">
                  {{ helperCards[1]?.body }}
                </p>
                <div
                  class="mt-5 text-sm font-medium text-cyan-700 transition group-hover:translate-x-1"
                >
                  {{ t("playground.hero.tryNow") }}
                </div>
              </button>

              <button
                data-test="open-customer"
                class="group rounded-[24px] border border-fuchsia-200/80 bg-[linear-gradient(180deg,rgba(253,244,255,1),rgba(255,255,255,0.94))] px-5 py-5 text-left shadow-[0_16px_40px_-28px_rgba(217,70,239,0.7)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(217,70,239,0.45)]"
                @click="openCustomerModal"
              >
                <div class="text-[11px] font-semibold tracking-[0.26em] text-fuchsia-700 uppercase">
                  {{ helperCards[2]?.eyebrow }}
                </div>
                <div class="mt-4 text-xl font-semibold text-slate-950">
                  {{ helperCards[2]?.title }}
                </div>
                <p class="mt-2 text-sm leading-6 text-slate-600">
                  {{ helperCards[2]?.body }}
                </p>
                <div
                  class="mt-5 text-sm font-medium text-fuchsia-700 transition group-hover:translate-x-1"
                >
                  {{ t("playground.hero.tryNow") }}
                </div>
              </button>
            </div>

            <div class="grid gap-4 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
              <div class="rounded-[28px] border border-slate-200 bg-slate-50/90 p-5">
                <div class="text-xs font-semibold tracking-[0.24em] text-slate-500 uppercase">
                  {{ t("playground.hero.docsTitle") }}
                </div>
                <p class="mt-3 text-sm leading-7 text-slate-700">
                  {{ t("playground.hero.docsIntro") }}
                </p>
                <div class="mt-5 flex flex-wrap gap-2">
                  <div
                    v-for="stat in heroStats"
                    :key="stat.label"
                    class="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600"
                  >
                    <span class="font-semibold text-slate-950">{{ stat.value }}</span>
                    <span class="mx-1 text-slate-300">/</span>
                    <span>{{ stat.label }}</span>
                  </div>
                </div>
              </div>

              <div class="rounded-[28px] border border-slate-200 bg-slate-950 p-5 text-white">
                <div class="flex items-center justify-between gap-3">
                  <div>
                    <div class="text-xs font-semibold tracking-[0.24em] text-slate-400 uppercase">
                      {{ t("playground.hero.previewEyebrow") }}
                    </div>
                    <div class="mt-2 text-lg font-semibold">
                      {{ t("playground.hero.previewTitle") }}
                    </div>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="h-2.5 w-2.5 rounded-full bg-rose-400" />
                    <span class="h-2.5 w-2.5 rounded-full bg-amber-300" />
                    <span class="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                </div>

                <pre
                  class="mt-5 overflow-x-auto rounded-[24px] border border-white/10 bg-black/30 px-4 py-4 text-sm leading-7 text-emerald-300"
                ><code>{{ snippets.open }}</code></pre>
              </div>
            </div>
          </div>

          <aside
            class="relative overflow-hidden rounded-[30px] bg-slate-950 p-5 text-slate-50 shadow-[0_30px_90px_-42px_rgba(15,23,42,0.85)]"
          >
            <div
              class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
            <div class="grid gap-4">
              <div class="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <div class="flex items-center justify-between gap-3">
                  <div>
                    <div class="text-xs tracking-[0.3em] text-slate-400 uppercase">
                      {{ t("playground.panel.liveEyebrow") }}
                    </div>
                    <div class="mt-2 text-xl font-semibold text-white">
                      {{ t("playground.panel.liveTitle") }}
                    </div>
                  </div>
                  <div class="rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-200">
                    {{ t("playground.panel.liveBadge") }}
                  </div>
                </div>

                <div class="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <div class="rounded-[22px] border border-white/10 bg-black/20 p-4">
                    <div class="text-[11px] tracking-[0.26em] text-slate-500 uppercase">
                      {{ t("playground.panel.lastResultLabel") }}
                    </div>
                    <pre
                      data-test="last-result"
                      class="mt-3 overflow-x-auto rounded-2xl border border-white/10 bg-slate-950 px-4 py-4 font-mono text-sm leading-7 whitespace-pre-wrap text-white"
                    ><code>{{ lastResultDisplay }}</code></pre>
                  </div>

                  <div class="rounded-[22px] border border-white/10 bg-black/20 p-4">
                    <div class="text-[11px] tracking-[0.26em] text-slate-500 uppercase">
                      {{ t("playground.panel.titleTypedName") }}
                    </div>
                    <div
                      class="mt-3 rounded-2xl border border-emerald-400/15 bg-emerald-500/10 px-4 py-4 font-mono text-sm leading-7 text-emerald-200"
                    >
                      {{ t("playground.panel.typedModalName") }}
                    </div>
                    <p class="mt-3 text-sm leading-6 text-slate-300">
                      {{ t("playground.panel.description") }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <div class="flex items-center justify-between gap-3">
                  <div class="text-xs tracking-[0.3em] text-slate-400 uppercase">
                    {{ t("playground.panel.interactionTitle") }}
                  </div>
                  <div class="text-xs text-slate-500">{{ interactionLog.length }} entries</div>
                </div>

                <ul class="mt-4 grid gap-3">
                  <li
                    v-for="entry in interactionLog"
                    :key="entry.id"
                    class="rounded-[20px] border border-white/10 bg-black/20 px-4 py-4"
                  >
                    <div class="flex items-start justify-between gap-3">
                      <div class="min-w-0">
                        <div class="text-sm font-semibold text-white">{{ entry.title }}</div>
                        <p class="mt-1 text-sm leading-6 text-slate-300">{{ entry.detail }}</p>
                      </div>
                      <span
                        class="shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-[0.18em] uppercase"
                        :class="toneClasses[entry.tone]"
                      >
                        {{ actionLabels[entry.tone] }}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="grid gap-3 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <article
                  v-for="card in featureCards"
                  :key="card.title"
                  class="rounded-[22px] border border-white/10 bg-white/5 p-4"
                >
                  <div class="text-[11px] font-semibold tracking-[0.24em] text-slate-400 uppercase">
                    {{ card.eyebrow }}
                  </div>
                  <h2 class="mt-3 text-base font-semibold text-white">{{ card.title }}</h2>
                  <p class="mt-2 text-sm leading-6 text-slate-300">{{ card.body }}</p>
                </article>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section class="grid gap-6">
        <article
          class="overflow-hidden rounded-[30px] border border-slate-200 bg-white/90 p-6 shadow-[0_24px_60px_-44px_rgba(15,23,42,0.28)] backdrop-blur"
        >
          <div class="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div class="text-xs font-semibold tracking-[0.28em] text-slate-500 uppercase">
                {{ t("playground.docs.apiReferenceEyebrow") }}
              </div>
              <h2 class="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950">
                {{ t("playground.docs.helperTitle") }}
              </h2>
            </div>
            <p class="max-w-xl text-sm leading-7 text-slate-600">
              {{ t("playground.docs.exampleFlowBody") }}
            </p>
          </div>

          <div class="mt-6 grid gap-4 xl:grid-cols-2">
            <article
              v-for="card in apiCards"
              :key="card.title"
              class="rounded-[26px] border border-slate-200 bg-slate-50/80 p-5"
            >
              <div class="text-[11px] font-semibold tracking-[0.24em] text-slate-500 uppercase">
                {{ card.eyebrow }}
              </div>
              <div class="mt-3 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 class="text-xl font-semibold text-slate-950">{{ card.title }}</h3>
                  <p class="mt-2 max-w-2xl text-sm leading-7 text-slate-600">{{ card.body }}</p>
                </div>
              </div>

              <pre
                class="mt-5 overflow-x-auto rounded-[24px] bg-slate-950 px-4 py-4 text-sm leading-7 text-emerald-300"
              ><code>{{ card.code }}</code></pre>
            </article>
          </div>
        </article>

        <article
          class="overflow-hidden rounded-[30px] border border-slate-200 bg-white/90 p-6 shadow-[0_24px_60px_-44px_rgba(15,23,42,0.28)] backdrop-blur"
        >
          <div class="grid gap-4">
            <div class="min-w-0 rounded-[26px] border border-slate-200 bg-slate-50/80 p-5">
              <div class="text-xs font-semibold tracking-[0.28em] text-slate-500 uppercase">
                {{ t("playground.docs.systemEyebrow") }}
              </div>
              <h2 class="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950">
                {{ t("playground.docs.scanSectionTitle") }}
              </h2>
              <p class="mt-3 text-sm leading-7 text-slate-600">
                {{ t("playground.docs.scanBody") }}
              </p>

              <div class="mt-6 grid gap-3">
                <div
                  v-for="step in setupSteps"
                  :key="step.title"
                  class="rounded-[22px] border border-slate-200 bg-white px-4 py-4"
                >
                  <div class="text-[11px] font-semibold tracking-[0.22em] text-slate-500 uppercase">
                    {{ step.eyebrow }}
                  </div>
                  <div class="mt-2 text-base font-semibold text-slate-950">{{ step.title }}</div>
                  <p class="mt-2 text-sm leading-7 text-slate-600">{{ step.body }}</p>
                </div>
              </div>

              <pre
                class="mt-5 overflow-x-auto rounded-[24px] bg-slate-950 px-4 py-4 text-sm leading-7 text-emerald-300"
              ><code>{{ snippets.usage }}</code></pre>
            </div>

            <div class="grid gap-4">
              <article
                v-for="card in systemCards"
                :key="card.title"
                class="min-w-0 rounded-[26px] border border-slate-200 bg-slate-50/80 p-5"
              >
                <div class="text-[11px] font-semibold tracking-[0.24em] text-slate-500 uppercase">
                  {{ card.eyebrow }}
                </div>
                <h3 class="mt-3 text-xl font-semibold text-slate-950">{{ card.title }}</h3>
                <p class="mt-2 text-sm leading-7 text-slate-600">{{ card.body }}</p>

                <pre
                  class="mt-5 overflow-x-auto rounded-[24px] bg-slate-950 px-4 py-4 text-sm leading-7 text-emerald-300"
                ><code>{{ card.code }}</code></pre>
              </article>
            </div>
          </div>
        </article>
      </section>
    </div>
  </main>
</template>
