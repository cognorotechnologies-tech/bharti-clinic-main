# 🌱 How to Seed Your Database

**Complete guide to populate your database with realistic data**

---

## 📋 What is Database Seeding?

Database seeding = Adding initial/sample data to your database

**Why seed?**
- Test your application with realistic data
- Demo your app to clients
- Development environment setup
- Quick start for new developers

---

## ✅ What Data Will Be Created?

The seed script creates:
- ✅ 1 Admin user (for login)
- ✅ 5 Product categories
- ✅ 14 Products (oils, supplements, skincare, teas, aromatherapy)
- ✅ 5 Therapies (Abhyanga, Shirodhara, Panchakarma, etc.)
- ✅ 4 Packages (wellness programs)
- ✅ 6 Gallery images
- ✅ 3 Blog posts
- ✅ 5 Customer reviews
- ✅ 2 Sample orders
- ✅ 3 Sample appointments
- ✅ 2 Contact messages

**Total:** ~50 realistic records!

---

## 🚀 How to Run the Seed Script

### Step 1: Make Sure Database is Ready

```bash
# Navigate to backend folder
cd backend

# Run migrations (if not already done)
npx prisma migrate dev

# This creates all tables in your database
```

### Step 2: Run the Seed Script

```bash
# Still in backend folder
npx prisma db seed

# Or use npm:
npm run prisma db seed
```

### Step 3: Wait for Completion

You'll see output like:
```
🌱 Starting database seeding...

👤 Creating admin user...
✅ Admin user created

📁 Creating categories...
✅ Created 5 categories

🛍️  Creating products...
✅ Created 14 products

... (more output)

🎉 Database seeding completed successfully!
```

---

## 🔐 Admin Login Credentials

After seeding, you can login with:

```
Email: dr.ipinder@bhartiveda.com
Password: password123
```

**⚠️ IMPORTANT:** Change this password in production!

---

## 🧪 Testing the Seeded Data

### Test Frontend

1. Start your frontend:
   ```bash
   cd frontend
   npm run dev
   ```

2. Visit: `http://localhost:5173`

3. Check:
   - ✅ Products display on Shop page
   - ✅ Therapies show on Therapies page
   - ✅ Packages appear on Packages page
   - ✅ Gallery images load
   - ✅ Blog posts visible

### Test Admin Panel

1. Go to: `http://localhost:5173/admin/login`

2. Login with credentials above

3. Check:
   - ✅ Dashboard shows stats
   - ✅ Products page lists all products
   - ✅ Orders page shows sample orders
   - ✅ Appointments page displays bookings
   - ✅ Reviews page shows customer reviews

---

## 🔄 Re-seeding (Fresh Start)

If you want to start over with fresh data:

### Option 1: Reset Everything

```bash
cd backend

# This will DELETE all data and re-run migrations
npx prisma migrate reset

# Then seed again
npx prisma db seed
```

### Option 2: Manual Delete + Seed

```bash
# Delete all data manually in Prisma Studio
npx prisma studio

# Then seed
npx prisma db seed
```

---

## 🛠️ Customizing the Seed Data

### Edit the Seed File

File location: `backend/prisma/seed-realistic.ts`

### Example: Add More Products

```typescript
// In seed-realistic.ts, find the products section
prisma.product.create({
    data: {
        name: 'Your Product Name',
        slug: 'your-product-slug',
        description: 'Product description here',
        price: 999,
        comparePrice: 1299,
        stock: 50,
        categoryId: categories[0].id, // Choose category
        imageUrl: 'https://your-image-url.com/image.jpg',
        isActive: true,
        isFeatured: false,
    },
}),
```

### Example: Add More Therapies

```typescript
// In seed-realistic.ts, find the therapies section
prisma.therapy.create({
    data: {
        name: 'Your Therapy Name',
        slug: 'your-therapy-slug',
        description: 'Therapy description',
        duration: 60, // minutes
        price: 2500,
        imageUrl: 'https://your-image-url.com/image.jpg',
        benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3'],
        isActive: true,
        isFeatured: false,
    },
}),
```

After editing, run:
```bash
npx prisma db seed
```

---

## 🐛 Troubleshooting

### Error: "Cannot find module 'bcryptjs'"

**Solution:**
```bash
cd backend
npm install bcryptjs @types/bcryptjs
```

### Error: "Cannot find module '@prisma/client'"

**Solution:**
```bash
cd backend
npm install @prisma/client
npx prisma generate
```

### Error: "Unique constraint failed"

**Cause:** Data already exists in database

**Solution:**
```bash
# Reset database
npx prisma migrate reset

# Then seed again
npx prisma db seed
```

### Error: "Database connection failed"

**Solution:**
```bash
# Check your DATABASE_URL in .env
cat .env | grep DATABASE_URL

# Make sure PostgreSQL is running
# On Windows: Check Services
# On Mac: brew services list
```

### Seed runs but no data appears

**Solution:**
```bash
# Check if data was created
npx prisma studio

# Look at each table to verify data exists
```

---

## 📊 Seed Script Details

### What Happens During Seeding?

1. **Connects to database** using DATABASE_URL from .env
2. **Creates admin user** with hashed password
3. **Creates categories** (upsert - won't duplicate)
4. **Creates products** linked to categories
5. **Creates therapies** with benefits
6. **Creates packages** with features
7. **Creates gallery images** for different categories
8. **Creates blog posts** with HTML content
9. **Creates reviews** from sample customers
10. **Creates sample orders** with items
11. **Creates appointments** for therapies
12. **Creates contact messages** for testing
13. **Disconnects** from database

### Time to Complete

- Small database: 5-10 seconds
- Large database: 30-60 seconds

---

## 🔒 Security Notes

### Development vs Production

**Development (Local):**
- ✅ Use seed script
- ✅ Test data is fine
- ✅ Simple passwords OK

**Production (Live Site):**
- ❌ Don't use seed script
- ❌ No test data
- ❌ Change all passwords
- ✅ Use real data only

### Password Security

The seed script uses:
```typescript
const hashedPassword = await bcrypt.hash('password123', 10);
```

This is secure hashing, but:
- ⚠️ Change password after first login
- ⚠️ Use strong passwords in production
- ⚠️ Never commit real passwords to Git

---

## 📝 Seed Script Checklist

Before running seed:
- [ ] Database is created
- [ ] Migrations are run
- [ ] DATABASE_URL is correct in .env
- [ ] Dependencies are installed
- [ ] PostgreSQL is running

After running seed:
- [ ] Check for errors in output
- [ ] Verify data in Prisma Studio
- [ ] Test admin login
- [ ] Check frontend displays data
- [ ] Test all features work

---

## 🎯 Next Steps

After seeding:

1. **Test Everything**
   - Browse products
   - View therapies
   - Check admin panel
   - Test all features

2. **Customize Data**
   - Edit seed file
   - Add your own products
   - Update descriptions
   - Change images

3. **Deploy**
   - Seed production database
   - Change admin password
   - Remove test data
   - Add real content

---

## 📚 Additional Resources

### Prisma Documentation
- [Seeding](https://www.prisma.io/docs/guides/database/seed-database)
- [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client)
- [Migrations](https://www.prisma.io/docs/concepts/components/prisma-migrate)

### Useful Commands
```bash
# View database in browser
npx prisma studio

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Reset database
npx prisma migrate reset

# Seed database
npx prisma db seed
```

---

## ✅ Summary

**Seed File:** `backend/prisma/seed-realistic.ts`  
**Command:** `npx prisma db seed`  
**Time:** 5-10 seconds  
**Data Created:** ~50 records  
**Admin Login:** dr.ipinder@bhartiveda.com / password123  

**You're ready to seed your database!** 🌱

---

*Guide Version: 1.0*  
*Last Updated: February 28, 2026*  
*Seed Script: Complete & Ready*
