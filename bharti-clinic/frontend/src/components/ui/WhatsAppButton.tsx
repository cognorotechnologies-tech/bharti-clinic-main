import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
    const phoneNumber = "918288842777";
    const message = "Hi Bharti Clinic, I'm interested in your Ayurvedic therapies and products.";

    const handleClick = () => {
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 z-[9999]"
        >
            <button
                onClick={handleClick}
                className="group relative flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl hover:shadow-[#25D366]/40 transition-shadow duration-300"
                aria-label="Contact on WhatsApp"
            >
                {/* Ripple Effect */}
                <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></div>

                <MessageSquare className="w-8 h-8 fill-current" />

                {/* Tooltip */}
                <span className="absolute right-full mr-4 px-4 py-2 bg-charcoal text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-xl border border-white/10 italic">
                    Chat with our Experts! 🌸
                </span>
            </button>
        </motion.div>
    );
};
