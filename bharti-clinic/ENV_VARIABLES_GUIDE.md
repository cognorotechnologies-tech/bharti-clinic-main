# 🔐 Environment Variables Guide

**Complete guide to all environment variables needed for deployment**

---

## 📋 What Are Environment Variables?

Environment variables are configuration values that change between environments (development, staging, production).

**Why use them?**
- Keep secrets safe (don't commit to Git)
- Different values for dev/production
- Easy to change without code changes

---

## 🗂️ File Structure

```
bharti-clinic/
├── backend/
│   ├── .env                    ← Local development (Git ignored)
│   ├── .env.example            ← Template (committed to Git)
│   └── .env.production         ← Production values (Git ignored)
└── frontend/
    ├── .env                    ← Local development (Git ignored)
    ├── .env.example            ← Template (committed to Git)
    └── .env.production         ← Production values (Git ignored)
```

---

## 🔧 Backend Environment Variables

### `.env.example` (Template)

```env
# =================================
# SERVER CONFIGURATION
# =================================
NODE_ENV=development
PORT=5000

# =================================
# DATABASE
# =================================
# PostgreSQL connection string
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
DATABASE_URL=postgresql://postgres:password@localhost:5432/bharti_clinic

# =================================
# AUTHENTICATION
# =================================
# JWT secret key (min 32 characters)
# Generate: openssl rand -base64 32
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# =================================
# CORS
# =================================
# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173

# =================================
# FILE UPLOAD (Optional)
# =================================
# Cloudinary for image hosting
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Or use local storage
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880

# =================================
# EMAIL (Optional)
# =================================
# SMTP configuration for sending emails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@bharticlinic.com

# =================================
# PAYMENT (Optional - Future)
# =================================
# Razorpay for payments
RAZORPAY_KEY_ID=your-key-id
RAZORPAY_KEY_SECRET=your-key-secret

# =================================
# LOGGING
# =================================
LOG_LEVEL=info
```

---

### `.env` (Local Development)

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://postgres:password@localhost:5432/bharti_clinic
JWT_SECRET=dev-secret-key-not-for-production
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

---

### `.env.production` (Production - Railway)

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET=GENERATE_STRONG_32_CHAR_RANDOM_STRING
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://bharti-clinic.vercel.app
```

**How to generate JWT_SECRET:**
```bash
# Option 1: OpenSSL
openssl rand -base64 32

# Option 2: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Option 3: Online
# Visit: https://generate-secret.vercel.app/32
```

---

## 🎨 Frontend Environment Variables

### `.env.example` (Template)

```env
# =================================
# API CONFIGURATION
# =================================
# Backend API URL
VITE_API_URL=http://localhost:5000

# =================================
# ANALYTICS (Optional)
# =================================
# Google Analytics
VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X

# Google Tag Manager
VITE_GTM_ID=GTM-XXXXXXX

# =================================
# FEATURES FLAGS (Optional)
# =================================
# Enable/disable features
VITE_ENABLE_BLOG=true
VITE_ENABLE_CART=true
VITE_ENABLE_BOOKING=true

# =================================
# THIRD-PARTY SERVICES (Optional)
# =================================
# Cloudinary for image display
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name

# Google Maps
VITE_GOOGLE_MAPS_API_KEY=your-maps-api-key

# Facebook Pixel
VITE_FACEBOOK_PIXEL_ID=your-pixel-id
```

---

### `.env` (Local Development)

```env
VITE_API_URL=http://localhost:5000
```

---

### `.env.production` (Production - Vercel)

```env
VITE_API_URL=https://bharti-clinic-backend.up.railway.app
```

---

## 🚀 Setting Environment Variables in Deployment

### Railway (Backend)

1. Go to your Railway project
2. Click on your backend service
3. Go to "Variables" tab
4. Click "New Variable"
5. Add each variable:

```
NODE_ENV = production
PORT = 5000
DATABASE_URL = ${{Postgres.DATABASE_URL}}
JWT_SECRET = [paste your generated secret]
FRONTEND_URL = https://bharti-clinic.vercel.app
```

**Special Railway Variables:**
- `${{Postgres.DATABASE_URL}}` - Auto-links to your PostgreSQL database
- `${{RAILWAY_STATIC_URL}}` - Your service's URL

---

### Vercel (Frontend)

1. Go to your Vercel project
2. Click "Settings"
3. Click "Environment Variables"
4. Add each variable:

```
VITE_API_URL = https://bharti-clinic-backend.up.railway.app
```

**Important:** 
- Vercel requires `VITE_` prefix for Vite apps
- Variables are available at build time
- Redeploy after adding variables

---

### Netlify (Alternative Frontend)

1. Go to your Netlify site
2. Click "Site settings"
3. Click "Environment variables"
4. Click "Add a variable"
5. Add each variable

---

### Render (Alternative Backend)

1. Go to your Render service
2. Click "Environment"
3. Click "Add Environment Variable"
4. Add each variable

---

## 🔒 Security Best Practices

### DO ✅

1. **Use Strong Secrets**
   ```bash
   # Good JWT_SECRET (32+ characters, random)
   JWT_SECRET=8f7d6e5c4b3a2918f7d6e5c4b3a2918f
   
   # Bad JWT_SECRET
   JWT_SECRET=secret123
   ```

2. **Different Secrets Per Environment**
   ```bash
   # Development
   JWT_SECRET=dev-secret-key
   
   # Production
   JWT_SECRET=prod-8f7d6e5c4b3a2918f7d6e5c4b3a29
   ```

3. **Use .env.example**
   ```bash
   # Commit this to Git (no real values)
   JWT_SECRET=your-secret-here
   DATABASE_URL=postgresql://user:pass@host:5432/db
   ```

4. **Add to .gitignore**
   ```bash
   # .gitignore
   .env
   .env.local
   .env.production
   .env.*.local
   ```

---

### DON'T ❌

1. **Don't Commit Real Secrets**
   ```bash
   # ❌ NEVER do this
   git add .env
   git commit -m "Added env file"
   ```

2. **Don't Use Weak Secrets**
   ```bash
   # ❌ Too weak
   JWT_SECRET=secret
   JWT_SECRET=123456
   JWT_SECRET=password
   ```

3. **Don't Hardcode in Code**
   ```typescript
   // ❌ NEVER do this
   const JWT_SECRET = "my-secret-key";
   
   // ✅ Do this instead
   const JWT_SECRET = process.env.JWT_SECRET;
   ```

4. **Don't Share Secrets**
   - Don't post in Discord/Slack
   - Don't email secrets
   - Don't commit to GitHub
   - Use secure password managers

---

## 🧪 Testing Environment Variables

### Backend Test

```bash
# In backend folder
cd backend

# Check if variables are loaded
node -e "require('dotenv').config(); console.log(process.env.DATABASE_URL)"

# Should print your DATABASE_URL
```

### Frontend Test

```bash
# In frontend folder
cd frontend

# Check if variables are loaded
npm run dev

# In browser console:
console.log(import.meta.env.VITE_API_URL)

# Should print your API URL
```

---

## 🔄 Updating Environment Variables

### Local Development

1. Edit `.env` file
2. Restart your dev server
3. Changes take effect immediately

### Railway

1. Go to Variables tab
2. Edit the variable
3. Service auto-redeploys (1-2 minutes)

### Vercel

1. Go to Environment Variables
2. Edit the variable
3. Click "Save"
4. Redeploy your site (Deployments → Redeploy)

---

## 📝 Environment Variable Checklist

### Before Deployment

- [ ] All `.env.example` files created
- [ ] All `.env` files in `.gitignore`
- [ ] Strong JWT_SECRET generated
- [ ] Database URL ready
- [ ] Frontend URL known
- [ ] Backend URL known

### During Deployment

- [ ] Railway variables set
- [ ] Vercel variables set
- [ ] Database URL linked
- [ ] CORS URLs match
- [ ] All required variables present

### After Deployment

- [ ] Test all features work
- [ ] No "undefined" errors
- [ ] API calls succeed
- [ ] Admin login works
- [ ] Images load correctly

---

## 🆘 Troubleshooting

### "Cannot read property of undefined"

**Cause:** Environment variable not set

**Solution:**
```bash
# Check if variable exists
console.log(process.env.VARIABLE_NAME)

# If undefined, add it to your deployment platform
```

---

### "CORS Error"

**Cause:** FRONTEND_URL doesn't match

**Solution:**
```bash
# Backend FRONTEND_URL must match frontend URL exactly
FRONTEND_URL=https://bharti-clinic.vercel.app

# No trailing slash!
# ❌ https://bharti-clinic.vercel.app/
# ✅ https://bharti-clinic.vercel.app
```

---

### "Database Connection Failed"

**Cause:** DATABASE_URL incorrect

**Solution:**
```bash
# Check format:
postgresql://USER:PASSWORD@HOST:PORT/DATABASE

# Railway format:
postgresql://postgres:password@containers-us-west-123.railway.app:5432/railway

# Test connection:
npx prisma db pull
```

---

### "JWT Malformed"

**Cause:** JWT_SECRET changed or missing

**Solution:**
```bash
# Make sure JWT_SECRET is set
# Make sure it's the same secret used to create tokens
# If changed, users need to login again
```

---

## 📚 Additional Resources

### Tools
- [Generate Secret](https://generate-secret.vercel.app/32) - Generate random secrets
- [.env Validator](https://www.npmjs.com/package/envalid) - Validate env vars
- [dotenv](https://www.npmjs.com/package/dotenv) - Load env vars

### Documentation
- [Vite Env Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Railway Variables](https://docs.railway.app/develop/variables)
- [Vercel Env Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## ✅ Summary

**Key Points:**
1. Never commit real secrets to Git
2. Use different secrets for dev/production
3. Always use `.env.example` as template
4. Test variables before deploying
5. Use strong, random secrets

**Required Variables:**
- Backend: `DATABASE_URL`, `JWT_SECRET`, `FRONTEND_URL`
- Frontend: `VITE_API_URL`

**Optional Variables:**
- Email, payments, analytics, file storage

---

*Guide Version: 1.0*  
*Last Updated: February 28, 2026*  
*Security Level: Production-Ready*
