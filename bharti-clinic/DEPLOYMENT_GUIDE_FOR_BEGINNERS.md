# 🚀 Complete Deployment Guide for Beginners

**Bharti Clinic Application**  
**Date:** February 28, 2026  
**For:** First-time deployers

---

## 📋 Table of Contents

1. [What is Deployment?](#what-is-deployment)
2. [Prerequisites](#prerequisites)
3. [Deployment Options](#deployment-options)
4. [Option 1: Vercel + Railway (Easiest)](#option-1-vercel--railway-easiest)
5. [Option 2: Netlify + Render (Free Tier)](#option-2-netlify--render-free-tier)
6. [Option 3: VPS (DigitalOcean/AWS)](#option-3-vps-digitaloceanaws)
7. [Environment Variables Setup](#environment-variables-setup)
8. [Database Setup](#database-setup)
9. [Testing Your Deployment](#testing-your-deployment)
10. [Common Issues & Solutions](#common-issues--solutions)
11. [Post-Deployment Checklist](#post-deployment-checklist)

---

## 🤔 What is Deployment?

**Deployment** means making your application available on the internet so anyone can access it.

Right now, your app runs on your computer (localhost). Deployment moves it to a server that's always online.

### Your Application Has 3 Parts:
1. **Frontend** (React/Vite) - The website users see
2. **Backend** (Node.js/Express) - The API that handles data
3. **Database** (PostgreSQL) - Where data is stored

All three need to be deployed!

---

## ✅ Prerequisites

### What You Need Before Starting:

#### 1. Accounts (All Free)
- [ ] GitHub account (to store your code)
- [ ] Vercel account (for frontend) OR Netlify
- [ ] Railway account (for backend + database) OR Render
- [ ] Domain name (optional, but recommended)

#### 2. Your Code Ready
- [ ] All code committed to Git
- [ ] No errors when running locally
- [ ] Environment variables documented
- [ ] Database migrations ready

#### 3. Tools Installed
- [ ] Git
- [ ] Node.js (v18 or higher)
- [ ] npm or yarn

---

## 🎯 Deployment Options

### Comparison Table

| Option | Difficulty | Cost | Best For |
|--------|-----------|------|----------|
| **Vercel + Railway** | ⭐ Easy | $5-20/mo | Beginners, fast setup |
| **Netlify + Render** | ⭐⭐ Easy | Free-$7/mo | Budget-conscious |
| **VPS (DigitalOcean)** | ⭐⭐⭐⭐ Hard | $12+/mo | Full control, learning |

### My Recommendation for You:
**Start with Option 1 (Vercel + Railway)** - It's the easiest and most reliable.

---

## 🌟 Option 1: Vercel + Railway (EASIEST - RECOMMENDED)

### Why This Option?
- ✅ Easiest setup (click and deploy)
- ✅ Automatic deployments from GitHub
- ✅ Great free tier
- ✅ Excellent performance
- ✅ Built-in SSL certificates

### Cost Breakdown:
- **Vercel:** Free for frontend
- **Railway:** $5/month for backend + database
- **Total:** ~$5/month

---

### Step 1: Push Code to GitHub

```bash
# Navigate to your project
cd bharti-clinic

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - ready for deployment"

# Create repository on GitHub (go to github.com)
# Then link and push:
git remote add origin https://github.com/YOUR_USERNAME/bharti-clinic.git
git branch -M main
git push -u origin main
```

---

### Step 2: Deploy Database on Railway

#### 2.1 Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Sign in with GitHub

#### 2.2 Create PostgreSQL Database
1. Click "New Project"
2. Select "Provision PostgreSQL"
3. Wait for database to be created (30 seconds)
4. Click on the PostgreSQL service
5. Go to "Variables" tab
6. Copy the `DATABASE_URL` - you'll need this!

**Example DATABASE_URL:**
```
postgresql://postgres:password@containers-us-west-123.railway.app:5432/railway
```

#### 2.3 Run Database Migrations
```bash
# In your backend folder
cd backend

# Set the DATABASE_URL temporarily
export DATABASE_URL="your-railway-database-url"

# Run migrations
npx prisma migrate deploy

# Seed initial data (if you have seed script)
npx prisma db seed
```

---

### Step 3: Deploy Backend on Railway

#### 3.1 Create Backend Service
1. In Railway, click "New" → "GitHub Repo"
2. Select your `bharti-clinic` repository
3. Railway will detect it's a Node.js app

#### 3.2 Configure Backend
1. Click on your service
2. Go to "Settings"
3. Set **Root Directory:** `backend`
4. Set **Build Command:** `npm install && npm run build`
5. Set **Start Command:** `npm start`

#### 3.3 Add Environment Variables
Go to "Variables" tab and add:

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=https://your-app.vercel.app
```

**Important:** 
- Replace `JWT_SECRET` with a random string (use a password generator)
- We'll update `FRONTEND_URL` after deploying frontend

#### 3.4 Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. Railway will give you a URL like: `https://bharti-clinic-backend.up.railway.app`
4. Copy this URL - you'll need it for frontend!

---

### Step 4: Deploy Frontend on Vercel

#### 4.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New Project"

#### 4.2 Import Repository
1. Select your `bharti-clinic` repository
2. Vercel will detect it's a Vite app

#### 4.3 Configure Frontend
1. **Framework Preset:** Vite
2. **Root Directory:** `frontend`
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`

#### 4.4 Add Environment Variables
Click "Environment Variables" and add:

```env
VITE_API_URL=https://bharti-clinic-backend.up.railway.app
```

Replace with your actual Railway backend URL!

#### 4.5 Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. Vercel will give you a URL like: `https://bharti-clinic.vercel.app`
4. Your site is live! 🎉

---

### Step 5: Update Backend with Frontend URL

1. Go back to Railway
2. Open your backend service
3. Go to "Variables"
4. Update `FRONTEND_URL` to your Vercel URL
5. Service will automatically redeploy

---

### Step 6: Configure Custom Domain (Optional)

#### On Vercel (Frontend):
1. Go to your project settings
2. Click "Domains"
3. Add your domain (e.g., `bharticlinic.com`)
4. Follow DNS instructions from your domain provider

#### On Railway (Backend):
1. Go to your backend service
2. Click "Settings" → "Domains"
3. Add custom domain (e.g., `api.bharticlinic.com`)
4. Update DNS records

---

## 🆓 Option 2: Netlify + Render (FREE TIER)

### Why This Option?
- ✅ Completely free to start
- ✅ Good for testing/learning
- ⚠️ Backend sleeps after 15 min of inactivity (free tier)
- ⚠️ Slower cold starts

### Cost: $0/month (with limitations)

---

### Step 1: Deploy Database on Render

#### 1.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub

#### 1.2 Create PostgreSQL Database
1. Click "New" → "PostgreSQL"
2. Name: `bharti-clinic-db`
3. Database: `bharti_clinic`
4. User: `bharti_admin`
5. Region: Choose closest to you
6. Plan: **Free** (limited to 90 days, then $7/mo)
7. Click "Create Database"

#### 1.3 Get Connection String
1. Click on your database
2. Scroll to "Connections"
3. Copy "External Database URL"

#### 1.4 Run Migrations
```bash
cd backend
export DATABASE_URL="your-render-database-url"
npx prisma migrate deploy
```

---

### Step 2: Deploy Backend on Render

#### 2.1 Create Web Service
1. Click "New" → "Web Service"
2. Connect your GitHub repository
3. Name: `bharti-clinic-backend`
4. Root Directory: `backend`
5. Environment: `Node`
6. Build Command: `npm install && npm run build`
7. Start Command: `npm start`
8. Plan: **Free**

#### 2.2 Add Environment Variables
```env
NODE_ENV=production
PORT=10000
DATABASE_URL=${{DATABASE_URL}}
JWT_SECRET=your-super-secret-key
FRONTEND_URL=https://bharti-clinic.netlify.app
```

#### 2.3 Deploy
- Click "Create Web Service"
- Wait 5-10 minutes (first deploy is slow)
- You'll get a URL like: `https://bharti-clinic-backend.onrender.com`

---

### Step 3: Deploy Frontend on Netlify

#### 3.1 Create Netlify Account
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub

#### 3.2 Import Repository
1. Click "Add new site" → "Import an existing project"
2. Choose GitHub
3. Select `bharti-clinic` repository

#### 3.3 Configure Build
1. Base directory: `frontend`
2. Build command: `npm run build`
3. Publish directory: `frontend/dist`

#### 3.4 Add Environment Variables
Go to "Site settings" → "Environment variables":

```env
VITE_API_URL=https://bharti-clinic-backend.onrender.com
```

#### 3.5 Deploy
- Click "Deploy site"
- Wait 2-3 minutes
- You'll get a URL like: `https://bharti-clinic.netlify.app`

---

## 🖥️ Option 3: VPS (DigitalOcean/AWS) - ADVANCED

### ⚠️ Warning: This is Complex!
Only choose this if you:
- Want to learn server management
- Need full control
- Are comfortable with Linux command line

### Cost: $12-50/month

I'll create a separate detailed guide for this if you choose this option.

**For now, I recommend starting with Option 1 or 2!**

---

## 🔐 Environment Variables Setup

### Backend Environment Variables

Create `.env.production` in `backend/`:

```env
# Server
NODE_ENV=production
PORT=5000

# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long

# CORS
FRONTEND_URL=https://your-frontend-url.com

# File Upload (if using cloud storage)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (if using email service)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Frontend Environment Variables

Create `.env.production` in `frontend/`:

```env
# API URL
VITE_API_URL=https://your-backend-url.com

# Optional: Analytics
VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X
```

---

## 🗄️ Database Setup

### Step 1: Create Production Database

Choose one:
- **Railway:** Easiest, $5/mo
- **Render:** Free for 90 days, then $7/mo
- **Supabase:** Free tier available
- **PlanetScale:** Free tier available

### Step 2: Run Migrations

```bash
# Set your production database URL
export DATABASE_URL="your-production-database-url"

# Run migrations
cd backend
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate
```

### Step 3: Seed Initial Data

```bash
# Create admin user and initial data
npx prisma db seed
```

If you don't have a seed script, create one:

```typescript
// backend/prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    // Create admin user
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    await prisma.admin.upsert({
        where: { email: 'dr.ipinder@bhartiveda.com' },
        update: {},
        create: {
            email: 'dr.ipinder@bhartiveda.com',
            password: hashedPassword,
            name: 'Dr. Ipinder Bharti',
        },
    });

    // Create categories
    await prisma.category.createMany({
        data: [
            { name: 'Ayurvedic Oils', slug: 'ayurvedic-oils', description: 'Natural healing oils' },
            { name: 'Herbal Supplements', slug: 'herbal-supplements', description: 'Pure herbal products' },
            { name: 'Skincare', slug: 'skincare', description: 'Natural skincare products' },
        ],
        skipDuplicates: true,
    });

    console.log('✅ Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
```

Add to `package.json`:
```json
{
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}
```

---

## 🧪 Testing Your Deployment

### 1. Test Frontend
```bash
# Visit your frontend URL
https://your-app.vercel.app

# Check:
✅ Homepage loads
✅ Images display
✅ Navigation works
✅ No console errors
```

### 2. Test Backend API
```bash
# Test health endpoint
curl https://your-backend.railway.app/health

# Should return: {"status":"ok"}

# Test products endpoint
curl https://your-backend.railway.app/api/products

# Should return: {"success":true,"data":[...]}
```

### 3. Test Database Connection
```bash
# Try logging into admin
# Go to: https://your-app.vercel.app/admin/login
# Email: dr.ipinder@bhartiveda.com
# Password: password123

✅ Should log in successfully
✅ Dashboard should load
✅ Products should display
```

### 4. Test Full Flow
1. Browse products
2. Add to cart
3. Go to checkout
4. Fill form
5. Submit order
6. Check admin panel for new order

---

## 🐛 Common Issues & Solutions

### Issue 1: "Cannot connect to database"

**Solution:**
```bash
# Check DATABASE_URL is correct
echo $DATABASE_URL

# Test connection
npx prisma db pull

# If fails, verify:
1. Database is running
2. URL format is correct
3. Firewall allows connections
```

### Issue 2: "CORS Error"

**Solution:**
```typescript
// backend/src/index.ts
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// Make sure FRONTEND_URL matches exactly!
```

### Issue 3: "Build Failed"

**Solution:**
```bash
# Check build locally first
cd frontend
npm run build

# If it works locally, check:
1. Environment variables are set
2. Node version matches (use .nvmrc)
3. Dependencies are in package.json
```

### Issue 4: "Images Not Loading"

**Solution:**
```typescript
// Check image paths
// Use absolute URLs or proper relative paths

// In production, images should be:
1. Uploaded to cloud storage (Cloudinary)
2. Or served from /public folder
3. Or use CDN
```

### Issue 5: "API Returns 404"

**Solution:**
```bash
# Check API URL in frontend
console.log(import.meta.env.VITE_API_URL)

# Should match your backend URL exactly
# Include /api if your routes use it
```

---

## ✅ Post-Deployment Checklist

### Security
- [ ] Change default admin password
- [ ] Set strong JWT_SECRET
- [ ] Enable HTTPS (should be automatic)
- [ ] Set up CORS properly
- [ ] Add rate limiting
- [ ] Sanitize user inputs

### Performance
- [ ] Enable gzip compression
- [ ] Optimize images (WebP format)
- [ ] Add caching headers
- [ ] Use CDN for static assets
- [ ] Monitor response times

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Add analytics (Google Analytics)
- [ ] Monitor uptime (UptimeRobot)
- [ ] Set up logging
- [ ] Create backup strategy

### SEO
- [ ] Add meta tags to all pages
- [ ] Create sitemap.xml
- [ ] Add robots.txt
- [ ] Submit to Google Search Console
- [ ] Add structured data (JSON-LD)

### Testing
- [ ] Test on mobile devices
- [ ] Test on different browsers
- [ ] Test all user flows
- [ ] Test admin functions
- [ ] Load testing (optional)

---

## 📊 Deployment Comparison

### Vercel + Railway (Recommended)
**Pros:**
- ✅ Easiest setup
- ✅ Auto-deploy from GitHub
- ✅ Great performance
- ✅ Built-in SSL
- ✅ Excellent documentation

**Cons:**
- ❌ Costs $5/month minimum
- ❌ Less control

**Best for:** Beginners, production apps

---

### Netlify + Render (Free)
**Pros:**
- ✅ Completely free to start
- ✅ Good for learning
- ✅ Easy setup

**Cons:**
- ❌ Backend sleeps (15 min inactivity)
- ❌ Slow cold starts
- ❌ Database limited to 90 days free

**Best for:** Testing, portfolios, low-traffic sites

---

### VPS (DigitalOcean/AWS)
**Pros:**
- ✅ Full control
- ✅ Can run anything
- ✅ Learn server management
- ✅ Scalable

**Cons:**
- ❌ Complex setup
- ❌ Need Linux knowledge
- ❌ Manual SSL setup
- ❌ More expensive
- ❌ You manage everything

**Best for:** Advanced users, learning, specific requirements

---

## 🎓 Next Steps After Deployment

### Week 1: Monitor & Fix
- Watch for errors
- Fix any bugs
- Monitor performance
- Gather user feedback

### Week 2: Optimize
- Improve load times
- Optimize images
- Add caching
- Improve SEO

### Week 3: Enhance
- Add missing features
- Improve UX
- Add analytics
- A/B testing

### Month 2+: Scale
- Handle more traffic
- Add new features
- Improve performance
- Marketing & growth

---

## 📚 Additional Resources

### Documentation
- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Netlify Docs](https://docs.netlify.com)
- [Render Docs](https://render.com/docs)

### Learning
- [DigitalOcean Tutorials](https://www.digitalocean.com/community/tutorials)
- [MDN Web Docs](https://developer.mozilla.org)
- [Web.dev](https://web.dev)

### Tools
- [SSL Checker](https://www.sslshopper.com/ssl-checker.html)
- [PageSpeed Insights](https://pagespeed.web.dev)
- [GTmetrix](https://gtmetrix.com)
- [Uptime Robot](https://uptimerobot.com)

---

## 🆘 Need Help?

### If You Get Stuck:

1. **Check the logs:**
   - Vercel: Project → Deployments → Click deployment → Logs
   - Railway: Service → Deployments → Click deployment → Logs

2. **Common commands:**
   ```bash
   # Check if site is up
   curl -I https://your-site.com
   
   # Test API endpoint
   curl https://your-api.com/health
   
   # Check DNS
   nslookup your-domain.com
   ```

3. **Ask for help:**
   - Vercel Discord
   - Railway Discord
   - Stack Overflow
   - GitHub Issues

---

## 🎉 Congratulations!

If you've made it this far and your site is live, congratulations! 🎊

You've successfully deployed a full-stack application to the internet!

### What You've Accomplished:
✅ Deployed a React frontend  
✅ Deployed a Node.js backend  
✅ Set up a PostgreSQL database  
✅ Configured environment variables  
✅ Set up automatic deployments  
✅ Made your app accessible worldwide  

### You're Now a Full-Stack Developer! 🚀

---

*Last Updated: February 28, 2026*  
*Guide Version: 1.0*  
*Difficulty: Beginner-Friendly*
