import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Check, X as XIcon, Clock, AlertCircle } from 'lucide-react';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import api from '../lib/axios';
import type { Review } from '../types';

export const AdminReviewsPage: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState<string | null>(null);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/api/admin/reviews`);
            // API returns { success, data, message } wrapper
            const responseData = res.data.data || res.data;
            setReviews(Array.isArray(responseData) ? responseData : []);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id: string, status: 'APPROVED' | 'REJECTED') => {
        setUpdating(id);
        try {
            await api.patch(`/api/admin/reviews/${id}`, { status });
            setReviews((prev) => prev.filter((r) => r.id !== id));
        } catch (error) {
            console.error('Error updating review:', error);
            alert('Failed to update review status.');
        } finally {
            setUpdating(null);
        }
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? 'text-gold fill-gold' : 'text-charcoal/20'}`} />
        ));
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-ivory">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="bg-ivory/30 min-h-screen pb-24">
            <section className="pt-32 pb-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionTitle title="Review Management" subtitle="Admin Panel" align="center" />
                    <p className="text-center text-charcoal/40 mt-2 text-sm">
                        Approve or reject pending customer reviews
                    </p>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {reviews.length === 0 ? (
                    <div className="text-center py-24">
                        <Clock className="w-16 h-16 text-lotus/15 mx-auto mb-4" />
                        <h3 className="font-display text-xl text-maroon mb-2">No Pending Reviews</h3>
                        <p className="text-charcoal/40 text-sm">All reviews have been moderated. Check back later.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <AlertCircle className="w-4 h-4 text-gold" />
                            <span className="text-sm text-charcoal/60 font-medium">{reviews.length} review{reviews.length !== 1 ? 's' : ''} pending</span>
                        </div>

                        {reviews.map((review) => (
                            <motion.div
                                key={review.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-lotus/5"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        {/* Product Name */}
                                        {review.product && (
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-lotus mb-1 block">
                                                {review.product.name}
                                            </span>
                                        )}

                                        {/* Reviewer + Rating */}
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="font-medium text-maroon">{review.patientName}</span>
                                            <div className="flex">{renderStars(review.rating)}</div>
                                        </div>

                                        {/* Comment */}
                                        <p className="text-sm text-charcoal/60 leading-relaxed mb-3">{review.comment}</p>

                                        {/* Date */}
                                        <span className="text-[10px] text-charcoal/30">{new Date(review.createdAt).toLocaleString()}</span>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 flex-shrink-0">
                                        <Button
                                            onClick={() => handleUpdateStatus(review.id, 'APPROVED')}
                                            isLoading={updating === review.id}
                                            variant="primary"
                                            size="sm"
                                            className="rounded-xl gap-1"
                                        >
                                            <Check className="w-3.5 h-3.5" />
                                            Approve
                                        </Button>
                                        <Button
                                            onClick={() => handleUpdateStatus(review.id, 'REJECTED')}
                                            isLoading={updating === review.id}
                                            variant="ghost"
                                            size="sm"
                                            className="rounded-xl gap-1 text-red-500 hover:bg-red-50"
                                        >
                                            <XIcon className="w-3.5 h-3.5" />
                                            Reject
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
