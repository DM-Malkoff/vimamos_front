import api from "../api";

// Простой кеш для категорий
let categoriesCache = null;
let cacheTimestamp = 0;
const CATEGORIES_CACHE_TTL = 30 * 60 * 1000; // 30 минут

export const getCategories = async () => {
    try {
        // Проверяем кеш
        const now = Date.now();
        if (categoriesCache && (now - cacheTimestamp) < CATEGORIES_CACHE_TTL) {
            console.log('Categories cache hit');
            return { data: categoriesCache };
        }
        
        console.log('Fetching categories from API...');
        const response = await api.get('products/categories/?per_page=100');
        
        // Проверяем, что получили данные
        if (!response || !response.data) {
            throw new Error('Invalid response from categories API');
        }
        
        // Сохраняем в кеш
        categoriesCache = response.data;
        cacheTimestamp = now;
        console.log(`Categories fetched and cached: ${response.data.length} items`);
        
        return response;
    } catch (error) {
        console.error('Error fetching categories:', error.message || error);
        
        // Возвращаем старые данные из кеша, если есть
        if (categoriesCache && categoriesCache.length > 0) {
            console.log('Returning stale categories cache due to error');
            return { data: categoriesCache };
        }
        
        // В случае полного сбоя, возвращаем пустой массив
        console.log('No cached categories available, returning empty array');
        return { data: [] };
    }
};

// Функция для очистки кеша категорий
export const clearCategoriesCache = () => {
    categoriesCache = null;
    cacheTimestamp = 0;
    console.log('Categories cache cleared');
};
