import * as React from "react";
import { cn } from "../../lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: boolean;
    label?: string;
    icon?: React.ReactNode;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, error, label, id, icon, ...props }, ref) => {
        const defaultId = React.useId();
        const textareaId = id || defaultId;
        return (
            <div className="relative group w-full line-height-normal mt-2">
                {label && (
                    <label
                        htmlFor={textareaId}
                        className="absolute left-3 -top-2.5 bg-ivory px-1 text-xs font-semibold text-charcoal-muted transition-all group-focus-within:text-lotus-deep group-focus-within:-translate-y-0.5 z-10"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute left-3 top-3 text-charcoal-muted group-focus-within:text-lotus transition-colors">
                            {icon}
                        </div>
                    )}
                    <textarea
                        id={textareaId}
                        className={cn(
                            "flex min-h-[100px] w-full rounded-md border border-charcoal-muted/30 bg-ivory py-3 text-sm text-charcoal shadow-sm transition-colors placeholder:text-charcoal-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lotus focus-visible:border-lotus disabled:cursor-not-allowed disabled:opacity-50",
                            icon ? "pl-10 pr-3" : "px-3",
                            error && "border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                </div>
            </div>
        );
    }
);
Textarea.displayName = "Textarea";

export { Textarea };
