import { clearCategoriesCache } from './categories';

// Менеджер кеша для всех утилит
export class CacheManager {
    static clearAllCaches() {
        try {
            // Очищаем кеш категорий
            clearCategoriesCache();
            
            // Очищаем кеш WooCommerce
            if (global.wooCache) {
                global.wooCache.clear();
                console.log('WooCommerce cache cleared');
            }
            
            // Очищаем кеш слайдера
            if (global.sliderCache) {
                global.sliderCache.clear();
                console.log('Slider cache cleared');
            }
            
            return true;
        } catch (error) {
            console.error('Error clearing caches:', error);
            return false;
        }
    }
    
    static clearCacheByKey(key) {
        try {
            const caches = [
                global.categoriesCache,
                global.wooCache,
                global.sliderCache
            ].filter(Boolean);
            
            caches.forEach(cache => {
                if (cache.has(key)) {
                    cache.delete(key);
                    console.log(`Cache key ${key} cleared`);
                }
            });
            
            return true;
        } catch (error) {
            console.error(`Error clearing cache key ${key}:`, error);
            return false;
        }
    }
    
    static clearCategoriesOnly() {
        try {
            clearCategoriesCache();
            console.log('Categories cache cleared');
            return true;
        } catch (error) {
            console.error('Error clearing categories cache:', error);
            return false;
        }
    }
    
    static softClearCategories() {
        try {
            // Мягкая очистка - помечаем кеш как устаревший, но не удаляем
            if (global.categoriesCache && global.categoriesCacheTimestamp) {
                global.categoriesCacheTimestamp = 0; // Помечаем как устаревший
                console.log('Categories cache marked as stale (soft clear)');
            }
            return true;
        } catch (error) {
            console.error('Error soft clearing categories cache:', error);
            return false;
        }
    }
    
    static clearProductsOnly() {
        try {
            if (global.wooCache) {
                // Очищаем только товары (ключи, содержащие 'products')
                const keys = Array.from(global.wooCache.keys());
                keys.forEach(key => {
                    if (key.includes('products')) {
                        global.wooCache.delete(key);
                    }
                });
                console.log('Products cache cleared');
            }
            return true;
        } catch (error) {
            console.error('Error clearing products cache:', error);
            return false;
        }
    }
    
    static clearCategoryCache(categoryId) {
        try {
            if (global.wooCache) {
                // Очищаем кеш товаров для конкретной категории
                const keys = Array.from(global.wooCache.keys());
                keys.forEach(key => {
                    if (key.includes(`category=${categoryId}`) || key.includes(`category%3D${categoryId}`)) {
                        global.wooCache.delete(key);
                        console.log(`Cleared cache for category ${categoryId}: ${key}`);
                    }
                });
            }
            return true;
        } catch (error) {
            console.error(`Error clearing cache for category ${categoryId}:`, error);
            return false;
        }
    }
    
    static getCacheStats() {
        const stats = {};
        
        if (global.categoriesCache) {
            stats.categories = global.categoriesCache.size;
        }
        
        if (global.wooCache) {
            stats.woocommerce = global.wooCache.size;
        }
        
        if (global.sliderCache) {
            stats.slider = global.sliderCache.size;
        }
        
        return stats;
    }
}

// API endpoint для очистки кеша
export const clearCacheAPI = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const { key, categoryId, type, force } = req.body;
        
        let result;
        let message;
        
        if (categoryId) {
            // Очищаем кеш конкретной категории
            result = CacheManager.clearCategoryCache(categoryId);
            message = `Cache for category ${categoryId} cleared`;
        } else if (key) {
            result = CacheManager.clearCacheByKey(key);
            message = `Cache key ${key} cleared`;
        } else if (type === 'categories') {
            if (force) {
                // Принудительная очистка (может вызвать проблемы на продакшене)
                result = CacheManager.clearCategoriesOnly();
                message = 'Categories cache cleared (forced)';
            } else {
                // Мягкая очистка кеша категорий (безопасно для продакшена)
                result = CacheManager.softClearCategories();
                message = 'Categories cache marked as stale (will refresh on next request)';
            }
        } else if (type === 'products') {
            // Очищаем только кеш товаров
            result = CacheManager.clearProductsOnly();
            message = 'Products cache cleared';
        } else {
            result = CacheManager.clearAllCaches();
            message = 'All caches cleared';
        }
        
        if (result) {
            res.status(200).json({ 
                success: true, 
                message: message,
                cacheStats: CacheManager.getCacheStats()
            });
        } else {
            res.status(500).json({ 
                success: false, 
                message: 'Failed to clear cache' 
            });
        }
    } catch (error) {
        console.error('Cache clear API error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error',
            error: error.message 
        });
    }
}; 