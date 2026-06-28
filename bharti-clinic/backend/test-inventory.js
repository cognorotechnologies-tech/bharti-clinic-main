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

async function testGetInventory() {
    try {
        console.log('📦 Testing GET /api/admin/inventory...');
        const response = await axios.get(`${BASE_URL}/inventory`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });

        console.log('✅ Get inventory successful');
        console.log(`   Found ${response.data.data.length} products`);
        if (response.data.data.length > 0) {
            console.log(`   Sample: ${response.data.data[0].productName} - Stock: ${response.data.data[0].currentStock}`);
        }
        console.log('');
        return response.data.data[0]?.productId; // Return first product ID for restock test
    } catch (error) {
        console.error('❌ Get inventory failed:', error.response?.data || error.message);
        return null;
    }
}

async function testRestockProduct(productId) {
    if (!productId) {
        console.log('⚠️  Skipping restock test - no product ID available\n');
        return;
    }

    try {
        console.log('📈 Testing POST /api/admin/inventory/log (restock)...');
        const response = await axios.post(
            `${BASE_URL}/inventory/log`,
            {
                productId,
                quantity: 50,
                reason: 'Test restock from supplier',
            },
            {
                headers: { Authorization: `Bearer ${authToken}` },
            }
        );

        console.log('✅ Restock successful');
        console.log(`   Product: ${response.data.data.log.productName}`);
        console.log(`   Change: +${response.data.data.log.change}`);
        console.log(`   New Stock: ${response.data.data.log.newStock}`);
        console.log('');
    } catch (error) {
        console.error('❌ Restock failed:', error.response?.data || error.message);
    }
}

async function testGetInventoryLogs() {
    try {
        console.log('📋 Testing GET /api/admin/inventory/logs...');
        const response = await axios.get(`${BASE_URL}/inventory/logs`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });

        console.log('✅ Get inventory logs successful');
        console.log(`   Found ${response.data.data.length} log entries`);
        if (response.data.data.length > 0) {
            const log = response.data.data[0];
            console.log(`   Latest: ${log.productName} ${log.change > 0 ? '+' : ''}${log.change} → ${log.newStock}`);
        }
        console.log('');
    } catch (error) {
        console.error('❌ Get inventory logs failed:', error.response?.data || error.message);
    }
}

async function runTests() {
    console.log('🧪 Testing Admin Inventory API Endpoints\n');
    console.log('='.repeat(50));
    console.log('');

    const loginSuccess = await login();
    if (!loginSuccess) {
        console.log('❌ Cannot proceed without authentication');
        return;
    }

    const productId = await testGetInventory();
    await testRestockProduct(productId);
    await testGetInventoryLogs();

    console.log('='.repeat(50));
    console.log('✅ All inventory tests completed!');
}

runTests();
