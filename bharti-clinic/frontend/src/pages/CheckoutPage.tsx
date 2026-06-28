import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, CreditCard, Truck, CheckCircle, ChevronLeft, Lock, Package } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import api from '../lib/axios';

type Step = 1 | 2 | 3;

interface FormData {
    fullName: string;
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pinCode: string;
    paymentMethod: 'CASH' | 'UPI' | 'BANK_TRANSFER';
    agreedToTerms: boolean;
}

export const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const { items, subtotal, clearCart } = useCart();
    const [step, setStep] = useState<Step>(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pinCode: '',
        paymentMethod: 'CASH',
        agreedToTerms: false
    });

    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
    const [orderPlaced, setOrderPlaced] = useState(false);

    React.useEffect(() => {
        if (items.length === 0 && !loading && !orderPlaced) {
            navigate('/shop');
        }
    }, [items, loading, navigate, orderPlaced]);

    if (items.length === 0 && !loading && !orderPlaced) {
        return null;
    }

    const validateStep1 = () => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        if (!formData.fullName) newErrors.fullName = 'Full name is required';
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email is required';
        if (!formData.phone || formData.phone.length < 10) newErrors.phone = 'Valid phone number is required';
        if (!formData.addressLine1) newErrors.addressLine1 = 'Address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.pinCode || formData.pinCode.length !== 6) newErrors.pinCode = 'Valid 6-digit PIN code is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (step === 1) {
            if (validateStep1()) setStep(2);
        } else if (step === 2) {
            setStep(3);
        }
    };

    const handlePlaceOrder = async () => {
        if (!formData.agreedToTerms) {
            alert('Please agree to the terms and conditions');
            return;
        }

        setLoading(true);
        try {
            const payload = {
                patientName: formData.fullName,
                phone: formData.phone,
                email: formData.email,
                items: items.map(item => ({
                    productId: item.productId,
                    name: item.name,
                    price: Number(item.price),
                    quantity: item.quantity
                })),
                totalAmount: subtotal,
                shippingAddress: {
                    line1: formData.addressLine1,
                    line2: formData.addressLine2,
                    city: formData.city,
                    state: formData.state,
                    pinCode: formData.pinCode
                },
                paymentMethod: formData.paymentMethod
            };

            const res = await api.post(`/api/orders`, payload);
            console.log('Order created:', res.data);
            // API returns { success, data, message } wrapper
            const order = res.data.data || res.data;

            setOrderPlaced(true);
            clearCart();
            navigate(`/order-confirmed/${order.id}`, { state: { order, formData } });
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = (field: keyof FormData) => `
        w-full px-4 py-3 bg-white border ${errors[field] ? 'border-red-500' : 'border-lotus/10'} 
        rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-lotus/30 transition-all
    `;

    return (
        <div className="bg-ivory/30 min-h-screen pt-28 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Side: Checkout Form */}
                    <div className="flex-grow lg:w-2/3">
                        {/* Progress Stepper */}
                        <div className="flex items-center gap-4 mb-8">
                            {[1, 2, 3].map((s) => (
                                <React.Fragment key={s}>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= s ? 'bg-maroon text-white' : 'bg-white text-charcoal/30 border border-lotus/10'
                                            }`}>
                                            {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                                        </div>
                                        <span className={`text-xs font-bold uppercase tracking-widest ${step >= s ? 'text-maroon' : 'text-charcoal/30'
                                            }`}>
                                            {s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Review'}
                                        </span>
                                    </div>
                                    {s < 3 && <div className="flex-grow h-[1px] bg-lotus/10" />}
                                </React.Fragment>
                            ))}
                        </div>

                        <div className="bg-white rounded-[40px] p-8 lg:p-12 shadow-sm border border-lotus/5">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <h2 className="font-display text-2xl text-maroon mb-8">Shipping Information</h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-xs font-bold uppercase tracking-wider text-charcoal/50 mb-2 block">Full Name</label>
                                                <input
                                                    type="text"
                                                    value={formData.fullName}
                                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                    className={inputClasses('fullName')}
                                                    placeholder="Arav Singh"
                                                />
                                                {errors.fullName && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.fullName}</p>}
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold uppercase tracking-wider text-charcoal/50 mb-2 block">Email Address</label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className={inputClasses('email')}
                                                    placeholder="arav@example.com"
                                                />
                                                {errors.email && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.email}</p>}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-xs font-bold uppercase tracking-wider text-charcoal/50 mb-2 block">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className={inputClasses('phone')}
                                                    placeholder="9876543210"
                                                />
                                                {errors.phone && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.phone}</p>}
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div>
                                                <label className="text-xs font-bold uppercase tracking-wider text-charcoal/50 mb-2 block">Address Line 1</label>
                                                <input
                                                    type="text"
                                                    value={formData.addressLine1}
                                                    onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                                                    className={inputClasses('addressLine1')}
                                                    placeholder="House No, Street Name"
                                                />
                                                {errors.addressLine1 && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.addressLine1}</p>}
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold uppercase tracking-wider text-charcoal/50 mb-2 block">Address Line 2 (Optional)</label>
                                                <input
                                                    type="text"
                                                    value={formData.addressLine2}
                                                    onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                                                    className={inputClasses('addressLine2')}
                                                    placeholder="Apartment, Suite, Landmark"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div>
                                                <label className="text-xs font-bold uppercase tracking-wider text-charcoal/50 mb-2 block">City</label>
                                                <input
                                                    type="text"
                                                    value={formData.city}
                                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                                    className={inputClasses('city')}
                                                />
                                                {errors.city && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.city}</p>}
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold uppercase tracking-wider text-charcoal/50 mb-2 block">State</label>
                                                <input
                                                    type="text"
                                                    value={formData.state}
                                                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                                    className={inputClasses('state')}
                                                />
                                                {errors.state && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.state}</p>}
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold uppercase tracking-wider text-charcoal/50 mb-2 block">PIN Code</label>
                                                <input
                                                    type="text"
                                                    maxLength={6}
                                                    value={formData.pinCode}
                                                    onChange={(e) => setFormData({ ...formData, pinCode: e.target.value.replace(/\D/g, '') })}
                                                    className={inputClasses('pinCode')}
                                                />
                                                {errors.pinCode && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.pinCode}</p>}
                                            </div>
                                        </div>

                                        <Button data-testid="continue-to-payment" onClick={handleNext} className="w-full rounded-2xl py-6 mt-8">
                                            Continue to Payment <ChevronRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <h2 className="font-display text-2xl text-maroon">Payment Method</h2>

                                        <div className="space-y-4">
                                            {[
                                                { id: 'CASH', label: 'Cash on Delivery', icon: Truck, description: 'Pay in cash when your order arrives.' },
                                                { id: 'UPI', label: 'UPI Payment', icon: CreditCard, description: 'Pay via GPay, PhonePe, or Paytm.' },
                                                { id: 'BANK_TRANSFER', label: 'Bank Transfer', icon: CreditCard, description: 'Direct transfer to clinic account.' }
                                            ].map((method) => (
                                                <label
                                                    key={method.id}
                                                    data-testid={`payment-${method.id.toLowerCase().replace('_', '-')}`}
                                                    className={`flex items-start gap-4 p-6 border-2 rounded-3xl cursor-pointer transition-all ${formData.paymentMethod === method.id
                                                        ? 'border-maroon bg-maroon/[0.02]'
                                                        : 'border-lotus/10 hover:border-maroon/30'
                                                        }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="paymentMethod"
                                                        className="mt-1 accent-maroon"
                                                        checked={formData.paymentMethod === method.id}
                                                        onChange={() => setFormData({ ...formData, paymentMethod: method.id as any })}
                                                    />
                                                    <div className="bg-ivory p-3 rounded-2xl text-maroon">
                                                        <method.icon className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-maroon">{method.label}</p>
                                                        <p className="text-xs text-charcoal/50 mt-1">{method.description}</p>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>

                                        {formData.paymentMethod === 'UPI' && (
                                            <div className="p-6 bg-ivory rounded-3xl border border-lotus/10 flex flex-col items-center">
                                                <p className="text-xs font-bold text-maroon uppercase mb-4">Clinic UPI ID: bharticlinic@upi</p>
                                                <div className="w-48 h-48 bg-white rounded-2xl flex items-center justify-center p-4 shadow-inner">
                                                    <img src="/images/qr-placeholder.png" alt="UPI QR" className="w-full h-full opacity-50 contrast-50" />
                                                </div>
                                                <p className="text-[10px] text-charcoal/40 mt-4 text-center">Scan this QR to pay. Please share screenshot on WhatsApp after payment.</p>
                                            </div>
                                        )}

                                        {formData.paymentMethod === 'BANK_TRANSFER' && (
                                            <div className="p-6 bg-ivory rounded-3xl border border-lotus/10 space-y-3">
                                                <p className="text-xs font-bold text-maroon uppercase mb-2">Account Details:</p>
                                                <div className="space-y-1">
                                                    <p className="text-xs text-charcoal/60"><strong>Bank Name:</strong> [Placeholder Bank]</p>
                                                    <p className="text-xs text-charcoal/60"><strong>Account No:</strong> 0000 1234 5678</p>
                                                    <p className="text-xs text-charcoal/60"><strong>IFSC Code:</strong> ABCD0123456</p>
                                                    <p className="text-xs text-charcoal/60"><strong>Branch:</strong> [Placeholder Branch]</p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex gap-4">
                                            <Button variant="ghost" onClick={() => setStep(1)} className="flex-1 rounded-2xl py-6">
                                                <ChevronLeft className="w-4 h-4 mr-2" /> Back
                                            </Button>
                                            <Button onClick={handleNext} className="flex-[2] rounded-2xl py-6">
                                                Continue to Review <ChevronRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <h2 className="font-display text-2xl text-maroon">Review Order</h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <h3 className="text-xs font-bold uppercase tracking-widest text-maroon">Shipping to:</h3>
                                                <div className="bg-ivory rounded-3xl p-6 text-sm text-charcoal/70 space-y-1">
                                                    <p className="font-bold text-maroon">{formData.fullName}</p>
                                                    <p>{formData.addressLine1}</p>
                                                    {formData.addressLine2 && <p>{formData.addressLine2}</p>}
                                                    <p>{formData.city}, {formData.state} - {formData.pinCode}</p>
                                                    <p className="pt-2">{formData.phone}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <h3 className="text-xs font-bold uppercase tracking-widest text-maroon">Payment:</h3>
                                                <div className="bg-ivory rounded-3xl p-6 text-sm text-maroon font-bold flex items-center gap-3">
                                                    <CreditCard className="w-5 h-5" />
                                                    {formData.paymentMethod.replace('_', ' ')}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-lotus/10 pt-8 mt-8">
                                            <label className="flex items-start gap-4 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.agreedToTerms}
                                                    onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                                                    className="mt-1 h-4 w-4 accent-maroon"
                                                />
                                                <span className="text-xs text-charcoal/60 leading-relaxed group-hover:text-charcoal/80 transition-colors">
                                                    I agree to the <a href="/terms.md" target="_blank" className="text-lotus underline font-medium">Terms and Conditions</a>, Privacy Policy, and medical disclaimer of Bharti Clinic.
                                                </span>
                                            </label>
                                        </div>

                                        <div className="flex gap-4">
                                            <Button variant="ghost" onClick={() => setStep(2)} className="flex-1 rounded-2xl py-6">
                                                <ChevronLeft className="w-4 h-4 mr-2" /> Back
                                            </Button>
                                            <Button
                                                data-testid="place-order-btn"
                                                onClick={handlePlaceOrder}
                                                isLoading={loading}
                                                className="flex-[2] rounded-2xl py-6 font-bold"
                                            >
                                                Place Order ₹{subtotal.toLocaleString()}
                                            </Button>
                                        </div>

                                        <div className="flex items-center justify-center gap-2 text-[10px] text-charcoal/40 uppercase tracking-widest font-bold">
                                            <Lock className="w-3 h-3" /> Secure Checkout by Bharti Clinic
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right Side: Order Summary (Sticky) */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-32 space-y-6">
                            <div className="bg-white rounded-[40px] p-8 shadow-sm border border-lotus/5">
                                <h3 className="font-display text-xl text-maroon mb-6">Order Summary</h3>
                                <div className="space-y-4 mb-6">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="w-16 h-16 bg-ivory rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden border border-lotus/5">
                                                {item.imageUrl ? (
                                                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain" />
                                                ) : (
                                                    <Package className="w-6 h-6 text-lotus/20" />
                                                )}
                                            </div>
                                            <div className="flex-grow">
                                                <p className="text-sm font-bold text-maroon line-clamp-1">{item.name}</p>
                                                <p className="text-xs text-charcoal/50">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="text-sm font-bold text-maroon">₹{(Number(item.price) * item.quantity).toLocaleString()}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-3 border-t border-lotus/10 pt-6">
                                    <div className="flex justify-between text-sm text-charcoal/60">
                                        <span>Subtotal</span>
                                        <span>₹{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-charcoal/60">
                                        <span>Shipping</span>
                                        <span className="text-green-600 font-bold">FREE</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold text-maroon pt-3 border-t border-lotus/5">
                                        <span>Total</span>
                                        <span>₹{subtotal.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-lotus/5 rounded-3xl border border-lotus/10">
                                <p className="text-[10px] text-maroon/60 leading-relaxed italic text-center">
                                    "Your journey to wellness is our priority. Ayurvedic treatments work best with consistency and expert guidance."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
