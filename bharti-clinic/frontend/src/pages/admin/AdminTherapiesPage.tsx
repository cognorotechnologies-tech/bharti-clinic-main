import { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, Search, Loader, ChevronLeft, ChevronRight, Upload, X } from 'lucide-react';
import api from '../../lib/axios';

interface Category {
    id: string;
    name: string;
    slug: string;
    type?: string;
}

interface Therapy {
    id: string;
    name: string;
    slug: string;
    description: string;
    durationMinutes: number;
    basePrice: number;
    discountedPrice?: number;
    discountExpiry?: string;
    imageUrl?: string;
    categoryId: string;
    category: Category;
    isActive: boolean;
    isFeatured: boolean;
}

interface TherapyFormData {
    id?: string;
    name: string;
    slug: string;
    description: string;
    durationMinutes: number;
    basePrice: number;
    discountType: 'none' | 'percentage' | 'flat';
    discountValue: number;
    discountExpiry?: string;
    categoryId: string;
    imageUrl?: string;
    isActive: boolean;
    isFeatured: boolean;
}

export function AdminTherapiesPage() {
    const [therapies, setTherapies] = useState<Therapy[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<TherapyFormData>({
        name: '',
        slug: '',
        description: '',
        durationMinutes: 30,
        basePrice: 0,
        discountType: 'none',
        discountValue: 0,
        categoryId: '',
        imageUrl: '',
        isActive: true,
        isFeatured: false,
    });
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [uploadingImage, setUploadingImage] = useState(false);

    useEffect(() => {
        fetchTherapies();
        fetchCategories();
    }, [page, search]);

    const fetchTherapies = async () => {
        setLoading(true);
        try {
            const response = await api.get('/api/admin/therapies', {
                params: { page, limit: 10, search },
            });

            // API returns { success, data: { therapies, pagination }, message }
            const responseData = response.data.data || response.data;
            setTherapies(responseData.therapies);
            setTotalPages(responseData.pagination.totalPages);
        } catch (err) {
            setError('Failed to fetch therapies');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await api.get('/api/categories?type=THERAPY');
            // API returns { success, data, message }
            const responseData = response.data.data || response.data;
            setCategories(Array.isArray(responseData) ? responseData : []);
        } catch (err) {
            console.error('Failed to fetch categories:', err);
        }
    };

    const calculateDiscountedPrice = (): number => {
        if (formData.discountType === 'none' || formData.discountValue === 0) {
            return formData.basePrice;
        }
        
        if (formData.discountType === 'percentage') {
            return formData.basePrice - (formData.basePrice * formData.discountValue / 100);
        }
        
        return formData.basePrice - formData.discountValue;
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);
        const formDataUpload = new FormData();
        formDataUpload.append('image', file);

        try {
            const response = await api.post('/api/admin/upload', formDataUpload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // API returns { success, data: { url }, message }
            const responseData = response.data.data || response.data;
            setFormData({ ...formData, imageUrl: responseData.url });
        } catch (err) {
            setError('Failed to upload image');
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSave = async () => {
        setError('');
        setSuccess('');

        if (!formData.name || !formData.slug || !formData.categoryId) {
            setError('Please fill in all required fields');
            return;
        }

        const discountedPrice = formData.discountType !== 'none' ? calculateDiscountedPrice() : null;

        const payload = {
            name: formData.name,
            slug: formData.slug,
            description: formData.description,
            durationMinutes: formData.durationMinutes,
            basePrice: formData.basePrice,
            discountedPrice,
            discountExpiry: formData.discountExpiry || null,
            categoryId: formData.categoryId,
            imageUrl: formData.imageUrl || null,
            isActive: formData.isActive,
            isFeatured: formData.isFeatured,
        };

        try {
            if (editingId) {
                await api.put(`/api/admin/therapies/${editingId}`, payload);
                setSuccess('Therapy updated successfully');
            } else {
                await api.post('/api/admin/therapies', payload);
                setSuccess('Therapy created successfully');
            }

            setShowForm(false);
            setEditingId(null);
            resetForm();
            fetchTherapies();
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to save therapy');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            slug: '',
            description: '',
            durationMinutes: 30,
            basePrice: 0,
            discountType: 'none',
            discountValue: 0,
            categoryId: '',
            imageUrl: '',
            isActive: true,
            isFeatured: false,
        });
    };

    const handleEdit = (therapy: Therapy) => {
        const discountType = therapy.discountedPrice 
            ? (therapy.basePrice - therapy.discountedPrice) / therapy.basePrice > 0.5 
                ? 'flat' 
                : 'percentage'
            : 'none';
        
        const discountValue = therapy.discountedPrice
            ? discountType === 'percentage'
                ? ((therapy.basePrice - therapy.discountedPrice) / therapy.basePrice) * 100
                : therapy.basePrice - therapy.discountedPrice
            : 0;

        setFormData({
            name: therapy.name,
            slug: therapy.slug,
            description: therapy.description,
            durationMinutes: therapy.durationMinutes,
            basePrice: therapy.basePrice,
            discountType,
            discountValue,
            discountExpiry: therapy.discountExpiry || '',
            categoryId: therapy.categoryId,
            imageUrl: therapy.imageUrl || '',
            isActive: therapy.isActive,
            isFeatured: therapy.isFeatured,
        });
        setEditingId(therapy.id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this therapy?')) return;

        try {
            await api.delete(`/api/admin/therapies/${id}`);
            setSuccess('Therapy deleted successfully');
            fetchTherapies();
        } catch (err) {
            setError('Failed to delete therapy');
        }
    };

    const discountedPrice = calculateDiscountedPrice();
    const savingsAmount = formData.basePrice - discountedPrice;
    const savingsPercentage = formData.basePrice > 0 ? (savingsAmount / formData.basePrice) * 100 : 0;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Therapies Management</h1>
                <p className="text-gray-600 mt-1">Manage your clinic therapies and treatments</p>
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
                        {editingId ? 'Edit Therapy' : 'Add New Therapy'}
                    </h2>

                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Therapy Name *
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
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Duration (minutes) *
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.durationMinutes}
                                        onChange={(e) => setFormData({ ...formData, durationMinutes: parseInt(e.target.value) || 0 })}
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
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Base Price (₹) *
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.basePrice}
                                        onChange={(e) => setFormData({ ...formData, basePrice: parseFloat(e.target.value) || 0 })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Discount Type
                                    </label>
                                    <select
                                        value={formData.discountType}
                                        onChange={(e) => setFormData({ ...formData, discountType: e.target.value as any })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                                    >
                                        <option value="none">No Discount</option>
                                        <option value="percentage">Percentage (%)</option>
                                        <option value="flat">Flat Amount (₹)</option>
                                    </select>
                                </div>
                            </div>

                            {formData.discountType !== 'none' && (
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Discount Value {formData.discountType === 'percentage' ? '(%)' : '(₹)'}
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.discountValue}
                                            onChange={(e) => setFormData({ ...formData, discountValue: parseFloat(e.target.value) || 0 })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Discount Expiry Date
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.discountExpiry}
                                            onChange={(e) => setFormData({ ...formData, discountExpiry: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                                        />
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Image Upload
                                </label>
                                <div className="flex gap-4 items-center">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                                    />
                                    {uploadingImage && <Loader className="animate-spin" size={20} />}
                                </div>
                                {formData.imageUrl && (
                                    <div className="mt-2 relative inline-block">
                                        <img src={formData.imageUrl} alt="Preview" className="h-20 w-20 object-cover rounded" />
                                        <button
                                            onClick={() => setFormData({ ...formData, imageUrl: '' })}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-6">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.isActive}
                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        className="w-4 h-4"
                                    />
                                    <span className="text-sm font-medium text-gray-700">Active</span>
                                </label>

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

                        {/* Preview Panel */}
                        <div className="col-span-1">
                            <div className="sticky top-6">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Card Preview</h3>
                                <div className="bg-white border-2 border-gray-200 rounded-xl p-4 shadow-sm">
                                    {formData.imageUrl && (
                                        <img src={formData.imageUrl} alt="Preview" className="w-full h-32 object-cover rounded-lg mb-3" />
                                    )}
                                    <h4 className="font-bold text-gray-900 mb-1">{formData.name || 'Therapy Name'}</h4>
                                    <p className="text-xs text-gray-600 mb-2">{formData.durationMinutes} mins</p>
                                    
                                    <div className="flex items-center gap-2 mb-2">
                                        {formData.discountType !== 'none' && formData.discountValue > 0 ? (
                                            <>
                                                <span className="text-lg font-bold text-lotus-pink">₹{discountedPrice.toFixed(2)}</span>
                                                <span className="text-sm text-gray-500 line-through">₹{formData.basePrice.toFixed(2)}</span>
                                            </>
                                        ) : (
                                            <span className="text-lg font-bold text-gray-900">₹{formData.basePrice.toFixed(2)}</span>
                                        )}
                                    </div>

                                    {formData.discountType !== 'none' && formData.discountValue > 0 && (
                                        <div className="inline-block bg-gold text-white text-xs font-semibold px-2 py-1 rounded">
                                            Save {savingsPercentage.toFixed(0)}% (₹{savingsAmount.toFixed(2)})
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={handleSave}
                            className="px-6 py-2 bg-lotus-pink text-white rounded-lg hover:bg-pink-600 transition"
                        >
                            Save Therapy
                        </button>
                        <button
                            onClick={() => {
                                setShowForm(false);
                                setEditingId(null);
                                resetForm();
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
                                    placeholder="Search therapies..."
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
                                    resetForm();
                                }}
                                className="flex items-center gap-2 px-6 py-2 bg-lotus-pink text-white rounded-lg hover:bg-pink-600"
                            >
                                <Plus size={20} />
                                Add Therapy
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Therapy</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Duration</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Base Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Discounted Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Discount Expiry</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={8} className="px-6 py-8 text-center">
                                                <Loader className="inline animate-spin" />
                                            </td>
                                        </tr>
                                    ) : therapies.length > 0 ? (
                                        therapies.map((therapy) => (
                                            <tr key={therapy.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 font-medium text-gray-900">{therapy.name}</td>
                                                <td className="px-6 py-4 text-gray-600">{therapy.category.name}</td>
                                                <td className="px-6 py-4 text-gray-600">{therapy.durationMinutes} min</td>
                                                <td className="px-6 py-4 font-semibold text-gray-900">₹{therapy.basePrice}</td>
                                                <td className="px-6 py-4">
                                                    {therapy.discountedPrice ? (
                                                        <span className="font-semibold text-lotus-pink">₹{therapy.discountedPrice}</span>
                                                    ) : (
                                                        <span className="text-gray-400">—</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">
                                                    {therapy.discountExpiry ? new Date(therapy.discountExpiry).toLocaleDateString() : '—'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-1">
                                                        <span
                                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                                therapy.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                            }`}
                                                        >
                                                            {therapy.isActive ? 'Active' : 'Inactive'}
                                                        </span>
                                                        {therapy.isFeatured && (
                                                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gold text-white">
                                                                Featured
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(therapy)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(therapy.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                                                No therapies found
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
