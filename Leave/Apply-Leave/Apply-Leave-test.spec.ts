import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Admin/login/login-page/LoginPage';
import { LeavePage } from '../Leave-Page';
import { ApplyLeavePage } from './Apply-Leave-Page';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Reuse the same style and structure as other specs in the repo (Playwright, beforeEach login & navigate)
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(ADMIN_USERNAME!, ADMIN_PASSWORD!);
  const leavePage = new LeavePage(page);
  await leavePage.goto();
  const applyPage = new ApplyLeavePage(page);
  await applyPage.goto();
});

