import { useNavigate } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';

export function NotFoundPage() {
    const navigate = useNavigate();

    const popularLinks = [
        { label: 'Shop Products', path: '/shop' },
        { label: 'Browse Therapies', path: '/therapies' },
        { label: 'View Packages', path: '/packages' },
        { label: 'Gallery', path: '/gallery' },
        { label: 'Blog', path: '/blog' },
        { label: 'Contact Us', path: '/contact' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-ivory via-white to-lotus/5 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    {/* Lotus Illustration */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="mb-8"
                    >
                        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-lotus/20 to-maroon/20 mb-6 relative">
                            {/* Animated Lotus Petals */}
                            <motion.div
                                animate={{
                                    rotate: 360,
                                }}
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: 'linear',
                                }}
                                className="absolute inset-0 opacity-30"
                            >
                                <svg
                                    viewBox="0 0 100 100"
                                    className="w-full h-full"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M50 20 C30 20, 20 30, 20 50 C20 30, 30 20, 50 20Z"
                                        fill="currentColor"
                                        className="text-lotus"
                                    />
                                    <path
                                        d="M50 20 C70 20, 80 30, 80 50 C80 30, 70 20, 50 20Z"
                                        fill="currentColor"
                                        className="text-maroon"
                                    />
                                </svg>
                            </motion.div>

                            {/* 404 Text */}
                            <span className="font-display text-5xl text-maroon relative z-10">
                                404
                            </span>
                        </div>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="font-display text-5xl md:text-6xl text-maroon mb-4"
                    >
                        Page Not Found
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-charcoal/70 text-lg md:text-xl mb-8 max-w-2xl mx-auto"
                    >
                        The page you're looking for seems to have wandered off like a lotus petal in the wind.
                        Let's help you find your way back to wellness.
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                    >
                        <Button
                            onClick={() => navigate('/')}
                            variant="primary"
                            className="flex items-center gap-2"
                        >
                            <Home className="w-4 h-4" />
                            Go to Homepage
                        </Button>
                        <Button
                            onClick={() => navigate(-1)}
                            variant="secondary"
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Go Back
                        </Button>
                    </motion.div>

                    {/* Popular Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="bg-white rounded-3xl p-8 shadow-lg border border-lotus/10"
                    >
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <Search className="w-5 h-5 text-lotus" />
                            <h2 className="font-display text-2xl text-maroon">
                                Popular Pages
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {popularLinks.map((link, index) => (
                                <motion.button
                                    key={link.path}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.7 + index * 0.05 }}
                                    onClick={() => navigate(link.path)}
                                    className="px-6 py-3 rounded-xl bg-ivory hover:bg-lotus/10 text-maroon font-medium transition-all duration-300 hover:shadow-md hover:scale-105"
                                >
                                    {link.label}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Help Text */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="mt-8"
                    >
                        <p className="text-charcoal/60 text-sm">
                            Need help? Visit our{' '}
                            <button
                                onClick={() => navigate('/contact')}
                                className="text-lotus hover:text-lotus-dark underline"
                            >
                                contact page
                            </button>{' '}
                            or call us at{' '}
                            <a
                                href="tel:+919876543210"
                                className="text-lotus hover:text-lotus-dark underline"
                            >
                                +91 98765 43210
                            </a>
                        </p>
                    </motion.div>

                    {/* Decorative Elements */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        className="mt-12 flex justify-center gap-2"
                    >
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.6, 0.3],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                }}
                                className="w-2 h-2 rounded-full bg-lotus"
                            />
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
