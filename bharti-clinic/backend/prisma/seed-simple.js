const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting comprehensive database seeding...\n');

    try {
        // 1. Create or Update Admin User
        console.log('👤 Creating/updating admin user...');
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

        // 2. Create Categories
        console.log('\n📁 Creating categories...');
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
        console.log('✅ Category ready:', oilCategory.name);

        const powderCategory = await prisma.category.upsert({
            where: { slug: 'herbal-powders' },
            update: {},
            create: {
                name: 'Herbal Powders',
                slug: 'herbal-powders',
                type: 'PRODUCT',
                imageUrl: 'https://images.unsplash.com/photo-1505944357793-3b0f9e1b7a2e?w=500',
            },
        });
        console.log('✅ Category ready:', powderCategory.name);

        const supplementCategory = await prisma.category.upsert({
            where: { slug: 'supplements' },
            update: {},
            create: {
                name: 'Supplements',
                slug: 'supplements',
                type: 'PRODUCT',
                imageUrl: 'https://images.unsplash.com/photo-1550572017-4e6c5b0c3b3c?w=500',
            },
        });
        console.log('✅ Category ready:', supplementCategory.name);

        const therapyCategory = await prisma.category.upsert({
            where: { slug: 'panchakarma-therapies' },
            update: {},
            create: {
                name: 'Panchakarma Therapies',
                slug: 'panchakarma-therapies',
                type: 'THERAPY',
                imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500',
            },
        });
        console.log('✅ Category ready:', therapyCategory.name);

        const massageCategory = await prisma.category.upsert({
            where: { slug: 'massage-therapies' },
            update: {},
            create: {
                name: 'Massage Therapies',
                slug: 'massage-therapies',
                type: 'THERAPY',
                imageUrl: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=500',
            },
        });
        console.log('✅ Category ready:', massageCategory.name);

        // 3. Create Products
        console.log('\n🛍️  Creating products...');
        const products = [];
        
        const product1 = await prisma.product.upsert({
            where: { slug: 'brahmi-hair-oil' },
            update: {},
            create: {
                name: 'Brahmi Hair Oil',
                slug: 'brahmi-hair-oil',
                sku: 'BHO-001',
                description: 'Pure Brahmi oil for hair growth and scalp health. Enriched with natural herbs.',
                ingredients: 'Brahmi extract, Coconut oil, Amla, Bhringraj',
                howToUse: 'Apply to scalp and hair, massage gently. Leave for 30 minutes before washing.',
                price: 599,
                comparePrice: 799,
                stock: 50,
                categoryId: oilCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500'],
                isActive: true,
                isFeatured: true,
            },
        });
        products.push(product1);
        console.log('✅ Product ready:', product1.name);

        const product2 = await prisma.product.upsert({
            where: { slug: 'kumkumadi-tailam' },
            update: {},
            create: {
                name: 'Kumkumadi Tailam',
                slug: 'kumkumadi-tailam',
                sku: 'KT-002',
                description: 'Luxurious face oil with saffron for glowing skin and anti-aging benefits.',
                ingredients: 'Saffron, Sandalwood, Turmeric, Sesame oil',
                howToUse: 'Apply 2-3 drops on clean face at night. Massage gently in circular motions.',
                price: 1299,
                comparePrice: 1599,
                stock: 30,
                categoryId: oilCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500'],
                isActive: true,
                isFeatured: true,
            },
        });
        products.push(product2);
        console.log('✅ Product ready:', product2.name);

        const product3 = await prisma.product.upsert({
            where: { slug: 'triphala-churna' },
            update: {},
            create: {
                name: 'Triphala Churna',
                slug: 'triphala-churna',
                sku: 'TC-003',
                description: 'Traditional Ayurvedic powder for digestive health and detoxification.',
                ingredients: 'Amla, Haritaki, Bibhitaki',
                howToUse: 'Mix 1 teaspoon with warm water before bed.',
                price: 299,
                comparePrice: 399,
                stock: 100,
                categoryId: powderCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1505944357793-3b0f9e1b7a2e?w=500'],
                isActive: true,
                isFeatured: false,
            },
        });
        products.push(product3);
        console.log('✅ Product ready:', product3.name);

        const product4 = await prisma.product.upsert({
            where: { slug: 'ashwagandha-capsules' },
            update: {},
            create: {
                name: 'Ashwagandha Capsules',
                slug: 'ashwagandha-capsules',
                sku: 'AC-004',
                description: 'Premium Ashwagandha extract for stress relief and vitality.',
                ingredients: 'Ashwagandha root extract (500mg per capsule)',
                howToUse: 'Take 1-2 capsules daily with milk or water after meals.',
                price: 899,
                comparePrice: 1099,
                stock: 75,
                categoryId: supplementCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1550572017-4e6c5b0c3b3c?w=500'],
                isActive: true,
                isFeatured: true,
            },
        });
        products.push(product4);
        console.log('✅ Product ready:', product4.name);

        const product5 = await prisma.product.upsert({
            where: { slug: 'neem-face-pack' },
            update: {},
            create: {
                name: 'Neem Face Pack',
                slug: 'neem-face-pack',
                sku: 'NFP-005',
                description: 'Natural neem powder for acne-free, clear skin.',
                ingredients: 'Neem leaves powder, Turmeric, Multani mitti',
                howToUse: 'Mix with rose water, apply on face for 15 minutes, rinse with water.',
                price: 249,
                stock: 60,
                categoryId: powderCategory.id,
                imageUrls: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500'],
                isActive: true,
                isFeatured: false,
            },
        });
        products.push(product5);
        console.log('✅ Product ready:', product5.name);

        // 4. Create Therapies
        console.log('\n💆 Creating therapies...');
        const therapies = [];

        const therapy1 = await prisma.therapy.upsert({
            where: { slug: 'abhyanga' },
            update: {},
            create: {
                name: 'Abhyanga',
                slug: 'abhyanga',
                description: 'Traditional full-body oil massage with warm herbal oils for deep relaxation and rejuvenation.',
                durationMinutes: 60,
                basePrice: 2500,
                categoryId: massageCategory.id,
                imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500',
                isActive: true,
                isFeatured: true,
            },
        });
        therapies.push(therapy1);
        console.log('✅ Therapy ready:', therapy1.name);

        const therapy2 = await prisma.therapy.upsert({
            where: { slug: 'shirodhara' },
            update: {},
            create: {
                name: 'Shirodhara',
                slug: 'shirodhara',
                description: 'Continuous stream of warm oil poured on the forehead for mental clarity and stress relief.',
                durationMinutes: 45,
                basePrice: 3000,
                discountedPrice: 2700,
                categoryId: therapyCategory.id,
                imageUrl: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=500',
                isActive: true,
                isFeatured: true,
            },
        });
        therapies.push(therapy2);
        console.log('✅ Therapy ready:', therapy2.name);

        const therapy3 = await prisma.therapy.upsert({
            where: { slug: 'nasya' },
            update: {},
            create: {
                name: 'Nasya',
                slug: 'nasya',
                description: 'Nasal therapy for clearing sinuses and improving respiratory health.',
                durationMinutes: 30,
                basePrice: 1500,
                categoryId: therapyCategory.id,
                imageUrl: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=500',
                isActive: true,
                isFeatured: false,
            },
        });
        therapies.push(therapy3);
        console.log('✅ Therapy ready:', therapy3.name);

        const therapy4 = await prisma.therapy.upsert({
            where: { slug: 'kati-basti' },
            update: {},
            create: {
                name: 'Kati Basti',
                slug: 'kati-basti',
                description: 'Warm oil therapy for lower back pain and spinal health.',
                durationMinutes: 40,
                basePrice: 2000,
                categoryId: therapyCategory.id,
                imageUrl: 'https://images.unsplash.com/photo-1591343395902-bce56b6e3e0a?w=500',
                isActive: true,
                isFeatured: false,
            },
        });
        therapies.push(therapy4);
        console.log('✅ Therapy ready:', therapy4.name);

        // 5. Create Packages
        console.log('\n📦 Creating therapy packages...');
        const package1 = await prisma.package.upsert({
            where: { slug: 'stress-relief-package' },
            update: {},
            create: {
                name: 'Stress Relief Package',
                slug: 'stress-relief-package',
                description: 'Complete relaxation package with Abhyanga and Shirodhara for ultimate stress relief.',
                totalPrice: 4800,
                originalPrice: 5500,
                isActive: true,
            },
        });
        
        // Create package therapies if they don't exist
        await prisma.packageTherapy.upsert({
            where: {
                packageId_therapyId: {
                    packageId: package1.id,
                    therapyId: therapy1.id,
                },
            },
            update: {},
            create: {
                packageId: package1.id,
                therapyId: therapy1.id,
            },
        });
        
        await prisma.packageTherapy.upsert({
            where: {
                packageId_therapyId: {
                    packageId: package1.id,
                    therapyId: therapy2.id,
                },
            },
            update: {},
            create: {
                packageId: package1.id,
                therapyId: therapy2.id,
            },
        });
        console.log('✅ Package ready:', package1.name);

        const package2 = await prisma.package.upsert({
            where: { slug: 'detox-package' },
            update: {},
            create: {
                name: 'Detox Package',
                slug: 'detox-package',
                description: 'Comprehensive detoxification with Panchakarma therapies.',
                totalPrice: 4000,
                originalPrice: 4500,
                couponCode: 'DETOX20',
                isActive: true,
            },
        });
        
        await prisma.packageTherapy.upsert({
            where: {
                packageId_therapyId: {
                    packageId: package2.id,
                    therapyId: therapy2.id,
                },
            },
            update: {},
            create: {
                packageId: package2.id,
                therapyId: therapy2.id,
            },
        });
        
        await prisma.packageTherapy.upsert({
            where: {
                packageId_therapyId: {
                    packageId: package2.id,
                    therapyId: therapy3.id,
                },
            },
            update: {},
            create: {
                packageId: package2.id,
                therapyId: therapy3.id,
            },
        });
        console.log('✅ Package ready:', package2.name);

        // 6. Create Gallery Items
        console.log('\n🖼️  Creating gallery items...');
        await prisma.galleryItem.create({
            data: {
                type: 'PHOTO',
                url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
                thumbnailUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300',
                category: 'Therapies',
                caption: 'Abhyanga massage therapy session',
                sortOrder: 1,
                isActive: true,
            },
        });
        console.log('✅ Gallery item created');

        await prisma.galleryItem.create({
            data: {
                type: 'PHOTO',
                url: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800',
                thumbnailUrl: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=300',
                category: 'Clinic',
                caption: 'Our peaceful treatment room',
                sortOrder: 2,
                isActive: true,
            },
        });
        console.log('✅ Gallery item created');

        // 7. Create Sample Reviews
        console.log('\n⭐ Creating product reviews...');
        await prisma.review.create({
            data: {
                productId: product1.id,
                patientName: 'Priya Sharma',
                rating: 5,
                comment: 'Excellent hair oil! My hair fall has reduced significantly after using this for 2 months.',
                status: 'APPROVED',
            },
        });
        console.log('✅ Review created');

        await prisma.review.create({
            data: {
                productId: product2.id,
                patientName: 'Rajesh Kumar',
                rating: 5,
                comment: 'Amazing face oil! My skin is glowing and the dark spots are fading.',
                status: 'APPROVED',
            },
        });
        console.log('✅ Review created');

        await prisma.review.create({
            data: {
                productId: product4.id,
                patientName: 'Anita Desai',
                rating: 4,
                comment: 'Good quality Ashwagandha. Helps with my stress and sleep.',
                status: 'APPROVED',
            },
        });
        console.log('✅ Review created');

        // 8. Create Blog Posts
        console.log('\n📝 Creating blog posts...');
        await prisma.blogPost.create({
            data: {
                title: 'Benefits of Ayurvedic Hair Care',
                slug: 'benefits-of-ayurvedic-hair-care',
                excerpt: 'Discover how traditional Ayurvedic oils can transform your hair health naturally.',
                content: 'Ayurvedic hair care has been practiced for thousands of years in India. Using natural herbs like Brahmi, Bhringraj, and Amla, these treatments nourish the scalp and promote healthy hair growth...',
                imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800',
                tags: ['hair-care', 'ayurveda', 'natural-remedies'],
                status: 'PUBLISHED',
                authorId: admin.id,
                publishedAt: new Date(),
            },
        });
        console.log('✅ Blog post created');

        await prisma.blogPost.create({
            data: {
                title: 'Understanding Panchakarma Therapy',
                slug: 'understanding-panchakarma-therapy',
                excerpt: 'A comprehensive guide to Panchakarma, the ultimate Ayurvedic detoxification process.',
                content: 'Panchakarma is a cornerstone of Ayurvedic medicine, offering deep cleansing and rejuvenation. This five-step process removes toxins and restores balance to the body...',
                imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
                tags: ['panchakarma', 'detox', 'therapy'],
                status: 'PUBLISHED',
                authorId: admin.id,
                publishedAt: new Date(),
            },
        });
        console.log('✅ Blog post created');

        // 9. Create Sample Orders
        console.log('\n🛒 Creating sample orders...');
        await prisma.order.create({
            data: {
                patientName: 'Amit Patel',
                phone: '+91-9876543210',
                email: 'amit.patel@example.com',
                status: 'DELIVERED',
                items: JSON.stringify([
                    { productId: product1.id, name: product1.name, quantity: 2, price: 599 }
                ]),
                totalAmount: 1198,
                shippingAddress: JSON.stringify({
                    street: '123 MG Road',
                    city: 'Mumbai',
                    state: 'Maharashtra',
                    pincode: '400001'
                }),
                paymentMethod: 'razorpay',
                paymentStatus: 'PAID',
            },
        });
        console.log('✅ Order created');

        // 10. Create Sample Appointments
        console.log('\n📅 Creating sample appointments...');
        await prisma.appointment.create({
            data: {
                patientName: 'Sneha Reddy',
                phone: '+91-9876543211',
                email: 'sneha.reddy@example.com',
                therapyId: therapy1.id,
                preferredDate: new Date('2026-03-05'),
                preferredTime: '10:00 AM',
                status: 'CONFIRMED',
                notes: 'First time visitor',
            },
        });
        console.log('✅ Appointment created');

        // 11. Create Settings
        console.log('\n⚙️  Creating settings...');
        await prisma.setting.create({
            data: {
                key: 'clinic_name',
                value: 'Bharti Ayurveda Clinic',
                type: 'STRING',
            },
        });
        console.log('✅ Setting created');

        await prisma.setting.create({
            data: {
                key: 'clinic_phone',
                value: '+91-9876543200',
                type: 'STRING',
            },
        });
        console.log('✅ Setting created');

        // 12. Create Contact Messages
        console.log('\n📧 Creating contact messages...');
        await prisma.contactMessage.create({
            data: {
                name: 'Vikram Singh',
                email: 'vikram.singh@example.com',
                phone: '+91-9876543212',
                subject: 'Inquiry about Panchakarma',
                message: 'I would like to know more about your Panchakarma treatments and pricing.',
                isRead: false,
            },
        });
        console.log('✅ Contact message created');

        console.log('\n🎉 Comprehensive database seeding completed successfully!');
        console.log('\n📊 Summary:');
        console.log('   - 1 Admin user');
        console.log('   - 5 Categories (3 product, 2 therapy)');
        console.log('   - 5 Products');
        console.log('   - 4 Therapies');
        console.log('   - 2 Packages');
        console.log('   - 2 Gallery items');
        console.log('   - 3 Reviews');
        console.log('   - 2 Blog posts');
        console.log('   - 1 Order');
        console.log('   - 1 Appointment');
        console.log('   - 2 Settings');
        console.log('   - 1 Contact message');
        console.log('\n🔐 Admin Login:');
        console.log('   Email: dr.ipinder@bhartiveda.com');
        console.log('   Password: password123\n');

    } catch (error) {
        console.error('\n❌ Error seeding database:');
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
