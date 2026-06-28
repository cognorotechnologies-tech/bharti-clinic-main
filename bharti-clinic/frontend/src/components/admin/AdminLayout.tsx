import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    Menu,
    X,
    Home,
    Package,
    Inbox,
    Flower2,
    Gift,
    ShoppingCart,
    Calendar,
    Image,
    Star,
    FileText,
    Settings,
    LogOut,
} from 'lucide-react';
import { NotificationDropdown } from './NotificationDropdown';

const NAV_ITEMS = [
    { icon: Home, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Package, label: 'Products', path: '/admin/products' },
    { icon: Inbox, label: 'Inventory', path: '/admin/inventory' },
    { icon: Flower2, label: 'Therapies', path: '/admin/therapies' },
    { icon: Gift, label: 'Packages', path: '/admin/packages' },
    { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
    { icon: Calendar, label: 'Appointments', path: '/admin/appointments' },
    { icon: Image, label: 'Gallery', path: '/admin/gallery' },
    { icon: Star, label: 'Reviews', path: '/admin/reviews' },
    { icon: FileText, label: 'Blog', path: '/admin/blog' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [adminName, setAdminName] = useState('Admin User');
    const navigate = useNavigate();
    const location = useLocation();

    // Check authentication on mount
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
        }

        const adminUser = localStorage.getItem('adminUser');
        if (adminUser) {
            try {
                const user = JSON.parse(adminUser);
                setAdminName(user.name || 'Admin User');
            } catch (e) {
                // Handle parse error
            }
        }
    }, [navigate]);

    // Handle responsive design
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside
                className={`${sidebarOpen ? 'w-60' : isMobile ? '-translate-x-full' : 'w-20'
                    } fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-40 flex flex-col`}
            >
                {/* Logo */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 min-h-20">
                    {sidebarOpen && (
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-lotus-pink rounded-full flex items-center justify-center">
                                <Flower2 size={24} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-base font-bold text-maroon">Bharti</h1>
                                <p className="text-xs text-gray-500">Clinic</p>
                            </div>
                        </div>
                    )}
                    {!isMobile && (
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4 px-2">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
                        return (
                            <button
                                key={item.path}
                                data-testid={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
                                onClick={() => {
                                    navigate(item.path);
                                    if (isMobile) setSidebarOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${active
                                        ? 'bg-lotus-pink text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                title={!sidebarOpen ? item.label : ''}
                            >
                                <Icon size={20} className="flex-shrink-0" />
                                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                            </button>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <div className={`${sidebarOpen ? 'ml-60' : isMobile ? 'ml-0' : 'ml-20'} w-full flex flex-col transition-all duration-300`}>
                {/* Top Bar */}
                <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
                    <div className="flex items-center justify-between px-6 py-4">
                        {/* Left: Title and Mobile Menu */}
                        <div className="flex items-center gap-4">
                            {isMobile && (
                                <button
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <Menu size={24} />
                                </button>
                            )}
                            <h2 className="text-2xl font-bold text-maroon">Bharti Clinic Admin</h2>
                        </div>

                        {/* Right: Notifications, Profile, Logout */}
                        <div className="flex items-center gap-6">
                            {/* Notification Bell with Dropdown */}
                            <div data-testid="notification-bell">
                                <NotificationDropdown />
                            </div>

                            {/* Admin Profile */}
                            <div className="flex items-center gap-3 border-l border-gray-200 pl-6">
                                <div className="w-10 h-10 bg-lotus-pink text-white rounded-full flex items-center justify-center font-bold">
                                    {adminName.charAt(0).toUpperCase()}
                                </div>
                                <div className="hidden sm:block">
                                    <p data-testid="admin-name" className="text-sm font-semibold text-gray-900">{adminName}</p>
                                    <p className="text-xs text-gray-500">Admin</p>
                                </div>
                            </div>

                            {/* Logout Button */}
                            <button
                                data-testid="logout-btn"
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Logout"
                            >
                                <LogOut size={20} />
                                {!isMobile && <span className="text-sm font-medium">Logout</span>}
                            </button>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>

            {/* Mobile Overlay */}
            {isMobile && sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}
