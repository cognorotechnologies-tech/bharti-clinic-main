import * as React from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "../ui/Button";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { cn } from "../../lib/utils";
import { useCart } from "../../context/CartContext";

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Therapies", href: "/therapies" },
    { name: "Packages", href: "/packages" },
    { name: "Shop", href: "/shop" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
];

export function Navbar() {
    const scrollPosition = useScrollPosition();
    const isScrolled = scrollPosition > 50;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [hasAnnouncementBar, setHasAnnouncementBar] = React.useState(true);
    const { itemCount, openCart } = useCart();

    // Close mobile menu when screen size changes to desktop
    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Listen for announcement bar dismissal
    React.useEffect(() => {
        const checkAnnouncementBar = () => {
            const announcementBar = document.querySelector('[data-announcement-bar]');
            setHasAnnouncementBar(!!announcementBar);
        };

        checkAnnouncementBar();
        const observer = new MutationObserver(checkAnnouncementBar);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, []);

    return (
        <header
            className={cn(
                "fixed left-0 right-0 transition-all duration-300",
                isScrolled
                    ? "bg-white/95 backdrop-blur-md shadow-md py-3 top-0 z-50"
                    : hasAnnouncementBar
                        ? "bg-white/10 backdrop-blur-sm py-4 top-10 z-40"
                        : "bg-white/10 backdrop-blur-sm py-4 top-0 z-40"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        {/* Lotus SVG Icon */}
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-lotus group-hover:text-maroon transition-colors">
                            <path d="M12 2C12 2 14.5 7 18 8.5C18 8.5 21 6 22 9C22 12 18 15.5 12 22C6 15.5 2 12 2 9C3 6 6 8.5 6 8.5C9.5 7 12 2 12 2Z" fill="currentColor" />
                            <path d="M12 22C12 22 16 18 16 14C16 10 12 6 12 6C12 6 8 10 8 14C8 18 12 22 12 22Z" fill="#FFFDF7" opacity="0.3" />
                        </svg>
                        <span className="font-display font-bold text-2xl text-maroon">Bharti Clinic</span>
                    </Link>

                    {/* Phone Number - Desktop */}
                    <a
                        href="tel:+919876543210"
                        className={cn(
                            "hidden md:flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105",
                            isScrolled
                                ? "bg-lotus-light/50 text-maroon hover:bg-lotus-light"
                                : "bg-white/80 backdrop-blur-sm text-maroon hover:bg-white"
                        )}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-sm font-semibold">+91 98765 43210</span>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.name}
                                data-testid={`nav-${link.name.toLowerCase()}-desktop`}
                                to={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors relative group",
                                    isScrolled ? "text-charcoal hover:text-lotus" : "text-maroon font-semibold hover:text-lotus-deep"
                                )}
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-lotus group-hover:w-full transition-all duration-300" />
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center gap-4">
                        <button
                            data-testid="cart-icon-desktop"
                            onClick={openCart}
                            className={cn(
                                "relative p-2 transition-colors",
                                isScrolled ? "text-charcoal hover:text-lotus" : "text-maroon hover:text-lotus-deep"
                            )}
                        >
                            <ShoppingBag className="h-5 w-5" />
                            {itemCount > 0 && (
                                <span data-testid="cart-badge" className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-maroon rounded-full">
                                    {itemCount}
                                </span>
                            )}
                        </button>
                        <Link to="/contact">
                            <Button
                                variant="primary"
                                className={cn(
                                    "transition-all duration-300",
                                    isScrolled ? "" : "bg-maroon text-white hover:bg-gold"
                                )}
                            >
                                Book Now
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="flex lg:hidden items-center gap-4">
                        <button data-testid="cart-icon-mobile" onClick={openCart} className="relative p-2 text-charcoal hover:text-lotus transition-colors">
                            <ShoppingBag className="h-5 w-5" />
                            {itemCount > 0 && (
                                <span data-testid="cart-badge-mobile" className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform bg-maroon rounded-full">
                                    {itemCount}
                                </span>
                            )}
                        </button>
                        <button
                            data-testid="mobile-menu-btn"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-charcoal focus:outline-none"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <span className="sr-only">{isMobileMenuOpen ? "Close menu" : "Open menu"}</span>
                            {isMobileMenuOpen ? <X data-testid="close-mobile-menu" className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <div
                data-testid="mobile-menu"
                className={cn(
                    "fixed inset-0 z-[-1] bg-ivory pt-24 pb-6 px-4 flex flex-col transition-transform duration-300 ease-in-out lg:hidden h-screen overflow-y-auto",
                    isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
                )}
            >
                <nav className="flex flex-col gap-4 mt-8 flex-1">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            data-testid={`nav-${link.name.toLowerCase()}-mobile`}
                            to={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-2xl font-display font-medium text-maroon border-b border-lotus-light/30 pb-4 hover:text-lotus transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="mt-8 flex flex-col gap-4">
                        <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                            <Button variant="primary" size="lg" className="w-full text-lg">
                                Book Appointment
                            </Button>
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}
