import { useState, useEffect } from 'react';
import { AlertTriangle, TrendingDown, Loader, RefreshCw } from 'lucide-react';
import api from '../../lib/axios';

interface InventoryItem {
    productId: string;
    productName: string;
    currentStock: number;
    threshold: number;
}

export function AdminInventoryPage() {
    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [restocking, setRestocking] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
            setLoading(true);
            try {
                const response = await api.get('/api/admin/dashboard/low-stock');

                // API returns { success, data, message } wrapper
                const responseData = response.data.data || response.data;
                setInventory(Array.isArray(responseData) ? responseData : []);
            } catch (err) {
                setError('Failed to fetch inventory');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

    const handleRestock = async (productId: string) => {
        setRestocking(productId);
        try {
            const token = localStorage.getItem('adminToken');
            // You would implement actual restocking logic here
            setSuccess('Restock request submitted for this product');
            setTimeout(() => {
                fetchInventory();
                setRestocking(null);
            }, 1000);
        } catch (err) {
            setError('Failed to process restock request');
            setRestocking(null);
        }
    };

    const criticalItems = inventory.filter((item) => item.currentStock <= item.threshold);
    const lowItems = inventory.filter((item) => item.currentStock > item.threshold && item.currentStock <= item.threshold * 2);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
                <p className="text-gray-600 mt-1">Monitor and manage product stock levels</p>
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

            <button
                onClick={fetchInventory}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
                <RefreshCw size={18} />
                Refresh Inventory
            </button>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader className="animate-spin text-lotus-pink" size={32} />
                </div>
            ) : (
                <>
                    {/* Critical Stock Alert */}
                    {criticalItems.length > 0 && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <AlertTriangle size={24} className="text-red-600" />
                                <h2 className="text-lg font-bold text-red-900">Critical Stock Levels</h2>
                            </div>
                            <div className="space-y-3">
                                {criticalItems.map((item) => (
                                    <div key={item.productId} className="flex items-center justify-between bg-white p-4 rounded">
                                        <div>
                                            <p className="font-semibold text-gray-900">{item.productName}</p>
                                            <p className="text-sm text-red-600">
                                                Only {item.currentStock} units left (Threshold: {item.threshold})
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleRestock(item.productId)}
                                            disabled={restocking === item.productId}
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                                        >
                                            {restocking === item.productId ? 'Processing...' : 'Restock Now'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Low Stock Items */}
                    {lowItems.length > 0 && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <TrendingDown size={24} className="text-yellow-600" />
                                <h2 className="text-lg font-bold text-yellow-900">Low Stock Items</h2>
                            </div>
                            <div className="space-y-3">
                                {lowItems.map((item) => (
                                    <div key={item.productId} className="flex items-center justify-between bg-white p-4 rounded">
                                        <div>
                                            <p className="font-semibold text-gray-900">{item.productName}</p>
                                            <p className="text-sm text-yellow-600">
                                                {item.currentStock} units available (Threshold: {item.threshold})
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleRestock(item.productId)}
                                            disabled={restocking === item.productId}
                                            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50"
                                        >
                                            {restocking === item.productId ? 'Processing...' : 'Restock'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {criticalItems.length === 0 && lowItems.length === 0 && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-12 text-center">
                            <p className="text-green-800 font-semibold text-lg">✓ All inventory levels are healthy!</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
