import * as React from "react";
import { cn } from "../../lib/utils";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import { createPortal } from "react-dom";

export type ToastType = "success" | "error" | "info";

export interface ToastProps {
    id: string;
    type?: ToastType;
    title: string;
    message?: string;
    onClose: (id: string) => void;
    className?: string;
}

export function Toast({ id, type = "info", title, message, onClose, className }: ToastProps) {
    const icons = {
        success: <CheckCircle className="h-5 w-5 text-lotus-deep" />,
        error: <AlertCircle className="h-5 w-5 text-red-500" />,
        info: <Info className="h-5 w-5 text-gold" />,
    };

    const bgs = {
        success: "bg-lotus-light/30 border-lotus",
        error: "bg-red-50 border-red-200",
        info: "bg-ivory-100 border-gold/40",
    };

    React.useEffect(() => {
        const timer = setTimeout(() => {
            onClose(id);
        }, 5000);
        return () => clearTimeout(timer);
    }, [id, onClose]);

    return (
        <div
            className={cn(
                "pointer-events-auto flex w-full max-w-sm rounded-lg border p-4 shadow-lg animate-fade-up",
                bgs[type],
                className
            )}
        >
            <div className="flex w-full items-start gap-3">
                <div className="flex-shrink-0 pt-0.5">{icons[type]}</div>
                <div className="flex-1">
                    <h3 className="text-sm font-semibold text-charcoal">{title}</h3>
                    {message && <p className="mt-1 text-sm text-charcoal-muted">{message}</p>}
                </div>
                <button
                    onClick={() => onClose(id)}
                    className="flex-shrink-0 rounded-full p-1 text-charcoal-muted hover:bg-white/50 transition-colors focus:outline-none focus:ring-2 focus:ring-lotus"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}

export interface ToastContainerProps {
    toasts: ToastProps[];
    onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
    if (toasts.length === 0) return null;

    return createPortal(
        <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm px-4 sm:px-0">
            {toasts.map((toast) => (
                <Toast key={toast.id} {...toast} onClose={onClose} />
            ))}
        </div>,
        document.body
    );
}
