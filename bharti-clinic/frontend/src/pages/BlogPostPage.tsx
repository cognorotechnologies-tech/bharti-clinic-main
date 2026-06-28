import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import api from '../lib/axios';
import { Spinner } from '../components/ui/Spinner';
import { SEO } from '../components/SEO';

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    imageUrl: string | null;
    tags: string[];
    publishedAt: string;
    author: {
        id: string;
        name: string;
    };
}

export function BlogPostPage() {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            fetchPost();
            fetchRelatedPosts();
        }
    }, [slug]);

    const fetchPost = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/api/blog/${slug}`);
            const responseData = response.data.data || response.data;
            setPost(responseData);
        } catch (error) {
            console.error('Error fetching blog post:', error);
            setPost(null);
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedPosts = async () => {
        try {
            const response = await api.get(`/api/blog?limit=3`);
            const responseData = response.data.data || response.data;
            setRelatedPosts(Array.isArray(responseData) ? responseData.slice(0, 3) : []);
        } catch (error) {
            console.error('Error fetching related posts:', error);
        }
    };

    const calculateReadingTime = (content: string) => {
        const words = content.split(' ').length;
        const minutes = Math.ceil(words / 200);
        return `${minutes} min read`;
    };

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareTitle = post?.title || '';

    const handleShare = (platform: string) => {
        const urls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
        };
        window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-ivory">
                <div className="text-center">
                    <h1 className="text-4xl font-display text-maroon mb-4">Post Not Found</h1>
                    <p className="text-charcoal/60 mb-8">The blog post you're looking for doesn't exist.</p>
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-maroon text-white rounded-lg hover:bg-lotus transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    const schemaData = post ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "image": post.imageUrl ? [post.imageUrl] : [],
        "datePublished": post.publishedAt,
        "author": [{
            "@type": "Person",
            "name": post.author.name
        }],
        "description": post.excerpt
    } : undefined;

    return (
        <div className="min-h-screen bg-ivory">
            {post && (
                <SEO
                    title={`${post.title} | Bharti Clinic Blog`}
                    description={post.excerpt}
                    image={post.imageUrl || undefined}
                    schemaData={schemaData}
                />
            )}
            {/* Back Button */}
            <div className="bg-white border-b border-lotus/10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-maroon transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog
                    </Link>
                </div>
            </div>

            {/* Article Header */}
            <article className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Tags */}
                    {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1 px-3 py-1 bg-lotus-light/30 text-maroon text-sm font-medium rounded-full"
                                >
                                    <Tag className="w-3 h-3" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-4xl md:text-5xl text-maroon mb-6 leading-tight"
                    >
                        {post.title}
                    </motion.h1>

                    {/* Meta Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-wrap items-center gap-6 text-sm text-charcoal/60 mb-8 pb-8 border-b border-lotus/10"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-lotus-light flex items-center justify-center text-maroon font-semibold">
                                {post.author.name.charAt(0)}
                            </div>
                            <span className="font-medium text-charcoal">{post.author.name}</span>
                        </div>
                        <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {calculateReadingTime(post.content)}
                        </span>
                    </motion.div>

                    {/* Featured Image */}
                    {post.imageUrl && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-12 shadow-2xl"
                        >
                            <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    )}

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="prose prose-lg max-w-none mb-12"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Share Buttons */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center gap-4 py-8 border-t border-b border-lotus/10"
                    >
                        <span className="text-sm font-semibold text-charcoal flex items-center gap-2">
                            <Share2 className="w-4 h-4" />
                            Share this article:
                        </span>
                        <button
                            onClick={() => handleShare('facebook')}
                            className="p-2 rounded-full bg-[#1877F2] text-white hover:opacity-80 transition-opacity"
                            aria-label="Share on Facebook"
                        >
                            <Facebook className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => handleShare('twitter')}
                            className="p-2 rounded-full bg-[#1DA1F2] text-white hover:opacity-80 transition-opacity"
                            aria-label="Share on Twitter"
                        >
                            <Twitter className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => handleShare('linkedin')}
                            className="p-2 rounded-full bg-[#0A66C2] text-white hover:opacity-80 transition-opacity"
                            aria-label="Share on LinkedIn"
                        >
                            <Linkedin className="w-4 h-4" />
                        </button>
                    </motion.div>
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="font-display text-3xl text-maroon mb-8 text-center">Related Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedPosts.map(relatedPost => (
                                <Link
                                    key={relatedPost.id}
                                    to={`/blog/${relatedPost.slug}`}
                                    className="group"
                                >
                                    <div className="bg-ivory rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
                                        <div className="relative aspect-[16/10] bg-lotus-light/20">
                                            {relatedPost.imageUrl ? (
                                                <img
                                                    src={relatedPost.imageUrl}
                                                    alt={relatedPost.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <svg viewBox="0 0 24 24" className="w-16 h-16 text-lotus/20 fill-current">
                                                        <path d="M12 2L15 8H9L12 2ZM3 15C3 15 5 10 12 10C19 10 21 15 21 15C21 15 19 20 12 20C5 20 3 15 3 15Z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <h3 className="font-display text-lg text-maroon mb-2 group-hover:text-lotus transition-colors line-clamp-2">
                                                {relatedPost.title}
                                            </h3>
                                            <p className="text-sm text-charcoal/60 line-clamp-2">
                                                {relatedPost.excerpt}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
