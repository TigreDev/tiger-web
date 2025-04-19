const isCi = require('is-ci');
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  globalSetup: './src/e2e/global-setup.ts',
  reporter: [['html'], ['github']],
  expect: {
    timeout: 45 * 1000,
  },
  use: {
    baseURL: 'http://localhost:4000',
    trace: 'on-first-retry',
    actionTimeout: 0,
    timezoneId: 'Europe/Madrid',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '!(*.mobile).spec.ts',
    },
    {
      name: 'Mobile chrome',
      use: { ...devices['Pixel 5'] },
      testMatch: '*.mobile.spec.ts',
    },
  ],

  webServer: {
    command: isCi ? 'pnpm playwright:start' : 'pnpm playwright:dev',
    reuseExistingServer: isCi ? false : true,
    url: 'http://127.0.0.1:4000/',
  },
});
