
## Task 2: Test Infrastructure

### Architecture Decision: Parallel CI Jobs
**Decision**: Run tests in separate parallel jobs after gate passes, rather than adding to gate job

**Rationale**:
- Faster CI feedback: tests run in parallel instead of sequentially
- Clear separation of concerns: gate validates code quality, test jobs validate functionality
- Better resource utilization: multiple runners working simultaneously
- Failed tests don't block build artifacts
- Easier to debug: clear separation in CI logs

**Trade-offs**:
- Slightly more complex CI workflow (3 jobs instead of 1)
- More runner minutes consumed (but faster wall-clock time)

### Tool Selection
**Vitest over Jest**:
- Native ESM support (Next.js 16 uses ESM)
- Faster execution with Vite's transform pipeline
- Built-in TypeScript support
- Better watch mode performance

**Playwright over Cypress**:
- Multi-browser support out of the box
- Better mobile device emulation (configured Mobile Chrome)
- Native TypeScript support
- Official Microsoft support and active development
- Better CI integration (artifact uploads, trace viewing)

### Test Directory Structure
**Decision**: Separate `tests/` and `e2e/` directories

**Rationale**:
- Clear separation between unit/component tests and E2E tests
- Different configuration needs (vitest vs playwright)
- Easier to run subset of tests
- Follows common Next.js conventions

