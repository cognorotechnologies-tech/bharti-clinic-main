import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { exec } from 'child_process';
import prisma from './lib/prisma';
import therapiesRoutes from './routes/therapies';
import appointmentsRoutes from './routes/appointments';
import packagesRoutes from './routes/packages';
import productsRoutes from './routes/products';
import reviewRoutes from './routes/review.routes';
import ordersRoutes from './routes/orders';
import galleryRoutes from './routes/gallery';
import contactRoutes from './routes/contact';
import authRoutes from './routes/auth';
import adminRoutes from './routes/admin.routes';
import reviewsRoutes from './routes/reviews.routes';
import blogRoutes from './routes/blog';
import settingsRoutes from './routes/settings';
import categoriesRoutes from './routes/categories';
import notificationsRoutes from './routes/notifications.routes';
import { sendError } from './lib/http';

const app = express();
const port = process.env.PORT || 5000;
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

// Export app for testing
export { app };

// Core security & parsing middleware
app.use(helmet());
app.use(
    cors({
        origin: clientOrigin,
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Static file serving for uploads
const uploadsPath = path.join(__dirname, '..', 'uploads');
app.use('/uploads', express.static(uploadsPath));

// Rate limiting - More lenient for development
const publicLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.NODE_ENV === 'production' ? 100 : 1000, // 1000 requests in dev
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again later.',
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.NODE_ENV === 'production' ? 10 : 10000, // 10000 attempts in dev
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many login attempts, please try again later.',
});

app.use('/api', publicLimiter);
app.use('/api/admin/login', authLimiter);
app.use('/api/admin/refresh', authLimiter);

// Health & maintenance
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Bharti Clinic API is running' });
});

if (process.env.NODE_ENV !== 'production') {
    app.get('/api/debug/routes', (req, res) => {
        const routes: any[] = [];
        app._router.stack.forEach((middleware: any) => {
            if (middleware.route) {
                routes.push({
                    path: middleware.route.path,
                    methods: Object.keys(middleware.route.methods)
                });
            } else if (middleware.name === 'router') {
                middleware.handle.stack.forEach((handler: any) => {
                    if (handler.route) {
                        const path = middleware.regexp.source.replace('\\/?', '').replace('(?=\\/|$)', '');
                        routes.push({
                            path: path + handler.route.path,
                            methods: Object.keys(handler.route.methods)
                        });
                    }
                });
            }
        });
        res.json({ routes });
    });

    app.get('/api/seed', (req, res) => {
        exec('npx prisma db seed', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return res.status(500).json({ error: 'Seeding failed', details: stderr });
            }
            res.json({ message: 'Seeding successful', output: stdout });
        });
    });
}

// API routes
app.use('/api/admin', adminRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/therapies', therapiesRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/packages', packagesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/admin/reviews', reviewRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin/notifications', notificationsRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
    return sendError(res, 404, 'Not found');
});

// Error handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    const status = err.status || 500;
    return sendError(res, status, err.message || 'Internal server error');
});

// Start server after ensuring Prisma can connect
async function startServer() {
    try {
        await prisma.$connect();
        console.log('✅ Database connected successfully');

        const server = app.listen(port, () => {
            console.log(`✅ Server running on port ${port}`);
            console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
        });

        // Keep the process alive
        process.on('SIGTERM', () => {
            console.log('SIGTERM received, closing server...');
            server.close(() => {
                prisma.$disconnect();
                process.exit(0);
            });
        });

        process.on('SIGINT', () => {
            console.log('SIGINT received, closing server...');
            server.close(() => {
                prisma.$disconnect();
                process.exit(0);
            });
        });

        // Keep a reference to prevent garbage collection
        return new Promise(() => {
            // This promise never resolves, keeping the process alive
            // The server will continue running until SIGTERM/SIGINT
        });
    } catch (error) {
        console.error('❌ Failed to start server', error);
        process.exit(1);
    }
}

// Start the server
// Force nodemon restart - timestamp: 2026-02-28
startServer().catch((error) => {
    console.error('❌ Unhandled error:', error);
    process.exit(1);
});
