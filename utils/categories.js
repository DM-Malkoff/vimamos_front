// Используем ту же конфигурацию, что работает в диагностике
const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

// Простой кеш для категорий
let categoriesCache = null;
let cacheTimestamp = 0;
const CATEGORIES_CACHE_TTL = 30 * 60 * 1000; // 30 минут

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
        if (categoriesCache && (now - cacheTimestamp) < CATEGORIES_CACHE_TTL) {
            console.log(`Categories cache hit: ${categoriesCache.length} items`);
            return { data: categoriesCache };
        }
        
        console.log('Fetching all categories from API...');
        const allCategories = await fetchAllCategories();
        
        // Проверяем, что получили данные
        if (!allCategories || allCategories.length === 0) {
            throw new Error('No categories received from API');
        }
        
        // Сохраняем в кеш
        categoriesCache = allCategories;
        cacheTimestamp = now;
        console.log(`All categories fetched and cached: ${allCategories.length} items`);
        
        return { data: allCategories };
    } catch (error) {
        console.error('Error fetching categories:', error.message || error);
        
        // Возвращаем старые данные из кеша, если есть
        if (categoriesCache && categoriesCache.length > 0) {
            console.log(`Returning stale categories cache due to error: ${categoriesCache.length} items`);
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
