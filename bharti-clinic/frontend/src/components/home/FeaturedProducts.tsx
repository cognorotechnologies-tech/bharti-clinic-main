import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { SectionTitle } from '../ui/SectionTitle';
import { Spinner } from '../ui/Spinner';
import { ShoppingCart } from 'lucide-react';
import { StarRating } from '../ui/StarRating';
import { Badge } from '../ui/Badge';
import { useCart } from '../../context/CartContext';
import api from '../../lib/axios';

interface Product {
    id: string;
    name: string;
    slug?: string;
    description: string;
    price: number;
    comparePrice?: number;
    imageUrls?: string[];
    imageUrl?: string;
    category: {
        name: string;
    } | string;
    rating?: number;
    stock?: number;
}

export const FeaturedProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const { addItem } = useCart();

    const handleAddToCart = (product: Product) => {
        const imageUrl = product.imageUrls?.[0] || product.imageUrl || '/placeholder-product.jpg';
        addItem({
            productId: product.id,
            name: product.name,
            slug: product.slug || product.name.toLowerCase().replace(/\s+/g, '-'),
            price: Number(product.comparePrice || product.price),
            comparePrice: product.price ? Number(product.price) : undefined,
            imageUrl,
            stock: product.stock || 100,
        });
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get(`/api/products?limit=4`);
                // API returns { success, data, message } wrapper
                const responseData = (response.data as any).data || response.data;
                setProducts(Array.isArray(responseData) ? (responseData as Product[]) : []);
            } catch (error) {
                console.error('Error fetching products:', error);
                // Fallback mock data
                setProducts([
                    {
                        id: 'p1',
                        name: "Brahmi Revive Oil",
                        description: "Traditional medicated oil for scalp health and mental clarity. Sourced from organic Brahmi leaves.",
                        price: 749,
                        comparePrice: 899,
                        category: "Wellness",
                        rating: 5
                    },
                    {
                        id: 'p2',
                        name: "Golden Turmeric Elixir",
                        description: "High-curcumin turmeric blend with black pepper for maximum absorption. Immuno-booster.",
                        price: 1250,
                        category: "Supplements",
                        rating: 4.8
                    },
                    {
                        id: 'p3',
                        name: "Saffron Glow Serum",
                        description: "Luxury Kumkumadi oil blend for radiant, naturally youthful skin. Hand-picked Kashmiri saffron.",
                        price: 1999,
                        comparePrice: 2400,
                        category: "Skincare",
                        rating: 5
                    },
                    {
                        id: 'p4',
                        name: "Digestive Haritaki",
                        description: "Ancient formulation for digestive regularity and detoxification. Pure powder form.",
                        price: 450,
                        category: "Wellness",
                        rating: 4.5
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="py-24 flex justify-center items-center">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <section className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionTitle
                    title="Healing Treasures"
                    subtitle="Premium Ayurvedic formulations prepared with classical precision and modern purity standards."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                    {products && products.length > 0 ? products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="bg-white rounded-[40px] p-6 shadow-xl shadow-lotus/5 border border-lotus/5 flex flex-col h-full hover:shadow-2xl hover:shadow-lotus/10 transition-all duration-500 relative overflow-hidden">

                                {/* Category Badge */}
                                <div className="absolute top-4 left-4 z-10">
                                    <Badge variant="category" className="bg-ivory/80 backdrop-blur-sm border-maroon/20 text-maroon text-[10px] uppercase font-bold px-3 py-1">
                                        {typeof product.category === 'string' ? product.category : product.category?.name || 'Product'}
                                    </Badge>
                                </div>

                                {/* Savings Badge */}
                                {product.comparePrice && product.comparePrice > product.price && (
                                    <div className="absolute -top-1 -right-1 z-10">
                                        <div className="bg-gold text-maroon text-[10px] font-black px-4 py-2 rounded-bl-3xl shadow-lg border-b border-l border-white/20">
                                            SAVE ₹{(product.comparePrice - product.price).toLocaleString()}
                                        </div>
                                    </div>
                                )}

                                {/* Image */}
                                <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-[30px] bg-ivory group-hover:bg-lotus-light/20 transition-colors duration-500">
                                    {(product.imageUrls?.[0] || product.imageUrl) ? (
                                        <img
                                            src={product.imageUrls?.[0] || product.imageUrl}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                            }}
                                        />
                                    ) : null}
                                    <div className={`absolute inset-0 flex items-center justify-center text-lotus/20 group-hover:scale-110 group-hover:text-lotus/40 transition-all duration-700 ${(product.imageUrls?.[0] || product.imageUrl) ? 'hidden' : ''}`}>
                                        <svg viewBox="0 0 24 24" className="w-24 h-24 fill-current">
                                            <path d="M12 21C12 21 21 16.5 21 12V6L12 3L3 6V12C3 16.5 12 21 12 21Z" />
                                        </svg>
                                    </div>
                                    {/* Quick Add Overlay */}
                                    <div className="absolute inset-0 bg-maroon/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                        <Button
                                            size="sm"
                                            onClick={() => handleAddToCart(product)}
                                            className="bg-white text-maroon hover:bg-gold border-none shadow-xl scale-90 group-hover:scale-100 transition-transform duration-500 rounded-full font-bold px-6"
                                        >
                                            Quick Add
                                        </Button>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="flex flex-col flex-grow items-center text-center">
                                    {product.rating && <StarRating rating={product.rating} readOnly className="mb-3" />}
                                    <Link to={`/shop/${product.slug || product.id}`}>
                                        <h3 className="font-display text-xl text-maroon mb-2 hover:text-lotus transition-colors duration-300 line-clamp-1 cursor-pointer">
                                            {product.name}
                                        </h3>
                                    </Link>
                                    <p className="text-charcoal/60 text-xs mb-6 line-clamp-2 leading-relaxed">{product.description}</p>

                                    <div className="mt-auto flex items-baseline justify-center gap-3">
                                        <span className="text-2xl font-bold text-maroon">
                                            ₹{(product.price || 0).toLocaleString()}
                                        </span>
                                        {product.comparePrice && product.comparePrice > product.price && (
                                            <span className="text-sm text-charcoal/30 line-through">
                                                ₹{product.comparePrice.toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <Button
                                    variant="ghost"
                                    onClick={() => handleAddToCart(product)}
                                    className="mt-8 w-full border-maroon/20 text-maroon group-hover:bg-maroon group-hover:text-white transition-all duration-500 rounded-2xl py-6 font-bold uppercase tracking-[0.2em] text-[10px]"
                                >
                                    <ShoppingCart className="w-3 h-3 mr-2 group-hover:animate-bounce" />
                                    Add to Cart
                                </Button>
                            </div>
                        </motion.div>
                    )) : (
                        <div className="col-span-full py-12 text-center text-charcoal/40 font-accent text-xl italic">
                            Our apothecary is currently replenishing...
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
