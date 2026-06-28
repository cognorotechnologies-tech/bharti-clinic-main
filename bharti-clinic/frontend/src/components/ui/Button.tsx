import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lotus disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                primary: "bg-maroon text-white hover:bg-maroon-light shadow-lg shadow-maroon/20 font-bold tracking-widest",
                secondary: "bg-ivory text-maroon hover:bg-lotus/10 border border-lotus/20",
                ghost: "bg-white/10 backdrop-blur-md border border-white/20 text-maroon hover:bg-white/20 transition-all",
                gold: "bg-gradient-to-r from-gold to-gold-light text-white hover:shadow-gold/30 shadow-lg",
            },
            size: {
                sm: "h-8 rounded-md px-3 text-xs",
                md: "h-10 rounded-md px-4 py-2",
                lg: "h-12 rounded-lg px-8 text-base",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, isLoading, children, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
