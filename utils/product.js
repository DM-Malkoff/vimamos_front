import api from "../api";

/** Получение информации о продукте по Id */
export const getProductData = async (productId) => {
    const product = await api.get(`products/${productId}`);
    product.data.categories = product.data.categories.filter(cat => cat.name !== 'Misc');
    return product;
};
