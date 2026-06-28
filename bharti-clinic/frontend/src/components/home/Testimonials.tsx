import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarRating } from '../ui/StarRating';
import { SectionTitle } from '../ui/SectionTitle';
import { cn } from '../../lib/utils';
import { AmbientSparkles } from '../ui/AmbientSparkles';

interface Testimonial {
    id: string;
    name: string;
    city: string;
    quote: string;
    rating: number;
}

export const Testimonials: React.FC = () => {
    const testimonials: Testimonial[] = [
        {
            id: '1',
            name: "Anita Sharma",
            city: "Gurugram",
            quote: "The Shirodhara session at Bharti Clinic was transformative. I've struggled with chronic insomnia for years, and for the first time in a decade, I felt a deep, natural sense of peace and rested sleep.",
            rating: 5
        },
        {
            id: '2',
            name: "Rajesh Khanna",
            city: "New Delhi",
            quote: "The personalized diet and Panchakarma treatment completely resolved my long-standing digestive issues. Dr. Ipinder's approach is deeply empathetic and clinically sound.",
            rating: 5
        },
        {
            id: '3',
            name: "Sneha Kapoor",
            city: "Noida",
            quote: "What I love most is the authenticity. There's no compromise on traditional protocols. The herbal infusions are fresh and highly potent. A truly premium Ayurvedic experience.",
            rating: 4.5
        },
        {
            id: '4',
            name: "Vikram Singh",
            city: "Faridabad",
            quote: "The wellness packages are thoughtfully curated. I feel rejuvenated after every visit. The clinic's environment perfectly complements their healing expertise.",
            rating: 5
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [testimonials.length]);

    return (
        <section className="py-24 bg-maroon relative overflow-hidden">
            <AmbientSparkles count={25} className="opacity-40 z-0" />
            {/* Decorative quotes background */}
            <div className="absolute top-20 left-10 text-[200px] text-lotus/10 font-display leading-none select-none">"</div>
            <div className="absolute bottom-10 right-10 text-[200px] text-lotus/10 font-display leading-none select-none">"</div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <SectionTitle
                    title="Voices of Healing"
                    subtitle="Real stories from individuals who found their path to wellness with us"
                    className="text-ivory"
                />

                <div className="mt-16 relative">
                    <div className="flex overflow-hidden gap-8 py-10">
                        <AnimatePresence mode="wait">
                            {/* Desktop view shows 3, Mobile view shows 1 */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                                {testimonials.slice(activeIndex, activeIndex + 3).map((item) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.6 }}
                                        className="bg-white p-10 rounded-[40px] shadow-xl shadow-lotus/10 border border-lotus/10 flex flex-col items-center text-center group hover:bg-maroon transition-colors duration-500"
                                    >
                                        <StarRating rating={item.rating} readOnly className="mb-6 group-hover:brightness-200" />
                                        <blockquote className="font-accent italic text-2xl text-charcoal/80 mb-8 leading-relaxed group-hover:text-white transition-colors duration-500">
                                            "{item.quote}"
                                        </blockquote>
                                        <div className="mt-auto">
                                            <p className="font-display text-lg text-maroon group-hover:text-gold transition-colors duration-500">{item.name}</p>
                                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-lotus group-hover:text-ivory transition-colors duration-500">{item.city}</p>
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Handle overflow wrapping for carousel logic */}
                                {testimonials.length < activeIndex + 3 && testimonials.slice(0, (activeIndex + 3) % testimonials.length).map((item) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.6 }}
                                        className="bg-white p-10 rounded-[40px] shadow-xl shadow-lotus/10 border border-lotus/10 flex flex-col items-center text-center group hover:bg-maroon transition-colors duration-500"
                                    >
                                        <StarRating rating={item.rating} readOnly className="mb-6 group-hover:brightness-200" />
                                        <blockquote className="font-accent italic text-2xl text-charcoal/80 mb-8 leading-relaxed group-hover:text-white transition-colors duration-500">
                                            "{item.quote}"
                                        </blockquote>
                                        <div className="mt-auto">
                                            <p className="font-display text-lg text-maroon group-hover:text-gold transition-colors duration-500">{item.name}</p>
                                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-lotus group-hover:text-ivory transition-colors duration-500">{item.city}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </AnimatePresence>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                className={cn(
                                    "w-2 h-2 rounded-full transition-all duration-300",
                                    activeIndex === idx ? "bg-maroon w-8" : "bg-lotus/30"
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
