import api from "../api";

export const getAttributes = async (attributeId) => {
    return(
        await api.get(
            'products/attributes/' //все атрибуты
        )
    )
};
