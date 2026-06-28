import * as React from "react";
import { cn } from "../../lib/utils";
import { Star } from "lucide-react";

export interface StarRatingProps {
    rating: number; // 0-5
    maxRating?: number;
    readOnly?: boolean;
    onChange?: (rating: number) => void;
    className?: string;
}

export function StarRating({
    rating,
    maxRating = 5,
    readOnly = true,
    onChange,
    className,
}: StarRatingProps) {
    const [hoverRating, setHoverRating] = React.useState(0);

    const renderStar = (index: number) => {
        const fillAmount = hoverRating ? hoverRating - index : rating - index;
        const isFilled = fillAmount >= 1;
        const isHalf = fillAmount > 0 && fillAmount < 1;

        return (
            <button
                key={index}
                type="button"
                disabled={readOnly}
                className={cn(
                    "relative p-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-lotus rounded-sm transition-transform",
                    readOnly ? "cursor-default" : "cursor-pointer hover:scale-110"
                )}
                onMouseEnter={() => !readOnly && setHoverRating(index + 1)}
                onMouseLeave={() => !readOnly && setHoverRating(0)}
                onClick={() => !readOnly && onChange?.(index + 1)}
            >
                <Star
                    className={cn(
                        "h-5 w-5",
                        (isFilled || isHalf) ? "text-gold fill-gold" : "text-gray-300"
                    )}
                />
                {isHalf && (
                    <div className="absolute inset-0 overflow-hidden w-[50%] p-0.5 text-gold">
                        <Star className="h-5 w-5 fill-gold text-gold" />
                    </div>
                )}
            </button>
        );
    };

    return (
        <div className={cn("flex flex-wrap items-center", className)}>
            <div className="flex items-center space-x-0.5">
                {Array.from({ length: maxRating }).map((_, i) => renderStar(i))}
            </div>
        </div>
    );
}
