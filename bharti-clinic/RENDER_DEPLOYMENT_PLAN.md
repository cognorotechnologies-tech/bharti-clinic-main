# Render Deployment Plan: Frontend & Backend

> 🤖 **Applying knowledge of `@[devopsengineer]` & `@[project-planner]`...**

## 🎯 Executive Summary
Yes, it is entirely possible and highly recommended to host both the frontend (React/Vite) and backend (Node.js/Express) of the Bharti Clinic application on Render. Since your codebase is structured as a monorepo (both `frontend` and `backend` folders in the same repository), Render can easily handle this by creating separate services pointing to the same repository but different root directories.

## 🏗️ Architecture on Render
To deploy the full application, we will set up three distinct components on Render:
1. **Render PostgreSQL**: Managed database for your data.
2. **Render Web Service (Backend)**: Hosts your Node.js/Express API.
3. **Render Static Site (Frontend)**: Hosts your Vite-built React application (free of charge).

---

## 📋 Step-by-Step Deployment Instructions

### Phase 1: Setup Render PostgreSQL Database
1. Log in to your [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** and select **PostgreSQL**.
3. Name it (e.g., `bharti-clinic-db`), select a region closest to your target audience, and choose your preferred tier.
4. Click **Create Database**.
5. Once created, copy the **Internal Database URL** (you will use this in Phase 2).

### Phase 2: Deploy the Backend (Web Service)
Because your backend is in a subfolder, we will configure Render to only build and run from the `backend/` directory.

1. On the Render Dashboard, click **New +** and select **Web Service**.
2. Connect your GitHub/GitLab repository containing the `bharti-clinic` code.
3. Configure the service settings:
   - **Name**: `bharti-clinic-backend`
   - **Environment**: `Node`
   - **Root Directory**: `backend` *(This is crucial!)*
   - **Build Command**: `npm install --include=dev && npx prisma generate && npm run build`
   - **Start Command**: `npm start` (or `node dist/index.js`)
4. Scroll down to **Environment Variables** and add:
   - `DATABASE_URL`: *(Paste the Internal Database URL from Phase 1)*
   - `JWT_SECRET`: *(Generate a secure random string for authentication)*
   - `NODE_ENV`: `production`
   - `CLIENT_ORIGIN`: *(Paste your Frontend URL from Phase 3)*
5. Click **Create Web Service**. Wait for the build to pass and copy the generated **Backend API URL** (e.g., `https://bharti-clinic-backend.onrender.com`).

### Phase 3: Deploy the Frontend (Static Site)
Render offers fast, free hosting for static sites like React applications built with Vite.

1. On the Render Dashboard, click **New +** and select **Static Site**.
2. Connect the **same** GitHub repository you used for the backend.
3. Configure the site settings:
   - **Name**: `bharti-clinic-frontend`
   - **Root Directory**: `frontend` *(This is crucial!)*
   - **Build Command**: `npm install --legacy-peer-deps && npm run build`
   - **Publish Directory**: `frontend/dist` *(Usually `dist` for Vite, but verify since we set the root directory to `frontend`, it should just be `dist`)*
4. Scroll down to **Environment Variables** and add:
   - `VITE_API_BASE_URL`: *(Paste the Backend API URL from Phase 2)*
5. Click **Create Static Site**.
6. Once deployed, Render will give you a **Frontend URL** (e.g., `https://bharti-clinic-frontend.onrender.com`).

### Phase 4: Final Connection (CORS Setup)
To allow your frontend to communicate with your backend without CORS errors, you need to update the backend's allowed origins.

1. Go back to your **Backend Web Service** on Render.
2. Navigate to the **Environment** tab.
3. Update or add the `CLIENT_ORIGIN` environment variable and set it to your new Frontend URL (from Phase 3).
4. Save the changes. Render will automatically redeploy the backend with the new configuration.

---

## 🔐 Pre-Flight Checklist

- [ ] **Code Check**: Ensure your backend `cors` configuration reads from `process.env.FRONTEND_URL` (or `process.env.CORS_ORIGIN`).
- [ ] **Code Check**: Ensure your frontend Axios/Fetch calls read the base URL from `import.meta.env.VITE_API_BASE_URL`.
- [ ] **Database Seed**: You will need to run your initial database seed. You can do this by navigating to your Backend Web Service -> **Shell** -> and running `npm run seed` (or `node dist/scripts/seed.js` depending on your setup).
- [ ] **Routing (Frontend)**: For React Router (SPA) on Render Static Sites, navigate to the **Redirects/Rewrites** tab on the Frontend service and add a rule:
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - **Action**: `Rewrite`
   *(This ensures direct URL navigation works correctly without returning 404s).*
