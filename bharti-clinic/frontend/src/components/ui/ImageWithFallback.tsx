import * as React from "react";
import { cn } from "../../lib/utils";

export interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string;
}

export function ImageWithFallback({
    src,
    alt,
    className,
    fallbackSrc = "/ayurveda-placeholder.svg",
    ...props
}: ImageWithFallbackProps) {
    const [error, setError] = React.useState(false);

    // SVG fallback specifically matching the lotus and maroon colors
    const svgFallback = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="none"><rect width="400" height="300" fill="%23FAE8EE"/><path d="M200 100 C 230 100, 250 140, 200 180 C 150 140, 170 100, 200 100" fill="%23E8A0A0" opacity="0.8" /><path d="M200 180 C 230 150, 270 160, 290 200 C 250 200, 220 220, 200 180" fill="%23C0686D" opacity="0.6" /><path d="M200 180 C 170 150, 130 160, 110 200 C 150 200, 180 220, 200 180" fill="%23C0686D" opacity="0.6" /><text x="50%" y="60%" font-family="Georgia" font-size="20" fill="%237A2040" font-weight="bold" text-anchor="middle" dy="2em">Bharti Veda</text></svg>`;

    return (
        <img
            src={error ? (fallbackSrc !== "/ayurveda-placeholder.svg" ? fallbackSrc : svgFallback) : src}
            alt={alt}
            onError={() => setError(true)}
            className={cn("bg-ivory-100 object-cover", className)}
            {...props}
        />
    );
}
