import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface HeroBaseProps {
    title: string;
    subtitle?: string;
    description?: string;
    children?: ReactNode;
    backgroundImage?: string;
    overlay?: boolean;
    height?: 'sm' | 'md' | 'lg' | 'full';
    align?: 'left' | 'center' | 'right';
}

export function HeroBase({
    title,
    subtitle,
    description,
    children,
    backgroundImage,
    overlay = true,
    height = 'md',
    align = 'center',
}: HeroBaseProps) {
    const heightClasses = {
        sm: 'min-h-[40vh]',
        md: 'min-h-[60vh]',
        lg: 'min-h-[80vh]',
        full: 'min-h-screen',
    };

    const alignClasses = {
        left: 'text-left items-start',
        center: 'text-center items-center',
        right: 'text-right items-end',
    };

    return (
        <section
            className={`relative ${heightClasses[height]} flex items-center justify-center overflow-hidden`}
            style={
                backgroundImage
                    ? {
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }
                    : undefined
            }
        >
            {/* Overlay */}
            {overlay && backgroundImage && (
                <div className="absolute inset-0 bg-gradient-to-b from-maroon/80 via-maroon/60 to-maroon/80" />
            )}

            {/* Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 right-10 w-32 h-32 bg-lotus-pink/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className={`flex flex-col ${alignClasses[align]} max-w-4xl mx-auto`}
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
                        className={`font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 ${backgroundImage ? 'text-white' : 'text-maroon'
                            }`}
                    >
                        {title}
                    </motion.h1>

                    {description && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className={`text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl ${backgroundImage ? 'text-white/90' : 'text-charcoal/80'
                                }`}
                        >
                            {description}
                        </motion.p>
                    )}

                    {children && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="flex flex-wrap gap-4 justify-center"
                        >
                            {children}
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-6 h-10 border-2 border-lotus-pink/50 rounded-full flex items-start justify-center p-2"
                >
                    <motion.div className="w-1 h-2 bg-lotus-pink rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}
