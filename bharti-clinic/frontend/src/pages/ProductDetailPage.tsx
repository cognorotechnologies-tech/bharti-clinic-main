import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Minus, Plus, ChevronRight, Package, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { ProductCard } from '../components/shop/ProductCard';
import { useCart } from '../context/CartContext';
import api from '../lib/axios';
import type { Product, Review } from '../types';
import { SEO } from '../components/SEO';

type Tab = 'description' | 'ingredients' | 'howToUse' | 'reviews';

export const ProductDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { addItem } = useCart();
    const [product, setProduct] = useState<(Product & { relatedProducts?: Product[]; reviews?: Review[] }) | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<Tab>('description');
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);

    // Review form
    const [reviewForm, setReviewForm] = useState({ patientName: '', rating: 5, comment: '' });
    const [submittingReview, setSubmittingReview] = useState(false);
    const [reviewSuccess, setReviewSuccess] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/api/products/${slug}`);
                // API returns { success, data, message } wrapper
                const responseData = res.data.data || res.data;
                setProduct(responseData);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        if (slug) fetchProduct();
    }, [slug]);

    const handleAddToCart = () => {
        if (!product || product.stock <= 0) return;
        setIsAdding(true);
        // Add item with proper CartItem structure
        for (let i = 0; i < quantity; i++) {
            addItem({
                productId: product.id,
                name: product.name,
                slug: product.slug,
                price: Number(product.price),
                comparePrice: product.comparePrice ? Number(product.comparePrice) : undefined,
                imageUrl: product.imageUrls?.[0],
                stock: product.stock,
            });
        }
        setTimeout(() => setIsAdding(false), 600);
    };

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!slug) return;
        setSubmittingReview(true);
        try {
            await api.post(`/api/products/${slug}/reviews`, reviewForm);
            setReviewSuccess(true);
            setReviewForm({ patientName: '', rating: 5, comment: '' });
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit review. Please try again.');
        } finally {
            setSubmittingReview(false);
        }
    };

    const renderStars = (rating: number, interactive = false, onChange?: (r: number) => void) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                onClick={() => interactive && onChange && onChange(i + 1)}
                className={`w-4 h-4 ${interactive ? 'cursor-pointer' : ''} ${i < Math.round(rating) ? 'text-gold fill-gold' : 'text-charcoal/20'
                    }`}
            />
        ));
    };

    const getStockLabel = () => {
        if (!product) return '';
        if (product.stock <= 0) return { text: 'Out of Stock', color: 'text-red-500', icon: AlertTriangle };
        if (product.stock <= 3) return { text: `Only ${product.stock} left!`, color: 'text-gold', icon: AlertTriangle };
        return { text: 'In Stock', color: 'text-green-600', icon: CheckCircle2 };
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-ivory">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-ivory gap-4">
                <h2 className="font-display text-3xl text-maroon">Product Not Found</h2>
                <Link to="/shop">
                    <Button variant="primary" className="rounded-full px-8">Back to Shop</Button>
                </Link>
            </div>
        );
    }

    const stockInfo = getStockLabel();
    const StockIcon = typeof stockInfo === 'object' ? stockInfo.icon : null;

    const TABS: { id: Tab; label: string }[] = [
        { id: 'description', label: 'Description' },
        { id: 'ingredients', label: 'Ingredients' },
        { id: 'howToUse', label: 'How to Use' },
        { id: 'reviews', label: `Reviews (${product.reviewCount || 0})` },
    ];

    const schemaData = product ? {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.name,
        "image": product.imageUrls?.[0],
        "description": product.description,
        "sku": product.sku || product.id,
        "offers": {
            "@type": "Offer",
            "url": window.location.href,
            "priceCurrency": "INR",
            "price": product.price,
            "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
        }
    } : undefined;

    return (
        <div className="bg-ivory/30 min-h-screen pb-24">
            {product && (
                <SEO
                    title={`${product.name} | Bharti Clinic Shop`}
                    description={product.description?.substring(0, 160)}
                    image={product.imageUrls?.[0]}
                    schemaData={schemaData}
                />
            )}
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-4">
                <nav className="flex items-center gap-2 text-xs text-charcoal/40">
                    <Link to="/" className="hover:text-lotus">Home</Link>
                    <ChevronRight className="w-3 h-3" />
                    <Link to="/shop" className="hover:text-lotus">Shop</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-maroon font-medium">{product.name}</span>
                </nav>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Product Hero */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Image Gallery */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-lotus/5 aspect-square flex items-center justify-center group relative overflow-hidden">
                            {product.imageUrls && product.imageUrls.length > 0 ? (
                                <img
                                    src={product.imageUrls[0]}
                                    alt={product.name}
                                    className="w-full h-full object-contain group-hover:scale-105 transition-all duration-700"
                                />
                            ) : (
                                <div className="text-lotus/10 group-hover:text-lotus/20 group-hover:scale-105 transition-all duration-700">
                                    <svg viewBox="0 0 120 120" className="w-48 h-48 fill-current">
                                        <circle cx="60" cy="60" r="50" opacity="0.3" />
                                        <path d="M60 15 C70 35, 85 35, 95 20 C85 40, 85 55, 60 70 C35 55, 35 40, 25 20 C35 35, 50 35, 60 15Z" opacity="0.5" />
                                        <path d="M60 70 C60 70, 62 100, 60 110 C58 100, 60 70, 60 70Z" opacity="0.4" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Product Info */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
                        {/* Category */}
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-lotus mb-2">{product.category?.name}</span>

                        <h1 className="font-display text-4xl text-maroon mb-3 leading-tight">{product.name}</h1>

                        {/* SKU */}
                        {product.sku && (
                            <div className="flex items-center gap-2 text-xs text-charcoal/30 mb-4">
                                <Package className="w-3 h-3" />
                                SKU: {product.sku}
                            </div>
                        )}

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex">{renderStars(product.avgRating)}</div>
                            <span className="text-sm text-charcoal/50">({product.reviewCount} reviews)</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-4">
                            <span data-testid="product-price" className="text-4xl font-display font-bold text-maroon">₹{Number(product.price).toLocaleString()}</span>
                            {product.comparePrice && product.comparePrice > product.price && (
                                <>
                                    <span className="text-xl text-charcoal/30 line-through">₹{Number(product.comparePrice).toLocaleString()}</span>
                                    <span className="bg-gold text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                                        Save ₹{(Number(product.comparePrice) - Number(product.price)).toLocaleString()}
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Stock */}
                        {StockIcon && typeof stockInfo === 'object' && (
                            <div className={`flex items-center gap-2 text-sm font-medium mb-8 ${stockInfo.color}`}>
                                <StockIcon className="w-4 h-4" />
                                {stockInfo.text}
                            </div>
                        )}

                        {/* Quantity + Add to Cart */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex items-center bg-white border border-lotus/10 rounded-2xl overflow-hidden">
                                <button
                                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                    className="p-3 hover:bg-ivory transition-colors"
                                >
                                    <Minus className="w-4 h-4 text-charcoal" />
                                </button>
                                <span className="px-5 font-bold text-maroon">{quantity}</span>
                                <button
                                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                                    disabled={quantity >= product.stock}
                                    className="p-3 hover:bg-ivory transition-colors disabled:opacity-30"
                                >
                                    <Plus className="w-4 h-4 text-charcoal" />
                                </button>
                            </div>

                            <motion.div animate={isAdding ? { scale: [1, 1.1, 1] } : {}} className="flex-1">
                                <Button
                                    data-testid="add-to-cart-btn"
                                    onClick={handleAddToCart}
                                    disabled={product.stock <= 0}
                                    className="w-full rounded-2xl py-6 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                                >
                                    <ShoppingCart className="w-4 h-4" />
                                    {product.stock <= 0 ? 'Out of Stock' : isAdding ? 'Added!' : 'Add to Cart'}
                                </Button>
                            </motion.div>
                        </div>

                        <p className="text-charcoal/50 text-sm leading-relaxed line-clamp-3">{product.description}</p>
                    </motion.div>
                </div>

                {/* Tabs */}
                <div className="mb-16">
                    <div className="flex border-b border-lotus/10 mb-8 overflow-x-auto">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${activeTab === tab.id
                                    ? 'border-lotus text-lotus'
                                    : 'border-transparent text-charcoal/40 hover:text-charcoal/70'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-lotus/5 min-h-[200px]">
                        {activeTab === 'description' && (
                            <div className="prose prose-sm max-w-none text-charcoal/70 leading-relaxed">
                                {product.description}
                            </div>
                        )}

                        {activeTab === 'ingredients' && (
                            <div className="prose prose-sm max-w-none text-charcoal/70 leading-relaxed">
                                {product.ingredients || 'Ingredients information coming soon.'}
                            </div>
                        )}

                        {activeTab === 'howToUse' && (
                            <div className="prose prose-sm max-w-none text-charcoal/70 leading-relaxed">
                                {product.howToUse || 'Usage instructions coming soon.'}
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div data-testid="reviews-section" className="space-y-8">
                                {/* Existing Reviews */}
                                {product.reviews && product.reviews.length > 0 ? (
                                    <div className="space-y-4">
                                        {product.reviews.map((review: Review) => (
                                            <div key={review.id} data-testid="review-item" className="p-4 bg-ivory/50 rounded-2xl border border-lotus/5">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium text-sm text-maroon">{review.patientName}</span>
                                                        <div data-testid="review-rating" className="flex">{renderStars(review.rating)}</div>
                                                    </div>
                                                    <span className="text-[10px] text-charcoal/30">{new Date(review.createdAt).toLocaleDateString()}</span>
                                                </div>
                                                <p data-testid="review-comment" className="text-sm text-charcoal/60">{review.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-charcoal/40 text-sm">No reviews yet. Be the first!</p>
                                )}

                                {/* Review Form */}
                                <div className="border-t border-lotus/10 pt-8">
                                    <h3 className="font-display text-lg text-maroon mb-4">Write a Review</h3>

                                    {reviewSuccess ? (
                                        <div data-testid="success-message" className="bg-green-50 text-green-700 p-4 rounded-2xl text-sm flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4" />
                                            Thank you! Your review is pending approval.
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmitReview} className="space-y-4">
                                            <div>
                                                <label className="text-xs font-bold uppercase tracking-wider text-charcoal/50 mb-1 block">Your Name</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={reviewForm.patientName}
                                                    onChange={(e) => setReviewForm({ ...reviewForm, patientName: e.target.value })}
                                                    className="w-full px-4 py-3 bg-ivory border border-lotus/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lotus/30"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold uppercase tracking-wider text-charcoal/50 mb-2 block">Rating</label>
                                                <div className="flex gap-1">{renderStars(reviewForm.rating, true, (r) => setReviewForm({ ...reviewForm, rating: r }))}</div>
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold uppercase tracking-wider text-charcoal/50 mb-1 block">Comment</label>
                                                <textarea
                                                    required
                                                    rows={3}
                                                    value={reviewForm.comment}
                                                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                                                    className="w-full px-4 py-3 bg-ivory border border-lotus/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-lotus/30 resize-none"
                                                    placeholder="Share your experience..."
                                                />
                                            </div>
                                            <Button
                                                data-testid="write-review-btn"
                                                type="submit"
                                                isLoading={submittingReview}
                                                className="rounded-xl px-6 text-xs font-bold uppercase tracking-widest"
                                            >
                                                Submit Review
                                            </Button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                {product.relatedProducts && product.relatedProducts.length > 0 && (
                    <section>
                        <SectionTitle title="You May Also Like" subtitle="Related Products" align="center" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
                            {product.relatedProducts.map((p: Product) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};
