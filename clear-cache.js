#!/usr/bin/env node

const http = require('http');

const command = process.argv[2];
const value = process.argv[3];
const isForce = process.argv.includes('--force');

function showUsage() {
    console.log('Usage:');
    console.log('  node clear-cache.js all                    # Очистить весь кеш');
    console.log('  node clear-cache.js categories             # Мягкая очистка кеша категорий (безопасно)');
    console.log('  node clear-cache.js categories --force     # Принудительная очистка категорий (может вызвать проблемы)');
    console.log('  node clear-cache.js products               # Очистить кеш товаров');
    console.log('  node clear-cache.js category <ID>          # Очистить кеш категории по ID');
    console.log('');
    console.log('Examples:');
    console.log('  node clear-cache.js category 731           # Очистить кеш категории 731');
    console.log('  node clear-cache.js categories             # Безопасная очистка категорий');
    console.log('  node clear-cache.js all                    # Очистить весь кеш');
}

if (!command) {
    showUsage();
    process.exit(1);
}

let postData = {};

switch (command) {
    case 'all':
        postData = {};
        break;
    case 'categories':
        postData = { type: 'categories', force: isForce };
        break;
    case 'products':
        postData = { type: 'products' };
        break;
    case 'category':
        if (!value) {
            console.log('❌ Error: Category ID is required');
            showUsage();
            process.exit(1);
        }
        postData = { categoryId: value };
        break;
    default:
        console.log(`❌ Error: Unknown command "${command}"`);
        showUsage();
        process.exit(1);
}

const postDataString = JSON.stringify(postData);

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/clear-cache',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postDataString)
    }
};

console.log(`🔄 Clearing cache: ${command}${value ? ' ' + value : ''}...`);

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
            console.log('Response:', data);
        }
    });
});

req.on('error', (error) => {
    console.log(`❌ Request failed: ${error.message}`);
    console.log('Make sure the server is running on localhost:3000');
});

req.write(postDataString);
req.end(); 