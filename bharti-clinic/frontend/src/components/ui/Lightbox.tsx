import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LightboxProps {
    images: Array<{
        url: string;
        caption?: string;
        alt?: string;
    }>;
    currentIndex: number;
    isOpen: boolean;
    onClose: () => void;
    onNext?: () => void;
    onPrevious?: () => void;
    showDownload?: boolean;
}

export function Lightbox({
    images,
    currentIndex,
    isOpen,
    onClose,
    onNext,
    onPrevious,
    showDownload = true,
}: LightboxProps) {
    const currentImage = images[currentIndex];

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'Escape':
                    onClose();
                    break;
                case 'ArrowLeft':
                    if (onPrevious && currentIndex > 0) {
                        onPrevious();
                    }
                    break;
                case 'ArrowRight':
                    if (onNext && currentIndex < images.length - 1) {
                        onNext();
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, currentIndex, images.length, onClose, onNext, onPrevious]);

    // Prevent body scroll when lightbox is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = currentImage.url;
        link.download = `image-${currentIndex + 1}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                    onClick={onClose}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        aria-label="Close lightbox"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Download Button */}
                    {showDownload && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDownload();
                            }}
                            className="absolute top-4 right-16 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            aria-label="Download image"
                        >
                            <Download className="w-6 h-6" />
                        </button>
                    )}

                    {/* Previous Button */}
                    {onPrevious && currentIndex > 0 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onPrevious();
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="w-8 h-8" />
                        </button>
                    )}

                    {/* Next Button */}
                    {onNext && currentIndex < images.length - 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onNext();
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            aria-label="Next image"
                        >
                            <ChevronRight className="w-8 h-8" />
                        </button>
                    )}

                    {/* Image Container */}
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="relative max-w-7xl max-h-[90vh] mx-auto px-16"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={currentImage.url}
                            alt={currentImage.alt || currentImage.caption || `Image ${currentIndex + 1}`}
                            className="max-w-full max-h-[85vh] object-contain rounded-lg"
                        />

                        {/* Caption */}
                        {currentImage.caption && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg"
                            >
                                <p className="text-white text-center text-lg">
                                    {currentImage.caption}
                                </p>
                            </motion.div>
                        )}

                        {/* Image Counter */}
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white/70 text-sm">
                            {currentIndex + 1} / {images.length}
                        </div>
                    </motion.div>

                    {/* Keyboard Hints */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 text-white/50 text-xs">
                        <span>← → Navigate</span>
                        <span>ESC Close</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
