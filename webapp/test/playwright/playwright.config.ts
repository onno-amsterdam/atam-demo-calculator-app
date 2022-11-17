import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  use: {
    baseURL: 'http://localhost:3000',
    headless: false,
    launchOptions: {
      devtools: true
    },
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    trace: 'on-first-retry',
  },
  // reporter: [['line'], ['allure-playwright']],
  retries: 0
};
export default config;
