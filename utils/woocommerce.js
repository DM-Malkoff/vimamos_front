const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

const api = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
    consumerKey: process.env.WC_CONSUMER_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET,
    version: 'wc/v3',
    axiosConfig: {
        httpsAgent: new (require('https').Agent)({
            rejectUnauthorized: false
        })
    }
});

export const getProducts = async (categoryId, perPage = 10) => {
    try {
        let queryParams = `per_page=${perPage}`;
        if (categoryId && categoryId !== 'all') {
            queryParams += `&category=${categoryId}`;
        }

        const response = await api.get(`products?${queryParams}`);
        return response.data;
    } catch (error) {
        console.error('WooCommerce API Error:', error);
        throw new Error('Failed to fetch products from WooCommerce');
    }
}; 