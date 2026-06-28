# 🚀 Start Backend Server

## Error: ERR_CONNECTION_REFUSED

This means your backend server is **not running**. The frontend is trying to connect to `http://localhost:5000` but nothing is listening on that port.

---

## ✅ Solution: Start the Backend

### Option 1: Using npm (Recommended)
```bash
# Open a new terminal
cd bharti-clinic/backend

# Start the development server
npm run dev
```

### Option 2: Using the PowerShell script
```powershell
# From the bharti-clinic root directory
.\restart-backend.ps1
```

---

## 📋 What You Should See

When the backend starts successfully, you'll see:
```
✅ Database connected successfully
✅ Server running on port 5000
✅ Environment: development
📍 Registering routes...
  → /api/admin
  → /api/categories
  → /api/therapies
  → /api/appointments
  → /api/packages
  → /api/products
  → /api/admin/reviews
  → /api/orders
  → /api/gallery
  → /api/reviews          ← This is the one you need!
  → /api/blog
  → /api/settings
  → /api/contact
  → /api/auth
✅ All routes registered
```

---

## 🔍 Verify Backend is Running

### Test 1: Health Check
Open your browser and visit:
```
http://localhost:5000/api/health
```

You should see:
```json
{
  "status": "ok",
  "message": "Bharti Clinic API is running"
}
```

### Test 2: Check Reviews Endpoint
```
http://localhost:5000/api/reviews?status=PENDING
```

You should see a response (might be empty or require authentication).

---

## 🐛 Troubleshooting

### Port Already in Use
If you see `Error: listen EADDRINUSE: address already in use :::5000`:

**Windows:**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

**Then restart:**
```bash
cd backend
npm run dev
```

### Database Connection Error
If you see database errors:
```bash
cd backend

# Reset and seed database
npx prisma migrate reset --force
npm run seed
```

### Missing Dependencies
If you see module errors:
```bash
cd backend
npm install
npm run dev
```

---

## 📝 Keep Both Servers Running

You need **TWO terminals** running simultaneously:

### Terminal 1: Backend
```bash
cd bharti-clinic/backend
npm run dev
# Keep this running - don't close!
```

### Terminal 2: Frontend
```bash
cd bharti-clinic/frontend
npm run dev
# Keep this running - don't close!
```

---

## ✅ Once Backend is Running

1. **Refresh your browser** at `http://localhost:5173/admin/reviews`
2. The 404 errors should be gone
3. You should see the reviews page loading
4. If you're not logged in, you'll be redirected to login

---

## 🎯 Quick Commands

```bash
# Start backend (from bharti-clinic/backend)
npm run dev

# Start frontend (from bharti-clinic/frontend)  
npm run dev

# Seed database (from bharti-clinic/backend)
npm run seed

# Check backend health
curl http://localhost:5000/api/health
```

---

**Next Step**: Open a terminal, navigate to `bharti-clinic/backend`, and run `npm run dev`!
