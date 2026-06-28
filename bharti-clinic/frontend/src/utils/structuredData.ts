// JSON-LD Structured Data for SEO

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    comparePrice?: number;
    imageUrls: string[];
    category: string;
    inStock: boolean;
}

export interface BlogPost {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    slug: string;
    featuredImage?: string;
    author: string;
    publishedAt: string;
    updatedAt: string;
}

export interface Therapy {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    imageUrl?: string;
}

// Organization Schema (for homepage)
export function getOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'MedicalBusiness',
        name: 'Bharti Clinic',
        alternateName: 'Bharti Veda Ayurvedic Clinic',
        url: 'https://bhartiveda.com',
        logo: 'https://bhartiveda.com/logo.png',
        description: 'Authentic Ayurvedic healing and wellness center offering traditional therapies, herbal products, and personalized treatment plans.',
        image: 'https://bhartiveda.com/og-image.jpg',
        telephone: '+91-XXXXXXXXXX',
        email: 'info@bhartiveda.com',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'PMF2+5W',
            addressLocality: 'Sahibzada Ajit Singh Nagar',
            addressRegion: 'Punjab',
            addressCountry: 'IN',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: '30.7230',
            longitude: '76.7708',
        },
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                opens: '09:00',
                closes: '18:00',
            },
        ],
        priceRange: '₹₹',
        sameAs: [
            'https://facebook.com/bhartiveda',
            'https://instagram.com/bhartiveda',
            'https://twitter.com/bhartiveda',
        ],
    };
}

// Product Schema
export function getProductSchema(product: Product) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.imageUrls.map(url => 
            url.startsWith('http') ? url : `https://bhartiveda.com${url}`
        ),
        brand: {
            '@type': 'Brand',
            name: 'Bharti Clinic',
        },
        offers: {
            '@type': 'Offer',
            url: `https://bhartiveda.com/shop/${product.id}`,
            priceCurrency: 'INR',
            price: product.price,
            priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            availability: product.inStock 
                ? 'https://schema.org/InStock' 
                : 'https://schema.org/OutOfStock',
            seller: {
                '@type': 'Organization',
                name: 'Bharti Clinic',
            },
        },
        category: product.category,
    };
}

// Article/Blog Post Schema
export function getArticleSchema(post: BlogPost) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        image: post.featuredImage 
            ? (post.featuredImage.startsWith('http') 
                ? post.featuredImage 
                : `https://bhartiveda.com${post.featuredImage}`)
            : 'https://bhartiveda.com/og-image.jpg',
        author: {
            '@type': 'Person',
            name: post.author,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Bharti Clinic',
            logo: {
                '@type': 'ImageObject',
                url: 'https://bhartiveda.com/logo.png',
            },
        },
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://bhartiveda.com/blog/${post.slug}`,
        },
    };
}

// Service Schema (for therapies)
export function getServiceSchema(therapy: Therapy) {
    return {
        '@context': 'https://schema.org',
        '@type': 'MedicalProcedure',
        name: therapy.name,
        description: therapy.description,
        image: therapy.imageUrl 
            ? (therapy.imageUrl.startsWith('http') 
                ? therapy.imageUrl 
                : `https://bhartiveda.com${therapy.imageUrl}`)
            : undefined,
        provider: {
            '@type': 'MedicalBusiness',
            name: 'Bharti Clinic',
        },
        offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            price: therapy.price,
        },
        procedureType: 'Ayurvedic Therapy',
    };
}

// Breadcrumb Schema
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url.startsWith('http') ? item.url : `https://bhartiveda.com${item.url}`,
        })),
    };
}

// FAQ Schema
export function getFAQSchema(faqs: { question: string; answer: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

// Helper to inject structured data into page
export function injectStructuredData(data: any) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
    
    // Return cleanup function
    return () => {
        document.head.removeChild(script);
    };
}
