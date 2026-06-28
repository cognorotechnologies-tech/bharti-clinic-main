import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seeding...\n');

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
    console.log('✅ Admin user created\n');

    // ============================================
    // 2. CATEGORIES
    // ============================================
    console.log('📁 Creating categories...');
    const productCategories = await Promise.all([
        prisma.category.upsert({
            where: { slug: 'ayurvedic-oils' },
            update: {},
            create: {
                name: 'Ayurvedic Oils',
                slug: 'ayurvedic-oils',
                type: 'PRODUCT',
            },
        }),
        prisma.category.upsert({
            where: { slug: 'herbal-supplements' },
            update: {},
            create: {
                name: 'Herbal Supplements',
                slug: 'herbal-supplements',
                type: 'PRODUCT',
            },
        }),

        prisma.category.upsert({
            where: { slug: 'skincare' },
            update: {},
            create: {
                name: 'Skincare',
                slug: 'skincare',
                type: 'PRODUCT',
            },
        }),
        prisma.category.upsert({
            where: { slug: 'wellness-teas' },
            update: {},
            create: {
                name: 'Wellness Teas',
                slug: 'wellness-teas',
                type: 'PRODUCT',
            },
        }),
    ]);

    const therapyCategory = await prisma.category.upsert({
        where: { slug: 'ayurvedic-therapies' },
        update: {},
        create: {
            name: 'Ayurvedic Therapies',
            slug: 'ayurvedic-therapies',
            type: 'THERAPY',
        },
    });
    
    console.log(`✅ Created ${productCategories.length + 1} categories\n`);

    // ============================================
    // 3. PRODUCTS
    // ============================================
    console.log('🛍️  Creating products...');
    
    const products = await Promise.all([
        // Ayurvedic Oils
        prisma.product.create({
            data: {
                name: 'Brahmi Hair Oil',
                slug: 'brahmi-hair-oil',
                description: 'Pure Brahmi oil for hair growth and scalp health. Reduces hair fall, promotes thickness, and calms the mind.',
                price: 599,
                comparePrice: 799,
                stock: 50,
                categoryId: productCategories[0].id,
                imageUrls: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500'],
                isActive: true,
                isFeatured: true,
            },
        }),

        prisma.product.create({
            data: {
                name: 'Kumkumadi Tailam',
                slug: 'kumkumadi-tailam',
                description: 'Luxurious face oil with saffron for glowing skin. Reduces dark spots, evens skin tone, and provides deep nourishment.',
                price: 1299,
                comparePrice: 1599,
                stock: 30,
                categoryId: productCategories[0].id,
                imageUrls: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500'],
                isActive: true,
                isFeatured: true,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Mahanarayan Oil',
                slug: 'mahanarayan-oil',
                description: 'Traditional massage oil for joint and muscle pain. Relieves arthritis, improves flexibility, and reduces inflammation.',
                price: 449,
                comparePrice: 599,
                stock: 45,
                categoryId: productCategories[0].id,
                imageUrls: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500'],
                isActive: true,
                isFeatured: false,
            },
        }),
        
        // Herbal Supplements
        prisma.product.create({
            data: {
                name: 'Ashwagandha Capsules',
                slug: 'ashwagandha-capsules',
                description: 'Pure Ashwagandha extract for stress relief and vitality. Boosts immunity, reduces anxiety, and improves energy levels. 60 capsules.',
                price: 899,
                comparePrice: 1199,
                stock: 100,
                categoryId: productCategories[1].id,
                imageUrls: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500'],
                isActive: true,
                isFeatured: true,
            },
        }),

        prisma.product.create({
            data: {
                name: 'Triphala Powder',
                slug: 'triphala-powder',
                description: 'Traditional Ayurvedic blend for digestion and detox. Cleanses the body, improves gut health, and boosts immunity. 200g pack.',
                price: 349,
                comparePrice: 499,
                stock: 80,
                categoryId: productCategories[1].id,
                imageUrls: ['https://images.unsplash.com/photo-1505944357-2c2f2e5e8c5e?w=500'],
                isActive: true,
                isFeatured: false,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Chyawanprash',
                slug: 'chyawanprash',
                description: 'Classic immunity booster with 40+ herbs. Strengthens immunity, improves digestion, and provides energy. 500g jar.',
                price: 499,
                comparePrice: 649,
                stock: 60,
                categoryId: productCategories[1].id,
                imageUrls: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500'],
                isActive: true,
                isFeatured: true,
            },
        }),
        
        // Skincare
        prisma.product.create({
            data: {
                name: 'Neem Face Wash',
                slug: 'neem-face-wash',
                description: 'Gentle face wash with neem and tulsi. Fights acne, purifies skin, and maintains natural pH balance. 100ml.',
                price: 249,
                comparePrice: 349,
                stock: 120,
                categoryId: productCategories[2].id,
                imageUrls: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500'],
                isActive: true,
                isFeatured: false,
            },
        }),

        prisma.product.create({
            data: {
                name: 'Turmeric Face Pack',
                slug: 'turmeric-face-pack',
                description: 'Natural face pack with turmeric and sandalwood. Brightens skin, reduces blemishes, and gives a natural glow. 50g.',
                price: 199,
                comparePrice: 299,
                stock: 90,
                categoryId: productCategories[2].id,
                imageUrls: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500'],
                isActive: true,
                isFeatured: false,
            },
        }),
        prisma.product.create({
            data: {
                name: 'Rose Water Toner',
                slug: 'rose-water-toner',
                description: 'Pure rose water for refreshing and toning. Hydrates skin, tightens pores, and provides a natural glow. 200ml.',
                price: 299,
                comparePrice: 399,
                stock: 75,
                categoryId: productCategories[2].id,
                imageUrls: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500'],
                isActive: true,
                isFeatured: true,
            },
        }),
        
        // Wellness Teas
        prisma.product.create({
            data: {
                name: 'Tulsi Green Tea',
                slug: 'tulsi-green-tea',
                description: 'Organic green tea with holy basil. Boosts immunity, reduces stress, and aids digestion. 25 tea bags.',
                price: 349,
                comparePrice: 449,
                stock: 100,
                categoryId: productCategories[3].id,
                imageUrls: ['https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500'],
                isActive: true,
                isFeatured: false,
            },
        }),
    ]);
    console.log(`✅ Created ${products.length} products\n`);


    // ============================================
    // 4. THERAPIES
    // ============================================
    console.log('💆 Creating therapies...');
    const therapies = await Promise.all([
        prisma.therapy.create({
            data: {
                name: 'Abhyanga',
                slug: 'abhyanga',
                description: 'Traditional full-body oil massage with warm herbal oils. Promotes relaxation, improves circulation, and nourishes the skin.',
                durationMinutes: 60,
                basePrice: 2500,
                categoryId: therapyCategory.id,
                imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500',
                isActive: true,
                isFeatured: true,
            },
        }),
        prisma.therapy.create({
            data: {
                name: 'Shirodhara',
                slug: 'shirodhara',
                description: 'Continuous stream of warm oil poured on the forehead. Deeply calming therapy for mental clarity and stress relief.',
                durationMinutes: 45,
                basePrice: 3500,
                categoryId: therapyCategory.id,
                imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500',
                isActive: true,
                isFeatured: true,
            },
        }),
        prisma.therapy.create({
            data: {
                name: 'Panchakarma',
                slug: 'panchakarma',
                description: 'Complete detoxification and rejuvenation program. Five-step cleansing process to eliminate toxins and restore balance.',
                durationMinutes: 120,
                basePrice: 8500,
                categoryId: therapyCategory.id,
                imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500',
                isActive: true,
                isFeatured: true,
            },
        }),

        prisma.therapy.create({
            data: {
                name: 'Nasya',
                slug: 'nasya',
                description: 'Nasal therapy with medicated oils. Clears sinuses, improves breathing, and enhances mental clarity.',
                durationMinutes: 30,
                basePrice: 1500,
                categoryId: therapyCategory.id,
                imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500',
                isActive: true,
                isFeatured: false,
            },
        }),
        prisma.therapy.create({
            data: {
                name: 'Kati Basti',
                slug: 'kati-basti',
                description: 'Warm oil therapy for lower back pain. Oil is retained on the lower back to relieve pain and stiffness.',
                durationMinutes: 45,
                basePrice: 2000,
                categoryId: therapyCategory.id,
                imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500',
                isActive: true,
                isFeatured: false,
            },
        }),
    ]);
    console.log(`✅ Created ${therapies.length} therapies\n`);

    // ============================================
    // 5. PACKAGES
    // ============================================
    console.log('📦 Creating packages...');
    const packages = await Promise.all([
        prisma.package.create({
            data: {
                name: 'Stress Relief Package',
                slug: 'stress-relief-package',
                description: 'Complete stress management program with Abhyanga and Shirodhara. Perfect for busy professionals.',
                totalPrice: 15000,
                originalPrice: 20000,
                isActive: true,
            },
        }),

        prisma.package.create({
            data: {
                name: 'Detox & Rejuvenation',
                slug: 'detox-rejuvenation',
                description: 'Comprehensive detox program with Panchakarma and dietary guidance. Restore your natural balance.',
                totalPrice: 35000,
                originalPrice: 45000,
                isActive: true,
            },
        }),
        prisma.package.create({
            data: {
                name: 'Pain Management Package',
                slug: 'pain-management',
                description: 'Specialized program for chronic pain relief. Combines multiple therapies for lasting results.',
                totalPrice: 18000,
                originalPrice: 24000,
                isActive: true,
            },
        }),
    ]);
    console.log(`✅ Created ${packages.length} packages\n`);

    // ============================================
    // 6. GALLERY ITEMS
    // ============================================
    console.log('🖼️  Creating gallery items...');
    const galleryItems = await Promise.all([
        prisma.galleryItem.create({
            data: {
                type: 'PHOTO',
                url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800',
                category: 'Clinic Interior',
                caption: 'Reception Area',
                sortOrder: 1,
                isActive: true,
            },
        }),
        prisma.galleryItem.create({
            data: {
                type: 'PHOTO',
                url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
                category: 'Clinic Interior',
                caption: 'Treatment Room',
                sortOrder: 2,
                isActive: true,
            },
        }),

        prisma.galleryItem.create({
            data: {
                type: 'PHOTO',
                url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
                category: 'Therapy Sessions',
                caption: 'Abhyanga Therapy',
                sortOrder: 3,
                isActive: true,
            },
        }),
        prisma.galleryItem.create({
            data: {
                type: 'PHOTO',
                url: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800',
                category: 'Therapy Sessions',
                caption: 'Shirodhara Treatment',
                sortOrder: 4,
                isActive: true,
            },
        }),
    ]);
    console.log(`✅ Created ${galleryItems.length} gallery items\n`);

    // ============================================
    // 7. BLOG POSTS
    // ============================================
    console.log('📝 Creating blog posts...');
    const blogPosts = await Promise.all([
        prisma.blogPost.create({
            data: {
                title: '10 Benefits of Daily Abhyanga Massage',
                slug: '10-benefits-daily-abhyanga',
                excerpt: 'Discover how this ancient Ayurvedic practice can transform your health and wellbeing.',
                content: '<h2>Introduction</h2><p>Abhyanga, the traditional Ayurvedic oil massage, has been practiced for thousands of years.</p>',
                imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
                tags: ['massage', 'abhyanga', 'wellness'],
                status: 'PUBLISHED',
                authorId: admin.id,
                publishedAt: new Date('2026-02-15'),
            },
        }),

        prisma.blogPost.create({
            data: {
                title: 'Understanding Your Dosha: A Beginner\'s Guide',
                slug: 'understanding-your-dosha',
                excerpt: 'Learn about the three doshas - Vata, Pitta, and Kapha - and how they influence your health.',
                content: '<h2>What are Doshas?</h2><p>In Ayurveda, doshas are the three fundamental energies that govern our physical and mental processes.</p>',
                imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
                tags: ['dosha', 'ayurveda', 'health'],
                status: 'PUBLISHED',
                authorId: admin.id,
                publishedAt: new Date('2026-02-20'),
            },
        }),
    ]);
    console.log(`✅ Created ${blogPosts.length} blog posts\n`);

    // ============================================
    // 8. REVIEWS
    // ============================================
    console.log('⭐ Creating reviews...');
    const reviews = await Promise.all([
        prisma.review.create({
            data: {
                productId: products[0].id,
                patientName: 'Priya Sharma',
                rating: 5,
                comment: 'Excellent hair oil! My hair fall has reduced significantly after using this for 2 months.',
                status: 'APPROVED',
            },
        }),
        prisma.review.create({
            data: {
                productId: products[1].id,
                patientName: 'Rajesh Kumar',
                rating: 5,
                comment: 'Amazing face oil! My skin is glowing and dark spots are fading. Highly recommend!',
                status: 'APPROVED',
            },
        }),
        prisma.review.create({
            data: {
                productId: products[3].id,
                patientName: 'Anita Desai',
                rating: 5,
                comment: 'Best Ashwagandha capsules I have tried. Feeling more energetic and less stressed.',
                status: 'APPROVED',
            },
        }),
    ]);
    console.log(`✅ Created ${reviews.length} reviews\n`);


    // ============================================
    // 9. SAMPLE ORDERS
    // ============================================
    console.log('🛒 Creating sample orders...');
    const orders = await Promise.all([
        prisma.order.create({
            data: {
                patientName: 'Amit Verma',
                phone: '+91 98765 43210',
                email: 'amit.verma@example.com',
                status: 'DELIVERED',
                items: [
                    {
                        productId: products[0].id,
                        name: products[0].name,
                        quantity: 2,
                        price: Number(products[0].price),
                    },
                    {
                        productId: products[3].id,
                        name: products[3].name,
                        quantity: 1,
                        price: Number(products[3].price),
                    },
                ],
                totalAmount: Number(products[0].price) * 2 + Number(products[3].price) + 100,
                shippingAddress: {
                    line1: '123 MG Road',
                    city: 'Bangalore',
                    state: 'Karnataka',
                    pinCode: '560001',
                },
                paymentMethod: 'UPI',
                paymentStatus: 'PAID',
            },
        }),
        prisma.order.create({
            data: {
                patientName: 'Sneha Reddy',
                phone: '+91 98765 43211',
                email: 'sneha.reddy@example.com',
                status: 'CONFIRMED',
                items: [
                    {
                        productId: products[6].id,
                        name: products[6].name,
                        quantity: 1,
                        price: Number(products[6].price),
                    },
                ],
                totalAmount: Number(products[6].price) + 100,
                shippingAddress: {
                    line1: '456 Park Street',
                    city: 'Mumbai',
                    state: 'Maharashtra',
                    pinCode: '400001',
                },
                paymentMethod: 'CASH',
                paymentStatus: 'PENDING',
            },
        }),
    ]);
    console.log(`✅ Created ${orders.length} sample orders\n`);


    // ============================================
    // 10. SAMPLE APPOINTMENTS
    // ============================================
    console.log('📅 Creating sample appointments...');
    const appointments = await Promise.all([
        prisma.appointment.create({
            data: {
                patientName: 'Rahul Mehta',
                phone: '+91 98765 43212',
                email: 'rahul.mehta@example.com',
                therapyId: therapies[0].id,
                preferredDate: new Date('2026-03-05'),
                preferredTime: '10:00 AM',
                status: 'CONFIRMED',
                notes: 'First time visitor, interested in stress relief',
            },
        }),
        prisma.appointment.create({
            data: {
                patientName: 'Kavita Joshi',
                phone: '+91 98765 43213',
                email: 'kavita.joshi@example.com',
                therapyId: therapies[1].id,
                preferredDate: new Date('2026-03-06'),
                preferredTime: '2:00 PM',
                status: 'CONFIRMED',
                notes: 'Returning client, prefers afternoon slots',
            },
        }),
        prisma.appointment.create({
            data: {
                patientName: 'Sanjay Gupta',
                phone: '+91 98765 43214',
                email: 'sanjay.gupta@example.com',
                therapyId: therapies[4].id,
                preferredDate: new Date('2026-03-07'),
                preferredTime: '11:00 AM',
                status: 'PENDING',
                notes: 'Chronic lower back pain, referred by friend',
            },
        }),
    ]);
    console.log(`✅ Created ${appointments.length} sample appointments\n`);


    // ============================================
    // 11. CONTACT MESSAGES
    // ============================================
    console.log('📧 Creating contact messages...');
    const contacts = await Promise.all([
        prisma.contactMessage.create({
            data: {
                name: 'Deepak Sharma',
                email: 'deepak.sharma@example.com',
                phone: '+91 98765 43215',
                subject: 'Inquiry about Panchakarma',
                message: 'I am interested in the Panchakarma detox program. Could you please provide more details about the duration and what it includes?',
                isRead: false,
            },
        }),
        prisma.contactMessage.create({
            data: {
                name: 'Pooja Nair',
                email: 'pooja.nair@example.com',
                phone: '+91 98765 43216',
                subject: 'Product Availability',
                message: 'Is the Kumkumadi Tailam currently in stock? I would like to purchase 2 bottles.',
                isRead: true,
            },
        }),
    ]);
    console.log(`✅ Created ${contacts.length} contact messages\n`);

    // ============================================
    // SUMMARY
    // ============================================
    console.log('═══════════════════════════════════════');
    console.log('🎉 Database seeding completed successfully!\n');
    console.log('Summary:');
    console.log(`  👤 Admin users: 1`);
    console.log(`  📁 Categories: ${productCategories.length + 1}`);
    console.log(`  🛍️  Products: ${products.length}`);
    console.log(`  💆 Therapies: ${therapies.length}`);
    console.log(`  📦 Packages: ${packages.length}`);
    console.log(`  🖼️  Gallery items: ${galleryItems.length}`);
    console.log(`  📝 Blog posts: ${blogPosts.length}`);
    console.log(`  ⭐ Reviews: ${reviews.length}`);
    console.log(`  🛒 Orders: ${orders.length}`);
    console.log(`  📅 Appointments: ${appointments.length}`);
    console.log(`  📧 Contact messages: ${contacts.length}`);
    console.log('═══════════════════════════════════════\n');
    
    console.log('✅ You can now login to admin panel with:');
    console.log('   Email: dr.ipinder@bhartiveda.com');
    console.log('   Password: password123\n');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
