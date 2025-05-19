import api from "../api";
import {quantityProductsMainSlider} from "../constants/config";

export const getSliderProducts = async (categoryId) => {

    return await api.get(
        `products?category=${categoryId}per_page=${quantityProductsMainSlider}`
    );
};
