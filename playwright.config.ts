import { defineConfig, devices } from '@playwright/test';

const testDirs = [
  { name: 'login-tests', dir: './login/login-test' },
  { name: 'other-tests', dir: './tests' },
  { name: 'jobtitle-tests', dir: './job/job-titles'},
  { name: 'user-management-tests', dir: './user-management'},
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
  workers: 4,
  reporter: 'html',
  timeout: 60000,
  expect: { timeout: 10000 },
  
  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com/web/index.php/',
    trace: 'on-first-retry',

    headless: true,
    actionTimeout: 15000,
  },

  projects,
});
