# Products & Inventory Enhancement Plan

## Current Status
Both AdminProductsPage and AdminInventoryPage exist with basic functionality. They need enhancements per requirements.

## Products Page Enhancements Needed

### 1. Enhanced Modal with Tabs ⏳
**Current:** Single form
**Needed:** Tabbed interface
- Tab 1: Basic Info (Name, Category, Description, Short Description)
- Tab 2: Pricing & Stock (Price, Compare Price, Stock, Low Stock Threshold, Is Featured, Is Active)
- Tab 3: Images (Drag-and-drop uploader, up to 5 images, reorder, preview)
- Tab 4: SEO (Slug auto-gen, Meta Description)

### 2. Image Uploader Component ⏳
**File:** `frontend/src/components/admin/ImageUploader.tsx` (exists but needs integration)
- Drag-and-drop zone
- Multiple file upload (max 5)
- Preview thumbnails
- Reorder by drag
- Delete images
- Progress indicator

### 3. Bulk Actions ⏳
**Needed:**
- Checkbox column in table
- "Select All" checkbox in header
- "Delete Selected" button (appears when items selected)
- Bulk delete confirmation

### 4. Enhanced Filters ⏳
**Current:** Search only
**Needed:**
- Category dropdown filter
- Status filter (All/Active/Inactive)
- Apply filters button

### 5. Pagination Update ⏳
**Current:** 10 per page
**Needed:** 20 per page

### 6. Image Thumbnail Column ⏳
**Needed:** Add image thumbnail as first column in table

---

## Inventory Page Enhancements Needed

### 1. Full Inventory Table ⏳
**Current:** Only shows low stock items
**Needed:** Show ALL products with columns:
- Product Name
- Category
- Current Stock
- Threshold
- Status (color-coded badge)
- Last Updated
- Actions (Restock button)

### 2. Stock Status Color Coding ⏳
- Red badge "Critical" (stock < 5)
- Orange badge "Low" (stock < threshold)
- Green badge "OK" (stock >= threshold)

### 3. Restock Modal ⏳
**Needed:** Modal with form:
- Product name (read-only)
- Quantity to add (number input)
- Supplier/Reason (textarea)
- Submit button → POST /api/admin/inventory/log

### 4. Inventory Log Tab ⏳
**Needed:** Second tab showing history:
- Date
- Product
- Change (+/- amount)
- New Stock
- Reason
- Admin Name
- Sortable by date

### 5. Export CSV Button ⏳
**Needed:**
- Button to export current inventory to CSV
- Includes all columns
- Downloads as `inventory-YYYY-MM-DD.csv`

---

## Implementation Priority

### HIGH PRIORITY (Core Functionality)
1. ✅ Products Page - Basic CRUD (DONE)
2. ⏳ Products Page - Image uploader integration
3. ⏳ Inventory Page - Full table view
4. ⏳ Inventory Page - Restock modal with API

### MEDIUM PRIORITY (Enhanced UX)
5. ⏳ Products Page - Tabbed modal
6. ⏳ Products Page - Bulk actions
7. ⏳ Products Page - Enhanced filters
8. ⏳ Inventory Page - Inventory log tab

### LOW PRIORITY (Nice to Have)
9. ⏳ Inventory Page - Export CSV
10. ⏳ Products Page - Image reordering

---

## API Endpoints Needed

### Products (Already Exist)
- ✅ GET /api/admin/products
- ✅ POST /api/admin/products
- ✅ PUT /api/admin/products/:id
- ✅ DELETE /api/admin/products/:id

### Inventory (Need to Create)
- ⏳ GET /api/admin/inventory (all products with stock)
- ⏳ POST /api/admin/inventory/log (restock)
- ⏳ GET /api/admin/inventory/logs (history)

### File Upload (Need to Create)
- ⏳ POST /api/admin/upload (image upload)

---

## Estimated Time

- **Products Page Enhancements:** 6-8 hours
  - Tabbed modal: 2 hours
  - Image uploader: 2-3 hours
  - Bulk actions: 1 hour
  - Filters: 1 hour

- **Inventory Page Enhancements:** 4-6 hours
  - Full table: 1 hour
  - Restock modal: 2 hours
  - Inventory log: 2 hours
  - Export CSV: 1 hour

- **Backend APIs:** 2-3 hours
  - Inventory endpoints: 1-2 hours
  - File upload: 1 hour

**Total:** 12-17 hours

---

## Next Steps

Given the scope, I recommend:

**Option 1: Quick Wins (2-3 hours)**
- Add image thumbnail column to products table
- Enhance inventory page to show all products
- Add restock modal with basic functionality
- Update pagination to 20 per page

**Option 2: Full Enhancement (12-17 hours)**
- Complete all requirements as specified
- Tabbed modal, image uploader, bulk actions
- Full inventory management with logs
- Export functionality

**Option 3: Incremental (Start with essentials)**
- Phase 1: Image uploader + Inventory table (4 hours)
- Phase 2: Tabbed modal + Restock (4 hours)
- Phase 3: Bulk actions + Logs + Export (4 hours)

---

## Current Working State

Both pages are functional with:
- ✅ List products
- ✅ Search products
- ✅ Add/Edit/Delete products
- ✅ View low stock items
- ✅ Basic restock action

**Ready for enhancement when you're ready to proceed!**

---

*Status: Planning Complete - Ready for Implementation*
*Date: February 28, 2026*
