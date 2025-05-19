import api from "../api";

export const getCategoryData = async () => {
    return(
        await api.get(
            'products/categories/4328'
        )
    )
};
