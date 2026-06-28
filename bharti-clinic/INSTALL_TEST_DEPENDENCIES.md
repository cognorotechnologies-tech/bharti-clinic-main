# Install Test Dependencies

## Backend Test Dependencies

```bash
cd backend

# Install Jest and related packages
npm install --save-dev jest @types/jest ts-jest

# Install Supertest for API testing
npm install --save-dev supertest @types/supertest

# Install additional testing utilities
npm install --save-dev @jest/globals
```

### Add to backend/package.json scripts:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:verbose": "jest --verbose"
  }
}
```

---

## Frontend Test Dependencies

```bash
cd frontend

# Install Vitest
npm install --save-dev vitest

# Install React Testing Library
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Install jsdom for DOM simulation
npm install --save-dev jsdom

# Install Vitest UI (optional)
npm install --save-dev @vitest/ui

# Install coverage provider
npm install --save-dev @vitest/coverage-v8
```

### Add to frontend/package.json scripts:
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:watch": "vitest --watch"
  }
}
```

---

## E2E Test Dependencies

```bash
# Install Playwright (from project root)
npm install --save-dev @playwright/test

# Install browsers
npx playwright install

# Install specific browsers only (optional)
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

### Add to package.json scripts (root or frontend):
```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:debug": "playwright test --debug",
    "test:e2e:report": "playwright show-report"
  }
}
```

---

## Quick Install All

### Backend
```bash
cd backend
npm install --save-dev jest @types/jest ts-jest supertest @types/supertest @jest/globals
```

### Frontend
```bash
cd frontend
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitest/ui @vitest/coverage-v8
```

### E2E
```bash
npm install --save-dev @playwright/test
npx playwright install
```

---

## Verify Installation

### Backend
```bash
cd backend
npm test
# Should show "No tests found" if no tests exist yet
```

### Frontend
```bash
cd frontend
npm test
# Should start Vitest in watch mode
```

### E2E
```bash
npx playwright test --version
# Should show Playwright version
```

---

## Troubleshooting

### Jest not found
```bash
npm install --save-dev jest ts-jest
```

### Vitest not found
```bash
npm install --save-dev vitest
```

### Playwright browsers not installed
```bash
npx playwright install --with-deps
```

### TypeScript errors in tests
```bash
# Ensure @types packages are installed
npm install --save-dev @types/jest @types/supertest
```

---

## Next Steps

1. Install all dependencies
2. Run existing tests to verify setup
3. Write new tests as needed
4. Configure CI/CD pipeline
5. Set up test coverage reporting

---

**All test files are ready to use once dependencies are installed!**
