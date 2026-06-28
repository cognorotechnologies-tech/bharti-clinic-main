import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Eye, Search, ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import api from '../../lib/axios';

// Types
interface Author {
    id: string;
    name: string;
}

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    imageUrl?: string;
    tags: string[];
    status: 'DRAFT' | 'PUBLISHED';
    authorId: string;
    author: Author;
    createdAt: string;
    publishedAt?: string;
}

interface BlogPostFormData {
    id?: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    imageUrl?: string;
    tags: string[];
    status: 'DRAFT' | 'PUBLISHED';
}

export function AdminBlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<BlogPostFormData>({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        imageUrl: '',
        tags: [],
        status: 'DRAFT'
    });

    // UI states
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchPosts();
    }, [page]);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            // Must fetch from admin route to get drafts
            const response = await api.get('/api/admin/blog', {
                params: { page, limit: 10 }
            });
            const responseData = response.data.data || response.data;
            setPosts(responseData.posts || []);
            setTotalPages(responseData.pagination?.totalPages || 1);
        } catch (err) {
            console.error('Failed to fetch blog posts:', err);
            setError('Failed to load blog posts');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setError('');
        setSuccess('');

        if (!formData.title || !formData.slug || !formData.content || !formData.excerpt) {
            setError('Please fill in all required fields (Title, Slug, Excerpt, Content)');
            return;
        }

        try {
            if (editingId) {
                await api.put(`/api/admin/blog/${editingId}`, formData);
                setSuccess('Blog post updated successfully');
            } else {
                await api.post('/api/admin/blog', formData);
                setSuccess('Blog post created successfully');
            }

            setShowForm(false);
            setEditingId(null);
            setFormData({
                title: '',
                slug: '',
                content: '',
                excerpt: '',
                imageUrl: '',
                tags: [],
                status: 'DRAFT'
            });

            fetchPosts();
        } catch (err: any) {
            setError(err.response?.data?.error || err.response?.data?.message || 'Failed to save blog post');
        }
    };

    const handleEdit = (post: BlogPost) => {
        setFormData({
            title: post.title,
            slug: post.slug,
            content: post.content,
            excerpt: post.excerpt,
            imageUrl: post.imageUrl || '',
            tags: post.tags || [],
            status: post.status
        });
        setEditingId(post.id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this blog post?')) return;

        try {
            await api.delete(`/api/admin/blog/${id}`);
            setSuccess('Blog post deleted successfully');
            fetchPosts();
        } catch (err) {
            setError('Failed to delete blog post');
        }
    };

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const tagsArray = value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
        setFormData({ ...formData, tags: tagsArray });
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
                <p className="text-gray-600 mt-1">Create and manage blog posts</p>
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
                        {editingId ? 'Edit Post' : 'Add New Post'}
                    </h2>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title *
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                            />
                        </div>

                        <div className="col-span-1">
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
                                Excerpt *
                            </label>
                            <textarea
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                rows={2}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Content *
                            </label>
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                rows={10}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none font-mono text-sm"
                            />
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Cover Image URL
                            </label>
                            <input
                                type="text"
                                value={formData.imageUrl || ''}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                                placeholder="/images/blog/default.jpg"
                            />
                        </div>

                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tags (comma separated)
                            </label>
                            <input
                                type="text"
                                value={formData.tags.join(', ')}
                                onChange={handleTagsChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                                placeholder="ayurveda, health, tips"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'DRAFT' | 'PUBLISHED' })}
                                className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lotus-pink outline-none"
                            >
                                <option value="DRAFT">Draft</option>
                                <option value="PUBLISHED">Published</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={handleSave}
                            className="px-6 py-2 bg-lotus-pink text-white rounded-lg hover:bg-pink-600 transition"
                        >
                            Save Post
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
                            <div className="flex-1"></div>
                            <button
                                onClick={() => {
                                    setShowForm(true);
                                    setEditingId(null);
                                    setFormData({
                                        title: '',
                                        slug: '',
                                        content: '',
                                        excerpt: '',
                                        imageUrl: '',
                                        tags: [],
                                        status: 'DRAFT'
                                    });
                                }}
                                className="flex items-center gap-2 px-6 py-2 bg-lotus-pink text-white rounded-lg hover:bg-pink-600"
                            >
                                <Plus size={20} />
                                New Post
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {loading ? (
                                <div className="p-8 text-center text-gray-500 flex justify-center">
                                    <Loader className="animate-spin" />
                                </div>
                            ) : posts.length > 0 ? (
                                posts.map((post: BlogPost) => (
                                    <div key={post.id} className="bg-white border rounded-lg p-6 flex justify-between items-start hover:shadow-md transition">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900">{post.title}</h3>
                                            <p className="text-gray-600 mt-2 line-clamp-2">{post.excerpt}</p>

                                            <div className="flex gap-4 mt-4 items-center">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${post.status === 'PUBLISHED'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {post.status}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    By: {post.author?.name || 'Unknown'}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    Date: {new Date(post.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 ml-4">
                                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                                                onClick={() => window.open(`/blog/${post.slug}`, '_blank')}>
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(post)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center text-gray-500">
                                    No blog posts found
                                </div>
                            )}
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
