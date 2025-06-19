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
        console.log('🔍 Начинаем фильтрацию...', {
            filterContext,
            isMobile: window.innerWidth <= 768
        });

        try {
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

            console.log('📤 Отправляем запрос:', {
                url: `${siteUrl}/wp-json/custom/v1/search-products`,
                method: 'POST',
                body: requestBody,
                queryParams
            });

            const response = await fetch(`${siteUrl}/wp-json/custom/v1/search-products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            console.log('📥 Получен ответ:', {
                status: response.status,
                ok: response.ok,
                statusText: response.statusText
            });

            if (!response.ok) {
                throw new Error(`Ошибка при запросе данных: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log('✅ Данные получены:', data);
            
            // Обновляем URL с параметрами фильтрации
            await router.push({
                pathname: router.query.slug,
                query: queryParams,
            }, undefined, { shallow: true });

            console.log('🔄 URL обновлен');

            // Обновляем список товаров на странице
            if (onProductsUpdate) {
                onProductsUpdate(data);
                console.log('📦 Товары обновлены');
            }

            // Закрываем фильтр только после успешного выполнения запроса
            setShowFilterContext(false);
            console.log('❌ Фильтр закрыт');

        } catch (error) {
            console.error('💥 Ошибка при фильтрации:', error);
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
                    <span 
                        className="shop_btn shop2-filter-go" 
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('🖱️ Клик по кнопке "Показать"');
                            filterSearchHandler();
                        }}
                        onTouchEnd={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('👆 Touch по кнопке "Показать"');
                            filterSearchHandler();
                        }}
                    >
                        Показать
                    </span>
                    <span 
                        className="shop_btn reset" 
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('🖱️ Клик по кнопке "Очистить"');
                            onClearFilter();
                        }}
                        onTouchEnd={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('👆 Touch по кнопке "Очистить"');
                            onClearFilter();
                        }}
                    >
                        Очистить
                    </span>
                </div>
            </div>
        </>
    );
};

export default Accordion;