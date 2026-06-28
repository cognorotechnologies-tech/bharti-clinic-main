const axios = require('axios');

async function testSimple() {
    try {
        // Login first
        const loginRes = await axios.post('http://localhost:5000/api/admin/login', {
            email: 'dr.ipinder@bhartiveda.com',
            password: 'password123'
        });
        
        const token = loginRes.data.data.token;
        console.log('✅ Login successful');
        
        // Try to get all posts
        const getRes = await axios.get('http://localhost:5000/api/admin/blog', {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        console.log('✅ GET /api/admin/blog successful');
        console.log('Response:', JSON.stringify(getRes.data, null, 2));
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        }
    }
}

testSimple();
