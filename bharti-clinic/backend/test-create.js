const axios = require('axios');

async function testCreate() {
    try {
        // Login first
        const loginRes = await axios.post('http://localhost:5000/api/admin/login', {
            email: 'dr.ipinder@bhartiveda.com',
            password: 'password123'
        });
        
        const token = loginRes.data.data.token;
        console.log('✅ Login successful');
        console.log('Token:', token.substring(0, 30) + '...');
        console.log('User ID from token:', loginRes.data.data.user.id);
        
        // Try to create a post
        console.log('\nAttempting to create blog post...');
        const createRes = await axios.post('http://localhost:5000/api/admin/blog', {
            title: 'Test Post - Ayurvedic Wellness Tips',
            slug: 'test-post-ayurvedic-wellness-tips-' + Date.now(),
            content: '<h2>Introduction</h2><p>This is a test post about Ayurvedic wellness.</p>',
            excerpt: 'A brief introduction to Ayurvedic wellness practices.',
            imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800',
            tags: ['ayurveda', 'wellness', 'test'],
            status: 'DRAFT'
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        console.log('✅ CREATE /api/admin/blog successful');
        console.log('Response:', JSON.stringify(createRes.data, null, 2));
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', JSON.stringify(error.response.data, null, 2));
        }
        if (error.stack) {
            console.error('Stack:', error.stack);
        }
    }
}

testCreate();
