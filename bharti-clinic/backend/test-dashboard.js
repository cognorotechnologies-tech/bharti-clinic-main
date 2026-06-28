const http = require('http');

// First login
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

console.log('🔐 Logging in...');

const loginReq = http.request(loginOptions, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    if (res.statusCode === 200) {
      const response = JSON.parse(data);
      const token = response.token;
      console.log('✅ Login successful');
      
      // Test dashboard endpoint
      console.log('\n📊 Testing /api/admin/dashboard/kpi...');
      const dashboardOptions = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/admin/dashboard/kpi',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      
      const dashboardReq = http.request(dashboardOptions, (dashRes) => {
        let dashData = '';
        
        console.log(`Status: ${dashRes.statusCode}`);
        console.log(`Headers:`, dashRes.headers);
        
        dashRes.on('data', (chunk) => {
          dashData += chunk;
        });
        
        dashRes.on('end', () => {
          console.log(`Response: ${dashData}`);
          
          if (dashRes.statusCode === 200) {
            console.log('\n✅ Dashboard endpoint working!');
            const kpiData = JSON.parse(dashData);
            console.log('KPI Data:', JSON.stringify(kpiData, null, 2));
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
      console.log(`❌ Login failed with status ${res.statusCode}`);
      console.log(data);
    }
  });
});

loginReq.on('error', (error) => {
  console.error('❌ Login request error:', error.message);
});

loginReq.write(loginData);
loginReq.end();
