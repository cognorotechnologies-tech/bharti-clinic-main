import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Heart, Leaf, Clock, Users } from 'lucide-react';

export const TrustBadges: React.FC = () => {
    const badges = [
        {
            icon: Shield,
            title: "100% Secure",
            description: "SSL Encrypted Payments"
        },
        {
            icon: Award,
            title: "Certified Doctors",
            description: "BAMS Qualified Practitioners"
        },
        {
            icon: Heart,
            title: "5000+ Happy Patients",
            description: "Trusted by Thousands"
        },
        {
            icon: Leaf,
            title: "100% Natural",
            description: "Organic Himalayan Herbs"
        },
        {
            icon: Clock,
            title: "15+ Years",
            description: "Experience & Expertise"
        },
        {
            icon: Users,
            title: "Expert Consultation",
            description: "No Hidden Charges"
        }
    ];

    return (
        <section className="py-12 bg-white border-y border-lotus/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {badges.map((badge, index) => {
                        const Icon = badge.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-lotus-light/10 transition-colors duration-300 cursor-default"
                            >
                                <div className="w-12 h-12 rounded-full bg-lotus-light/30 flex items-center justify-center mb-3">
                                    <Icon className="w-6 h-6 text-lotus" />
                                </div>
                                <h3 className="font-display text-sm font-bold text-maroon mb-1">
                                    {badge.title}
                                </h3>
                                <p className="text-xs text-charcoal/60">
                                    {badge.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
