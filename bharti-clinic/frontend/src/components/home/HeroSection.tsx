import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Button } from '../ui/Button';
import { PetalAnimationSystem } from '../../utils/petalAnimation';

export const HeroSection: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const petalCount = isMobile ? 30 : 60;
        const animationSystem = new PetalAnimationSystem(canvas, petalCount);
        animationSystem.start();

        const handleWindowResize = () => {
            animationSystem.handleResize();
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
            animationSystem.destroy();
        };
    }, [isMobile]);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
    };

    const headline = "Heal Naturally.\nLive Beautifully.";

    return (
        <section className="relative w-full h-screen overflow-hidden flex items-center pt-16">
            {/* 1. z-0: CSS Gradient Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: 'radial-gradient(circle at top left, #B5476A 0%, #FFFDF7 70%)'
                }}
            />

            {/* 2. z-1: Semi-transparent Mandala SVG (rotating) */}
            <div className="absolute inset-0 z-1 flex items-center justify-center pointer-events-none overflow-hidden">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                    className="relative w-[1000px] h-[1000px] opacity-[0.08]"
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full text-maroon fill-current">
                        <path d="M50 0 C60 20 80 40 100 50 C80 60 60 80 50 100 C40 80 20 60 0 50 C20 40 40 20 50 0 Z" />
                        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        {Array.from({ length: 24 }).map((_, i) => (
                            <path
                                key={i}
                                d="M50 10 L52 15 L48 15 Z"
                                transform={`rotate(${i * 15} 50 50)`}
                            />
                        ))}
                    </svg>
                </motion.div>
            </div>

            {/* 3. z-2: Canvas Petal Particles */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-2 pointer-events-none w-full h-full"
                style={{ width: '100%', height: '100%' }}
            />

            {/* 4. z-3: Blurred bokeh circles */}
            <div className="absolute inset-0 z-3 pointer-events-none">
                <div className="absolute top-1/4 left-1/2 w-96 h-96 bg-lotus/20 rounded-full blur-[120px] mix-blend-soft-light" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[150px] mix-blend-soft-light" />
            </div>

            {/* 5. z-10: Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Text Content (Left 55% on Desktop) */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="w-full lg:w-[55%] text-left"
                    >
                        <motion.span
                            variants={itemVariants}
                            className="inline-block text-maroon font-bold tracking-[0.25em] text-xs sm:text-sm uppercase mb-6"
                        >
                            🌿 Authentic Ayurvedic Healing
                        </motion.span>

                        <motion.h1
                            variants={itemVariants}
                            className="font-display font-bold leading-[1.1] mb-8 text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-sm"
                        >
                            {headline.split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 + i * 0.04, duration: 0.1 }}
                                >
                                    {char === "\n" ? <br /> : char}
                                </motion.span>
                            ))}
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-charcoal/80 text-lg md:text-xl font-body max-w-xl mb-10 leading-relaxed"
                        >
                            Ancient wisdom. Modern wellness. Personalised healing journeys crafted with love and tradition.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap gap-4 mb-10"
                        >
                            <div className="relative">
                                <Link to="/contact">
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        className="px-8 shadow-lg shadow-lotus/20 hover:shadow-xl hover:shadow-lotus/30 hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                                    >
                                        <span className="relative z-10">Book a Consultation</span>
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-lotus-deep to-maroon opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            initial={{ x: '-100%' }}
                                            whileHover={{ x: 0 }}
                                        />
                                    </Button>
                                </Link>
                            </div>
                            <Link to="/therapies">
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="px-8 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-maroon hover:scale-105 transition-all duration-300"
                                >
                                    Explore Our Therapies
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-maroon/80"
                        >
                            <span className="flex items-center gap-1.5"><span className="text-gold">✓</span> 15+ Years Experience</span>
                            <span className="flex items-center gap-1.5"><span className="text-gold">✓</span> 5,000+ Happy Patients</span>
                            <span className="flex items-center gap-1.5"><span className="text-gold">✓</span> 100% Natural</span>
                        </motion.div>
                    </motion.div>

                    {/* Botanical Visual (Right 45% on Desktop) */}
                    <motion.div
                        initial={{ opacity: 0, x: 100, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                        className="w-full lg:w-[40%] hidden lg:block"
                    >
                        <div className="relative">
                            {/* Organic blob background for the image */}
                            <div className="absolute -inset-10 bg-gold/20 rounded-full blur-3xl animate-pulse" />
                            <div className="absolute -inset-5 bg-lotus/20 rounded-full blur-2xl animate-breathe" />

                            <div className="relative z-10 w-full aspect-[4/5] rounded-[30%_70%_70%_30%/30%_30%_70%_70%] overflow-hidden border-8 border-white/30 shadow-2xl shadow-maroon/10">
                                <img
                                    src="https://lh3.googleusercontent.com/p/AF1QipMBAqWJKCtAhZpxuvcDDLcG9cijNxaNUBPykCSB=s1000"
                                    alt="Bharti Veda Wellness"
                                    className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-maroon/10 mix-blend-hard-light" />
                            </div>

                            {/* Floating decorative elements */}
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-8 -left-8 bg-white p-4 rounded-2xl shadow-xl border border-ivory flex items-center gap-3 z-20"
                            >
                                <div className="w-12 h-12 rounded-full bg-lotus-light flex items-center justify-center text-maroon">
                                    🌿
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-maroon uppercase tracking-wider">Ayurvedic</p>
                                    <p className="text-sm font-semibold text-charcoal">Pure Extracts</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Enhanced Scroll Hint (Bottom center) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 cursor-pointer group"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <div className="flex flex-col items-center gap-2">
                    <p className="text-[10px] font-bold text-white/80 group-hover:text-white font-body uppercase tracking-[0.3em] transition-colors">
                        Discover More
                    </p>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-6 h-10 border-2 border-white/40 group-hover:border-white/60 rounded-full flex justify-center p-1.5 transition-colors"
                    >
                        <motion.div
                            animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-1 h-3 bg-white/70 group-hover:bg-white rounded-full"
                        />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};
