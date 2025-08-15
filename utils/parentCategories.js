export const getParentCategories = (categories, currentCategory, isProductCard) => {

    if (isProductCard && currentCategory) {
        const fullCategory = categories.find(item => item.id === currentCategory.id);
        if (fullCategory) {
            // Используем полную категорию с информацией о родителях
            currentCategory = fullCategory;
        }
    }

    // Внутренняя рекурсивная функция с аккумулятором
    const findParents = (current, acc = []) => {
        if (!current || !current.parent) return acc; // Остановка, если нет родителя

        const parent = categories.find(item => item.id === current.parent);
        
        if (!parent) return acc; // Родитель не найден

        // Проверка на цикл (предотвращает бесконечную рекурсию)
        if (acc.some(item => item.id === parent.id)) return acc;

        // Продолжаем поиск для найденного родителя
        return findParents(parent, [...acc, parent]);
    };

    return findParents(currentCategory);
};