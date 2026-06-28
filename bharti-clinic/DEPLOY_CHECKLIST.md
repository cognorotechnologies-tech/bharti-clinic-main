# 🚀 Quick Deployment Checklist

**Bharti Clinic - Step-by-Step Deployment**  
**Estimated Time:** 1-2 hours  
**Recommended:** Vercel + Railway

---

## ✅ Pre-Deployment (15 minutes)

### 1. Code Ready
- [ ] All code committed to Git
- [ ] No errors when running locally (`npm run dev` works)
- [ ] Environment variables documented
- [ ] Database schema finalized

### 2. Accounts Created
- [ ] GitHub account
- [ ] Vercel account (sign up with GitHub)
- [ ] Railway account (sign up with GitHub)

### 3. Code on GitHub
```bash
cd bharti-clinic
git init
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/YOUR_USERNAME/bharti-clinic.git
git push -u origin main
```

---

## 🗄️ Database Deployment (15 minutes)

### Railway PostgreSQL

1. **Create Database**
   - [ ] Go to [railway.app](https://railway.app)
   - [ ] Click "New Project" → "Provision PostgreSQL"
   - [ ] Wait 30 seconds for creation

2. **Get Database URL**
   - [ ] Click on PostgreSQL service
   - [ ] Go to "Variables" tab
   - [ ] Copy `DATABASE_URL`
   - [ ] Save it somewhere safe!

3. **Run Migrations**
   ```bash
   cd backend
   export DATABASE_URL="paste-your-railway-url-here"
   npx prisma migrate deploy
   npx prisma db seed
   ```

---

## 🔧 Backend Deployment (20 minutes)

### Railway Backend

1. **Create Service**
   - [ ] In Railway, click "New" → "GitHub Repo"
   - [ ] Select `bharti-clinic` repository
   - [ ] Railway auto-detects Node.js

2. **Configure Service**
   - [ ] Click service → "Settings"
   - [ ] Root Directory: `backend`
   - [ ] Build Command: `npm install && npm run build`
   - [ ] Start Command: `npm start`

3. **Add Environment Variables**
   - [ ] Go to "Variables" tab
   - [ ] Add these variables:
   
   ```env
   NODE_ENV=production
   PORT=5000
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   JWT_SECRET=change-this-to-random-32-char-string
   FRONTEND_URL=https://will-update-after-frontend-deploy
   ```

4. **Deploy**
   - [ ] Click "Deploy"
   - [ ] Wait 2-3 minutes
   - [ ] Copy your backend URL (e.g., `https://bharti-clinic-backend.up.railway.app`)
   - [ ] Test it: Visit `YOUR_BACKEND_URL/health`
   - [ ] Should see: `{"status":"ok"}`

---

## 🎨 Frontend Deployment (20 minutes)

### Vercel Frontend

1. **Create Project**
   - [ ] Go to [vercel.com](https://vercel.com)
   - [ ] Click "Add New Project"
   - [ ] Select `bharti-clinic` repository

2. **Configure Project**
   - [ ] Framework Preset: Vite
   - [ ] Root Directory: `frontend`
   - [ ] Build Command: `npm run build`
   - [ ] Output Directory: `dist`

3. **Add Environment Variable**
   - [ ] Click "Environment Variables"
   - [ ] Add:
   
   ```env
   VITE_API_URL=https://your-railway-backend-url.up.railway.app
   ```
   
   - [ ] Replace with YOUR actual Railway backend URL!

4. **Deploy**
   - [ ] Click "Deploy"
   - [ ] Wait 2-3 minutes
   - [ ] Copy your frontend URL (e.g., `https://bharti-clinic.vercel.app`)
   - [ ] Visit it - your site is live! 🎉

---

## 🔄 Final Configuration (10 minutes)

### Update Backend with Frontend URL

1. **Update Railway**
   - [ ] Go back to Railway
   - [ ] Open backend service
   - [ ] Go to "Variables"
   - [ ] Update `FRONTEND_URL` to your Vercel URL
   - [ ] Service auto-redeploys (wait 1 minute)

2. **Test CORS**
   - [ ] Visit your frontend
   - [ ] Try logging into admin
   - [ ] Should work without CORS errors

---

## 🧪 Testing (15 minutes)

### Frontend Tests
- [ ] Homepage loads
- [ ] Images display
- [ ] Navigation works
- [ ] No console errors (F12 → Console)

### Backend Tests
```bash
# Test health
curl https://your-backend-url.up.railway.app/health

# Test products API
curl https://your-backend-url.up.railway.app/api/products
```

### Admin Tests
- [ ] Go to `/admin/login`
- [ ] Login with: `dr.ipinder@bhartiveda.com` / `password123`
- [ ] Dashboard loads
- [ ] Can view products
- [ ] Can view orders

### User Flow Tests
- [ ] Browse products
- [ ] Add to cart
- [ ] View cart
- [ ] Go to checkout
- [ ] Fill form
- [ ] Submit order
- [ ] Check admin panel for order

---

## 🎯 Post-Deployment (10 minutes)

### Security
- [ ] Change admin password (in admin settings)
- [ ] Update JWT_SECRET to strong random string
- [ ] Verify HTTPS is working (should be automatic)

### Monitoring
- [ ] Bookmark your URLs
- [ ] Set up Vercel notifications
- [ ] Set up Railway notifications

### Documentation
- [ ] Save all URLs in a document
- [ ] Save all environment variables
- [ ] Document admin credentials (securely!)

---

## 📝 Your Deployment Info

Fill this out as you deploy:

```
=== DEPLOYMENT INFO ===

Frontend URL: https://_________________.vercel.app
Backend URL: https://_________________.up.railway.app
Database: Railway PostgreSQL

Admin Login:
Email: dr.ipinder@bhartiveda.com
Password: [CHANGE THIS AFTER FIRST LOGIN]

Environment Variables:
- JWT_SECRET: [SAVED SECURELY]
- DATABASE_URL: [IN RAILWAY]

Deployment Date: _______________
Deployed By: _______________

=== COSTS ===
Vercel: $0/month (free tier)
Railway: ~$5/month (backend + database)
Total: ~$5/month
```

---

## 🐛 Troubleshooting

### Frontend won't load
```bash
# Check Vercel logs
# Go to: Vercel Dashboard → Your Project → Deployments → Latest → Logs

# Common issues:
1. Build failed → Check build command
2. Environment variable missing → Add VITE_API_URL
3. Wrong root directory → Should be "frontend"
```

### Backend returns 500 error
```bash
# Check Railway logs
# Go to: Railway Dashboard → Your Service → Deployments → Latest → Logs

# Common issues:
1. Database connection failed → Check DATABASE_URL
2. Missing environment variable → Add all required vars
3. Build failed → Check build command
```

### CORS errors
```bash
# Check backend CORS configuration
# Make sure FRONTEND_URL matches your Vercel URL exactly

# In backend/src/index.ts:
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
```

### Can't login to admin
```bash
# Check if admin user exists in database
# Run this in Railway PostgreSQL:
SELECT * FROM "Admin" WHERE email = 'dr.ipinder@bhartiveda.com';

# If no results, run seed again:
npx prisma db seed
```

---

## 🎉 Success Criteria

Your deployment is successful when:

✅ Frontend loads at your Vercel URL  
✅ Backend responds at your Railway URL  
✅ Admin login works  
✅ Products display on homepage  
✅ Cart functionality works  
✅ Orders can be created  
✅ Admin can manage products  
✅ No console errors  
✅ HTTPS is working  

---

## 📞 Need Help?

### Quick Fixes
1. **Redeploy:** Sometimes just redeploying fixes issues
   - Vercel: Deployments → Latest → "Redeploy"
   - Railway: Deployments → Latest → "Redeploy"

2. **Check Logs:** Always check logs first
   - Vercel: Project → Deployments → Logs
   - Railway: Service → Deployments → Logs

3. **Environment Variables:** Most issues are env vars
   - Double-check all variables are set
   - No typos in variable names
   - Values are correct

### Get Support
- Vercel Discord: [vercel.com/discord](https://vercel.com/discord)
- Railway Discord: [discord.gg/railway](https://discord.gg/railway)
- Stack Overflow: Tag with `vercel` or `railway`

---

## 🚀 Next Steps

After successful deployment:

### Week 1
- [ ] Monitor for errors
- [ ] Test all features thoroughly
- [ ] Fix any bugs
- [ ] Update admin password

### Week 2
- [ ] Add custom domain
- [ ] Set up analytics
- [ ] Optimize performance
- [ ] Add monitoring

### Week 3
- [ ] SEO optimization
- [ ] Add missing features
- [ ] User testing
- [ ] Marketing prep

---

## 💰 Cost Summary

### Monthly Costs
- **Vercel (Frontend):** $0 (free tier)
- **Railway (Backend + DB):** ~$5
- **Total:** ~$5/month

### Optional Upgrades
- Custom domain: $10-15/year
- Cloudinary (images): $0-25/month
- Email service: $0-10/month
- Monitoring: $0-20/month

---

## ✅ Deployment Complete!

Congratulations! Your Bharti Clinic application is now live on the internet! 🎊

**What you've achieved:**
- ✅ Full-stack app deployed
- ✅ Database in the cloud
- ✅ Automatic deployments set up
- ✅ HTTPS enabled
- ✅ Professional hosting

**You're officially a deployed developer!** 🚀

---

*Checklist Version: 1.0*  
*Last Updated: February 28, 2026*  
*Estimated Total Time: 1-2 hours*
