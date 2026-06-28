import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Tag, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Link } from 'react-router-dom';

export interface Therapy {
    id: string;
    name: string;
    slug: string;
    description: string;
    durationMinutes: number;
    basePrice: number;
    discountedPrice?: number | null;
    category: {
        id: string;
        name: string;
        slug: string;
    };
    imageUrl?: string | null;
    benefits?: string[]; // We'll mock this if not present
}

interface TherapyCardProps {
    therapy: Therapy;
    onBook: (therapy: Therapy) => void;
}

export const TherapyCard: React.FC<TherapyCardProps> = ({ therapy, onBook }) => {
    // Default benefits if not provided
    const displayBenefits = therapy.benefits?.slice(0, 3) || [
        "Traditional Ayurvedic approach",
        "Personalized care & attention",
        "Natural herbal oils & extracts"
    ];

    const hasDiscount = therapy.discountedPrice && Number(therapy.discountedPrice) < Number(therapy.basePrice);

    return (
        <motion.div
            data-testid="therapy-card"
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="group bg-white rounded-[2rem] p-6 shadow-xl shadow-lotus/5 border border-lotus/10 flex flex-col h-full hover:shadow-2xl hover:shadow-lotus/10 transition-all duration-500"
        >
            {/* Image Placeholder / Herb Art */}
            <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-2xl bg-ivory group-hover:bg-lotus-light/20 transition-colors duration-500">
                <div className="absolute inset-0 flex items-center justify-center text-lotus/20 group-hover:scale-110 group-hover:text-maroon/10 transition-all duration-700">
                    <svg viewBox="0 0 24 24" className="w-24 h-24 fill-current">
                        <path d="M12 2L15 8H9L12 2ZM3 15C3 15 5 10 12 10C19 10 21 15 21 15C21 15 19 20 12 20C5 20 3 15 3 15Z" />
                    </svg>
                </div>

                {hasDiscount && (
                    <div className="absolute top-4 right-4">
                        <Badge variant="discount" className="px-3 py-1 font-bold">
                            SPECIAL OFFER
                        </Badge>
                    </div>
                )}

                <div className="absolute bottom-4 left-4">
                    <Badge variant="category" className="bg-white/90 backdrop-blur-sm border-none shadow-sm text-maroon font-bold py-1.5 px-4 rounded-full">
                        {therapy.category.name}
                    </Badge>
                </div>
            </div>

            <div className="flex flex-col flex-grow">
                <h3 className="font-display text-2xl text-maroon mb-2 group-hover:text-lotus transition-colors duration-300">
                    {therapy.name}
                </h3>

                <div className="flex items-center gap-3 mb-4 text-charcoal/60 text-sm font-medium">
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-lotus" />
                        {therapy.durationMinutes} mins
                    </div>
                    <div className="w-1 h-1 rounded-full bg-lotus/40" />
                    <div className="flex items-center gap-1">
                        <Tag className="w-4 h-4 text-lotus" />
                        <span data-testid="therapy-price">From ₹{Number(therapy.discountedPrice || therapy.basePrice)}</span>
                    </div>
                </div>

                <p className="text-charcoal/70 text-sm mb-6 line-clamp-2 leading-relaxed italic">
                    {therapy.description}
                </p>

                <ul className="space-y-2 mb-8 flex-grow">
                    {displayBenefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-charcoal/80">
                            <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-gold flex-shrink-0" />
                            <span>{benefit}</span>
                        </li>
                    ))}
                </ul>

                <div className="grid grid-cols-2 gap-3">
                    <Button
                        data-testid="book-now-btn"
                        onClick={() => onBook(therapy)}
                        className="rounded-xl font-bold uppercase tracking-wider text-[10px] py-4"
                    >
                        Book Now
                    </Button>
                    <Link to={`/therapies/${therapy.slug}`} className="w-full">
                        <Button
                            variant="secondary"
                            className="w-full rounded-xl font-bold uppercase tracking-wider text-[10px] py-4 group/btn"
                        >
                            Learn More
                            <ArrowRight className="w-3 h-3 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};
