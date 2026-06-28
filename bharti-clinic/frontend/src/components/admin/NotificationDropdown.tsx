import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, X, Check, ShoppingCart, Calendar, Star, Package, AlertCircle, Clock } from 'lucide-react';
import axios from '../../lib/axios';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
    id: string;
    type: 'order' | 'appointment' | 'review' | 'inventory' | 'system';
    title: string;
    message: string;
    link?: string;
    read: boolean;
    createdAt: string;
    priority: 'low' | 'medium' | 'high';
    actionable?: boolean;
    actionLabel?: string;
    actionData?: any;
}

const NOTIFICATION_ICONS = {
    order: ShoppingCart,
    appointment: Calendar,
    review: Star,
    inventory: Package,
    system: AlertCircle,
};

const PRIORITY_COLORS = {
    low: 'bg-blue-100 text-blue-600',
    medium: 'bg-yellow-100 text-yellow-600',
    high: 'bg-red-100 text-red-600',
};

export function NotificationDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState<'all' | 'unread'>('all');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Fetch notifications
    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/admin/notifications');
            if (response.data.success) {
                setNotifications(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    // Auto-refresh every 30 seconds
    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Mark as read
    const markAsRead = async (id: string) => {
        try {
            await axios.patch(`/api/admin/notifications/${id}/read`);
            setNotifications(prev =>
                prev.map(n => (n.id === id ? { ...n, read: true } : n))
            );
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    };

    // Mark all as read
    const markAllAsRead = async () => {
        try {
            await axios.patch('/api/admin/notifications/read-all');
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        } catch (error) {
            console.error('Failed to mark all as read:', error);
        }
    };

    // Delete notification
    const deleteNotification = async (id: string) => {
        try {
            await axios.delete(`/api/admin/notifications/${id}`);
            setNotifications(prev => prev.filter(n => n.id !== id));
        } catch (error) {
            console.error('Failed to delete notification:', error);
        }
    };

    // Handle notification click
    const handleNotificationClick = (notification: Notification) => {
        markAsRead(notification.id);
        if (notification.link) {
            navigate(notification.link);
            setIsOpen(false);
        }
    };

    // Handle quick action
    const handleQuickAction = async (notification: Notification) => {
        try {
            if (notification.type === 'review' && notification.actionData?.reviewId) {
                // Quick approve review
                await axios.patch(`/reviews/${notification.actionData.reviewId}/status`, {
                    status: 'APPROVED'
                });
                deleteNotification(notification.id);
            } else if (notification.type === 'order' && notification.actionData?.orderId) {
                // Quick view order
                navigate(`/admin/orders?id=${notification.actionData.orderId}`);
                setIsOpen(false);
            }
        } catch (error) {
            console.error('Failed to perform quick action:', error);
        }
    };

    const filteredNotifications = notifications.filter(n =>
        filter === 'all' ? true : !n.read
    );

    const unreadCount = notifications.filter(n => !n.read).length;

    const getTimeAgo = (date: string) => {
        const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
        if (seconds < 60) return 'Just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        return `${Math.floor(seconds / 86400)}d ago`;
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Bell Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
            >
                <Bell size={20} className="text-gray-700" />
                {unreadCount > 0 && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                    >
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </motion.span>
                )}
            </button>

            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 hover:bg-gray-100 rounded"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Filter Tabs */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setFilter('all')}
                                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                        filter === 'all'
                                            ? 'bg-lotus-pink text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    All ({notifications.length})
                                </button>
                                <button
                                    onClick={() => setFilter('unread')}
                                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                        filter === 'unread'
                                            ? 'bg-lotus-pink text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    Unread ({unreadCount})
                                </button>
                                {unreadCount > 0 && (
                                    <button
                                        onClick={markAllAsRead}
                                        className="ml-auto text-xs text-lotus-pink hover:underline"
                                    >
                                        Mark all read
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Notifications List */}
                        <div className="max-h-96 overflow-y-auto">
                            {loading ? (
                                <div className="p-8 text-center text-gray-500">
                                    <div className="animate-spin w-8 h-8 border-4 border-lotus-pink border-t-transparent rounded-full mx-auto"></div>
                                    <p className="mt-2 text-sm">Loading...</p>
                                </div>
                            ) : filteredNotifications.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                    <Bell size={48} className="mx-auto mb-2 opacity-30" />
                                    <p className="text-sm">No notifications</p>
                                </div>
                            ) : (
                                filteredNotifications.map((notification) => {
                                    const Icon = NOTIFICATION_ICONS[notification.type];
                                    return (
                                        <motion.div
                                            key={notification.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                                                !notification.read ? 'bg-blue-50' : ''
                                            }`}
                                        >
                                            <div className="flex gap-3">
                                                {/* Icon */}
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${PRIORITY_COLORS[notification.priority]}`}>
                                                    <Icon size={18} />
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <button
                                                            onClick={() => handleNotificationClick(notification)}
                                                            className="text-left flex-1"
                                                        >
                                                            <h4 className="text-sm font-semibold text-gray-900 mb-1">
                                                                {notification.title}
                                                            </h4>
                                                            <p className="text-xs text-gray-600 line-clamp-2">
                                                                {notification.message}
                                                            </p>
                                                        </button>
                                                        <button
                                                            onClick={() => deleteNotification(notification.id)}
                                                            className="p-1 hover:bg-gray-200 rounded"
                                                        >
                                                            <X size={14} className="text-gray-400" />
                                                        </button>
                                                    </div>

                                                    {/* Footer */}
                                                    <div className="flex items-center justify-between mt-2">
                                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                                            <Clock size={12} />
                                                            <span>{getTimeAgo(notification.createdAt)}</span>
                                                        </div>

                                                        {/* Quick Action */}
                                                        {notification.actionable && (
                                                            <button
                                                                onClick={() => handleQuickAction(notification)}
                                                                className="text-xs text-lotus-pink hover:underline font-medium"
                                                            >
                                                                {notification.actionLabel || 'Quick Action'}
                                                            </button>
                                                        )}

                                                        {/* Mark as Read */}
                                                        {!notification.read && (
                                                            <button
                                                                onClick={() => markAsRead(notification.id)}
                                                                className="text-xs text-gray-500 hover:text-lotus-pink flex items-center gap-1"
                                                            >
                                                                <Check size={12} />
                                                                Mark read
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })
                            )}
                        </div>

                        {/* Footer */}
                        {filteredNotifications.length > 0 && (
                            <div className="p-3 border-t border-gray-200 text-center">
                                <button
                                    onClick={() => {
                                        navigate('/admin/notifications');
                                        setIsOpen(false);
                                    }}
                                    className="text-sm text-lotus-pink hover:underline font-medium"
                                >
                                    View All Notifications
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
