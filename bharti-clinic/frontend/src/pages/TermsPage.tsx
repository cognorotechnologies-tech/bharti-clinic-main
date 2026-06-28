import React from 'react';
import { motion } from 'framer-motion';
import { SEO, SEO_CONFIGS } from '../components/SEO';
import { Shield, FileText, Activity, AlertCircle } from 'lucide-react';

export function TermsPage() {
    return (
        <div className="pt-24 pb-16 min-h-screen bg-ivory">
            <SEO title="Terms & Conditions - Bharti Clinic" description="Read the terms and conditions for treatments, consultations, and product purchases at Bharti Clinic." url="/terms" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-display text-maroon mb-4">Terms & Conditions</h1>
                    <p className="text-charcoal-muted text-lg max-w-2xl mx-auto">
                        Please read these terms carefully before booking a consultation or proceeding with treatments at Bharti Veda.
                    </p>
                </motion.div>

                {/* Content Sections */}
                <div className="space-y-8">
                    {/* Section 1: Medical Disclaimer */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl p-8 border border-lotus/10 shadow-sm"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-lotus-light/30 flex items-center justify-center text-lotus-deep">
                                <Activity className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-display text-maroon">Medical Disclaimer</h2>
                        </div>
                        <div className="text-charcoal/80 space-y-4">
                            <p>
                                The Ayurvedic treatments, therapies, and products provided at Bharti Clinic are meant to support overall wellness and balance. They are not intended to replace emergency medical care or acute allopathic treatments.
                            </p>
                            <p>
                                Always consult with our Ayurvedic practitioners fully disclosing your medical history, allergies, and current medications before beginning any Panchkarma therapy or herbal supplement regimen.
                            </p>
                        </div>
                    </motion.div>

                    {/* Section 2: Appointments & Cancellations */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-3xl p-8 border border-lotus/10 shadow-sm"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-lotus-light/30 flex items-center justify-center text-lotus-deep">
                                <FileText className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-display text-maroon">Appointments & Cancellations</h2>
                        </div>
                        <div className="text-charcoal/80 space-y-4">
                            <ul className="list-disc pl-5 space-y-2">
                                <li>All consultations and therapies require prior booking.</li>
                                <li>We kindly request at least 24 hours notice for any cancellations or rescheduling to accommodate other patients.</li>
                                <li>Late arrivals may result in shortened therapy sessions to respect the time of the following appointments.</li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Section 3: Privacy & Data Security */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-3xl p-8 border border-lotus/10 shadow-sm"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-lotus-light/30 flex items-center justify-center text-lotus-deep">
                                <Shield className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-display text-maroon">Privacy & Confidentiality</h2>
                        </div>
                        <div className="text-charcoal/80 space-y-4">
                            <p>
                                Your medical records, consultation notes, and personal details are maintained with strict confidentiality.
                                We do not share your health data with any third parties without your explicit consent.
                            </p>
                        </div>
                    </motion.div>

                    {/* Section 4: Refund Policy */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-3xl p-8 border border-lotus/10 shadow-sm"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-lotus-light/30 flex items-center justify-center text-lotus-deep">
                                <AlertCircle className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-display text-maroon">Refunds & Returns</h2>
                        </div>
                        <div className="text-charcoal/80 space-y-4">
                            <p>
                                <strong>Consultations & Therapies:</strong> Fees paid for consultations and completed therapies are non-refundable.
                            </p>
                            <p>
                                <strong>Products:</strong> Sealed, unused Ayurvedic products may be returned or exchanged within 7 days of purchase. Unfortunately, opened or partially used medicines cannot be accepted for return due to hygiene and safety standards.
                            </p>
                        </div>
                    </motion.div>
                </div>

                <div className="mt-12 text-center text-charcoal-muted text-sm">
                    Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>
            </div>
        </div>
    );
}

export default TermsPage;
