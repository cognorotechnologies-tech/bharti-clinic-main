import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * 
 * Automatically scrolls to the top of the page when the route changes.
 * This ensures users always see the top of the new page after navigation.
 * Also manages focus for better accessibility.
 * 
 * Usage: Place inside Router but outside Routes
 */
export function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

        // Focus management for accessibility
        // Move focus to the main content area or body
        const mainContent = document.querySelector('main') || document.body;
        if (mainContent) {
            // Set tabindex temporarily to make it focusable
            mainContent.setAttribute('tabindex', '-1');
            mainContent.focus({ preventScroll: true });
            // Remove tabindex after focus
            mainContent.removeAttribute('tabindex');
        }
    }, [pathname]);

    return null;
}

/**
 * ScrollToTopInstant Component
 * 
 * Same as ScrollToTop but with instant scroll (no smooth animation).
 * Use this if smooth scrolling causes issues or feels too slow.
 */
export function ScrollToTopInstant() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll to top instantly
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
