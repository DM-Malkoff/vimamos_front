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
        const { key } = req.body;
        
        let result;
        if (key) {
            result = CacheManager.clearCacheByKey(key);
        } else {
            result = CacheManager.clearAllCaches();
        }
        
        if (result) {
            res.status(200).json({ 
                success: true, 
                message: key ? `Cache key ${key} cleared` : 'All caches cleared',
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