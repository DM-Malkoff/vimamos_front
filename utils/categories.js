import api from "../api";

// Кеш для категорий
if (typeof global !== 'undefined' && !global.categoriesCache) {
    global.categoriesCache = new Map();
}
const categoriesCache = typeof global !== 'undefined' ? global.categoriesCache : new Map();
const CATEGORIES_CACHE_TTL = 30 * 60 * 1000; // 30 минут

export const getCategories = async () => {
    try {
        // Проверяем кеш только на серверной стороне
        if (typeof window === 'undefined') {
            const cached = categoriesCache.get('categories');
            if (cached && Date.now() - cached.timestamp < CATEGORIES_CACHE_TTL) {
                console.log('Categories cache hit');
                return { data: cached.data };
            }
        }
        
        const response = await api.get('products/categories/?per_page=100');
        
        // Сохраняем в кеш на серверной стороне
        if (typeof window === 'undefined') {
            categoriesCache.set('categories', {
                data: response.data,
                timestamp: Date.now()
            });
            console.log('Categories fetched and cached');
        }
        
        return response;
    } catch (error) {
        console.error('Error fetching categories:', error);
        
        // Возвращаем старые данные из кеша, если есть
        if (typeof window === 'undefined') {
            const cached = categoriesCache.get('categories');
            if (cached) {
                console.log('Returning stale categories cache due to error');
                return { data: cached.data };
            }
        }
        
        // Возвращаем пустой массив в случае полного сбоя
        return { data: [] };
    }
};
