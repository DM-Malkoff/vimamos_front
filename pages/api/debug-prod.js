export default async function handler(req, res) {
    try {
        console.log('\n=== PRODUCTION DEBUG START ===');
        
        // Проверяем переменные окружения
        const envCheck = {
            hasUrl: !!process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
            hasKey: !!process.env.WC_CONSUMER_KEY,
            hasSecret: !!process.env.WC_CONSUMER_SECRET,
            url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
            keyPreview: process.env.WC_CONSUMER_KEY?.substring(0, 10) + '...',
            secretPreview: process.env.WC_CONSUMER_SECRET?.substring(0, 10) + '...'
        };
        
        console.log('Environment check:', envCheck);
        
        // Тестируем прямой запрос к WooCommerce API
        const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;
        
        const api = new WooCommerceRestApi({
            url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
            consumerKey: process.env.WC_CONSUMER_KEY,
            consumerSecret: process.env.WC_CONSUMER_SECRET,
            version: 'wc/v3',
            timeout: 15000
        });
        
        console.log('Testing direct API call...');
        
        const response = await api.get('products/categories', { 
            per_page: 5 
        });
        
        console.log('API Response:', {
            status: response.status,
            dataLength: response.data?.length || 0,
            firstCategory: response.data?.[0]?.name || 'none'
        });
        
        // Проверяем функцию getCategories
        const { getCategories } = require('../../utils/categories');
        console.log('Testing getCategories function...');
        
        const categories = await getCategories();
        
        console.log('getCategories result:', {
            type: typeof categories,
            hasData: !!categories?.data,
            dataLength: categories?.data?.length || 0,
            directLength: Array.isArray(categories) ? categories.length : 'not array'
        });
        
        const result = {
            success: true,
            environment: envCheck,
            directApiTest: {
                status: response.status,
                categoriesCount: response.data?.length || 0,
                firstCategory: response.data?.[0] || null
            },
            getCategoriesTest: {
                type: typeof categories,
                hasData: !!categories?.data,
                dataLength: categories?.data?.length || 0,
                isArray: Array.isArray(categories),
                sample: categories?.data?.slice(0, 2) || categories?.slice?.(0, 2) || 'no sample'
            },
            timestamp: new Date().toISOString()
        };
        
        console.log('=== PRODUCTION DEBUG END ===\n');
        
        res.status(200).json(result);
        
    } catch (error) {
        console.error('Production debug error:', error);
        res.status(500).json({
            success: false,
            error: error.message,
            stack: error.stack?.substring(0, 500),
            timestamp: new Date().toISOString()
        });
    }
} 