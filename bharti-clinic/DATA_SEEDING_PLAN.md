# 🌿 Realistic Ayurvedic Data Seeding Plan

**Bharti Clinic - Complete Database Seeding Strategy**  
**Date:** February 28, 2026

---

## 📋 Overview

This plan provides realistic, meaningful Ayurvedic data for:
- Products (Ayurvedic oils, herbs, supplements)
- Therapies (Panchakarma, massage treatments)
- Packages (wellness programs)
- Blog posts (Ayurvedic knowledge)
- Gallery images (clinic photos)
- Reviews (customer testimonials)

---

## 🎯 Data Structure

### Total Data to Seed:
- **Admin User:** 1
- **Categories:** 12 (6 product + 6 therapy)
- **Products:** 30 authentic Ayurvedic products
- **Therapies:** 15 traditional treatments
- **Packages:** 6 wellness packages
- **Blog Posts:** 10 informative articles
- **Gallery Items:** 20 images
- **Reviews:** 25 customer reviews
- **Settings:** 5 clinic settings

---

## 🖼️ Image Strategy

### Option 1: Free Stock Images (Recommended for Testing)

**Sources:**
1. **Unsplash** - [unsplash.com](https://unsplash.com)
   - Search: "ayurveda", "herbs", "massage", "wellness"
   - Free to use, no attribution required
   - High quality images

2. **Pexels** - [pexels.com](https://pexels.com)
   - Search: "ayurvedic", "spa", "natural medicine"
   - Free to use
   - Good variety

3. **Pixabay** - [pixabay.com](https://pixabay.com)
   - Search: "ayurveda", "herbal", "treatment"
   - Free to use
   - Large collection

### Option 2: Placeholder Images (Quick Setup)

**Services:**
1. **Placeholder.com** - `https://via.placeholder.com/600x400`
2. **Lorem Picsum** - `https://picsum.photos/600/400`
3. **Unsplash Random** - `https://source.unsplash.com/600x400/?ayurveda`

### Option 3: Real Images (Production)

**For production, use:**
1. Professional photography of actual clinic
2. Product photos from suppliers
3. Licensed stock photos
4. Cloudinary for hosting

---

## 📦 1. Categories

### Product Categories (6)

```typescript
const productCategories = [
  {
    name: "Ayurvedic Oils",
    slug: "ayurvedic-oils",
    type: "PRODUCT",
    imageUrl: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108"
  },
  {
    name: "Herbal Supplements",
    slug: "herbal-supplements",
    type: "PRODUCT",
    imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528"
  },
  {
    name: "Skincare & Beauty",
    slug: "skincare-beauty",
    type: "PRODUCT",
    imageUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571"
  },
  {
    name: "Digestive Health",
    slug: "digestive-health",
    type: "PRODUCT",
    imageUrl: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71"
  },
  {
    name: "Immunity Boosters",
    slug: "immunity-boosters",
    type: "PRODUCT",
    imageUrl: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88"
  },
  {
    name: "Hair Care",
    slug: "hair-care",
    type: "PRODUCT",
    imageUrl: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da"
  }
];
```

### Therapy Categories (6)

```typescript
const therapyCategories = [
  {
    name: "Panchakarma Treatments",
    slug: "panchakarma",
    type: "THERAPY",
    imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874"
  },
  {
    name: "Massage Therapies",
    slug: "massage-therapies",
    type: "THERAPY",
    imageUrl: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1"
  },
  {
    name: "Detoxification",
    slug: "detoxification",
    type: "THERAPY",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773"
  },
  {
    name: "Stress Relief",
    slug: "stress-relief",
    type: "THERAPY",
    imageUrl: "https://images.unsplash.com/photo-1545205597-3d9d02c29597"
  },
  {
    name: "Pain Management",
    slug: "pain-management",
    type: "THERAPY",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"
  },
  {
    name: "Beauty & Rejuvenation",
    slug: "beauty-rejuvenation",
    type: "THERAPY",
    imageUrl: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8"
  }
];
```

---

## 🛍️ 2. Products (30 Authentic Ayurvedic Products)

### Ayurvedic Oils (8 products)

```typescript
const ayurvedicOils = [
  {
    name: "Kumkumadi Tailam - Radiance Oil",
    slug: "kumkumadi-tailam",
    sku: "AO-001",
    description: "Premium saffron-infused face oil for glowing skin. Reduces dark spots, blemishes, and signs of aging. Made with 16 precious herbs including saffron, sandalwood, and lotus.",
    ingredients: "Saffron (Crocus sativus), Sandalwood (Santalum album), Lotus (Nelumbo nucifera), Vetiver (Vetiveria zizanioides), Manjistha (Rubia cordifolia), Sesame oil base",
    howToUse: "Apply 3-4 drops on clean face at night. Gently massage in upward circular motions. Leave overnight. Use daily for best results.",
    price: 1299,
    comparePrice: 1599,
    stock: 45,
    categoryId: "ayurvedic-oils",
    imageUrls: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03"
    ],
    isFeatured: true,
    isActive: true
  },
  {
    name: "Bhringraj Hair Oil - Hair Growth Formula",
    slug: "bhringraj-hair-oil",
    sku: "AO-002",
    description: "Traditional Ayurvedic hair oil for hair growth and preventing premature graying. Enriched with Bhringraj, Amla, and Brahmi. Nourishes scalp and strengthens hair roots.",
    ingredients: "Bhringraj (Eclipta alba), Amla (Emblica officinalis), Brahmi (Bacopa monnieri), Coconut oil, Sesame oil, Hibiscus, Curry leaves",
    howToUse: "Warm oil slightly. Apply to scalp and hair. Massage for 10 minutes. Leave for 1-2 hours or overnight. Wash with mild shampoo. Use 2-3 times weekly.",
    price: 499,
    comparePrice: 699,
    stock: 120,
    categoryId: "ayurvedic-oils",
    imageUrls: [
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d",
      "https://images.unsplash.com/photo-1522338242992-e1a54906a8da"
    ],
    isFeatured: true,
    isActive: true
  },
  {
    name: "Mahanarayan Oil - Joint & Muscle Relief",
    slug: "mahanarayan-oil",
    sku: "AO-003",
    description: "Classical Ayurvedic oil for joint pain, muscle stiffness, and arthritis. Contains 37 herbs processed in sesame oil. Provides deep tissue relief.",
    ingredients: "Ashwagandha, Bala, Shatavari, Sesame oil, Camphor, Eucalyptus, Wintergreen",
    howToUse: "Warm oil and apply to affected areas. Massage gently for 15 minutes. Best used before bath. Can be used daily.",
    price: 399,
    stock: 80,
    categoryId: "ayurvedic-oils",
    imageUrls: ["https://images.unsplash.com/photo-1608571423902-eed4a5ad8108"],
    isActive: true
  },
  {
    name: "Nalpamaradi Tailam - Skin Brightening Oil",
    slug: "nalpamaradi-tailam",
    sku: "AO-004",
    description: "Kerala's traditional skin brightening oil. Reduces tan, pigmentation, and evens skin tone. Suitable for face and body.",
    ingredients: "Turmeric, Vetiver, Indian Madder, Gooseberry, Sesame oil",
    howToUse: "Apply on damp skin after bath. Massage gently. Leave for 20 minutes. Rinse with warm water. Use daily.",
    price: 599,
    stock: 60,
    categoryId: "ayurvedic-oils",
    imageUrls: ["https://images.unsplash.com/photo-1556228578-0d85b1a4d571"],
    isActive: true
  },
  {
    name: "Ksheerabala Oil - Nerve Tonic",
    slug: "ksheerabala-oil",
    sku: "AO-005",
    description: "Calming oil for nervous system. Helps with stress, anxiety, and insomnia. Made with Bala herb and milk.",
    ingredients: "Bala (Sida cordifolia), Cow's milk, Sesame oil",
    howToUse: "Massage on head, neck, and feet before sleep. Promotes relaxation and better sleep.",
    price: 699,
    stock: 40,
    categoryId: "ayurvedic-oils",
    imageUrls: ["https://images.unsplash.com/photo-1608571423902-eed4a5ad8108"],
    isActive: true
  },
  {
    name: "Dhanwantharam Tailam - Pregnancy Care Oil",
    slug: "dhanwantharam-tailam",
    sku: "AO-006",
    description: "Traditional oil for pre and post-natal care. Strengthens muscles, prevents stretch marks, and aids recovery.",
    ingredients: "28 herbs including Bala, Ashwagandha, Shatavari in sesame oil base",
    howToUse: "Massage on abdomen, back, and legs. Safe during pregnancy (after first trimester). Consult doctor before use.",
    price: 899,
    stock: 35,
    categoryId: "ayurvedic-oils",
    imageUrls: ["https://images.unsplash.com/photo-1608571423902-eed4a5ad8108"],
    isActive: true
  },
  {
    name: "Chandanadi Tailam - Cooling Body Oil",
    slug: "chandanadi-tailam",
    sku: "AO-007",
    description: "Cooling oil for Pitta dosha. Reduces body heat, skin inflammation, and burning sensations.",
    ingredients: "Sandalwood, Vetiver, Lotus, Coconut oil",
    howToUse: "Apply on body after bath. Especially good for summer. Provides cooling effect.",
    price: 549,
    stock: 50,
    categoryId: "ayurvedic-oils",
    imageUrls: ["https://images.unsplash.com/photo-1608571423902-eed4a5ad8108"],
    isActive: true
  },
  {
    name: "Triphaladi Oil - Eye Care Formula",
    slug: "triphaladi-oil",
    sku: "AO-008",
    description: "Gentle oil for eye area. Reduces dark circles, puffiness, and eye strain. Made with Triphala.",
    ingredients: "Triphala (Amalaki, Bibhitaki, Haritaki), Sesame oil, Ghee",
    howToUse: "Apply small amount around eyes before sleep. Gently massage. Avoid direct contact with eyes.",
    price: 449,
    stock: 55,
    categoryId: "ayurvedic-oils",
    imageUrls: ["https://images.unsplash.com/photo-1608571423902-eed4a5ad8108"],
    isActive: true
  }
];
```

### Herbal Supplements (8 products)

```typescript
const herbalSupplements = [
  {
    name: "Ashwagandha Capsules - Stress Relief",
    slug: "ashwagandha-capsules",
    sku: "HS-001",
    description: "Pure Ashwagandha root extract (500mg). Reduces stress, anxiety, and improves energy levels. Adaptogenic herb for overall wellness.",
    ingredients: "Ashwagandha (Withania somnifera) root extract 500mg, Vegetarian capsule",
    howToUse: "Take 1-2 capsules daily with warm milk or water after meals. Best taken at night for better sleep.",
    price: 599,
    comparePrice: 799,
    stock: 150,
    categoryId: "herbal-supplements",
    imageUrls: ["https://images.unsplash.com/photo-1505751172876-fa1923c5c528"],
    isFeatured: true,
    isActive: true
  },
  {
    name: "Triphala Churna - Digestive Wellness",
    slug: "triphala-churna",
    sku: "HS-002",
    description: "Traditional Ayurvedic formula of three fruits. Gentle detoxifier, improves digestion, and supports immunity. 100% natural powder.",
    ingredients: "Amalaki (Emblica officinalis), Bibhitaki (Terminalia bellirica), Haritaki (Terminalia chebula) - Equal parts",
    howToUse: "Mix 1 teaspoon in warm water. Take before bed or empty stomach in morning. Start with half teaspoon.",
    price: 299,
    stock: 200,
    categoryId: "herbal-supplements",
    imageUrls: ["https://images.unsplash.com/photo-1505751172876-fa1923c5c528"],
    isFeatured: true,
    isActive: true
  },
  {
    name: "Shatavari Powder - Women's Health",
    slug: "shatavari-powder",
    sku: "HS-003",
    description: "Pure Shatavari root powder. Supports female reproductive health, hormonal balance, and lactation. Natural rejuvenative for women.",
    ingredients: "Shatavari (Asparagus racemosus) root powder 100%",
    howToUse: "Mix 1 teaspoon in warm milk. Take twice daily. Add honey for taste. Consult doctor during pregnancy.",
    price: 449,
    stock: 100,
    categoryId: "herbal-supplements",
    imageUrls: ["https://images.unsplash.com/photo-1505751172876-fa1923c5c528"],
    isActive: true
  },
  {
    name: "Brahmi Capsules - Memory Booster",
    slug: "brahmi-capsules",
    sku: "HS-004",
    description: "Brahmi extract for mental clarity, memory, and concentration. Supports cognitive function and reduces mental fatigue.",
    ingredients: "Brahmi (Bacopa monnieri) extract 300mg, Vegetarian capsule",
    howToUse: "Take 1 capsule twice daily with water after meals. Best results after 4-6 weeks of regular use.",
    price: 549,
    stock: 90,
    categoryId: "herbal-supplements",
    imageUrls: ["https://images.unsplash.com/photo-1505751172876-fa1923c5c528"],
    isActive: true
  },
  {
    name: "Giloy Tablets - Immunity Booster",
    slug: "giloy-tablets",
    sku: "HS-005",
    description: "Guduchi (Giloy) extract tablets. Powerful immunomodulator, reduces fever, and fights infections. Natural immunity builder.",
    ingredients: "Giloy (Tinospora cordifolia) extract 500mg, Excipients",
    howToUse: "Take 1-2 tablets twice daily with water. Can be taken long-term for immunity.",
    price: 399,
    stock: 180,
    categoryId: "herbal-supplements",
    imageUrls: ["https://images.unsplash.com/photo-1505751172876-fa1923c5c528"],
    isActive: true
  },
  {
    name: "Tulsi Drops - Holy Basil Extract",
    slug: "tulsi-drops",
    sku: "HS-006",
    description: "Concentrated Tulsi extract. Boosts immunity, relieves cough and cold, and purifies blood. Liquid form for easy consumption.",
    ingredients: "Tulsi (Ocimum sanctum) extract, Purified water, Natural preservatives",
    howToUse: "Add 10-15 drops in water or tea. Take 2-3 times daily. Good for respiratory health.",
    price: 249,
    stock: 120,
    categoryId: "herbal-supplements",
    imageUrls: ["https://images.unsplash.com/photo-1505751172876-fa1923c5c528"],
    isActive: true
  },
  {
    name: "Chyawanprash - Complete Wellness",
    slug: "chyawanprash",
    sku: "HS-007",
    description: "Traditional Ayurvedic jam with 40+ herbs. Boosts immunity, energy, and vitality. Suitable for all ages.",
    ingredients: "Amla, Ashwagandha, Giloy, Shatavari, Honey, Ghee, and 35+ herbs",
    howToUse: "Take 1-2 teaspoons daily with milk or water. Best in morning. Can be taken year-round.",
    price: 699,
    comparePrice: 899,
    stock: 75,
    categoryId: "herbal-supplements",
    imageUrls: ["https://images.unsplash.com/photo-1505751172876-fa1923c5c528"],
    isFeatured: true,
    isActive: true
  },
  {
    name: "Arjuna Capsules - Heart Health",
    slug: "arjuna-capsules",
    sku: "HS-008",
    description: "Arjuna bark extract for cardiovascular health. Supports heart function, maintains healthy cholesterol, and strengthens heart muscles.",
    ingredients: "Arjuna (Terminalia arjuna) bark extract 500mg, Vegetarian capsule",
    howToUse: "Take 1 capsule twice daily with water after meals. Consult doctor if on heart medication.",
    price: 649,
    stock: 65,
    categoryId: "herbal-supplements",
    imageUrls: ["https://images.unsplash.com/photo-1505751172876-fa1923c5c528"],
    isActive: true
  }
];
```

### Skincare & Beauty (6 products)

```typescript
const skincareProducts = [
  {
    name: "Ubtan Face Pack - Natural Glow",
    slug: "ubtan-face-pack",
    sku: "SB-001",
    description: "Traditional bridal ubtan for radiant skin. Removes tan, brightens complexion, and deep cleanses. Made with gram flour, turmeric, and sandalwood.",
    ingredients: "Gram flour (Besan), Turmeric, Sandalwood powder, Orange peel, Rose petals, Neem",
    howToUse: "Mix 2 tablespoons with milk/yogurt. Apply on face and neck. Leave for 15-20 minutes. Rinse with water. Use 2-3 times weekly.",
    price: 349,
    stock: 95,
    categoryId: "skincare-beauty",
    imageUrls: ["https://images.unsplash.com/photo-1556228578-0d85b1a4d571"],
    isFeatured: true,
    isActive: true
  },
  {
    name: "Neem Face Wash - Acne Control",
    slug: "neem-face-wash",
    sku: "SB-002",
    description: "Gentle face wash with neem and tulsi. Controls acne, removes excess oil, and purifies skin. Suitable for oily and acne-prone skin.",
    ingredients: "Neem extract, Tulsi, Aloe vera, Tea tree oil, Glycerin, Natural cleansers",
    howToUse: "Wet face. Apply small amount. Massage gently. Rinse thoroughly. Use twice daily.",
    price: 299,
    stock: 140,
    categoryId: "skincare-beauty",
    imageUrls: ["https://images.unsplash.com/photo-1556228578-0d85b1a4d571"],
    isActive: true
  },
  {
    name: "Rose Water Toner - Natural Hydration",
    slug: "rose-water-toner",
    sku: "SB-003",
    description: "Pure rose water from Kannauj roses. Hydrates, tones, and refreshes skin. Balances pH and tightens pores.",
    ingredients: "Pure rose water (Rosa damascena), No added chemicals",
    howToUse: "Spray on face after cleansing. Can be used throughout the day. Store in cool place.",
    price: 199,
    stock: 160,
    categoryId: "skincare-beauty",
    imageUrls: ["https://images.unsplash.com/photo-1556228578-0d85b1a4d571"],
    isActive: true
  },
  {
    name: "Aloe Vera Gel - Multi-Purpose",
    slug: "aloe-vera-gel",
    sku: "SB-004",
    description: "99% pure aloe vera gel. Soothes sunburn, moisturizes skin, and heals minor cuts. Can be used on face, body, and hair.",
    ingredients: "Aloe barbadensis leaf extract 99%, Natural preservatives",
    howToUse: "Apply on clean skin. Use as moisturizer, after-sun care, or hair mask. Suitable for all skin types.",
    price: 249,
    stock: 180,
    categoryId: "skincare-beauty",
    imageUrls: ["https://images.unsplash.com/photo-1556228578-0d85b1a4d571"],
    isActive: true
  },
  {
    name: "Saffron Face Cream - Anti-Aging",
    slug: "saffron-face-cream",
    sku: "SB-005",
    description: "Luxurious face cream with saffron and gold. Reduces fine lines, firms skin, and provides deep nourishment. Night cream formula.",
    ingredients: "Saffron, Gold bhasma, Almond oil, Shea butter, Vitamin E, Sandalwood",
    howToUse: "Apply on clean face at night. Massage gently until absorbed. Use daily for best results.",
    price: 899,
    comparePrice: 1199,
    stock: 45,
    categoryId: "skincare-beauty",
    imageUrls: ["https://images.unsplash.com/photo-1556228578-0d85b1a4d571"],
    isFeatured: true,
    isActive: true
  },
  {
    name: "Charcoal Face Scrub - Deep Cleanse",
    slug: "charcoal-face-scrub",
    sku: "SB-006",
    description: "Activated charcoal scrub with walnut. Removes blackheads, unclogs pores, and exfoliates dead skin. For deep cleansing.",
    ingredients: "Activated charcoal, Walnut shell powder, Neem, Tea tree oil, Glycerin",
    howToUse: "Apply on damp face. Massage in circular motions for 2-3 minutes. Rinse thoroughly. Use 2 times weekly.",
    price: 399,
    stock: 110,
    categoryId: "skincare-beauty",
    imageUrls: ["https://images.unsplash.com/photo-1556228578-0d85b1a4d571"],
    isActive: true
  }
];
```

*Note: I'll continue with remaining products, therapies, packages, and blog posts in the next part. This is getting long!*

---

## 📝 Implementation Files

I'll create:
1. **seed.ts** - Main seeding script
2. **seed-data.json** - All data in JSON format
3. **image-urls.md** - All image sources
4. **SEEDING_GUIDE.md** - How to run the seed

Would you like me to continue with:
- Remaining products (Digestive Health, Immunity, Hair Care)
- All 15 Therapies
- 6 Wellness Packages
- 10 Blog Posts
- Gallery Images
- Reviews

And then create the actual seeding scripts?
