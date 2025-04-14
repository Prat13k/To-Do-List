import { test, expect } from '@playwright/test';

test('Change theme and language', async ({ page }) => {
  await page.goto('/settings');
  await page.getByText('🌐 EN').click(); // toggle lang
  await page.getByText('🌐 ES').click(); // back to ES
  await page.getByText('🌙 Theme').click(); // toggle theme
  await expect(page).toHaveURL('/settings');
});
