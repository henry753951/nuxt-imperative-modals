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

    expect(html).toContain("nuxt-imperative-modals playground");
    expect(html).toContain("ManagementCustomerFormModal");
    expect(html).toContain("Typed imperative modals for Nuxt, with props in and results out.");
    expect(html).toContain("alert(title, description)");
  });
});
