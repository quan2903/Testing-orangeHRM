import { defineConfig, devices } from '@playwright/test';

const testDirs = [
  { name: 'login-tests', dir: './Admin/login/login-test' },
  { name: 'jobtitle-tests', dir: './Admin/job/job-titles'},
  { name: 'pay-grades-tests', dir: './Admin/job/pay-grades'},
  { name: 'user-management-tests', dir: './Admin/user-management'},
  { name: 'qualification', dir: './Admin/qualifications/' },
  { name: 'PIM tests', dir: './PIM/' },
  { name: 'Leave', dir: './Leave/' },
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
  expect: { timeout: 15000 },
  
  use: {
    baseURL: 'http://localhost:8080/orangehrm-5.7/web/index.php',
    trace: 'on-first-retry',

    headless: true,
    actionTimeout: 15000,
  },

  projects,
});
