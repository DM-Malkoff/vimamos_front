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

    const apiUrl = `${baseUrl}&${params.toString()}&orderby=price&order=asc`;
    
    return await api.get(apiUrl);
};