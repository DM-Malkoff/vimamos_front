const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

const api = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
    consumerKey: process.env.WC_CONSUMER_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET,
    version: 'wc/v3',
    axiosConfig: {
        httpsAgent: new (require('https').Agent)({
            rejectUnauthorized: false
        }),
        timeout: 30000
    }
});

// Кеш для WooCommerce запросов
if (typeof global !== 'undefined' && !global.wooCache) {
    global.wooCache = new Map();
}
const wooCache = typeof global !== 'undefined' ? global.wooCache : new Map();
const WOO_CACHE_TTL = 15 * 60 * 1000; // 15 минут

export const getProducts = async (categoryId, perPage = 10) => {
    try {
        // Создаем ключ кеша
        const cacheKey = `woo_products_${categoryId}_${perPage}`;
        
        // Проверяем кеш
        const cached = wooCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < WOO_CACHE_TTL) {
            console.log(`WooCommerce cache hit for category ${categoryId}`);
            return cached.data;
        }

        let queryParams = `per_page=${perPage}`;
        if (categoryId && categoryId !== 'all') {
            queryParams += `&category=${categoryId}`;
        }
        
        // Добавляем параметры для оптимизации запроса
        queryParams += '&status=publish&stock_status=instock';

        console.log(`Fetching from WooCommerce API: category ${categoryId}`);
        const response = await api.get(`products?${queryParams}`);
        
        // Сохраняем в кеш
        wooCache.set(cacheKey, {
            data: response.data,
            timestamp: Date.now()
        });
        
        return response.data;
    } catch (error) {
        console.error('WooCommerce API Error:', error);
        
        // Попытаемся вернуть старые данные из кеша, если есть
        const cacheKey = `woo_products_${categoryId}_${perPage}`;
        const cached = wooCache.get(cacheKey);
        if (cached) {
            console.log('Returning stale cache data due to API error');
            return cached.data;
        }
        
        throw new Error('Failed to fetch products from WooCommerce');
    }
}; 