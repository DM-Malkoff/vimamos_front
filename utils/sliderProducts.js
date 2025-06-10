import {quantityProductsMainSlider} from "../constants/config";

export const getSliderProducts = async (categoryId) => {
    try {
        // На серверной стороне используем прямой вызов WooCommerce API
        if (typeof window === 'undefined') {
            const { getProducts } = await import('./woocommerce');
            const data = await getProducts(categoryId, quantityProductsMainSlider);
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
