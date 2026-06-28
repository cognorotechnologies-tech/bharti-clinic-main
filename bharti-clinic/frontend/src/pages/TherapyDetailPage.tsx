import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import {
    Clock, CheckCircle2, AlertCircle, Calendar,
    Share2, Heart, Info, Sparkles,
    Eye, LayoutGrid, Flower2, HeartPulse, Leaf
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Spinner } from '../components/ui/Spinner';
import { SectionTitle } from '../components/ui/SectionTitle';
import { TherapyCard } from '../components/therapies/TherapyCard';
import type { Therapy } from '../components/therapies/TherapyCard';
import { BookingModal } from '../components/therapies/BookingModal';
import api from '../lib/axios';
import { SEO } from '../components/SEO';

interface TherapyDetail extends Therapy {
    fullDescription: string;
    whatToExpect: string[];
    preparationTips: string[];
    contraindications: string[];
}

export const TherapyDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [therapy, setTherapy] = useState<TherapyDetail | null>(null);
    const [relatedTherapies, setRelatedTherapies] = useState<Therapy[]>([]);
    const [loading, setLoading] = useState(true);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    useEffect(() => {
        const fetchTherapyData = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/api/therapies/${slug}`);
                // API returns { success, data: { therapy, related }, message }
                const responseData = response.data.data || response.data;
                setTherapy(responseData.therapy);
                setRelatedTherapies(responseData.related);
            } catch (error) {
                console.error('Error fetching therapy detail:', error);
                // Fallback for demo
                const mockTherapy: TherapyDetail = {
                    id: '2',
                    name: "Shirodhara",
                    slug: "shirodhara",
                    description: "A profound relaxation treatment involving a gentle, continuous stream of warm medicated oil on the forehead.",
                    fullDescription: "Shirodhara is a classical Ayurvedic therapy that involves gently pouring liquids over the forehead (the 'third eye'). The name comes from the Sanskrit words shira (head) and dhara (flow). The liquids used in shirodhara can include oil, milk, buttermilk, coconut water, or even plain water.\n\nThis treatment is world-renowned for its ability to induce a deep state of relaxation, pacify the nervous system, and balance the mind. It is especially effective for treating stress-related conditions, anxiety, insomnia, and chronic headaches.",
                    durationMinutes: 45,
                    basePrice: 3500,
                    discountedPrice: 2999,
                    category: { id: 'c1', name: "Relaxation", slug: "relaxation" },
                    benefits: ["Mental clarity", "Relieves anxiety", "Treats insomnia", "Hair health", "Stress reduction"],
                    whatToExpect: [
                        "You will lie down on a traditional wooden droni (massage table).",
                        "A warm, medicated oil suited to your dosha will be chosen.",
                        "The oil will be poured in a continuous, rhythmic stream across your forehead.",
                        "A gentle head massage is usually included to enhance the effect.",
                        "You will experience a deep sense of stillness and meditation."
                    ],
                    preparationTips: [
                        "Avoid a heavy meal at least 2 hours before the treatment.",
                        "Wear comfortable clothes that you don't mind getting a bit of oil on.",
                        "Be prepared to leave the oil in your hair for a few hours after the session."
                    ],
                    contraindications: [
                        "Acute fever or flu",
                        "Inflammation or rashes on the forehead",
                        "Pregnancy (consult our doctor first)",
                        "Brain tumors or severe neurological conditions"
                    ]
                };
                setTherapy(mockTherapy);
                setRelatedTherapies([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTherapyData();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-ivory">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!therapy) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-ivory text-center px-4">
                <h2 className="text-3xl font-display text-maroon mb-4">Therapy Not Found</h2>
                <p className="text-charcoal/60 mb-8">The healing ritual you are looking for has moved or does not exist.</p>
                <Link to="/therapies">
                    <Button variant="primary">Explore All Therapies</Button>
                </Link>
            </div>
        );
    }

    const hasDiscount = therapy.discountedPrice && Number(therapy.discountedPrice) < Number(therapy.basePrice);

    const schemaData = {
        "@context": "https://schema.org/",
        "@type": "Service",
        "name": therapy.name,
        "description": therapy.description,
        "provider": {
            "@type": "MedicalOrganization",
            "name": "Bharti Clinic",
            "url": window.location.origin
        },
        "areaServed": "Ludhiana, Punjab",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Ayurvedic Therapies",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": therapy.name
                    },
                    "price": therapy.discountedPrice || therapy.basePrice,
                    "priceCurrency": "INR"
                }
            ]
        }
    };

    return (
        <div className="bg-ivory/20 min-h-screen pb-24">
            <SEO
                title={`${therapy.name} Therapy | Bharti Clinic`}
                description={therapy.description}
                schemaData={schemaData}
            />
            {/* Page Header */}
            <div className="bg-white pt-32 pb-12 border-b border-lotus/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Breadcrumb
                        items={[
                            { label: "Therapies", href: "/therapies" },
                            { label: therapy.category.name, href: `/therapies?category=${therapy.category.slug}` },
                            { label: therapy.name }
                        ]}
                        className="mb-8"
                    />

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Badge variant="category">{therapy.category.name}</Badge>
                                {hasDiscount && <Badge variant="discount">Special Offer Active</Badge>}
                            </div>
                            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-maroon leading-tight">
                                {therapy.name}
                            </h1>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="sm" className="rounded-full p-2 border border-lotus/20 hover:bg-lotus-light">
                                <Heart className="w-5 h-5 text-maroon" />
                            </Button>
                            <Button variant="ghost" size="sm" className="rounded-full p-2 border border-lotus/20 hover:bg-lotus-light">
                                <Share2 className="w-5 h-5 text-maroon" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Content */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Image / Hero Visual */}
                        <div className="rounded-[2.5rem] overflow-hidden bg-lotus-light/30 aspect-video relative group">
                            <div className="absolute inset-0 flex items-center justify-center text-lotus/10">
                                <svg viewBox="0 0 100 100" className="w-48 h-48 fill-current">
                                    <path d="M50 10L60 40H40L50 10ZM10 70C10 70 30 50 50 50C70 50 90 70 90 70C90 70 70 90 50 90C30 90 10 70 10 70Z" />
                                </svg>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-maroon/20 to-transparent" />
                            <div className="absolute bottom-6 left-6 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-gold animate-pulse" />
                                <span className="text-white text-sm font-medium tracking-widest uppercase">Traditional Vedic Ritual</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="prose prose-lotus max-w-none">
                            <h2 className="font-display text-3xl text-maroon mb-6 flex items-center gap-3">
                                <Info className="w-6 h-6 text-lotus" />
                                About the Therapy
                            </h2>
                            <p className="text-charcoal/80 text-lg leading-relaxed whitespace-pre-line">
                                {therapy.fullDescription}
                            </p>
                        </div>

                        {/* Benefits Grid */}
                        <div className="bg-white rounded-3xl p-8 border border-lotus/10 shadow-sm">
                            <h3 className="font-display text-2xl text-maroon mb-8">Sacred Benefits</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {therapy.benefits?.map((benefit, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-ivory/50 border border-transparent hover:border-lotus/20 transition-all">
                                        <div className="w-8 h-8 rounded-full bg-lotus-light flex items-center justify-center text-maroon">
                                            <CheckCircle2 className="w-5 h-5" />
                                        </div>
                                        <span className="text-charcoal font-medium">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* What to Expect & Preparation */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <h3 className="font-display text-2xl text-maroon flex items-center gap-3">
                                    <Eye className="w-6 h-6 text-lotus" />
                                    What to Expect
                                </h3>
                                <ul className="space-y-4">
                                    {(therapy.whatToExpect || []).map((item, i) => (
                                        <li key={i} className="flex items-start gap-4 group">
                                            <span className="w-6 h-6 rounded-lg bg-maroon/5 text-maroon text-xs flex items-center justify-center font-bold flex-shrink-0 group-hover:bg-maroon group-hover:text-white transition-colors duration-300">
                                                {i + 1}
                                            </span>
                                            <p className="text-charcoal/70 text-sm leading-relaxed">{item}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-6">
                                <h3 className="font-display text-2xl text-maroon flex items-center gap-3">
                                    <LayoutGrid className="w-6 h-6 text-lotus" />
                                    Preparation
                                </h3>
                                <ul className="space-y-4">
                                    {(therapy.preparationTips || []).map((item, i) => (
                                        <li key={i} className="flex items-start gap-4">
                                            <Flower2 className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                                            <p className="text-charcoal/70 text-sm leading-relaxed">{item}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Contraindications */}
                        <div className="bg-red-50/50 rounded-3xl p-8 border border-red-100">
                            <h3 className="font-display text-xl text-red-900 mb-4 flex items-center gap-3">
                                <AlertCircle className="w-6 h-6 text-red-600" />
                                Important Contraindications
                            </h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                {(therapy.contraindications || []).map((item, i) => (
                                    <li key={i} className="text-red-800/70 text-sm list-disc list-inside">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Sticky Booking Card */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32">
                            <div className="bg-white rounded-[2rem] p-8 shadow-2xl shadow-lotus/10 border border-lotus/5 relative overflow-hidden">
                                {/* Decorative Petal */}
                                <div className="absolute -top-12 -right-12 w-24 h-24 bg-lotus/5 rounded-full blur-2xl" />

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-2 text-charcoal/40 font-bold tracking-widest text-[10px] uppercase">
                                            <Clock className="w-4 h-4" />
                                            {therapy.durationMinutes} Minutes Session
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-8">
                                        <span className="text-charcoal/50 text-xs font-bold uppercase tracking-widest">Ritual Value</span>
                                        <div className="flex items-baseline gap-3">
                                            <span className="text-4xl font-display text-maroon">
                                                ₹{Number(therapy.discountedPrice || therapy.basePrice).toLocaleString()}
                                            </span>
                                            {hasDiscount && (
                                                <span className="text-xl text-charcoal-muted line-through">
                                                    ₹{Number(therapy.basePrice).toLocaleString()}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <Button
                                        size="lg"
                                        className="w-full py-8 rounded-2xl text-base font-bold uppercase tracking-[0.2em] shadow-xl shadow-maroon/20 mb-4"
                                        onClick={() => setIsBookingOpen(true)}
                                    >
                                        Request Appointment
                                    </Button>

                                    <p className="text-center text-[10px] text-charcoal/40 uppercase tracking-widest font-bold mb-8">
                                        Free Ayurvedic Consultation Included
                                    </p>

                                    <div className="space-y-4 pt-8 border-t border-lotus/10">
                                        <div className="flex items-center gap-3 text-sm text-charcoal/70">
                                            <HeartPulse className="w-5 h-5 text-lotus" />
                                            <span>Certified Practitioners</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-charcoal/70">
                                            <Leaf className="w-5 h-5 text-lotus" />
                                            <span>100% Organic Herbal Oils</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-charcoal/70">
                                            <Calendar className="w-5 h-5 text-lotus" />
                                            <span>Flexible Scheduling</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Need Help Card */}
                            <div className="mt-6 bg-maroon/5 rounded-3xl p-6 border border-maroon/10 text-center">
                                <h4 className="text-maroon font-bold text-sm mb-2">Need Help Choosing?</h4>
                                <p className="text-charcoal/60 text-xs mb-4">Our doctors can recommend the best therapy for your body type.</p>
                                <a href="tel:+918800000000" className="text-maroon font-bold text-sm underline underline-offset-4">
                                    Call +91-88000-00000
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Therapies */}
                {relatedTherapies.length > 0 && (
                    <section className="mt-32">
                        <SectionTitle
                            title="Complementing Rituals"
                            subtitle="Enhance your journey with related healing practices"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                            {relatedTherapies.map(t => (
                                <TherapyCard key={t.id} therapy={t} onBook={() => { }} />
                            ))}
                        </div>
                    </section>
                )}
            </main>

            {/* Booking Modal */}
            <BookingModal
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                selectedTherapy={therapy}
            />
        </div>
    );
};
