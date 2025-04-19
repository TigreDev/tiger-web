import { test, expect } from '@playwright/test';

test('Home page', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle("Ruben Tigre | Frontend developer");
});
