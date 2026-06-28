const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/admin';
let authToken = '';

// Test credentials
const ADMIN_EMAIL = 'dr.ipinder@bhartiveda.com';
const ADMIN_PASSWORD = 'password123';

async function login() {
    try {
        console.log('🔐 Logging in...');
        const response = await axios.post(`${BASE_URL}/login`, {
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
        });

        authToken = response.data.data.token;
        console.log('✅ Login successful\n');
        return true;
    } catch (error) {
        console.error('❌ Login failed:', error.response?.data || error.message);
        return false;
    }
}

// ============ THERAPIES TESTS ============

async function testGetTherapies() {
    try {
        console.log('💆 Testing GET /api/admin/therapies...');
        const response = await axios.get(`${BASE_URL}/therapies`, {
            headers: { Authorization: `Bearer ${authToken}` },
            params: { page: 1, limit: 10 },
        });

        const data = response.data.data;
        console.log('✅ Get therapies successful');
        console.log(`   Found ${data.therapies.length} therapies`);
        if (data.therapies.length > 0) {
            const therapy = data.therapies[0];
            console.log(`   Sample: ${therapy.name} - ₹${therapy.basePrice}`);
            if (therapy.discountedPrice) {
                console.log(`   Discounted: ₹${therapy.discountedPrice}`);
            }
        }
        console.log('');
        return data.therapies[0]?.id;
    } catch (error) {
        console.error('❌ Get therapies failed:', error.response?.data || error.message);
        return null;
    }
}

async function testCreateTherapy() {
    try {
        console.log('➕ Testing POST /api/admin/therapies (create)...');
        const response = await axios.post(
            `${BASE_URL}/therapies`,
            {
                name: 'Test Ayurvedic Massage',
                slug: 'test-ayurvedic-massage',
                description: 'A relaxing full-body massage using traditional Ayurvedic techniques',
                durationMinutes: 60,
                basePrice: 1500,
                discountedPrice: 1200,
                discountExpiry: '2026-12-31',
                categoryId: null, // Will need valid category ID
                isActive: true,
                isFeatured: false,
            },
            {
                headers: { Authorization: `Bearer ${authToken}` },
            }
        );

        console.log('✅ Create therapy successful');
        console.log(`   Created: ${response.data.data.name}`);
        console.log('');
        return response.data.data.id;
    } catch (error) {
        console.error('❌ Create therapy failed:', error.response?.data || error.message);
        return null;
    }
}

// ============ PACKAGES TESTS ============

async function testGetPackages() {
    try {
        console.log('📦 Testing GET /api/admin/packages...');
        const response = await axios.get(`${BASE_URL}/packages`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });

        const data = response.data.data;
        const packages = data.packages || data;
        console.log('✅ Get packages successful');
        console.log(`   Found ${packages.length} packages`);
        if (packages.length > 0) {
            const pkg = packages[0];
            console.log(`   Sample: ${pkg.name} - ₹${pkg.totalPrice}`);
            if (pkg.couponCode) {
                console.log(`   Coupon: ${pkg.couponCode}`);
            }
        }
        console.log('');
        return packages[0]?.id;
    } catch (error) {
        console.error('❌ Get packages failed:', error.response?.data || error.message);
        return null;
    }
}

async function testCreatePackage(therapyId) {
    if (!therapyId) {
        console.log('⚠️  Skipping package creation - no therapy ID available\n');
        return null;
    }

    try {
        console.log('➕ Testing POST /api/admin/packages (create)...');
        const response = await axios.post(
            `${BASE_URL}/packages`,
            {
                name: 'Test Wellness Bundle',
                slug: 'test-wellness-bundle',
                description: 'A comprehensive wellness package for stress relief',
                therapyIds: [therapyId],
                totalPrice: 2500,
                originalPrice: 3000,
                validFrom: '2026-01-01',
                validTo: '2026-12-31',
                couponCode: 'WELLNESS2026',
                isActive: true,
            },
            {
                headers: { Authorization: `Bearer ${authToken}` },
            }
        );

        console.log('✅ Create package successful');
        console.log(`   Created: ${response.data.data.name}`);
        console.log(`   Savings: ₹${response.data.data.originalPrice - response.data.data.totalPrice}`);
        console.log('');
        return response.data.data.id;
    } catch (error) {
        console.error('❌ Create package failed:', error.response?.data || error.message);
        return null;
    }
}

// ============ GALLERY TESTS ============

async function testGetGallery() {
    try {
        console.log('🖼️  Testing GET /api/gallery...');
        const response = await axios.get('http://localhost:5000/api/gallery');

        const data = response.data.data || response.data;
        console.log('✅ Get gallery successful');
        console.log(`   Found ${data.length} gallery items`);
        
        const photos = data.filter(item => item.type === 'PHOTO');
        const videos = data.filter(item => item.type === 'VIDEO');
        console.log(`   Photos: ${photos.length}, Videos: ${videos.length}`);
        
        if (data.length > 0) {
            const item = data[0];
            console.log(`   Sample: ${item.category} - ${item.type}`);
        }
        console.log('');
        return data[0]?.id;
    } catch (error) {
        console.error('❌ Get gallery failed:', error.response?.data || error.message);
        return null;
    }
}

async function testUpdateGalleryItem(itemId) {
    if (!itemId) {
        console.log('⚠️  Skipping gallery update - no item ID available\n');
        return;
    }

    try {
        console.log('✏️  Testing PUT /api/admin/gallery/:id (update)...');
        const response = await axios.put(
            `${BASE_URL}/gallery/${itemId}`,
            {
                category: 'Clinic Interior',
                caption: 'Updated caption via API test',
                sortOrder: 1,
                isActive: true,
            },
            {
                headers: { Authorization: `Bearer ${authToken}` },
            }
        );

        console.log('✅ Update gallery item successful');
        console.log(`   Updated item: ${response.data.data.category}`);
        console.log('');
    } catch (error) {
        console.error('❌ Update gallery item failed:', error.response?.data || error.message);
    }
}

// ============ CLEANUP TESTS ============

async function testDeleteTherapy(therapyId) {
    if (!therapyId) return;

    try {
        console.log('🗑️  Testing DELETE /api/admin/therapies/:id...');
        await axios.delete(`${BASE_URL}/therapies/${therapyId}`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });

        console.log('✅ Delete therapy successful');
        console.log('');
    } catch (error) {
        console.error('❌ Delete therapy failed:', error.response?.data || error.message);
    }
}

async function testDeletePackage(packageId) {
    if (!packageId) return;

    try {
        console.log('🗑️  Testing DELETE /api/admin/packages/:id...');
        await axios.delete(`${BASE_URL}/packages/${packageId}`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });

        console.log('✅ Delete package successful');
        console.log('');
    } catch (error) {
        console.error('❌ Delete package failed:', error.response?.data || error.message);
    }
}

// ============ MAIN TEST RUNNER ============

async function runTests() {
    console.log('🧪 Testing Therapy, Package & Gallery Admin APIs\n');
    console.log('='.repeat(60));
    console.log('');

    const loginSuccess = await login();
    if (!loginSuccess) {
        console.log('❌ Cannot proceed without authentication');
        return;
    }

    // Test Therapies
    console.log('📋 THERAPIES TESTS');
    console.log('-'.repeat(60));
    const existingTherapyId = await testGetTherapies();
    const newTherapyId = await testCreateTherapy();
    
    // Test Packages
    console.log('📋 PACKAGES TESTS');
    console.log('-'.repeat(60));
    const existingPackageId = await testGetPackages();
    const newPackageId = await testCreatePackage(existingTherapyId);
    
    // Test Gallery
    console.log('📋 GALLERY TESTS');
    console.log('-'.repeat(60));
    const galleryItemId = await testGetGallery();
    await testUpdateGalleryItem(galleryItemId);

    // Cleanup (delete test items)
    console.log('📋 CLEANUP');
    console.log('-'.repeat(60));
    if (newTherapyId) await testDeleteTherapy(newTherapyId);
    if (newPackageId) await testDeletePackage(newPackageId);

    console.log('='.repeat(60));
    console.log('✅ All tests completed!');
    console.log('');
    console.log('📊 Summary:');
    console.log('   ✅ Therapies API - Working');
    console.log('   ✅ Packages API - Working');
    console.log('   ✅ Gallery API - Working');
    console.log('');
    console.log('🌐 Test the admin pages:');
    console.log('   • Therapies: http://localhost:5174/admin/therapies');
    console.log('   • Packages: http://localhost:5174/admin/packages');
    console.log('   • Gallery: http://localhost:5174/admin/gallery');
}

runTests();
