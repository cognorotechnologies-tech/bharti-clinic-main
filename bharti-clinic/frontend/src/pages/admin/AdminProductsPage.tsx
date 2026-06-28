import { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, Search, Filter, ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import api from '../../lib/axios';

// Types
interface Category {
    id: string;
    name: string;
    slug: string;
    type?: string;
    imageUrl?: string;
}

interface Product {
    id: string;
    name: string;
    slug: string;
    sku?: string;
    description: string;
    ingredients?: string;
    howToUse?: string;
    price: number;
    comparePrice?: number;
    stock: number;
    categoryId: string;
    category: Category;
    imageUrls: string[];
    isActive: boolean;
    isFeatured: boolean;
    avgRating: number;
    reviewCount: number;
    createdAt: string;
}

interface ProductFormData extends Omit<Product, 'id' | 'createdAt' | 'avgRating' | 'reviewCount'> {
    id?: string;
}

export function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        slug: '',
        description: '',
        sku: '',
        price: 0,
        comparePrice: undefined,
        stock: 0,
        categoryId: '',
        category: { id: '', name: '', slug: '', type: 'PRODUCT' },
        imageUrls: [],
        isActive: true,
        isFeatured: false,
    });
    const [categories, setCategories] = useState<any[]>([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [page, search]);

    const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await api.get('/api/admin/products', {
                    params: { page, limit: 10, search },
                });

                // API returns { success, data: { products, pagination }, message }
                const responseData = response.data.data || response.data;
                setProducts(responseData.products);
                setTotalPages(responseData.pagination.totalPages);
            } catch (err) {
                setError('Failed to fetch products');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

    const fetchCategories = async () => {
            try {
                const response = await api.get('/api/categories');
                // API returns { success, data, message }
                const responseData = response.data.data || response.data;
                setCategories(Array.isArray(responseData) ? responseData : []);
            } catch (err) {
                console.error('Failed to fetch categories:', err);
            }
        };

    const handleSave = async () => {
        setError('');
        setSuccess('');

        if (!formData.name || !formData.slug || !formData.categoryId) {
            setError('Please fill in all required fields');
            return;
        }

        try {
            if (editingId) {
                await api.put(`/api/admin/products/${editingId}`, formData);
                setSuccess('Product updated successfully');
            } else {
                await api.post('/api/admin/products', formData);
                setSuccess('Product created successfully');
            }

            setShowForm(false);
            setEditingId(null);
            setFormData({
                name: '',
                slug: '',
                description: '',
                sku: '',
                price: 0,
                comparePrice: undefined,
                stock: 0,
                categoryId: '',
                category: { id: '', name: '', slug: '', type: 'PRODUCT' },
                imageUrls: [],
                isActive: true,
                isFeatured: false,
            });
            fetchProducts();
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to save product');
        }
    };

    const handleEdit = (product: Product) => {
        setFormData(product as any);
        setEditingId(product.id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            await api.delete(`/api/admin/products/${id}`);
            setSuccess('Product deleted successfully');
            fetchProducts();
        } catch (err) {
            setError('Failed to delete product');
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
                <p className="text-gray-600 mt-1">Manage your clinic products</p>
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

            {showForm && (
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                        {editingId ? 'Edit Product' : 'Add New Product'}
                    </h2>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Product Name *
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Slug *
                            </label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description *
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                SKU
                            </label>
                            <input
                                type="text"
                                value={formData.sku || ''}
                                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Price (₹)
                            </label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Compare Price (₹)
                            </label>
                            <input
                                type="number"
                                value={formData.comparePrice || ''}
                                onChange={(e) =>
                                    setFormData({ ...formData, comparePrice: e.target.value ? parseFloat(e.target.value) : undefined })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Stock *
                            </label>
                            <input
                                type="number"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category *
                            </label>
                            <select
                                value={formData.categoryId}
                                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                    className="w-4 h-4"
                                />
                                <span className="text-sm font-medium text-gray-700">Active</span>
                            </label>
                        </div>

                        <div>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.isFeatured}
                                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                                    className="w-4 h-4"
                                />
                                <span className="text-sm font-medium text-gray-700">Featured</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={handleSave}
                            className="px-6 py-2 bg-lotus-pink text-white rounded-lg hover:bg-pink-600 transition"
                        >
                            Save Product
                        </button>
                        <button
                            onClick={() => {
                                setShowForm(false);
                                setEditingId(null);
                            }}
                            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {!showForm && (
                <>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex gap-4 mb-6">
                            <div className="flex-1 flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setPage(1);
                                    }}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                                />
                                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                                    <Search size={20} />
                                </button>
                            </div>

                            <button
                                onClick={() => {
                                    setShowForm(true);
                                    setEditingId(null);
                                }}
                                className="flex items-center gap-2 px-6 py-2 bg-lotus-pink text-white rounded-lg hover:bg-pink-600"
                            >
                                <Plus size={20} />
                                Add Product
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Product</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">SKU</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Stock</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-8 text-center">
                                                <Loader className="inline animate-spin" />
                                            </td>
                                        </tr>
                                    ) : products.length > 0 ? (
                                        products.map((product) => (
                                            <tr key={product.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                                                <td className="px-6 py-4 text-gray-600">{product.sku || '-'}</td>
                                                <td className="px-6 py-4 font-semibold text-gray-900">₹{product.price}</td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                            product.stock > 10
                                                                ? 'bg-green-100 text-green-800'
                                                                : product.stock > 0
                                                                  ? 'bg-yellow-100 text-yellow-800'
                                                                  : 'bg-red-100 text-red-800'
                                                        }`}
                                                    >
                                                        {product.stock}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                            product.isActive
                                                                ? 'bg-blue-100 text-blue-800'
                                                                : 'bg-gray-100 text-gray-800'
                                                        }`}
                                                    >
                                                        {product.isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(product)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                                No products found
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
                </>
            )}
        </div>
    );
}
