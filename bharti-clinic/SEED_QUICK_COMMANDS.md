# 🚀 Database Seeding - Quick Commands

**Copy-paste commands to seed your database**

---

## ⚡ Quick Start (3 Commands)

```bash
# 1. Navigate to backend
cd backend

# 2. Run migrations
npx prisma migrate dev

# 3. Seed database
npx prisma db seed
```

**Done!** Your database now has ~50 realistic records.

---

## 🔐 Login After Seeding

```
URL: http://localhost:5173/admin/login
Email: dr.ipinder@bhartiveda.com
Password: password123
```

---

## 🔄 Reset & Re-seed

```bash
cd backend
npx prisma migrate reset  # Deletes all data
npx prisma db seed         # Adds fresh data
```

---

## 👀 View Your Data

```bash
cd backend
npx prisma studio
```

Opens browser at `http://localhost:5555` to view all data.

---

## 🐛 Fix Common Errors

### "Cannot find module"
```bash
cd backend
npm install
```

### "Database connection failed"
```bash
# Check if PostgreSQL is running
# Windows: Check Services
# Mac: brew services list

# Check .env file
cat .env | grep DATABASE_URL
```

### "Unique constraint failed"
```bash
cd backend
npx prisma migrate reset  # This will delete all data
npx prisma db seed
```

---

## 📊 What Gets Created?

- 1 Admin user
- 5 Categories
- 14 Products
- 5 Therapies
- 4 Packages
- 6 Gallery images
- 3 Blog posts
- 5 Reviews
- 2 Sample orders
- 3 Appointments
- 2 Contact messages

**Total: ~50 records**

---

## ✅ Verify Seeding Worked

```bash
# Open Prisma Studio
npx prisma studio

# Check these tables:
# - Admin (should have 1 user)
# - Product (should have 14 products)
# - Therapy (should have 5 therapies)
# - Package (should have 4 packages)
```

---

## 🎯 Next Steps

1. Start frontend: `cd frontend && npm run dev`
2. Visit: `http://localhost:5173`
3. Check products, therapies, packages display
4. Login to admin panel
5. Test all features

---

*Quick Reference Version: 1.0*  
*For detailed guide, see: HOW_TO_SEED_DATABASE.md*
