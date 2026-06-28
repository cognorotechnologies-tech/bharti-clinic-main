import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export const AboutSnippet: React.FC = () => {
    return (
        <section className="py-24 bg-gradient-to-br from-ivory via-white to-lotus-light/10 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Content Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lotus-deep font-bold tracking-[0.2em] text-xs uppercase mb-4 block"
                        >
                            Our Journey
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="font-display text-4xl md:text-5xl text-maroon mb-8 leading-tight"
                        >
                            The Bharti Healing Story
                        </motion.h2>
                        <div className="space-y-6 text-charcoal/80 text-lg leading-relaxed font-body">
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                            >
                                Founded by Dr. Ipinder Bharti, our clinic has spent over 15 years bridging the gap between ancient Ayurvedic wisdom and modern human wellness.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                            >
                                What started as a small local practice has blossomed into a sanctuary for those seeking authentic, root-cause healing. Every therapy, every herb, and every consultation is rooted in a lineage of tradition that spans centuries.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 }}
                                className="font-medium text-maroon/90 italic font-accent text-xl"
                            >
                                "Ayurveda is not just a medicine; it is a way of life that honours the divine connection between our bodies and nature."
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7 }}
                            className="mt-10"
                        >
                            <Link to="/about">
                                <Button variant="secondary" size="lg" className="border-lotus text-maroon hover:bg-lotus hover:text-white group">
                                    Read Our Full Story
                                    <motion.span
                                        className="ml-2 inline-block"
                                        animate={{ x: [0, 4, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        →
                                    </motion.span>
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Enhanced Decorative Frame Right */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative h-[500px] w-full perspective-1000"
                    >
                        {/* Elegant Frame with Hover Effect */}
                        <motion.div
                            whileHover={{ scale: 1.02, rotateY: 5 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 bg-white shadow-2xl rounded-tr-[100px] rounded-bl-[100px] border-2 border-lotus/30 overflow-hidden group cursor-pointer"
                        >
                            {/* Animated Gradient Background */}
                            <motion.div
                                animate={{
                                    background: [
                                        'linear-gradient(135deg, rgba(181, 71, 106, 0.1) 0%, rgba(250, 232, 238, 0.3) 100%)',
                                        'linear-gradient(135deg, rgba(250, 232, 238, 0.3) 0%, rgba(181, 71, 106, 0.1) 100%)',
                                        'linear-gradient(135deg, rgba(181, 71, 106, 0.1) 0%, rgba(250, 232, 238, 0.3) 100%)',
                                    ]
                                }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                {/* Rotating Lotus Watermark with Pulse */}
                                <motion.svg
                                    viewBox="0 0 100 100"
                                    className="w-64 h-64 text-lotus opacity-[0.12]"
                                    animate={{ 
                                        rotate: 360,
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{ 
                                        rotate: { duration: 60, repeat: Infinity, ease: "linear" },
                                        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                >
                                    <path d="M50 0 C60 20 80 40 100 50 C80 60 60 80 50 100 C40 80 20 60 0 50 C20 40 40 20 50 0 Z" fill="currentColor" />
                                    <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
                                </motion.svg>

                                {/* Enhanced Content Overlay */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.8, duration: 0.6 }}
                                        className="w-20 h-px bg-gradient-to-r from-transparent via-maroon to-transparent mb-8 opacity-60"
                                    />
                                    
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 1, duration: 0.8 }}
                                        className="font-accent text-3xl md:text-4xl text-maroon/70 leading-tight font-semibold"
                                    >
                                        Traditional Wisdom
                                        <br />
                                        <span className="text-lotus-deep">For the Modern Soul</span>
                                    </motion.p>
                                    
                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 1.2, duration: 0.6 }}
                                        className="w-20 h-px bg-gradient-to-r from-transparent via-maroon to-transparent mt-8 opacity-60"
                                    />

                                    {/* Floating Decorative Elements */}
                                    <motion.div
                                        animate={{ 
                                            y: [0, -10, 0],
                                            rotate: [0, 5, 0]
                                        }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute top-8 right-8 text-4xl opacity-20"
                                    >
                                        🌿
                                    </motion.div>
                                    <motion.div
                                        animate={{ 
                                            y: [0, 10, 0],
                                            rotate: [0, -5, 0]
                                        }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                        className="absolute bottom-8 left-8 text-4xl opacity-20"
                                    >
                                        🪷
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Shimmer Effect on Hover */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            />
                        </motion.div>

                        {/* Enhanced Accent Shapes with Animation */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 0.5, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            animate={{ rotate: [0, 5, 0] }}
                            className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-gold rounded-tr-3xl pointer-events-none"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 0.5, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            animate={{ rotate: [0, -5, 0] }}
                            className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-gold rounded-bl-3xl pointer-events-none"
                        />

                        {/* Floating Glow Effects */}
                        <motion.div
                            animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-10 -right-10 w-40 h-40 bg-lotus/20 rounded-full blur-3xl pointer-events-none"
                        />
                        <motion.div
                            animate={{ 
                                scale: [1, 1.3, 1],
                                opacity: [0.2, 0.4, 0.2]
                            }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-10 -left-10 w-40 h-40 bg-gold/20 rounded-full blur-3xl pointer-events-none"
                        />
                    </motion.div>

                </div>
            </div>

            {/* Enhanced Background Decorative Elements */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03] pointer-events-none"
            >
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-maroon">
                    <path d="M50 0 C60 20 80 40 100 50 C80 60 60 80 50 100 C40 80 20 60 0 50 C20 40 40 20 50 0 Z" />
                </svg>
            </motion.div>

            {/* Additional Floating Petals */}
            <motion.div
                animate={{ 
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                    rotate: [0, 10, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 left-10 text-6xl opacity-10 pointer-events-none"
            >
                🌸
            </motion.div>
            <motion.div
                animate={{ 
                    y: [0, 20, 0],
                    x: [0, -10, 0],
                    rotate: [0, -10, 0]
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-20 right-20 text-5xl opacity-10 pointer-events-none"
            >
                🪷
            </motion.div>
        </section>
    );
};
