import * as React from "react";
import { cn } from "../../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    label?: string;
    icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, label, id, icon, ...props }, ref) => {
        const defaultId = React.useId();
        const inputId = id || defaultId;
        return (
            <div className="relative group w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="absolute left-3 -top-2.5 bg-ivory px-1 text-xs font-semibold text-charcoal-muted transition-all group-focus-within:text-lotus-deep group-focus-within:-translate-y-0.5 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:text-xs z-10"
                    >
                        {label}
                    </label>
                )}
                <div className="relative flex items-center">
                    {icon && (
                        <div className="absolute left-3 text-charcoal-muted group-focus-within:text-lotus transition-colors">
                            {icon}
                        </div>
                    )}
                    <input
                        id={inputId}
                        type={type}
                        className={cn(
                            "flex h-12 w-full rounded-md border border-charcoal-muted/30 bg-ivory py-2 text-sm text-charcoal shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lotus focus-visible:border-lotus disabled:cursor-not-allowed disabled:opacity-50 peer",
                            icon ? "pl-10 pr-3" : "px-3",
                            error && "border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500",
                            className
                        )}
                        placeholder={label || props.placeholder || " "}
                        ref={ref}
                        {...props}
                    />
                </div>
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
