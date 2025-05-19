import api from "../api";

export const getProductData = async (productId) => {
    return await api.get(
        `products/${productId}`
    );
};
