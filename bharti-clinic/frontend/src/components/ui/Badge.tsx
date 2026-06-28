import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-lotus focus:ring-offset-2",
    {
        variants: {
            variant: {
                category: "border-transparent bg-ivory-100 text-charcoal hover:bg-ivory",
                discount: "border-transparent bg-gold text-white hover:bg-gold-light",
                new: "border-transparent bg-lotus text-white hover:bg-lotus-deep",
                "out-of-stock": "border-transparent bg-charcoal-muted/30 text-charcoal-muted hover:bg-charcoal-muted/50",
                featured: "border-lotus text-lotus bg-lotus-light/20",
            },
        },
        defaultVariants: {
            variant: "category",
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
