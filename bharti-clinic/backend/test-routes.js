const http = require('http');

const endpoints = [
  '/api/health',
  '/api/admin/login',
  '/api/admin/dashboard/kpi',
  '/api/admin/dashboard/revenue',
  '/api/admin/dashboard/orders',
  '/api/admin/dashboard/appointments',
  '/api/admin/dashboard/low-stock'
];

console.log('🔍 Testing backend endpoints...\n');

endpoints.forEach((endpoint, index) => {
  setTimeout(() => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: endpoint,
      method: 'GET'
    };
    
    const req = http.request(options, (res) => {
      console.log(`${endpoint}`);
      console.log(`  Status: ${res.statusCode}`);
      console.log(`  ${res.statusCode === 404 ? '❌ NOT FOUND' : res.statusCode === 401 ? '🔒 AUTH REQUIRED' : '✅ EXISTS'}\n`);
    });
    
    req.on('error', (error) => {
      console.log(`${endpoint}`);
      console.log(`  ❌ ERROR: ${error.message}\n`);
    });
    
    req.end();
  }, index * 100);
});
