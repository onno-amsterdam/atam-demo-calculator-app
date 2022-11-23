import { PlaywrightTestConfig } from "@playwright/test";
import { merge } from 'lodash';

import baseConfig from '../playwright/playwright.config';

const config: PlaywrightTestConfig = merge(baseConfig, {
  testDir: '.'
});

export default config;