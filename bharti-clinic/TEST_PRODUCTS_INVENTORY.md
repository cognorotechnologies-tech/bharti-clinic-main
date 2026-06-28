# Test Checklist: Products & Inventory Management

## Quick Start

1. **Backend:** Already running on port 5000 ✅
2. **Frontend:** Already running on port 5174 ✅
3. **Login:** http://localhost:5174/admin/login
   - Email: `dr.ipinder@bhartiveda.com`
   - Password: `password123`

---

## 🧪 Products Page Tests

**URL:** http://localhost:5174/admin/products

### Test 1: View Products List
- [ ] See list of products with image thumbnails
- [ ] See 20 products per page (not 10)
- [ ] See pagination controls at bottom

### Test 2: Add New Product
- [ ] Click "Add Product" button
- [ ] See tabbed modal (Basic Info | Pricing & Stock | Images | SEO)
- [ ] Fill in Basic Info tab:
  - Product Name: "Test Ayurvedic Oil"
  - Category: Select any
  - Description: "Test description"
- [ ] Go to Pricing & Stock tab:
  - Price: 500
  - Stock: 100
  - Check "Is Active"
- [ ] Go to Images tab:
  - Try drag-and-drop (or click to browse)
  - Upload 1-2 test images
  - See preview thumbnails
- [ ] Go to SEO tab:
  - See auto-generated slug: "test-ayurvedic-oil"
  - Add meta description
- [ ] Click "Save Product"
- [ ] See success message
- [ ] See new product in list

### Test 3: Edit Product
- [ ] Click edit icon on any product
- [ ] Modal opens with existing data
- [ ] Change something (e.g., price)
- [ ] Click "Save Product"
- [ ] See success message
- [ ] See updated data in list

### Test 4: Bulk Delete
- [ ] Check boxes next to 2-3 products
- [ ] See "Delete Selected (X)" button appear
- [ ] Click "Delete Selected"
- [ ] Confirm deletion
- [ ] See success message
- [ ] Products removed from list

### Test 5: Filters
- [ ] Type in search bar → results filter
- [ ] Select a category → results filter
- [ ] Select "Active" status → results filter
- [ ] Clear filters → all products show

### Test 6: Image Thumbnail Column
- [ ] First column shows product images
- [ ] Products without images show "No img" placeholder

---

## 🧪 Inventory Page Tests

**URL:** http://localhost:5174/admin/inventory

### Test 1: View Full Inventory
- [ ] See ALL products (not just low stock)
- [ ] See columns: Product Name | Category | Current Stock | Threshold | Status | Last Updated | Actions
- [ ] See color-coded status badges:
  - Red "Critical" for stock < 5
  - Orange "Low" for stock < threshold
  - Green "OK" for stock >= threshold

### Test 2: Restock Product
- [ ] Click "Restock" button on any product
- [ ] Modal opens showing:
  - Product name (read-only)
  - Current stock
  - Quantity input
  - Reason textarea
- [ ] Enter quantity: 50
- [ ] Enter reason: "Test restock from supplier"
- [ ] See preview: "New stock will be: X"
- [ ] Click "Confirm Restock"
- [ ] See success message
- [ ] See updated stock in table

### Test 3: Inventory Log Tab
- [ ] Click "Inventory Log" tab
- [ ] See history of all stock changes
- [ ] See columns: Date | Product | Change | New Stock | Reason | Admin
- [ ] See your recent restock entry
- [ ] Change is green with "+" prefix
- [ ] Admin name shows your email

### Test 4: Export CSV
- [ ] Click "Export CSV" button
- [ ] File downloads as `inventory-YYYY-MM-DD.csv`
- [ ] Open file in Excel/Notepad
- [ ] See all inventory data with headers

### Test 5: Refresh
- [ ] Click "Refresh" button
- [ ] See loading spinner
- [ ] Data refreshes

---

## 🎯 Expected Results

### Products Page
✅ Tabbed modal interface  
✅ Image uploader with drag-and-drop  
✅ Bulk select and delete  
✅ Category and status filters  
✅ 20 products per page  
✅ Image thumbnail column  
✅ Auto-generated slug  

### Inventory Page
✅ Full inventory table (all products)  
✅ Color-coded stock status  
✅ Restock modal with preview  
✅ Inventory log tab with history  
✅ Export CSV functionality  
✅ Refresh button  

---

## 🐛 Troubleshooting

### If products don't show:
1. Check backend is running: http://localhost:5000
2. Check console for errors (F12)
3. Try hard refresh: Ctrl+Shift+R

### If images don't upload:
- Currently using base64 preview (no server upload yet)
- Images are stored in browser memory
- Will need cloud storage for production

### If restock doesn't work:
1. Check you're logged in as admin
2. Check backend console for errors
3. Verify product exists in database

---

## 📸 Screenshots to Take

1. Products page with filters
2. Add product modal - all 4 tabs
3. Image uploader with drag-and-drop
4. Bulk select with delete button
5. Inventory page with color-coded status
6. Restock modal
7. Inventory log tab
8. Exported CSV file

---

## ✅ Success Criteria

- [ ] All products page features working
- [ ] All inventory page features working
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Responsive design looks good
- [ ] Loading states show properly
- [ ] Success/error messages display
- [ ] Data persists after refresh

---

**Ready to test!** 🚀

If you encounter any issues, check:
1. Backend logs (terminal running backend)
2. Frontend console (F12 in browser)
3. Network tab for API errors
