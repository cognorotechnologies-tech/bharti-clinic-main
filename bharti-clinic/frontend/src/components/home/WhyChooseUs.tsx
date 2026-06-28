import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';

interface Feature {
    title: string;
    description: string;
    icon: string;
}

export const WhyChooseUs: React.FC = () => {
    const features: Feature[] = [
        {
            title: "100% Natural Ingredients",
            description: "We source our herbs directly from organic farms in the Himalayas.",
            icon: "🌿"
        },
        {
            title: "Certified Ayurvedic Doctors",
            description: "Our consultations are led by BAMS qualified practitioners with decades of experience.",
            icon: "🎓"
        },
        {
            title: "Ancient Lineage Methods",
            description: "Authentic protocols passed down through generations for true root-cause healing.",
            icon: "📜"
        },
        {
            title: "Holistic Mind-Body Care",
            description: "We treat the individual, not just the symptoms, balancing Prana, Tejas, and Ojas.",
            icon: "🧘"
        }
    ];

    return (
        <section className="py-24 bg-ivory/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle
                    title="Why The Bharti Way?"
                    subtitle="Our commitment to authentic Ayurveda ensures your journey to health is safe and sustainable"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ 
                                delay: index * 0.15,
                                duration: 0.6,
                                ease: "easeOut"
                            }}
                            whileHover={{ 
                                y: -8,
                                scale: 1.03,
                                transition: { duration: 0.3 }
                            }}
                            className="relative bg-white/70 backdrop-blur-sm p-8 rounded-3xl border border-lotus/10 hover:border-lotus/30 hover:shadow-2xl hover:shadow-lotus/10 transition-all duration-500 group cursor-pointer overflow-hidden"
                        >
                            {/* Animated Background Gradient */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-lotus-light/0 to-lotus-light/0 group-hover:from-lotus-light/20 group-hover:to-gold/10 transition-all duration-500"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                            />

                            {/* Shimmer Effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100"
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ 
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatDelay: 2
                                }}
                            />

                            <div className="relative z-10">
                                <motion.div
                                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.15 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lotus-light to-lotus/20 flex items-center justify-center text-3xl mb-6 shadow-lg shadow-lotus/20"
                                >
                                    {feature.icon}
                                </motion.div>
                                <h3 className="font-display text-xl text-maroon mb-3 leading-tight group-hover:text-lotus-deep transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-charcoal/70 text-sm leading-relaxed group-hover:text-charcoal/90 transition-colors duration-300">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Corner Accent */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                whileHover={{ scale: 1, opacity: 0.3 }}
                                transition={{ duration: 0.3 }}
                                className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gold/30 to-transparent rounded-bl-full"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
