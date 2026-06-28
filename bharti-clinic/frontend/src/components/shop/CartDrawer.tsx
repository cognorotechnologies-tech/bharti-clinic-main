import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export function CartDrawer() {
    const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal, itemCount } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        closeCart();
        navigate('/checkout');
    };

    const handleContinueShopping = () => {
        closeCart();
        navigate('/shop');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    />

                    {/* Drawer */}
                    <motion.div
                        data-testid="cart-drawer"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-white shadow-2xl z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="text-lotus-pink" size={24} />
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
                                    <p className="text-sm text-gray-600">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
                                </div>
                            </div>
                            <button
                                onClick={closeCart}
                                className="p-2 hover:bg-gray-100 rounded-full transition"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {items.length === 0 ? (
                                <div data-testid="empty-cart" className="flex flex-col items-center justify-center h-full text-center">
                                    <div className="w-32 h-32 mb-6 rounded-full bg-lotus-light flex items-center justify-center">
                                        <ShoppingBag size={48} className="text-lotus" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
                                    <p className="text-gray-600 mb-6">Add some Ayurvedic products to get started</p>
                                    <Button onClick={handleContinueShopping} variant="primary">
                                        Continue Shopping
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            data-testid="cart-item"
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: 100 }}
                                            className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                                        >
                                            {/* Product Image */}
                                            <div className="w-20 h-20 flex-shrink-0 bg-white rounded-lg overflow-hidden border border-gray-200">
                                                {item.imageUrl ? (
                                                    <img
                                                        src={item.imageUrl}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-lotus-light">
                                                        <ShoppingBag size={32} className="text-lotus" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-gray-900 mb-1 truncate">
                                                    {item.name}
                                                </h4>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-lg font-bold text-lotus-pink">
                                                        ₹{Number(item.price).toFixed(2)}
                                                    </span>
                                                    {item.comparePrice && Number(item.comparePrice) > Number(item.price) && (
                                                        <span className="text-sm text-gray-500 line-through">
                                                            ₹{Number(item.comparePrice).toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                                        <button
                                                            data-testid="decrease-quantity"
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            disabled={item.quantity <= 1}
                                                            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                                        >
                                                            <Minus size={16} />
                                                        </button>
                                                        <span data-testid="item-quantity" className="px-4 py-2 font-semibold min-w-[3rem] text-center">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            data-testid="increase-quantity"
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            disabled={item.quantity >= item.stock}
                                                            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                                        >
                                                            <Plus size={16} />
                                                        </button>
                                                    </div>

                                                    <button
                                                        data-testid="remove-item"
                                                        onClick={() => removeItem(item.id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                        title="Remove item"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>

                                                {/* Stock Warning */}
                                                {item.quantity >= item.stock && (
                                                    <p className="text-xs text-orange-600 mt-1">
                                                        Max stock reached
                                                    </p>
                                                )}
                                            </div>

                                            {/* Item Total */}
                                            <div className="text-right">
                                                <p className="font-bold text-gray-900">
                                                    ₹{(Number(item.price) * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="border-t border-gray-200 p-6 space-y-4">
                                {/* Order Summary */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span data-testid="cart-subtotal">₹{Number(subtotal).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>Shipping</span>
                                        <span>Calculated at checkout</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
                                        <span>Total</span>
                                        <span className="text-lotus-pink">₹{Number(subtotal).toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-2">
                                    <Button
                                        data-testid="checkout-btn"
                                        onClick={handleCheckout}
                                        variant="primary"
                                        size="lg"
                                        className="w-full"
                                    >
                                        Proceed to Checkout
                                    </Button>
                                    <Button
                                        onClick={handleContinueShopping}
                                        variant="secondary"
                                        size="lg"
                                        className="w-full"
                                    >
                                        Continue Shopping
                                    </Button>
                                </div>

                                {/* Trust Badges */}
                                <div className="flex items-center justify-center gap-4 text-xs text-gray-600 pt-2">
                                    <span className="flex items-center gap-1">
                                        <span className="text-gold">✓</span> Secure Checkout
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="text-gold">✓</span> Free Shipping ₹999+
                                    </span>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
