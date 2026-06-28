import { motion } from 'framer-motion';

interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'circular' | 'rectangular';
    width?: string | number;
    height?: string | number;
    animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
    className = '',
    variant = 'rectangular',
    width,
    height,
    animation = 'pulse',
}: SkeletonProps) {
    const baseClasses = 'bg-gradient-to-r from-charcoal/10 via-charcoal/20 to-charcoal/10';

    const variantClasses = {
        text: 'rounded h-4',
        circular: 'rounded-full',
        rectangular: 'rounded-lg',
    };

    const animationClasses = {
        pulse: 'animate-pulse',
        wave: '',
        none: '',
    };

    const style: React.CSSProperties = {
        width: width || '100%',
        height: height || (variant === 'text' ? '1rem' : '100%'),
    };

    if (animation === 'wave') {
        return (
            <div
                className={`${baseClasses} ${variantClasses[variant]} ${className} overflow-hidden relative`}
                style={style}
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{
                        x: ['-100%', '100%'],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            </div>
        );
    }

    return (
        <div
            className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
            style={style}
        />
    );
}

// Product Card Skeleton
export function ProductCardSkeleton() {
    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-lotus/5 p-5">
            <Skeleton variant="rectangular" height="250px" className="mb-4" />
            <Skeleton variant="text" width="80%" className="mb-2" />
            <Skeleton variant="text" width="60%" className="mb-4" />
            <div className="flex items-center gap-2 mb-4">
                <Skeleton variant="text" width="80px" />
                <Skeleton variant="text" width="60px" />
            </div>
            <Skeleton variant="rectangular" height="48px" />
        </div>
    );
}

// Product Grid Skeleton
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: count }).map((_, index) => (
                <ProductCardSkeleton key={index} />
            ))}
        </div>
    );
}

// Therapy Card Skeleton
export function TherapyCardSkeleton() {
    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-lotus/5">
            <Skeleton variant="rectangular" height="200px" />
            <div className="p-6">
                <Skeleton variant="text" width="70%" className="mb-2" />
                <Skeleton variant="text" width="90%" className="mb-2" />
                <Skeleton variant="text" width="80%" className="mb-4" />
                <div className="flex items-center justify-between">
                    <Skeleton variant="text" width="100px" />
                    <Skeleton variant="rectangular" width="120px" height="40px" />
                </div>
            </div>
        </div>
    );
}

// Table Row Skeleton
export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
    return (
        <tr className="border-b border-charcoal/10">
            {Array.from({ length: columns }).map((_, index) => (
                <td key={index} className="px-6 py-4">
                    <Skeleton variant="text" width="80%" />
                </td>
            ))}
        </tr>
    );
}

// Table Skeleton
export function TableSkeleton({ rows = 5, columns = 5 }: { rows?: number; columns?: number }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-charcoal/10 overflow-hidden">
            <table className="w-full">
                <thead className="bg-ivory border-b border-charcoal/10">
                    <tr>
                        {Array.from({ length: columns }).map((_, index) => (
                            <th key={index} className="px-6 py-4 text-left">
                                <Skeleton variant="text" width="60%" />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rows }).map((_, index) => (
                        <TableRowSkeleton key={index} columns={columns} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Blog Card Skeleton
export function BlogCardSkeleton() {
    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-lotus/5">
            <Skeleton variant="rectangular" height="240px" />
            <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                    <Skeleton variant="rectangular" width="80px" height="24px" className="rounded-full" />
                    <Skeleton variant="text" width="100px" />
                </div>
                <Skeleton variant="text" width="90%" className="mb-2 h-6" />
                <Skeleton variant="text" width="95%" className="mb-2" />
                <Skeleton variant="text" width="85%" className="mb-4" />
                <div className="flex items-center gap-4">
                    <Skeleton variant="circular" width="40px" height="40px" />
                    <div className="flex-1">
                        <Skeleton variant="text" width="120px" className="mb-1" />
                        <Skeleton variant="text" width="80px" />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Dashboard Card Skeleton
export function DashboardCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-charcoal/10">
            <div className="flex items-center justify-between mb-4">
                <Skeleton variant="text" width="120px" />
                <Skeleton variant="circular" width="40px" height="40px" />
            </div>
            <Skeleton variant="text" width="150px" className="mb-2 h-8" />
            <Skeleton variant="text" width="100px" />
        </div>
    );
}

// Page Header Skeleton
export function PageHeaderSkeleton() {
    return (
        <div className="mb-8">
            <Skeleton variant="text" width="300px" className="mb-3 h-10" />
            <Skeleton variant="text" width="500px" />
        </div>
    );
}

// Image Gallery Skeleton
export function ImageGallerySkeleton({ count = 12 }: { count?: number }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: count }).map((_, index) => (
                <Skeleton
                    key={index}
                    variant="rectangular"
                    className="aspect-square"
                />
            ))}
        </div>
    );
}

// Form Skeleton
export function FormSkeleton({ fields = 5 }: { fields?: number }) {
    return (
        <div className="space-y-6">
            {Array.from({ length: fields }).map((_, index) => (
                <div key={index}>
                    <Skeleton variant="text" width="120px" className="mb-2" />
                    <Skeleton variant="rectangular" height="48px" />
                </div>
            ))}
            <Skeleton variant="rectangular" height="48px" width="150px" />
        </div>
    );
}
