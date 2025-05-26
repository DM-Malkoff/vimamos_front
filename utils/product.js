import api from "../api";

/** Получение информации о пордукте по Id */
export const getProductData = async (productId) => {
    return await api.get(
        `products/${productId}`
    );
};
