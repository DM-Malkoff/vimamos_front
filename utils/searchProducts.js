import api from "../api";

export const getSearchProducts = async (query) => {
    return await api.get(
        `products?search=${query}&per_page=100`
    );
};
