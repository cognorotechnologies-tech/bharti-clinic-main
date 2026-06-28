import * as React from "react";
import { cn } from "../../lib/utils";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: "sm" | "md" | "lg";
}

export function Spinner({ size = "md", className, ...props }: SpinnerProps) {
    const sizeClasses = {
        sm: "w-6 h-6 border-2",
        md: "w-10 h-10 border-2",
        lg: "w-16 h-16 border-[3px]",
    };

    return (
        <div
            className={cn("relative flex items-center justify-center", sizeClasses[size].split(' ')[0], sizeClasses[size].split(' ')[1], className)}
            {...props}
        >
            <div className="absolute inset-0 animate-rotate-slow">
                <div className={cn("absolute top-0 left-1/4 w-1/2 h-1/2 rounded-[50%_0_50%_50%] border-t border-r border-lotus opacity-80", sizeClasses[size].split(' ')[2])} style={{ transform: 'rotate(0deg)' }}></div>
                <div className={cn("absolute top-0 left-1/4 w-1/2 h-1/2 rounded-[50%_0_50%_50%] border-t border-r border-lotus-deep opacity-60", sizeClasses[size].split(' ')[2])} style={{ transform: 'rotate(45deg)' }}></div>
                <div className={cn("absolute top-0 left-1/4 w-1/2 h-1/2 rounded-[50%_0_50%_50%] border-t border-r border-maroon opacity-40", sizeClasses[size].split(' ')[2])} style={{ transform: 'rotate(90deg)' }}></div>
                <div className={cn("absolute top-0 left-1/4 w-1/2 h-1/2 rounded-[50%_0_50%_50%] border-t border-r border-gold opacity-80", sizeClasses[size].split(' ')[2])} style={{ transform: 'rotate(135deg)' }}></div>
                <div className={cn("absolute top-0 left-1/4 w-1/2 h-1/2 rounded-[50%_0_50%_50%] border-t border-r border-lotus opacity-80", sizeClasses[size].split(' ')[2])} style={{ transform: 'rotate(180deg)' }}></div>
                <div className={cn("absolute top-0 left-1/4 w-1/2 h-1/2 rounded-[50%_0_50%_50%] border-t border-r border-lotus-deep opacity-60", sizeClasses[size].split(' ')[2])} style={{ transform: 'rotate(225deg)' }}></div>
                <div className={cn("absolute top-0 left-1/4 w-1/2 h-1/2 rounded-[50%_0_50%_50%] border-t border-r border-maroon opacity-40", sizeClasses[size].split(' ')[2])} style={{ transform: 'rotate(270deg)' }}></div>
                <div className={cn("absolute top-0 left-1/4 w-1/2 h-1/2 rounded-[50%_0_50%_50%] border-t border-r border-gold opacity-80", sizeClasses[size].split(' ')[2])} style={{ transform: 'rotate(315deg)' }}></div>
            </div>
        </div>
    );
}
