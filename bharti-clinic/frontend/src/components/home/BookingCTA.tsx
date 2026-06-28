import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Toast } from '../ui/Toast';
import api from '../../lib/axios';

interface TherapySelection {
    id: string;
    name: string;
}

export const BookingCTA: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        therapyId: '',
        message: ''
    });
    const [therapies, setTherapies] = useState<TherapySelection[]>([]);
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const fetchTherapies = async () => {
            try {
                const response = await api.get(`/api/therapies`);
                console.log('BookingCTA - Raw response:', response.data);
                
                // API returns { success, data, message } wrapper
                const therapiesData = response.data.data || response.data;
                console.log('BookingCTA - Extracted data:', therapiesData);
                console.log('BookingCTA - Is array?', Array.isArray(therapiesData));
                
                if (Array.isArray(therapiesData)) {
                    setTherapies(therapiesData);
                } else {
                    console.error('BookingCTA - Data is not an array:', therapiesData);
                    setTherapies([]);
                }
            } catch (error) {
                console.error('Error fetching therapies:', error);
                // Fallback
                setTherapies([
                    { id: '1', name: 'Abhyanga' },
                    { id: '2', name: 'Shirodhara' },
                    { id: '3', name: 'Panchakarma' }
                ]);
            }
        };
        fetchTherapies();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post(`/api/appointments`, formData);
            setShowToast(true);
            setFormData({ name: '', phone: '', therapyId: '', message: '' });
        } catch (error) {
            console.error('Error booking appointment:', error);
            alert('There was an error booking your appointment. Please try calling us directly.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-24 bg-ivory relative overflow-hidden">
            {/* Background mandala subtle decoration */}
            <div className="absolute -bottom-20 -left-20 w-96 h-96 opacity-[0.03] pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-maroon">
                    <path d="M50 0 C60 20 80 40 100 50 C80 60 60 80 50 100 C40 80 20 60 0 50 C20 40 40 20 50 0 Z" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-white rounded-[40px] shadow-2xl border border-lotus/10 overflow-hidden flex flex-col md:flex-row">

                    {/* Welcome Text Left */}
                    <div className="bg-maroon p-12 md:p-16 text-white md:w-2/5 flex flex-col justify-center">
                        <span className="text-gold font-bold tracking-[0.2em] text-xs uppercase mb-6 block">Take the First Step</span>
                        <h2 className="font-display text-4xl lg:text-5xl mb-8 leading-tight">Start Your Healing Journey</h2>
                        <p className="text-white/70 text-lg mb-8 font-body leading-relaxed">
                            Book a personalized consultation today. Our experts will help you identify your Prakriti and suggest the best path forward for your unique constitution.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 py-2 border-b border-white/10">
                                <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gold">📞</span>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest opacity-40">Call Anytime</p>
                                    <p className="font-semibold">+91 98765 43210</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 py-2">
                                <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gold">📍</span>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest opacity-40">Location</p>
                                    <p className="font-semibold">Civil Lines, New Delhi</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Right */}
                    <div className="p-12 md:p-16 flex-1 bg-white">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="sm:col-span-1">
                                <Input
                                    label="FullName"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="sm:col-span-1">
                                <Input
                                    label="Phone Number"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <Select
                                    label="Desired Therapy"
                                    id="therapyId"
                                    value={formData.therapyId}
                                    onChange={(e) => setFormData({ ...formData, therapyId: e.target.value })}
                                    options={Array.isArray(therapies) ? therapies.map(t => ({ value: t.id, label: t.name })) : []}
                                    required
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <Textarea
                                    label="Your Message (Optional)"
                                    id="message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    rows={3}
                                />
                            </div>
                            <div className="sm:col-span-2 mt-4">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-full py-6 text-lg tracking-widest uppercase font-bold"
                                    isLoading={loading}
                                >
                                    Confirm Booking Request
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Success Toast */}
            {showToast && (
                <div className="fixed top-8 right-8 z-[100]">
                    <Toast
                        id="booking-success"
                        title="Request Sent!"
                        message="Our consultant will call you back within 24 hours."
                        type="success"
                        onClose={() => setShowToast(false)}
                    />
                </div>
            )}
        </section>
    );
};
