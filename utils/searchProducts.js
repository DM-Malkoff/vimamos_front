import api from "../api";
import {quantityProducts} from "../constants/config";

export const getSearchProducts = async (query) => {
    return await api.get(
        `products?search=${query}&per_page=100`
    );
};
