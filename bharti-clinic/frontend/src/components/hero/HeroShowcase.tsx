import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface HeroShowcaseProps {
    title: string;
    subtitle?: string;
    description?: string;
    stats?: Array<{ label: string; value: string | number }>;
    children?: ReactNode;
    backgroundPattern?: boolean;
}

export function HeroShowcase({
    title,
    subtitle,
    description,
    stats,
    children,
    backgroundPattern = true,
}: HeroShowcaseProps) {
    return (
        <section className="relative bg-gradient-to-br from-maroon via-maroon/95 to-lotus-pink/20 py-16 sm:py-20 lg:py-28 overflow-hidden">
            {/* Background Pattern */}
            {backgroundPattern && (
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                            backgroundSize: '40px 40px',
                        }}
                    />
                </div>
            )}

            {/* Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-20 right-20 w-64 h-64 bg-lotus-pink/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-20 left-20 w-80 h-80 bg-gold/20 rounded-full blur-3xl"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto text-center">
                    {subtitle && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-lotus-pink font-semibold text-sm sm:text-base uppercase tracking-wider mb-4"
                        >
                            {subtitle}
                        </motion.p>
                    )}

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
                    >
                        {title}
                    </motion.h1>

                    {description && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto"
                        >
                            {description}
                        </motion.p>
                    )}

                    {children && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mb-12"
                        >
                            {children}
                        </motion.div>
                    )}

                    {/* Stats */}
                    {stats && stats.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-lotus-pink mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm sm:text-base text-white/80 uppercase tracking-wide">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}
