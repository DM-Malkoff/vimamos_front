// Используем ту же конфигурацию, что работает в диагностике
const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

// Глобальный кеш для категорий
const CATEGORIES_CACHE_TTL = 30 * 60 * 1000; // 30 минут

// Инициализируем глобальные переменные
if (!global.categoriesCache) {
    global.categoriesCache = null;
}
if (!global.categoriesCacheTimestamp) {
    global.categoriesCacheTimestamp = 0;
}

// Создаем API экземпляр напрямую
const api = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
    consumerKey: process.env.WC_CONSUMER_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET,
    version: 'wc/v3',
    axiosConfig: {
        httpsAgent: new (require('https').Agent)({
            rejectUnauthorized: false
        }),
        timeout: 10000
    }
});

// Функция для загрузки всех категорий через пагинацию
const fetchAllCategories = async () => {
    let allCategories = [];
    let page = 1;
    const perPage = 50; // Безопасный размер, который работает
    
    console.log('Starting to fetch all categories...');
    
    while (true) {
        try {
            console.log(`Fetching categories page ${page}...`);
            
            const response = await api.get('products/categories', { 
                per_page: perPage,
                page: page 
            });
            
            if (!response || !response.data || response.data.length === 0) {
                console.log(`No more categories on page ${page}, stopping`);
                break;
            }
            
            allCategories = allCategories.concat(response.data);
            console.log(`Page ${page}: loaded ${response.data.length} categories, total: ${allCategories.length}`);
            
            // Если получили меньше чем per_page, значит это последняя страница
            if (response.data.length < perPage) {
                console.log('Last page reached (partial page)');
                break;
            }
            
            page++;
            
            // Защита от бесконечного цикла
            if (page > 20) {
                console.log('Too many pages, stopping to prevent infinite loop');
                break;
            }
            
        } catch (error) {
            console.error(`Error fetching page ${page}:`, error.message);
            break;
        }
    }
    
    console.log(`Total categories loaded: ${allCategories.length}`);
    return allCategories;
};

export const getCategories = async () => {
    try {
        // Проверяем кеш
        const now = Date.now();
        console.log('Cache check:', {
            hasCachedData: !!global.categoriesCache,
            cacheLength: global.categoriesCache?.length || 0,
            cacheAge: now - (global.categoriesCacheTimestamp || 0),
            cacheTTL: CATEGORIES_CACHE_TTL,
            isExpired: (now - (global.categoriesCacheTimestamp || 0)) >= CATEGORIES_CACHE_TTL
        });
        
        if (global.categoriesCache && (now - global.categoriesCacheTimestamp) < CATEGORIES_CACHE_TTL) {
            console.log(`Categories cache hit: ${global.categoriesCache.length} items`);
            return { data: global.categoriesCache };
        }
        
        console.log('Fetching ALL categories via pagination...');
        
        // Используем пагинацию с безопасным размером страниц
        let allCategories = [];
        let page = 1;
        const perPage = 25; // Безопасный размер, который не вызывает 502
        
        while (true) {
            try {
                console.log(`Fetching categories page ${page} (${perPage} items)...`);
                
                const response = await api.get('products/categories', { 
                    per_page: perPage,
                    page: page 
                });
                
                if (!response || !response.data || response.data.length === 0) {
                    console.log(`No more categories on page ${page}, stopping`);
                    break;
                }
                
                allCategories = allCategories.concat(response.data);
                console.log(`Page ${page}: loaded ${response.data.length} categories, total: ${allCategories.length}`);
                
                // Если получили меньше чем per_page, значит это последняя страница
                if (response.data.length < perPage) {
                    console.log('Last page reached (partial page)');
                    break;
                }
                
                page++;
                
                // Защита от бесконечного цикла
                if (page > 10) {
                    console.log('Too many pages, stopping to prevent infinite loop');
                    break;
                }
                
            } catch (error) {
                console.error(`Error fetching page ${page}:`, error.message);
                break;
            }
        }
        
        const categories = allCategories;
        console.log(`Total categories loaded: ${categories.length} items`);
        
        // Сохраняем в кеш
        global.categoriesCache = categories;
        global.categoriesCacheTimestamp = now;
        
        return { data: categories };
    } catch (error) {
        console.error('Error fetching categories:', error.message || error);
        
        // Возвращаем старые данные из кеша, если есть
        if (global.categoriesCache && global.categoriesCache.length > 0) {
            console.log(`Returning stale categories cache due to error: ${global.categoriesCache.length} items`);
            return { data: global.categoriesCache };
        }
        
        // В случае полного сбоя, возвращаем пустой массив
        console.log('No cached categories available, returning empty array');
        return { data: [] };
    }
};

// Функция для очистки кеша категорий
export const clearCategoriesCache = () => {
    global.categoriesCache = null;
    global.categoriesCacheTimestamp = 0;
    console.log('Categories cache cleared');
};
