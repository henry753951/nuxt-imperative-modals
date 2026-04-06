# nuxt-imperative-modals

Imperative modal orchestration for Nuxt. The module scans `app/modals`, registers those components globally with a `Modals` prefix, and generates prop and emit typings for `useModals()`.

## What it gives you

- `useModals()` auto-imported from the module.
- `app/modals` auto-registered as global components.
- Runtime component names follow `Modals${ModalName}`.
- Generated `ModalName`, `ModalsPropsTypeMap`, `ModalsEmitTypeMap`, and `ModalsSlotsTypeMap` from your modal files.
- A built-in `<ModalsContainer />` component.
- A `playground/` app for local verification.
- A `test/` suite for basic module integration coverage.

## Install

```bash
bun add nuxt-imperative-modals
```

Then register the module in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ["nuxt-imperative-modals"],
})
```

## Usage

Create modals under `app/modals`:

```text
app/
  modals/
    AlertModal.vue
    ConfirmModal.vue
    Management/
      CustomerFormModal.vue
```

Put the container in a layout or in `app.vue`:

```vue
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ModalsContainer />
</template>
```

## Quick example

Open a modal imperatively and await the result:

```ts
const { open, confirm, alert } = useModals()

await alert("Saved")

const accepted = await confirm("Delete record", "This action cannot be undone.")

const result = await open("ManagementCustomerFormModal", {
  props: {
    customerId: "cus_123",
  },
})
```

## How naming works

- `app/modals/AlertModal.vue` becomes `open("AlertModal")`
- `app/modals/Management/CustomerFormModal.vue` becomes `open("ManagementCustomerFormModal")`
- At runtime the rendered global component name is prefixed as `Modals...`

Examples:

- `app/modals/AlertModal.vue` -> `ModalsAlertModal`
- `app/modals/Management/CustomerFormModal.vue` -> `ModalsManagementCustomerFormModal`

## Passing props into a modal

The `props` object is inferred from the Vue props type of the modal component.

```vue
<!-- app/modals/Management/CustomerFormModal.vue -->
<script setup lang="ts">
defineProps<{
  customerId: string
  customerName: string
  open: boolean
}>()
</script>
```

```ts
const { open } = useModals()

await open("ManagementCustomerFormModal", {
  props: {
    customerId: "cus_123",
    customerName: "Ada Lovelace",
  },
})
```

If you pass the wrong prop name or type, TypeScript should flag it.

## Returning values from a modal

The result type comes from the second argument of the modal's `close` emit.

In your modal component, emit `close` and pass the return value as the second argument:

```vue
<script setup lang="ts">
const emit = defineEmits<{
  (e: "close", result: { saved: boolean; customerId: string }): void
}>()
</script>

<template>
  <button @click="emit('close', { saved: true, customerId: 'cus_123' })">Save</button>
</template>
```

Then `open()` resolves to that payload:

```ts
const result = await open("ManagementCustomerFormModal", {
  props: {
    customerId: "cus_123",
    customerName: "Ada Lovelace",
  },
})

result.saved
result.customerId
```

## `alert()` helper

`alert()` is a convenience wrapper around `open("AlertModal")`.

Expected modal:

```vue
<!-- app/modals/AlertModal.vue -->
<script setup lang="ts">
defineProps<{
  description?: string
  open: boolean
  title: string
}>()

const emit = defineEmits<{
  (eventName: "close"): void
}>()
</script>
```

Usage:

```ts
const { alert } = useModals()

await alert("Draft saved", "Your changes were stored successfully.")
```

`alert()` resolves when the modal closes.

## `confirm()` helper

`confirm()` is a convenience wrapper around `open("ConfirmModal")` and expects the modal to emit a boolean.

Expected modal:

```vue
<!-- app/modals/ConfirmModal.vue -->
<script setup lang="ts">
defineProps<{
  description?: string
  open: boolean
  title: string
}>()

const emit = defineEmits<{
  (eventName: "close", accepted: boolean): void
}>()
</script>
```

Usage:

```ts
const { confirm } = useModals()

const accepted = await confirm(
  "Delete customer note",
  "This action cannot be undone."
)
```

`accepted` is inferred as `boolean`.

## Full custom flow

```ts
const { open } = useModals()

const result = await open("ManagementCustomerFormModal", {
  id: "customer-editor",
  props: {
    customerId: "cus_123",
    customerName: "Ada Lovelace",
  },
})

if (result.saved) {
  console.log("Saved customer", result.customerId)
}
```

## Playground

Run the demo app:

```bash
bun run dev
```

The playground demonstrates:

- `alert(title, description)`
- `confirm(title, description)`
- `open(modalName, { props })`
- emitting a typed result payload from `close`
- the generated modal-name convention from nested `app/modals` paths

## Module options

```ts
export default defineNuxtConfig({
  modules: ["nuxt-imperative-modals"],
  imperativeModals: {
    dir: "app/modals",
    componentPrefix: "Modals",
  },
})
```

## Local development

```bash
bun install
bun run dev
bun run lint
bun run fmt:check
bun run test
bun run build
```

- `bun run dev` starts the sample app in `playground/`.
- `bun run lint` runs Oxlint.
- `bun run fmt` formats the repo with Oxfmt.
- `bun run fmt:check` checks formatting without writing.
- `bun run test` runs the integration test against the playground app.

## Publish

```bash
bun run build
npm publish --access public
```

Before publishing, replace the placeholder repository URLs in `package.json`.
