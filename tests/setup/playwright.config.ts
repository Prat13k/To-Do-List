import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  webServer: {
    command: 'npm run dev',
    port: 5173,
    timeout: 20 * 1000,
    reuseExistingServer: !process.env.CI,
  }
});
