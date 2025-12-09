# Testing Guide

## Unit Tests

Unit tests use Jest and React Testing Library. All tests are located in `components/__tests__/`.

### Running Unit Tests

```bash
npm run test              # Run all tests once
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Run tests with coverage report
```

### Current Test Status

✅ **All unit tests passing** (4/4 tests)

## E2E Tests

E2E tests use Playwright and are located in `e2e/`.

### Known Issue

E2E tests currently have a compatibility issue with Node.js v25+ due to `TransformStream` not being available in the test environment. This is a known Playwright issue with newer Node.js versions.

### Solutions

**Option 1: Run E2E tests manually (Recommended for now)**

1. Start the dev server in one terminal:

   ```bash
   npm run dev
   ```

2. In another terminal, run E2E tests:
   ```bash
   npm run test:e2e
   ```

**Option 2: Use Node.js v18 or v20**

If you need E2E tests to run automatically, consider using Node.js v18 or v20:

```bash
nvm install 18
nvm use 18
npm install
npm run test:e2e
```

**Option 3: Wait for Playwright update**

Playwright is actively working on Node.js v25+ compatibility. Check [Playwright issues](https://github.com/microsoft/playwright/issues) for updates.

### Running E2E Tests

```bash
npm run test:e2e         # Run E2E tests
npm run test:e2e:ui       # Run E2E tests with UI
```

### E2E Test Coverage

- Header and navigation functionality
- Mobile menu interactions
- Theme toggle
- Skip to content link
- Section navigation

## Security Vulnerabilities

### Current Status

There are 3 high severity vulnerabilities in transitive dependencies (Next.js ESLint plugin → glob package). These are:

- **Not directly exploitable** in this project (they're in dev dependencies)
- **Will be fixed** when Next.js updates its dependencies
- **Low risk** for development (only affect ESLint, not production code)

### Monitoring

Run `npm audit` periodically to check for updates. The vulnerabilities will be resolved when:

- Next.js updates to a version with fixed dependencies
- Or we upgrade to Next.js 15+ (when stable)

## CI/CD

GitHub Actions CI runs:

- ✅ Linting
- ✅ Format checking
- ✅ Type checking
- ✅ Unit tests
- ✅ Build verification
- ⚠️ E2E tests (skipped until Node.js compatibility resolved)

## Best Practices

1. **Write tests first** for new components
2. **Test user interactions**, not implementation details
3. **Use accessibility queries** (`getByRole`, `getByLabelText`)
4. **Mock external dependencies** (APIs, localStorage, etc.)
5. **Keep tests focused** - one assertion per test when possible

## Test Structure

```
components/
  __tests__/
    ComponentName.test.tsx    # Unit tests
e2e/
  feature.spec.ts             # E2E tests
```

## Questions?

- Jest docs: https://jestjs.io/docs/getting-started
- React Testing Library: https://testing-library.com/react
- Playwright: https://playwright.dev
