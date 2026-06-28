import { useState, useEffect, useRef } from 'react';
import { Upload, Trash2, Edit2, Loader, X, Image as ImageIcon, Video, Filter } from 'lucide-react';
import api from '../../lib/axios';

interface GalleryItem {
    id: string;
    type: 'PHOTO' | 'VIDEO';
    url: string;
    thumbnailUrl?: string;
    category: string;
    caption?: string;
    sortOrder: number;
    isActive: boolean;
}

interface UploadFormData {
    file: File;
    category: string;
    caption: string;
    sortOrder: number;
}

const CATEGORIES = [
    'Clinic Interior',
    'Therapy Sessions',
    'Team & Doctors',
    'Patient Moments',
    'Events & Camps',
    'Product Showcase',
    'Before & After',
    'Facilities',
];

export function AdminGalleryPage() {
    const [activeTab, setActiveTab] = useState<'PHOTO' | 'VIDEO'>('PHOTO');
    const [loading, setLoading] = useState(false);
    const [gallery, setGallery] = useState<GalleryItem[]>([]);
    const [filteredGallery, setFilteredGallery] = useState<GalleryItem[]>([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [uploadQueue, setUploadQueue] = useState<UploadFormData[]>([]);
    const [uploading, setUploading] = useState(false);
    const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
    const [draggedItem, setDraggedItem] = useState<GalleryItem | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchGallery();
    }, []);

    useEffect(() => {
        filterGallery();
    }, [gallery, activeTab, selectedCategory]);

    const fetchGallery = async () => {
        setLoading(true);
        try {
            const response = await api.get('/api/gallery');
            // API returns { success, data, message }
            const responseData = response.data.data || response.data;
            setGallery(Array.isArray(responseData) ? responseData : []);
        } catch (err) {
            setError('Failed to fetch gallery items');
        } finally {
            setLoading(false);
        }
    };

    const filterGallery = () => {
        let filtered = gallery.filter(item => item.type === activeTab);
        
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(item => item.category === selectedCategory);
        }
        
        filtered.sort((a, b) => a.sortOrder - b.sortOrder);
        setFilteredGallery(filtered);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        const newUploads: UploadFormData[] = files.map((file, index) => ({
            file,
            category: CATEGORIES[0],
            caption: '',
            sortOrder: gallery.length + index,
        }));

        setUploadQueue(newUploads);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const files = Array.from(e.dataTransfer.files);
        if (files.length === 0) return;

        const newUploads: UploadFormData[] = files.map((file, index) => ({
            file,
            category: CATEGORIES[0],
            caption: '',
            sortOrder: gallery.length + index,
        }));

        setUploadQueue(newUploads);
    };

    const updateUploadItem = (index: number, field: keyof UploadFormData, value: any) => {
        setUploadQueue(prev => prev.map((item, i) => 
            i === index ? { ...item, [field]: value } : item
        ));
    };

    const removeFromQueue = (index: number) => {
        setUploadQueue(prev => prev.filter((_, i) => i !== index));
    };

    const handleUploadAll = async () => {
        if (uploadQueue.length === 0) return;

        setUploading(true);
        setError('');
        
        try {
            for (const item of uploadQueue) {
                const formData = new FormData();
                formData.append('file', item.file);
                formData.append('type', item.file.type.startsWith('video/') ? 'VIDEO' : 'PHOTO');
                formData.append('category', item.category);
                formData.append('caption', item.caption);
                formData.append('sortOrder', item.sortOrder.toString());

                await api.post('/api/admin/gallery', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }

            setSuccess(`Successfully uploaded ${uploadQueue.length} items`);
            setUploadQueue([]);
            fetchGallery();
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to upload items');
        } finally {
            setUploading(false);
        }
    };

    const handleEdit = async (item: GalleryItem) => {
        setEditingItem(item);
    };

    const handleUpdateItem = async () => {
        if (!editingItem) return;

        try {
            await api.put(`/api/admin/gallery/${editingItem.id}`, {
                category: editingItem.category,
                caption: editingItem.caption,
                sortOrder: editingItem.sortOrder,
                isActive: editingItem.isActive,
            });

            setSuccess('Item updated successfully');
            setEditingItem(null);
            fetchGallery();
        } catch (err) {
            setError('Failed to update item');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return;

        try {
            await api.delete(`/api/admin/gallery/${id}`);
            setSuccess('Item deleted successfully');
            fetchGallery();
        } catch (err) {
            setError('Failed to delete item');
        }
    };

    const handleDragStart = (item: GalleryItem) => {
        setDraggedItem(item);
    };

    const handleDragEnd = () => {
        setDraggedItem(null);
    };

    const handleDropOnItem = async (targetItem: GalleryItem) => {
        if (!draggedItem || draggedItem.id === targetItem.id) return;

        try {
            // Swap sort orders
            await api.put(`/api/admin/gallery/${draggedItem.id}`, {
                sortOrder: targetItem.sortOrder,
            });

            await api.put(`/api/admin/gallery/${targetItem.id}`, {
                sortOrder: draggedItem.sortOrder,
            });

            setSuccess('Order updated successfully');
            fetchGallery();
        } catch (err) {
            setError('Failed to update order');
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
                <p className="text-gray-600 mt-1">Manage clinic photos and videos</p>
            </div>

            {success && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 flex justify-between items-center">
                    <span>{success}</span>
                    <button onClick={() => setSuccess('')} className="text-green-600 hover:text-green-800">
                        <X size={18} />
                    </button>
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 flex justify-between items-center">
                    <span>{error}</span>
                    <button onClick={() => setError('')} className="text-red-600 hover:text-red-800">
                        <X size={18} />
                    </button>
                </div>
            )}

            {/* Upload Zone */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Bulk Upload</h2>
                
                <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-lotus-pink hover:bg-lotus-light/20 transition"
                >
                    <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-700 font-medium mb-1">
                        Drag and drop files here, or click to browse
                    </p>
                    <p className="text-sm text-gray-500">
                        Supports: JPG, PNG, GIF, MP4, WebM (Max 10MB per file)
                    </p>
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                </div>

                {/* Upload Queue */}
                {uploadQueue.length > 0 && (
                    <div className="mt-6 space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-gray-900">
                                {uploadQueue.length} file(s) ready to upload
                            </h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setUploadQueue([])}
                                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                                >
                                    Clear All
                                </button>
                                <button
                                    onClick={handleUploadAll}
                                    disabled={uploading}
                                    className="px-4 py-2 bg-lotus-pink text-white rounded-lg hover:bg-pink-600 disabled:opacity-50 flex items-center gap-2"
                                >
                                    {uploading ? (
                                        <>
                                            <Loader className="animate-spin" size={16} />
                                            Uploading...
                                        </>
                                    ) : (
                                        'Upload All'
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {uploadQueue.map((item, index) => (
                                <div key={index} className="bg-gray-50 rounded-lg p-4 flex gap-4">
                                    <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                                        {item.file.type.startsWith('video/') ? (
                                            <Video size={32} className="text-gray-500" />
                                        ) : (
                                            <ImageIcon size={32} className="text-gray-500" />
                                        )}
                                    </div>

                                    <div className="flex-1 grid grid-cols-3 gap-3">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                                Filename
                                            </label>
                                            <p className="text-sm text-gray-900 truncate">{item.file.name}</p>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                                Category
                                            </label>
                                            <select
                                                value={item.category}
                                                onChange={(e) => updateUploadItem(index, 'category', e.target.value)}
                                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-lotus-pink outline-none"
                                            >
                                                {CATEGORIES.map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                                Caption
                                            </label>
                                            <input
                                                type="text"
                                                value={item.caption}
                                                onChange={(e) => updateUploadItem(index, 'caption', e.target.value)}
                                                placeholder="Optional caption..."
                                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-lotus-pink outline-none"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => removeFromQueue(index)}
                                        className="text-red-600 hover:bg-red-50 p-2 rounded"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow">
                <div className="border-b border-gray-200">
                    <div className="flex">
                        <button
                            onClick={() => setActiveTab('PHOTO')}
                            className={`flex items-center gap-2 px-6 py-3 font-medium transition ${
                                activeTab === 'PHOTO'
                                    ? 'text-lotus-pink border-b-2 border-lotus-pink'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <ImageIcon size={20} />
                            Photos
                        </button>
                        <button
                            onClick={() => setActiveTab('VIDEO')}
                            className={`flex items-center gap-2 px-6 py-3 font-medium transition ${
                                activeTab === 'VIDEO'
                                    ? 'text-lotus-pink border-b-2 border-lotus-pink'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <Video size={20} />
                            Videos
                        </button>
                    </div>
                </div>

                {/* Category Filter */}
                <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                    <Filter size={20} className="text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Filter by category:</span>
                    <div className="flex gap-2 flex-wrap">
                        <button
                            onClick={() => setSelectedCategory('All')}
                            className={`px-3 py-1 text-sm rounded-full transition ${
                                selectedCategory === 'All'
                                    ? 'bg-lotus-pink text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            All
                        </button>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3 py-1 text-sm rounded-full transition ${
                                    selectedCategory === cat
                                        ? 'bg-lotus-pink text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Gallery Grid */}
                <div className="p-6">
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader className="animate-spin" size={32} />
                        </div>
                    ) : filteredGallery.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredGallery.map((item) => (
                                <div
                                    key={item.id}
                                    draggable
                                    onDragStart={() => handleDragStart(item)}
                                    onDragEnd={handleDragEnd}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={() => handleDropOnItem(item)}
                                    className={`relative group rounded-lg overflow-hidden bg-gray-200 aspect-square cursor-move ${
                                        draggedItem?.id === item.id ? 'opacity-50' : ''
                                    }`}
                                >
                                    {item.type === 'VIDEO' ? (
                                        <video
                                            src={item.url}
                                            className="w-full h-full object-cover"
                                            muted
                                        />
                                    ) : (
                                        <img
                                            src={item.thumbnailUrl || item.url}
                                            alt={item.caption || 'Gallery item'}
                                            className="w-full h-full object-cover"
                                        />
                                    )}

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                                        <div className="flex gap-2 mb-2">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <p className="text-white text-xs text-center px-2">
                                            Drag to reorder
                                        </p>
                                    </div>

                                    {/* Category Badge */}
                                    <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                                        {item.category}
                                    </div>

                                    {/* Caption */}
                                    {item.caption && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-2">
                                            {item.caption}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            No {activeTab.toLowerCase()}s found in this category.
                        </div>
                    )}
                </div>
            </div>

            {/* Edit Modal */}
            {editingItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Edit Gallery Item</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <select
                                    value={editingItem.category}
                                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                                >
                                    {CATEGORIES.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Caption
                                </label>
                                <textarea
                                    value={editingItem.caption || ''}
                                    onChange={(e) => setEditingItem({ ...editingItem, caption: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Sort Order
                                </label>
                                <input
                                    type="number"
                                    value={editingItem.sortOrder}
                                    onChange={(e) => setEditingItem({ ...editingItem, sortOrder: parseInt(e.target.value) || 0 })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={editingItem.isActive}
                                        onChange={(e) => setEditingItem({ ...editingItem, isActive: e.target.checked })}
                                        className="w-4 h-4"
                                    />
                                    <span className="text-sm font-medium text-gray-700">Active</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={handleUpdateItem}
                                className="flex-1 px-4 py-2 bg-lotus-pink text-white rounded-lg hover:bg-pink-600"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={() => setEditingItem(null)}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
