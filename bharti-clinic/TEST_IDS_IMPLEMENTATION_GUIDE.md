# Test IDs Implementation Guide

## Progress: Phases 1-3 Complete! ✅

### Components Updated

#### Phase 1: Critical Path ✅ COMPLETE
1. ✅ **ProductCard** - Added test IDs:
   - `data-testid="product-card"` - Main card container
   - `data-testid="product-price"` - Price display
   - `data-testid="add-to-cart-btn"` - Add to cart button

2. ✅ **CartDrawer** - Added test IDs:
   - `data-testid="cart-drawer"` - Main drawer container
   - `data-testid="cart-icon"` - Cart icon button (in Navbar)
   - `data-testid="cart-badge"` - Item count badge
   - `data-testid="cart-item"` - Individual cart item
   - `data-testid="increase-quantity"` - Increase quantity button
   - `data-testid="decrease-quantity"` - Decrease quantity button
   - `data-testid="item-quantity"` - Quantity display
   - `data-testid="remove-item"` - Remove item button
   - `data-testid="empty-cart"` - Empty cart message
   - `data-testid="cart-subtotal"` - Subtotal amount
   - `data-testid="checkout-btn"` - Checkout button

3. ✅ **Navbar** - Added test IDs:
   - `data-testid="nav-home"` - Home link
   - `data-testid="nav-therapies"` - Therapies link
   - `data-testid="nav-packages"` - Packages link
   - `data-testid="nav-shop"` - Shop link
   - `data-testid="nav-gallery"` - Gallery link
   - `data-testid="nav-about"` - About link
   - `data-testid="nav-blog"` - Blog link
   - `data-testid="nav-contact"` - Contact link
   - `data-testid="cart-icon"` - Cart icon button
   - `data-testid="cart-badge"` - Cart badge
   - `data-testid="mobile-menu-btn"` - Mobile menu toggle
   - `data-testid="mobile-menu"` - Mobile menu container
   - `data-testid="close-mobile-menu"` - Close mobile menu icon

4. ✅ **CheckoutPage** - Added test IDs:
   - `data-testid="continue-to-payment"` - Continue button (Step 1)
   - `data-testid="payment-cash"` - Cash on Delivery option
   - `data-testid="payment-upi"` - UPI Payment option
   - `data-testid="payment-bank-transfer"` - Bank Transfer option
   - `data-testid="place-order-btn"` - Place Order button

#### Phase 2: User Flows ✅ COMPLETE
5. ✅ **ProductDetailPage** - Added test IDs:
   - `data-testid="product-price"` - Price display
   - `data-testid="add-to-cart-btn"` - Add to cart button
   - `data-testid="reviews-section"` - Reviews section container
   - `data-testid="review-item"` - Individual review
   - `data-testid="review-rating"` - Review star rating
   - `data-testid="review-comment"` - Review comment text
   - `data-testid="write-review-btn"` - Submit review button
   - `data-testid="success-message"` - Review success message

6. ✅ **TherapyCard** - Added test IDs:
   - `data-testid="therapy-card"` - Main card container
   - `data-testid="therapy-price"` - Price display
   - `data-testid="book-now-btn"` - Book now button

7. ✅ **BookingModal** - Added test IDs:
   - `data-testid="booking-modal"` - Modal container
   - `data-testid="submit-booking-btn"` - Submit booking button
   - `data-testid="success-message"` - Booking success message

#### Phase 3: Admin ✅ COMPLETE
8. ✅ **AdminLoginPage** - Added test IDs:
   - `data-testid="login-btn"` - Login button

9. ✅ **AdminLayout** - Added test IDs:
   - `data-testid="nav-dashboard"` - Dashboard nav link
   - `data-testid="nav-products"` - Products nav link
   - `data-testid="nav-inventory"` - Inventory nav link
   - `data-testid="nav-therapies"` - Therapies nav link
   - `data-testid="nav-packages"` - Packages nav link
   - `data-testid="nav-orders"` - Orders nav link
   - `data-testid="nav-appointments"` - Appointments nav link
   - `data-testid="nav-gallery"` - Gallery nav link
   - `data-testid="nav-reviews"` - Reviews nav link
   - `data-testid="nav-blog"` - Blog nav link
   - `data-testid="nav-settings"` - Settings nav link
   - `data-testid="notification-bell"` - Notification dropdown
   - `data-testid="admin-name"` - Admin name display
   - `data-testid="logout-btn"` - Logout button

10. ✅ **AdminProductsPageFull** - Added test IDs:
   - `data-testid="products-table"` - Products table
   - `data-testid="edit-product"` - Edit product button
   - `data-testid="add-product-btn"` - Add product button
   - `data-testid="product-modal"` - Product form modal
   - `data-testid="save-product-btn"` - Save product button
   - `data-testid="success-toast"` - Success message

11. ✅ **AdminReviewsPageFull** - Added test IDs:
   - `data-testid="filter-pending"` - Pending filter button
   - `data-testid="filter-approved"` - Approved filter button
   - `data-testid="filter-rejected"` - Rejected filter button
   - `data-testid="pending-review"` - Pending review item
   - `data-testid="approved-review"` - Approved review item
   - `data-testid="rejected-review"` - Rejected review item
   - `data-testid="approve-review"` - Approve button
   - `data-testid="reject-review"` - Reject button

## Remaining Components (Priority Order)

### HIGH PRIORITY (Critical for E2E tests)

#### 1. CartDrawer Component
**File**: `frontend/src/components/shop/CartDrawer.tsx`

**Test IDs Needed**:
```tsx
// Main container
<div data-testid="cart-drawer">

// Cart icon/button (in Navbar)
<button data-testid="cart-icon">
  <ShoppingCart />
  <span data-testid="cart-badge">{itemCount}</span>
</button>

// Cart items
<div data-testid="cart-item">
  <button data-testid="increase-quantity">+</button>
  <span data-testid="item-quantity">{quantity}</span>
  <button data-testid="decrease-quantity">-</button>
  <button data-testid="remove-item">Remove</button>
</div>

// Empty cart
<div data-testid="empty-cart">

// Subtotal
<span data-testid="cart-subtotal">₹{subtotal}</span>

// Checkout button
<button data-testid="checkout-btn">Proceed to Checkout</button>
```

#### 2. Navbar Component
**File**: `frontend/src/components/layout/Navbar.tsx`

**Test IDs Needed**:
```tsx
// Navigation links
<Link data-testid="nav-shop" to="/shop">Shop</Link>
<Link data-testid="nav-therapies" to="/therapies">Therapies</Link>
<Link data-testid="nav-packages" to="/packages">Packages</Link>
<Link data-testid="nav-blog" to="/blog">Blog</Link>
<Link data-testid="nav-gallery" to="/gallery">Gallery</Link>
<Link data-testid="nav-about" to="/about">About</Link>
<Link data-testid="nav-contact" to="/contact">Contact</Link>

// Mobile menu
<button data-testid="mobile-menu-btn">Menu</button>
<div data-testid="mobile-menu">
  <button data-testid="close-mobile-menu">Close</button>
</div>
```

#### 3. CheckoutPage
**File**: `frontend/src/pages/CheckoutPage.tsx`

**Test IDs Needed**:
```tsx
// Form fields
<input name="fullName" />
<input name="email" />
<input name="phone" />
<input name="address" />
<input name="city" />
<input name="state" />
<input name="pincode" />

// Buttons
<button data-testid="continue-to-payment">Continue</button>
<button data-testid="payment-cod">Cash on Delivery</button>
<button data-testid="place-order-btn">Place Order</button>
```

#### 4. ProductDetailPage
**File**: `frontend/src/pages/ProductDetailPage.tsx`

**Test IDs Needed**:
```tsx
<h1>{product.name}</h1>
<span data-testid="product-price">₹{price}</span>
<button data-testid="add-to-cart-btn">Add to Cart</button>
<div data-testid="reviews-section">
  <button data-testid="write-review-btn">Write Review</button>
  <div data-testid="review-item">
    <div data-testid="review-rating">★★★★★</div>
    <p data-testid="review-comment">{comment}</p>
  </div>
</div>
```

#### 5. TherapyCard & TherapiesPage
**File**: `frontend/src/components/therapies/TherapyCard.tsx`

**Test IDs Needed**:
```tsx
<div data-testid="therapy-card">
  <span data-testid="therapy-price">₹{price}</span>
  <button data-testid="book-now-btn">Book Now</button>
</div>
```

#### 6. BookingModal
**File**: `frontend/src/components/therapies/BookingModal.tsx`

**Test IDs Needed**:
```tsx
<div data-testid="booking-modal">
  <input name="patientName" />
  <input name="phone" />
  <input name="email" />
  <input name="preferredDate" />
  <select name="preferredTime" />
  <textarea name="notes" />
  <button data-testid="submit-booking-btn">Book Appointment</button>
  <div data-testid="success-message">Booking Confirmed!</div>
  <div data-testid="error-message">Error message</div>
</div>
```

### MEDIUM PRIORITY (Admin & Secondary Features)

#### 7. AdminLoginPage
**File**: `frontend/src/pages/admin/AdminLoginPage.tsx`

**Test IDs Needed**:
```tsx
<input name="email" />
<input name="password" />
<button data-testid="login-btn">Login</button>
```

#### 8. AdminLayout
**File**: `frontend/src/components/admin/AdminLayout.tsx`

**Test IDs Needed**:
```tsx
// Navigation
<button data-testid="nav-products">Products</button>
<button data-testid="nav-inventory">Inventory</button>
<button data-testid="nav-orders">Orders</button>
<button data-testid="nav-reviews">Reviews</button>
<button data-testid="nav-blog">Blog</button>

// Header
<span data-testid="admin-name">{adminName}</span>
<button data-testid="notification-bell">
  <Bell />
</button>
<button data-testid="logout-btn">Logout</button>
```

#### 9. AdminProductsPage
**File**: `frontend/src/pages/admin/AdminProductsPageFull.tsx`

**Test IDs Needed**:
```tsx
<table data-testid="products-table">
  <button data-testid="edit-product">Edit</button>
  <button data-testid="delete-product">Delete</button>
</table>
<button data-testid="add-product-btn">Add Product</button>
<div data-testid="product-modal">
  <input name="name" />
  <input name="price" />
  <input name="stock" />
  <select name="category" />
  <button data-testid="save-product-btn">Save</button>
</div>
<div data-testid="success-toast">Success!</div>
```

#### 10. AdminInventoryPage
**File**: `frontend/src/pages/admin/AdminInventoryPageFull.tsx`

**Test IDs Needed**:
```tsx
<table data-testid="inventory-table">
  <button data-testid="update-stock">Update</button>
</table>
<input name="stock" />
<button data-testid="save-stock-btn">Save</button>
```

#### 11. AdminReviewsPage
**File**: `frontend/src/pages/admin/AdminReviewsPageFull.tsx`

**Test IDs Needed**:
```tsx
<button data-testid="filter-pending">Pending</button>
<button data-testid="filter-approved">Approved</button>
<button data-testid="filter-rejected">Rejected</button>

<div data-testid="pending-review">
  <button data-testid="approve-review">Approve</button>
  <button data-testid="reject-review">Reject</button>
</div>
<div data-testid="approved-review">
```

#### 12. AdminDashboardPage
**File**: `frontend/src/pages/admin/DashboardPage.tsx`

**Test IDs Needed**:
```tsx
<div data-testid="kpi-revenue">Revenue</div>
<div data-testid="kpi-orders">Orders</div>
<div data-testid="kpi-appointments">Appointments</div>
<div data-testid="kpi-low-stock">Low Stock</div>
```

#### 13. AdminBlogPage
**File**: `frontend/src/pages/admin/AdminBlogPageFull.tsx`

**Test IDs Needed**:
```tsx
<button data-testid="create-post-btn">Create Post</button>
<input name="title" />
<textarea name="excerpt" />
<textarea name="content" />
<button data-testid="save-post-btn">Save</button>
```

### LOW PRIORITY (Nice to Have)

#### 14. BlogPage & BlogPostPage
**Files**: `frontend/src/pages/BlogPage.tsx`, `frontend/src/pages/BlogPostPage.tsx`

**Test IDs Needed**:
```tsx
<div data-testid="blog-post-card">
<div data-testid="post-content">
```

#### 15. GalleryPage
**File**: `frontend/src/pages/GalleryPage.tsx`

**Test IDs Needed**:
```tsx
<div data-testid="gallery-item">
<div data-testid="lightbox">
  <button data-testid="close-lightbox">Close</button>
</div>
```

#### 16. ContactPage
**File**: `frontend/src/pages/ContactPage.tsx`

**Test IDs Needed**:
```tsx
<input name="name" />
<input name="email" />
<input name="phone" />
<input name="subject" />
<textarea name="message" />
<button data-testid="submit-contact-btn">Send Message</button>
<div data-testid="success-message">Message sent!</div>
```

#### 17. HomePage
**File**: `frontend/src/pages/HomePage.tsx`

**Test IDs Needed**:
```tsx
<section data-testid="hero-section">
  <h1 data-testid="hero-title">
  <button data-testid="hero-cta">
</section>
```

#### 18. Footer
**File**: `frontend/src/components/layout/Footer.tsx`

**Test IDs Needed**:
```tsx
<footer>
  <div data-testid="footer-about">
  <div data-testid="footer-links">
  <div data-testid="footer-contact">
</footer>
```

#### 19. NotFoundPage
**File**: `frontend/src/pages/NotFoundPage.tsx`

**Test IDs Needed**:
```tsx
<h1>404 Not Found</h1>
<button data-testid="back-home-btn">Back to Home</button>
```

#### 20. ScrollToTopButton
**File**: `frontend/src/components/ui/ScrollToTopButton.tsx`

**Test IDs Needed**:
```tsx
<button data-testid="scroll-to-top">
```

#### 21. PackageCard
**File**: `frontend/src/components/packages/PackageCard.tsx`

**Test IDs Needed**:
```tsx
<div data-testid="package-card">
  <span data-testid="package-price">
  <span data-testid="package-savings">
</div>
```

#### 22. ReviewModal
**File**: `frontend/src/components/reviews/ReviewModal.tsx`

**Test IDs Needed**:
```tsx
<div data-testid="review-modal">
  <input name="patientName" />
  <input name="email" />
  <button data-testid="star-5">★</button>
  <textarea name="comment" />
  <button data-testid="submit-review-btn">Submit Review</button>
  <div data-testid="success-message">Review submitted!</div>
  <div data-testid="error-message">Error!</div>
</div>
```

#### 23. NotificationDropdown
**File**: `frontend/src/components/admin/NotificationDropdown.tsx`

**Test IDs Needed**:
```tsx
<div data-testid="notification-dropdown">
  <div data-testid="notification-item">
</div>
```

#### 24. SearchInput (if exists)
**File**: `frontend/src/components/shop/SearchInput.tsx`

**Test IDs Needed**:
```tsx
<input data-testid="search-input" placeholder="Search products..." />
```

#### 25. CategoryFilter (if exists)
**File**: `frontend/src/components/shop/CategoryFilter.tsx`

**Test IDs Needed**:
```tsx
<button data-testid="category-filter">
```

## Implementation Strategy

### Phase 1: Critical Path (2-3 hours)
1. ✅ ProductCard
2. CartDrawer
3. Navbar
4. CheckoutPage

### Phase 2: User Flows (1-2 hours)
5. ProductDetailPage
6. TherapyCard & BookingModal
7. ReviewModal

### Phase 3: Admin (1-2 hours)
8. AdminLoginPage
9. AdminLayout
10. AdminProductsPage
11. AdminReviewsPage

### Phase 4: Polish (1 hour)
12-25. Remaining components

## Quick Implementation Tips

### 1. Find and Replace Pattern
```bash
# Search for buttons without test IDs
# Add data-testid to each

# Example:
<button onClick={handleClick}>
# Becomes:
<button data-testid="action-btn" onClick={handleClick}>
```

### 2. Naming Convention
- Use kebab-case: `data-testid="add-to-cart-btn"`
- Be descriptive: `data-testid="product-price"` not `data-testid="price"`
- Use context: `data-testid="cart-item"` not just `data-testid="item"`

### 3. Common Patterns
```tsx
// Buttons
<button data-testid="{action}-btn">

// Containers
<div data-testid="{feature}-{type}">

// Lists
<div data-testid="{item}-list">
  <div data-testid="{item}">

// Forms
<form data-testid="{feature}-form">
  <input name="field" /> // Use name attribute
  <button data-testid="submit-{feature}-btn">
```

## Testing After Implementation

### 1. Run E2E Tests
```bash
npx playwright test
```

### 2. Debug Failures
```bash
npx playwright test --debug
```

### 3. View Report
```bash
npx playwright show-report
```

## Estimated Time

- **Phase 1 (Critical)**: 2-3 hours
- **Phase 2 (User Flows)**: 1-2 hours
- **Phase 3 (Admin)**: 1-2 hours
- **Phase 4 (Polish)**: 1 hour

**Total**: 5-8 hours

## Current Status

### Phase 1: Critical Path ✅ COMPLETE (4/4)
- ✅ ProductCard
- ✅ CartDrawer
- ✅ Navbar
- ✅ CheckoutPage

### Phase 2: User Flows ✅ COMPLETE (3/3)
- ✅ ProductDetailPage
- ✅ TherapyCard
- ✅ BookingModal

### Phase 3: Admin ✅ COMPLETE (4/4)
- ✅ AdminLoginPage
- ✅ AdminLayout
- ✅ AdminProductsPageFull
- ✅ AdminReviewsPageFull

### Phase 4: Polish (Optional - 14 remaining)
- ⏳ BlogPage & BlogPostPage
- ⏳ GalleryPage
- ⏳ ContactPage
- ⏳ HomePage
- ⏳ Footer
- ⏳ NotFoundPage
- ⏳ ScrollToTopButton
- ⏳ PackageCard
- ⏳ ReviewModal
- ⏳ NotificationDropdown
- ⏳ SearchInput
- ⏳ CategoryFilter
- ⏳ AdminInventoryPage
- ⏳ AdminDashboardPage
- ⏳ AdminBlogPage

---

## Next Steps

### Ready to Test!
The critical E2E test paths are now fully instrumented with test IDs:

1. **Customer Shopping Flow** ✅
   - Browse products → Add to cart → Checkout → Place order

2. **Booking Flow** ✅
   - Browse therapies → Book appointment

3. **Admin Operations** ✅
   - Login → Manage products → Moderate reviews

### Run E2E Tests
```bash
# Run all tests
npx playwright test

# Run specific test suite
npx playwright test e2e/01-customer-shopping.spec.ts
npx playwright test e2e/02-booking-flow.spec.ts
npx playwright test e2e/03-admin-operations.spec.ts

# Run in UI mode for debugging
npx playwright test --ui

# Generate HTML report
npx playwright show-report
```

### Expected Results
- Most critical tests should now pass
- Some tests may need minor adjustments based on actual UI behavior
- Phase 4 components (optional) can be added if tests require them

---

*Last Updated: February 28, 2026*
*Progress: 11/25 components (44%) - Phases 1-3 Complete!*
*Critical E2E test paths: READY FOR TESTING ✅*
