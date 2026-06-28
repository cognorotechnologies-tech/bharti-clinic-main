import * as React from "react";
import { cn } from "../../lib/utils";

export interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    subtitle?: string;
    align?: "left" | "center" | "right";
}

export function SectionTitle({
    title,
    subtitle,
    align = "center",
    className,
    ...props
}: SectionTitleProps) {
    return (
        <div
            className={cn("mb-12 flex flex-col", {
                "items-start text-left": align === "left",
                "items-center text-center": align === "center",
                "items-end text-right": align === "right",
            }, className)}
            {...props}
        >
            {subtitle && (
                <span className="mb-2 block text-sm font-semibold tracking-wider text-lotus-deep uppercase">
                    {subtitle}
                </span>
            )}
            <h2 className="font-display leading-tight text-3xl md:text-5xl text-maroon mb-4">
                {title}
            </h2>
            <div className="flex items-center gap-2">
                <div className="h-px w-8 bg-gold-light opacity-60" />
                <div className="h-2 w-2 rotate-45 bg-lotus" />
                <div className="h-px w-8 bg-gold-light opacity-60" />
            </div>
        </div>
    );
}
