import * as React from "react";
import { cn } from "../../lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> { }

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "rounded-2xl border border-ivory-100 bg-white text-charcoal shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_10px_25px_-5px_var(--color-lotus-light)]",
                className
            )}
            {...props}
        />
    )
);
Card.displayName = "Card";

export { Card };
