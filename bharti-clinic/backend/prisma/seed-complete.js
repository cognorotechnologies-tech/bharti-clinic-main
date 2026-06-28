const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting COMPREHENSIVE database seeding with realistic Ayurvedic data...\n');

    try {
        // ============================================
        // 1. ADMIN USER
        // ============================================
        console.log('👤 Creating admin user...');
        const hashedPassword = await bcrypt.hash('password123', 10);
        const admin = await prisma.user.upsert({
            where: { email: 'dr.ipinder@bhartiveda.com' },
            update: {},
            create: {
                email: 'dr.ipinder@bhartiveda.com',
                passwordHash: hashedPassword,
                name: 'Dr. Ipinder Bharti',
                role: 'ADMIN',
            },
        });
        console.log('✅ Admin ready:', admin.email);

        // ============================================
        // 2. CATEGORIES (12 total: 6 product + 6 therapy)
        // ============================================
        console.log('\n📁 Creating categories...');
        
        // Product Categories
        const oilCategory = await prisma.category.upsert({
            where: { slug: 'ayurvedic-oils' },
            update: {},
            create: {
                name: 'Ayurvedic Oils',
                slug: 'ayurvedic-oils',
                type: 'PRODUCT',
                imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500',
            },
        });
        console.log('✅ Category:', oilCategory.name);

        const supplementCategory = await prisma.category.upsert({
            where: { slug: 'herbal-supplements' },
            update: {},
            create: {
                name: 'Herbal Supplements',
                slug: 'herbal-supplements',
                type: 'PRODUCT',
                imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500',
            },
        });
        console.log('✅ Category:', supplementCategory.name);

        const skincareCategory = await prisma.category.upsert({
            where: { slug: 'skincare-beauty' },
            update: {},
            create: {
                name: 'Skincare & Beauty',
                slug: 'skincare-beauty',
                type: 'PRODUCT',
                imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500',
            },
        });
        console.log('✅ Category:', skincareCategory.name);

        const digestiveCategory = await prisma.category.upsert({
            where: { slug: 'digestive-health' },
            update: {},
            create: {
                name: 'Digestive Health',
                slug: 'digestive-health',
                type: 'PRODUCT',
                imageUrl: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=500',
            },
        });
        console.log('✅ Category:', digestiveCategory.name);

        const immunityCategory = await prisma.category.upsert({
            where: { slug: 'immunity-boosters' },
            update: {},
            create: {
                name: 'Immunity Boosters',
                slug: 'immunity-boosters',
                type: 'PRODUCT',
                imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500',
            },
        });
        console.log('✅ Category:', immunityCategory.name);

        const haircareCategory = await prisma.category.upsert({
            where: { slug: 'hair-care' },
            update: {},
            create: {
                name: 'Hair Care',
                slug: 'hair-care',
                type: 'PRODUCT',
                imageUrl: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500',
            },
        });
        console.log('✅ Category:', haircareCategory.name);

        // Therapy Categories
        const panchakarmaCategory = await prisma.category.upsert({
            where: { slug: 'panchakarma' },
            update: {},
            create: {
                name: 'Panchakarma Treatments',
                slug: 'panchakarma',
                type: 'THERAPY',
                imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500',
            },
        });
        console.log('✅ Category:', panchakarmaCategory.name);

        const massageCategory = await prisma.category.upsert({
            where: { slug: 'massage-therapies' },
            update: {},
            create: {
                name: 'Massage Therapies',
                slug: 'massage-therapies',
                type: 'THERAPY',
                imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=500',
            },
        });
        console.log('✅ Category:', massageCategory.name);

        const detoxCategory = await prisma.category.upsert({
            where: { slug: 'detoxification' },
            update: {},
            create: {
                name: 'Detoxification',
                slug: 'detoxification',
                type: 'THERAPY',
                imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500',
            },
        });
        console.log('✅ Category:', detoxCategory.name);

        const stressCategory = await prisma.category.upsert({
            where: { slug: 'stress-relief' },
            update: {},
            create: {
                name: 'Stress Relief',
                slug: 'stress-relief',
                type: 'THERAPY',
                imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=500',
            },
        });
        console.log('✅ Category:', stressCategory.name);

        const painCategory = await prisma.category.upsert({
            where: { slug: 'pain-management' },
            update: {},
            create: {
                name: 'Pain Management',
                slug: 'pain-management',
                type: 'THERAPY',
                imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
            },
        });
        console.log('✅ Category:', painCategory.name);

        const beautyCategory = await prisma.category.upsert({
            where: { slug: 'beauty-rejuvenation' },
            update: {},
            create: {
                name: 'Beauty & Rejuvenation',
                slug: 'beauty-rejuvenation',
                type: 'THERAPY',
                imageUrl: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=500',
            },
        });
        console.log('✅ Category:', beautyCategory.name);

        // ============================================
        // 3. PRODUCTS (30 total)
        // ============================================
        console.log('\n🛍️  Creating 30 authentic Ayurvedic products...');
        const products = [];

        // AYURVEDIC OILS (8 products)
        const p1 = await prisma.product.upsert({
            where: { slug: 'kumkumadi-tailam' },
            update: {},
            create: {
                name: 'Kumkumadi Tailam - Radiance Oil',
                slug: 'kumkumadi-tailam',
                sku: 'AO-001',
                description: 'Premium saffron-infused face oil for glowing skin. Reduces dark spots, blemishes, and signs of aging.',
                ingredients: 'Saffron, Sandalwood, Lotus, Vetiver, Manjistha, Sesame oil',
                howToUse: 'Apply 3-4 drops on clean face at night. Massage gently in upward circular motions.',
                price: 1299,
                comparePrice: 1599,
                stock: 45,
                categoryId: oilCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500'],
                isActive: true,
                isFeatured: true,
            },
        });
        products.push(p1);
        console.log('✅ Product:', p1.name);

        const p2 = await prisma.product.upsert({
            where: { slug: 'bhringraj-hair-oil' },
            update: {},
            create: {
                name: 'Bhringraj Hair Oil - Hair Growth',
                slug: 'bhringraj-hair-oil',
                sku: 'AO-002',
                description: 'Traditional hair oil for hair growth and preventing premature graying. Enriched with Bhringraj, Amla, and Brahmi.',
                ingredients: 'Bhringraj, Amla, Brahmi, Coconut oil, Sesame oil, Hibiscus',
                howToUse: 'Warm oil slightly. Apply to scalp and hair. Massage for 10 minutes. Leave for 1-2 hours.',
                price: 499,
                comparePrice: 699,
                stock: 120,
                categoryId: haircareCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500'],
                isActive: true,
                isFeatured: true,
            },
        });
        products.push(p2);
        console.log('✅ Product:', p2.name);

        const p3 = await prisma.product.upsert({
            where: { slug: 'mahanarayan-oil' },
            update: {},
            create: {
                name: 'Mahanarayan Oil - Joint Relief',
                slug: 'mahanarayan-oil',
                sku: 'AO-003',
                description: 'Classical Ayurvedic oil for joint pain, muscle stiffness, and arthritis. Contains 37 herbs.',
                ingredients: 'Ashwagandha, Bala, Shatavari, Sesame oil, Camphor, Eucalyptus',
                howToUse: 'Warm oil and apply to affected areas. Massage gently for 15 minutes.',
                price: 399,
                stock: 80,
                categoryId: oilCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500'],
                isActive: true,
            },
        });
        products.push(p3);
        console.log('✅ Product:', p3.name);

        const p4 = await prisma.product.upsert({
            where: { slug: 'nalpamaradi-tailam' },
            update: {},
            create: {
                name: 'Nalpamaradi Tailam - Skin Brightening',
                slug: 'nalpamaradi-tailam',
                sku: 'AO-004',
                description: 'Kerala traditional skin brightening oil. Reduces tan, pigmentation, and evens skin tone.',
                ingredients: 'Turmeric, Vetiver, Indian Madder, Gooseberry, Sesame oil',
                howToUse: 'Apply on damp skin after bath. Massage gently. Leave for 20 minutes.',
                price: 599,
                stock: 60,
                categoryId: skincareCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500'],
                isActive: true,
            },
        });
        products.push(p4);
        console.log('✅ Product:', p4.name);

        const p5 = await prisma.product.upsert({
            where: { slug: 'ksheerabala-oil' },
            update: {},
            create: {
                name: 'Ksheerabala Oil - Nerve Tonic',
                slug: 'ksheerabala-oil',
                sku: 'AO-005',
                description: 'Calming oil for nervous system. Helps with stress, anxiety, and insomnia.',
                ingredients: 'Bala, Cow milk, Sesame oil',
                howToUse: 'Massage on head, neck, and feet before sleep. Promotes relaxation.',
                price: 699,
                stock: 40,
                categoryId: oilCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500'],
                isActive: true,
            },
        });
        products.push(p5);
        console.log('✅ Product:', p5.name);

        const p6 = await prisma.product.upsert({
            where: { slug: 'dhanwantharam-tailam' },
            update: {},
            create: {
                name: 'Dhanwantharam Tailam - Pregnancy Care',
                slug: 'dhanwantharam-tailam',
                sku: 'AO-006',
                description: 'Traditional oil for pre and post-natal care. Strengthens muscles and prevents stretch marks.',
                ingredients: '28 herbs including Bala, Ashwagandha, Shatavari in sesame oil',
                howToUse: 'Massage on abdomen, back, and legs. Safe after first trimester.',
                price: 899,
                stock: 35,
                categoryId: oilCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500'],
                isActive: true,
            },
        });
        products.push(p6);
        console.log('✅ Product:', p6.name);

        const p7 = await prisma.product.upsert({
            where: { slug: 'chandanadi-tailam' },
            update: {},
            create: {
                name: 'Chandanadi Tailam - Cooling Oil',
                slug: 'chandanadi-tailam',
                sku: 'AO-007',
                description: 'Cooling oil for Pitta dosha. Reduces body heat and skin inflammation.',
                ingredients: 'Sandalwood, Vetiver, Lotus, Coconut oil',
                howToUse: 'Apply on body after bath. Especially good for summer.',
                price: 549,
                stock: 50,
                categoryId: oilCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500'],
                isActive: true,
            },
        });
        products.push(p7);
        console.log('✅ Product:', p7.name);

        const p8 = await prisma.product.upsert({
            where: { slug: 'triphaladi-oil' },
            update: {},
            create: {
                name: 'Triphaladi Oil - Eye Care',
                slug: 'triphaladi-oil',
                sku: 'AO-008',
                description: 'Gentle oil for eye area. Reduces dark circles, puffiness, and eye strain.',
                ingredients: 'Triphala, Sesame oil, Ghee',
                howToUse: 'Apply small amount around eyes before sleep. Avoid direct eye contact.',
                price: 449,
                stock: 55,
                categoryId: skincareCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500'],
                isActive: true,
            },
        });
        products.push(p8);
        console.log('✅ Product:', p8.name);

        // HERBAL SUPPLEMENTS (8 products)
        const p9 = await prisma.product.upsert({
            where: { slug: 'ashwagandha-capsules' },
            update: {},
            create: {
                name: 'Ashwagandha Capsules - Stress Relief',
                slug: 'ashwagandha-capsules',
                sku: 'HS-001',
                description: 'Pure Ashwagandha root extract (500mg). Reduces stress, anxiety, and improves energy levels.',
                ingredients: 'Ashwagandha root extract 500mg, Vegetarian capsule',
                howToUse: 'Take 1-2 capsules daily with warm milk or water after meals.',
                price: 599,
                comparePrice: 799,
                stock: 150,
                categoryId: supplementCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500'],
                isActive: true,
                isFeatured: true,
            },
        });
        products.push(p9);
        console.log('✅ Product:', p9.name);

        const p10 = await prisma.product.upsert({
            where: { slug: 'triphala-churna' },
            update: {},
            create: {
                name: 'Triphala Churna - Digestive Wellness',
                slug: 'triphala-churna',
                sku: 'HS-002',
                description: 'Traditional formula of three fruits. Gentle detoxifier, improves digestion, and supports immunity.',
                ingredients: 'Amalaki, Bibhitaki, Haritaki - Equal parts',
                howToUse: 'Mix 1 teaspoon in warm water. Take before bed or empty stomach.',
                price: 299,
                stock: 200,
                categoryId: digestiveCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500'],
                isActive: true,
                isFeatured: true,
            },
        });
        products.push(p10);
        console.log('✅ Product:', p10.name);

        const p11 = await prisma.product.upsert({
            where: { slug: 'shatavari-powder' },
            update: {},
            create: {
                name: 'Shatavari Powder - Women Health',
                slug: 'shatavari-powder',
                sku: 'HS-003',
                description: 'Pure Shatavari root powder. Supports female reproductive health and hormonal balance.',
                ingredients: 'Shatavari root powder 100%',
                howToUse: 'Mix 1 teaspoon in warm milk. Take twice daily.',
                price: 449,
                stock: 100,
                categoryId: supplementCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500'],
                isActive: true,
            },
        });
        products.push(p11);
        console.log('✅ Product:', p11.name);

        const p12 = await prisma.product.upsert({
            where: { slug: 'brahmi-capsules' },
            update: {},
            create: {
                name: 'Brahmi Capsules - Memory Booster',
                slug: 'brahmi-capsules',
                sku: 'HS-004',
                description: 'Brahmi extract for mental clarity, memory, and concentration. Supports cognitive function.',
                ingredients: 'Brahmi extract 300mg, Vegetarian capsule',
                howToUse: 'Take 1 capsule twice daily with water after meals.',
                price: 549,
                stock: 90,
                categoryId: supplementCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500'],
                isActive: true,
            },
        });
        products.push(p12);
        console.log('✅ Product:', p12.name);

        const p13 = await prisma.product.upsert({
            where: { slug: 'giloy-tablets' },
            update: {},
            create: {
                name: 'Giloy Tablets - Immunity Booster',
                slug: 'giloy-tablets',
                sku: 'HS-005',
                description: 'Guduchi extract tablets. Powerful immunomodulator, reduces fever, and fights infections.',
                ingredients: 'Giloy extract 500mg, Excipients',
                howToUse: 'Take 1-2 tablets twice daily with water.',
                price: 399,
                stock: 180,
                categoryId: immunityCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500'],
                isActive: true,
            },
        });
        products.push(p13);
        console.log('✅ Product:', p13.name);

        const p14 = await prisma.product.upsert({
            where: { slug: 'tulsi-drops' },
            update: {},
            create: {
                name: 'Tulsi Drops - Holy Basil Extract',
                slug: 'tulsi-drops',
                sku: 'HS-006',
                description: 'Concentrated Tulsi extract. Boosts immunity, relieves cough and cold, and purifies blood.',
                ingredients: 'Tulsi extract, Purified water, Natural preservatives',
                howToUse: 'Add 10-15 drops in water or tea. Take 2-3 times daily.',
                price: 249,
                stock: 120,
                categoryId: immunityCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500'],
                isActive: true,
            },
        });
        products.push(p14);
        console.log('✅ Product:', p14.name);

        const p15 = await prisma.product.upsert({
            where: { slug: 'chyawanprash' },
            update: {},
            create: {
                name: 'Chyawanprash - Complete Wellness',
                slug: 'chyawanprash',
                sku: 'HS-007',
                description: 'Traditional Ayurvedic jam with 40+ herbs. Boosts immunity, energy, and vitality.',
                ingredients: 'Amla, Ashwagandha, Giloy, Shatavari, Honey, Ghee, 35+ herbs',
                howToUse: 'Take 1-2 teaspoons daily with milk or water. Best in morning.',
                price: 699,
                comparePrice: 899,
                stock: 75,
                categoryId: immunityCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500'],
                isActive: true,
                isFeatured: true,
            },
        });
        products.push(p15);
        console.log('✅ Product:', p15.name);

        const p16 = await prisma.product.upsert({
            where: { slug: 'arjuna-capsules' },
            update: {},
            create: {
                name: 'Arjuna Capsules - Heart Health',
                slug: 'arjuna-capsules',
                sku: 'HS-008',
                description: 'Arjuna bark extract for cardiovascular health. Supports heart function and healthy cholesterol.',
                ingredients: 'Arjuna bark extract 500mg, Vegetarian capsule',
                howToUse: 'Take 1 capsule twice daily with water after meals.',
                price: 649,
                stock: 65,
                categoryId: supplementCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500'],
                isActive: true,
            },
        });
        products.push(p16);
        console.log('✅ Product:', p16.name);

        // SKINCARE & BEAUTY (6 products)
        const p17 = await prisma.product.upsert({
            where: { slug: 'ubtan-face-pack' },
            update: {},
            create: {
                name: 'Ubtan Face Pack - Natural Glow',
                slug: 'ubtan-face-pack',
                sku: 'SB-001',
                description: 'Traditional bridal ubtan for radiant skin. Removes tan, brightens complexion, and deep cleanses.',
                ingredients: 'Gram flour, Turmeric, Sandalwood, Orange peel, Rose petals, Neem',
                howToUse: 'Mix 2 tablespoons with milk/yogurt. Apply on face. Leave for 15-20 minutes.',
                price: 349,
                stock: 95,
                categoryId: skincareCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500'],
                isActive: true,
                isFeatured: true,
            },
        });
        products.push(p17);
        console.log('✅ Product:', p17.name);

        const p18 = await prisma.product.upsert({
            where: { slug: 'neem-face-wash' },
            update: {},
            create: {
                name: 'Neem Face Wash - Acne Control',
                slug: 'neem-face-wash',
                sku: 'SB-002',
                description: 'Gentle face wash with neem and tulsi. Controls acne, removes excess oil, and purifies skin.',
                ingredients: 'Neem extract, Tulsi, Aloe vera, Tea tree oil, Glycerin',
                howToUse: 'Wet face. Apply small amount. Massage gently. Rinse thoroughly.',
                price: 299,
                stock: 140,
                categoryId: skincareCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500'],
                isActive: true,
            },
        });
        products.push(p18);
        console.log('✅ Product:', p18.name);

        const p19 = await prisma.product.upsert({
            where: { slug: 'rose-water-toner' },
            update: {},
            create: {
                name: 'Rose Water Toner - Natural Hydration',
                slug: 'rose-water-toner',
                sku: 'SB-003',
                description: 'Pure rose water from Kannauj roses. Hydrates, tones, and refreshes skin. Balances pH.',
                ingredients: 'Pure rose water, No added chemicals',
                howToUse: 'Spray on face after cleansing. Can be used throughout the day.',
                price: 199,
                stock: 160,
                categoryId: skincareCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500'],
                isActive: true,
            },
        });
        products.push(p19);
        console.log('✅ Product:', p19.name);

        const p20 = await prisma.product.upsert({
            where: { slug: 'aloe-vera-gel' },
            update: {},
            create: {
                name: 'Aloe Vera Gel - Multi-Purpose',
                slug: 'aloe-vera-gel',
                sku: 'SB-004',
                description: '99% pure aloe vera gel. Soothes sunburn, moisturizes skin, and heals minor cuts.',
                ingredients: 'Aloe barbadensis leaf extract 99%, Natural preservatives',
                howToUse: 'Apply on clean skin. Use as moisturizer, after-sun care, or hair mask.',
                price: 249,
                stock: 180,
                categoryId: skincareCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500'],
                isActive: true,
            },
        });
        products.push(p20);
        console.log('✅ Product:', p20.name);

        const p21 = await prisma.product.upsert({
            where: { slug: 'saffron-face-cream' },
            update: {},
            create: {
                name: 'Saffron Face Cream - Anti-Aging',
                slug: 'saffron-face-cream',
                sku: 'SB-005',
                description: 'Luxurious face cream with saffron and gold. Reduces fine lines and firms skin.',
                ingredients: 'Saffron, Gold bhasma, Almond oil, Shea butter, Vitamin E',
                howToUse: 'Apply on clean face at night. Massage gently until absorbed.',
                price: 899,
                comparePrice: 1199,
                stock: 45,
                categoryId: skincareCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500'],
                isActive: true,
                isFeatured: true,
            },
        });
        products.push(p21);
        console.log('✅ Product:', p21.name);

        const p22 = await prisma.product.upsert({
            where: { slug: 'charcoal-face-scrub' },
            update: {},
            create: {
                name: 'Charcoal Face Scrub - Deep Cleanse',
                slug: 'charcoal-face-scrub',
                sku: 'SB-006',
                description: 'Activated charcoal scrub with walnut. Removes blackheads, unclogs pores, and exfoliates.',
                ingredients: 'Activated charcoal, Walnut shell powder, Neem, Tea tree oil',
                howToUse: 'Apply on damp face. Massage in circular motions for 2-3 minutes.',
                price: 399,
                stock: 110,
                categoryId: skincareCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500'],
                isActive: true,
            },
        });
        products.push(p22);
        console.log('✅ Product:', p22.name);

        // DIGESTIVE HEALTH (4 products)
        const p23 = await prisma.product.upsert({
            where: { slug: 'hingvastak-churna' },
            update: {},
            create: {
                name: 'Hingvastak Churna - Digestive Aid',
                slug: 'hingvastak-churna',
                sku: 'DH-001',
                description: 'Classical formula for gas, bloating, and indigestion. Improves appetite and digestion.',
                ingredients: 'Hing, Cumin, Black pepper, Ginger, Rock salt, Ajwain',
                howToUse: 'Take 1/2 teaspoon with warm water after meals.',
                price: 249,
                stock: 85,
                categoryId: digestiveCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=500'],
                isActive: true,
            },
        });
        products.push(p23);
        console.log('✅ Product:', p23.name);

        const p24 = await prisma.product.upsert({
            where: { slug: 'avipattikar-churna' },
            update: {},
            create: {
                name: 'Avipattikar Churna - Acidity Relief',
                slug: 'avipattikar-churna',
                sku: 'DH-002',
                description: 'Traditional formula for acidity, heartburn, and gastritis. Cools Pitta dosha.',
                ingredients: 'Amla, Haritaki, Cardamom, Clove, Black pepper, Sugar candy',
                howToUse: 'Mix 1 teaspoon in water. Take before meals or as needed.',
                price: 299,
                stock: 70,
                categoryId: digestiveCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=500'],
                isActive: true,
            },
        });
        products.push(p24);
        console.log('✅ Product:', p24.name);

        const p25 = await prisma.product.upsert({
            where: { slug: 'isabgol-husk' },
            update: {},
            create: {
                name: 'Isabgol Husk - Fiber Supplement',
                slug: 'isabgol-husk',
                sku: 'DH-003',
                description: 'Pure psyllium husk for constipation relief and digestive health. Natural fiber source.',
                ingredients: 'Psyllium husk 100%',
                howToUse: 'Mix 1-2 teaspoons in water or milk. Drink immediately before it thickens.',
                price: 199,
                stock: 150,
                categoryId: digestiveCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=500'],
                isActive: true,
            },
        });
        products.push(p25);
        console.log('✅ Product:', p25.name);

        const p26 = await prisma.product.upsert({
            where: { slug: 'digestive-tea' },
            update: {},
            create: {
                name: 'Digestive Tea - Herbal Blend',
                slug: 'digestive-tea',
                sku: 'DH-004',
                description: 'Soothing herbal tea for digestion. Contains ginger, fennel, and peppermint.',
                ingredients: 'Ginger, Fennel, Peppermint, Coriander, Cardamom',
                howToUse: 'Steep 1 tea bag in hot water for 5 minutes. Drink after meals.',
                price: 349,
                stock: 95,
                categoryId: digestiveCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=500'],
                isActive: true,
            },
        });
        products.push(p26);
        console.log('✅ Product:', p26.name);

        // HAIR CARE (4 products)
        const p27 = await prisma.product.upsert({
            where: { slug: 'amla-powder' },
            update: {},
            create: {
                name: 'Amla Powder - Hair Nourishment',
                slug: 'amla-powder',
                sku: 'HC-001',
                description: 'Pure Indian gooseberry powder. Rich in Vitamin C. Strengthens hair and prevents graying.',
                ingredients: 'Amla fruit powder 100%',
                howToUse: 'Mix with water to make paste. Apply on hair for 30 minutes. Rinse well.',
                price: 199,
                stock: 130,
                categoryId: haircareCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500'],
                isActive: true,
            },
        });
        products.push(p27);
        console.log('✅ Product:', p27.name);

        const p28 = await prisma.product.upsert({
            where: { slug: 'reetha-shikakai-shampoo' },
            update: {},
            create: {
                name: 'Reetha Shikakai Shampoo - Natural Cleanser',
                slug: 'reetha-shikakai-shampoo',
                sku: 'HC-002',
                description: 'Chemical-free shampoo with soapnut and shikakai. Gentle cleansing for all hair types.',
                ingredients: 'Reetha, Shikakai, Amla, Aloe vera, Essential oils',
                howToUse: 'Apply on wet hair. Massage gently. Rinse thoroughly. No need for conditioner.',
                price: 399,
                stock: 105,
                categoryId: haircareCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500'],
                isActive: true,
            },
        });
        products.push(p28);
        console.log('✅ Product:', p28.name);

        const p29 = await prisma.product.upsert({
            where: { slug: 'hibiscus-hair-mask' },
            update: {},
            create: {
                name: 'Hibiscus Hair Mask - Deep Conditioning',
                slug: 'hibiscus-hair-mask',
                sku: 'HC-003',
                description: 'Intensive hair mask with hibiscus and fenugreek. Repairs damaged hair and adds shine.',
                ingredients: 'Hibiscus, Fenugreek, Coconut milk, Aloe vera, Argan oil',
                howToUse: 'Apply on damp hair. Leave for 20-30 minutes. Rinse with mild shampoo.',
                price: 449,
                stock: 75,
                categoryId: haircareCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500'],
                isActive: true,
            },
        });
        products.push(p29);
        console.log('✅ Product:', p29.name);

        const p30 = await prisma.product.upsert({
            where: { slug: 'onion-hair-serum' },
            update: {},
            create: {
                name: 'Onion Hair Serum - Hair Growth',
                slug: 'onion-hair-serum',
                sku: 'HC-004',
                description: 'Onion extract serum for hair growth and thickness. Reduces hair fall and promotes regrowth.',
                ingredients: 'Onion extract, Biotin, Keratin, Argan oil, Vitamin E',
                howToUse: 'Apply few drops on scalp. Massage gently. Leave overnight or for 2 hours.',
                price: 599,
                stock: 88,
                categoryId: haircareCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500'],
                isActive: true,
            },
        });
        products.push(p30);
        console.log('✅ Product:', p30.name);

        console.log(`\n✅ Created ${products.length} products!`);

        // ============================================
        // 4. THERAPIES (15 total)
        // ============================================
        console.log('\n💆 Creating 15 authentic Ayurvedic therapies...');
        const therapies = [];

        // Panchakarma Treatments (5)
        const t1 = await prisma.therapy.upsert({
            where: { slug: 'abhyanga' },
            update: {},
            create: {
                name: 'Abhyanga - Full Body Massage',
                slug: 'abhyanga',
                description: 'Traditional Ayurvedic oil massage using warm herbal oils. Improves circulation, removes toxins, and deeply relaxes muscles.',
                durationMinutes: 60,
                basePrice: 2500,
                categoryId: panchakarmaCategory.id,
                imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500',
                isActive: true,
                isFeatured: true,
            },
        });
        therapies.push(t1);
        console.log('✅ Therapy:', t1.name);

        const t2 = await prisma.therapy.upsert({
            where: { slug: 'shirodhara' },
            update: {},
            create: {
                name: 'Shirodhara - Third Eye Therapy',
                slug: 'shirodhara',
                description: 'Continuous stream of warm oil poured on forehead. Calms nervous system, reduces stress, and improves sleep.',
                durationMinutes: 45,
                basePrice: 3500,
                discountedPrice: 3200,
                categoryId: panchakarmaCategory.id,
                imageUrl: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=500',
                isActive: true,
                isFeatured: true,
            },
        });
        therapies.push(t2);
        console.log('✅ Therapy:', t2.name);

        const t3 = await prisma.therapy.upsert({
            where: { slug: 'nasya' },
            update: {},
            create: {
                name: 'Nasya - Nasal Therapy',
                slug: 'nasya',
                description: 'Medicated oil administration through nasal passages. Clears sinuses, relieves headaches, and improves breathing.',
                durationMinutes: 30,
                basePrice: 1500,
                categoryId: panchakarmaCategory.id,
                imageUrl: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=500',
                isActive: true,
            },
        });
        therapies.push(t3);
        console.log('✅ Therapy:', t3.name);

        const t4 = await prisma.therapy.upsert({
            where: { slug: 'basti' },
            update: {},
            create: {
                name: 'Basti - Medicated Enema',
                slug: 'basti',
                description: 'Herbal decoction enema for deep detoxification. Cleanses colon, balances Vata dosha, and treats digestive disorders.',
                durationMinutes: 45,
                basePrice: 2000,
                categoryId: panchakarmaCategory.id,
                imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500',
                isActive: true,
            },
        });
        therapies.push(t4);
        console.log('✅ Therapy:', t4.name);

        const t5 = await prisma.therapy.upsert({
            where: { slug: 'virechana' },
            update: {},
            create: {
                name: 'Virechana - Therapeutic Purgation',
                slug: 'virechana',
                description: 'Controlled purgation therapy for Pitta disorders. Removes toxins from liver and gallbladder.',
                durationMinutes: 480,
                basePrice: 5000,
                categoryId: panchakarmaCategory.id,
                imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500',
                isActive: true,
            },
        });
        therapies.push(t5);
        console.log('✅ Therapy:', t5.name);

        // Massage Therapies (4)
        const t6 = await prisma.therapy.upsert({
            where: { slug: 'kati-basti' },
            update: {},
            create: {
                name: 'Kati Basti - Lower Back Therapy',
                slug: 'kati-basti',
                description: 'Warm oil pooling on lower back. Relieves back pain, sciatica, and disc problems.',
                durationMinutes: 45,
                basePrice: 2200,
                categoryId: massageCategory.id,
                imageUrl: 'https://images.unsplash.com/photo-1591343395902-bce56b6e3e0a?w=500',
                isActive: true,
                isFeatured: true,
            },
        });
        therapies.push(t6);
        console.log('✅ Therapy:', t6.name);

        const t7 = await prisma.therapy.upsert({
            where: { slug: 'janu-basti' },
            update: {},
            create: {
                name: 'Janu Basti - Knee Therapy',
                slug: 'janu-basti',
                description: 'Warm oil treatment for knee joints. Reduces pain, stiffness, and inflammation. Effective for arthritis.',
                durationMinutes: 40,
                basePrice: 2000,
                categoryId: massageCategory.id,
                imageUrl: 'https://images.unsplash.com/photo-1591343395902-bce56b6e3e0a?w=500',
                isActive: true,
            },
        });
        therapies.push(t7);
        console.log('✅ Therapy:', t7.name);

        const t8 = await prisma.therapy.upsert({
            where: { slug: 'greeva-basti' },
            update: {},
            create: {
                name: 'Greeva Basti - Neck & Shoulder',
                slug: 'greeva-basti',
                description: 'Oil pooling on neck and shoulders. Relieves cervical spondylosis and frozen shoulder. Perfect for desk workers.',
                durationMinutes: 40,
                basePrice: 2000,
                categoryId: massageCategory.id,
                imageUrl: 'https://images.unsplash.com/photo-1591343395902-bce56b6e3e0a?w=500',
                isActive: true,
            },
        });
        therapies.push(t8);
        console.log('✅ Therapy:', t8.name);

        const t9 = await prisma.therapy.upsert({
            where: { slug: 'pada-abhyanga' },
            update: {},
            create: {
                name: 'Pada Abhyanga - Foot Massage',
                slug: 'pada-abhyanga',
                description: 'Therapeutic foot massage with herbal oils. Improves sleep, reduces stress, and activates marma points.',
                durationMinutes: 30,
                basePrice: 1200,
                categoryId: massageCategory.id,
                imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=500',
                isActive: true,
            },
        });
        therapies.push(t9);
        console.log('✅ Therapy:', t9.name);

        // Detoxification (2)
        const t10 = await prisma.therapy.upsert({
            where: { slug: 'udvartana' },
            update: {},
            create: {
                name: 'Udvartana - Herbal Powder Massage',
                slug: 'udvartana',
                description: 'Dry powder massage for weight loss and cellulite reduction. Exfoliates skin and improves circulation.',
                durationMinutes: 60,
                basePrice: 2800,
                categoryId: detoxCategory.id,
                imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500',
                isActive: true,
            },
        });
        therapies.push(t10);
        console.log('✅ Therapy:', t10.name);

        const t11 = await prisma.therapy.upsert({
            where: { slug: 'swedana' },
            update: {},
            create: {
                name: 'Swedana - Herbal Steam Therapy',
                slug: 'swedana',
                description: 'Medicated steam bath with Ayurvedic herbs. Opens pores, removes toxins, and prepares body for treatments.',
                durationMinutes: 20,
                basePrice: 800,
                categoryId: detoxCategory.id,
                imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500',
                isActive: true,
            },
        });
        therapies.push(t11);
        console.log('✅ Therapy:', t11.name);

        // Stress Relief (2)
        const t12 = await prisma.therapy.upsert({
            where: { slug: 'shiro-abhyanga' },
            update: {},
            create: {
                name: 'Shiro Abhyanga - Head Massage',
                slug: 'shiro-abhyanga',
                description: 'Relaxing head, neck, and shoulder massage. Relieves headaches, improves hair health, and induces relaxation.',
                durationMinutes: 30,
                basePrice: 1500,
                categoryId: stressCategory.id,
                imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=500',
                isActive: true,
            },
        });
        therapies.push(t12);
        console.log('✅ Therapy:', t12.name);

        const t13 = await prisma.therapy.upsert({
            where: { slug: 'mukha-lepam' },
            update: {},
            create: {
                name: 'Mukha Lepam - Ayurvedic Facial',
                slug: 'mukha-lepam',
                description: 'Traditional facial with herbal pastes. Cleanses, nourishes, and rejuvenates skin. Includes face massage and steam.',
                durationMinutes: 60,
                basePrice: 2500,
                categoryId: beautyCategory.id,
                imageUrl: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=500',
                isActive: true,
                isFeatured: true,
            },
        });
        therapies.push(t13);
        console.log('✅ Therapy:', t13.name);

        // Pain Management (1)
        const t14 = await prisma.therapy.upsert({
            where: { slug: 'pinda-sweda' },
            update: {},
            create: {
                name: 'Pinda Sweda - Bolus Massage',
                slug: 'pinda-sweda',
                description: 'Massage with warm herbal boluses. Relieves joint pain, muscle stiffness, and arthritis.',
                durationMinutes: 60,
                basePrice: 3000,
                categoryId: painCategory.id,
                imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
                isActive: true,
            },
        });
        therapies.push(t14);
        console.log('✅ Therapy:', t14.name);

        // Beauty & Rejuvenation (1)
        const t15 = await prisma.therapy.upsert({
            where: { slug: 'mukha-abhyanga' },
            update: {},
            create: {
                name: 'Mukha Abhyanga - Face Rejuvenation',
                slug: 'mukha-abhyanga',
                description: 'Specialized face and neck massage. Improves skin tone, reduces wrinkles, and provides natural glow.',
                durationMinutes: 45,
                basePrice: 2000,
                categoryId: beautyCategory.id,
                imageUrl: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=500',
                isActive: true,
            },
        });
        therapies.push(t15);
        console.log('✅ Therapy:', t15.name);

        console.log(`\n✅ Created ${therapies.length} therapies!`);

        // ============================================
        // 5. PACKAGES (6 wellness packages)
        // ============================================
        console.log('\n📦 Creating 6 wellness packages...');

        const pkg1 = await prisma.package.upsert({
            where: { slug: 'stress-relief-package' },
            update: {},
            create: {
                name: 'Stress Relief Package',
                slug: 'stress-relief-package',
                description: 'Complete stress management program. Calms mind, relaxes body, and improves sleep quality. 3 sessions over 1 week.',
                totalPrice: 6000,
                originalPrice: 7500,
                validFrom: new Date('2026-01-01'),
                validTo: new Date('2026-12-31'),
                isActive: true,
            },
        });
        await prisma.packageTherapy.upsert({
            where: { packageId_therapyId: { packageId: pkg1.id, therapyId: t2.id } },
            update: {},
            create: { packageId: pkg1.id, therapyId: t2.id },
        });
        await prisma.packageTherapy.upsert({
            where: { packageId_therapyId: { packageId: pkg1.id, therapyId: t1.id } },
            update: {},
            create: { packageId: pkg1.id, therapyId: t1.id },
        });
        await prisma.packageTherapy.upsert({
            where: { packageId_therapyId: { packageId: pkg1.id, therapyId: t12.id } },
            update: {},
            create: { packageId: pkg1.id, therapyId: t12.id },
        });
        console.log('✅ Package:', pkg1.name);

        const pkg2 = await prisma.package.upsert({
            where: { slug: 'pain-management-package' },
            update: {},
            create: {
                name: 'Pain Management Package',
                slug: 'pain-management-package',
                description: 'Comprehensive pain relief program for chronic pain, arthritis, and joint problems. 5 sessions over 2 weeks.',
                totalPrice: 8500,
                originalPrice: 11200,
                validFrom: new Date('2026-01-01'),
                validTo: new Date('2026-12-31'),
                isActive: true,
            },
        });
        await prisma.packageTherapy.upsert({
            where: { packageId_therapyId: { packageId: pkg2.id, therapyId: t6.id } },
            update: {},
            create: { packageId: pkg2.id, therapyId: t6.id },
        });
        await prisma.packageTherapy.upsert({
            where: { packageId_therapyId: { packageId: pkg2.id, therapyId: t7.id } },
            update: {},
            create: { packageId: pkg2.id, therapyId: t7.id },
        });
        await prisma.packageTherapy.upsert({
            where: { packageId_therapyId: { packageId: pkg2.id, therapyId: t14.id } },
            update: {},
            create: { packageId: pkg2.id, therapyId: t14.id },
        });
        await prisma.packageTherapy.upsert({
            where: { packageId_therapyId: { packageId: pkg2.id, therapyId: t1.id } },
            update: {},
            create: { packageId: pkg2.id, therapyId: t1.id },
        });
        console.log('✅ Package:', pkg2.name);

        const pkg3 = await prisma.package.upsert({
            where: { slug: 'detox-weight-loss-package' },
            update: {},
            create: {
                name: 'Detox & Weight Loss Package',
                slug: 'detox-weight-loss-package',
                description: 'Complete detoxification and weight management program. Includes diet consultation. 7 sessions over 3 weeks.',
                totalPrice: 12000,
                originalPrice: 15600,
                validFrom: new Date('2026-01-01'),
                validTo: new Date('2026-12-31'),
                isActive: true,
            },
        });
        await prisma.packageTherapy.upsert({
            where: { packageId_therapyId: { packageId: pkg3.id, therapyId: t10.id } },
            update: {},
            create: { packageId: pkg3.id, therapyId: t10.id },
        });
        await prisma.packageTherapy.upsert({
            where: { packageId_therapyId: { packageId: pkg3.id, therapyId: t11.id } },
            update: {},
            create: { packageId: pkg3.id, therapyId: t11.id },
        });
        await prisma.packageTherapy.upsert({
            where: { packageId_therapyId: { packageId: pkg3.id, therapyId: t1.id } },
            update: {},
            create: { packageId: pkg3.id, therapyId: t1.id },
        });
        await prisma.packageTherapy.upsert({
            where: { packageId_therapyId: { packageId: pkg3.id, therapyId: t5.id } },
            update: {},
            create: { packageId: pkg3.id, therapyId: t5.id },
        });
        console.log('✅ Package:', pkg3.name);

        const pkg4 = await prisma.package.upsert({
            where: { slug: 'beauty-glow-package' },
            update: {},
            create: {
                name: 'Beauty & Glow Package',
                slug: 'beauty-glow-package',
                description: 'Bridal/special occasion package. Radiant skin, natural glow, and complete rejuvenation. 4 sessions over 2 weeks.',
                totalPrice: 8000,
                originalPrice: 10500,
                validFrom: new Date('2026-01-01'),
                validTo: new Date('2026-12-31'),
                isActive: true,
            },
        });
        await prisma.packageTherapy.upsert({
            where: { packageId_therapyId: { packageId: pkg4.id, therapyId: t13.id } },
            update: {},
            create: { packageId: pkg4.id, therapyId: t13.id },
        });
        await prisma.packageTherapy.upsert({
            where: { packageId_therapyId: { packageId: pkg4.id, therapyId: t15.id } },
            update: {},
            create: { packageId: pkg4.id, therapyId: t15.id },
        });
        await prisma.packageTherapy.upsert({
            where: { packageId_therapyId: { packageId: pkg4.id, therapyId: t1.id } },
            update: {},
            create: { packageId: pkg4.id, therapyId: t1.id },
        });
        await prisma.packageTherapy.upsert({
            where: { packageId_therapyId: { packageId: pkg4.id, therapyId: t2.id } },
            update: {},
            create: { packageId: pkg4.id, therapyId: t2.id },
        });
        console.log('✅ Package:', pkg4.name);

        const pkg5 = await prisma.package.upsert({
            where: { slug: 'immunity-booster-package' },
            update: {},
            create: {
                name: 'Immunity Booster Package',
                slug: 'immunity-booster-package',
                description: 'Strengthen immune system, prevent diseases, and improve overall health. 6 sessions over 3 weeks.',
                totalPrice: 7500,
                originalPrice: 9800,
                validFrom: new Date('2026-01-01'),
                validTo: new Date('2026-12-31'),
                isActive: true,
            },
        });
        await prisma.packageTherapy.upsert({
            where: { packageId_therapyId: { packageId: pkg5.id, therapyId: t3.id } },
            update: {},
            create: { packageId: pkg5.id, therapyId: t3.id },
        });
        await prisma.packageTherapy.upsert({
            where: { packageId_therapyId: { packageId: pkg5.id, therapyId: t1.id } },
            update: {},
            create: { packageId: pkg5.id, therapyId: t1.id },
        });
        await prisma.packageTherapy.upsert({
            where: { packageId_therapyId: { packageId: pkg5.id, therapyId: t11.id } },
            update: {},
            create: { packageId: pkg5.id, therapyId: t11.id },
        });
        await prisma.packageTherapy.upsert({
            where: { packageId_therapyId: { packageId: pkg5.id, therapyId: t4.id } },
            update: {},
            create: { packageId: pkg5.id, therapyId: t4.id },
        });
        console.log('✅ Package:', pkg5.name);

        const pkg6 = await prisma.package.upsert({
            where: { slug: 'complete-wellness-package' },
            update: {},
            create: {
                name: 'Complete Wellness Package',
                slug: 'complete-wellness-package',
                description: 'Ultimate Ayurvedic wellness experience. Complete body-mind rejuvenation. 10 sessions over 1 month.',
                totalPrice: 18000,
                originalPrice: 25000,
                validFrom: new Date('2026-01-01'),
                validTo: new Date('2026-12-31'),
                couponCode: 'WELLNESS2026',
                isActive: true,
            },
        });
        await prisma.packageTherapy.upsert({
            where: { packageId_therapyId: { packageId: pkg6.id, therapyId: t1.id } },
            update: {},
            create: { packageId: pkg6.id, therapyId: t1.id },
        });
        await prisma.packageTherapy.upsert({
            where: { packageId_therapyId: { packageId: pkg6.id, therapyId: t2.id } },
            update: {},
            create: { packageId: pkg6.id, therapyId: t2.id },
        });
        await prisma.packageTherapy.upsert({
            where: { packageId_therapyId: { packageId: pkg6.id, therapyId: t3.id } },
            update: {},
            create: { packageId: pkg6.id, therapyId: t3.id },
        });
        await prisma.packageTherapy.upsert({
            where: { packageId_therapyId: { packageId: pkg6.id, therapyId: t4.id } },
            update: {},
            create: { packageId: pkg6.id, therapyId: t4.id },
        });
        await prisma.packageTherapy.upsert({
            where: { packageId_therapyId: { packageId: pkg6.id, therapyId: t5.id } },
            update: {},
            create: { packageId: pkg6.id, therapyId: t5.id },
        });
        console.log('✅ Package:', pkg6.name);

        console.log('\n✅ Created 6 packages!');

        // ============================================
        // 6. GALLERY ITEMS (20 images)
        // ============================================
        console.log('\n🖼️  Creating 20 gallery items...');
        
        const galleryItems = [
            { type: 'PHOTO', url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800', category: 'Therapies', caption: 'Abhyanga massage therapy session', sortOrder: 1 },
            { type: 'PHOTO', url: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800', category: 'Clinic', caption: 'Our peaceful treatment room', sortOrder: 2 },
            { type: 'PHOTO', url: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800', category: 'Therapies', caption: 'Shirodhara therapy in progress', sortOrder: 3 },
            { type: 'PHOTO', url: 'https://images.unsplash.com/photo-1591343395902-bce56b6e3e0a?w=800', category: 'Therapies', caption: 'Kati Basti treatment', sortOrder: 4 },
            { type: 'PHOTO', url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800', category: 'Products', caption: 'Ayurvedic oils display', sortOrder: 5 },
            { type: 'PHOTO', url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800', category: 'Products', caption: 'Herbal supplements shelf', sortOrder: 6 },
            { type: 'PHOTO', url: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800', category: 'Products', caption: 'Skincare products', sortOrder: 7 },
            { type: 'PHOTO', url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800', category: 'Therapies', caption: 'Herbal steam bath', sortOrder: 8 },
            { type: 'PHOTO', url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800', category: 'Clinic', caption: 'Meditation corner', sortOrder: 9 },
            { type: 'PHOTO', url: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800', category: 'Therapies', caption: 'Face massage therapy', sortOrder: 10 },
            { type: 'PHOTO', url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800', category: 'Therapies', caption: 'Herbal bolus massage', sortOrder: 11 },
            { type: 'PHOTO', url: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800', category: 'Products', caption: 'Fresh herbs and ingredients', sortOrder: 12 },
            { type: 'PHOTO', url: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800', category: 'Clinic', caption: 'Herbal pharmacy', sortOrder: 13 },
            { type: 'PHOTO', url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800', category: 'Clinic', caption: 'Consultation room', sortOrder: 14 },
            { type: 'PHOTO', url: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800', category: 'Therapies', caption: 'Foot massage session', sortOrder: 15 },
            { type: 'PHOTO', url: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=800', category: 'Therapies', caption: 'Nasya therapy', sortOrder: 16 },
            { type: 'PHOTO', url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800', category: 'Clinic', caption: 'Waiting area with plants', sortOrder: 17 },
            { type: 'PHOTO', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800', category: 'Clinic', caption: 'Herbal garden', sortOrder: 18 },
            { type: 'PHOTO', url: 'https://images.unsplash.com/photo-1550572017-4e6c5b0c3b3c?w=800', category: 'Clinic', caption: 'Yoga space', sortOrder: 19 },
            { type: 'PHOTO', url: 'https://images.unsplash.com/photo-1505944357793-3b0f9e1b7a2e?w=800', category: 'Clinic', caption: 'Reception area', sortOrder: 20 },
        ];

        for (const item of galleryItems) {
            await prisma.galleryItem.create({
                data: {
                    type: item.type,
                    url: item.url,
                    thumbnailUrl: item.url.replace('?w=800', '?w=300'),
                    category: item.category,
                    caption: item.caption,
                    sortOrder: item.sortOrder,
                    isActive: true,
                },
            });
        }
        console.log('✅ Created 20 gallery items!');

        // ============================================
        // 7. REVIEWS (25 customer reviews)
        // ============================================
        console.log('\n⭐ Creating 25 customer reviews...');
        
        const reviews = [
            // 5-star reviews (15)
            { productId: p1.id, name: 'Priya Sharma', rating: 5, comment: 'Amazing product! My skin is glowing after just 2 weeks. Dark spots have reduced significantly.', status: 'APPROVED' },
            { productId: p2.id, name: 'Rajesh Kumar', rating: 5, comment: 'My hair fall has reduced by 80%! New hair growth visible. Highly recommend.', status: 'APPROVED' },
            { productId: p9.id, name: 'Anita Desai', rating: 5, comment: 'My energy levels have improved dramatically. No more afternoon crashes.', status: 'APPROVED' },
            { productId: p10.id, name: 'Karan Malhotra', rating: 5, comment: 'Best thing for digestion. Regular bowel movements and no bloating.', status: 'APPROVED' },
            { productId: p15.id, name: 'Neha Kapoor', rating: 5, comment: 'Whole family takes it daily. Haven\'t had a cold in months!', status: 'APPROVED' },
            { productId: p17.id, name: 'Deepa Iyer', rating: 5, comment: 'Got this before my wedding. Everyone complimented my glowing skin!', status: 'APPROVED' },
            { productId: p21.id, name: 'Sunita Reddy', rating: 5, comment: 'Luxurious cream! My fine lines are less visible. Worth every penny.', status: 'APPROVED' },
            { productId: p3.id, name: 'Rohit Joshi', rating: 5, comment: 'My back pain relief is incredible. Use it daily after gym.', status: 'APPROVED' },
            { productId: p4.id, name: 'Meera Patel', rating: 5, comment: 'My tan has reduced so much! Skin tone is more even now.', status: 'APPROVED' },
            { productId: p11.id, name: 'Kavita Nair', rating: 5, comment: 'Helped with my hormonal issues. Feeling much better overall.', status: 'APPROVED' },
            { productId: p13.id, name: 'Amit Verma', rating: 5, comment: 'Great immunity booster. Haven\'t fallen sick since I started taking it.', status: 'APPROVED' },
            { productId: p18.id, name: 'Pooja Agarwal', rating: 5, comment: 'Controls my acne so well. Skin feels clean and fresh.', status: 'APPROVED' },
            { productId: p20.id, name: 'Sanjay Gupta', rating: 5, comment: 'Multi-purpose gel! Use it for everything - face, body, hair. Love it!', status: 'APPROVED' },
            { productId: p27.id, name: 'Ritu Singh', rating: 5, comment: 'Pure amla powder. My hair is stronger and shinier.', status: 'APPROVED' },
            { productId: p30.id, name: 'Vikram Singh', rating: 5, comment: 'Onion serum works! New hair growth in bald patches.', status: 'APPROVED' },
            
            // 4-star reviews (8)
            { productId: p12.id, name: 'Suresh Reddy', rating: 4, comment: 'Noticing improvement in focus. Need to take for longer to see full benefits.', status: 'APPROVED' },
            { productId: p14.id, name: 'Lakshmi Menon', rating: 4, comment: 'Good for immunity. Takes time to show results but works.', status: 'APPROVED' },
            { productId: p19.id, name: 'Anjali Sharma', rating: 4, comment: 'Refreshing rose water. Wish the bottle was bigger for the price.', status: 'APPROVED' },
            { productId: p23.id, name: 'Manish Jain', rating: 4, comment: 'Helps with digestion. Taste is strong but effective.', status: 'APPROVED' },
            { productId: p24.id, name: 'Ramesh Pillai', rating: 4, comment: 'Good for acidity. Works well when taken regularly.', status: 'APPROVED' },
            { productId: p26.id, name: 'Sneha Patel', rating: 4, comment: 'Nice herbal tea. Helps after heavy meals.', status: 'APPROVED' },
            { productId: p28.id, name: 'Arun Kumar', rating: 4, comment: 'Natural shampoo. Hair feels clean but takes time to adjust.', status: 'APPROVED' },
            { productId: p29.id, name: 'Radha Krishnan', rating: 4, comment: 'Good hair mask. Makes hair soft and manageable.', status: 'APPROVED' },
            
            // 3-star reviews (2)
            { productId: p16.id, name: 'Vijay Mehta', rating: 3, comment: 'Okay product. Not sure if I see major difference yet.', status: 'APPROVED' },
            { productId: p25.id, name: 'Geeta Rao', rating: 3, comment: 'Works for constipation but taste is not great.', status: 'APPROVED' },
        ];

        for (const review of reviews) {
            await prisma.review.create({
                data: {
                    productId: review.productId,
                    patientName: review.name,
                    rating: review.rating,
                    comment: review.comment,
                    status: review.status,
                },
            });
        }
        console.log('✅ Created 25 reviews!');

        // ============================================
        // 8. BLOG POSTS (10 informative articles)
        // ============================================
        console.log('\n📝 Creating 10 blog posts...');
        
        await prisma.blogPost.create({
            data: {
                title: 'Understanding Your Dosha: A Beginner\'s Guide',
                slug: 'understanding-your-dosha',
                excerpt: 'Discover your unique mind-body constitution and learn how to balance it for optimal health.',
                content: 'Ayurveda recognizes three fundamental energies or doshas that govern our physical and mental processes: Vata, Pitta, and Kapha. Each person has a unique combination of these doshas...',
                imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
                tags: ['dosha', 'vata', 'pitta', 'kapha', 'ayurveda-basics'],
                status: 'PUBLISHED',
                authorId: admin.id,
                publishedAt: new Date('2026-02-01'),
            },
        });

        await prisma.blogPost.create({
            data: {
                title: '10 Ayurvedic Morning Rituals for Better Health',
                slug: 'ayurvedic-morning-rituals',
                excerpt: 'Transform your mornings with these simple yet powerful Ayurvedic practices.',
                content: 'Starting your day with Ayurvedic rituals can significantly improve your health and well-being. These practices, known as Dinacharya, help align your body with nature\'s rhythms...',
                imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
                tags: ['morning-routine', 'dinacharya', 'wellness', 'lifestyle'],
                status: 'PUBLISHED',
                authorId: admin.id,
                publishedAt: new Date('2026-02-05'),
            },
        });

        await prisma.blogPost.create({
            data: {
                title: 'Shirodhara: The Ancient Therapy for Modern Stress',
                slug: 'shirodhara-ancient-therapy',
                excerpt: 'Learn how this 5000-year-old therapy can help you manage stress, anxiety, and insomnia.',
                content: 'Shirodhara is one of the most divine therapies in Ayurveda. The continuous stream of warm oil on the forehead creates a profound state of relaxation...',
                imageUrl: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800',
                tags: ['shirodhara', 'stress-relief', 'therapy', 'mental-health'],
                status: 'PUBLISHED',
                authorId: admin.id,
                publishedAt: new Date('2026-02-10'),
            },
        });

        await prisma.blogPost.create({
            data: {
                title: 'Ayurvedic Diet: Eating According to Your Dosha',
                slug: 'ayurvedic-diet-guide',
                excerpt: 'Discover which foods balance your dosha and which ones to avoid for optimal digestion.',
                content: 'In Ayurveda, food is medicine. Eating according to your dosha type can prevent disease, improve digestion, and enhance overall vitality...',
                imageUrl: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800',
                tags: ['diet', 'nutrition', 'dosha', 'food'],
                status: 'PUBLISHED',
                authorId: admin.id,
                publishedAt: new Date('2026-02-15'),
            },
        });

        await prisma.blogPost.create({
            data: {
                title: 'Natural Remedies for Common Ailments',
                slug: 'natural-remedies-common-ailments',
                excerpt: 'Simple Ayurvedic home remedies for cold, cough, acidity, and other everyday health issues.',
                content: 'Ayurveda offers simple yet effective remedies using ingredients from your kitchen. These time-tested solutions work with your body\'s natural healing abilities...',
                imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800',
                tags: ['home-remedies', 'natural-healing', 'herbs'],
                status: 'PUBLISHED',
                authorId: admin.id,
                publishedAt: new Date('2026-02-18'),
            },
        });

        await prisma.blogPost.create({
            data: {
                title: 'The Science Behind Panchakarma Detoxification',
                slug: 'panchakarma-detoxification-science',
                excerpt: 'How Panchakarma removes deep-seated toxins and why it\'s more than just a cleanse.',
                content: 'Panchakarma is Ayurveda\'s signature detoxification program. Unlike modern cleanses, it works at a cellular level to remove accumulated toxins...',
                imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
                tags: ['panchakarma', 'detox', 'cleanse', 'therapy'],
                status: 'PUBLISHED',
                authorId: admin.id,
                publishedAt: new Date('2026-02-20'),
            },
        });

        await prisma.blogPost.create({
            data: {
                title: 'Ayurvedic Skincare: Secrets to Radiant Skin',
                slug: 'ayurvedic-skincare-secrets',
                excerpt: 'Ancient beauty secrets for glowing, healthy skin using natural ingredients.',
                content: 'Ayurvedic skincare is based on understanding your skin type according to doshas. This personalized approach ensures lasting beauty from within...',
                imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800',
                tags: ['skincare', 'beauty', 'natural', 'herbs'],
                status: 'PUBLISHED',
                authorId: admin.id,
                publishedAt: new Date('2026-02-22'),
            },
        });

        await prisma.blogPost.create({
            data: {
                title: 'Managing Arthritis with Ayurveda',
                slug: 'managing-arthritis-ayurveda',
                excerpt: 'Natural approaches to reduce joint pain and inflammation without side effects.',
                content: 'Ayurveda views arthritis as an imbalance of Vata dosha. Through specific therapies, herbs, and lifestyle changes, significant relief is possible...',
                imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
                tags: ['arthritis', 'pain-management', 'joint-health'],
                status: 'PUBLISHED',
                authorId: admin.id,
                publishedAt: new Date('2026-02-24'),
            },
        });

        await prisma.blogPost.create({
            data: {
                title: 'Boost Your Immunity the Ayurvedic Way',
                slug: 'boost-immunity-ayurveda',
                excerpt: 'Strengthen your body\'s natural defense system with these time-tested practices.',
                content: 'Ayurveda focuses on building strong immunity (Ojas) through proper diet, lifestyle, and herbs. This holistic approach creates lasting health...',
                imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800',
                tags: ['immunity', 'herbs', 'wellness', 'prevention'],
                status: 'PUBLISHED',
                authorId: admin.id,
                publishedAt: new Date('2026-02-26'),
            },
        });

        await prisma.blogPost.create({
            data: {
                title: 'Sleep Better with Ayurvedic Wisdom',
                slug: 'sleep-better-ayurvedic-wisdom',
                excerpt: 'Overcome insomnia and improve sleep quality using Ayurvedic principles.',
                content: 'Quality sleep is essential for health. Ayurveda offers comprehensive solutions for sleep disorders through herbs, therapies, and lifestyle adjustments...',
                imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800',
                tags: ['sleep', 'insomnia', 'wellness', 'mental-health'],
                status: 'PUBLISHED',
                authorId: admin.id,
                publishedAt: new Date('2026-02-27'),
            },
        });

        console.log('✅ Created 10 blog posts!');

        // ============================================
        // 9. SAMPLE ORDERS (5 orders)
        // ============================================
        console.log('\n🛒 Creating sample orders...');
        
        await prisma.order.create({
            data: {
                patientName: 'Amit Patel',
                phone: '+91-9876543210',
                email: 'amit.patel@example.com',
                status: 'DELIVERED',
                items: JSON.stringify([
                    { productId: p2.id, name: p2.name, quantity: 2, price: 499 }
                ]),
                totalAmount: 998,
                shippingAddress: JSON.stringify({
                    street: '123 MG Road',
                    city: 'Mumbai',
                    state: 'Maharashtra',
                    pincode: '400001'
                }),
                paymentMethod: 'razorpay',
                paymentStatus: 'PAID',
                razorpayOrderId: 'order_' + Math.random().toString(36).substr(2, 9),
            },
        });

        await prisma.order.create({
            data: {
                patientName: 'Sneha Reddy',
                phone: '+91-9876543211',
                email: 'sneha.reddy@example.com',
                status: 'SHIPPED',
                items: JSON.stringify([
                    { productId: p1.id, name: p1.name, quantity: 1, price: 1299 },
                    { productId: p17.id, name: p17.name, quantity: 1, price: 349 }
                ]),
                totalAmount: 1648,
                shippingAddress: JSON.stringify({
                    street: '456 Park Street',
                    city: 'Bangalore',
                    state: 'Karnataka',
                    pincode: '560001'
                }),
                paymentMethod: 'razorpay',
                paymentStatus: 'PAID',
                razorpayOrderId: 'order_' + Math.random().toString(36).substr(2, 9),
            },
        });

        await prisma.order.create({
            data: {
                patientName: 'Rahul Sharma',
                phone: '+91-9876543212',
                email: 'rahul.sharma@example.com',
                status: 'CONFIRMED',
                items: JSON.stringify([
                    { productId: p9.id, name: p9.name, quantity: 2, price: 599 },
                    { productId: p15.id, name: p15.name, quantity: 1, price: 699 }
                ]),
                totalAmount: 1897,
                shippingAddress: JSON.stringify({
                    street: '789 Lake View',
                    city: 'Pune',
                    state: 'Maharashtra',
                    pincode: '411001'
                }),
                paymentMethod: 'razorpay',
                paymentStatus: 'PAID',
                razorpayOrderId: 'order_' + Math.random().toString(36).substr(2, 9),
            },
        });

        await prisma.order.create({
            data: {
                patientName: 'Priya Iyer',
                phone: '+91-9876543213',
                email: 'priya.iyer@example.com',
                status: 'PENDING',
                items: JSON.stringify([
                    { productId: p21.id, name: p21.name, quantity: 1, price: 899 }
                ]),
                totalAmount: 899,
                shippingAddress: JSON.stringify({
                    street: '321 Beach Road',
                    city: 'Chennai',
                    state: 'Tamil Nadu',
                    pincode: '600001'
                }),
                paymentMethod: 'cod',
                paymentStatus: 'PENDING',
            },
        });

        await prisma.order.create({
            data: {
                patientName: 'Vikram Malhotra',
                phone: '+91-9876543214',
                email: 'vikram.m@example.com',
                status: 'DELIVERED',
                items: JSON.stringify([
                    { productId: p10.id, name: p10.name, quantity: 3, price: 299 },
                    { productId: p13.id, name: p13.name, quantity: 2, price: 399 }
                ]),
                totalAmount: 1695,
                shippingAddress: JSON.stringify({
                    street: '555 Green Park',
                    city: 'Delhi',
                    state: 'Delhi',
                    pincode: '110016'
                }),
                paymentMethod: 'razorpay',
                paymentStatus: 'PAID',
                razorpayOrderId: 'order_' + Math.random().toString(36).substr(2, 9),
            },
        });

        console.log('✅ Created 5 sample orders!');

        // ============================================
        // 10. SAMPLE APPOINTMENTS (5 appointments)
        // ============================================
        console.log('\n📅 Creating sample appointments...');
        
        await prisma.appointment.create({
            data: {
                patientName: 'Anjali Desai',
                phone: '+91-9876543215',
                email: 'anjali.desai@example.com',
                therapyId: t1.id,
                preferredDate: new Date('2026-03-05'),
                preferredTime: '10:00 AM',
                status: 'CONFIRMED',
                notes: 'First time visitor. Interested in stress relief.',
            },
        });

        await prisma.appointment.create({
            data: {
                patientName: 'Karan Singh',
                phone: '+91-9876543216',
                email: 'karan.singh@example.com',
                therapyId: t2.id,
                preferredDate: new Date('2026-03-06'),
                preferredTime: '2:00 PM',
                status: 'CONFIRMED',
                notes: 'Suffering from insomnia. Recommended by friend.',
            },
        });

        await prisma.appointment.create({
            data: {
                patientName: 'Meera Kapoor',
                phone: '+91-9876543217',
                email: 'meera.kapoor@example.com',
                therapyId: t6.id,
                preferredDate: new Date('2026-03-07'),
                preferredTime: '11:00 AM',
                status: 'PENDING',
                notes: 'Chronic lower back pain. Works from home.',
            },
        });

        await prisma.appointment.create({
            data: {
                patientName: 'Rohit Verma',
                phone: '+91-9876543218',
                email: 'rohit.verma@example.com',
                therapyId: t13.id,
                preferredDate: new Date('2026-03-08'),
                preferredTime: '3:00 PM',
                status: 'CONFIRMED',
                notes: 'Pre-wedding facial treatment.',
            },
        });

        await prisma.appointment.create({
            data: {
                patientName: 'Divya Nair',
                phone: '+91-9876543219',
                email: 'divya.nair@example.com',
                therapyId: t10.id,
                preferredDate: new Date('2026-03-10'),
                preferredTime: '9:00 AM',
                status: 'COMPLETED',
                notes: 'Weight loss program. Second session.',
            },
        });

        console.log('✅ Created 5 sample appointments!');

        // ============================================
        // 11. SETTINGS (5 clinic settings)
        // ============================================
        console.log('\n⚙️  Creating clinic settings...');
        
        await prisma.setting.upsert({
            where: { key: 'clinic_name' },
            update: {},
            create: {
                key: 'clinic_name',
                value: 'Bharti Ayurvedic Clinic',
                type: 'STRING',
            },
        });

        await prisma.setting.upsert({
            where: { key: 'clinic_phone' },
            update: {},
            create: {
                key: 'clinic_phone',
                value: '+91-9876543200',
                type: 'STRING',
            },
        });

        await prisma.setting.upsert({
            where: { key: 'clinic_email' },
            update: {},
            create: {
                key: 'clinic_email',
                value: 'info@bharticlinic.com',
                type: 'STRING',
            },
        });

        await prisma.setting.upsert({
            where: { key: 'clinic_address' },
            update: {},
            create: {
                key: 'clinic_address',
                value: JSON.stringify({
                    line1: '123, Wellness Street',
                    line2: 'Green Park',
                    city: 'New Delhi',
                    state: 'Delhi',
                    pincode: '110016'
                }),
                type: 'JSON',
            },
        });

        await prisma.setting.upsert({
            where: { key: 'clinic_hours' },
            update: {},
            create: {
                key: 'clinic_hours',
                value: JSON.stringify({
                    monday: '9:00 AM - 7:00 PM',
                    tuesday: '9:00 AM - 7:00 PM',
                    wednesday: '9:00 AM - 7:00 PM',
                    thursday: '9:00 AM - 7:00 PM',
                    friday: '9:00 AM - 7:00 PM',
                    saturday: '9:00 AM - 5:00 PM',
                    sunday: 'Closed'
                }),
                type: 'JSON',
            },
        });

        console.log('✅ Created 5 settings!');

        // ============================================
        // 12. CONTACT MESSAGES (3 messages)
        // ============================================
        console.log('\n📧 Creating contact messages...');
        
        await prisma.contactMessage.create({
            data: {
                name: 'Suresh Kumar',
                email: 'suresh.kumar@example.com',
                phone: '+91-9876543220',
                subject: 'Inquiry about Panchakarma',
                message: 'I would like to know more about your Panchakarma treatments and pricing. Do you offer packages?',
                isRead: false,
            },
        });

        await prisma.contactMessage.create({
            data: {
                name: 'Lakshmi Reddy',
                email: 'lakshmi.reddy@example.com',
                phone: '+91-9876543221',
                subject: 'Product Availability',
                message: 'Is Kumkumadi Tailam available in 100ml bottle? I want to try before buying the larger size.',
                isRead: true,
            },
        });

        await prisma.contactMessage.create({
            data: {
                name: 'Aditya Sharma',
                email: 'aditya.sharma@example.com',
                phone: '+91-9876543222',
                subject: 'Appointment Rescheduling',
                message: 'I need to reschedule my appointment from March 5th to March 8th. Please confirm availability.',
                isRead: false,
            },
        });

        console.log('✅ Created 3 contact messages!');

        // ============================================
        // SUMMARY
        // ============================================
        console.log('\n' + '='.repeat(60));
        console.log('🎉 COMPREHENSIVE DATABASE SEEDING COMPLETED SUCCESSFULLY!');
        console.log('='.repeat(60));
        console.log('\n📊 DATA SUMMARY:');
        console.log('   ✅ 1 Admin User');
        console.log('   ✅ 12 Categories (6 product + 6 therapy)');
        console.log('   ✅ 30 Products (8 oils + 8 supplements + 6 skincare + 4 digestive + 4 haircare)');
        console.log('   ✅ 15 Therapies (5 panchakarma + 4 massage + 2 detox + 2 stress + 1 pain + 1 beauty)');
        console.log('   ✅ 6 Wellness Packages');
        console.log('   ✅ 20 Gallery Items');
        console.log('   ✅ 25 Customer Reviews (15 five-star + 8 four-star + 2 three-star)');
        console.log('   ✅ 10 Blog Posts');
        console.log('   ✅ 5 Sample Orders');
        console.log('   ✅ 5 Sample Appointments');
        console.log('   ✅ 5 Clinic Settings');
        console.log('   ✅ 3 Contact Messages');
        console.log('\n   📈 TOTAL: ~137 records');
        console.log('\n🔐 ADMIN LOGIN CREDENTIALS:');
        console.log('   Email: dr.ipinder@bhartiveda.com');
        console.log('   Password: password123');
        console.log('\n💡 NEXT STEPS:');
        console.log('   1. Open Prisma Studio: npx prisma studio');
        console.log('   2. Start backend: npm run dev');
        console.log('   3. Start frontend: npm run dev');
        console.log('   4. Test admin login and explore the data!');
        console.log('\n' + '='.repeat(60) + '\n');

    } catch (error) {
        console.error('\n❌ ERROR SEEDING DATABASE:');
        console.error(error);
        throw error;
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
