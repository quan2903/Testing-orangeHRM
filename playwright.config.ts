import { defineConfig, devices } from '@playwright/test';

const testDirs = [

  { name: 'PIM tests', dir: './PIM/' },
  { name: 'Leave', dir: './Leave/' },
  { name: 'Admin', dir:'./Admin'}
  // thêm bao nhiêu folder test cũng được
];

const browsers = [
  { name: 'chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
  // { name: 'edge', use: { ...devices['Desktop Edge'], channel: 'msedge' } },
];

const projects = testDirs.flatMap(test =>
  browsers.map(browser => ({
    name: `${test.name}-${browser.name}`,
    testDir: test.dir,
    use: { headless: true},
  }))
);

export default defineConfig({
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 2,
  reporter: 'html',
  timeout: 120000,
  expect: { timeout: 20000 },
  
  use: {
    baseURL: 'http://localhost:8080/orangehrm-5.7/web/index.php',
    trace: 'on-first-retry',

    headless: true,
    actionTimeout: 20000,
  },

  projects,
});
