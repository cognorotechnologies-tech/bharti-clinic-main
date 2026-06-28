# Test Commands - Quick Reference

## Backend Tests (Jest)

```bash
cd backend

# Run all tests
npm test

# Watch mode (auto-rerun on changes)
npm run test:watch

# Coverage report
npm run test:coverage

# Verbose output
npm run test:verbose

# Run specific test file
npm test -- auth.test.ts

# Run tests matching pattern
npm test -- --testNamePattern="login"
```

## Frontend Tests (Vitest)

```bash
cd frontend

# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# Run specific test file
npm test -- CartContext.test.tsx

# UI mode (interactive)
npm run test:ui
```

## E2E Tests (Playwright)

```bash
# From project root

# Install browsers (first time only)
npx playwright install

# Run all E2E tests
npx playwright test

# Run specific test file
npx playwright test e2e/01-customer-shopping.spec.ts

# Run in headed mode (see browser)
npx playwright test --headed

# Run in debug mode (step through)
npx playwright test --debug

# Run on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run mobile tests
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Safari"

# Run specific test by name
npx playwright test -g "should login successfully"

# View HTML report
npx playwright show-report

# Update snapshots
npx playwright test --update-snapshots

# Run with UI mode
npx playwright test --ui
```

## Run All Tests

```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test

# E2E
npx playwright test

# Or create a script in root package.json:
npm run test:all
```

## CI/CD Commands

```bash
# Backend (CI mode)
cd backend && npm test -- --ci --coverage

# Frontend (CI mode)
cd frontend && npm test -- --run --coverage

# E2E (CI mode)
npx playwright test --reporter=html
```

## Debugging

### Backend Tests
```bash
# Debug with Node inspector
node --inspect-brk node_modules/.bin/jest --runInBand

# Debug specific test
npm test -- --testNamePattern="login" --runInBand
```

### Frontend Tests
```bash
# Debug in browser
npm run test:ui

# Debug with VS Code
# Add breakpoint and run "Debug Test" from VS Code
```

### E2E Tests
```bash
# Debug mode (step through)
npx playwright test --debug

# Debug specific test
npx playwright test e2e/01-customer-shopping.spec.ts --debug

# Headed mode with slow motion
npx playwright test --headed --slow-mo=1000

# Generate trace
npx playwright test --trace on

# View trace
npx playwright show-trace trace.zip
```

## Quick Test Scenarios

### Test Login Flow
```bash
npx playwright test -g "should login successfully"
```

### Test Shopping Cart
```bash
npx playwright test e2e/01-customer-shopping.spec.ts
```

### Test Admin Operations
```bash
npx playwright test e2e/03-admin-operations.spec.ts
```

### Test Mobile Responsiveness
```bash
npx playwright test --project="Mobile Chrome"
```

## Coverage Reports

### Backend Coverage
```bash
cd backend
npm run test:coverage
# Open: coverage/lcov-report/index.html
```

### Frontend Coverage
```bash
cd frontend
npm run test:coverage
# Open: coverage/index.html
```

## Watch Mode Tips

### Backend Watch
```bash
cd backend
npm run test:watch

# Press 'a' to run all tests
# Press 'f' to run only failed tests
# Press 'p' to filter by filename
# Press 't' to filter by test name
# Press 'q' to quit
```

### Frontend Watch
```bash
cd frontend
npm run test:watch

# Similar commands as backend
```

## Performance Testing

### Measure Test Speed
```bash
# Backend
npm test -- --verbose --maxWorkers=1

# E2E
npx playwright test --reporter=list
```

## Parallel Execution

### Backend (parallel)
```bash
npm test -- --maxWorkers=4
```

### E2E (parallel)
```bash
npx playwright test --workers=4
```

## Test Specific Features

### Test Auth
```bash
cd backend && npm test -- auth.test.ts
```

### Test Cart
```bash
cd frontend && npm test -- CartContext.test.tsx
```

### Test Checkout Flow
```bash
npx playwright test -g "checkout"
```

### Test Admin Panel
```bash
npx playwright test e2e/03-admin-operations.spec.ts
```

## Continuous Testing

### Watch all tests during development
```bash
# Terminal 1: Backend tests
cd backend && npm run test:watch

# Terminal 2: Frontend tests
cd frontend && npm run test:watch

# Terminal 3: E2E tests (manual trigger)
npx playwright test --ui
```

## Pre-commit Hook

Add to `.husky/pre-commit`:
```bash
#!/bin/sh
cd backend && npm test -- --bail --findRelatedTests
cd frontend && npm test -- --run --bail
```

## Pre-push Hook

Add to `.husky/pre-push`:
```bash
#!/bin/sh
cd backend && npm test
cd frontend && npm test
npx playwright test
```

---

*Quick Reference Guide*
*Last Updated: February 28, 2026*
