import * as React from "react";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
    title?: string;
}

export function Modal({ isOpen, onClose, children, className, title }: ModalProps) {
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleEscape);
        }
        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
                aria-hidden="true"
            />
            <div className={cn("z-50 w-full max-w-lg scale-100 rounded-2xl bg-ivory p-6 opacity-100 shadow-xl animate-fade-up", className)}>
                <div className={cn("mb-4 flex items-center", title ? "justify-between" : "justify-end")}>
                    {title && <h2 className="text-xl font-display font-semibold text-maroon">{title}</h2>}
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-charcoal-muted hover:bg-lotus-light/30 hover:text-maroon transition-colors"
                    >
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close</span>
                    </button>
                </div>
                <div className="text-charcoal">{children}</div>
            </div>
        </div>,
        document.body
    );
}
