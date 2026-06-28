import React, { useState, useEffect } from 'react';

import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Clock, ArrowRight } from 'lucide-react';

interface Package {
    id: string;
    name: string;
    description: string;
    originalPrice: number;
    discountedPrice: number;
    expiryDate?: string;
    imageUrl?: string;
}

export const PackagesBanner: React.FC = () => {
    const [featuredPackage, setFeaturedPackage] = useState<Package | null>(null);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hrs: 0, mins: 0, secs: 0 });

    useEffect(() => {
        // Mocking featured package fetch
        const pkg = {
            id: 'seasonal-1',
            name: "Monsoon Rejuvenation Ritual",
            description: "A comprehensive 7-day detox program designed to balance Vata dosha during the rainy season. Includes customized meals, three Abhyanga sessions, and daily herbal tonics.",
            originalPrice: 15000,
            discountedPrice: 11999,
            expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 60 * 4).toISOString(), // 3 days 4 hours from now
        };
        setFeaturedPackage(pkg);
    }, []);

    useEffect(() => {
        if (!featuredPackage?.expiryDate) return;

        const timer = setInterval(() => {
            const distance = new Date(featuredPackage.expiryDate!).getTime() - Date.now();

            if (distance < 0) {
                clearInterval(timer);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hrs: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                secs: Math.floor((distance % (1000 * 60)) / 1000),
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [featuredPackage]);

    if (!featuredPackage) return null;

    return (
        <section className="py-12 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[40px] md:rounded-[60px] bg-gradient-to-br from-maroon via-maroon to-lotus-deep shadow-2xl shadow-maroon/20">

                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gold/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none" />

                <div className="relative z-10 p-8 md:p-16 lg:p-20 flex flex-col lg:flex-row gap-12 items-center">

                    <div className="flex-1 text-center lg:text-left">
                        <Badge className="bg-gold text-maroon border-none py-1.5 px-4 rounded-full mb-6 font-bold uppercase tracking-widest text-[10px] animate-pulse">
                            Featured Wellness Package
                        </Badge>
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
                            {featuredPackage.name}
                        </h2>
                        <p className="text-ivory/80 text-lg md:text-xl font-body max-w-2xl mb-8 leading-relaxed">
                            {featuredPackage.description}
                        </p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 mb-10">
                            <div className="flex flex-col">
                                <span className="text-white/40 text-xs uppercase tracking-widest mb-1">Special Price</span>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-4xl md:text-5xl font-display font-bold text-white">₹{featuredPackage.discountedPrice}</span>
                                    <span className="text-xl text-white/40 line-through">₹{featuredPackage.originalPrice}</span>
                                </div>
                            </div>

                            <div className="h-12 w-px bg-white/10 hidden md:block" />

                            <div className="flex flex-col items-center lg:items-start">
                                <span className="text-white/40 text-xs uppercase tracking-widest mb-2 flex items-center gap-1.5">
                                    <Clock className="w-3 h-3" />
                                    Limited Time Offer
                                </span>
                                <div className="flex gap-3 text-white">
                                    <div className="flex flex-col items-center">
                                        <span className="text-xl font-bold font-display">{timeLeft.days.toString().padStart(2, '0')}</span>
                                        <span className="text-[10px] uppercase opacity-50">Days</span>
                                    </div>
                                    <span className="text-xl font-bold opacity-30">:</span>
                                    <div className="flex flex-col items-center">
                                        <span className="text-xl font-bold font-display">{timeLeft.hrs.toString().padStart(2, '0')}</span>
                                        <span className="text-[10px] uppercase opacity-50">Hrs</span>
                                    </div>
                                    <span className="text-xl font-bold opacity-30">:</span>
                                    <div className="flex flex-col items-center">
                                        <span className="text-xl font-bold font-display">{timeLeft.mins.toString().padStart(2, '0')}</span>
                                        <span className="text-[10px] uppercase opacity-50">Min</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button size="lg" className="bg-white text-maroon hover:bg-gold hover:text-maroon px-12 py-7 text-lg shadow-xl shadow-black/20 group">
                            View Package Details
                            <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                        </Button>
                    </div>

                    <div className="w-full lg:w-[35%] relative">
                        <div className="aspect-square bg-white/10 rounded-[40px] overflow-hidden border border-white/20 shadow-2xl backdrop-blur-sm group hover:scale-105 transition-transform duration-700">
                            <img
                                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800"
                                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                                alt="Package Preview"
                            />
                            <div className="absolute inset-0 bg-maroon/20 mix-blend-multiply" />
                        </div>
                        {/* Floating Savings Badge */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-gold rounded-full flex flex-col items-center justify-center shadow-2xl border-4 border-maroon rotate-12 animate-breathe">
                            <span className="text-maroon font-black text-xl">25%</span>
                            <span className="text-maroon font-bold text-[8px] uppercase tracking-tighter">OFF NOW</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
