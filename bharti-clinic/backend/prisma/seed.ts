import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient().$extends(withAccelerate());

async function main() {
    console.log('Start seeding all models...');

    // 1. Users
    const passwordHash = await bcrypt.hash('password123', 10);
    const adminUser = await prisma.user.upsert({
        where: { email: 'dr.ipinder@bhartiveda.com' },
        update: {},
        create: {
            email: 'dr.ipinder@bhartiveda.com',
            name: 'Dr. Ipinder Bharti',
            passwordHash,
            role: 'ADMIN',
        },
    });

    const staffUser = await prisma.user.upsert({
        where: { email: 'staff@bhartiveda.com' },
        update: {},
        create: {
            email: 'staff@bhartiveda.com',
            name: 'Clinic Receptionist',
            passwordHash,
            role: 'STAFF',
        },
    });

    const patientUser = await prisma.user.upsert({
        where: { email: 'patient@example.com' },
        update: {},
        create: {
            email: 'patient@example.com',
            name: 'Jane Doe',
            passwordHash,
            role: 'USER',
        },
    });
    console.log('Users seeded');

    // 2. Categories
    const immunityCategory = await prisma.category.upsert({
        where: { slug: 'daily-nutrition-immunity' },
        update: {},
        create: {
            name: 'Daily Nutrition & Immunity',
            slug: 'daily-nutrition-immunity',
            type: 'PRODUCT',
        },
    });

    const jointCareCategory = await prisma.category.upsert({
        where: { slug: 'joint-bone-care' },
        update: {},
        create: {
            name: 'Joint & Bone Care',
            slug: 'joint-bone-care',
            type: 'PRODUCT',
        },
    });

    const panchkarmaCategory = await prisma.category.upsert({
        where: { slug: 'panchkarma' },
        update: {},
        create: {
            name: 'Panchkarma Therapy',
            slug: 'panchkarma',
            type: 'THERAPY',
        },
    });
    console.log('Categories seeded');

    // 3. Products
    const product1 = await prisma.product.upsert({
        where: { slug: 'chawanprash-gold' },
        update: { imageUrls: ['/images/products/chawanprash-gold.png'] },
        create: {
            name: 'Chawanprash GOLD',
            slug: 'chawanprash-gold',
            description: '500 GM authentic formulation for daily immunity.',
            price: 1470,
            comparePrice: 1490,
            stock: 50,
            categoryId: immunityCategory.id,
            isActive: true,
            isFeatured: true,
            imageUrls: ['/images/products/chawanprash-gold.png']
        },
    });

    const product2 = await prisma.product.upsert({
        where: { slug: 'j3-power' },
        update: { imageUrls: ['/images/products/j3-power.png'] },
        create: {
            name: 'Bharti Veda J3 Power',
            slug: 'j3-power',
            description: '60 Tablets for joint and bone strength.',
            price: 1305,
            comparePrice: 1580,
            stock: 30,
            categoryId: jointCareCategory.id,
            isActive: true,
            isFeatured: true,
            imageUrls: ['/images/products/j3-power.png']
        },
    });
    console.log('Products seeded');

    // 4. Therapies
    const therapy1 = await prisma.therapy.upsert({
        where: { slug: 'vaman-karma' },
        update: {},
        create: {
            name: 'Vaman Karma',
            slug: 'vaman-karma',
            description: 'Lungs Detox & Cleansing.',
            durationMinutes: 60,
            basePrice: 9999,
            discountedPrice: 6999,
            categoryId: panchkarmaCategory.id,
            isActive: true,
            isFeatured: true,
            imageUrl: 'https://example.com/vaman.jpg'
        },
    });

    const therapy2 = await prisma.therapy.upsert({
        where: { slug: 'nasya-karma' },
        update: {},
        create: {
            name: 'Nasya Karma Therapy',
            slug: 'nasya-karma',
            description: 'For Sinusitis, Migraine & Headache.',
            durationMinutes: 45,
            basePrice: 9999,
            discountedPrice: 6999,
            categoryId: panchkarmaCategory.id,
            isActive: true,
            isFeatured: false,
        },
    });
    console.log('Therapies seeded');

    // 5. Packages
    const detoxPackage = await prisma.package.upsert({
        where: { slug: 'complete-detox-pkg' },
        update: {},
        create: {
            name: 'Complete Detox Package',
            slug: 'complete-detox-pkg',
            description: 'Includes Vaman Karma and Nasya Karma.',
            originalPrice: 19998,
            totalPrice: 12999,
            isActive: true,
            therapies: {
                create: [
                    { therapy: { connect: { id: therapy1.id } } },
                    { therapy: { connect: { id: therapy2.id } } },
                ]
            }
        },
    });
    console.log('Packages seeded');

    // 6. Orders
    // Check if order exists to avoid duplicate on re-seeding
    const existingOrder = await prisma.order.findFirst({ where: { email: 'patient@example.com' } });
    if (!existingOrder) {
        await prisma.order.create({
            data: {
                patientName: 'Jane Doe',
                phone: '9876543210',
                email: 'patient@example.com',
                status: 'DELIVERED',
                items: [
                    { productId: product1.id, name: product1.name, price: Number(product1.price), quantity: 1 }
                ],
                totalAmount: 1470,
                shippingAddress: { line1: '123 Wellness Way', city: 'Mohali', state: 'Punjab', pinCode: '140307' },
                paymentMethod: 'UPI',
                paymentStatus: 'PAID',
            }
        });
        console.log('Orders seeded');
    }

    // 7. Appointments
    const existingAppointment = await prisma.appointment.findFirst({ where: { email: 'john@example.com' } });
    if (!existingAppointment) {
        await prisma.appointment.create({
            data: {
                patientName: 'John Smith',
                phone: '8765432109',
                email: 'john@example.com',
                therapyId: therapy1.id,
                preferredDate: new Date('2024-05-15T00:00:00Z'),
                preferredTime: '10:00 AM',
                status: 'CONFIRMED',
                notes: 'First time Panchkarma patient.',
            }
        });
        console.log('Appointments seeded');
    }

    // 8. GalleryItems
    console.log('Seeding gallery items...');
    await prisma.galleryItem.deleteMany();
    await prisma.galleryItem.createMany({
        data: [
            {
                type: 'PHOTO',
                url: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?q=80&w=2000',
                category: 'Clinic Interior',
                caption: 'Our modern waiting lounge designed for comfort and tranquility.',
                sortOrder: 1
            },
            {
                type: 'PHOTO',
                url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2000',
                category: 'Therapy Sessions',
                caption: 'Traditional Abhyanga massage being performed by our experts.',
                sortOrder: 2
            },
            {
                type: 'PHOTO',
                url: 'https://images.unsplash.com/photo-1643194042294-f25b2909f19e?q=80&w=2000',
                category: 'Products',
                caption: 'Authentic Ayurvedic herbs used in our medicine preparation.',
                sortOrder: 3
            },
            {
                type: 'PHOTO',
                url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc2069?q=80&w=2000',
                category: 'Clinic Interior',
                caption: 'The treatment room layout for Shirodhara therapy.',
                sortOrder: 4
            },
            {
                type: 'PHOTO',
                url: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2ad46?q=80&w=2000',
                category: 'Team & Doctors',
                caption: 'Our lead Ayurvedic physicians in a consultation session.',
                sortOrder: 5
            },
            {
                type: 'PHOTO',
                url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000',
                category: 'Events',
                caption: 'Ayurveda Awareness Seminar 2024.',
                sortOrder: 6
            },
            {
                type: 'VIDEO',
                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                thumbnailUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600',
                category: 'Therapy Sessions',
                caption: 'Understanding the benefits of Panchakarma detoxification.',
                sortOrder: 7
            },
            {
                type: 'VIDEO',
                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                thumbnailUrl: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?q=80&w=600',
                category: 'Clinic Interior',
                caption: 'A virtual tour of Bharti Clinic facilities.',
                sortOrder: 8
            }
        ]
    });
    console.log('GalleryItems seeded');

    // 9. Reviews
    const existingReview = await prisma.review.findFirst({ where: { userId: patientUser.id, productId: product2.id } });
    if (!existingReview) {
        await prisma.review.create({
            data: {
                productId: product2.id,
                userId: patientUser.id,
                patientName: patientUser.name,
                rating: 5,
                comment: 'Amazing product for joint pain! Highly recommended.',
                status: 'APPROVED',
            }
        });
        console.log('Reviews seeded');
    }

    // 10. BlogPosts
    await prisma.blogPost.upsert({
        where: { slug: 'ayurveda-for-womens-health' },
        update: {},
        create: {
            title: 'Ayurveda for Women\'s Health',
            slug: 'ayurveda-for-womens-health',
            content: 'Detailed article content explaining the benefits of Ayurveda...',
            excerpt: 'Learn how Ayurveda provides holistic solutions for women\'s health.',
            tags: ['Women', 'Health', 'Ayurveda'],
            status: 'PUBLISHED',
            authorId: adminUser.id,
            publishedAt: new Date(),
        }
    });
    console.log('BlogPosts seeded');

    // 11. Settings
    await prisma.setting.upsert({
        where: { key: 'site_config' },
        update: {},
        create: {
            key: 'site_config',
            type: 'JSON',
            value: JSON.stringify({
                siteName: 'Bharti Veda',
                phone: '+91 82 888 42 777',
                email: 'info.bhartiveda@gmail.com',
                address: 'SCO-5, Panorama Complex, Sector-115, Mohali',
            }),
        }
    });
    console.log('Settings seeded');

    // 12. InventoryLogs
    const existingLog = await prisma.inventoryLog.findFirst({ where: { productId: product1.id } });
    if (!existingLog) {
        await prisma.inventoryLog.create({
            data: {
                productId: product1.id,
                changeAmount: 50,
                newStock: 50,
                reason: 'Initial Restock',
                adminId: adminUser.id,
            }
        });
        console.log('InventoryLogs seeded');
    }

    console.log('Database successfully seeded with comprehensive sample data for all 13 models!');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
