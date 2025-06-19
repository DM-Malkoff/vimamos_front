import AccordionItems from "./accordionItems";
import {useContext, useState} from "react";
import {useRouter} from "next/router";
import {FilterDataContext, ShowFilterContext} from "../../context/context";
import {siteUrl} from "../../constants/config";

const Accordion = ({terms, onProductsUpdate}) => {
    const router = useRouter();
    const {slug: _, ...routerQueries} = router.query;

    /** Обертка - объект параметров фильтра */
    const [filterContext, setFilterContext] = useContext(FilterDataContext);

    /** Обертка - состояние отображения фильтра */
    const [showFilterContext, setShowFilterContext] = useContext(ShowFilterContext);

    /** Флаг сброса параметров фильтра */
    const [isReset, setIsReset] = useState(false);

    /** Обработка фильрации товаров по нажатию на кнопку "Показать" */
    const filterSearchHandler = async () => {
        // Подготавливаем атрибуты из filterContext
        const preparedAttributes = {};
        const queryParams = { 
            id: router.query.id, // Сохраняем только ID категории
            // slug: router.query.slug // И slug категории
        };

        if (filterContext && Object.entries(filterContext).length) {
            // Обрабатываем все атрибуты из filterContext
            Object.entries(filterContext).forEach(([key, value]) => {
                if (key === 'min_price' || key === 'max_price') {
                    if (value) {
                        queryParams[key] = value;
                    }
                } else {
                    // Проверяем, что value это массив и содержит объекты с slug
                    if (Array.isArray(value) && value.length > 0 && value[0].slug) {
                        // Извлекаем только slug из каждого объекта в массиве
                        preparedAttributes[key] = value.map(item => item.slug);
                        queryParams[key] = value.map(item => item.slug).join(',');
                    }
                }
            });
        }

        // Формируем тело запроса
        const requestBody = {
            filters: {
                category_id: router.query.id ? parseInt(router.query.id) : null,
                min_price: filterContext.min_price ? parseInt(filterContext.min_price) : null,
                max_price: filterContext.max_price ? parseInt(filterContext.max_price) : null,
            },
            attributes: preparedAttributes
        };

        try {
            const response = await fetch(`${siteUrl}/wp-json/custom/v1/search-products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error('Ошибка при запросе данных');
            }

            const data = await response.json();
            
            // Обновляем URL с параметрами фильтрации
            router.push({
                pathname: router.query.slug,
                query: queryParams,
            }, undefined, { shallow: true });

            // Обновляем список товаров на странице
            if (onProductsUpdate) {
                onProductsUpdate(data);
            }

            // Закрываем фильтр только после успешного выполнения запроса
            setShowFilterContext(false);

        } catch (error) {
            console.error('Ошибка:', error);
            // В случае ошибки тоже закрываем фильтр
            setShowFilterContext(false);
        }
    };

    const onClearFilter = () => {
        setShowFilterContext(false);
        setIsReset(true);
        setFilterContext({}); // Очищаем контекст фильтра
        router.push({
            pathname: router.query.slug,
            query: {
                id: router.query.id
            }
        });
    }

    return (
        <>
            {terms?.map((item, index) => (
                <div key={`accordion-${item.id}`}>
                    <AccordionItems
                        item={item}
                        index={index}
                        isReset={isReset}
                        onPress={filterSearchHandler}
                        isLast={index === terms.length - 1}
                    />
                </div>
            )) ?? null}

            <div className="filter_buttons_wrap">
                <div className="filter_buttons">
                    <span className="shop_btn shop2-filter-go" onClick={filterSearchHandler}>Показать</span>
                    <span className="shop_btn reset" onClick={onClearFilter}>Очистить</span>
                </div>
            </div>
        </>
    );
};

export default Accordion;