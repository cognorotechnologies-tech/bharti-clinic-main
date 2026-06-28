import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, LayoutGrid, Timer, Sparkles, TrendingDown, ArrowRight, ShieldCheck, Gift } from 'lucide-react';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Spinner } from '../components/ui/Spinner';
import { HeroShowcase } from '../components/hero/HeroShowcase';
import { BookingModal } from '../components/therapies/BookingModal';
import api from '../lib/axios';
import type { Package } from '../types';
import { SEO, SEO_CONFIGS } from '../components/SEO';

interface CountdownState {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const CountdownTimer: React.FC<{ validTo: string }> = ({ validTo }) => {
    const [timeLeft, setTimeLeft] = useState<CountdownState | null>(null);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(validTo) - +new Date();
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                setTimeLeft(null);
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();

        return () => clearInterval(timer);
    }, [validTo]);

    if (!timeLeft) return null;

    return (
        <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-tighter bg-gold/5 px-3 py-1.5 rounded-lg border border-gold/10">
            <Timer className="w-3.5 h-3.5 animate-pulse" />
            <span>Ends in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</span>
        </div>
    );
};

const PackageCard: React.FC<{ pkg: Package; onBook: (pkg: Package) => void }> = ({ pkg, onBook }) => {
    const savings = pkg.originalPrice - pkg.totalPrice;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group bg-white rounded-[2.5rem] p-8 shadow-xl shadow-lotus/5 border border-lotus/10 flex flex-col h-full hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
        >
            {/* Savings Badge */}
            <div className="absolute top-0 right-0">
                <div className="bg-gold text-maroon font-bold text-[10px] uppercase tracking-widest px-8 py-2 rotate-45 translate-x-12 translate-y-2 shadow-lg">
                    Save ₹{savings.toLocaleString()}
                </div>
            </div>

            <div className="flex flex-col flex-grow">
                <div className="mb-6">
                    <h3 className="font-display text-3xl text-maroon mb-3 leading-tight group-hover:text-lotus transition-colors duration-300">
                        {pkg.name}
                    </h3>
                    <p className="text-charcoal/60 text-sm font-light leading-relaxed">
                        {pkg.description}
                    </p>
                </div>

                {/* Included Therapies */}
                <div className="mb-8 p-6 bg-ivory/50 rounded-3xl border border-lotus/5">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-lotus-deep mb-4 flex items-center gap-2">
                        <Sparkles className="w-3 h-3" />
                        What's Included
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {pkg.therapies.map((therapy) => (
                            <Badge key={therapy.id} variant="category" className="bg-white text-maroon/80 border-lotus/10 py-1.5 px-3 flex items-center gap-2">
                                <span className="font-medium text-[11px]">{therapy.name}</span>
                                <span className="text-[10px] opacity-40">|</span>
                                <span className="text-[10px] opacity-60 font-mono">{therapy.durationMinutes}m</span>
                            </Badge>
                        ))}
                    </div>
                </div>

                <div className="mt-auto space-y-6">
                    {/* Urgency & Timer */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        {pkg.validTo && <CountdownTimer validTo={pkg.validTo} />}
                        {pkg.slotsAvailable && (
                            <div className="flex items-center gap-2 text-maroon text-[10px] font-bold uppercase tracking-widest bg-maroon/5 px-3 py-1.5 rounded-lg border border-maroon/10">
                                <TrendingDown className="w-3.5 h-3.5" />
                                Only {pkg.slotsAvailable} slots left
                            </div>
                        )}
                    </div>

                    {/* Pricing */}
                    <div className="flex items-end justify-between border-t border-lotus/10 pt-6">
                        <div>
                            <span className="text-charcoal/40 text-sm line-through block mb-1">₹{pkg.originalPrice.toLocaleString()}</span>
                            <span className="text-4xl font-display font-bold text-maroon">
                                ₹{pkg.totalPrice.toLocaleString()}
                                <span className="text-sm font-body font-normal text-lotus ml-1 italic">all incl.</span>
                            </span>
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] text-charcoal/40 uppercase tracking-widest font-bold mb-1">Validity</div>
                            <div className="text-xs text-charcoal/60 flex items-center justify-end gap-1.5">
                                <Calendar className="w-3 h-3" />
                                {pkg.validTo ? new Date(pkg.validTo).toLocaleDateString() : 'Limited Time'}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button
                            onClick={() => onBook(pkg)}
                            className="rounded-2xl font-bold uppercase tracking-widest text-[11px] py-6 shadow-lg shadow-maroon/20 hover:shadow-maroon/30 transition-all flex items-center justify-center gap-2"
                        >
                            Book This Package
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="secondary"
                            className="rounded-2xl font-bold uppercase tracking-widest text-[11px] py-6 border-lotus/20 text-maroon hover:bg-lotus-light/20 flex items-center justify-center gap-2"
                        >
                            View Details
                            <LayoutGrid className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-[9px] text-charcoal/40 uppercase tracking-[0.2em] font-bold py-2">
                        <ShieldCheck className="w-3 h-3 text-gold" />
                        Authentic Ayurvedic Experience
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export const PackagesPage: React.FC = () => {
    const [packages, setPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState(true);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await api.get(`/api/packages`);
                // API returns { success, data, message }
                const responseData = response.data.data || response.data;
                setPackages(Array.isArray(responseData) ? responseData : []);
            } catch (error) {
                console.error('Error fetching packages:', error);
                // Fallback / Mock data
                setPackages([
                    {
                        id: '1',
                        name: "Monsoon Rejuvenation",
                        slug: "monsoon-rejuvenation",
                        description: "Our signature 3-day detox ritual designed to balance Vata dosha during the rainy season. Ideal for immunity and joint health.",
                        originalPrice: 15499,
                        totalPrice: 11999,
                        isActive: true,
                        validTo: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days from now
                        slotsAvailable: 4,
                        therapies: [
                            { id: 't1', name: "Abhyanga", durationMinutes: 60, basePrice: 2500, category: { id: 'c1', name: 'Relaxation', slug: 'relaxation' }, slug: 'abhyanga', description: '' },
                            { id: 't2', name: "Shirodhara", durationMinutes: 45, basePrice: 3500, category: { id: 'c1', name: 'Relaxation', slug: 'relaxation' }, slug: 'shirodhara', description: '' },
                            { id: 't3', name: "Steam Bath", durationMinutes: 30, basePrice: 1500, category: { id: 'c2', name: 'Spa', slug: 'spa' }, slug: 'steam-bath', description: '' }
                        ]
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    const handleBook = (pkg: Package) => {
        setSelectedPackage(pkg);
        setIsBookingOpen(true);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-ivory">
                <SEO {...SEO_CONFIGS.packages} />
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="bg-ivory/30 min-h-screen pb-24">
            <SEO {...SEO_CONFIGS.packages} />
            {/* Hero Showcase */}
            <HeroShowcase
                title="Wellness Packages"
                subtitle="Save More, Heal Better"
                description="Comprehensive therapy packages designed for complete rejuvenation at special prices. Experience authentic Ayurvedic healing with our curated bundles."
                stats={[
                    { label: 'Packages', value: '6+' },
                    { label: 'Save Up To', value: '30%' },
                    { label: 'Sessions', value: '10+' },
                    { label: 'Happy Clients', value: '500+' },
                ]}
                backgroundPattern={true}
            >
                <div className="flex gap-4">
                    <Button variant="primary" size="lg">
                        <Gift className="mr-2" size={20} />
                        View Packages
                    </Button>
                    <Button variant="secondary" size="lg">
                        <TrendingDown className="mr-2" size={20} />
                        Compare Savings
                    </Button>
                </div>
            </HeroShowcase>

            {/* Packages Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {packages.map((pkg) => (
                        <PackageCard
                            key={pkg.id}
                            pkg={pkg}
                            onBook={handleBook}
                        />
                    ))}
                </div>

                {packages.length === 0 && (
                    <div className="text-center py-40">
                        <Sparkles className="w-16 h-16 text-lotus/20 mx-auto mb-6" />
                        <h3 className="font-display text-2xl text-maroon">New Packages Coming Soon</h3>
                        <p className="text-charcoal/40 mt-2">Sign up for our newsletter to stay updated.</p>
                    </div>
                )}
            </section>

            {/* Booking Modal integration */}
            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                selectedTherapy={selectedPackage ? {
                    id: selectedPackage.id,
                    name: `Package: ${selectedPackage.name}`,
                    slug: selectedPackage.slug,
                    description: selectedPackage.description,
                    durationMinutes: selectedPackage.therapies.reduce((acc: number, t: any) => acc + t.durationMinutes, 0),
                    basePrice: selectedPackage.totalPrice,
                    category: { id: 'pkg-cat', name: 'Package', slug: 'package' } as any
                } as any : null}
            />
        </div>
    );
};
