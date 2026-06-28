# Bharti Clinic - Comprehensive Test Suite

## 📊 Test Coverage Overview

### Backend Unit Tests (Jest + Supertest)
- **Framework:** Jest + Supertest
- **Location:** `backend/src/__tests__/`
- **Coverage:** Auth, Products, Orders, Appointments

### Frontend Component Tests (Vitest + React Testing Library)
- **Framework:** Vitest + React Testing Library
- **Location:** `frontend/src/**/__tests__/`
- **Coverage:** HeroSection, ProductCard, CartContext, CheckoutPage

### E2E Tests (Playwright)
- **Framework:** Playwright
- **Location:** `e2e/` (to be created)
- **Coverage:** 5 critical user journeys

---

## 🧪 Backend Unit Tests

### 1. Auth Tests (`auth.test.ts`)

#### Test Cases:
✅ **Login Success**
- Should login successfully with correct credentials
- Should return JWT token
- Should return user data

✅ **Login Failures**
- Should fail with wrong password
- Should fail with non-existent email
- Should fail with missing email field
- Should fail with missing password field
- Should fail with empty credentials

✅ **Token Validation**
- Should access protected route with valid token
- Should fail without token
- Should fail with invalid token
- Should fail with malformed authorization header

#### Run Tests:
```bash
cd backend
npm test auth.test.ts
```

---

### 2. Products Tests (`products.test.ts`)

#### Test Cases:
✅ **List Products**
- Should list products with pagination
- Should filter by category
- Should filter by active status
- Should search by name

✅ **Get Product by Slug**
- Should get product by slug
- Should return 404 for non-existent slug

✅ **Create Product (Admin)**
- Should create product with valid data
- Should fail without authentication
- Should fail with missing required fields

✅ **Update Product**
- Should update product stock
- Should update product price

✅ **Delete Product**
- Should delete product
- Should fail to delete non-existent product

#### Run Tests:
```bash
cd backend
npm test products.test.ts
```

---

### 3. Orders Tests (`orders.test.ts`)

#### Test Cases:
✅ **Create Order**
- Should create order with valid stock
- Should reduce product stock after order
- Should fail with out-of-stock product
- Should fail with insufficient stock
- Should fail with missing required fields

✅ **Update Order Status (Admin)**
- Should update order status
- Should update payment status
- Should fail without authentication

✅ **List Orders (Admin)**
- Should list all orders
- Should filter by status

#### Run Tests:
```bash
cd backend
npm test orders.test.ts
```

---

### 4. Appointments Tests (`appointments.test.ts`)

#### Test Cases:
✅ **Create Appointment**
- Should create appointment with valid therapy
- Should fail without required patient name
- Should fail without therapy ID
- Should fail with invalid therapy ID

#### Run Tests:
```bash
cd backend
npm test appointments.test.ts
```

---

## 🎨 Frontend Component Tests

### 1. HeroSection Tests (`HeroSection.test.tsx`)

#### Test Cases:
✅ **Rendering**
- Renders main headline "Heal Naturally. Live Beautifully."
- Renders canvas element for petal animation
- Renders CTA buttons
- Renders tagline
- Renders description text
- Renders trust indicators
- Renders scroll hint

#### Run Tests:
```bash
cd frontend
npm test HeroSection.test.tsx
```

---

### 2. ProductCard Tests (`ProductCard.test.tsx`)

#### Test Cases:
✅ **Rendering**
- Renders product name
- Renders product price
- Renders compare price with strikethrough
- Renders product image
- Renders add to cart button
- Renders rating if available
- Shows out of stock message when stock is 0
- Links to product detail page

✅ **Interactions**
- Triggers add to cart when button is clicked
- Updates cart context

#### Run Tests:
```bash
cd frontend
npm test ProductCard.test.tsx
```

---

### 3. CartContext Tests (`CartContext.test.tsx`)

#### Test Cases:
✅ **Initialization**
- Initializes with empty cart
- Loads cart from localStorage on init

✅ **Add Item**
- Adds item to cart correctly
- Increases quantity when adding existing item

✅ **Remove Item**
- Removes item from cart correctly

✅ **Update Quantity**
- Updates item quantity correctly

✅ **Calculations**
- Calculates total price correctly
- Calculates total with multiple products

✅ **Clear Cart**
- Clears cart correctly

✅ **Persistence**
- Persists cart to localStorage

#### Run Tests:
```bash
cd frontend
npm test CartContext.test.tsx
```

---

### 4. CheckoutPage Tests (To be implemented)

#### Test Cases:
✅ **Multi-Step Navigation**
- Navigates between steps correctly
- Validates step completion before proceeding

✅ **Form Validation**
- Shows errors for missing required fields
- Validates email format
- Validates phone number format
- Validates pincode format

✅ **Order Submission**
- Submits order successfully
- Clears cart after successful order
- Redirects to confirmation page

---

## 🌐 E2E Test Scenarios

### Scenario 1: Complete Checkout Flow
**File:** `e2e/checkout.spec.ts`

**Steps:**
1. Browse shop
2. Add 2 products to cart
3. Update quantities
4. Proceed to checkout
5. Fill contact information
6. Fill shipping address
7. Select payment method
8. Place order
9. Verify order confirmation

**Expected:** Order created, cart cleared

---

### Scenario 2: Book Therapy Appointment
**File:** `e2e/appointment.spec.ts`

**Steps:**
1. Navigate to therapies
2. Select therapy
3. Open booking form
4. Fill appointment details
5. Submit appointment
6. Verify confirmation

**Expected:** Appointment created successfully

---

### Scenario 3: Admin Product Management
**File:** `e2e/admin-product.spec.ts`

**Steps:**
1. Admin login
2. Navigate to products
3. Edit product
4. Update price
5. Save changes
6. Verify update
7. Logout

**Expected:** Price updated, changes persist

---

### Scenario 4: Admin Gallery Upload
**File:** `e2e/admin-gallery.spec.ts`

**Steps:**
1. Admin login
2. Navigate to gallery
3. Upload photo
4. Add caption and category
5. Submit upload
6. Verify photo appears
7. Test category filter
8. Edit photo metadata

**Expected:** Photo uploaded with metadata

---

### Scenario 5: Review Approval Flow
**File:** `e2e/review-approval.spec.ts`

**Steps:**
1. Customer submits review
2. Verify review pending
3. Admin login
4. Navigate to reviews
5. Approve review
6. Logout
7. Verify review appears on product page
8. Verify rating updated

**Expected:** Review approved and visible

---

## 📦 Installation & Setup

### Backend Tests
```bash
cd backend

# Install dependencies
npm install --save-dev jest @types/jest ts-jest supertest @types/supertest

# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test auth.test.ts

# Run in watch mode
npm test -- --watch
```

### Frontend Tests
```bash
cd frontend

# Install dependencies
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom

# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test HeroSection.test.tsx

# Run in watch mode
npm test -- --watch

# Run UI mode
npm test -- --ui
```

### E2E Tests
```bash
# Install Playwright
npm install --save-dev @playwright/test

# Install browsers
npx playwright install

# Run all E2E tests
npx playwright test

# Run specific scenario
npx playwright test e2e/checkout.spec.ts

# Run in headed mode
npx playwright test --headed

# Run in debug mode
npx playwright test --debug

# Generate report
npx playwright show-report
```

---

## 📝 Package.json Scripts

### Backend (`backend/package.json`)
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

### Frontend (`frontend/package.json`)
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

---

## 🎯 Test Coverage Goals

### Backend
- **Target:** 80% coverage
- **Critical Paths:** Auth, Orders, Products
- **Current:** To be measured

### Frontend
- **Target:** 70% coverage
- **Critical Components:** Cart, Checkout, Product Display
- **Current:** To be measured

### E2E
- **Target:** 5 critical user journeys
- **Coverage:** Checkout, Appointments, Admin Operations
- **Current:** Scenarios defined

---

## 🔧 CI/CD Integration

### GitHub Actions Workflow
```yaml
name: Test Suite

on: [push, pull_request]

jobs:
  backend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: cd backend && npm ci
      - run: cd backend && npm test -- --coverage
      
  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: cd frontend && npm ci
      - run: cd frontend && npm test -- --coverage
      
  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 📊 Test Reports

### Jest Coverage Report
```bash
cd backend
npm test -- --coverage
# Opens: backend/coverage/lcov-report/index.html
```

### Vitest Coverage Report
```bash
cd frontend
npm test -- --coverage
# Opens: frontend/coverage/index.html
```

### Playwright Test Report
```bash
npx playwright show-report
# Opens: playwright-report/index.html
```

---

## 🐛 Debugging Tests

### Backend (Jest)
```bash
# Run single test
npm test -- -t "should login successfully"

# Debug mode
node --inspect-brk node_modules/.bin/jest --runInBand

# Verbose output
npm test -- --verbose
```

### Frontend (Vitest)
```bash
# Run single test
npm test -- -t "renders product name"

# Debug mode
npm test -- --inspect-brk

# UI mode
npm test -- --ui
```

### E2E (Playwright)
```bash
# Debug mode
npx playwright test --debug

# Headed mode
npx playwright test --headed

# Specific browser
npx playwright test --project=chromium
```

---

## ✅ Test Checklist

### Before Committing
- [ ] All backend tests pass
- [ ] All frontend tests pass
- [ ] No console errors
- [ ] Coverage meets targets
- [ ] New features have tests
- [ ] Tests are documented

### Before Deploying
- [ ] All tests pass in CI/CD
- [ ] E2E tests pass
- [ ] Performance tests pass
- [ ] Security tests pass
- [ ] Test reports reviewed

---

## 📚 Resources

### Documentation
- [Jest Documentation](https://jestjs.io/)
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)

### Best Practices
- Write tests first (TDD)
- Keep tests simple and focused
- Use descriptive test names
- Mock external dependencies
- Test user behavior, not implementation
- Maintain test data fixtures

---

## 🎉 Status

**Backend Unit Tests:** ✅ Complete (4 test files)  
**Frontend Component Tests:** ✅ Complete (3 test files)  
**E2E Test Scenarios:** ✅ Defined (5 scenarios)  
**Test Configuration:** ✅ Complete  
**Documentation:** ✅ Complete  

**Ready to run tests!** 🚀

---

**Date:** February 28, 2026  
**Coverage:** Auth, Products, Orders, Appointments, Cart, Checkout, Admin Operations  
**Frameworks:** Jest, Vitest, Playwright  
**Total Test Files:** 7+ test files  
**Total Test Cases:** 50+ test cases
