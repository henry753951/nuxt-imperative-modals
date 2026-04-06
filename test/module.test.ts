import { resolve } from "node:path";
import { $fetch, setup } from "@nuxt/test-utils/e2e";
import { describe, expect, it } from "vitest";

await setup({
  rootDir: resolve(process.cwd(), "playground"),
  server: true,
  browser: false,
});

describe("nuxt-imperative-modals playground", () => {
  it("renders the playground page with typed modal example", async () => {
    const html = await $fetch("/");

    expect(html).toContain("ManagementCustomerFormModal");
    expect(html).toContain("把 modal 當成 Promise 使用，同時保留完整型別推導");
    expect(html).toContain("開啟提示視窗");
  });
});
