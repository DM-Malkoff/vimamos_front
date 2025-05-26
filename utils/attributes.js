import {siteUrl} from "../constants/config";

export const getAttributes = async (categoryId) => {
    try {
        const response = await fetch(`${siteUrl}/wp-json/custom/v1/category-attributes/${categoryId}`);
        const attributes = await response.json();
        
        // Ensure all attributes have valid slug values
        return attributes.map(attribute => ({
            ...attribute,
            slug: attribute.slug ?? null
        }));
    } catch (error) {
        console.error('Ошибка при получении атрибутов:', error);
        throw error;
    }
};
