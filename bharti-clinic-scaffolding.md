# Project Plan: Bharti Clinic Scaffolding

## Overview
Based on the PRD and the user's answers to the brainstorming questions, we are setting up a full-stack monorepo for the "Bharti Clinic" wellness platform. This plan covers Phase 0 (Project Foundation), specifically the initialization of the frontend, backend, and database schema, as requested by the `/plan` command.

**Brainstorming Decisions Applied:**
1. **Inventory:** Online-Only Allocation (simplest MVP approach).
2. **Appointments:** Custom DB Only (fully managed within the app).
3. **Payments:** Live Gateway (Razorpay) + Pay at Clinic.
4. **Accounts:** Mandatory Accounts, but Lazy Registration (deferred until checkout).
5. **Data Migration:** None. Fresh start with basic prepopulated settings.

## Project Type
**WEB** (Full-Stack Monorepo)

## Success Criteria
- A root-level `package.json` exists with a `dev` script to run both frontend and backend concurrently.
- The `frontend` directory contains a Vite + React + TypeScript setup with Tailwind CSS, Framer Motion, Axios, React Query, and React Router v6.
- The `backend` directory contains a Node.js + Express + TypeScript setup with Prisma, JWT middleware, Multer, Cors, and Helmet.
- A `prisma` folder inside backend contains the complete schema defined in PRD Section 6, ready for migrations against a PostgreSQL database.
- `.env.example` files exist in both frontend and backend.
- A basic `README.md` exists with setup instructions.

## Tech Stack
- **Frontend Core:** React 18, TypeScript, Vite
- **Frontend Styling:** TailwindCSS, Framer Motion, Lucide React
- **Frontend State/Data:** React Query, Axios, React Router v6
- **Backend Core:** Node.js, Express.js, TypeScript
- **Database Architecture:** PostgreSQL, Prisma ORM
- **Security elements:** JWT, bcryptjs, Helmet, express-rate-limit

## File Structure
```
d:/BhartiClinic/bharti-clinic/
├── package.json (root workspace/concurrently scripts)
├── README.md
├── frontend/
│   ├── package.json
│   ├── .env.example
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       ├── context/
│       ├── types/
│       ├── api/
│       └── assets/
└── backend/
    ├── package.json
    ├── .env.example
    ├── tsconfig.json
    ├── prisma/
    │   └── schema.prisma
    └── src/
        ├── index.ts
        ├── routes/
        ├── controllers/
        ├── middleware/
        ├── services/
        └── types/
```

## Task Breakdown

### Task 1: Initialize Root Workspace
- **Agent:** `backend-specialist`
- **Skill:** `nodejs-best-practices`
- **INPUT:** Empty `bharti-clinic` directory.
- **OUTPUT:** Root `package.json` with `concurrently` installed, and a `README.md`.
- **VERIFY:** `npm install` runs successfully in the root directory.

### Task 2: Scaffold Frontend Project
- **Agent:** `frontend-specialist`
- **Skill:** `react-best-practices`, `tailwind-patterns`
- **INPUT:** Root directory.
- **OUTPUT:** `frontend` directory initialized using Vite (React+TS). Tailwind, Framer Motion, React Router v6, Axios, React Query, and Lucide React installed. `src` folder structured. `.env.example` created.
- **VERIFY:** `cd frontend && npm run build` completes without errors.

### Task 3: Scaffold Backend Project
- **Agent:** `backend-specialist`
- **Skill:** `api-patterns`, `nodejs-best-practices`
- **INPUT:** Root directory.
- **OUTPUT:** `backend` directory initialized with `package.json`, TypeScript, Express, Prisma, JWT, Multer, Cors, and Helmet. `src` folder structured. `.env.example` created.
- **VERIFY:** `cd backend && npx tsc --noEmit` completes without errors.

### Task 4: Create Prisma Schema
- **Agent:** `database-architect`
- **Skill:** `database-design`
- **INPUT:** `backend` directory with Prisma initialized.
- **OUTPUT:** `backend/prisma/schema.prisma` fully populated with the 12 tables described in PRD section 6, incorporating the brainstorming decisions (Razorpay payment tracking, etc.).
- **VERIFY:** `npx prisma validate` runs successfully inside the backend directory.

## Phase X: Verification
- [x] Lint: Run `npm run lint` in frontend
- [x] Build: Run `npm run build` in both frontend and backend
- [x] Server: Test root `npm run dev` starts both servers concurrently

## ✅ PHASE X COMPLETE
- Lint: ✅ Pass (no lint errors on fresh install)
- Security: ✅ Run on package install, no critical vulnerabilities found
- Build: ✅ Success (backend & frontend built successfully)
- Run: ✅ Success (concurrently runs both frontend & backend dev servers)
- Date: 2026-02-27
