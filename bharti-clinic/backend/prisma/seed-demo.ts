import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting DEMO database seeding (Bharti Veda)...\n');

    // ============================================
    // CLEAR EXISTING DATA
    // ============================================
    console.log('🗑️  Clearing existing data...');
    await prisma.review.deleteMany();
    await prisma.order.deleteMany();
    await prisma.appointment.deleteMany();
    await prisma.contactMessage.deleteMany();
    await prisma.blogPost.deleteMany();
    await prisma.galleryItem.deleteMany();
    await prisma.packageTherapy.deleteMany().catch(() => { });
    await prisma.package.deleteMany();
    await prisma.therapy.deleteMany();
    await prisma.inventoryLog.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
    console.log('✅ Existing data cleared\n');

    // ============================================
    // 1. ADMIN USER
    // ============================================
    console.log('👤 Creating admin user...');
    const hashedPassword = await bcrypt.hash('password123', 10);

    const admin = await prisma.user.create({
        data: {
            email: 'dr.ipinder@bhartiveda.com',
            passwordHash: hashedPassword,
            name: 'Dr. Ipinder Bharti',
            role: 'ADMIN',
        },
    });
    console.log('✅ Admin user created\n');

    // ============================================
    // 2. CATEGORIES (matching BhartiVeda actual)
    // ============================================
    console.log('📁 Creating categories...');
    const [catJoint, catWomens, catImmunity, catDigestive, catPanchakarma, catHairSkin, catRespiratory] = await Promise.all([
        prisma.category.create({ data: { name: 'Joint & Bone Care', slug: 'joint-bone-care', type: 'PRODUCT' } }),
        prisma.category.create({ data: { name: "Women's Health", slug: 'womens-health', type: 'PRODUCT' } }),
        prisma.category.create({ data: { name: 'Immunity & Nutrition', slug: 'immunity-nutrition', type: 'PRODUCT' } }),
        prisma.category.create({ data: { name: 'Digestive Health', slug: 'digestive-health', type: 'PRODUCT' } }),
        prisma.category.create({ data: { name: 'Panchkarma Products', slug: 'panchkarma-products', type: 'PRODUCT' } }),
        prisma.category.create({ data: { name: 'Hair & Skin Care', slug: 'hair-skin-care', type: 'PRODUCT' } }),
        prisma.category.create({ data: { name: 'Respiratory Health', slug: 'respiratory-health', type: 'PRODUCT' } }),
    ]);

    const therapyCategory = await prisma.category.create({
        data: { name: 'Panchkarma Therapies', slug: 'panchkarma-therapies', type: 'THERAPY' },
    });
    console.log('✅ Categories created\n');

    // ============================================
    // 3. PRODUCTS (Actual BhartiVeda products with meaningful images)
    // ============================================
    console.log('🛍️  Creating products...');
    const products = await Promise.all([

        // --- Joint & Bone Care ---
        prisma.product.create({
            data: {
                name: 'J3 Power Joint Support Tablets',
                slug: 'j3-power-joint-tablets',
                description: 'Advanced Ayurvedic joint support formula by Dr. Ipinder Bharti. Contains Shallaki, Ashwagandha & Giloy for strengthening joints, reducing inflammation, and improving mobility. 60 tablets per pack.',
                price: 1199,
                comparePrice: 1499,
                stock: 80,
                categoryId: catJoint.id,
                imageUrls: [
                    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80',
                    'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&q=80',
                ],
                isActive: true,
                isFeatured: true,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Knee Fluid - Joint Power Grease',
                slug: 'knee-fluid-joint-grease',
                description: 'Powerful Ayurvedic lubricating oil for joints. Provides deep relief from knee pain, cervical, back, and hip pain. Enriched with Mahanarayan Oil & Nirgundi for fast-acting results.',
                price: 899,
                comparePrice: 1199,
                stock: 60,
                categoryId: catJoint.id,
                imageUrls: [
                    'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80',
                    'https://images.unsplash.com/photo-1621510456681-2330135e5871?w=600&q=80',
                ],
                isActive: true,
                isFeatured: true,
            },
        }),

        // --- Women's Health ---
        prisma.product.create({
            data: {
                name: 'She Cure Tonic for Women',
                slug: 'she-cure-tonic',
                description: 'Comprehensive Ayurvedic tonic for women\'s reproductive health and hormonal balance. Formulated with Shatavari, Ashok Chal & Lodhra. Addresses PCOD, irregular periods, and general women\'s wellness.',
                price: 799,
                comparePrice: 999,
                stock: 100,
                categoryId: catWomens.id,
                imageUrls: [
                    'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80',
                    'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80',
                ],
                isActive: true,
                isFeatured: true,
            },
        }),

        // --- Immunity & Nutrition ---
        prisma.product.create({
            data: {
                name: 'Vita-22 Multivitamin & Multiminerals',
                slug: 'vita-22-multivitamin',
                description: 'The ultimate Ayurvedic SuperFood. Combines 22 essential vitamins and minerals with herbal extracts. Boosts immunity, enhances energy, and supports overall vitality. 60 capsules.',
                price: 1099,
                comparePrice: 1399,
                stock: 120,
                categoryId: catImmunity.id,
                imageUrls: [
                    'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&q=80',
                    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80',
                ],
                isActive: true,
                isFeatured: true,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Chawanprash with Shudh Desi Ghee',
                slug: 'chawanprash-desi-ghee',
                description: 'Traditional Chawanprash crafted with pure Desi Ghee and over 40 Ayurvedic herbs. Strengthens immunity, improves digestion, and provides sustained energy. 500g jar.',
                price: 599,
                comparePrice: 799,
                stock: 75,
                categoryId: catImmunity.id,
                imageUrls: [
                    'https://images.unsplash.com/photo-1505944357-2c2f2e5e8c5e?w=600&q=80',
                    'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=600&q=80',
                ],
                isActive: true,
                isFeatured: false,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Height Plus Growth Powder',
                slug: 'height-plus-powder',
                description: 'Ayurvedic nutritional supplement for height development and bone density. Enriched with Ashwagandha, Shatavari & calcium-rich herbs to support natural growth in adolescents.',
                price: 699,
                comparePrice: 899,
                stock: 50,
                categoryId: catImmunity.id,
                imageUrls: [
                    'https://images.unsplash.com/photo-1589395595558-3e887c3ead9c?w=600&q=80',
                    'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&q=80',
                ],
                isActive: true,
                isFeatured: false,
            },
        }),

        // --- Digestive Health ---
        prisma.product.create({
            data: {
                name: 'Bellyliv Arq (Sugar-Free)',
                slug: 'bellyliv-arq-sugar-free',
                description: 'Gentle Ayurvedic liver tonic and digestive support formula, completely sugar-free. Promotes healthy liver function, aids digestion, reduces acidity and bloating. Ideal for diabetic patients.',
                price: 499,
                comparePrice: 649,
                stock: 90,
                categoryId: catDigestive.id,
                imageUrls: [
                    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80',
                    'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80',
                ],
                isActive: true,
                isFeatured: false,
            },
        }),

        // --- Panchkarma Products ---
        prisma.product.create({
            data: {
                name: 'Nabhi Oil - Navel Therapy Oil',
                slug: 'nabhi-oil-navel-therapy',
                description: 'Traditional Ayurvedic herbal oil for Nabhi Chikitsa (navel therapy). Supports joint health, improves digestion, nourishes skin from within, and helps with hair fall and dandruff. 50ml.',
                price: 449,
                comparePrice: 599,
                stock: 110,
                categoryId: catPanchakarma.id,
                imageUrls: [
                    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
                    'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80',
                ],
                isActive: true,
                isFeatured: true,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Nasya Karma Medicated Oil',
                slug: 'nasya-karma-oil',
                description: 'Therapeutic nasal oil for Nasya Karma Panchkarma treatment. Clears sinuses, treats sinusitis, relieves migraine and chronic headaches. Can be used at home for daily nasal care. 10ml.',
                price: 349,
                comparePrice: 499,
                stock: 65,
                categoryId: catPanchakarma.id,
                imageUrls: [
                    'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80',
                    'https://images.unsplash.com/photo-1534360023894-a2a9ebcc8ef7?w=600&q=80',
                ],
                isActive: true,
                isFeatured: false,
            },
        }),

        // --- Hair & Skin Care ---
        prisma.product.create({
            data: {
                name: 'Kumkumadi Tailam Face Oil',
                slug: 'kumkumadi-tailam',
                description: 'Ayurvedic luxury face oil enriched with pure saffron (Kumkum) and sandalwood. Reduces dark spots, evens skin tone, and provides a natural glow. Dermatologically tested. 25ml.',
                price: 1299,
                comparePrice: 1799,
                stock: 40,
                categoryId: catHairSkin.id,
                imageUrls: [
                    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
                    'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80',
                ],
                isActive: true,
                isFeatured: true,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Brahmi Hair Growth Oil',
                slug: 'brahmi-hair-oil',
                description: 'Pure Brahmi and Bhringraj oil blend for hair growth and scalp nourishment. Reduces hair fall, strengthens roots, promotes hair thickness, and calms the mind. 200ml.',
                price: 599,
                comparePrice: 799,
                stock: 85,
                categoryId: catHairSkin.id,
                imageUrls: [
                    'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80',
                    'https://images.unsplash.com/photo-1597931752949-98c74b5b159f?w=600&q=80',
                ],
                isActive: true,
                isFeatured: false,
            },
        }),

        // --- Respiratory Health ---
        prisma.product.create({
            data: {
                name: 'Drycil Syrup for Dry Cough',
                slug: 'drycil-syrup',
                description: 'Ayurvedic herbal syrup specially formulated for dry cough and sore throat relief. Contains Mulethi, Tulsi & Adrak extracts. Non-drowsy formula safe for all ages. 200ml bottle.',
                price: 249,
                comparePrice: 349,
                stock: 130,
                categoryId: catRespiratory.id,
                imageUrls: [
                    'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80',
                    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80',
                ],
                isActive: true,
                isFeatured: false,
            },
        }),
    ]);
    console.log(`✅ Created ${products.length} products\n`);

    // ============================================
    // 4. THERAPIES (Actual Panchkarma treatments)
    // ============================================
    console.log('💆 Creating Panchkarma therapies...');
    const therapies = await Promise.all([
        prisma.therapy.create({
            data: {
                name: 'Abhyanga (Full Body Oil Massage)',
                slug: 'abhyanga',
                description: 'Traditional Ayurvedic full-body massage with warm herbal oils tailored to your dosha. Promotes deep relaxation, improves blood circulation, eliminates toxins, and nourishes the skin from root to tip.',
                durationMinutes: 60,
                basePrice: 2500,
                categoryId: therapyCategory.id,
                imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=700&q=80',
                isActive: true,
                isFeatured: true,
            },
        }),
        prisma.therapy.create({
            data: {
                name: 'Shirodhara (Third Eye Therapy)',
                slug: 'shirodhara',
                description: 'A continuous, rhythmic stream of warm medicated oil poured on the forehead (ajna chakra). The ultimate therapy for stress, anxiety, insomnia, migraine, and nervous disorders. Induces deep meditative calm.',
                durationMinutes: 45,
                basePrice: 3500,
                categoryId: therapyCategory.id,
                imageUrl: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=700&q=80',
                isActive: true,
                isFeatured: true,
            },
        }),
        prisma.therapy.create({
            data: {
                name: 'Panchakarma Detox Program',
                slug: 'panchakarma',
                description: 'The complete Ayurvedic detoxification and rejuvenation protocol. Involves all five purification procedures (Vamana, Virechana, Nasya, Basti, Raktamokshana) personalized to your constitution. Requires prior consultation.',
                durationMinutes: 120,
                basePrice: 8500,
                categoryId: therapyCategory.id,
                imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=700&q=80',
                isActive: true,
                isFeatured: true,
            },
        }),
        prisma.therapy.create({
            data: {
                name: 'Nasya Karma (Nasal Therapy)',
                slug: 'nasya',
                description: 'Therapeutic administration of medicated oils through the nasal passages. Highly effective for chronic sinusitis, migraine, cervical spondylitis, and improving mental clarity. One of the five classic Panchkarma procedures.',
                durationMinutes: 30,
                basePrice: 1500,
                categoryId: therapyCategory.id,
                imageUrl: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=700&q=80',
                isActive: true,
                isFeatured: false,
            },
        }),
        prisma.therapy.create({
            data: {
                name: 'Kati Basti (Lower Back Therapy)',
                slug: 'kati-basti',
                description: 'Specialized warm oil retention therapy for the lumbar and sacral region. Warm medicated oil is pooled over the lower back using a dough ring to deeply penetrate and relieve chronic back pain, disc issues, and sciatica.',
                durationMinutes: 45,
                basePrice: 2000,
                categoryId: therapyCategory.id,
                imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=700&q=80',
                isActive: true,
                isFeatured: false,
            },
        }),
        prisma.therapy.create({
            data: {
                name: 'Virechan Karma (Detox Purgation)',
                slug: 'virechan-karma',
                description: 'The second of the classical Panchkarma procedures. Medicated therapeutic purgation to cleanse the small intestine and liver. Effective for skin disorders, digestive issues, and pitta imbalances.',
                durationMinutes: 90,
                basePrice: 3000,
                categoryId: therapyCategory.id,
                imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=700&q=80',
                isActive: true,
                isFeatured: false,
            },
        }),
        prisma.therapy.create({
            data: {
                name: 'Vaman Karma (Respiratory Detox)',
                slug: 'vaman-karma',
                description: 'Therapeutic emesis to cleanse the lungs, bronchi, and upper respiratory tract. Highly effective for bronchial asthma, chronic cough, COPD, and kapha-related disorders. Always performed under expert supervision.',
                durationMinutes: 90,
                basePrice: 3500,
                categoryId: therapyCategory.id,
                imageUrl: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=700&q=80',
                isActive: true,
                isFeatured: false,
            },
        }),
    ]);
    console.log(`✅ Created ${therapies.length} therapies\n`);

    // ============================================
    // 5. PACKAGES
    // ============================================
    console.log('📦 Creating wellness packages...');
    const packages = await Promise.all([
        prisma.package.create({
            data: {
                name: 'Stress Relief & Sleep Package',
                slug: 'stress-relief-sleep',
                description: 'Beat stress and restore restful sleep. Includes 3 sessions of Abhyanga + 2 Shirodhara treatments with take-home Nasya Oil. Designed for working professionals and insomnia sufferers.',
                totalPrice: 14999,
                originalPrice: 19500,
                isActive: true,
            },
        }),
        prisma.package.create({
            data: {
                name: 'Panchkarma Complete Detox',
                slug: 'panchkarma-complete-detox',
                description: '7-day comprehensive Ayurvedic detoxification program including all five Panchkarma procedures. Includes personalized dietary guidance, daily Abhyanga, and follow-up consultation with Dr. Ipinder Bharti.',
                totalPrice: 35000,
                originalPrice: 47500,
                isActive: true,
            },
        }),
        prisma.package.create({
            data: {
                name: 'Joint Pain Relief Package',
                slug: 'joint-pain-relief',
                description: 'Comprehensive Ayurvedic program for chronic joint and back pain. Combines 5 sessions of Kati Basti + Abhyanga + J3 Power Tablets (1 month supply). Clinically proven results in 21 days.',
                totalPrice: 18500,
                originalPrice: 24000,
                isActive: true,
            },
        }),
        prisma.package.create({
            data: {
                name: "Women's Wellness Package",
                slug: 'womens-wellness',
                description: "Holistic wellness program tailored for women's health. Includes 3 Abhyanga sessions, Virechan Karma, She Cure Tonic (1 month), and a personalized diet and herb consultation. For PCOD, hormonal imbalance, and fatigue.",
                totalPrice: 16999,
                originalPrice: 22000,
                isActive: true,
            },
        }),
    ]);
    console.log(`✅ Created ${packages.length} packages\n`);

    // ============================================
    // 6. GALLERY ITEMS
    // ============================================
    console.log('🖼️  Creating gallery items...');
    await Promise.all([
        prisma.galleryItem.create({ data: { type: 'PHOTO', url: 'https://lh3.googleusercontent.com/p/AF1QipO3UKhtK-pwdklV5Rbz2ukvcyHtgx4aPdT-Vqmw=s1000', category: 'Clinic Interior', caption: 'Welcome Reception Area', sortOrder: 1, isActive: true } }),
        prisma.galleryItem.create({ data: { type: 'PHOTO', url: 'https://lh3.googleusercontent.com/p/AF1QipNgOruJ1OG9b-6HzDEEE5u8iKrepY0EIqqpXgPX=s1000', category: 'Exterior', caption: 'Ayurveda & Panchkarma Centre', sortOrder: 2, isActive: true } }),
        prisma.galleryItem.create({ data: { type: 'PHOTO', url: 'https://lh3.googleusercontent.com/p/AF1QipOEqbW0ctDahX6MvS8oZ0xvDFxpEyvZhiA7Ixvz=s1000', category: 'Therapy Sessions', caption: 'State-of-the-art Treatment Room', sortOrder: 3, isActive: true } }),
        prisma.galleryItem.create({ data: { type: 'PHOTO', url: 'https://lh3.googleusercontent.com/p/AF1QipMBAqWJKCtAhZpxuvcDDLcG9cijNxaNUBPykCSB=s1000', category: 'Consultation', caption: 'Expert Consultation Area', sortOrder: 4, isActive: true } }),
        prisma.galleryItem.create({ data: { type: 'PHOTO', url: 'https://lh3.googleusercontent.com/gps-cs-s/AHVAweprB9haslgIp6QiYl4fvxp1p4j_wEI6M8lkCBKNapNLBmYfMV2-FVyImcuNTQrVp_b9eSIBSjgXp3c32NyH7X6-R1T5zCnqYAjFJUnEgiE8xP5bR09IijlX6pjfN-04ToH8ihotu3a_sEw1=s1000', category: 'Exterior', caption: 'Clinic Entrance View', sortOrder: 5, isActive: true } }),
        prisma.galleryItem.create({ data: { type: 'PHOTO', url: 'https://lh3.googleusercontent.com/p/AF1QipOjEpNQsZoB_NCij40LR5wfJYbhUtt1ugtI9Y4I=s1000', category: 'Clinic Interior', caption: 'Clinic Ambiance', sortOrder: 6, isActive: true } }),
    ]);
    console.log('✅ Created gallery items\n');

    // ============================================
    // 7. BLOG POSTS
    // ============================================
    console.log('📝 Creating blog posts...');
    await Promise.all([
        prisma.blogPost.create({
            data: {
                title: 'What is Panchkarma? The Complete 5-Step Detox Explained',
                slug: 'what-is-panchkarma-complete-guide',
                excerpt: 'Panchkarma is Ayurveda\'s most powerful detox therapy. Dr. Ipinder Bharti explains all five procedures and how they can transform your health.',
                content: '<h2>Understanding Panchkarma</h2><p>Panchkarma (five actions) is the cornerstone of Ayurvedic medicine. It is a systematic treatment designed to rid the body of accumulated toxins (ama) that are the root cause of most chronic diseases.</p><h2>The Five Procedures</h2><ol><li><strong>Vamana</strong> – Therapeutic emesis for lung and respiratory detox</li><li><strong>Virechana</strong> – Medicated purgation for liver and digestive cleansing</li><li><strong>Nasya</strong> – Nasal therapy for sinus and neurological conditions</li><li><strong>Basti</strong> – Medicated enema for colon and vata disorders</li><li><strong>Raktamokshana</strong> – Blood purification for skin and liver diseases</li></ol><h2>Is Panchkarma Right for You?</h2><p>Consult Dr. Ipinder Bharti to assess your prakriti (constitution) and determine which procedures suit your needs.</p>',
                imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=900&q=80',
                tags: ['panchkarma', 'detox', 'ayurveda', 'dr-ipinder'],
                status: 'PUBLISHED',
                authorId: admin.id,
                publishedAt: new Date('2026-02-10'),
            },
        }),
        prisma.blogPost.create({
            data: {
                title: 'Know Your Dosha: Vata, Pitta & Kapha Explained Simply',
                slug: 'know-your-dosha-vata-pitta-kapha',
                excerpt: 'Understanding your Ayurvedic body type is the first step to lasting health. Take our simple quiz and learn what your constitution means for your diet and lifestyle.',
                content: '<h2>The Three Doshas</h2><p>In Ayurveda, every person is born with a unique combination of three biological energies called doshas. These determine your physical traits, emotional tendencies, and disease susceptibilities.</p><h2>Vata (Air + Ether)</h2><p>Creative, enthusiastic, but prone to anxiety, dry skin, and digestive issues when imbalanced.</p><h2>Pitta (Fire + Water)</h2><p>Focused, intelligent, and driven, but prone to inflammation, acid reflux, and irritability when excess.</p><h2>Kapha (Earth + Water)</h2><p>Calm, compassionate, and strong, but prone to weight gain, congestion, and lethargy when imbalanced.</p>',
                imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=80',
                tags: ['dosha', 'vata', 'pitta', 'kapha', 'ayurveda-basics'],
                status: 'PUBLISHED',
                authorId: admin.id,
                publishedAt: new Date('2026-02-18'),
            },
        }),
        prisma.blogPost.create({
            data: {
                title: 'Shirodhara: The Ayurvedic Secret to Deep Sleep & Calm Mind',
                slug: 'shirodhara-sleep-stress-relief',
                excerpt: 'Millions suffer from insomnia and chronic stress. Shirodhara, one of Ayurveda\'s most profound therapies, can help you achieve deep rest without medication.',
                content: '<h2>What is Shirodhara?</h2><p>Shirodhara involves a continuous, steady stream of warm medicated oil poured onto the forehead (the "third eye" or ajna chakra). The word combines "shiro" (head) and "dhara" (stream).</p><h2>Benefits Backed by Research</h2><ul><li>Reduces cortisol levels (stress hormone) significantly</li><li>Induces alpha brainwave states similar to meditation</li><li>Helps with anxiety, PTSD, and insomnia</li><li>Improves focus and mental clarity</li></ul><h2>What to Expect at Bharti Clinic</h2><p>A 45-minute session begins with a scalp massage prep, followed by the oil stream. Most patients report feeling profoundly relaxed within 10 minutes.</p>',
                imageUrl: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=900&q=80',
                tags: ['shirodhara', 'stress', 'insomnia', 'panchkarma', 'mental-health'],
                status: 'PUBLISHED',
                authorId: admin.id,
                publishedAt: new Date('2026-02-28'),
            },
        }),
        prisma.blogPost.create({
            data: {
                title: '5 Ayurvedic Morning Habits That Transform Your Health',
                slug: '5-ayurvedic-morning-habits',
                excerpt: 'The ancient science of Ayurveda recommends a morning routine (Dinacharya) that sets the tone for the entire day. Here are 5 simple practices you can start today.',
                content: '<h2>Dinacharya: The Ayurvedic Daily Regimen</h2><p>Your morning routine is the most powerful tool for long-term health according to Ayurveda. These simple practices, done consistently, create a profound shift in your physical and mental health.</p><ol><li><strong>Wake before sunrise</strong> – 5-6 AM is considered the Brahma muhurta, the most auspicious time for clarity.</li><li><strong>Oil Pulling (Gandusha)</strong> – Swish 1 tsp sesame oil for 15 minutes to detoxify the oral cavity.</li><li><strong>Nasya</strong> – Apply 2 drops of Nasya oil in each nostril to clear the mind and nasal passages.</li><li><strong>Abhyanga (Self-Massage)</strong> – A 5-minute warm oil self-massage before your shower pacifies Vata.</li><li><strong>Warm water with lemon</strong> – Kick-starts Agni (digestive fire) and flushes overnight toxins.</li></ol>',
                imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=80',
                tags: ['dinacharya', 'morning-routine', 'ayurveda-tips', 'wellness'],
                status: 'PUBLISHED',
                authorId: admin.id,
                publishedAt: new Date('2026-03-05'),
            },
        }),
    ]);
    console.log('✅ Created blog posts\n');

    // ============================================
    // 8. REVIEWS
    // ============================================
    console.log('⭐ Creating customer reviews...');
    await Promise.all([
        prisma.review.create({ data: { productId: products[6].id, patientName: 'Savan Rajpoot', rating: 5, comment: 'I was suffering from severe acidity. Whenever I ate outside food, I would immediately feel acidity. I was tired of taking allopathic antacids regularly, but nothing gave me permanent relief. Then I visited Bharti Clinic and consulted Dr. Bharti.', status: 'APPROVED' } }),
        prisma.review.create({ data: { productId: products[2].id, patientName: 'bincy acd', rating: 5, comment: 'I received a concerning diagnosis involving ovarian carcinoma, and my CA-125 level was alarmingly high at 50.3. As anyone can imagine, this news brought a great deal of fear and uncertainty for me and my family. However, Dr. Bharti provided an amazing treatment.', status: 'APPROVED' } }),
        prisma.review.create({ data: { productId: products[1].id, patientName: 'Gurjeet Singh', rating: 5, comment: 'My wife was suffering from arm pain due ti injury even she was not able to pull up her arm. When someone recommend me dr bharti i came here and within 4 sitting she is quite okay. Thanks Dr Bharti. 100% Recommend', status: 'APPROVED' } }),
        prisma.review.create({ data: { productId: products[3].id, patientName: 'Pawan singh', rating: 5, comment: 'I had been suffering from Blood Pressure issue for a long time, but after taking ayurvedic treatment at Bharti Clinic, my BP is now completely under control.', status: 'APPROVED' } }),
        prisma.review.create({ data: { productId: products[9].id, patientName: 'Liam Sitlhou', rating: 5, comment: 'I feel truly blessed to have been treated by Dr. Ipinder Bharti. I have complete trust in her because of the genuine passion, dedication, and integrity she brings to her work. It’s clear that she truly loves what she does.', status: 'APPROVED' } }),
        prisma.review.create({ data: { productId: products[11].id, patientName: 'Drishti Mohan', rating: 5, comment: 'I had a really bad cough and fever, and I visited Dr. Bharti Clinic for treatment. The doctor was very kind, listened patiently, and explained everything clearly. The treatment worked really well, and I started feeling much better in just a few days. Highly recommended!', status: 'APPROVED' } }),
        prisma.review.create({ data: { productId: products[2].id, patientName: 'Cherish Park', rating: 5, comment: 'I visited Bharti clinic for treatment of PCOD, and I’m so glad I did. After struggling for a while and not seeing much improvement elsewhere, I finally started noticing real progress under their care. The doctor was very understanding.', status: 'APPROVED' } }),
        prisma.review.create({ data: { productId: products[7].id, patientName: 'Sumaiya Umiii', rating: 5, comment: 'Highly recommend Bharti clinic for authentic ayurvedic treatments. The doctor Bharti is well experienced and truly take the time to understand health concern. The therapies are relaxing, well-managed, and personalized to our needs.', status: 'APPROVED' } }),
    ]);
    console.log('✅ Created reviews\n');

    // ============================================
    // 9. SAMPLE ORDERS (demo-ready, realistic)
    // ============================================
    console.log('🛒 Creating sample orders...');
    await Promise.all([
        prisma.order.create({
            data: {
                patientName: 'Gurpreet Singh Dhillon',
                phone: '+91 98140 55210',
                email: 'gurpreet.dhillon@gmail.com',
                status: 'DELIVERED',
                items: [
                    { productId: products[0].id, name: products[0].name, quantity: 2, price: Number(products[0].price) },
                    { productId: products[3].id, name: products[3].name, quantity: 1, price: Number(products[3].price) },
                ],
                totalAmount: Number(products[0].price) * 2 + Number(products[3].price) + 100,
                shippingAddress: { line1: 'House 47, Phase 7', city: 'Mohali', state: 'Punjab', pinCode: '160062' },
                paymentMethod: 'UPI',
                paymentStatus: 'PAID',
            },
        }),
        prisma.order.create({
            data: {
                patientName: 'Ananya Sharma',
                phone: '+91 97290 43811',
                email: 'ananya.sharma@gmail.com',
                status: 'CONFIRMED',
                items: [
                    { productId: products[2].id, name: products[2].name, quantity: 1, price: Number(products[2].price) },
                    { productId: products[9].id, name: products[9].name, quantity: 1, price: Number(products[9].price) },
                ],
                totalAmount: Number(products[2].price) + Number(products[9].price) + 100,
                shippingAddress: { line1: '12-C Sector 22', city: 'Chandigarh', state: 'Punjab', pinCode: '160022' },
                paymentMethod: 'UPI',
                paymentStatus: 'PAID',
            },
        }),
        prisma.order.create({
            data: {
                patientName: 'Vikram Mehra',
                phone: '+91 90411 22088',
                email: 'vikram.mehra@outlook.com',
                status: 'PENDING',
                items: [
                    { productId: products[1].id, name: products[1].name, quantity: 1, price: Number(products[1].price) },
                ],
                totalAmount: Number(products[1].price) + 100,
                shippingAddress: { line1: 'Block B, Sector 70', city: 'Mohali', state: 'Punjab', pinCode: '160071' },
                paymentMethod: 'COD',
                paymentStatus: 'PENDING',
            },
        }),
        prisma.order.create({
            data: {
                patientName: 'Sunita Rani',
                phone: '+91 88375 19042',
                email: 'sunita.rani@gmail.com',
                status: 'CONFIRMED',
                items: [
                    { productId: products[4].id, name: products[4].name, quantity: 2, price: Number(products[4].price) },
                    { productId: products[7].id, name: products[7].name, quantity: 1, price: Number(products[7].price) },
                ],
                totalAmount: Number(products[4].price) * 2 + Number(products[7].price) + 100,
                shippingAddress: { line1: 'VPO Kurali', city: 'Ropar', state: 'Punjab', pinCode: '140103' },
                paymentMethod: 'UPI',
                paymentStatus: 'PAID',
            },
        }),
    ]);
    console.log('✅ Created sample orders\n');

    // ============================================
    // 10. SAMPLE APPOINTMENTS (future dates)
    // ============================================
    console.log('📅 Creating sample appointments...');
    await Promise.all([
        prisma.appointment.create({
            data: {
                patientName: 'Harjit Kaur',
                phone: '+91 98765 11001',
                email: 'harjit.kaur@gmail.com',
                therapyId: therapies[0].id,
                preferredDate: new Date('2026-03-10'),
                preferredTime: '10:00 AM',
                status: 'CONFIRMED',
                notes: 'First-time patient. Doctor recommended Abhyanga for stress and sleep issues.',
            },
        }),
        prisma.appointment.create({
            data: {
                patientName: 'Ranjeet Bhatia',
                phone: '+91 98765 11002',
                email: 'ranjeet.bhatia@gmail.com',
                therapyId: therapies[1].id,
                preferredDate: new Date('2026-03-10'),
                preferredTime: '12:00 PM',
                status: 'CONFIRMED',
                notes: 'Returning client. Third Shirodhara session in his stress relief package.',
            },
        }),
        prisma.appointment.create({
            data: {
                patientName: 'Simran Walia',
                phone: '+91 98765 11003',
                email: 'simran.walia@gmail.com',
                therapyId: therapies[2].id,
                preferredDate: new Date('2026-03-11'),
                preferredTime: '9:00 AM',
                status: 'CONFIRMED',
                notes: 'Starting 7-day Panchkarma Detox Program. Dietary restrictions noted.',
            },
        }),
        prisma.appointment.create({
            data: {
                patientName: 'Mohan Lal Saini',
                phone: '+91 98765 11004',
                email: 'mohan.saini@gmail.com',
                therapyId: therapies[4].id,
                preferredDate: new Date('2026-03-11'),
                preferredTime: '3:00 PM',
                status: 'PENDING',
                notes: 'Chronic L4-L5 disc problem. Referred by orthopaedic specialist.',
            },
        }),
        prisma.appointment.create({
            data: {
                patientName: 'Poonam Chaudhary',
                phone: '+91 98765 11005',
                email: 'poonam.chaudhary@gmail.com',
                therapyId: therapies[3].id,
                preferredDate: new Date('2026-03-12'),
                preferredTime: '11:00 AM',
                status: 'PENDING',
                notes: 'Chronic sinusitis and migraine. Interested in the Nasya home kit after the session.',
            },
        }),
    ]);
    console.log('✅ Created appointments\n');

    // ============================================
    // 11. CONTACT MESSAGES
    // ============================================
    console.log('📧 Creating contact messages...');
    await Promise.all([
        prisma.contactMessage.create({
            data: {
                name: 'Deepak Chawla',
                email: 'deepak.chawla@gmail.com',
                phone: '+91 98001 55032',
                subject: 'Inquiry about Panchkarma Detox Program',
                message: 'Namaste Dr. Ipinder ji. I have been suffering from chronic fatigue and digestive issues for 4 years. I am very interested in the full Panchkarma program. Could you please advise on how many days I need to plan for and whether it can be done on an outpatient basis?',
                isRead: false,
            },
        }),
        prisma.contactMessage.create({
            data: {
                name: 'Kavitha Nambiar',
                email: 'kavitha.n@gmail.com',
                phone: '+91 97770 24096',
                subject: 'She Cure Tonic Availability & Dosage Query',
                message: 'I saw She Cure Tonic on your website. I have PCOD and my gynaecologist has suggested trying Ayurveda alongside my current treatment. Is this product safe to take with other medications? I would like to order 3 bottles.',
                isRead: true,
            },
        }),
        prisma.contactMessage.create({
            data: {
                name: 'Balwinder Grewal',
                email: 'balwinder.grewal@hotmail.com',
                phone: '+91 92150 77401',
                subject: 'Booking for Joint Pain Package',
                message: 'I saw your video on YouTube about the Joint Pain Relief package. I have had knee replacement surgery and am looking for post-surgical recovery support. Is Kati Basti and Abhyanga suitable for me? Willing to visit Mohali clinic.',
                isRead: false,
            },
        }),
    ]);
    console.log('✅ Created contact messages\n');

    console.log('═══════════════════════════════════════════════════');
    console.log('🎉 DEMO DATABASE seeding completed for Bharti Veda!\n');
    console.log('✅ Login Credentials:');
    console.log('   Email:    dr.ipinder@bhartiveda.com');
    console.log('   Password: password123\n');
    console.log('Statistics:');
    console.log('  - 7 Product Categories (Joint, Women\'s, Immunity, Digestive, Panchkarma, Hair, Respiratory)');
    console.log('  - 12 Real Products from BhartiVeda catalog');
    console.log('  - 7 Panchkarma Therapies with detailed descriptions');
    console.log('  - 4 Wellness Packages');
    console.log('  - 6 Gallery items');
    console.log('  - 4 Published Blog posts');
    console.log('  - 6 Customer Reviews (APPROVED)');
    console.log('  - 4 Sample Orders (various statuses)');
    console.log('  - 5 Upcoming Appointments');
    console.log('  - 3 Contact Messages');
    console.log('═══════════════════════════════════════════════════\n');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
