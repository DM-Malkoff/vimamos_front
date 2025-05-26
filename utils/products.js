import api from "../api";
import {quantityProducts} from "../constants/config";

export const getProductsData = async (queries) => {
    console.log('queries', queries);
    const {slug: _, ...apiQueries} = queries

    let apiString = `products?per_page=${quantityProducts}&`;
    let counter = 1;
    let myKey = '';
    for (const key in apiQueries){
        myKey = key;
        if (myKey == 'id'){
            myKey = 'category';
        }
        counter++;

        if (counter != queries.length){
            apiString = apiString+myKey+'='+queries[key]+'&';
        } else {
            apiString = apiString+myKey+'='+queries[key];
        }
    }

    return await api.get(`${apiString}`);
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
