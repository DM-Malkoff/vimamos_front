import AccordionItems from "./accordionItems";
import {useContext, useState} from "react";
import {useRouter} from "next/router";
import {FilterDataContext, ShowFilterContext} from "../../context/context";

const Accordion = ({terms, onProductsUpdate}) => {
    const router = useRouter();
    const {slug: _, ...routerQueries} = router.query;

    /** Обертка - объект параметров фильтра */
    const [filterContext, setFilterContext] = useContext(FilterDataContext);

    /** Обертка - состояние отображения фильтра */
    const [showFilterContext, setShowFilterContext] = useContext(ShowFilterContext);

    /** Флаг сброса параметров фильтра */
    const [isReset, setIsReset] = useState(false);
    
    /** Состояние загрузки */
    const [isLoading, setIsLoading] = useState(false);

    /** Обработка фильрации товаров по нажатию на кнопку "Показать" */
    const filterSearchHandler = async () => {
        if (isLoading) {
            return;
        }

        setIsLoading(true);

        try {
            // Небольшая задержка для визуализации
            await new Promise(resolve => setTimeout(resolve, 300));

            // Подготавливаем атрибуты из filterContext
            const preparedAttributes = {};
            const queryParams = { 
                id: router.query.id, // Сохраняем только ID категории
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

            // Используем Next.js API route как прокси чтобы избежать CORS проблем
            const apiUrl = '/api/search-products';

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API error: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const data = await response.json();
            
            // Обновляем URL с параметрами фильтрации
            await router.push({
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
            console.error('Ошибка при фильтрации:', error);
            // В случае ошибки тоже закрываем фильтр
            setShowFilterContext(false);
        } finally {
            setIsLoading(false);
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
            {/* Блюр оверлей для всего фильтра */}
            {isLoading && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'fadeIn 0.3s ease-in-out'
                }}>
                    <div style={{
                        background: 'white',
                        padding: '20px 30px',
                        borderRadius: '12px',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        fontSize: '16px',
                        fontWeight: '500',
                        color: '#2c262a'
                    }}>
                        <div style={{
                            width: '20px',
                            height: '20px',
                            border: '2px solid #fd9844',
                            borderTop: '2px solid transparent',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }}></div>
                        Применяем фильтр...
                    </div>
                </div>
            )}

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
                            filterSearchHandler();
                        }}
                        style={{
                            opacity: isLoading ? 0.7 : 1,
                            pointerEvents: isLoading ? 'none' : 'auto',
                            cursor: isLoading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        Показать
                    </span>
                    <span 
                        className="shop_btn reset" 
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onClearFilter();
                        }}
                        style={{
                            opacity: isLoading ? 0.7 : 1,
                            pointerEvents: isLoading ? 'none' : 'auto',
                            cursor: isLoading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        Очистить
                    </span>
                </div>
            </div>

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes fadeIn {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
            `}</style>
        </>
    );
};

export default Accordion;