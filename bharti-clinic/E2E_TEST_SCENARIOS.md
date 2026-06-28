# E2E Test Scenarios for Bharti Clinic

## Overview
End-to-end test scenarios using Playwright to test complete user workflows across the Bharti Clinic application.

---

## Scenario 1: Customer Browses Shop, Adds Products to Cart, Completes Checkout

### Test Flow
1. **Navigate to Shop Page**
   - Visit `http://localhost:5174/shop`
   - Verify shop page loads
   - Verify products are displayed in grid

2. **Browse and Filter Products**
   - Verify category filter is visible
   - Click on a category filter
   - Verify products are filtered
   - Verify product cards show: name, price, image, "Add to Cart" button

3. **Add First Product to Cart**
   - Click "Add to Cart" on first product
   - Verify cart drawer opens
   - Verify product appears in cart
   - Verify cart count badge updates to "1"
   - Close cart drawer

4. **Add Second Product to Cart**
   - Scroll to find another product
   - Click "Add to Cart" on second product
   - Verify cart drawer opens
   - Verify both products appear in cart
   - Verify cart count badge updates to "2"
   - Verify total price is calculated correctly

5. **Update Cart Quantities**
   - In cart drawer, increase quantity of first product to 2
   - Verify total price updates
   - Verify cart count badge updates to "3"

6. **Proceed to Checkout**
   - Click "Proceed to Checkout" button in cart drawer
   - Verify redirect to `/checkout`
   - Verify checkout page loads

7. **Fill Checkout Form - Step 1: Contact Information**
   - Verify "Contact Information" step is active
   - Fill in:
     - Name: "Test Customer"
     - Email: "test.customer@example.com"
     - Phone: "9876543210"
   - Click "Continue to Shipping"
   - Verify navigation to shipping step

8. **Fill Checkout Form - Step 2: Shipping Address**
   - Verify "Shipping Address" step is active
   - Fill in:
     - Address: "123 Test Street"
     - City: "Mumbai"
     - State: "Maharashtra"
     - Pincode: "400001"
   - Click "Continue to Payment"
   - Verify navigation to payment step

9. **Fill Checkout Form - Step 3: Payment Method**
   - Verify "Payment" step is active
   - Select "Cash on Delivery"
   - Verify order summary is displayed
   - Verify total amount matches cart total

10. **Place Order**
    - Click "Place Order" button
    - Verify loading state
    - Verify redirect to order confirmation page
    - Verify order confirmation message
    - Verify order ID is displayed
    - Verify cart is cleared (count badge shows "0")

### Expected Results
- ✅ Products load and display correctly
- ✅ Cart updates in real-time
- ✅ Multi-step checkout navigation works
- ✅ Form validation works
- ✅ Order is created successfully
- ✅ Cart is cleared after order

### Test Data
- Products: Any 2 available products
- Customer: Test data as specified above
- Payment: COD

---

## Scenario 2: Customer Books Therapy Appointment from Detail Page

### Test Flow
1. **Navigate to Therapies Page**
   - Visit `http://localhost:5174/therapies`
   - Verify therapies page loads
   - Verify therapy cards are displayed

2. **Select a Therapy**
   - Click on a therapy card
   - Verify redirect to therapy detail page `/therapies/:slug`
   - Verify therapy details are displayed:
     - Name
     - Description
     - Duration
     - Price
     - Image

3. **Open Booking Form**
   - Click "Book Appointment" button
   - Verify booking form/modal appears

4. **Fill Booking Form**
   - Fill in:
     - Name: "Test Patient"
     - Email: "test.patient@example.com"
     - Phone: "9876543210"
     - Preferred Date: Select future date
     - Preferred Time: "10:00 AM"
     - Message: "Looking forward to the therapy"
   - Verify all fields are filled

5. **Submit Appointment**
   - Click "Submit Appointment" button
   - Verify loading state
   - Verify success message appears
   - Verify confirmation details are shown

6. **Verify Appointment Created**
   - Navigate to admin panel (if testing admin flow)
   - Verify appointment appears in appointments list

### Expected Results
- ✅ Therapy detail page loads correctly
- ✅ Booking form validates required fields
- ✅ Appointment is created successfully
- ✅ Confirmation message is displayed
- ✅ Appointment appears in admin panel

### Test Data
- Therapy: Any active therapy
- Patient: Test data as specified above
- Date: Future date
- Time: Any available slot

---

## Scenario 3: Admin Logs In, Updates Product Price, Logs Out

### Test Flow
1. **Navigate to Admin Login**
   - Visit `http://localhost:5174/admin/login`
   - Verify login page loads
   - Verify login form is displayed

2. **Login as Admin**
   - Fill in:
     - Email: "dr.ipinder@bhartiveda.com"
     - Password: "password123"
   - Click "Login" button
   - Verify redirect to admin dashboard
   - Verify dashboard loads with KPIs

3. **Navigate to Products Page**
   - Click "Products" in sidebar navigation
   - Verify redirect to `/admin/products`
   - Verify products table loads
   - Verify products are displayed

4. **Select Product to Edit**
   - Find a product in the table
   - Note current price
   - Click "Edit" icon on the product
   - Verify edit modal opens
   - Verify product data is pre-filled

5. **Update Product Price**
   - Navigate to "Pricing & Stock" tab
   - Change price from current to new value (e.g., 1500 → 1800)
   - Verify preview panel updates with new price
   - Click "Save Product"
   - Verify success message appears
   - Verify modal closes

6. **Verify Price Update**
   - Verify product in table shows new price
   - Refresh page
   - Verify new price persists

7. **Logout**
   - Click user menu/profile icon
   - Click "Logout" button
   - Verify redirect to login page
   - Verify session is cleared

8. **Verify Logout**
   - Try to access `/admin/dashboard` directly
   - Verify redirect to login page
   - Verify authentication is required

### Expected Results
- ✅ Admin can login successfully
- ✅ Dashboard loads with data
- ✅ Product edit modal works
- ✅ Price update is saved
- ✅ Changes persist after refresh
- ✅ Logout clears session
- ✅ Protected routes require auth

### Test Data
- Admin: dr.ipinder@bhartiveda.com / password123
- Product: Any existing product
- New Price: Any valid price value

---

## Scenario 4: Admin Uploads Gallery Photo with Caption and Category

### Test Flow
1. **Login as Admin**
   - Visit `/admin/login`
   - Login with admin credentials
   - Navigate to dashboard

2. **Navigate to Gallery Page**
   - Click "Gallery" in sidebar
   - Verify redirect to `/admin/gallery`
   - Verify gallery page loads
   - Verify "Photos" and "Videos" tabs are visible

3. **Verify Photos Tab**
   - Ensure "Photos" tab is active
   - Verify existing photos are displayed in grid
   - Verify upload zone is visible

4. **Upload Photo**
   - Drag and drop an image file to upload zone
   - OR click upload zone and select file
   - Verify file appears in upload queue
   - Verify file preview is shown

5. **Add Metadata**
   - In upload queue form:
     - Select Category: "Clinic Interior"
     - Enter Caption: "Our beautiful reception area"
     - Verify sort order is auto-assigned
   - Verify metadata is filled

6. **Submit Upload**
   - Click "Upload All" button
   - Verify upload progress indicator
   - Verify success message appears
   - Verify upload queue clears

7. **Verify Photo in Gallery**
   - Verify new photo appears in gallery grid
   - Verify category badge shows "Clinic Interior"
   - Verify caption is displayed on hover/overlay
   - Hover over photo
   - Verify edit and delete icons appear

8. **Test Category Filter**
   - Click "Clinic Interior" category filter
   - Verify only photos with that category are shown
   - Verify uploaded photo is visible
   - Click "All" to show all photos

9. **Edit Photo Metadata**
   - Hover over uploaded photo
   - Click edit icon
   - Verify edit modal opens
   - Change caption to "Updated caption"
   - Click "Save Changes"
   - Verify success message
   - Verify caption updates in gallery

### Expected Results
- ✅ Upload zone accepts drag-and-drop
- ✅ File preview shows correctly
- ✅ Metadata form works
- ✅ Upload succeeds
- ✅ Photo appears in gallery
- ✅ Category badge displays
- ✅ Caption shows correctly
- ✅ Category filter works
- ✅ Edit functionality works

### Test Data
- Admin: dr.ipinder@bhartiveda.com / password123
- Image: Any valid image file (JPG, PNG)
- Category: "Clinic Interior"
- Caption: "Our beautiful reception area"

---

## Scenario 5: Customer Submits Review, Admin Approves, Review Appears on Product Page

### Test Flow
1. **Customer Navigates to Product Page**
   - Visit `/shop`
   - Click on a product
   - Verify redirect to `/shop/:slug`
   - Verify product detail page loads
   - Scroll to reviews section

2. **Submit Review**
   - Click "Write a Review" button
   - Verify review form appears
   - Fill in:
     - Name: "Happy Customer"
     - Email: "happy.customer@example.com"
     - Rating: Select 5 stars
     - Review: "Excellent product! Highly recommend."
   - Click "Submit Review"
   - Verify success message
   - Verify "Review submitted for approval" message

3. **Verify Review Not Yet Visible**
   - Refresh product page
   - Verify review does not appear in reviews list
   - (Because it's pending approval)

4. **Admin Logs In**
   - Navigate to `/admin/login`
   - Login with admin credentials
   - Navigate to dashboard

5. **Navigate to Reviews Page**
   - Click "Reviews" in sidebar
   - Verify redirect to `/admin/reviews`
   - Verify reviews page loads
   - Verify pending reviews are shown

6. **Find Pending Review**
   - Look for review from "Happy Customer"
   - Verify review details are displayed:
     - Customer name
     - Product name
     - Rating (5 stars)
     - Review text
     - Status: "Pending"

7. **Approve Review**
   - Click "Approve" button on the review
   - Verify confirmation dialog (if any)
   - Confirm approval
   - Verify success message
   - Verify review status changes to "Approved"

8. **Logout from Admin**
   - Logout from admin panel
   - Return to public site

9. **Verify Review Appears on Product Page**
   - Navigate back to product page
   - Scroll to reviews section
   - Verify review from "Happy Customer" is now visible
   - Verify rating shows 5 stars
   - Verify review text is displayed
   - Verify customer name is shown

10. **Verify Product Rating Updated**
    - Verify product's average rating is updated
    - Verify review count is incremented
    - Verify rating stars reflect new average

### Expected Results
- ✅ Review form works correctly
- ✅ Review is submitted successfully
- ✅ Review is pending by default
- ✅ Admin can see pending reviews
- ✅ Admin can approve reviews
- ✅ Approved review appears on product page
- ✅ Product rating is updated
- ✅ Review count is incremented

### Test Data
- Product: Any active product
- Customer: Test data as specified
- Rating: 5 stars
- Review: Positive review text
- Admin: dr.ipinder@bhartiveda.com / password123

---

## Test Environment Setup

### Prerequisites
```bash
# Install Playwright
npm install -D @playwright/test

# Install browsers
npx playwright install
```

### Configuration
```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:5174',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
```

### Running Tests
```bash
# Run all E2E tests
npx playwright test

# Run specific scenario
npx playwright test e2e/checkout.spec.ts

# Run in headed mode (see browser)
npx playwright test --headed

# Run in debug mode
npx playwright test --debug

# Generate test report
npx playwright show-report
```

---

## Test Data Management

### Test Users
- **Customer**: test.customer@example.com
- **Admin**: dr.ipinder@bhartiveda.com / password123

### Test Products
- Use existing products from database
- Or seed test products before running tests

### Cleanup
- Clear test data after each test run
- Reset database to known state
- Clear localStorage/cookies

---

## Success Criteria

All scenarios should:
- ✅ Complete without errors
- ✅ Verify all expected elements are present
- ✅ Verify data persistence
- ✅ Verify navigation works correctly
- ✅ Verify form validation
- ✅ Verify success/error messages
- ✅ Take screenshots on failure
- ✅ Record video on failure

---

## CI/CD Integration

### GitHub Actions Example
```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

**Status:** Scenarios Defined - Ready for Implementation  
**Date:** February 28, 2026  
**Framework:** Playwright  
**Coverage:** 5 critical user journeys
