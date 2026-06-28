import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SectionTitle } from '../ui/SectionTitle';

interface FAQ {
    question: string;
    answer: string;
}

export const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs: FAQ[] = [
        {
            question: "What is Ayurveda and how can it help me?",
            answer: "Ayurveda is a 5,000-year-old holistic healing system from India that focuses on balancing mind, body, and spirit. It treats the root cause of health issues rather than just symptoms, using natural herbs, therapies, diet, and lifestyle modifications tailored to your unique constitution (Prakriti)."
        },
        {
            question: "Are your treatments safe and natural?",
            answer: "Yes, absolutely! All our treatments use 100% natural, organic herbs sourced directly from certified farms in the Himalayas. Our therapies are administered by BAMS-qualified Ayurvedic doctors with decades of experience. We follow traditional protocols that have been proven safe over thousands of years."
        },
        {
            question: "How long does it take to see results?",
            answer: "Results vary based on your condition and constitution. Acute issues may show improvement within 1-2 weeks, while chronic conditions typically require 3-6 months of consistent treatment. Ayurveda focuses on sustainable, long-term healing rather than quick fixes. Most patients notice positive changes within the first month."
        },
        {
            question: "Do I need to stop my current medications?",
            answer: "Never stop prescribed medications without consulting your doctor. Ayurvedic treatments can often complement conventional medicine. We work collaboratively with your existing healthcare providers and will guide you on how to safely integrate Ayurvedic therapies with your current treatment plan."
        },
        {
            question: "What should I expect during my first consultation?",
            answer: "Your first consultation lasts 45-60 minutes. Our doctor will assess your Prakriti (constitution), examine your pulse, tongue, and overall health, discuss your medical history, lifestyle, and concerns. You'll receive a personalized treatment plan including therapies, herbal medicines, diet recommendations, and lifestyle modifications."
        },
        {
            question: "How much do treatments cost?",
            answer: "Treatment costs vary based on your specific needs. Individual therapy sessions range from ₹1,500-₹5,000. We offer comprehensive packages (7-21 days) starting from ₹15,000 that provide better value. Herbal medicines typically cost ₹500-₹2,000 per month. We'll provide a detailed cost estimate during your consultation."
        },
        {
            question: "Can Ayurveda treat chronic conditions?",
            answer: "Yes! Ayurveda excels at treating chronic conditions like arthritis, diabetes, digestive disorders, skin conditions, hormonal imbalances, stress, anxiety, and autoimmune diseases. Our holistic approach addresses the root cause and helps restore balance naturally. Many patients see significant improvement in conditions that haven't responded well to conventional treatments."
        },
        {
            question: "Do you offer online consultations?",
            answer: "Yes, we offer virtual consultations via video call for patients who cannot visit in person. While some therapies require physical presence, we can prescribe herbal medicines, provide dietary guidance, and create personalized wellness plans remotely. Follow-up consultations are also available online."
        }
    ];

    return (
        <section className="py-24 bg-gradient-to-br from-ivory via-white to-lotus-light/5 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-lotus/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionTitle
                    title="Frequently Asked Questions"
                    subtitle="Everything you need to know about Ayurvedic healing"
                    align="center"
                />

                <div className="mt-16 space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl border border-lotus/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-lotus-light/20 transition-colors duration-200"
                            >
                                <span className="font-display text-lg text-maroon pr-8">
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex-shrink-0"
                                >
                                    <ChevronDown className="w-5 h-5 text-lotus" />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-5 text-charcoal/80 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center"
                >
                    <p className="text-charcoal/70 mb-4">
                        Still have questions? We're here to help!
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a
                            href="tel:+919876543210"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-lotus text-white rounded-full hover:bg-lotus-deep transition-colors duration-300 font-semibold"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Call Us Now
                        </a>
                        <a
                            href="https://wa.me/919876543210"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300 font-semibold"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                            WhatsApp Us
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
