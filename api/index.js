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

// Кеш для API запросов (5 минут)
const CACHE_TTL = 5 * 60 * 1000;

// Инициализируем глобальный кеш для WooCommerce API
if (!global.wooCache) {
    global.wooCache = new Map();
}

// Обёртка для кеширования API запросов
const cachedApi = {
    async get(endpoint, params = {}) {
        const cacheKey = `${endpoint}?${new URLSearchParams(params).toString()}`;
        const now = Date.now();
        
        // Проверяем кеш
        if (global.wooCache.has(cacheKey)) {
            const cached = global.wooCache.get(cacheKey);
            if (now - cached.timestamp < CACHE_TTL) {
                console.log(`API cache hit: ${cacheKey}`);
                return cached.data;
            }
        }
        
        try {
            console.log(`API request: ${cacheKey}`);
            const response = await api.get(endpoint, params);
            
            // Сохраняем в кеш
            global.wooCache.set(cacheKey, {
                data: response,
                timestamp: now
            });
            
            return response;
        } catch (error) {
            // Возвращаем старые данные из кеша при ошибке
            if (global.wooCache.has(cacheKey)) {
                const cached = global.wooCache.get(cacheKey);
                console.log(`API error, returning stale cache: ${cacheKey}`);
                return cached.data;
            }
            throw error;
        }
    }
};

// ПРОДАКШЕН: используем прямой API без кеширования
// кеширование остается только на уровне categories.js
export default api;
