import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ScrollToTop } from './components/ScrollToTop';
import { Layout } from './components/layout/Layout';
import { AdminLayout } from './components/admin/AdminLayout';
import { CartDrawer } from './components/shop/CartDrawer';
import { Home } from './pages/Home';
import { TherapiesPage } from './pages/TherapiesPage';
import { TherapyDetailPage } from './pages/TherapyDetailPage';
import { PackagesPage } from './pages/PackagesPage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmedPage } from './pages/OrderConfirmedPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminInventoryPage } from './pages/admin/AdminInventoryPage';
import { AdminTherapiesPage } from './pages/admin/AdminTherapiesPage';
import { AdminPackagesPage } from './pages/admin/AdminPackagesPage';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage';
import { AdminAppointmentsPage } from './pages/admin/AdminAppointmentsPage';
import { AdminGalleryPage } from './pages/admin/AdminGalleryPage';
import { AdminNotificationsPage } from './pages/admin/AdminNotificationsPage';
import { AdminBlogPage } from './pages/admin/AdminBlogPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

function App() {
    return (
        <ErrorBoundary>
            <CartProvider>
                <ScrollToTop />
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="therapies" element={<TherapiesPage />} />
                        <Route path="therapies/:slug" element={<TherapyDetailPage />} />
                        <Route path="packages" element={<PackagesPage />} />
                        <Route path="shop" element={<ShopPage />} />
                        <Route path="shop/:slug" element={<ProductDetailPage />} />
                        <Route path="checkout" element={<CheckoutPage />} />
                        <Route path="order-confirmed/:orderId?" element={<OrderConfirmedPage />} />
                        <Route path="gallery" element={<GalleryPage />} />
                        <Route path="blog" element={<BlogPage />} />
                        <Route path="blog/:slug" element={<BlogPostPage />} />
                        <Route path="about" element={<AboutPage />} />
                        <Route path="contact" element={<ContactPage />} />
                        <Route path="terms" element={<TermsPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>

                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<AdminLoginPage />} />
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route path="dashboard" element={<DashboardPage />} />
                        <Route path="products" element={<AdminProductsPage />} />
                        <Route path="inventory" element={<AdminInventoryPage />} />
                        <Route path="therapies" element={<AdminTherapiesPage />} />
                        <Route path="packages" element={<AdminPackagesPage />} />
                        <Route path="orders" element={<AdminOrdersPage />} />
                        <Route path="appointments" element={<AdminAppointmentsPage />} />
                        <Route path="gallery" element={<AdminGalleryPage />} />
                        {/* <Route path="reviews" element={<AdminReviewsPage />} /> */}
                        <Route path="notifications" element={<AdminNotificationsPage />} />
                        <Route path="blog" element={<AdminBlogPage />} />
                        <Route path="settings" element={<AdminSettingsPage />} />
                    </Route>
                </Routes>
                <CartDrawer />
            </CartProvider>
        </ErrorBoundary>
    );
}

export default App;
