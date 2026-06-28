/**
 * Test script to verify all backend routes are working
 * Run: node test-all-routes.js
 */

const http = require('http');

const BASE_URL = 'http://localhost:5000';
const ADMIN_EMAIL = 'dr.ipinder@bhartiveda.com';
const ADMIN_PASSWORD = 'password123';

let authToken = null;

// Helper function to make HTTP requests
function makeRequest(path, method = 'GET', data = null, headers = {}) {
    return new Promise((resolve, reject) => {
        const url = new URL(path, BASE_URL);
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname + url.search,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(body);
                    resolve({ status: res.statusCode, data: parsed });
                } catch (e) {
                    resolve({ status: res.statusCode, data: body });
                }
            });
        });

        req.on('error', reject);
        
        if (data) {
            req.write(JSON.stringify(data));
        }
        
        req.end();
    });
}

// Test functions
async function testHealthCheck() {
    console.log('\n🔍 Testing: Health Check');
    const result = await makeRequest('/api/health');
    console.log(`   Status: ${result.status} ${result.status === 200 ? '✅' : '❌'}`);
    return result.status === 200;
}

async function testPublicTherapies() {
    console.log('\n🔍 Testing: Public Therapies');
    const result = await makeRequest('/api/therapies');
    console.log(`   Status: ${result.status} ${result.status === 200 ? '✅' : '❌'}`);
    if (result.status === 200) {
        console.log(`   Found: ${result.data.length || 0} therapies`);
    }
    return result.status === 200;
}

async function testCategories() {
    console.log('\n🔍 Testing: Categories (NEW ROUTE)');
    const result = await makeRequest('/api/categories?type=THERAPY');
    console.log(`   Status: ${result.status} ${result.status === 200 ? '✅' : '❌'}`);
    if (result.status === 200) {
        console.log(`   Found: ${result.data.length || 0} categories`);
    }
    return result.status === 200;
}

async function testAdminLogin() {
    console.log('\n🔍 Testing: Admin Login');
    const result = await makeRequest('/api/admin/login', 'POST', {
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD
    });
    console.log(`   Status: ${result.status} ${result.status === 200 ? '✅' : '❌'}`);
    if (result.status === 200 && result.data.token) {
        authToken = result.data.token;
        console.log(`   Token: ${authToken.substring(0, 20)}...`);
        return true;
    }
    return false;
}

async function testAdminDashboard() {
    console.log('\n🔍 Testing: Admin Dashboard KPI');
    if (!authToken) {
        console.log('   ⚠️  Skipped: No auth token');
        return false;
    }
    const result = await makeRequest('/api/admin/dashboard/kpi', 'GET', null, {
        Authorization: `Bearer ${authToken}`
    });
    console.log(`   Status: ${result.status} ${result.status === 200 ? '✅' : '❌'}`);
    return result.status === 200;
}

async function testAdminTherapies() {
    console.log('\n🔍 Testing: Admin Therapies');
    if (!authToken) {
        console.log('   ⚠️  Skipped: No auth token');
        return false;
    }
    const result = await makeRequest('/api/admin/therapies?page=1&limit=10', 'GET', null, {
        Authorization: `Bearer ${authToken}`
    });
    console.log(`   Status: ${result.status} ${result.status === 200 ? '✅' : '❌'}`);
    if (result.status === 200) {
        console.log(`   Total: ${result.data.total || 0} therapies`);
    }
    return result.status === 200;
}

async function testAdminProducts() {
    console.log('\n🔍 Testing: Admin Products');
    if (!authToken) {
        console.log('   ⚠️  Skipped: No auth token');
        return false;
    }
    const result = await makeRequest('/api/admin/products?page=1&limit=10', 'GET', null, {
        Authorization: `Bearer ${authToken}`
    });
    console.log(`   Status: ${result.status} ${result.status === 200 ? '✅' : '❌'}`);
    if (result.status === 200) {
        console.log(`   Total: ${result.data.total || 0} products`);
    }
    return result.status === 200;
}

async function testAdminPackages() {
    console.log('\n🔍 Testing: Admin Packages');
    if (!authToken) {
        console.log('   ⚠️  Skipped: No auth token');
        return false;
    }
    const result = await makeRequest('/api/admin/packages?page=1&limit=10', 'GET', null, {
        Authorization: `Bearer ${authToken}`
    });
    console.log(`   Status: ${result.status} ${result.status === 200 ? '✅' : '❌'}`);
    if (result.status === 200) {
        console.log(`   Total: ${result.data.total || 0} packages`);
    }
    return result.status === 200;
}

// Run all tests
async function runAllTests() {
    console.log('═══════════════════════════════════════════════════════');
    console.log('🧪 Backend Route Testing Suite');
    console.log('═══════════════════════════════════════════════════════');
    
    const results = {
        passed: 0,
        failed: 0,
        total: 0
    };

    const tests = [
        { name: 'Health Check', fn: testHealthCheck },
        { name: 'Public Therapies', fn: testPublicTherapies },
        { name: 'Categories', fn: testCategories },
        { name: 'Admin Login', fn: testAdminLogin },
        { name: 'Admin Dashboard', fn: testAdminDashboard },
        { name: 'Admin Therapies', fn: testAdminTherapies },
        { name: 'Admin Products', fn: testAdminProducts },
        { name: 'Admin Packages', fn: testAdminPackages }
    ];

    for (const test of tests) {
        results.total++;
        try {
            const passed = await test.fn();
            if (passed) {
                results.passed++;
            } else {
                results.failed++;
            }
        } catch (error) {
            console.log(`   ❌ Error: ${error.message}`);
            results.failed++;
        }
    }

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('📊 Test Results');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`   Total Tests: ${results.total}`);
    console.log(`   ✅ Passed: ${results.passed}`);
    console.log(`   ❌ Failed: ${results.failed}`);
    console.log(`   Success Rate: ${Math.round((results.passed / results.total) * 100)}%`);
    console.log('═══════════════════════════════════════════════════════\n');

    if (results.failed === 0) {
        console.log('🎉 All tests passed! Backend is working correctly.\n');
    } else {
        console.log('⚠️  Some tests failed. Please check the backend server.\n');
        console.log('💡 Tip: Make sure the backend server is running and restarted with latest code.\n');
    }
}

// Run tests
runAllTests().catch(error => {
    console.error('❌ Test suite failed:', error);
    process.exit(1);
});
