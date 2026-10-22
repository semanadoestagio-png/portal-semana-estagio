import { expect, test } from "@playwright/test";

test("página inicial pública mostra a feira e leva à área da empresa", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Semana do Estágio/);
  await expect(
    page.getByRole("heading", { level: 1, name: "A maior feira de estágio jurídico da América Latina" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Como funciona" })).toBeVisible();

  await page.getByRole("link", { name: "Acessar a área da empresa" }).click();
  await expect(page).toHaveURL(/\/entrar$/);
  await expect(page.getByRole("heading", { level: 1, name: "Área da empresa" })).toBeVisible();
});

test("página inicial não tem rolagem horizontal", async ({ page }) => {
  await page.goto("/");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});
