# Bharti Clinic Wellness Platform

Full-stack Ayurvedic wellness platform with e-commerce, therapy booking, and an admin portal.

## Tech Stack
- Frontend: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, TypeScript, Prisma ORM
- Database: PostgreSQL

## Setup Instructions
1. Install dependencies in root: `npm install`
2. Install dependencies in frontend: `cd frontend && npm install`
3. Install dependencies in backend: `cd backend && npm install`
4. Set up `.env` files based on `.env.example` in both folders.
5. In `backend`: run `npx prisma db push` (or `npx prisma migrate dev`) to setup DB.
6. From project root, run `npm run dev` to start both frontend and backend concurrently.
