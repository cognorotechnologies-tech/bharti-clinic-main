import { useState, useEffect } from 'react';
import { Eye, Loader, ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';
import api from '../../lib/axios';
import { TableSkeleton } from '../../components/ui/LoadingSkeleton';

// Types
type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED';

interface Address {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pinCode: string;
}

interface Order {
    id: string;
    patientName: string;
    phone: string;
    email: string;
    status: OrderStatus;
    items: any[];
    totalAmount: number;
    shippingAddress: Address;
    paymentMethod: string;
    paymentStatus: PaymentStatus;
    createdAt: string;
    updatedAt: string;
}

export function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchOrders();
    }, [page, search, statusFilter]);

    const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await api.get('/api/admin/orders', {
                    params: {
                        page,
                        limit: 15,
                        search: search || undefined,
                        status: statusFilter || undefined,
                    },
                });

                // API returns { success, data: { orders, pagination }, message }
                const responseData = response.data.data || response.data;
                setOrders(responseData.orders);
                setTotalPages(responseData.pagination.totalPages);
            } catch (err) {
                setError('Failed to fetch orders');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

    const updateOrderStatus = async (orderId: string, newStatus: string) => {
            try {
                await api.patch(`/api/admin/orders/${orderId}/status`, { status: newStatus });

                setSuccess('Order status updated successfully');
                fetchOrders();
                setSelectedOrder(null);
            } catch (err) {
                setError('Failed to update order status');
            }
        };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
                <p className="text-gray-600 mt-1">Track and manage customer orders</p>
            </div>

            {success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
                    {success}
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                    {error}
                </div>
            )}

            {selectedOrder && (
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
                        <button
                            onClick={() => setSelectedOrder(null)}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                        >
                            Close
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                            <p className="text-sm text-gray-600">Order ID</p>
                            <p className="text-lg font-semibold text-gray-900">{selectedOrder.id}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Date</p>
                            <p className="text-lg font-semibold text-gray-900">
                                {new Date(selectedOrder.createdAt).toLocaleDateString('en-IN')}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Customer</p>
                            <p className="text-lg font-semibold text-gray-900">{selectedOrder.patientName}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Phone</p>
                            <p className="text-lg font-semibold text-gray-900">{selectedOrder.phone}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Amount</p>
                            <p className="text-lg font-semibold text-gray-900">₹{selectedOrder.totalAmount}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Payment Method</p>
                            <p className="text-lg font-semibold text-gray-900">{selectedOrder.paymentMethod}</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <p className="text-sm text-gray-600 mb-3">Update Status</p>
                        <div className="flex gap-2">
                            {['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => updateOrderStatus(selectedOrder.id, status)}
                                    className={`px-4 py-2 rounded-lg transition ${
                                        selectedOrder.status === status
                                            ? 'bg-lotus-pink text-white'
                                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                    }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-gray-600 mb-3">Items</p>
                        <div className="space-y-2">
                            {Array.isArray(selectedOrder.items) &&
                                selectedOrder.items.map((item: any, idx: number) => (
                                    <div key={idx} className="flex justify-between p-3 bg-gray-50 rounded">
                                        <span className="text-gray-900">{item.name || 'Product'}</span>
                                        <span className="text-gray-600">x{item.quantity}</span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}

            {!selectedOrder && (
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex gap-4 mb-6">
                        <div className="flex-1 flex gap-2">
                            <input
                                type="text"
                                placeholder="Search orders by customer, email, or phone..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPage(1);
                                }}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                            />
                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value);
                                    setPage(1);
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                            >
                                <option value="">All Statuses</option>
                                <option value="PENDING">Pending</option>
                                <option value="CONFIRMED">Confirmed</option>
                                <option value="SHIPPED">Shipped</option>
                                <option value="DELIVERED">Delivered</option>
                                <option value="CANCELLED">Cancelled</option>
                            </select>
                        </div>
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
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="p-0">
                                            <TableSkeleton rows={10} columns={6} />
                                        </td>
                                    </tr>
                                ) : orders.length > 0 ? (
                                    orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-mono text-sm text-gray-900">{order.id.slice(0, 8)}</td>
                                            <td className="px-6 py-4 text-gray-900">{order.patientName}</td>
                                            <td className="px-6 py-4 font-semibold text-gray-900">₹{order.totalAmount}</td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                        order.status === 'PENDING'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : order.status === 'CONFIRMED'
                                                              ? 'bg-blue-100 text-blue-800'
                                                              : order.status === 'SHIPPED'
                                                                ? 'bg-purple-100 text-purple-800'
                                                                : order.status === 'DELIVERED'
                                                                  ? 'bg-green-100 text-green-800'
                                                                  : 'bg-red-100 text-red-800'
                                                    }`}
                                                >
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {new Date(order.createdAt).toLocaleDateString('en-IN')}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                            No orders found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <p className="text-sm text-gray-600">
                            Page {page} of {totalPages}
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage(Math.max(1, page - 1))}
                                disabled={page === 1}
                                className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={() => setPage(Math.min(totalPages, page + 1))}
                                disabled={page === totalPages}
                                className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
