import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Star, ChevronLeft, ChevronRight, X, ShoppingBag, Sparkles } from 'lucide-react';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { ProductCard } from '../components/shop/ProductCard';
import { ProductGridSkeleton } from '../components/ui/LoadingSkeleton';
import { HeroCarousel } from '../components/hero/HeroCarousel';
import type { CarouselSlide } from '../components/hero/HeroCarousel';
import api from '../lib/axios';
import type { Product, Category, PaginatedResponse } from '../types';
import { SEO, SEO_CONFIGS } from '../components/SEO';

const SORT_OPTIONS = [
    { label: 'Newest', value: 'newest' },
    { label: 'Popular', value: 'popular' },
    { label: 'Price: Low → High', value: 'price_asc' },
    { label: 'Price: High → Low', value: 'price_desc' },
];

const RATING_OPTIONS = [
    { label: '4★ & above', value: 4 },
    { label: '3★ & above', value: 3 },
];

export const ShopPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0, totalPages: 1 });

    // Filters
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
    const [minRating, setMinRating] = useState<number | null>(null);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [sort, setSort] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 300);
        return () => clearTimeout(timer);
    }, [search]);

    // Fetch categories
    useEffect(() => {
        api.get(`/api/products/categories`)
            .then((res) => {
                const responseData = res.data.data || res.data;
                setCategories(Array.isArray(responseData) ? responseData : []);
            })
            .catch(console.error);
    }, []);

    // Fetch products
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const params: any = {
                page: currentPage,
                limit: 12,
                sort,
            };
            if (debouncedSearch) params.search = debouncedSearch;
            if (selectedCategories.length > 0) params.category = selectedCategories.join(',');
            if (priceRange[0] > 0) params.minPrice = priceRange[0];
            if (priceRange[1] < 5000) params.maxPrice = priceRange[1];
            if (minRating) params.minRating = minRating;
            if (inStockOnly) params.inStock = 'true';

            const res = await api.get<PaginatedResponse<Product>>(`/api/products`, { params });

            // API returns { success, data: [products], pagination, message }
            // Check if data is an array (products directly) or an object with products property
            const responseData = (res.data as any).data || res.data;

            if (Array.isArray(responseData)) {
                // Products are directly in data array
                setProducts(responseData);
                setPagination(res.data.pagination || { page: 1, limit: 12, total: responseData.length, totalPages: 1 });
            } else {
                // Products are in data.products
                setProducts(responseData.products || []);
                setPagination(responseData.pagination || { page: 1, limit: 12, total: 0, totalPages: 1 });
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            // Mock fallback
            setProducts([]);
            setPagination({ page: 1, limit: 12, total: 0, totalPages: 1 });
        } finally {
            setLoading(false);
        }
    }, [currentPage, sort, debouncedSearch, selectedCategories, priceRange, minRating, inStockOnly]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, selectedCategories, priceRange, minRating, inStockOnly, sort]);

    const toggleCategory = (slug: string) => {
        setSelectedCategories((prev) =>
            prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
        );
    };

    const clearFilters = () => {
        setSearch('');
        setSelectedCategories([]);
        setPriceRange([0, 5000]);
        setMinRating(null);
        setInStockOnly(false);
        setSort('newest');
    };

    const hasActiveFilters = selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 5000 || minRating || inStockOnly || debouncedSearch;

    // --- Sidebar Component ---
    const FilterSidebar = () => (
        <div className="space-y-8">
            {/* Categories */}
            <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-maroon mb-4">Categories</h3>
                <div className="space-y-2">
                    {categories.map((cat) => (
                        <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(cat.slug)}
                                onChange={() => toggleCategory(cat.slug)}
                                className="w-4 h-4 rounded border-lotus/30 text-lotus focus:ring-lotus"
                            />
                            <span className="text-sm text-charcoal/70 group-hover:text-lotus transition-colors">{cat.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-maroon mb-4">Price Range</h3>
                <div className="space-y-3">
                    <input
                        type="range"
                        min="0"
                        max="5000"
                        step="100"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full accent-lotus"
                    />
                    <div className="flex items-center justify-between text-xs text-charcoal/50">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                    </div>
                </div>
            </div>

            {/* Rating */}
            <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-maroon mb-4">Rating</h3>
                <div className="space-y-2">
                    {RATING_OPTIONS.map((opt) => (
                        <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="radio"
                                name="rating"
                                checked={minRating === opt.value}
                                onChange={() => setMinRating(opt.value)}
                                className="w-4 h-4 border-lotus/30 text-lotus focus:ring-lotus"
                            />
                            <div className="flex items-center gap-1">
                                {Array.from({ length: opt.value }, (_, i) => (
                                    <Star key={i} className="w-3 h-3 text-gold fill-gold" />
                                ))}
                                <span className="text-xs text-charcoal/50 ml-1">& above</span>
                            </div>
                        </label>
                    ))}
                    {minRating && (
                        <button onClick={() => setMinRating(null)} className="text-[10px] text-lotus hover:underline mt-1">Clear rating</button>
                    )}
                </div>
            </div>

            {/* In Stock */}
            <div>
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                        className="w-4 h-4 rounded border-lotus/30 text-lotus focus:ring-lotus"
                    />
                    <span className="text-sm text-charcoal/70 group-hover:text-lotus transition-colors font-medium">In Stock Only</span>
                </label>
            </div>

            {/* Clear */}
            {hasActiveFilters && (
                <button onClick={clearFilters} className="text-xs text-lotus hover:underline font-medium">
                    ✕ Clear all filters
                </button>
            )}
        </div>
    );

    const shopSlides: CarouselSlide[] = [
        {
            id: 'featured-oils',
            title: 'Premium Ayurvedic Oils',
            subtitle: 'New Arrivals',
            description: 'Discover our collection of authentic herbal oils crafted with traditional wisdom',
            image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1920',
            cta: (
                <div className="flex gap-4">
                    <Button variant="primary" size="lg">
                        <ShoppingBag className="mr-2" size={20} />
                        Shop Now
                    </Button>
                    <Button variant="secondary" size="lg">
                        View Collection
                    </Button>
                </div>
            ),
        },
        {
            id: 'supplements',
            title: 'Natural Supplements',
            subtitle: 'Boost Your Immunity',
            description: 'Pure herbal supplements for holistic wellness and vitality',
            image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1920',
            cta: (
                <Button variant="primary" size="lg">
                    Explore Supplements
                </Button>
            ),
        },
        {
            id: 'skincare',
            title: 'Radiant Skin Naturally',
            subtitle: 'Skincare Essentials',
            description: 'Traditional beauty secrets for glowing, healthy skin',
            image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1920',
            cta: (
                <Button variant="primary" size="lg">
                    <Sparkles className="mr-2" size={20} />
                    Discover Beauty
                </Button>
            ),
        },
    ];

    return (
        <div className="bg-ivory/30 min-h-screen pb-24">
            <SEO {...SEO_CONFIGS.shop} />
            {/* Hero Carousel */}
            <HeroCarousel
                slides={shopSlides}
                autoPlay={true}
                interval={6000}
                showControls={true}
                showIndicators={true}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Bar: Search + Sort + Results Count */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white border border-lotus/10 rounded-2xl text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-lotus/30 focus:border-lotus transition-all"
                        />
                        {search && (
                            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                                <X className="w-4 h-4 text-charcoal/30 hover:text-lotus" />
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Results count */}
                        <span className="text-xs text-charcoal/40 font-medium whitespace-nowrap">
                            Showing {products.length} of {pagination?.total || 0} products
                        </span>

                        {/* Sort */}
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="bg-white border border-lotus/10 rounded-xl px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-lotus/30"
                        >
                            {SORT_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>

                        {/* Mobile filter toggle */}
                        <button
                            onClick={() => setShowMobileFilters(!showMobileFilters)}
                            className="lg:hidden p-2.5 bg-white border border-lotus/10 rounded-xl hover:bg-lotus-light/10 transition-colors"
                        >
                            <SlidersHorizontal className="w-4 h-4 text-charcoal" />
                        </button>
                    </div>
                </div>

                {/* Main Content: Sidebar + Grid */}
                <div className="flex gap-8">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-32 bg-white rounded-3xl p-6 shadow-sm border border-lotus/5">
                            <FilterSidebar />
                        </div>
                    </aside>

                    {/* Mobile Filters */}
                    {showMobileFilters && (
                        <div className="fixed inset-0 z-40 lg:hidden">
                            <div className="absolute inset-0 bg-charcoal/50" onClick={() => setShowMobileFilters(false)} />
                            <motion.div
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                className="absolute left-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="font-display text-lg text-maroon">Filters</h2>
                                    <button onClick={() => setShowMobileFilters(false)}>
                                        <X className="w-5 h-5 text-charcoal" />
                                    </button>
                                </div>
                                <FilterSidebar />
                            </motion.div>
                        </div>
                    )}

                    {/* Product Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <ProductGridSkeleton count={12} />
                        ) : products.length === 0 ? (
                            <div className="text-center py-32">
                                <Search className="w-16 h-16 text-lotus/15 mx-auto mb-4" />
                                <h3 className="font-display text-xl text-maroon mb-2">No Products Found</h3>
                                <p className="text-charcoal/40 text-sm mb-6">Try adjusting your filters or search term.</p>
                                <Button onClick={clearFilters} variant="secondary" className="rounded-full px-6">
                                    Clear Filters
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                                    {products.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {pagination?.totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-2 mt-12">
                                        <button
                                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                            className="p-2 rounded-xl bg-white border border-lotus/10 disabled:opacity-30 hover:bg-lotus-light/10 transition-colors"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                        </button>

                                        {Array.from({ length: pagination?.totalPages || 1 }, (_, i) => i + 1).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${currentPage === page
                                                    ? 'bg-lotus text-white shadow-md'
                                                    : 'bg-white border border-lotus/10 text-charcoal hover:bg-lotus-light/10'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ))}

                                        <button
                                            onClick={() => setCurrentPage((p) => Math.min(pagination?.totalPages || 1, p + 1))}
                                            disabled={currentPage === (pagination?.totalPages || 1)}
                                            className="p-2 rounded-xl bg-white border border-lotus/10 disabled:opacity-30 hover:bg-lotus-light/10 transition-colors"
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
