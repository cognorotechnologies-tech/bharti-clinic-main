import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import api from '../lib/axios';
import { Button } from '../components/ui/Button';
import { HeroSplit } from '../components/hero/HeroSplit';
import { SEO, SEO_CONFIGS } from '../components/SEO';

export const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await api.post(`/api/contact`, formData);
            setSuccess(true);
            setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
        } catch (err: any) {
            console.error('Contact Error:', err);
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        { icon: MapPin, label: 'Visit Us', text: 'PMF2+5W Sahibzada Ajit Singh Nagar, Punjab', action: 'google-maps' },
        { icon: Phone, label: 'Call Us', text: '+91 82 888 42 777', action: 'tel:+918288842777' },
        { icon: Mail, label: 'Email', text: 'info.bhartiveda@gmail.com', action: 'mailto:info.bhartiveda@gmail.com' },
        { icon: Clock, label: 'Hours', text: 'Mon-Sat: 9 AM - 8 PM | Sun: Closed', action: null },
    ];

    return (
        <div className="bg-ivory/30 min-h-screen pb-24 font-body">
            <SEO {...SEO_CONFIGS.contact} />
            {/* Hero Split */}
            <HeroSplit
                title="Get in Touch"
                subtitle="Contact Us"
                description="We're here to answer your questions and guide you on your wellness journey. Whether you're starting your healing journey or have questions about our treatments, we're here to help."
                leftContent={
                    <div className="space-y-6">
                        {contactInfo.map((info, i) => (
                            <div
                                key={i}
                                className="group flex gap-6 p-6 bg-white rounded-3xl border border-maroon/5 shadow-sm hover:shadow-xl transition-all duration-500"
                            >
                                <div className="w-14 h-14 bg-ivory rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-maroon transition-colors duration-500">
                                    <info.icon className="w-6 h-6 text-maroon group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-lotus mb-1">{info.label}</p>
                                    <p className="text-charcoal text-base font-medium leading-tight">
                                        {info.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <Button variant="primary" size="lg" className="w-full">
                            <Send className="mr-2" size={20} />
                            Send Message
                        </Button>
                    </div>
                }
                rightContent={
                    <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                        <iframe
                            src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=Bharti+Clinic+Ayurveda+%26+Panchkarma+Centre+Kharar&ie=UTF8&t=&z=15&iwloc=B&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Bharti Clinic Location - Kharar, Punjab"
                        />
                    </div>
                }
                reverse={false}
            />

            {/* Contact Form Section */}
            <div className="max-w-7xl mx-auto px-4 mt-16">
                <div className="bg-white rounded-[48px] p-8 lg:p-16 shadow-2xl shadow-maroon/10 border border-maroon/5 relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        {!success ? (
                            <motion.form
                                key="contact-form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleSubmit}
                                className="space-y-8"
                            >
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/40 ml-2">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-ivory/50 border border-maroon/5 rounded-2xl px-6 py-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-maroon/10 transition-all text-charcoal"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/40 ml-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full bg-ivory/50 border border-maroon/5 rounded-2xl px-6 py-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-maroon/10 transition-all text-charcoal"
                                            placeholder="e.g. +91 9876543210"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/40 ml-2">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-ivory/50 border border-maroon/5 rounded-2xl px-6 py-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-maroon/10 transition-all text-charcoal"
                                        placeholder="example@email.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/40 ml-2">Subject</label>
                                    <select
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full bg-ivory/50 border border-maroon/5 rounded-2xl px-6 py-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-maroon/10 transition-all text-charcoal appearance-none"
                                    >
                                        <option value="">Select Inqury Type</option>
                                        <option value="Consultation">Doctor Consultation</option>
                                        <option value="Therapy">Therapy Booking</option>
                                        <option value="Products">Product Information</option>
                                        <option value="General">General Inquiry</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/40 ml-2">How can we help?</label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-ivory/50 border border-maroon/5 rounded-2xl px-6 py-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-maroon/10 transition-all text-charcoal resize-none"
                                        placeholder="Write your message here..."
                                    ></textarea>
                                </div>

                                {error && <p className="text-red-500 text-xs italic">{error}</p>}

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-6 rounded-2xl text-lg font-bold tracking-widest bg-maroon text-white hover:bg-maroon/90 shadow-xl shadow-maroon/20 flex items-center justify-center gap-3 overflow-hidden group"
                                >
                                    <AnimatePresence mode="wait">
                                        {loading ? (
                                            <motion.div
                                                key="loading"
                                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                className="h-6 w-6 border-2 border-white/20 border-t-white rounded-full animate-spin"
                                            />
                                        ) : (
                                            <motion.div
                                                key="idle"
                                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                className="flex items-center gap-3"
                                            >
                                                SEND MESSAGE
                                                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </Button>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-20"
                            >
                                {/* Success Animation Container */}
                                <div className="w-32 h-32 bg-lotus/10 rounded-full flex items-center justify-center mx-auto mb-12 relative">
                                    {/* Ripple effect */}
                                    <div className="absolute inset-0 bg-lotus rounded-full animate-ping opacity-20"></div>
                                    <CheckCircle2 className="w-16 h-16 text-lotus" />
                                </div>
                                <h3 className="font-display text-4xl text-maroon mb-6">Thank You! 🌸</h3>
                                <p className="text-charcoal/60 text-lg mb-10 max-w-sm mx-auto">
                                    Your message has blossomed in our system. Our team will reach out to you within 24 hours.
                                </p>
                                <Button
                                    onClick={() => setSuccess(false)}
                                    variant="secondary"
                                    className="px-12 rounded-full font-bold uppercase tracking-[0.2em] text-xs"
                                >
                                    Send Another Message
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
