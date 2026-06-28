import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ScrollToTopButton Component
 * 
 * A floating button that appears when user scrolls down.
 * Clicking it smoothly scrolls back to the top of the page.
 * 
 * Features:
 * - Only shows after scrolling 300px down
 * - Smooth fade in/out animation
 * - Smooth scroll to top
 * - Fixed position (bottom-right)
 * - Accessible with keyboard
 * 
 * Usage: Add to Layout or App component
 * <ScrollToTopButton />
 */
export function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show button when user scrolls down 300px
            setIsVisible(window.scrollY > 300);
        };

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Cleanup
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 p-4 bg-maroon text-white rounded-full shadow-lg hover:bg-maroon/90 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-offset-2"
                    aria-label="Scroll to top"
                    title="Scroll to top"
                >
                    <ChevronUp size={24} />
                </motion.button>
            )}
        </AnimatePresence>
    );
}

/**
 * ScrollToTopButtonSimple Component
 * 
 * Same as ScrollToTopButton but without Framer Motion animations.
 * Use this if you want to avoid the animation library dependency.
 */
export function ScrollToTopButtonSimple() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-4 bg-maroon text-white rounded-full shadow-lg hover:bg-maroon/90 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-offset-2"
            aria-label="Scroll to top"
            title="Scroll to top"
        >
            <ChevronUp size={24} />
        </button>
    );
}
