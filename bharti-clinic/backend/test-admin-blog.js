const axios = require('axios');

const BASE_URL = 'http://localhost:5000';
let authToken = '';
let createdPostId = '';

// Test credentials
const ADMIN_EMAIL = 'dr.ipinder@bhartiveda.com';
const ADMIN_PASSWORD = 'password123';

async function testAdminBlogAPI() {
    console.log('🧪 Testing Admin Blog API Endpoints\n');

    try {
        // 1. Admin Login
        console.log('1️⃣  Testing Admin Login...');
        const loginResponse = await axios.post(`${BASE_URL}/api/admin/login`, {
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD
        });
        
        if (loginResponse.data.success && loginResponse.data.data.token) {
            authToken = loginResponse.data.data.token;
            console.log('   ✅ Login successful');
            console.log(`   Token: ${authToken.substring(0, 20)}...`);
        } else {
            throw new Error('Login failed - no token received');
        }

        // 2. Create Blog Post
        console.log('\n2️⃣  Testing Create Blog Post...');
        const createResponse = await axios.post(
            `${BASE_URL}/api/admin/blog`,
            {
                title: 'Test Blog Post - Ayurvedic Wellness',
                slug: 'test-blog-post-ayurvedic-wellness',
                content: '<h2>Introduction to Ayurvedic Wellness</h2><p>Ayurveda is an ancient system of medicine...</p><p>This is a test post with <strong>rich text</strong> content.</p>',
                excerpt: 'Learn about the ancient wisdom of Ayurveda and how it can transform your health and wellness journey.',
                imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
                tags: ['ayurveda', 'wellness', 'health'],
                status: 'DRAFT'
            },
            {
                headers: { Authorization: `Bearer ${authToken}` }
            }
        );

        if (createResponse.data.success && createResponse.data.data) {
            createdPostId = createResponse.data.data.id;
            console.log('   ✅ Blog post created successfully');
            console.log(`   Post ID: ${createdPostId}`);
            console.log(`   Title: ${createResponse.data.data.title}`);
            console.log(`   Status: ${createResponse.data.data.status}`);
        } else {
            throw new Error('Failed to create blog post');
        }

        // 3. Get All Posts
        console.log('\n3️⃣  Testing Get All Blog Posts...');
        const getAllResponse = await axios.get(
            `${BASE_URL}/api/admin/blog`,
            {
                headers: { Authorization: `Bearer ${authToken}` }
            }
        );

        if (getAllResponse.data.success) {
            const posts = getAllResponse.data.data.posts || getAllResponse.data.data;
            console.log(`   ✅ Retrieved ${posts.length} blog post(s)`);
            if (posts.length > 0) {
                console.log(`   Latest post: ${posts[0].title}`);
            }
        } else {
            throw new Error('Failed to get blog posts');
        }

        // 4. Get Single Post
        console.log('\n4️⃣  Testing Get Single Blog Post...');
        const getOneResponse = await axios.get(
            `${BASE_URL}/api/admin/blog/${createdPostId}`,
            {
                headers: { Authorization: `Bearer ${authToken}` }
            }
        );

        if (getOneResponse.data.success && getOneResponse.data.data) {
            console.log('   ✅ Retrieved blog post successfully');
            console.log(`   Title: ${getOneResponse.data.data.title}`);
            console.log(`   Tags: ${getOneResponse.data.data.tags.join(', ')}`);
        } else {
            throw new Error('Failed to get blog post');
        }

        // 5. Update Blog Post
        console.log('\n5️⃣  Testing Update Blog Post...');
        const updateResponse = await axios.put(
            `${BASE_URL}/api/admin/blog/${createdPostId}`,
            {
                title: 'Updated: Ayurvedic Wellness Guide',
                status: 'PUBLISHED',
                tags: ['ayurveda', 'wellness', 'health', 'holistic']
            },
            {
                headers: { Authorization: `Bearer ${authToken}` }
            }
        );

        if (updateResponse.data.success && updateResponse.data.data) {
            console.log('   ✅ Blog post updated successfully');
            console.log(`   New Title: ${updateResponse.data.data.title}`);
            console.log(`   New Status: ${updateResponse.data.data.status}`);
            console.log(`   Tags: ${updateResponse.data.data.tags.join(', ')}`);
        } else {
            throw new Error('Failed to update blog post');
        }

        // 6. Delete Blog Post
        console.log('\n6️⃣  Testing Delete Blog Post...');
        const deleteResponse = await axios.delete(
            `${BASE_URL}/api/admin/blog/${createdPostId}`,
            {
                headers: { Authorization: `Bearer ${authToken}` }
            }
        );

        if (deleteResponse.data.success) {
            console.log('   ✅ Blog post deleted successfully');
        } else {
            throw new Error('Failed to delete blog post');
        }

        // 7. Verify Deletion
        console.log('\n7️⃣  Verifying Deletion...');
        try {
            await axios.get(
                `${BASE_URL}/api/admin/blog/${createdPostId}`,
                {
                    headers: { Authorization: `Bearer ${authToken}` }
                }
            );
            console.log('   ❌ Post still exists (should have been deleted)');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log('   ✅ Post successfully deleted (404 as expected)');
            } else {
                throw error;
            }
        }

        console.log('\n✅ All Admin Blog API tests passed!\n');

    } catch (error) {
        console.error('\n❌ Test failed:', error.message);
        if (error.response) {
            console.error('   Status:', error.response.status);
            console.error('   Data:', JSON.stringify(error.response.data, null, 2));
        }
        process.exit(1);
    }
}

// Run tests
testAdminBlogAPI();
