import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HeroSection } from '../HeroSection';

// framer-motion and petalAnimation are mocked globally in setup.ts

describe('HeroSection Component', () => {
    const renderHeroSection = () => {
        return render(
            <BrowserRouter>
                <HeroSection />
            </BrowserRouter>
        );
    };

    it('renders the main headline', () => {
        renderHeroSection();

        // The text is animated character by character and split into multiple spans + <br/>
        // so we use a custom matcher to find it
        const hasText = (text: string) => (_content: string, element: Element | null) => {
            const hasText = (node: Element) => node.textContent?.includes(text);
            const nodeHasText = element ? hasText(element) : false;
            const childrenDontHaveText = Array.from(element?.children || []).every(
                (child) => !hasText(child)
            );
            return nodeHasText && childrenDontHaveText;
        };

        expect(screen.getByText(hasText('Heal Naturally'))).toBeInTheDocument();
        expect(screen.getByText(hasText('Live Beautifully'))).toBeInTheDocument();
    });

    it('renders the canvas element for petal animation', () => {
        const { container } = renderHeroSection();

        const canvas = container.querySelector('canvas');
        expect(canvas).toBeInTheDocument();
    });

    it('renders CTA buttons', () => {
        renderHeroSection();

        expect(screen.getByText(/Book a Free Consultation/i)).toBeInTheDocument();
        expect(screen.getByText(/Explore Our Therapies/i)).toBeInTheDocument();
    });

    it('renders the tagline', () => {
        renderHeroSection();

        expect(screen.getByText(/Authentic Ayurvedic Healing/i)).toBeInTheDocument();
    });

    it('renders the description text', () => {
        renderHeroSection();

        expect(screen.getByText(/Ancient wisdom. Modern wellness/i)).toBeInTheDocument();
    });

    it('renders trust indicators', () => {
        renderHeroSection();

        expect(screen.getByText(/15\+ Years Experience/i)).toBeInTheDocument();
        expect(screen.getByText(/5,000\+ Happy Patients/i)).toBeInTheDocument();
        expect(screen.getByText(/100% Natural/i)).toBeInTheDocument();
    });

    it('renders scroll hint', () => {
        renderHeroSection();

        expect(screen.getByText(/Discover More/i)).toBeInTheDocument();
    });
});
