# 🎬 Hero Implementation Samples

Complete implementation examples for each public page with video backgrounds and carousels.

---

## 1. Shop Page - Product Carousel Hero

```tsx
import { HeroCarousel, CarouselSlide } from '../components/hero/HeroCarousel';
import { Button } from '../components/ui/Button';
import { ShoppingBag, Sparkles } from 'lucide-react';

const shopSlides: CarouselSlide[] = [
    {
        id: 'featured-oils',
        title: 'Premium Ayurvedic Oils',
        subtitle: 'New Arrivals',
        description: 'Discover our collection of authentic herbal oils crafted with traditional wisdom',
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1920',
        cta: (
            <div className="flex gap-4">
                <Button variant="primary" size="lg">
                    <ShoppingBag className="mr-2" size={20} />
                    Shop Now
                </Button>
                <Button variant="secondary" size="lg">
                    View Collection
                </Button>
            </div>
        ),
    },
    {
        id: 'supplements',
        title: 'Natural Supplements',
        subtitle: 'Boost Your Immunity',
        description: 'Pure herbal supplements for holistic wellness and vitality',
        image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1920',
        cta: (
            <Button variant="primary" size="lg">
                Explore Supplements
            </Button>
        ),
    },
    {
        id: 'skincare',
        title: 'Radiant Skin Naturally',
        subtitle: 'Skincare Essentials',
        description: 'Traditional beauty secrets for glowing, healthy skin',
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1920',
        cta: (
            <Button variant="primary" size="lg">
                <Sparkles className="mr-2" size={20} />
                Discover Beauty
            </Button>
        ),
    },
];

// In ShopPage component:
<HeroCarousel 
    slides={shopSlides} 
    autoPlay={true} 
    interval={6000}
    showControls={true}
    showIndicators={true}
/>
```

---

## 2. Therapies Page - Video Background Hero

```tsx
import { HeroWithVideo } from '../components/hero/HeroWithVideo';
import { Button } from '../components/ui/Button';
import { Calendar, Heart } from 'lucide-react';

// In TherapiesPage component:
<HeroWithVideo
    title="Ancient Healing, Modern Wellness"
    subtitle="Ayurvedic Therapies"
    description="Experience the transformative power of traditional Panchakarma and massage therapies"
    videoUrl="/videos/therapy-session.mp4"
    posterImage="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920"
    overlayOpacity={0.5}
    autoPlay={true}
    muted={true}
    loop={true}
>
    <Button variant="primary" size="lg">
        <Calendar className="mr-2" size={20} />
        Book Consultation
    </Button>
    <Button variant="secondary" size="lg">
        <Heart className="mr-2" size={20} />
        View All Therapies
    </Button>
</HeroWithVideo>
```

---

## 3. Packages Page - Showcase with Stats

```tsx
import { HeroShowcase } from '../components/hero/HeroShowcase';
import { Button } from '../components/ui/Button';
import { Gift, TrendingDown } from 'lucide-react';

// In PackagesPage component:
<HeroShowcase
    title="Wellness Packages"
    subtitle="Save More, Heal Better"
    description="Comprehensive therapy packages designed for complete rejuvenation at special prices"
    stats={[
        { label: 'Packages', value: '6+' },
        { label: 'Save Up To', value: '30%' },
        { label: 'Sessions', value: '10+' },
        { label: 'Happy Clients', value: '500+' },
    ]}
    backgroundPattern={true}
>
    <div className="flex gap-4">
        <Button variant="primary" size="lg">
            <Gift className="mr-2" size={20} />
            View Packages
        </Button>
        <Button variant="secondary" size="lg">
            <TrendingDown className="mr-2" size={20} />
            Compare Savings
        </Button>
    </div>
</HeroShowcase>
```

---

## 4. Gallery Page - Masonry Preview Carousel

```tsx
import { HeroCarousel, CarouselSlide } from '../components/hero/HeroCarousel';
import { Button } from '../components/ui/Button';
import { Camera, Play } from 'lucide-react';

const gallerySlides: CarouselSlide[] = [
    {
        id: 'clinic-interior',
        title: 'Our Healing Space',
        subtitle: 'Clinic Gallery',
        description: 'Step into our serene, traditional Ayurvedic clinic designed for your comfort',
        image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1920',
        cta: (
            <Button variant="primary" size="lg">
                <Camera className="mr-2" size={20} />
                View Gallery
            </Button>
        ),
    },
    {
        id: 'therapy-sessions',
        title: 'Therapy in Action',
        subtitle: 'Treatment Sessions',
        description: 'Witness the art of traditional Ayurvedic healing',
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920',
        cta: (
            <Button variant="primary" size="lg">
                <Play className="mr-2" size={20} />
                Watch Video Tour
            </Button>
        ),
    },
    {
        id: 'products',
        title: 'Authentic Products',
        subtitle: 'Our Collection',
        description: 'Pure, natural Ayurvedic products crafted with care',
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1920',
        cta: (
            <Button variant="primary" size="lg">
                Explore Products
            </Button>
        ),
    },
];

// In GalleryPage component:
<HeroCarousel 
    slides={gallerySlides} 
    autoPlay={true} 
    interval={5000}
/>
```

---

## 5. Blog Page - Featured Article Carousel

```tsx
import { HeroCarousel, CarouselSlide } from '../components/hero/HeroCarousel';
import { Button } from '../components/ui/Button';
import { BookOpen, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

// In BlogPage component:
const [featuredPosts, setFeaturedPosts] = useState<CarouselSlide[]>([]);

useEffect(() => {
    // Fetch featured blog posts and convert to slides
    const fetchFeatured = async () => {
        const response = await axios.get('http://localhost:5000/api/blog?featured=true&limit=3');
        const slides = response.data.data.map((post: any) => ({
            id: post.id,
            title: post.title,
            subtitle: 'Featured Article',
            description: post.excerpt,
            image: post.imageUrl || 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920',
            cta: (
                <Button variant="primary" size="lg" onClick={() => navigate(`/blog/${post.slug}`)}>
                    <BookOpen className="mr-2" size={20} />
                    Read Article
                </Button>
            ),
        }));
        setFeaturedPosts(slides);
    };
    fetchFeatured();
}, []);

return (
    <>
        {featuredPosts.length > 0 && (
            <HeroCarousel 
                slides={featuredPosts} 
                autoPlay={true} 
                interval={7000}
            />
        )}
    </>
);
```

---

## 6. About Page - Video Background with Mission

```tsx
import { HeroWithVideo } from '../components/hero/HeroWithVideo';
import { Button } from '../components/ui/Button';
import { Users, Award } from 'lucide-react';

// In AboutPage component:
<HeroWithVideo
    title="Healing Through Ancient Wisdom"
    subtitle="Our Story"
    description="25+ years of bringing authentic Ayurvedic healing to modern lives"
    videoUrl="/videos/clinic-tour.mp4"
    posterImage="https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1920"
    overlayOpacity={0.6}
>
    <div className="flex gap-4">
        <Button variant="primary" size="lg">
            <Users className="mr-2" size={20} />
            Meet Our Team
        </Button>
        <Button variant="secondary" size="lg">
            <Award className="mr-2" size={20} />
            Our Credentials
        </Button>
    </div>
</HeroWithVideo>
```

---

## 7. Contact Page - Split Hero with Map

```tsx
import { HeroSplit } from '../components/hero/HeroSplit';
import { Button } from '../components/ui/Button';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

// In ContactPage component:
<HeroSplit
    title="Get in Touch"
    subtitle="Contact Us"
    description="We're here to answer your questions and guide you on your wellness journey"
    leftContent={
        <div className="space-y-6">
            <div className="flex items-start gap-4">
                <div className="p-3 bg-lotus-pink/10 rounded-lg">
                    <Phone className="w-6 h-6 text-lotus-pink" />
                </div>
                <div>
                    <h3 className="font-semibold text-maroon mb-1">Phone</h3>
                    <p className="text-charcoal/70">+91 98765 43210</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="p-3 bg-lotus-pink/10 rounded-lg">
                    <Mail className="w-6 h-6 text-lotus-pink" />
                </div>
                <div>
                    <h3 className="font-semibold text-maroon mb-1">Email</h3>
                    <p className="text-charcoal/70">info@bharticlinic.com</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="p-3 bg-lotus-pink/10 rounded-lg">
                    <MapPin className="w-6 h-6 text-lotus-pink" />
                </div>
                <div>
                    <h3 className="font-semibold text-maroon mb-1">Location</h3>
                    <p className="text-charcoal/70">123 Wellness Street, Green Park, New Delhi</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="p-3 bg-lotus-pink/10 rounded-lg">
                    <Clock className="w-6 h-6 text-lotus-pink" />
                </div>
                <div>
                    <h3 className="font-semibold text-maroon mb-1">Hours</h3>
                    <p className="text-charcoal/70">Mon-Sat: 9AM - 7PM</p>
                </div>
            </div>
            <Button variant="primary" size="lg" className="w-full">
                Send Message
            </Button>
        </div>
    }
    rightContent={
        <div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.2!2d77.2!3d28.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDMwJzAwLjAiTiA3N8KwMTInMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
    }
    reverse={false}
/>
```

---

## 8. Product Detail Page - Image Carousel

```tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// In ProductDetailPage component:
const [currentImageIndex, setCurrentImageIndex] = useState(0);

const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.imageUrls.length);
};

const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.imageUrls.length) % product.imageUrls.length);
};

return (
    <div className="relative h-[500px] rounded-3xl overflow-hidden bg-ivory">
        <AnimatePresence mode="wait">
            <motion.img
                key={currentImageIndex}
                src={product.imageUrls[currentImageIndex]}
                alt={product.name}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover"
            />
        </AnimatePresence>

        {product.imageUrls.length > 1 && (
            <>
                <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Thumbnails */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {product.imageUrls.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                                index === currentImageIndex
                                    ? 'border-lotus-pink'
                                    : 'border-white/50'
                            }`}
                        >
                            <img
                                src={product.imageUrls[index]}
                                alt={`${product.name} ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            </>
        )}
    </div>
);
```

---

## 9. Therapy Detail Page - Video + Image Carousel

```tsx
import { HeroCarousel, CarouselSlide } from '../components/hero/HeroCarousel';
import { Button } from '../components/ui/Button';
import { Calendar, Info } from 'lucide-react';

// In TherapyDetailPage component:
const therapySlides: CarouselSlide[] = [
    {
        id: 'main',
        title: therapy.name,
        subtitle: 'Ayurvedic Therapy',
        description: therapy.description,
        image: therapy.imageUrl,
        cta: (
            <div className="flex gap-4">
                <Button variant="primary" size="lg">
                    <Calendar className="mr-2" size={20} />
                    Book Now - ₹{therapy.basePrice}
                </Button>
                <Button variant="secondary" size="lg">
                    <Info className="mr-2" size={20} />
                    Learn More
                </Button>
            </div>
        ),
    },
    // Add more slides for therapy benefits, process, etc.
];

<HeroCarousel 
    slides={therapySlides} 
    autoPlay={false}
    showControls={true}
/>
```

---

## Video File Recommendations

For best performance, use:
- **Format:** MP4 (H.264 codec)
- **Resolution:** 1920x1080 (Full HD)
- **File Size:** < 10MB (compressed)
- **Duration:** 10-30 seconds for loops
- **Fallback:** Always provide poster image

### Sample Video URLs (Replace with actual videos):
```
/videos/therapy-session.mp4
/videos/clinic-tour.mp4
/videos/product-making.mp4
/videos/testimonials.mp4
```

---

## Performance Tips

1. **Lazy Load Videos:** Only load when in viewport
2. **Compress Images:** Use WebP format with fallbacks
3. **Preload First Slide:** For faster initial render
4. **Reduce Motion:** Respect user preferences
5. **Mobile Optimization:** Smaller videos for mobile

---

## Accessibility Checklist

- ✅ Keyboard navigation for carousels
- ✅ ARIA labels for controls
- ✅ Pause/play controls for videos
- ✅ Alt text for all images
- ✅ Focus indicators
- ✅ Screen reader announcements

---

Ready to implement! 🚀
