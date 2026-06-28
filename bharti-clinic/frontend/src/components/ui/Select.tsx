import * as React from "react";
import { cn } from "../../lib/utils";
import { ChevronDown } from "lucide-react";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    error?: boolean;
    label?: string;
    options: { label: string; value: string }[];
    icon?: React.ReactNode;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, error, label, id, options, icon, ...props }, ref) => {
        const defaultId = React.useId();
        const selectId = id || defaultId;
        return (
            <div className="relative group w-full">
                {label && (
                    <label
                        htmlFor={selectId}
                        className="absolute left-3 -top-2.5 bg-ivory px-1 text-xs font-semibold text-charcoal-muted transition-all z-10"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-muted group-focus-within:text-lotus transition-colors">
                            {icon}
                        </div>
                    )}
                    <select
                        id={selectId}
                        className={cn(
                            "appearance-none flex h-12 w-full rounded-md border border-charcoal-muted/30 bg-ivory pr-10 py-2 text-sm text-charcoal shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lotus focus-visible:border-lotus disabled:cursor-not-allowed disabled:opacity-50",
                            icon ? "pl-10" : "pl-3",
                            error && "border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500",
                            className
                        )}
                        ref={ref}
                        {...props}
                    >
                        <option value="" disabled hidden>
                            Select an option
                        </option>
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-charcoal-muted">
                        <ChevronDown className="h-4 w-4" />
                    </div>
                </div>
            </div>
        );
    }
);
Select.displayName = "Select";

export { Select };
