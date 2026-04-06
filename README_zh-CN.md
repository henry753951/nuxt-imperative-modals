# @henry753951/nuxt-imperative-modals

[English](README.md) | [Chinese](README_zh-CN.md) | [Traditional Chinese](README_zh-Hant.md)

用于 Nuxt 的命令式（imperative）Modal 管理模块。该模块会扫描 `app/modals` 目录，将其中的组件自动注册为全局组件（带 `Modals` 前缀），并为 `useModals()` 生成对应的 props 和 emit 类型。

---

## 功能

- 自动提供 `useModals()`（无需手动导入）
- `app/modals` 目录下组件自动注册为全局组件
- 运行时组件命名规则：`Modals${ModalName}`
- 从 modal 组件中推导类型：
  - `ModalName`
  - `ModalsPropsTypeMap`
  - `ModalsEmitTypeMap`
  - `ModalsSlotsTypeMap`

- 内置 `<ModalsContainer />` 容器组件
- 提供 `playground/` 示例应用
- 提供 `test/` 基础集成测试

---

## 安装

```bash
bun add @henry753951/nuxt-imperative-modals
```

如果要从 GitHub Packages 安装，请先加入 `.npmrc`：

```ini
@henry753951:registry=https://npm.pkg.github.com
```

在 `nuxt.config.ts` 中注册模块：

```ts
export default defineNuxtConfig({
   modules: ["@henry753951/nuxt-imperative-modals"],
});
```

---

## 使用方式

在 `app/modals` 下创建 modal：

```text
app/
  modals/
    AlertModal.vue
    ConfirmModal.vue
    Management/
      CustomerFormModal.vue
```

在 layout 或 `app.vue` 中放置容器：

```vue
<template>
   <NuxtLayout>
      <NuxtPage />
   </NuxtLayout>
   <ModalsContainer />
</template>
```

---

## 快速示例

通过命令式方式打开 modal，并等待返回结果：

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

## 命名规则

- `app/modals/AlertModal.vue` → `open("AlertModal")`
- `app/modals/Management/CustomerFormModal.vue` → `open("ManagementCustomerFormModal")`

运行时实际渲染的组件名称会带前缀：

- `AlertModal` → `ModalsAlertModal`
- `ManagementCustomerFormModal` → `ModalsManagementCustomerFormModal`

---

## 传递 props

`props` 会根据 modal 组件的类型自动推导：

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

如果传入错误的 prop 名称或类型，TypeScript 会提示错误。

---

## 从 modal 返回数据

返回值类型来自 modal 的 `close` emit 第二个参数：

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

调用方可以获取该结果：

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

`alert()` 是 `open("AlertModal")` 的简化封装。

预期 modal：

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

使用方式：

```ts
const { alert } = useModals();

await alert("Draft saved", "Your changes were stored successfully.");
```

modal 关闭后，Promise 会 resolve。

---

## `confirm()`

`confirm()` 是 `open("ConfirmModal")` 的简化封装，返回 boolean：

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

## 自定义流程

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

运行示例应用：

```bash
bun run dev
```

示例内容包括：

- `alert(title, description)`
- `confirm(title, description)`
- `open(modalName, { props })`
- 类型化的 `close` 返回数据
- 基于嵌套路径生成的命名规则
- 与 Tailwind CSS v4 的集成示例

---

## 模块选项

```ts
export default defineNuxtConfig({
   modules: ["@henry753951/nuxt-imperative-modals"],
   imperativeModals: {
      dir: "app/modals",
      componentPrefix: "Modals",
   },
});
```

---

## 本地开发

```bash
bun install
bun run dev
bun run lint
bun run fmt:check
bun run test
bun run build
```

- `dev`：启动 `playground/`
- `lint`：运行 Oxlint
- `fmt` / `fmt:check`：使用 Oxfmt 进行格式化
- `test`：执行集成测试
