import api from "../api";

/** Получение информации о продукте по Id */
export const getProductData = async (productId) => {
    return await api.get(
        `products/${productId}`
    );
};
