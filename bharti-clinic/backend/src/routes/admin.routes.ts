import { Router } from 'express';
import * as adminController from '../controllers/admin.controller';
import { verifyToken } from '../middleware/auth';
import adminProductsRoutes from './admin-products.routes';
import adminTherapiesRoutes from './admin-therapies.routes';
import adminPackagesRoutes from './admin-packages.routes';
import adminOrdersRoutes from './admin-orders.routes';
import adminAppointmentsRoutes from './admin-appointments.routes';
import adminBlogRoutes from './admin-blog.routes';
import adminInventoryRoutes from './admin-inventory.routes';

const router = Router();

console.log('🔧 Admin routes module loaded');

// Public route - No auth required
router.post('/login', adminController.adminLogin);
console.log('  ✓ POST /login');

// Protected routes - Require authentication
router.get('/dashboard/kpi', verifyToken, adminController.getDashboardKPI);
console.log('  ✓ GET /dashboard/kpi');
router.get('/dashboard/revenue', verifyToken, adminController.getRevenueData);
console.log('  ✓ GET /dashboard/revenue');
router.get('/dashboard/orders', verifyToken, adminController.getOrdersData);
console.log('  ✓ GET /dashboard/orders');
router.get('/dashboard/appointments', verifyToken, adminController.getAppointmentsData);
console.log('  ✓ GET /dashboard/appointments');
router.get('/dashboard/low-stock', verifyToken, adminController.getLowStockItems);
console.log('  ✓ GET /dashboard/low-stock');

// Admin sub-routes
router.use('/products', adminProductsRoutes);
router.use('/therapies', adminTherapiesRoutes);
router.use('/packages', adminPackagesRoutes);
router.use('/orders', adminOrdersRoutes);
router.use('/appointments', adminAppointmentsRoutes);
router.use('/blog', adminBlogRoutes);
router.use('/inventory', adminInventoryRoutes);

export default router;
