import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Leaf, Sparkles, HeartPulse, Flower2, Eye, LayoutGrid, Calendar } from 'lucide-react';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Spinner } from '../components/ui/Spinner';
import { TherapyCard } from '../components/therapies/TherapyCard';
import { TherapyCardSkeleton } from '../components/ui/LoadingSkeleton';
import { HeroShowcase } from '../components/hero/HeroShowcase';
import type { Therapy } from '../components/therapies/TherapyCard';
import { BookingModal } from '../components/therapies/BookingModal';
import api from '../lib/axios';
import { cn } from '../lib/utils';
import { SEO, SEO_CONFIGS } from '../components/SEO';

const categories = [
    { name: "All", slug: "all", icon: <LayoutGrid className="w-4 h-4" /> },
    { name: "Panchakarma", slug: "panchakarma", icon: <Leaf className="w-4 h-4" /> },
    { name: "Relaxation", slug: "relaxation", icon: <Sparkles className="w-4 h-4" /> },
    { name: "Pain Relief", slug: "pain-relief", icon: <HeartPulse className="w-4 h-4" /> },
    { name: "Skin & Beauty", slug: "skin-beauty", icon: <Flower2 className="w-4 h-4" /> },
    { name: "Eye Care", slug: "eye-care", icon: <Eye className="w-4 h-4" /> },
];

export const TherapiesPage: React.FC = () => {
    const [therapies, setTherapies] = useState<Therapy[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [selectedTherapy, setSelectedTherapy] = useState<Therapy | null>(null);

    useEffect(() => {
        const fetchTherapies = async () => {
            try {
                const response = await api.get(`/api/therapies`);
                // API returns { success, data, message }
                const responseData = response.data.data || response.data;
                setTherapies(Array.isArray(responseData) ? responseData : []);
            } catch (error) {
                console.error('Error fetching therapies:', error);
                // Fallback data
                setTherapies([
                    {
                        id: '1',
                        name: "Abhyanga Massage",
                        slug: "abhyanga-massage",
                        description: "A rhythmic warm oil massage that balances doshas, improves circulation, and promotes deep relaxation.",
                        durationMinutes: 60,
                        basePrice: 2500,
                        category: { id: 'c1', name: "Relaxation", slug: "relaxation" },
                        benefits: ["Stress reduction", "Better sleep", "Detoxification"]
                    },
                    {
                        id: '2',
                        name: "Shirodhara",
                        slug: "shirodhara",
                        description: "A profound relaxation treatment involving a gentle, continuous stream of warm medicated oil on the forehead.",
                        durationMinutes: 45,
                        basePrice: 3500,
                        discountedPrice: 2999,
                        category: { id: 'c1', name: "Relaxation", slug: "relaxation" },
                        benefits: ["Mental clarity", "Relieves anxiety", "Treats insomnia"]
                    },
                    {
                        id: '3',
                        name: "Virechana (Cleanse)",
                        slug: "virechana",
                        description: "A therapeutic purgation process that deeply cleanses the pitta-heavy toxins from the gallbladder and liver.",
                        durationMinutes: 120,
                        basePrice: 7500,
                        category: { id: 'c2', name: "Panchakarma", slug: "panchakarma" },
                        benefits: ["Digestion reset", "Skin clearing", "Systemic detox"]
                    },
                    {
                        id: '4',
                        name: "Netra Tarpana",
                        slug: "netra-tarpana",
                        description: "A specialized eye treatment where medicated ghee is pooled over the eyes to relieve strain and improve vision.",
                        durationMinutes: 30,
                        basePrice: 1800,
                        category: { id: 'c3', name: "Eye Care", slug: "eye-care" },
                        benefits: ["Relieves dryness", "Improves vision", "Soothes optic nerves"]
                    },
                    {
                        id: '5',
                        name: "Griva Basti",
                        slug: "griva-basti",
                        description: "Targeted oil treatment for the neck region to alleviate pain, stiffness, and cervical spondylosis symptoms.",
                        durationMinutes: 45,
                        basePrice: 1500,
                        category: { id: 'c4', name: "Pain Relief", slug: "pain-relief" },
                        benefits: ["Reduces stiffness", "Nerve calming", "Mobility boost"]
                    },
                    {
                        id: '6',
                        name: "Kati Basti",
                        slug: "kati-basti",
                        description: "Warm medicated oil treatment for the lower back to relieve chronic pain and strengthen spinal structures.",
                        durationMinutes: 45,
                        basePrice: 1500,
                        category: { id: 'c4', name: "Pain Relief", slug: "pain-relief" },
                        benefits: ["Back pain relief", "Spinal health", "Muscle relaxation"]
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchTherapies();
    }, []);

    const filteredTherapies = therapies.filter(t => {
        const matchesCategory = activeCategory === "all" || t.category.slug === activeCategory;
        const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleBook = (therapy: Therapy) => {
        setSelectedTherapy(therapy);
        setIsBookingOpen(true);
    };

    if (loading) {
        return (
            <div className="bg-ivory/30 min-h-screen pb-24">
                <SEO {...SEO_CONFIGS.therapies} />
                <section className="pt-32 pb-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <SectionTitle title="Ayurvedic Therapies" subtitle="Ancient Healing Rituals" align="center" />
                        </div>
                    </div>
                </section>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <TherapyCardSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-ivory/30 min-h-screen pb-24">
            <SEO {...SEO_CONFIGS.therapies} />
            {/* Hero Showcase */}
            <HeroShowcase
                title="Ancient Healing, Modern Wellness"
                subtitle="Ayurvedic Therapies"
                description="Experience the transformative power of traditional Panchakarma and massage therapies designed for complete rejuvenation"
                stats={[
                    { label: 'Therapies', value: '15+' },
                    { label: 'Experience', value: '15 Yrs' },
                    { label: 'Sessions', value: '10K+' },
                    { label: 'Satisfaction', value: '98%' },
                ]}
                backgroundPattern={true}
            >
                <div className="flex gap-4">
                    <Button variant="primary" size="lg">
                        <Calendar className="mr-2" size={20} />
                        Book Consultation
                    </Button>
                    <Button variant="secondary" size="lg">
                        View All Therapies
                    </Button>
                </div>
            </HeroShowcase>

            {/* Filters & Search */}
            <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-y border-lotus/10 shadow-sm py-4 mb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Category Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
                        {categories.map((cat) => (
                            <button
                                key={cat.slug}
                                onClick={() => setActiveCategory(cat.slug)}
                                className={cn(
                                    "flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap",
                                    activeCategory === cat.slug
                                        ? "bg-maroon text-white shadow-lg shadow-maroon/20"
                                        : "bg-white text-charcoal/60 hover:bg-lotus-light/20 hover:text-maroon border border-lotus/10"
                                )}
                            >
                                {cat.icon}
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="w-full md:w-80">
                        <Input
                            placeholder="Search treatments..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            icon={<Search className="w-4 h-4" />}
                            className="bg-white border-lotus/20 focus:ring-maroon focus:border-maroon"
                        />
                    </div>
                </div>
            </section>

            {/* Listing Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatePresence mode="popLayout">
                    {filteredTherapies.length > 0 ? (
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                        >
                            {filteredTherapies.map((therapy) => (
                                <TherapyCard
                                    key={therapy.id}
                                    therapy={therapy}
                                    onBook={handleBook}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20 flex flex-col items-center"
                        >
                            <SlidersHorizontal className="w-12 h-12 text-lotus/30 mb-4" />
                            <h3 className="text-xl font-display text-maroon mb-2">No treatments match your search</h3>
                            <p className="text-charcoal/50 font-light">Try adjusting your filters or search keywords.</p>
                            <Button
                                variant="ghost"
                                onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                                className="mt-6 text-lotus underline underline-offset-4"
                            >
                                Clear all filters
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* Booking Modal */}
            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                selectedTherapy={selectedTherapy}
            />
        </div>
    );
};
