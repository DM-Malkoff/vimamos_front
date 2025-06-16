import api from "../api";
import {quantityProducts} from "../constants/config";

export const getProductsData = async (queries) => {
    const {slug: _, ...apiQueries} = queries;

    const baseUrl = `products?per_page=${quantityProducts}`;
    
    const params = new URLSearchParams();
    
    Object.entries(apiQueries).forEach(([key, value]) => {
        const paramKey = key === 'id' ? 'category' : key;
        params.append(paramKey, value);
    });

    const apiUrl = `${baseUrl}&${params.toString()}`;
    
    return await api.get(apiUrl);
};

// export const getFilteredProductsData = async (categoryId) => {
//     // return await api.get(
//     //     // `products?attribute=pa_brand&attribute_term=Lacoste&attribute=pa_cvet&attribute_term=blue,khaki`
//     // );
//     try {
//         const response = await fetch(`${siteUrl}/wp-json/custom/v1/filtered-products/${categoryId}`, {});
//         await response.json();
//     } catch (error) {
//         console.error('Ошибка при получении товаров после фильтрации:', error);
//         throw error;
//     }
// }
