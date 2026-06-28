import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader } from 'lucide-react';
import api from '../../lib/axios';

interface Therapy {
    id: string;
    name: string;
    basePrice: number;
    discountedPrice?: number;
    durationMinutes: number;
}

interface Package {
    id: string;
    name: string;
    slug: string;
    description: string;
    totalPrice: number;
    originalPrice: number;
    validFrom?: string;
    validTo?: string;
    couponCode?: string;
    isActive: boolean;
    therapies: Therapy[];
}

interface PackageFormData {
    id?: string;
    name: string;
    slug: string;
    description: string;
    selectedTherapyIds: string[];
    totalPrice: number;
    originalPrice: number;
    validFrom: string;
    validTo: string;
    couponCode: string;
    isActive: boolean;
    autoCalculate: boolean;
}

export function AdminPackagesPage() {
    const [loading, setLoading] = useState(false);
    const [packages, setPackages] = useState<Package[]>([]);
    const [therapies, setTherapies] = useState<Therapy[]>([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<PackageFormData>({
        name: '',
        slug: '',
        description: '',
        selectedTherapyIds: [],
        totalPrice: 0,
        originalPrice: 0,
        validFrom: '',
        validTo: '',
        couponCode: '',
        isActive: true,
        autoCalculate: true,
    });

    useEffect(() => {
        fetchPackages();
        fetchTherapies();
    }, []);

    useEffect(() => {
        if (formData.autoCalculate && formData.selectedTherapyIds.length > 0) {
            calculatePrices();
        }
    }, [formData.selectedTherapyIds, formData.autoCalculate]);

    const fetchPackages = async () => {
        setLoading(true);
        try {
            const response = await api.get('/api/admin/packages');
            // API returns { success, data: { packages }, message }
            const responseData = response.data.data || response.data;
            setPackages(responseData.packages || responseData);
        } catch (err) {
            setError('Failed to fetch packages');
        } finally {
            setLoading(false);
        }
    };

    const fetchTherapies = async () => {
        try {
            const response = await api.get('/api/therapies');
            // API returns { success, data, message }
            const responseData = response.data.data || response.data;
            setTherapies(Array.isArray(responseData) ? responseData : []);
        } catch (err) {
            console.error('Failed to fetch therapies:', err);
        }
    };

    const calculatePrices = () => {
        const selectedTherapies = therapies.filter(t => formData.selectedTherapyIds.includes(t.id));
        const originalPrice = selectedTherapies.reduce((sum, t) => sum + Number(t.basePrice), 0);
        const totalPrice = selectedTherapies.reduce((sum, t) => sum + Number(t.discountedPrice || t.basePrice), 0);
        
        setFormData(prev => ({
            ...prev,
            originalPrice,
            totalPrice,
        }));
    };

    const handleTherapyToggle = (therapyId: string) => {
        setFormData(prev => ({
            ...prev,
            selectedTherapyIds: prev.selectedTherapyIds.includes(therapyId)
                ? prev.selectedTherapyIds.filter(id => id !== therapyId)
                : [...prev.selectedTherapyIds, therapyId],
        }));
    };

    const handleSave = async () => {
        setError('');
        setSuccess('');

        if (!formData.name || !formData.slug || formData.selectedTherapyIds.length === 0) {
            setError('Please fill in all required fields and select at least one therapy');
            return;
        }

        const payload = {
            name: formData.name,
            slug: formData.slug,
            description: formData.description,
            therapyIds: formData.selectedTherapyIds,
            totalPrice: formData.totalPrice,
            originalPrice: formData.originalPrice,
            validFrom: formData.validFrom || null,
            validTo: formData.validTo || null,
            couponCode: formData.couponCode || null,
            isActive: formData.isActive,
        };

        try {
            if (editingId) {
                await api.put(`/api/admin/packages/${editingId}`, payload);
                setSuccess('Package updated successfully');
            } else {
                await api.post('/api/admin/packages', payload);
                setSuccess('Package created successfully');
            }

            setShowForm(false);
            setEditingId(null);
            resetForm();
            fetchPackages();
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to save package');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            slug: '',
            description: '',
            selectedTherapyIds: [],
            totalPrice: 0,
            originalPrice: 0,
            validFrom: '',
            validTo: '',
            couponCode: '',
            isActive: true,
            autoCalculate: true,
        });
    };

    const handleEdit = (pkg: Package) => {
        setFormData({
            name: pkg.name,
            slug: pkg.slug,
            description: pkg.description,
            selectedTherapyIds: Array.isArray(pkg.therapies) ? pkg.therapies.map(t => t.id) : [],
            totalPrice: Number(pkg.totalPrice),
            originalPrice: Number(pkg.originalPrice),
            validFrom: pkg.validFrom ? pkg.validFrom.split('T')[0] : '',
            validTo: pkg.validTo ? pkg.validTo.split('T')[0] : '',
            couponCode: pkg.couponCode || '',
            isActive: pkg.isActive,
            autoCalculate: false,
        });
        setEditingId(pkg.id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this package?')) return;

        try {
            await api.delete(`/api/admin/packages/${id}`);
            setSuccess('Package deleted successfully');
            fetchPackages();
        } catch (err) {
            setError('Failed to delete package');
        }
    };

    const savingsAmount = formData.originalPrice - formData.totalPrice;
    const savingsPercentage = formData.originalPrice > 0 ? (savingsAmount / formData.originalPrice) * 100 : 0;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Packages Management</h1>
                <p className="text-gray-600 mt-1">Create and manage therapy packages and bundles</p>
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
                onClick={() => {
                    setShowForm(true);
                    setEditingId(null);
                    resetForm();
                }}
                className="flex items-center gap-2 px-6 py-2 bg-lotus-pink text-white rounded-lg hover:bg-pink-600"
            >
                <Plus size={20} />
                Add Package
            </button>

            {showForm && (
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                        {editingId ? 'Edit Package' : 'Create New Package'}
                    </h2>

                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Package Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                                        placeholder="e.g., Stress Relief Bundle"
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
                                        placeholder="stress-relief-bundle"
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
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                                    placeholder="Describe the package benefits..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select Therapies * (Multi-select)
                                </label>
                                <div className="border border-gray-300 rounded-lg p-4 max-h-64 overflow-y-auto space-y-2">
                                    {therapies.map((therapy) => (
                                        <label key={therapy.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.selectedTherapyIds.includes(therapy.id)}
                                                onChange={() => handleTherapyToggle(therapy.id)}
                                                className="w-4 h-4"
                                            />
                                            <div className="flex-1">
                                                <span className="font-medium text-gray-900">{therapy.name}</span>
                                                <span className="text-sm text-gray-600 ml-2">
                                                    ({therapy.durationMinutes} min)
                                                </span>
                                            </div>
                                            <span className="text-sm font-semibold text-gray-700">
                                                ₹{therapy.discountedPrice || therapy.basePrice}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    {formData.selectedTherapyIds.length} therapies selected
                                </p>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 mb-3">
                                    <input
                                        type="checkbox"
                                        checked={formData.autoCalculate}
                                        onChange={(e) => setFormData({ ...formData, autoCalculate: e.target.checked })}
                                        className="w-4 h-4"
                                    />
                                    <span className="text-sm font-medium text-gray-700">
                                        Auto-calculate prices from selected therapies
                                    </span>
                                </label>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Original Price (₹) *
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.originalPrice}
                                            onChange={(e) => setFormData({ ...formData, originalPrice: parseFloat(e.target.value) || 0 })}
                                            disabled={formData.autoCalculate}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none disabled:bg-gray-100"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Total Price (₹) *
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.totalPrice}
                                            onChange={(e) => setFormData({ ...formData, totalPrice: parseFloat(e.target.value) || 0 })}
                                            disabled={formData.autoCalculate}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none disabled:bg-gray-100"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Valid From
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.validFrom}
                                        onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Valid To
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.validTo}
                                        onChange={(e) => setFormData({ ...formData, validTo: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Coupon Code (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={formData.couponCode}
                                    onChange={(e) => setFormData({ ...formData, couponCode: e.target.value.toUpperCase() })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                                    placeholder="WELLNESS2026"
                                />
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
                        </div>

                        {/* Preview Panel */}
                        <div className="col-span-1">
                            <div className="sticky top-6">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Package Preview</h3>
                                <div className="bg-gradient-to-br from-lotus-light to-white border-2 border-lotus rounded-xl p-5 shadow-lg">
                                    <h4 className="font-bold text-gray-900 text-lg mb-2">
                                        {formData.name || 'Package Name'}
                                    </h4>
                                    <p className="text-sm text-gray-600 mb-4">
                                        {formData.description || 'Package description will appear here...'}
                                    </p>

                                    <div className="bg-white rounded-lg p-3 mb-3">
                                        <p className="text-xs text-gray-500 mb-2">Includes:</p>
                                        <ul className="space-y-1">
                                            {formData.selectedTherapyIds.slice(0, 3).map(id => {
                                                const therapy = therapies.find(t => t.id === id);
                                                return therapy ? (
                                                    <li key={id} className="text-xs text-gray-700">
                                                        ✓ {therapy.name}
                                                    </li>
                                                ) : null;
                                            })}
                                            {formData.selectedTherapyIds.length > 3 && (
                                                <li className="text-xs text-gray-500">
                                                    + {formData.selectedTherapyIds.length - 3} more
                                                </li>
                                            )}
                                        </ul>
                                    </div>

                                    <div className="flex items-center gap-3 mb-3">
                                        <div>
                                            <span className="text-2xl font-bold text-lotus-deep">
                                                ₹{formData.totalPrice.toFixed(2)}
                                            </span>
                                        </div>
                                        {savingsAmount > 0 && (
                                            <div>
                                                <span className="text-sm text-gray-500 line-through">
                                                    ₹{formData.originalPrice.toFixed(2)}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {savingsAmount > 0 && (
                                        <div className="inline-block bg-gold text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                                            SAVE {savingsPercentage.toFixed(0)}% (₹{savingsAmount.toFixed(2)})
                                        </div>
                                    )}

                                    {formData.couponCode && (
                                        <div className="bg-maroon text-white text-xs font-mono px-2 py-1 rounded inline-block">
                                            CODE: {formData.couponCode}
                                        </div>
                                    )}

                                    {formData.validTo && (
                                        <p className="text-xs text-gray-600 mt-3">
                                            Valid until {new Date(formData.validTo).toLocaleDateString()}
                                        </p>
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
                            Save Package
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

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader className="animate-spin" size={32} />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packages.map((pkg: Package) => {
                        const savings = Number(pkg.originalPrice) - Number(pkg.totalPrice);
                        const savingsPercent = pkg.originalPrice > 0 ? (savings / Number(pkg.originalPrice)) * 100 : 0;

                        return (
                            <div key={pkg.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 border border-gray-200">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-lg font-bold text-gray-900">{pkg.name}</h3>
                                    {!pkg.isActive && (
                                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                                            Inactive
                                        </span>
                                    )}
                                </div>

                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>

                                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                                    <p className="text-xs text-gray-500 mb-2">Includes {Array.isArray(pkg.therapies) ? pkg.therapies.length : 0} therapies:</p>
                                    <ul className="space-y-1">
                                        {Array.isArray(pkg.therapies) && pkg.therapies.slice(0, 2).map((therapy) => (
                                            <li key={therapy.id} className="text-xs text-gray-700">
                                                ✓ {therapy.name}
                                            </li>
                                        ))}
                                        {Array.isArray(pkg.therapies) && pkg.therapies.length > 2 && (
                                            <li className="text-xs text-gray-500">
                                                + {pkg.therapies.length - 2} more
                                            </li>
                                        )}
                                    </ul>
                                </div>

                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-2xl font-bold text-lotus-pink">₹{pkg.totalPrice}</span>
                                    {savings > 0 && (
                                        <span className="text-sm text-gray-500 line-through">₹{pkg.originalPrice}</span>
                                    )}
                                </div>

                                {savings > 0 && (
                                    <div className="inline-block bg-gold text-white text-xs font-semibold px-2 py-1 rounded mb-3">
                                        Save {savingsPercent.toFixed(0)}%
                                    </div>
                                )}

                                {pkg.couponCode && (
                                    <div className="bg-maroon text-white text-xs font-mono px-2 py-1 rounded inline-block mb-3 ml-2">
                                        {pkg.couponCode}
                                    </div>
                                )}

                                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                                    <button
                                        onClick={() => handleEdit(pkg)}
                                        className="flex-1 flex items-center justify-center gap-2 p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                                    >
                                        <Edit2 size={16} />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(pkg.id)}
                                        className="flex-1 flex items-center justify-center gap-2 p-2 text-red-600 hover:bg-red-50 rounded transition"
                                    >
                                        <Trash2 size={16} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    {packages.length === 0 && !loading && (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            No packages found. Create your first package to get started.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
