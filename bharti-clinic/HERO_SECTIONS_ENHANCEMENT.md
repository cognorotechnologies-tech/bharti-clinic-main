# 🎨 Hero Sections Enhancement Plan

## Overview
Improving hero sections across all public pages with:
- Consistent design language
- Better visual hierarchy
- Engaging animations
- Responsive layouts
- Ayurvedic aesthetic

## Pages to Enhance

### 1. Home Page (/)
**Current:** Basic hero with title and CTA
**Enhancement:**
- Full-screen hero with gradient overlay
- Animated lotus petals background
- Prominent headline with subtext
- Multiple CTAs (Book Appointment, Shop Products, Learn More)
- Trust indicators (Years of experience, Happy patients, etc.)
- Smooth scroll indicator

### 2. Shop Page (/shop)
**Current:** Simple header
**Enhancement:**
- Split hero with product showcase
- Category quick filters
- Search bar integration
- Featured product carousel
- Special offers banner
- Breadcrumb navigation

### 3. Therapies Page (/therapies)
**Current:** Basic title
**Enhancement:**
- Immersive therapy showcase
- Category tabs in hero
- Video/image background
- Benefits highlights
- Quick booking CTA
- Testimonial snippet

### 4. Packages Page (/packages)
**Current:** Standard header
**Enhancement:**
- Value proposition hero
- Savings calculator
- Package comparison preview
- Limited time offers
- Trust badges
- Popular package highlight

### 5. Gallery Page (/gallery)
**Current:** Simple title
**Enhancement:**
- Masonry grid preview in hero
- Category filter pills
- Image count display
- Virtual tour CTA
- Social proof

### 6. Blog Page (/blog)
**Current:** Basic header
**Enhancement:**
- Featured article hero
- Category navigation
- Search functionality
- Latest posts preview
- Newsletter signup
- Reading time indicators

### 7. About Page (/about)
**Current:** Standard intro
**Enhancement:**
- Founder story highlight
- Mission statement
- Team photo
- Credentials showcase
- Timeline preview
- Values icons

### 8. Contact Page (/contact)
**Current:** Form-focused
**Enhancement:**
- Split layout (info + form preview)
- Location map integration
- Quick contact options
- Business hours
- Emergency contact
- Social links

## Design Principles

### Visual Elements
- **Colors:** Lotus pink, Maroon, Gold accents, Ivory backgrounds
- **Typography:** Display font for headlines, Body font for text
- **Spacing:** Generous padding, clear hierarchy
- **Images:** High-quality Ayurvedic imagery

### Animations
- Fade-in on scroll
- Stagger animations for elements
- Smooth transitions
- Parallax effects (subtle)
- Hover states

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly CTAs
- Optimized images

### Accessibility
- ARIA labels
- Keyboard navigation
- Focus indicators
- Alt text for images
- Sufficient color contrast

## Implementation Strategy

1. Create reusable hero components
2. Implement page-specific variations
3. Add animations with Framer Motion
4. Test responsiveness
5. Optimize performance
6. Verify accessibility

## Components to Create

1. `HeroBase.tsx` - Base hero component
2. `HeroWithImage.tsx` - Hero with background image
3. `HeroSplit.tsx` - Split layout hero
4. `HeroMinimal.tsx` - Minimal text-focused hero
5. `HeroShowcase.tsx` - Product/service showcase hero

## Next Steps

1. Review current hero sections
2. Create component library
3. Implement enhancements page by page
4. Test and refine
5. Document usage
