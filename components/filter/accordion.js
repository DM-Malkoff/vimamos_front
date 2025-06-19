import AccordionItems from "./accordionItems";
import {useContext, useEffect, useState} from "react";
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
    
    /** Состояние загрузки */
    const [isLoading, setIsLoading] = useState(false);
    
    /** Логи для мобильной отладки */
    const [debugLogs, setDebugLogs] = useState([]);
    
    const addLog = (message, data = null) => {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = `${timestamp}: ${message}${data ? ` ${JSON.stringify(data)}` : ''}`;
        console.log(logEntry);
        setDebugLogs(prev => [...prev.slice(-10), logEntry]); // Храним последние 10 логов
    };

    /** Обработка фильрации товаров по нажатию на кнопку "Показать" */
    const filterSearchHandler = async () => {
        if (isLoading) {
            addLog('⏳ Запрос уже выполняется, ждите...');
            return;
        }

        setIsLoading(true);
        addLog('🔍 Начинаем фильтрацию...', {
            filterContext,
            isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false
        });

        try {
            // Небольшая задержка для визуализации
            await new Promise(resolve => setTimeout(resolve, 100));

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

            // Используем Next.js API route как прокси чтобы избежать CORS проблем
            const apiUrl = '/api/search-products';

            addLog('📤 Отправляем запрос:', {
                url: apiUrl,
                method: 'POST',
                body: requestBody,
                queryParams,
                hostname: typeof window !== 'undefined' ? window.location.hostname : 'unknown',
                userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown'
            });

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            addLog('📥 Получен ответ:', {
                status: response.status,
                ok: response.ok,
                statusText: response.statusText,
                headers: {
                    contentType: response.headers.get('content-type'),
                    corsHeaders: response.headers.get('access-control-allow-origin')
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                addLog('🚫 Ошибка в ответе:', {
                    status: response.status,
                    statusText: response.statusText,
                    errorText: errorText
                });
                throw new Error(`API error: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const data = await response.json();
            addLog('✅ Данные получены:', { productsCount: data?.length || 'unknown' });
            
            // Обновляем URL с параметрами фильтрации
            await router.push({
                pathname: router.query.slug,
                query: queryParams,
            }, undefined, { shallow: true });

            addLog('🔄 URL обновлен');

            // Обновляем список товаров на странице
            if (onProductsUpdate) {
                onProductsUpdate(data);
                addLog('📦 Товары обновлены');
            }

            // Закрываем фильтр только после успешного выполнения запроса
            setShowFilterContext(false);
            addLog('❌ Фильтр закрыт');

        } catch (error) {
            addLog('💥 Ошибка при фильтрации:', error.message);
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
                        className={`shop_btn shop2-filter-go ${isLoading ? 'loading' : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addLog('🖱️ Клик по кнопке "Показать"');
                            filterSearchHandler();
                        }}
                        style={{
                            opacity: isLoading ? 0.6 : 1,
                            pointerEvents: isLoading ? 'none' : 'auto',
                            position: 'relative'
                        }}
                    >
                        {isLoading ? 'Загрузка...' : 'Показать'}
                        {isLoading && (
                            <span style={{
                                position: 'absolute',
                                right: '8px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                animation: 'spin 1s linear infinite'
                            }}>
                                ⏳
                            </span>
                        )}
                    </span>
                    <span 
                        className="shop_btn reset" 
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addLog('🖱️ Клик по кнопке "Очистить"');
                            onClearFilter();
                        }}
                        style={{
                            opacity: isLoading ? 0.6 : 1,
                            pointerEvents: isLoading ? 'none' : 'auto'
                        }}
                    >
                        Очистить
                    </span>
                </div>
            </div>

            {/* Мобильная консоль для отладки */}
            {debugLogs.length > 0 && (
                <div style={{
                    position: 'fixed',
                    top: '60px',
                    left: '10px',
                    right: '10px',
                    background: 'rgba(0,0,0,0.9)',
                    color: '#00ff00',
                    padding: '10px',
                    fontSize: '10px',
                    fontFamily: 'monospace',
                    zIndex: 9999,
                    maxHeight: '200px',
                    overflow: 'auto',
                    borderRadius: '4px'
                }}>
                    <div style={{ marginBottom: '5px', color: '#ffff00' }}>
                        📱 Мобильная консоль (последние 10 логов):
                        <button 
                            onClick={() => setDebugLogs([])}
                            style={{
                                float: 'right',
                                background: 'red',
                                color: 'white',
                                border: 'none',
                                padding: '2px 6px',
                                fontSize: '10px',
                                cursor: 'pointer'
                            }}
                        >
                            Очистить
                        </button>
                    </div>
                    {debugLogs.map((log, index) => (
                        <div key={index} style={{ marginBottom: '2px', wordBreak: 'break-all' }}>
                            {log}
                        </div>
                    ))}
                </div>
            )}

            <style jsx>{`
                @keyframes spin {
                    0% { transform: translateY(-50%) rotate(0deg); }
                    100% { transform: translateY(-50%) rotate(360deg); }
                }
            `}</style>
        </>
    );
};

export default Accordion;