import { test, expect } from '@playwright/test';

test('Add and display task', async ({ page }) => {
  await page.goto('/');
  await page.getByText('＋ Add Task').click();
  await page.getByPlaceholder('Title').fill('Playwright Test Task');
  await page.getByText('Add').click();
  await expect(page.locator('text=Playwright Test Task')).toBeVisible();
});
