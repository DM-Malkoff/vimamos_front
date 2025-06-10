const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

const api = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
    consumerKey: process.env.WC_CONSUMER_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET,
    version: 'wc/v3',
    axiosConfig: {
        httpsAgent: new (require('http').Agent)({
            rejectUnauthorized: false
        })
    }
});

export default async function handler(req, res) {
    const { method } = req;

    if (method === 'GET') {
        try {
            const { category, per_page = 10 } = req.query;
            
            let queryParams = `per_page=${per_page}`;
            if (category && category !== 'all') {
                queryParams += `&category=${category}`;
            }

            const response = await api.get(`products?${queryParams}`);
            res.status(200).json(response.data);
        } catch (error) {
            console.error('API Error:', error);
            res.status(500).json({ error: 'Failed to fetch products' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
} 