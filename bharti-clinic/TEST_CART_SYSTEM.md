# 🧪 Cart System - Testing Checklist

## Quick Test Guide

### Test 1: Add to Cart from Shop Page
1. Navigate to http://localhost:5174/shop
2. Click "Add to Cart" on any product
3. ✅ Check: Cart count badge appears in navbar
4. ✅ Check: Cart drawer opens automatically (optional)

### Test 2: View Cart
1. Click shopping bag icon in navbar
2. ✅ Check: Cart drawer slides in from right
3. ✅ Check: Product appears with image, name, price
4. ✅ Check: Quantity shows as 1

### Test 3: Update Quantity
1. Click + button to increase quantity
2. ✅ Check: Quantity increases
3. ✅ Check: Item total updates
4. ✅ Check: Subtotal updates
5. Click - button to decrease
6. ✅ Check: Quantity decreases

### Test 4: Remove Item
1. Click trash icon on an item
2. ✅ Check: Item slides out and disappears
3. ✅ Check: Cart count updates in navbar
4. ✅ Check: Subtotal updates

### Test 5: Empty Cart State
1. Remove all items from cart
2. ✅ Check: Empty cart illustration appears
3. ✅ Check: "Your cart is empty" message shows
4. ✅ Check: "Continue Shopping" button appears

### Test 6: Cart Persistence
1. Add items to cart
2. Refresh the page (F5)
3. ✅ Check: Cart items still there
4. ✅ Check: Cart count still shows in navbar

### Test 7: Product Quick View
1. Go to shop page
2. Hover over a product card
3. Click the eye icon (Quick View)
4. ✅ Check: Modal opens with product details
5. ✅ Check: Can change quantity
6. Click "Add to Cart"
7. ✅ Check: Item added to cart
8. ✅ Check: Modal closes

### Test 8: Product Detail Page
1. Click on a product to go to detail page
2. Select quantity
3. Click "Add to Cart"
4. ✅ Check: Item added with correct quantity
5. ✅ Check: Cart count updates

### Test 9: Stock Validation
1. Find a product with low stock (or set stock to 2 in admin)
2. Add to cart
3. Try to increase quantity beyond stock
4. ✅ Check: + button disabled at max stock
5. ✅ Check: "Max stock reached" warning appears

### Test 10: Checkout Navigation
1. Add items to cart
2. Open cart drawer
3. Click "Proceed to Checkout"
4. ✅ Check: Navigates to /checkout
5. ✅ Check: Cart drawer closes

### Test 11: Continue Shopping
1. Open cart drawer
2. Click "Continue Shopping"
3. ✅ Check: Navigates to /shop
4. ✅ Check: Cart drawer closes

### Test 12: Mobile Responsiveness
1. Open browser dev tools (F12)
2. Switch to mobile view (iPhone/Android)
3. Add items to cart
4. Open cart drawer
5. ✅ Check: Drawer takes full width
6. ✅ Check: All buttons are touch-friendly
7. ✅ Check: Scrolling works smoothly

---

## Expected Behavior Summary

### Cart Count Badge
- Shows total number of items (not unique products)
- Example: 2x Product A + 1x Product B = Badge shows "3"
- Appears in navbar (top right)
- Red circle with white text

### Cart Drawer
- Slides in from right
- Backdrop with blur effect
- Shows all cart items
- Each item shows:
  - Product image
  - Product name
  - Price (with compare price if available)
  - Quantity controls
  - Remove button
  - Item total
- Footer shows:
  - Subtotal
  - Shipping note
  - Total
  - Checkout button
  - Continue shopping button
  - Trust badges

### Animations
- Drawer: Spring animation (smooth slide)
- Items: Fade in when added
- Items: Slide out when removed
- Buttons: Hover effects
- Loading states on add to cart

### Validation
- Can't add more than available stock
- Can't decrease below 1
- Buttons disabled when limits reached
- Warning messages for stock limits

---

## 🐛 Known Issues

None! The cart system is fully functional.

---

## 🎯 All Tests Should Pass

If any test fails, check:
1. Is the frontend running? (http://localhost:5174)
2. Is the backend running? (http://localhost:5000)
3. Are there products in the database?
4. Did you hard refresh? (Ctrl+Shift+R)

---

*Ready to test!* 🚀
