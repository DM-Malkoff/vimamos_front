import {quantityProductsMainSlider} from "../constants/config";

// Простой кеш в памяти для серверной стороны
if (typeof global !== 'undefined' && !global.sliderCache) {
    global.sliderCache = new Map();
}
const cache = typeof global !== 'undefined' ? global.sliderCache : new Map();
const CACHE_TTL = 10 * 60 * 1000; // 10 минут в миллисекундах

export const getSliderProducts = async (categoryId) => {
    try {
        // Создаем ключ кеша
        const cacheKey = `slider_products_${categoryId}`;
        
        // Проверяем кеш только на серверной стороне
        if (typeof window === 'undefined') {
            const cached = cache.get(cacheKey);
            if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
                console.log(`Cache hit for category ${categoryId}`);
                return { data: cached.data };
            }
        }
        
        // На серверной стороне используем прямой вызов WooCommerce API
        if (typeof window === 'undefined') {
            const { getProducts } = await import('./woocommerce');
            const data = await getProducts(categoryId, quantityProductsMainSlider);
            
            // Сохраняем в кеш
            cache.set(cacheKey, {
                data: data,
                timestamp: Date.now()
            });
            
            console.log(`Data fetched and cached for category ${categoryId}`);
            return { data };
        }
        
        // На клиентской стороне используем наш Next.js API route
        const response = await fetch(`/api/products?category=${categoryId}&per_page=${quantityProductsMainSlider}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return { data };
    } catch (error) {
        console.error('Error fetching slider products:', error);
        throw error;
    }
};
