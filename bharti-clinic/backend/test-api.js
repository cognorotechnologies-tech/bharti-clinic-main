const https = require('http');

// Test login
const loginData = JSON.stringify({
  email: 'dr.ipinder@bhartiveda.com',
  password: 'password123'
});

const loginOptions = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/admin/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': loginData.length
  }
};

console.log('🔐 Testing admin login...');

const loginReq = https.request(loginOptions, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', data);
    
    if (res.statusCode === 200) {
      const response = JSON.parse(data);
      const token = response.token;
      console.log('\n✅ Login successful!');
      console.log('Token:', token.substring(0, 20) + '...');
      
      // Test dashboard endpoint
      console.log('\n📊 Testing dashboard KPI endpoint...');
      const dashboardOptions = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/admin/dashboard/kpi',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      
      const dashboardReq = https.request(dashboardOptions, (dashRes) => {
        let dashData = '';
        
        dashRes.on('data', (chunk) => {
          dashData += chunk;
        });
        
        dashRes.on('end', () => {
          console.log('Status:', dashRes.statusCode);
          console.log('Response:', dashData);
          
          if (dashRes.statusCode === 200) {
            console.log('\n✅ Dashboard endpoint working!');
          } else {
            console.log('\n❌ Dashboard endpoint failed');
          }
        });
      });
      
      dashboardReq.on('error', (error) => {
        console.error('❌ Dashboard request error:', error.message);
      });
      
      dashboardReq.end();
    } else {
      console.log('\n❌ Login failed');
    }
  });
});

loginReq.on('error', (error) => {
  console.error('❌ Login request error:', error.message);
});

loginReq.write(loginData);
loginReq.end();
