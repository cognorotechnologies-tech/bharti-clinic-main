import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, Search, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../lib/axios';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Input } from '../components/ui/Input';
import { Spinner } from '../components/ui/Spinner';
import { BlogCardSkeleton } from '../components/ui/LoadingSkeleton';
import { HeroBase } from '../components/hero/HeroBase';
import { SEO, SEO_CONFIGS } from '../components/SEO';

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    imageUrl: string | null;
    tags: string[];
    publishedAt: string;
    author: {
        id: string;
        name: string;
    };
}

export function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchPosts();
    }, [page]);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/api/blog?page=${page}&limit=9`);
            const responseData = response.data.data || response.data;
            setPosts(Array.isArray(responseData) ? responseData : []);

            // Get pagination from response
            if (response.data.pagination) {
                setTotalPages(response.data.pagination.totalPages);
            }
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            setPosts([]);
        } finally {
            setLoading(false);
        }
    };

    // Get all unique tags from posts
    const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

    // Filter posts based on search and tag
    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTag = !selectedTag || post.tags.includes(selectedTag);
        return matchesSearch && matchesTag;
    });

    const calculateReadingTime = (excerpt: string) => {
        const words = excerpt.split(' ').length;
        const minutes = Math.ceil(words / 200);
        return `${minutes} min read`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-ivory">
                <SEO {...SEO_CONFIGS.blog} />
                <section className="bg-gradient-to-br from-lotus-pink via-white to-ivory py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SectionTitle
                            title="Wellness Blog"
                            subtitle="Ayurvedic Wisdom & Health Tips"
                            align="center"
                        />
                    </div>
                </section>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <BlogCardSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-ivory">
            <SEO {...SEO_CONFIGS.blog} />
            {/* Hero Base */}
            <HeroBase
                title="Ayurvedic Wisdom & Wellness"
                subtitle="Blog"
                description="Explore ancient healing knowledge and modern wellness insights. Discover articles on holistic health, natural remedies, and mindful living."
                height="md"
                align="center"
                backgroundImage="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920"
            >
                <div className="max-w-2xl mx-auto w-full">
                    <Input
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        icon={<Search className="w-5 h-5" />}
                        className="bg-white/90 backdrop-blur-sm shadow-lg"
                    />
                </div>
            </HeroBase>

            {/* Tag Filters */}
            {allTags.length > 0 && (
                <section className="bg-white border-b border-lotus/10 py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-wrap justify-center gap-3">
                            <button
                                onClick={() => setSelectedTag(null)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!selectedTag
                                    ? 'bg-maroon text-white shadow-lg'
                                    : 'bg-white text-charcoal hover:bg-lotus-light border border-lotus/10'
                                    }`}
                            >
                                All Topics
                            </button>
                            {allTags.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedTag(tag)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedTag === tag
                                        ? 'bg-maroon text-white shadow-lg'
                                        : 'bg-white text-charcoal hover:bg-lotus-light border border-lotus/10'
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Blog Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-charcoal/60 text-lg">No articles found matching your criteria.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map((post, index) => (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                                >
                                    {/* Featured Image */}
                                    <Link to={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-lotus-light/20">
                                        {post.imageUrl ? (
                                            <img
                                                src={post.imageUrl}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <svg viewBox="0 0 24 24" className="w-20 h-20 text-lotus/20 fill-current">
                                                    <path d="M12 2L15 8H9L12 2ZM3 15C3 15 5 10 12 10C19 10 21 15 21 15C21 15 19 20 12 20C5 20 3 15 3 15Z" />
                                                </svg>
                                            </div>
                                        )}
                                    </Link>

                                    {/* Content */}
                                    <div className="p-6">
                                        {/* Tags */}
                                        {post.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {post.tags.slice(0, 2).map(tag => (
                                                    <span
                                                        key={tag}
                                                        className="inline-flex items-center gap-1 px-2 py-1 bg-lotus-light/30 text-maroon text-xs font-medium rounded-full"
                                                    >
                                                        <Tag className="w-3 h-3" />
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Title */}
                                        <Link to={`/blog/${post.slug}`}>
                                            <h3 className="font-display text-xl text-maroon mb-3 group-hover:text-lotus transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>
                                        </Link>

                                        {/* Excerpt */}
                                        <p className="text-charcoal/70 text-sm mb-4 line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        {/* Meta */}
                                        <div className="flex items-center justify-between text-xs text-charcoal/50 pt-4 border-t border-lotus/10">
                                            <div className="flex items-center gap-4">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {calculateReadingTime(post.excerpt)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Read More */}
                                        <Link
                                            to={`/blog/${post.slug}`}
                                            className="inline-block mt-4 text-sm font-semibold text-lotus hover:text-maroon transition-colors"
                                        >
                                            Read More →
                                        </Link>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-12">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-4 py-2 rounded-lg bg-white text-charcoal disabled:opacity-50 disabled:cursor-not-allowed hover:bg-lotus-light transition-colors"
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2 text-charcoal">
                                Page {page} of {totalPages}
                            </span>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="px-4 py-2 rounded-lg bg-white text-charcoal disabled:opacity-50 disabled:cursor-not-allowed hover:bg-lotus-light transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
