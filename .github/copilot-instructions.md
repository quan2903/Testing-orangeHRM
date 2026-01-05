## Quick orientation for AI coding assistants

This repository contains Playwright-based E2E tests for OrangeHRM, written in TypeScript. The goal of this file is to give an AI agent immediately actionable context and examples so it can make correct, repository-aligned changes.

### Big picture
- Tests are Playwright tests using `@playwright/test`. Project-level test groups are declared in `playwright.config.ts` via `testDirs` and expanded into `projects` combined with browser definitions.
- Base URL and common runner options are in `playwright.config.ts` (example: `baseURL`, `trace`, `headless`). Use this file to determine run-time behavior.

### Key directories & conventions (discoverable patterns)
- Feature folders follow a consistent four-part pattern: `*-page.ts` (page objects and selectors), `*-action.ts` (high-level flows), `*-factory.ts` (test data builders), and `*-test.spec.ts` (tests). Example: `job/pay-grades/*` and `nationalities/*`.
- Types live alongside features when needed (example: `job/pay-grades/pay-grades-type.ts` exports `PayGrade` interface).
- Test folders referenced by `playwright.config.ts` include `./login/login-test`, `./tests`, `./job/job-titles`, and `./user-management` (see `testDirs`).

### How to run and debug tests (commands)
- Install deps: `npm install` (repo uses Playwright in devDependencies). There are no npm scripts in `package.json`, so run Playwright directly:

  npx playwright test           # run all tests
  npx playwright test -g "pattern" # run tests matching a title pattern
  npx playwright test --project=login-tests-chrome # run a single configured project
  npx playwright show-report    # open last generated HTML report (reporter: html)

When making changes that affect configuration or dependencies, run `npx playwright install` if browsers are missing.

### Project-specific guidance for code changes
- Preserve the page/action/factory separation. If you add a new UI interaction, prefer adding it to the relevant `*-page.ts` (low-level selector + method) and a higher-level helper in `*-action.ts` for flows used by tests.
- Tests use TypeScript in `commonjs` mode (see `package.json` "type": "commonjs"). Keep imports/exports consistent with existing files.
- When adding test data types or fixtures, follow existing naming and placement conventions (e.g., `pay-grades-type.ts` next to `pay-grades` features).

### Files to inspect when changing tests or flows
- `playwright.config.ts` — project groups, baseURL, timeouts, trace and reporter settings.
- `package.json` — dependency list; note there are no scripts defined.
- Example feature folders: `login/`, `job/` (contains pay-grades, job-titles, etc.), `user-management/`, `nationalities/`.
- `playwright-report/index.html` — generated HTML report location.

### Common pitfalls and automated decisions
- Do not assume any npm script names — use `npx playwright test` unless you add scripts to `package.json`.
- Configuration is centralized in `playwright.config.ts`; prefer editing it over per-test overrides unless intentionally scoped.

### Example edits an AI might make (concrete)
- For a new page interaction: add method in `job/pay-grades/pay-grades-page.ts`, add a corresponding higher-level flow in `job/pay-grades/pay-grades-action.ts`, and update or add a test under `job/pay-grades/*-test.spec.ts`.
- For a new test group: add its folder and then add an entry to `testDirs` inside `playwright.config.ts` to include it in multi-project runs.

### When merging with existing guidance
- If an existing `.github/copilot-instructions.md` is present, preserve any project-specific run commands and merge notes about local env. This repo currently has no existing agent guidance file.

If anything above is unclear or you want me to bias instructions toward a particular area (tests, refactors, adding features, or CI integration), tell me which area and I will iterate.
