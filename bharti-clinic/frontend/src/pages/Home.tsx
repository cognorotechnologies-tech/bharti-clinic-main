import { HeroSection } from '../components/home/HeroSection';
import { TrustBar } from '../components/home/TrustBar';
import { TrustBadges } from '../components/home/TrustBadges';
import { AboutSnippet } from '../components/home/AboutSnippet';
import { TherapiesPreview } from '../components/home/TherapiesPreview';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { Testimonials } from '../components/home/Testimonials';
import { GalleryTeaser } from '../components/home/GalleryTeaser';
import { PackagesBanner } from '../components/home/PackagesBanner';
import { FAQSection } from '../components/home/FAQSection';
import { BookingCTA } from '../components/home/BookingCTA';
import { SEO, SEO_CONFIGS } from '../components/SEO';

export function Home() {
    return (
        <div className="flex flex-col w-full">
            <SEO {...SEO_CONFIGS.home} />
            <HeroSection />
            <TrustBar />
            <TrustBadges />
            <AboutSnippet />
            <TherapiesPreview />
            <WhyChooseUs />
            <FeaturedProducts />
            <Testimonials />
            <GalleryTeaser />
            <PackagesBanner />
            <FAQSection />
            <BookingCTA />
        </div>
    );
}
