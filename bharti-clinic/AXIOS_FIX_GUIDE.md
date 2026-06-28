# 🔧 Axios Configuration Fix Guide

## Problem
Admin pages are making API requests to `:5173` (frontend port) instead of `:5000` (backend port), causing 404 errors.

## Solution
Created centralized axios configuration with proper base URL.

---

## Files Created

### 1. `frontend/src/lib/axios.ts`
Centralized axios instance with:
- Base URL configuration from environment variable
- Automatic auth token injection
- 401 error handling (auto-redirect to login)

### 2. `frontend/.env`
Environment variables:
```
VITE_API_BASE_URL=http://localhost:5000
VITE_SITE_URL=http://localhost:5173
```

### 3. `backend/src/index.ts` (Updated)
Increased rate limits for development:
- Public routes: 1000 requests/15min (dev) vs 100 (prod)
- Auth routes: 100 requests/15min (dev) vs 10 (prod)

---

## How to Apply the Fix

### Quick Fix (Restart Required)

1. **Stop both frontend and backend servers** (Ctrl+C)

2. **Restart backend:**
```bash
cd bharti-clinic/backend
npm run dev
```

3. **Restart frontend:**
```bash
cd bharti-clinic/frontend
npm run dev
```

4. **Clear browser cache and refresh**

The rate limiting will now be more lenient and requests will go to the correct port.

---

## Manual Fix for Each Admin Page

To fully fix the issue, each admin page needs to import the centralized axios instance instead of using the global axios.

### Example: AdminTherapiesPage.tsx

**Before:**
```typescript
import axios from 'axios';

// Later in code:
const response = await axios.get('/api/admin/therapies', {
    headers: { Authorization: `Bearer ${token}` },
});
```

**After:**
```typescript
import api from '../../lib/axios';

// Later in code:
const response = await api.get('/api/admin/therapies');
// No need to manually add Authorization header - it's automatic!
```

### Files That Need Updating:

1. ✅ `frontend/src/pages/admin/AdminTherapiesPage.tsx`
2. ✅ `frontend/src/pages/admin/AdminPackagesPage.tsx`
3. ✅ `frontend/src/pages/admin/AdminGalleryPage.tsx`
4. ⚠️ `frontend/src/pages/admin/DashboardPage.tsx`
5. ⚠️ `frontend/src/pages/admin/AdminProductsPage.tsx`
6. ⚠️ `frontend/src/pages/admin/AdminInventoryPage.tsx`
7. ⚠️ `frontend/src/pages/admin/AdminOrdersPage.tsx`
8. ⚠️ `frontend/src/pages/admin/AdminAppointmentsPage.tsx`
9. ⚠️ `frontend/src/pages/admin/AdminReviewsPageFull.tsx`
10. ⚠️ `frontend/src/pages/admin/AdminBlogPage.tsx`
11. ⚠️ `frontend/src/pages/admin/AdminSettingsPage.tsx`
12. ⚠️ `frontend/src/pages/admin/AdminLoginPage.tsx`

---

## Automated Fix Script

Run this command to update all admin pages automatically:

```bash
cd bharti-clinic/frontend/src/pages/admin

# Replace axios import with api import in all files
find . -name "*.tsx" -type f -exec sed -i "s/import axios from 'axios';/import api from '..\/..\/lib\/axios';/g" {} \;

# Replace axios. with api. in all files
find . -name "*.tsx" -type f -exec sed -i "s/axios\./api./g" {} \;

# Remove manual Authorization headers (no longer needed)
find . -name "*.tsx" -type f -exec sed -i "s/, headers: { Authorization: \`Bearer \${token}\` }//g" {} \;
find . -name "*.tsx" -type f -exec sed -i "s/headers: { Authorization: \`Bearer \${token}\` }, //g" {} \;
find . -name "*.tsx" -type f -exec sed -i "s/headers: { Authorization: \`Bearer \${token}\` }//g" {} \;
```

**Note:** On Windows, use PowerShell or Git Bash for these commands.

---

## Testing After Fix

1. **Login to admin panel:**
   - Go to `http://localhost:5173/admin/login`
   - Login with admin credentials

2. **Check Dashboard:**
   - Should see KPI cards with data
   - No 404 errors in console
   - No 429 rate limit errors

3. **Check Admin Pages:**
   - Navigate to each admin page
   - Verify data loads correctly
   - Check browser console for errors

---

## Environment Variables

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_SITE_URL=http://localhost:5173
```

### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/bharticlinic
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=24h
PORT=5000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
```

---

## Benefits of This Fix

1. **Centralized Configuration**
   - Single place to update API URL
   - Easy to switch between dev/staging/production

2. **Automatic Auth**
   - No need to manually add Authorization headers
   - Token automatically included in all requests

3. **Better Error Handling**
   - 401 errors automatically redirect to login
   - Consistent error handling across all pages

4. **Type Safety**
   - TypeScript support
   - Better IDE autocomplete

5. **Easier Testing**
   - Can mock the api instance for tests
   - Consistent API interface

---

## Troubleshooting

### Still getting 404 errors?
- Check backend is running on port 5000
- Verify `.env` file exists in frontend folder
- Restart frontend dev server

### Still getting 429 errors?
- Backend rate limiting updated
- Restart backend server
- Clear browser cache

### CORS errors?
- Check `CLIENT_ORIGIN` in backend `.env`
- Should be `http://localhost:5173`
- Restart backend after changing

### Token not working?
- Check localStorage has `adminToken`
- Try logging out and back in
- Check token format in Network tab

---

## Next Steps

After applying this fix:
1. Test all admin pages
2. Verify no console errors
3. Continue with e-commerce integration
4. Add file upload functionality

---

*Created: February 28, 2026*
*Status: Ready to Apply*
