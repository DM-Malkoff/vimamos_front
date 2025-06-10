export async function getSliderProducts(categoryId) {
    try {
        const response = await fetch(`/api/products/category/${categoryId}`);
        if (!response.ok) {
            throw new Error('Ошибка при загрузке товаров');
        }
        const data = await response.json();
        return { data };
    } catch (error) {
        console.error('Ошибка при получении товаров:', error);
        return { data: [] };
    }
} 