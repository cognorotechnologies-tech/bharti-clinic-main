import { useState, useEffect } from 'react';
import {
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import {
    TrendingUp,
    TrendingDown,
    AlertCircle,
    Clock,
    ShoppingCart,
    DollarSign,
    Package,
    CheckCircle,
    X,
} from 'lucide-react';
import api from '../../lib/axios';
import { DashboardCardSkeleton } from '../../components/ui/LoadingSkeleton';

// Types
interface DashboardKPI {
    revenueToday: number;
    pendingOrders: number;
    appointmentsToday: number;
    lowStockAlerts: number;
}

interface RevenueData {
    date: string;
    revenue: number;
}

interface OrderStatusData {
    name: string;
    value: number;
}

interface Appointment {
    id: string;
    patientName: string;
    therapy: string;
    dateTime: string;
    status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
}

interface LowStockAlert {
    productId: string;
    productName: string;
    currentStock: number;
    threshold: number;
}

const COLORS = ['#f87272', '#4ade80', '#fbbf24', '#ef4444'];

export function DashboardPage() {
    const [kpis, setKpis] = useState<DashboardKPI>({
        revenueToday: 0,
        pendingOrders: 0,
        appointmentsToday: 0,
        lowStockAlerts: 0,
    });
    const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
    const [orderStatusData, setOrderStatusData] = useState<OrderStatusData[]>([]);
    const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
    const [recentOrders, setRecentOrders] = useState<any[]>([]);
    const [lowStockItems, setLowStockItems] = useState<LowStockAlert[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [kpiRes, revenueRes, ordersRes, appointmentsRes, lowStockRes] =
                await Promise.allSettled([
                    api.get('/api/admin/dashboard/kpi'),
                    api.get('/api/admin/dashboard/revenue'),
                    api.get('/api/admin/dashboard/orders'),
                    api.get('/api/admin/dashboard/appointments'),
                    api.get('/api/admin/dashboard/low-stock'),
                ]);

            if (kpiRes.status === 'fulfilled') {
                const responseData = kpiRes.value.data.data || kpiRes.value.data;
                setKpis(responseData);
            }
            if (revenueRes.status === 'fulfilled') {
                const responseData = revenueRes.value.data.data || revenueRes.value.data;
                setRevenueData(Array.isArray(responseData) ? responseData : []);
            }
            if (ordersRes.status === 'fulfilled') {
                const responseData = ordersRes.value.data.data || ordersRes.value.data;
                setOrderStatusData(responseData.statusData || []);
                setRecentOrders(responseData.recentOrders || []);
            }
            if (appointmentsRes.status === 'fulfilled') {
                const responseData = appointmentsRes.value.data.data || appointmentsRes.value.data;
                setUpcomingAppointments(Array.isArray(responseData) ? responseData : []);
            }
            if (lowStockRes.status === 'fulfilled') {
                const responseData = lowStockRes.value.data.data || lowStockRes.value.data;
                setLowStockItems(Array.isArray(responseData) ? responseData : []);
            }
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const KPICard = ({
        title,
        value,
        trend,
        icon: Icon,
        color,
    }: {
        title: string;
        value: number | string;
        trend?: number;
        icon: React.ReactNode;
        color: string;
    }) => (
        <div className="bg-white rounded-lg shadow p-6 border-l-4" style={{ borderLeftColor: color }}>
            <div className="flex items-justify-between">
                <div className="flex-1">
                    <p className="text-gray-600 text-sm font-medium mb-2">{title}</p>
                    <p className="text-3xl font-bold text-gray-900">
                        {typeof value === 'number' && title.includes('Revenue') ? `₹${value.toLocaleString()}` : value}
                    </p>
                    {trend !== undefined && (
                        <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {trend >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                            <span>{Math.abs(trend)}% from yesterday</span>
                        </div>
                    )}
                </div>
                <div className="flex-shrink-0 ml-4">{Icon}</div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-1">Loading your clinic's performance overview...</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <DashboardCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Welcome back, here's your clinic's performance overview</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard
                    title="Revenue Today"
                    value={kpis.revenueToday}
                    trend={12}
                    icon={<DollarSign size={32} className="text-blue-500" />}
                    color="#3b82f6"
                />
                <KPICard
                    title="Pending Orders"
                    value={kpis.pendingOrders}
                    trend={-5}
                    icon={<ShoppingCart size={32} className="text-orange-500" />}
                    color="#f97316"
                />
                <KPICard
                    title="Appointments Today"
                    value={kpis.appointmentsToday}
                    trend={8}
                    icon={<Clock size={32} className="text-green-500" />}
                    color="#22c55e"
                />
                <KPICard
                    title="Low Stock Alerts"
                    value={kpis.lowStockAlerts}
                    icon={<AlertCircle size={32} className="text-red-500" />}
                    color="#ef4444"
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Orders by Status */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Orders by Status</h2>
                    {Array.isArray(orderStatusData) && orderStatusData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={orderStatusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, value }) => `${name}: ${value}`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {orderStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-72 flex items-center justify-center text-gray-500">No data available</div>
                    )}
                </div>

                {/* Revenue Last 7 Days */}
                <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Revenue - Last 7 Days</h2>
                    {Array.isArray(revenueData) && revenueData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip formatter={(value) => `₹${value?.toLocaleString()}`} />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#f87272"
                                    strokeWidth={2}
                                    connectNulls
                                    dot={{ fill: '#f87272', r: 4 }}
                                    name="Daily Revenue"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-72 flex items-center justify-center text-gray-500">No data available</div>
                    )}
                </div>
            </div>

            {/* Tables Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Appointments */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-lg font-bold text-gray-900">Upcoming Appointments</h2>
                        <p className="text-sm text-gray-600 mt-1">Next 5 appointments</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Patient</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Therapy</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Date & Time</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {Array.isArray(upcomingAppointments) && upcomingAppointments.length > 0 ? (
                                    upcomingAppointments.map((apt) => (
                                        <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{apt.patientName}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{apt.therapy}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {new Date(apt.dateTime).toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                        apt.status === 'SCHEDULED'
                                                            ? 'bg-blue-100 text-blue-800'
                                                            : apt.status === 'COMPLETED'
                                                              ? 'bg-green-100 text-green-800'
                                                              : 'bg-red-100 text-red-800'
                                                    }`}
                                                >
                                                    {apt.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <button className="text-lotus-pink hover:text-pink-700 font-medium">Edit</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                            No appointments scheduled
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                        <p className="text-sm text-gray-600 mt-1">Last 5 orders</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Customer</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {Array.isArray(recentOrders) && recentOrders.length > 0 ? (
                                    recentOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-mono text-gray-900">{order.id.slice(0, 8)}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{order.patientName}</td>
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">₹{order.totalAmount.toLocaleString()}</td>
                                            <td className="px-6 py-4 text-sm">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                        order.status === 'PENDING'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : order.status === 'CONFIRMED'
                                                              ? 'bg-blue-100 text-blue-800'
                                                              : order.status === 'DELIVERED'
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-red-100 text-red-800'
                                                    }`}
                                                >
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                            No orders found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Low Stock Alerts */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Low Stock Alerts</h2>
                        <p className="text-sm text-gray-600 mt-1">Products running low on inventory</p>
                    </div>
                    <AlertCircle size={24} className="text-red-500" />
                </div>
                <div className="divide-y divide-gray-200">
                    {Array.isArray(lowStockItems) && lowStockItems.length > 0 ? (
                        lowStockItems.map((item) => (
                            <div key={item.productId} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{item.productName}</h3>
                                        <div className="mt-2 flex items-center justify-between max-w-xs">
                                            <div>
                                                <p className="text-sm text-gray-600">Current Stock</p>
                                                <p className="text-2xl font-bold text-red-600">{item.currentStock}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Threshold</p>
                                                <p className="text-lg font-semibold text-gray-900">{item.threshold}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <button className="px-4 py-2 bg-lotus-pink text-white rounded-lg hover:bg-pink-600 transition-colors font-medium text-sm flex items-center gap-2">
                                            <Package size={16} />
                                            Restock
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-12 text-center">
                            <CheckCircle size={48} className="mx-auto text-green-500 mb-3" />
                            <p className="text-gray-600">All inventory levels are healthy!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
