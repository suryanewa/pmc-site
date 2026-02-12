# Task 0: Test Infrastructure Setup

## Completed
- Installed Vitest + React Testing Library + jsdom for component tests
- Installed Playwright for E2E/performance testing
- Created `vitest.config.ts` with jsdom environment and path aliases
- Created `vitest.setup.ts` for test cleanup and jest-dom matchers
- Created `playwright.config.ts` targeting Chromium with webServer config
- Added 5 passing unit tests for `cn` utility function (`lib/utils.test.ts`)
- Added 3 passing E2E smoke tests for home page (`e2e/home.spec.ts`)
- Added npm scripts: `test`, `test:watch`, `test:e2e`
- Updated CI workflow to run unit and E2E tests after build

## Key Decisions
- **Excluded e2e/ from Vitest**: Vitest was attempting to run Playwright test files, causing errors. Added `exclude: ['**/e2e/**']` to vitest config
- **Chromium-only for CI speed**: Limited Playwright to Chromium in CI to reduce execution time
- **Build-then-start webServer**: Playwright webServer runs `npm run build && npm run start` for production-like E2E testing
- **Install Playwright browsers in CI**: Added separate step to install Chromium with system deps before tests

## Test Coverage Baseline
- **Unit**: 1 test file, 5 passing tests (lib/utils.test.ts)
- **E2E**: 1 test file, 3 passing tests (e2e/home.spec.ts)
- All tests passing locally and ready for CI

## Files Created
- `vitest.config.ts`
- `vitest.setup.ts`
- `playwright.config.ts`
- `lib/utils.test.ts`
- `e2e/home.spec.ts`

## Files Modified
- `package.json` (added test scripts and dependencies)
- `.github/workflows/ci.yml` (added test steps)

## Verification
✓ `npm run test` passes (5 tests)
✓ `npm run test:e2e` passes (3 tests)
✓ All LSP diagnostics clean
✓ Build passes
✓ CI workflow updated and validates test execution order

## Next Steps
- Task 7 can now use this infrastructure for regression validation
- Future tasks can add component/integration tests as needed
- Consider adding coverage thresholds once baseline coverage is established
