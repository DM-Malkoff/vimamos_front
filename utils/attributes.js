import api from "../api";

export const getAttributes = async (attributeId) => {
    return(
        await api.get(
            // 'products/attributes/' //все атрибуты
            'attributes?_fields=id,name,slug,terms' //все атрибуты
        )
    )
};

export const getAttributesWithTerms = async () => {
    try {
        // 1. Получаем все атрибуты
        const { data: attributes } = await api.get('products/attributes');

        console.log('777', attributes);

        // 2. Для каждого атрибута получаем его значения
        const attributesWithTerms = await Promise.all(
            attributes.map(async (attribute) => {
                try {
                    const { data: terms } = await api.get(`products/attributes/${attribute.id}/terms`);
                    return {
                        ...attribute,
                        terms
                    };
                } catch (error) {
                    console.error(`Error getting terms for attribute ${attribute.id}:`, error);
                    return {
                        ...attribute,
                        terms: []
                    };
                }
            })
        );
        return attributesWithTerms;
    } catch (error) {
        console.error('Error getting attributes:', error);
        throw error;
    }
};
