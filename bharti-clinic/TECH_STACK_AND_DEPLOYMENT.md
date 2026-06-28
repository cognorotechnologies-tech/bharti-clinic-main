# Bharti Clinic - Tech Stack & Deployment Guide

This document outlines the complete technology stack used in the Bharti Clinic web application (frontend and backend) and provides a comprehensive guide for deploying the application to both Staging and Production environments.

---

## 🛠️ Technology Stack

### Frontend (User Interface)
The frontend is a modern Single Page Application (SPA) built for high performance and smooth user experience.

- **Core Framework**: React 19 with TypeScript
- **Build Tool**: Vite (for fast HMR and optimized builds)
- **Styling**: Tailwind CSS v4 (Utility-first CSS framework)
- **Routing**: React Router DOM (v7)
- **State Management / Data Fetching**: TanStack React Query & Axios
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Testing Requirements**: Vitest, React Testing Library
- **UI Components**: Radix UI primitives (Class Variance Authority, tailwind-merge)

### Backend (RESTful API)
The backend is a robust REST API designed to handle database relationships, authentication, and platform logic.

- **Runtime**: Node.js
- **Web Framework**: Express.js
- **Language**: TypeScript
- **Database ORM**: Prisma (v6)
- **Database**: PostgreSQL (Relational Database)
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs for password hashing
- **Security & Middleware**: Cors, Helmet, Morgan (Logging), Express Rate Limit
- **File Uploads**: Multer
- **Validation**: Zod (Schema validation)
- **Testing Requirements**: Jest, Supertest

---

## 🚀 Deployment Requirements & Environments

### 1. Staging Environment (For Testing & QA)
The staging environment mimics the production environment but is meant for internal testing, QA validation, and user acceptance testing (UAT) before going live.

#### **Requirements for Staging:**
*   **Server**: A lightweight cloud VPS (Virtual Private Server) (e.g., AWS EC2 t3.micro, DigitalOcean Droplet, or platforms like Vercel/Render).
*   **Database**: A dedicated staging PostgreSQL database (can be hosted on Supabase, Neon, or AWS RDS).
*   **Process Manager**: PM2 (for keeping the backend Node server alive).
*   **Environment Variables (`.env`)**:
    *   `DATABASE_URL`: Pointing to the *staging* PostgreSQL instance.
    *   `JWT_SECRET`: A secure testing secret.
    *   `NODE_ENV=staging`
    *   API Endpoint configurations pointing to test URLs.

#### **Deployment Steps (Staging):**
1.  **Frontend**: Build the Vite application (`npm run build`) and deploy the static `dist/` folder to a hosting provider like Vercel, Netlify, or serve it via Nginx on the VPS.
2.  **Backend**:
    *   Clone the repository to the staging VPS.
    *   Install dependencies: `npm install`
    *   Run Prisma migrations to setup the staging database: `npx prisma migrate deploy`
    *   Compile TypeScript: `npm run build`
    *   Start the server with PM2: `pm2 start dist/index.js --name "bharti-backend-staging"`

---

### 2. Production Environment (Live for Users)
The production environment requires high availability, security, performance optimization, and SSL encryption.

#### **Requirements for Production:**
*   **Compute/Server**: A robust VPS or containerized cloud infrastructure (e.g., AWS EC2, DigitalOcean, Heroku, or GCP).
*   **Managed Database**: A highly available managed PostgreSQL instance with automated backups (AWS RDS, DigitalOcean Managed Databases, or Supabase).
*   **Reverse Proxy / Web Server**: Nginx or Apache (to forward traffic to the Node.js backend and serve the frontend efficiently).
*   **SSL Certificate**: Let's Encrypt (Certbot) for HTTPS security.
*   **Process Manager / Orchestration**: PM2 for standard deployments or Docker/Kubernetes for containerized scaling.
*   **CI/CD Pipeline**: GitHub Actions or GitLab CI to automate testing, building, and deployment whenever code is merged to the `main` branch.

#### **Deployment Steps (Production):**
1.  **Environment Setup**:
    *   Configure production `.env` files strictly securely. Do not commit these to source control.
    *   Ensure `NODE_ENV=production`.
2.  **Database Migration**:
    *   Run `npx prisma migrate deploy` strictly on the production database.
3.  **Backend Deployment**:
    *   Build the backend application locally or via CI/CD.
    *   Transfer build artifacts to the production server.
    *   Run using PM2: `pm2 start dist/index.js --name "bharti-backend-prod" --env production`
    *   Configure Nginx as a reverse proxy to route `/api` traffic to the local Node.js process (e.g., `http://localhost:5000`).
4.  **Frontend Deployment**:
    *   Generate production build (`npm run build`).
    *   Serve the generated static files via Nginx or leverage a CDN (Content Delivery Network) like Vercel or AWS CloudFront for global fast delivery.
5.  **Security & SSL**:
    *   Run `certbot --nginx` to install and auto-renew SSL certificates.
    *   Ensure CORS is strictly configured in the backend to only allow the production frontend URL.
