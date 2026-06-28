import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Expand } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useCart } from '../../context/CartContext';
import { ProductQuickView } from './ProductQuickView';
import type { Product } from '../../types';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addItem } = useCart();
    const [isAdding, setIsAdding] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [showQuickView, setShowQuickView] = useState(false);

    const hasDiscount = product.comparePrice && product.comparePrice > product.price;
    const discountPercent = hasDiscount
        ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)
        : 0;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (product.stock <= 0) return;
        setIsAdding(true);
        addItem({
            productId: product.id,
            name: product.name,
            slug: product.slug,
            price: Number(product.price),
            comparePrice: product.comparePrice ? Number(product.comparePrice) : undefined,
            imageUrl: product.imageUrls?.[0],
            stock: product.stock,
        });
        setTimeout(() => setIsAdding(false), 600);
    };

    const handleQuickView = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowQuickView(true);
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-3 h-3 ${i < Math.round(rating) ? 'text-gold fill-gold' : 'text-charcoal/20'}`}
            />
        ));
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-testid="product-card"
        >
            <Link to={`/shop/${product.slug}`} className="block">
                <div className="bg-white rounded-3xl overflow-hidden shadow-md shadow-lotus/5 border border-lotus/5 hover:shadow-xl hover:shadow-lotus/10 transition-all duration-500 h-full flex flex-col">
                    {/* Image Area */}
                    <div className="relative aspect-square bg-ivory overflow-hidden">
                        {/* Product Image or Placeholder */}
                        {product.imageUrls && product.imageUrls.length > 0 ? (
                            <img
                                src={product.imageUrls[0]}
                                alt={product.name}
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-lotus/15 group-hover:scale-110 transition-transform duration-700">
                                <svg viewBox="0 0 80 80" className="w-32 h-32 fill-current">
                                    <circle cx="40" cy="40" r="35" opacity="0.3" />
                                    <path d="M40 10 C45 25, 55 25, 60 15 C55 30, 55 40, 40 50 C25 40, 25 30, 20 15 C25 25, 35 25, 40 10Z" opacity="0.5" />
                                    <path d="M40 50 C40 50, 42 65, 40 75 C38 65, 40 50, 40 50Z" opacity="0.4" />
                                </svg>
                            </div>
                        )}

                        {/* Discount Badge */}
                        {hasDiscount && (
                            <div className="absolute top-3 left-3 z-10">
                                <Badge variant="discount" className="text-[10px] px-2 py-1 font-bold">
                                    -{discountPercent}%
                                </Badge>
                            </div>
                        )}

                        {/* Category Badge */}
                        <div className="absolute top-3 right-3 z-10">
                            <Badge variant="category" className="text-[10px] px-2 py-1 bg-white/90 backdrop-blur-sm text-maroon font-bold">
                                {product.category?.name}
                            </Badge>
                        </div>

                        {/* Out of stock overlay */}
                        {product.stock <= 0 && (
                            <div className="absolute inset-0 bg-charcoal/40 flex items-center justify-center z-10">
                                <span className="bg-charcoal text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
                                    Out of Stock
                                </span>
                            </div>
                        )}

                        {/* Quick View Overlay */}
                        <AnimatePresence>
                            {isHovered && product.stock > 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={handleQuickView}
                                    className="absolute inset-0 bg-maroon/10 backdrop-blur-[2px] flex items-center justify-center z-10 cursor-pointer"
                                >
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.8, opacity: 0 }}
                                        className="bg-white rounded-full p-3 shadow-xl hover:scale-110 transition-transform"
                                    >
                                        <Expand className="w-5 h-5 text-maroon" />
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow">
                        <h3 className="font-display text-lg text-maroon mb-1 line-clamp-2 leading-snug group-hover:text-lotus transition-colors">
                            {product.name}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center gap-1.5 mb-3">
                            <div className="flex">{renderStars(product.avgRating)}</div>
                            <span className="text-[10px] text-charcoal/40 font-medium">
                                ({product.reviewCount})
                            </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-2 mb-4 mt-auto">
                            <span className="text-xl font-bold font-display text-maroon" data-testid="product-price">
                                ₹{Number(product.price).toLocaleString()}
                            </span>
                            {hasDiscount && (
                                <span className="text-sm text-charcoal/40 line-through">
                                    ₹{Number(product.comparePrice).toLocaleString()}
                                </span>
                            )}
                        </div>

                        {/* Add to Cart */}
                        <motion.div
                            animate={isAdding ? { scale: [1, 1.15, 1] } : {}}
                            transition={{ duration: 0.4 }}
                        >
                            <Button
                                onClick={handleAddToCart}
                                disabled={product.stock <= 0}
                                variant={product.stock <= 0 ? 'ghost' : 'primary'}
                                className="w-full rounded-xl text-[11px] font-bold uppercase tracking-widest py-5 flex items-center justify-center gap-2"
                                data-testid="add-to-cart-btn"
                            >
                                <ShoppingCart className="w-3.5 h-3.5" />
                                {product.stock <= 0 ? 'Out of Stock' : isAdding ? 'Added!' : 'Add to Cart'}
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </Link>

            {/* Quick View Modal */}
            <ProductQuickView
                product={product}
                isOpen={showQuickView}
                onClose={() => setShowQuickView(false)}
            />
        </motion.div>
    );
};
