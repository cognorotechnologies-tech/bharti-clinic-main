import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ChevronLeft, ChevronRight, Maximize2, Camera, Video } from 'lucide-react';
import api from '../lib/axios';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { HeroBase } from '../components/hero/HeroBase';
import { SEO, SEO_CONFIGS } from '../components/SEO';

interface GalleryItem {
    id: string;
    type: 'PHOTO' | 'VIDEO';
    url: string;
    thumbnailUrl: string | null;
    category: string;
    caption: string | null;
}

const CATEGORIES = ['All', 'Clinic Interior', 'Therapy Sessions', 'Team & Doctors', 'Events', 'Products'];

export const GalleryPage: React.FC = () => {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'PHOTO' | 'VIDEO'>('PHOTO');
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/api/gallery?type=${activeTab}`);
                // API returns { success, data, message }
                const responseData = res.data.data || res.data;
                setItems(Array.isArray(responseData) ? responseData : []);
            } catch (error) {
                console.error('Error fetching gallery:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchGallery();
    }, [activeTab]);

    const filteredItems = items.filter(item =>
        activeCategory === 'All' || item.category === activeCategory
    );

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedItemIndex !== null) {
            setSelectedItemIndex((selectedItemIndex + 1) % filteredItems.length);
        }
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedItemIndex !== null) {
            setSelectedItemIndex((selectedItemIndex - 1 + filteredItems.length) % filteredItems.length);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedItemIndex === null) return;
            if (e.key === 'ArrowRight') handleNext(e as any);
            if (e.key === 'ArrowLeft') handlePrev(e as any);
            if (e.key === 'Escape') setSelectedItemIndex(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedItemIndex, filteredItems.length]);

    return (
        <div className="bg-ivory/30 min-h-screen pb-24 font-body">
            <SEO {...SEO_CONFIGS.gallery} />
            {/* Hero Base */}
            <HeroBase
                title="Our Healing Space"
                subtitle="Gallery"
                description="Take a visual journey through Bharti Clinic. Glimpse into our tranquil healing spaces, authentic therapies, and wellness experts."
                height="md"
                align="center"
                backgroundImage="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1920"
            >
                <Button variant="primary" size="lg">
                    <Camera className="mr-2" size={20} />
                    Explore Gallery
                </Button>
            </HeroBase>

            <div className="max-w-7xl mx-auto px-4 mt-16">

                {/* Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-maroon/5 flex gap-2">
                        {[
                            { id: 'PHOTO', label: 'Photos', icon: Camera },
                            { id: 'VIDEO', label: 'Videos', icon: Video }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => { setActiveTab(tab.id as any); setActiveCategory('All'); }}
                                className={`flex items-center gap-2 px-8 py-3 rounded-xl transition-all duration-300 ${activeTab === tab.id
                                    ? 'bg-maroon text-white shadow-lg shadow-maroon/20'
                                    : 'text-charcoal/40 hover:text-maroon hover:bg-ivory'
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                <span className="text-sm font-bold tracking-widest uppercase">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Category Filters */}
                {activeTab === 'PHOTO' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-wrap justify-center gap-3 mb-16"
                    >
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full border text-xs font-bold tracking-widest uppercase transition-all duration-300 ${activeCategory === cat
                                    ? 'bg-lotus text-white border-lotus shadow-md shadow-lotus/20'
                                    : 'bg-white text-charcoal/40 border-maroon/10 hover:border-lotus/40 hover:text-lotus'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>
                )}

                {/* Grid */}
                <div className="min-h-[400px]">
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-maroon"></div>
                        </div>
                    ) : filteredItems.length > 0 ? (
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredItems.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.4 }}
                                        className="group relative cursor-pointer"
                                        onClick={() => setSelectedItemIndex(index)}
                                    >
                                        <div className="aspect-[4/5] overflow-hidden rounded-[32px] bg-ivory border border-maroon/5 shadow-sm group-hover:shadow-xl transition-all duration-500 overflow-hidden">
                                            {item.type === 'PHOTO' ? (
                                                <img
                                                    src={item.url}
                                                    alt={item.caption || 'Gallery Image'}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="relative w-full h-full">
                                                    <img
                                                        src={item.thumbnailUrl || ''}
                                                        alt={item.caption || 'Video Thumbnail'}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                                                        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-all duration-300">
                                                            <Play className="w-8 h-8 text-white fill-white translate-x-1" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Overlay */}
                                        <div className="absolute inset-x-4 bottom-4 p-6 bg-white/80 backdrop-blur-lg rounded-2xl border border-white/40 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Badge variant="category" className="bg-maroon/5 text-maroon text-[8px] uppercase tracking-widest px-2 py-0.5 border-none">
                                                    {item.category}
                                                </Badge>
                                            </div>
                                            <p className="text-maroon font-bold text-sm leading-tight line-clamp-2">
                                                {item.caption || 'Bharti Clinic Wellness'}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-[40px] border border-maroon/5 shadow-sm">
                            <p className="text-charcoal/40 text-lg">No items found in this category.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox / Video Modal */}
            <AnimatePresence>
                {selectedItemIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
                        onClick={() => setSelectedItemIndex(null)}
                    >
                        <button
                            onClick={() => setSelectedItemIndex(null)}
                            className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        {filteredItems.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrev}
                                    className="absolute left-8 text-white/60 hover:text-white transition-colors p-4 hover:bg-white/10 rounded-full hidden md:block"
                                >
                                    <ChevronLeft className="w-10 h-10" />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="absolute right-8 text-white/60 hover:text-white transition-colors p-4 hover:bg-white/10 rounded-full hidden md:block"
                                >
                                    <ChevronRight className="w-10 h-10" />
                                </button>
                            </>
                        )}

                        <div
                            className="max-w-5xl w-full flex flex-col items-center"
                            onClick={e => e.stopPropagation()}
                        >
                            <motion.div
                                key={filteredItems[selectedItemIndex].id}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                className="w-full relative shadow-2xl rounded-3xl overflow-hidden bg-black"
                            >
                                {filteredItems[selectedItemIndex].type === 'PHOTO' ? (
                                    <img
                                        src={filteredItems[selectedItemIndex].url}
                                        alt={filteredItems[selectedItemIndex].caption || ''}
                                        className="max-h-[70vh] w-full object-contain"
                                    />
                                ) : (
                                    <div className="aspect-video w-full bg-black">
                                        <iframe
                                            src={`${filteredItems[selectedItemIndex].url}?autoplay=1`}
                                            title="Video Player"
                                            className="w-full h-full border-none"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                )}

                                <div className="p-6 bg-gradient-to-t from-black/80 to-transparent absolute bottom-0 inset-x-0 backdrop-blur-sm">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Badge variant="category" className="bg-lotus text-white text-[10px] uppercase border-none px-3 py-1">
                                                    {filteredItems[selectedItemIndex].category}
                                                </Badge>
                                                <span className="text-white/40 text-xs font-mono">
                                                    {selectedItemIndex + 1} / {filteredItems.length}
                                                </span>
                                            </div>
                                            <p className="text-white text-lg font-display">
                                                {filteredItems[selectedItemIndex].caption}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
