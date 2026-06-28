import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle2 } from 'lucide-react';
import api from '../../lib/axios';
import type { Therapy } from './TherapyCard';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedTherapy: Therapy | null;
}

const timeSlots = [
    { label: "09:00 AM", value: "09:00 AM" },
    { label: "10:00 AM", value: "10:00 AM" },
    { label: "11:00 AM", value: "11:00 AM" },
    { label: "12:00 PM", value: "12:00 PM" },
    { label: "02:00 PM", value: "02:00 PM" },
    { label: "03:00 PM", value: "03:00 PM" },
    { label: "04:00 PM", value: "04:00 PM" },
    { label: "05:00 PM", value: "05:00 PM" },
];

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, selectedTherapy }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        patientName: '',
        phone: '',
        email: '',
        preferredDate: '',
        preferredTime: '',
        notes: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTherapy) return;

        setIsSubmitting(true);
        try {
            await api.post(`/api/appointments`, {
                ...formData,
                therapyId: selectedTherapy.id,
            });
            setIsSuccess(true);
            // Reset form
            setFormData({
                patientName: '',
                phone: '',
                email: '',
                preferredDate: '',
                preferredTime: '',
                notes: '',
            });
        } catch (error) {
            console.error('Error booking appointment:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setIsSuccess(false);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title={isSuccess ? "" : `Book ${selectedTherapy?.name}`} className="max-w-xl">
            <div data-testid="booking-modal">
            <AnimatePresence mode="wait">
                {isSuccess ? (
                    <motion.div
                        key="success"
                        data-testid="success-message"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="py-12 flex flex-col items-center text-center"
                    >
                        {/* Lotus Petal Bloom Animation */}
                        <div className="relative w-32 h-32 mb-8">
                            {[0, 45, 90, 135, 180, 225, 270, 315].map((degree, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0, rotate: degree, opacity: 0 }}
                                    animate={{
                                        scale: 1,
                                        opacity: 1,
                                        transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
                                    }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <div className="w-12 h-20 bg-lotus/40 rounded-full border-2 border-lotus shadow-lg blur-[1px]"
                                        style={{ transform: `translateY(-30px)` }}
                                    />
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1, type: "spring" }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <div className="bg-white rounded-full p-4 shadow-xl z-20">
                                    <CheckCircle2 className="w-12 h-12 text-maroon" />
                                </div>
                            </motion.div>
                        </div>

                        <h2 className="font-display text-3xl text-maroon mb-4">Request Received</h2>
                        <p className="text-charcoal/70 mb-8 max-w-xs mx-auto">
                            Thank you for reaching out. We'll call you within **2 hours** to confirm your sacred time.
                        </p>
                        <Button onClick={handleClose} variant="primary" size="lg" className="rounded-full px-12">
                            Return to Rituals
                        </Button>
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Full Name"
                                required
                                value={formData.patientName}
                                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                                icon={<User className="w-4 h-4" />}
                            />
                            <Input
                                label="Phone Number"
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                icon={<Phone className="w-4 h-4" />}
                            />
                        </div>

                        <Input
                            label="Email Address"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            icon={<Mail className="w-4 h-4" />}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Preferred Date"
                                type="date"
                                required
                                value={formData.preferredDate}
                                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                                icon={<Calendar className="w-4 h-4" />}
                                min={new Date().toISOString().split('T')[0]}
                            />
                            <Select
                                label="Preferred Time"
                                required
                                options={timeSlots}
                                value={formData.preferredTime}
                                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                                icon={<Clock className="w-4 h-4" />}
                            />
                        </div>

                        <Textarea
                            label="Additional Notes"
                            rows={3}
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            icon={<FileText className="w-4 h-4" />}
                            placeholder="Tell us about any specific concerns or focus areas..."
                        />

                        <div className="pt-4">
                            <Button
                                data-testid="submit-booking-btn"
                                type="submit"
                                size="lg"
                                className="w-full text-sm font-bold uppercase tracking-widest py-6 rounded-2xl"
                                isLoading={isSubmitting}
                            >
                                Secure My Appointment
                            </Button>
                            <p className="text-center text-[10px] text-charcoal/40 mt-4 uppercase tracking-widest font-bold">
                                Confidential ayurvedic consultation request
                            </p>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>
            </div>
        </Modal>
    );
};
