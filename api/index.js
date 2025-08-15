const WooCommerceRestApi = require( '@woocommerce/woocommerce-rest-api' ).default;

const api = new WooCommerceRestApi( {
    url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
    consumerKey: process.env.WC_CONSUMER_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET,
    version: 'wc/v3',
    axiosConfig: {
        httpsAgent: new (require('https').Agent)({
            rejectUnauthorized: false
        }),
        timeout: 15000
    }
} );

// Инициализируем глобальный кеш для WooCommerce API
if (!global.wooCache) {
    global.wooCache = new Map();
}

// ПРОДАКШЕН: используем прямой API без кеширования
// кеширование остается только на уровне categories.js
export default api;
