import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import { Package, MapPin, Truck, ChevronRight, CheckCircle, MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import api from '../lib/axios';
import type { Order } from '../types';

export const OrderConfirmedPage: React.FC = () => {
    const { orderId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [order, setOrder] = useState<Order | null>(location.state?.order || null);
    const [loading, setLoading] = useState(!order);

    useEffect(() => {
        const fetchOrder = async () => {
            const id = orderId || order?.id;
            if (!order && id) {
                try {
                    const res = await api.get(`/api/orders/${id}`);
                    // API returns { success, data, message } wrapper
                    const responseData = res.data.data || res.data;
                    setOrder(responseData);
                } catch (err) {
                    console.error('Failed to fetch order:', err);
                } finally {
                    setLoading(false);
                }
            } else if (!id && !location.state?.order) {
                // If no state and no ID in URL, then we can redirect after a short delay
                const timer = setTimeout(() => navigate('/shop'), 3000);
                return () => clearTimeout(timer);
            } else {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId, order, navigate, location.state]);

    const handleShareWhatsApp = () => {
        if (!order) return;
        const text = `I just ordered Ayurvedic wellness products from Bharti Clinic! 🌸 My Order ID is ${order.id}. Check them out: ${window.location.origin}/shop`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-ivory">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-maroon"></div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-ivory p-8">
                <h2 className="font-display text-4xl text-maroon mb-4">Order Not Found</h2>
                <p className="text-charcoal/60 mb-8 max-w-md text-center">We couldn't find your order details. Please check your email or contact support.</p>
                <Link to="/shop">
                    <Button variant="primary" className="rounded-full px-12 py-6">Back to Shop</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-ivory/30 min-h-screen pt-32 pb-24 overflow-hidden font-body">
            <div className="max-w-4xl mx-auto px-4 text-center">
                {/* Lotus Bloom Animation */}
                <div className="relative h-48 mb-8 flex items-center justify-center">
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative"
                    >
                        {/* Lotus Petals */}
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((degree, i) => (
                            <motion.div
                                key={i}
                                initial={{ rotate: degree, scale: 0 }}
                                animate={{ rotate: degree, scale: 1 }}
                                transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                                className="absolute top-1/2 left-1/2 w-8 h-16 bg-gradient-to-t from-lotus/40 to-lotus/5 rounded-full origin-bottom -translate-x-1/2 -translate-y-full"
                                style={{ transformOrigin: 'bottom center' }}
                            />
                        ))}
                        <div className="relative z-10 bg-white p-6 rounded-full shadow-xl shadow-lotus/20 border border-lotus/10">
                            <CheckCircle className="w-12 h-12 text-lotus" />
                        </div>
                    </motion.div>

                    {/* Sparkles */}
                    <div className="absolute inset-0 pointer-events-none">
                        {[1, 2, 3, 4, 5, 6].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 0 }}
                                animate={{ opacity: [0, 1, 0], y: -50, x: (i - 2.5) * 30 }}
                                transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                                className="absolute top-1/2 left-1/2 w-2 h-2 bg-gold border border-white/30 rounded-full"
                            />
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                >
                    <h1 className="font-display text-4xl lg:text-5xl text-maroon mb-4">
                        Thank You, {order.patientName}! 🌸
                    </h1>
                    <p className="text-charcoal/60 mb-8 max-w-lg mx-auto leading-relaxed">
                        Your order has been successfully placed. Our health experts are preparing your Ayurvedic wellness kit with care.
                    </p>

                    <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm border border-lotus/5 mb-12">
                        <span className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">Order ID</span>
                        <Badge variant="category" className="bg-ivory text-maroon px-4 py-1.5 font-mono text-sm">
                            {order?.id?.substring(0, 8).toUpperCase() || 'SUCCESS'}
                        </Badge>
                    </div>

                    <div className="bg-white rounded-[40px] p-8 lg:p-12 shadow-sm border border-lotus/5 mb-12 text-left">
                        <h3 className="font-display text-2xl text-maroon mb-8">Order Summary</h3>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="border-b border-lotus/5">
                                    <tr>
                                        <th className="pb-4 text-left text-[10px] font-bold uppercase tracking-widest text-charcoal/40">Product</th>
                                        <th className="pb-4 text-center text-[10px] font-bold uppercase tracking-widest text-charcoal/40">Qty</th>
                                        <th className="pb-4 text-right text-[10px] font-bold uppercase tracking-widest text-charcoal/40">Price</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-lotus/5">
                                    {(order.items as any[]).map((item, i) => (
                                        <tr key={i}>
                                            <td className="py-6 flex items-center gap-4">
                                                <div className="w-12 h-12 bg-ivory rounded-xl flex-shrink-0 flex items-center justify-center">
                                                    <ShoppingBag className="w-5 h-5 text-lotus/30" />
                                                </div>
                                                <span className="font-bold text-maroon text-sm">{item.name}</span>
                                            </td>
                                            <td className="py-6 text-center text-sm text-charcoal/60">{item.quantity}</td>
                                            <td className="py-6 text-right font-bold text-maroon text-sm">₹{Number(item.price).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={2} className="pt-6 text-right text-sm text-charcoal/40">Total Amount</td>
                                        <td className="pt-6 text-right font-display text-2xl font-bold text-maroon">₹{Number(order.totalAmount).toLocaleString()}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        <div className="mt-12 p-6 bg-ivory rounded-3xl border border-lotus/10 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-maroon mb-4">Shipping Address</h4>
                                <div className="text-xs text-charcoal/60 space-y-1">
                                    <p className="font-bold">{order.patientName}</p>
                                    <p>{order.shippingAddress.line1}</p>
                                    {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
                                    <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pinCode}</p>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-maroon mb-4">Payment Method</h4>
                                <div className="flex items-center gap-2 text-xs text-charcoal/60 font-bold uppercase">
                                    <ArrowRight className="w-3 h-3 text-gold" />
                                    {order.paymentMethod.replace('_', ' ')}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/shop">
                            <Button variant="ghost" className="rounded-full px-12 py-6 text-xs tracking-widest flex items-center gap-2">
                                <ShoppingBag className="w-4 h-4" /> Continue Shopping
                            </Button>
                        </Link>
                        <Button
                            onClick={() => navigate('/shop')}
                            variant="primary"
                            className="rounded-full px-12 py-6 text-xs tracking-widest flex items-center gap-2"
                        >
                            Track Your Order <ChevronRight className="w-4 h-4" />
                        </Button>
                        <Button
                            onClick={handleShareWhatsApp}
                            className="bg-green-600 hover:bg-green-700 text-white border-none rounded-full px-12 py-6 text-xs tracking-widest flex items-center gap-2"
                        >
                            <MessageCircle className="w-4 h-4" /> Share Update
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
