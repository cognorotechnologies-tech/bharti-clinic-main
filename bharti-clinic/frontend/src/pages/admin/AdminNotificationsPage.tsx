import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ShoppingCart, Calendar, Star, Package, AlertCircle, Check, Trash2, Filter } from 'lucide-react';
import axios from '../../lib/axios';

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
}

const NOTIFICATION_ICONS = {
    order: ShoppingCart,
    appointment: Calendar,
    review: Star,
    inventory: Package,
    system: AlertCircle,
};

const PRIORITY_COLORS = {
    low: 'bg-blue-100 text-blue-600 border-blue-200',
    medium: 'bg-yellow-100 text-yellow-600 border-yellow-200',
    high: 'bg-red-100 text-red-600 border-red-200',
};

export function AdminNotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all');
    const navigate = useNavigate();

    useEffect(() => {
        fetchNotifications();
    }, []);

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

    const markAsRead = async (id: string) => {
        try {
            await axios.patch(`/api/admin/notifications/${id}/read`);
            setNotifications(prev =>
                prev.map(n => (n.id === id ? { ...n, read: true } : n))
            );
        } catch (error) {
            console.error('Failed to mark as read:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await axios.patch('/api/admin/notifications/read-all');
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        } catch (error) {
            console.error('Failed to mark all as read:', error);
        }
    };

    const deleteNotification = async (id: string) => {
        try {
            await axios.delete(`/api/admin/notifications/${id}`);
            setNotifications(prev => prev.filter(n => n.id !== id));
        } catch (error) {
            console.error('Failed to delete notification:', error);
        }
    };

    const handleNotificationClick = (notification: Notification) => {
        markAsRead(notification.id);
        if (notification.link) {
            navigate(notification.link);
        }
    };

    const filteredNotifications = notifications.filter(n => {
        if (filter === 'unread') return !n.read;
        if (filter === 'high') return n.priority === 'high';
        return true;
    });

    const unreadCount = notifications.filter(n => !n.read).length;
    const highPriorityCount = notifications.filter(n => n.priority === 'high').length;

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-maroon mb-2">Notifications</h1>
                <p className="text-gray-600">Stay updated with important events and actions</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total</p>
                            <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
                        </div>
                        <Bell className="text-gray-400" size={32} />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Unread</p>
                            <p className="text-2xl font-bold text-blue-600">{unreadCount}</p>
                        </div>
                        <Bell className="text-blue-400" size={32} />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">High Priority</p>
                            <p className="text-2xl font-bold text-red-600">{highPriorityCount}</p>
                        </div>
                        <AlertCircle className="text-red-400" size={32} />
                    </div>
                </div>
            </div>

            {/* Filters and Actions */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                filter === 'all'
                                    ? 'bg-lotus-pink text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            All ({notifications.length})
                        </button>
                        <button
                            onClick={() => setFilter('unread')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                filter === 'unread'
                                    ? 'bg-lotus-pink text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Unread ({unreadCount})
                        </button>
                        <button
                            onClick={() => setFilter('high')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                filter === 'high'
                                    ? 'bg-lotus-pink text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            High Priority ({highPriorityCount})
                        </button>
                    </div>
                    {unreadCount > 0 && (
                        <button
                            onClick={markAllAsRead}
                            className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
                        >
                            <Check size={16} />
                            Mark All Read
                        </button>
                    )}
                </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-3">
                {loading ? (
                    <div className="bg-white p-12 rounded-lg border border-gray-200 text-center">
                        <div className="animate-spin w-12 h-12 border-4 border-lotus-pink border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading notifications...</p>
                    </div>
                ) : filteredNotifications.length === 0 ? (
                    <div className="bg-white p-12 rounded-lg border border-gray-200 text-center">
                        <Bell size={64} className="mx-auto mb-4 text-gray-300" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No notifications</h3>
                        <p className="text-gray-600">You're all caught up!</p>
                    </div>
                ) : (
                    filteredNotifications.map((notification) => {
                        const Icon = NOTIFICATION_ICONS[notification.type];
                        return (
                            <div
                                key={notification.id}
                                className={`bg-white p-5 rounded-lg border-2 transition-all hover:shadow-md ${
                                    !notification.read ? 'bg-blue-50 border-blue-200' : 'border-gray-200'
                                }`}
                            >
                                <div className="flex gap-4">
                                    {/* Icon */}
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${PRIORITY_COLORS[notification.priority]}`}>
                                        <Icon size={24} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                    {notification.title}
                                                </h3>
                                                <p className="text-gray-600">{notification.message}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                notification.priority === 'high' ? 'bg-red-100 text-red-600' :
                                                notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                                                'bg-blue-100 text-blue-600'
                                            }`}>
                                                {notification.priority.toUpperCase()}
                                            </span>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-wrap items-center gap-3 mt-4">
                                            {notification.link && (
                                                <button
                                                    onClick={() => handleNotificationClick(notification)}
                                                    className="px-4 py-2 bg-lotus-pink text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm font-medium"
                                                >
                                                    {notification.actionLabel || 'View Details'}
                                                </button>
                                            )}
                                            {!notification.read && (
                                                <button
                                                    onClick={() => markAsRead(notification.id)}
                                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center gap-2"
                                                >
                                                    <Check size={16} />
                                                    Mark as Read
                                                </button>
                                            )}
                                            <button
                                                onClick={() => deleteNotification(notification.id)}
                                                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium flex items-center gap-2"
                                            >
                                                <Trash2 size={16} />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
