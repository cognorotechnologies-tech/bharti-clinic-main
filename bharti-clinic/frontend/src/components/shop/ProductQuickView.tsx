import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingCart, ZoomIn } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCart } from '../../context/CartContext';

interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    comparePrice?: number;
    description: string;
    imageUrls: string[];
    stock: number;
    category: {
        name: string;
    };
}

interface ProductQuickViewProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ProductQuickView({ product, isOpen, onClose }: ProductQuickViewProps) {
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const { addItem } = useCart();

    if (!product) return null;

    const handleAddToCart = () => {
        addItem({
            productId: product.id,
            name: product.name,
            slug: product.slug,
            price: Number(product.price),
            comparePrice: product.comparePrice ? Number(product.comparePrice) : undefined,
            imageUrl: product.imageUrls[0] || '/placeholder-product.jpg',
            stock: product.stock,
        });
        onClose();
    };

    const discount = product.comparePrice
        ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
        : 0;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden pointer-events-auto"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                            >
                                <X size={20} className="text-charcoal" />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
                                {/* Left: Images */}
                                <div className="space-y-4">
                                    {/* Main Image */}
                                    <div className="relative aspect-square bg-ivory rounded-xl overflow-hidden group">
                                        <motion.img
                                            key={selectedImage}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                            src={product.imageUrls[selectedImage] || '/placeholder-product.jpg'}
                                            alt={product.name}
                                            className={`w-full h-full object-cover transition-transform duration-300 ${
                                                isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
                                            }`}
                                            onClick={() => setIsZoomed(!isZoomed)}
                                        />
                                        
                                        {/* Zoom Icon */}
                                        {!isZoomed && (
                                            <div className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ZoomIn size={18} className="text-charcoal" />
                                            </div>
                                        )}

                                        {/* Discount Badge */}
                                        {discount > 0 && (
                                            <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                                                -{discount}%
                                            </div>
                                        )}
                                    </div>

                                    {/* Thumbnail Gallery */}
                                    {product.imageUrls.length > 1 && (
                                        <div className="flex gap-2 overflow-x-auto pb-2">
                                            {product.imageUrls.map((url, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setSelectedImage(index)}
                                                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                                        selectedImage === index
                                                            ? 'border-lotus-pink scale-105'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                                >
                                                    <img
                                                        src={url}
                                                        alt={`${product.name} ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Right: Product Info */}
                                <div className="flex flex-col">
                                    {/* Category */}
                                    <span className="text-sm font-semibold text-lotus-pink uppercase tracking-wider mb-2">
                                        {product.category.name}
                                    </span>

                                    {/* Product Name */}
                                    <h2 className="text-3xl font-bold text-charcoal mb-4 font-display">
                                        {product.name}
                                    </h2>

                                    {/* Price */}
                                    <div className="flex items-baseline gap-3 mb-6">
                                        <span className="text-3xl font-bold text-maroon">
                                            ₹{product.price.toLocaleString()}
                                        </span>
                                        {product.comparePrice && (
                                            <span className="text-lg text-gray-400 line-through">
                                                ₹{product.comparePrice.toLocaleString()}
                                            </span>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                                        {product.description}
                                    </p>

                                    {/* Stock Status */}
                                    <div className="mb-6">
                                        {product.stock > 0 ? (
                                            <div className="flex items-center gap-2 text-green-600">
                                                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                                                <span className="text-sm font-semibold">
                                                    {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left!`}
                                                </span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-red-600">
                                                <div className="w-2 h-2 bg-red-600 rounded-full" />
                                                <span className="text-sm font-semibold">Out of Stock</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Quantity Selector */}
                                    {product.stock > 0 && (
                                        <div className="mb-6">
                                            <label className="block text-sm font-semibold text-charcoal mb-2">
                                                Quantity
                                            </label>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                    disabled={quantity <= 1}
                                                    className="p-2 border-2 border-gray-300 rounded-lg hover:border-lotus-pink hover:text-lotus-pink transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <Minus size={18} />
                                                </button>
                                                <span className="text-xl font-bold text-charcoal w-12 text-center">
                                                    {quantity}
                                                </span>
                                                <button
                                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                                    disabled={quantity >= product.stock}
                                                    className="p-2 border-2 border-gray-300 rounded-lg hover:border-lotus-pink hover:text-lotus-pink transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <Plus size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <Button
                                            onClick={handleAddToCart}
                                            disabled={product.stock === 0}
                                            variant="primary"
                                            size="lg"
                                            className="flex-1 flex items-center justify-center gap-2"
                                        >
                                            <ShoppingCart size={20} />
                                            Add to Cart
                                        </Button>
                                        <Button
                                            onClick={onClose}
                                            variant="secondary"
                                            size="lg"
                                            className="px-6"
                                        >
                                            View Details
                                        </Button>
                                    </div>

                                    {/* Trust Badges */}
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <div className="grid grid-cols-3 gap-4 text-center">
                                            <div>
                                                <div className="text-2xl mb-1">🌿</div>
                                                <p className="text-xs text-gray-600 font-semibold">100% Natural</p>
                                            </div>
                                            <div>
                                                <div className="text-2xl mb-1">✓</div>
                                                <p className="text-xs text-gray-600 font-semibold">Certified</p>
                                            </div>
                                            <div>
                                                <div className="text-2xl mb-1">🚚</div>
                                                <p className="text-xs text-gray-600 font-semibold">Free Shipping</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
