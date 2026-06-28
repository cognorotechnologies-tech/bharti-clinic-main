import { motion } from 'framer-motion';
import { type ReactNode, useState } from 'react';
import { Play, Pause } from 'lucide-react';

interface HeroWithVideoProps {
    title: string;
    subtitle?: string;
    description?: string;
    videoUrl: string;
    posterImage?: string;
    children?: ReactNode;
    overlayOpacity?: number;
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
}

export function HeroWithVideo({
    title,
    subtitle,
    description,
    videoUrl,
    posterImage,
    children,
    overlayOpacity = 0.6,
    autoPlay = true,
    muted = true,
    loop = true,
}: HeroWithVideoProps) {
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);

    const togglePlay = () => {
        if (videoElement) {
            if (isPlaying) {
                videoElement.pause();
            } else {
                videoElement.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0">
                <video
                    ref={setVideoElement}
                    className="w-full h-full object-cover"
                    autoPlay={autoPlay}
                    muted={muted}
                    loop={loop}
                    playsInline
                    poster={posterImage}
                >
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Gradient Overlay */}
                <div
                    className="absolute inset-0 bg-gradient-to-b from-maroon/80 via-maroon/60 to-maroon/80"
                    style={{ opacity: overlayOpacity }}
                />
            </div>

            {/* Play/Pause Button */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={togglePlay}
                className="absolute top-6 right-6 z-20 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
                {isPlaying ? (
                    <Pause className="w-5 h-5 text-white" />
                ) : (
                    <Play className="w-5 h-5 text-white" />
                )}
            </motion.button>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center text-center max-w-4xl mx-auto"
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
                        className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
                    >
                        {title}
                    </motion.h1>

                    {description && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-2xl"
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
                    className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
                >
                    <motion.div className="w-1 h-2 bg-white rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}
