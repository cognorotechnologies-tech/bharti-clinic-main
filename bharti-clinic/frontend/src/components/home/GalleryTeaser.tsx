import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Spinner } from '../ui/Spinner';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import { cn } from '../../lib/utils';
import api from '../../lib/axios';

interface GalleryItem {
    id: string;
    url: string;
    title: string;
}

export const GalleryTeaser: React.FC = () => {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await api.get(`/api/gallery?limit=6`);
                // API returns { success, data, message } wrapper
                const responseData = response.data.data || response.data;
                setItems(Array.isArray(responseData) ? responseData : []);
            } catch (error) {
                console.error('Error fetching gallery:', error);
                // Fallback placeholders
                setItems([
                    { id: '1', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600', title: 'Therapy Room' },
                    { id: '2', url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600', title: 'Herbal Extracts' },
                    { id: '3', url: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=600', title: 'Healing Herbs' },
                    { id: '4', url: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=600', title: 'Ayurvedic Treatment' },
                    { id: '5', url: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=600', title: 'Wellness Session' },
                    { id: '6', url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600', title: 'Holistic Care' },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    if (loading) {
        return (
            <div className="py-24 flex justify-center items-center">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div className="max-w-2xl">
                        <span className="text-lotus font-bold tracking-widest text-xs uppercase mb-3 block">Visual Sanctuary</span>
                        <h2 className="font-display text-4xl sm:text-5xl text-maroon">Glimpses of Peace</h2>
                    </div>
                    <Button variant="ghost" className="text-maroon border-maroon/20 hover:bg-maroon hover:text-white group">
                        View Full Gallery
                        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[250px]">
                    {items && items.length > 0 ? items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={cn(
                                "relative group overflow-hidden rounded-3xl",
                                index === 0 ? "md:row-span-2 md:col-span-1" :
                                    index === 3 ? "md:col-span-2" : ""
                            )}
                        >
                            <ImageWithFallback
                                src={item.url}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-maroon/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6 text-center">
                                <p className="text-white font-display text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.title}</p>
                            </div>
                        </motion.div>
                    )) : (
                        <div className="col-span-full py-12 text-center text-charcoal/40 font-accent text-xl">
                            Capturing more moments of peace...
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
