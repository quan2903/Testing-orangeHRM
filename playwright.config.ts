import { defineConfig, devices } from '@playwright/test';

const testDirs = [
  { name: 'login-tests', dir: './login/login-test' },
  { name: 'jobtitle-tests', dir: './job/job-titles'},
  { name: 'pay-grades-tests', dir: './job/pay-grades'},
  { name: 'user-management-tests', dir: './user-management'},
  { name: 'education-tests', dir: './qualifications/education/add-education' },
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
  retries: process.env.CI ? 2 : 2,
  workers: 4,
  reporter: 'html',
  timeout: 60000,
  expect: { timeout: 10000 },
  
  use: {
    baseURL: 'http://localhost:8080/orangehrm-5.7/web/index.php',
    trace: 'on-first-retry',

    headless: true,
    actionTimeout: 15000,
  },

  projects,
});
