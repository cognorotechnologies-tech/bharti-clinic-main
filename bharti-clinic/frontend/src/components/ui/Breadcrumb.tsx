import { cn } from "../../lib/utils";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

export interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
    return (
        <nav aria-label="Breadcrumb" className={cn("flex", className)}>
            <ol className="flex items-center space-x-2 text-sm text-charcoal-muted flex-wrap gap-y-2">
                <li>
                    <Link
                        to="/"
                        className="flex items-center transition-colors hover:text-lotus-deep focus:outline-none focus:ring-2 focus:ring-lotus rounded-sm"
                    >
                        <Home className="h-4 w-4" />
                        <span className="sr-only">Home</span>
                    </Link>
                </li>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={item.label} className="flex items-center space-x-2">
                            <ChevronRight className="h-4 w-4 text-lotus/50" />
                            {isLast || !item.href ? (
                                <span className="font-medium text-charcoal" aria-current="page">
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    to={item.href}
                                    className="transition-colors hover:text-lotus-deep focus:outline-none focus:ring-2 focus:ring-lotus rounded-sm"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
