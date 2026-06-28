import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'product';
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
    schemaData?: Record<string, any>;
}

const DEFAULT_SEO = {
    title: 'Bharti Clinic - Authentic Ayurvedic Healing & Wellness',
    description: 'Experience authentic Ayurvedic treatments, natural herbal products, and holistic wellness therapies at Bharti Clinic. Expert practitioners, personalized care, and time-tested healing traditions.',
    keywords: 'ayurveda, ayurvedic clinic, herbal medicine, natural healing, wellness therapy, panchakarma, ayurvedic products, holistic health, traditional medicine, ayurvedic treatment',
    image: '/og-image.jpg',
    url: 'https://bhartiveda.com',
    type: 'website' as const,
};

const BASE_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Bharti Clinic",
    "image": "https://bhartiveda.com/og-image.jpg",
    "@id": "https://bhartiveda.com",
    "url": "https://bhartiveda.com",
    "telephone": "+9198XXXxxxxx", // Placeholder
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sahibzada Ajit Singh Nagar",
        "addressLocality": "Mohali",
        "addressRegion": "Punjab",
        "addressCountry": "IN"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 30.7046,
        "longitude": 76.7179
    },
    "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
            "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ],
        "opens": "09:00",
        "closes": "20:00"
    },
    "sameAs": [
        "https://www.facebook.com/bharticlinic",
        "https://www.instagram.com/bharticlinic"
    ],
    "medicalSpecialty": "Ayurvedic",
    "availableService": [
        {
            "@type": "MedicalTest",
            "name": "Ayurvedic Consultation"
        },
        {
            "@type": "MedicalTherapy",
            "name": "Panchakarma"
        }
    ]
};

export function SEO({
    title,
    description = DEFAULT_SEO.description,
    keywords = DEFAULT_SEO.keywords,
    image = DEFAULT_SEO.image,
    url = DEFAULT_SEO.url,
    type = DEFAULT_SEO.type,
    author,
    publishedTime,
    modifiedTime,
    schemaData,
}: SEOProps) {
    const fullTitle = title ? `${title} | Bharti Clinic` : DEFAULT_SEO.title;
    const fullUrl = url.startsWith('http') ? url : `${DEFAULT_SEO.url}${url}`;
    const fullImage = image.startsWith('http') ? image : `${DEFAULT_SEO.url}${image}`;

    // Apply provided schema or fallback to local business schema
    const finalSchema = schemaData || BASE_SCHEMA;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            {author && <meta name="author" content={author} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:site_name" content="Bharti Clinic" />
            <meta property="og:locale" content="en_US" />

            {/* Article specific */}
            {type === 'article' && publishedTime && (
                <meta property="article:published_time" content={publishedTime} />
            )}
            {type === 'article' && modifiedTime && (
                <meta property="article:modified_time" content={modifiedTime} />
            )}
            {type === 'article' && author && (
                <meta property="article:author" content={author} />
            )}

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={fullUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImage} />

            {/* Additional SEO */}
            <link rel="canonical" href={fullUrl} />
            <meta name="robots" content="index, follow" />
            <meta name="googlebot" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content="English" />

            {/* JSON-LD Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(finalSchema)}
            </script>
        </Helmet>
    );
}

// Predefined SEO configs for common pages
export const SEO_CONFIGS = {
    home: {
        title: 'Home',
        description: 'Welcome to Bharti Clinic - Your trusted destination for authentic Ayurvedic healing. Discover natural therapies, herbal products, and personalized wellness solutions.',
        keywords: 'ayurvedic clinic, natural healing, wellness center, ayurveda treatments, herbal medicine',
        url: '/',
    },
    shop: {
        title: 'Ayurvedic Products Shop',
        description: 'Shop authentic Ayurvedic products, herbal supplements, natural skincare, and wellness essentials. 100% natural ingredients, traditional formulations.',
        keywords: 'ayurvedic products, herbal supplements, natural skincare, ayurvedic medicine, wellness products',
        url: '/shop',
    },
    therapies: {
        title: 'Ayurvedic Therapies & Treatments',
        description: 'Explore our range of authentic Ayurvedic therapies including Panchakarma, Abhyanga, Shirodhara, and more. Expert practitioners, personalized treatment plans.',
        keywords: 'ayurvedic therapy, panchakarma, abhyanga, shirodhara, ayurvedic massage, detox therapy',
        url: '/therapies',
    },
    packages: {
        title: 'Wellness Packages',
        description: 'Comprehensive Ayurvedic wellness packages designed for complete healing. Save up to 30% on bundled therapies and treatments.',
        keywords: 'wellness packages, ayurvedic packages, therapy bundles, wellness programs',
        url: '/packages',
    },
    blog: {
        title: 'Ayurveda Blog & Health Tips',
        description: 'Read expert articles on Ayurvedic lifestyle, natural remedies, wellness tips, and holistic health practices. Learn from experienced practitioners.',
        keywords: 'ayurveda blog, health tips, natural remedies, wellness articles, ayurvedic lifestyle',
        url: '/blog',
    },
    about: {
        title: 'About Us',
        description: 'Learn about Bharti Clinic\'s 15+ years of experience in Ayurvedic healing. Meet our expert practitioners and discover our commitment to authentic wellness.',
        keywords: 'about bharti clinic, ayurvedic practitioners, clinic history, wellness experts',
        url: '/about',
    },
    contact: {
        title: 'Contact Us',
        description: 'Get in touch with Bharti Clinic. Book appointments, ask questions, or visit us at Sahibzada Ajit Singh Nagar, Punjab. We\'re here to help.',
        keywords: 'contact bharti clinic, book appointment, ayurvedic consultation, clinic location',
        url: '/contact',
    },
    gallery: {
        title: 'Gallery',
        description: 'Explore our clinic facilities, treatment rooms, herbal products, and wellness events. See the Bharti Clinic experience in pictures.',
        keywords: 'clinic gallery, treatment facilities, ayurvedic clinic photos, wellness center',
        url: '/gallery',
    },
};
