import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface HeroSplitProps {
    title: string;
    subtitle?: string;
    description?: string;
    leftContent?: ReactNode;
    rightContent?: ReactNode;
    reverse?: boolean;
    backgroundColor?: string;
}

export function HeroSplit({
    title,
    subtitle,
    description,
    leftContent,
    rightContent,
    reverse = false,
    backgroundColor = 'bg-ivory/30',
}: HeroSplitProps) {
    return (
        <section className={`relative ${backgroundColor} py-16 sm:py-20 lg:py-24 overflow-hidden`}>
            {/* Decorative Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-lotus-pink/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${reverse ? 'lg:flex-row-reverse' : ''
                        }`}
                >
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className={reverse ? 'lg:order-2' : ''}
                    >
                        {subtitle && (
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-lotus-pink font-semibold text-sm sm:text-base uppercase tracking-wider mb-4"
                            >
                                {subtitle}
                            </motion.p>
                        )}

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-maroon mb-6"
                        >
                            {title}
                        </motion.h1>

                        {description && (
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-lg sm:text-xl text-charcoal/80 mb-8"
                            >
                                {description}
                            </motion.p>
                        )}

                        {leftContent && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            >
                                {leftContent}
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Visual Content */}
                    <motion.div
                        initial={{ opacity: 0, x: reverse ? -50 : 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={reverse ? 'lg:order-1' : ''}
                    >
                        {rightContent}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
