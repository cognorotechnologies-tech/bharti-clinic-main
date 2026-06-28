import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { SectionTitle } from '../ui/SectionTitle';
import { Spinner } from '../ui/Spinner';
import { Clock } from 'lucide-react';
import api from '../../lib/axios';

interface Therapy {
    id: string;
    name: string;
    slug?: string;
    description: string;
    durationMinutes: number;
    price: number;
    imageUrl?: string;
    isFeatured: boolean;
}

import { AmbientLeaves } from '../ui/AmbientLeaves';

export const TherapiesPreview: React.FC = () => {
    const [therapies, setTherapies] = useState<Therapy[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTherapies = async () => {
            try {
                const response = await api.get(`/api/therapies?featured=true`);
                // API returns { success, data, message } wrapper
                const therapiesData = response.data.data || response.data;
                setTherapies(Array.isArray(therapiesData) ? therapiesData : []);
            } catch (error) {
                console.error('Error fetching therapies:', error);
                // Fallback data if API fails to show something beautiful
                setTherapies([
                    { id: '1', name: 'Abhyanga Massage', description: 'Rhythmic warm oil massage to balance doshas and improve circulation.', durationMinutes: 60, price: 2500, isFeatured: true },
                    { id: '2', name: 'Shirodhara', description: 'Pure relaxation with a continuous stream of warm oil on the forehead.', durationMinutes: 45, price: 3000, isFeatured: true },
                    { id: '3', name: 'Panchakarma', description: 'Complete detoxification and rejuvenation through 5 sacred stages.', durationMinutes: 120, price: 5000, isFeatured: true },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchTherapies();
    }, []);

    if (loading) {
        return (
            <div className="py-24 flex justify-center items-center">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <section className="py-24 bg-ivory-100 relative overflow-hidden">
            <AmbientLeaves count={20} className="opacity-60 z-0" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionTitle
                    title="Our Healing Therapies"
                    subtitle="Discover ancient rituals designed for your modern well-being"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                    {therapies.map((therapy, index) => (
                        <motion.div
                            key={therapy.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white rounded-3xl overflow-hidden border border-lotus/10 hover:border-lotus/20 hover:shadow-xl hover:shadow-lotus/10 transition-all duration-500 flex flex-col h-full"
                        >
                            {/* Image */}
                            <div className="relative w-full aspect-[4/3] overflow-hidden bg-ivory">
                                {therapy.imageUrl ? (
                                    <img
                                        src={therapy.imageUrl}
                                        alt={therapy.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-lotus-light/30 to-ivory">
                                        <svg viewBox="0 0 24 24" className="w-20 h-20 text-lotus/30 fill-none stroke-current stroke-[1.5]">
                                            {index % 3 === 0 ? (
                                                <path d="M12 2L15 8H9L12 2ZM3 15C3 15 5 10 12 10C19 10 21 15 21 15C21 15 19 20 12 20C5 20 3 15 3 15Z" />
                                            ) : index % 3 === 1 ? (
                                                <path d="M12 22C12 22 20 18 20 12C20 6 12 2 12 2C12 2 4 6 4 12C4 18 12 22 12 22Z" />
                                            ) : (
                                                <path d="M12 3C7.5 3 4 6.5 4 11C4 15.5 7.5 19 12 19V22M12 19C16.5 19 20 15.5 20 11C20 6.5 16.5 3 12 3Z" />
                                            )}
                                        </svg>
                                    </div>
                                )}
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-grow">
                                <Link to={`/therapies/${therapy.slug || therapy.id}`}>
                                    <h3 className="font-display text-2xl text-maroon mb-3 hover:text-lotus-deep transition-colors duration-300 cursor-pointer">
                                        {therapy.name}
                                    </h3>
                                </Link>

                                <p className="text-charcoal/70 mb-6 flex-grow leading-relaxed">
                                    {therapy.description}
                                </p>

                                <div className="flex items-center gap-4 mb-6">
                                    <Badge variant="category" className="bg-lotus-light/30 border-lotus/10 flex items-center gap-1.5 py-1.5">
                                        <Clock className="w-3.5 h-3.5" />
                                        {therapy.durationMinutes || 45} mins
                                    </Badge>
                                    <div className="text-maroon font-bold text-lg">
                                        ₹{therapy.price ? therapy.price.toLocaleString() : '0'}
                                    </div>
                                </div>

                                <Link to={`/therapies/${therapy.slug || therapy.id}`}>
                                    <Button
                                        variant="ghost"
                                        className="w-full border border-lotus/10 group-hover:bg-maroon group-hover:text-white group-hover:border-maroon transition-all duration-300"
                                    >
                                        Learn More
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
