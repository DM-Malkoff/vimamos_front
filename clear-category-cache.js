#!/usr/bin/env node

const http = require('http');

const categoryId = process.argv[2];
const type = process.argv[3];

if (!categoryId && !type) {
    console.log('Usage:');
    console.log('  node clear-category-cache.js <categoryId>     # Clear specific category cache');
    console.log('  node clear-category-cache.js all              # Clear all cache');
    console.log('  node clear-category-cache.js categories       # Clear only categories cache');
    console.log('  node clear-category-cache.js products         # Clear only products cache');
    console.log('');
    console.log('Examples:');
    console.log('  node clear-category-cache.js 731');
    console.log('  node clear-category-cache.js all');
    console.log('  node clear-category-cache.js categories');
    process.exit(1);
}

// Определяем тип запроса и данные
let postData;
if (categoryId === 'all') {
    postData = JSON.stringify({});
} else if (categoryId === 'categories' || categoryId === 'products') {
    postData = JSON.stringify({ type: categoryId });
} else {
    postData = JSON.stringify({ categoryId });
}

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/clear-cache',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
};

const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        try {
            const response = JSON.parse(data);
            if (response.success) {
                console.log(`✅ ${response.message}`);
                if (response.cacheStats) {
                    console.log('📊 Cache stats:', response.cacheStats);
                }
            } else {
                console.log(`❌ Error: ${response.message}`);
            }
        } catch (error) {
            console.log('❌ Invalid response from server');
        }
    });
});

req.on('error', (error) => {
    console.log(`❌ Request failed: ${error.message}`);
    console.log('Make sure the Next.js server is running on localhost:3000');
});

req.write(postData);
req.end(); 