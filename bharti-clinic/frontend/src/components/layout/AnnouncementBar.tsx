import * as React from "react";
import { X } from "lucide-react";


interface AnnouncementBarProps {
    message?: string;
}

export function AnnouncementBar({ message = "Welcome to Bharti Veda - Book your Panhkarma Therapy today and get 20% off!" }: AnnouncementBarProps) {
    const [isVisible, setIsVisible] = React.useState(true);

    if (!isVisible || !message) return null;

    return (
        <div 
            data-announcement-bar
            className="fixed top-0 left-0 right-0 bg-gold px-4 py-2 flex items-center justify-center text-maroon text-sm font-medium z-50"
        >
            <div className="text-center px-8">{message}</div>
            <button
                onClick={() => setIsVisible(false)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 transition-colors hover:bg-gold-light focus:outline-none focus:ring-2 focus:ring-maroon"
                aria-label="Dismiss announcement"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}
