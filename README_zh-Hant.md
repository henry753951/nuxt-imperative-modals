# nuxt-imperative-modals

[English](README.md) | [Chinese](README_zh-CN.md) | [Traditional Chinese](README_zh-Hant.md)

用於 Nuxt 的命令式（imperative）Modal 管理模組。它會掃描 `app/modals` 目錄，將裡面的元件自動註冊為全域元件（加上 `Modals` 前綴），並替 `useModals()` 產生對應的 props 與 emit 型別。

---

## 功能

- 自動提供 `useModals()` composable（無需手動 import）
- `app/modals` 內的元件自動註冊為全域元件
- 執行時元件名稱格式：`Modals${ModalName}`
- 從 modal 元件推導型別：
  - `ModalName`
  - `ModalsPropsTypeMap`
  - `ModalsEmitTypeMap`
  - `ModalsSlotsTypeMap`

- 內建 `<ModalsContainer />` 容器元件
- 提供 `playground/` 範例應用
- 提供 `test/` 基本整合測試

---

## 安裝

```bash
bun add nuxt-imperative-modals
```

在 `nuxt.config.ts` 註冊模組：

```ts
export default defineNuxtConfig({
   modules: ["nuxt-imperative-modals"],
});
```

---

## 使用方式

在 `app/modals` 建立 modal 元件：

```text
app/
  modals/
    AlertModal.vue
    ConfirmModal.vue
    Management/
      CustomerFormModal.vue
```

在 layout 或 `app.vue` 中加入容器：

```vue
<template>
   <NuxtLayout>
      <NuxtPage />
   </NuxtLayout>
   <ModalsContainer />
</template>
```

---

## 快速範例

用命令式方式開啟 modal，並等待回傳結果：

```ts
const { open, confirm, alert } = useModals();

await alert("Saved");

const accepted = await confirm(
   "Delete record",
   "This action cannot be undone.",
);

const result = await open("ManagementCustomerFormModal", {
   props: {
      customerId: "cus_123",
   },
});
```

---

## 命名規則

- `app/modals/AlertModal.vue` → `open("AlertModal")`
- `app/modals/Management/CustomerFormModal.vue` → `open("ManagementCustomerFormModal")`

實際渲染的全域元件名稱會加上前綴：

- `AlertModal` → `ModalsAlertModal`
- `ManagementCustomerFormModal` → `ModalsManagementCustomerFormModal`

---

## 傳遞 props

`props` 會依 modal 元件的型別自動推導：

```vue
<script setup lang="ts">
defineProps<{
   customerId: string;
   customerName: string;
   open: boolean;
}>();
</script>
```

```ts
const { open } = useModals();

await open("ManagementCustomerFormModal", {
   props: {
      customerId: "cus_123",
      customerName: "Ada Lovelace",
   },
});
```

若 props 名稱或型別不符合，TypeScript 會提示錯誤。

---

## 從 modal 回傳資料

回傳型別來自 `close` emit 的第二個參數：

```vue
<script setup lang="ts">
const emit = defineEmits<{
   (e: "close", result: { saved: boolean; customerId: string }): void;
}>();
</script>

<template>
   <button @click="emit('close', { saved: true, customerId: 'cus_123' })">
      Save
   </button>
</template>
```

呼叫端會取得該結果：

```ts
const result = await open("ManagementCustomerFormModal", {
   props: {
      customerId: "cus_123",
      customerName: "Ada Lovelace",
   },
});

result.saved;
result.customerId;
```

---

## `alert()`

`alert()` 是 `open("AlertModal")` 的簡化包裝。

預期 modal：

```vue
<script setup lang="ts">
defineProps<{
   description?: string;
   open: boolean;
   title: string;
}>();

const emit = defineEmits<{
   (eventName: "close"): void;
}>();
</script>
```

使用：

```ts
const { alert } = useModals();

await alert("Draft saved", "Your changes were stored successfully.");
```

modal 關閉時，Promise 會 resolve。

---

## `confirm()`

`confirm()` 是 `open("ConfirmModal")` 的簡化包裝，回傳 boolean：

```vue
<script setup lang="ts">
defineProps<{
   description?: string;
   open: boolean;
   title: string;
}>();

const emit = defineEmits<{
   (eventName: "close", accepted: boolean): void;
}>();
</script>
```

```ts
const { confirm } = useModals();

const accepted = await confirm(
   "Delete customer note",
   "This action cannot be undone.",
);
```

---

## 自訂流程

```ts
const { open } = useModals();

const result = await open("ManagementCustomerFormModal", {
   id: "customer-editor",
   props: {
      customerId: "cus_123",
      customerName: "Ada Lovelace",
   },
});

if (result.saved) {
   console.log("Saved customer", result.customerId);
}
```

---

## Playground

```bash
bun run dev
```

內容包含：

- `alert(title, description)`
- `confirm(title, description)`
- `open(modalName, { props })`
- 型別化的 `close` 回傳資料
- 巢狀路徑對應的命名規則
- 與 Tailwind CSS v4 的整合示範

---

## 模組選項

```ts
export default defineNuxtConfig({
   modules: ["nuxt-imperative-modals"],
   imperativeModals: {
      dir: "app/modals",
      componentPrefix: "Modals",
   },
});
```

---

## 本地開發

```bash
bun install
bun run dev
bun run lint
bun run fmt:check
bun run test
bun run build
```

- `dev`：啟動 `playground/`
- `lint`：使用 Oxlint
- `fmt` / `fmt:check`：使用 Oxfmt
- `test`：執行整合測試
