import AccordionItems from "./accordionItems";
import {useContext, useState} from "react";
import {useRouter} from "next/router";
import {FilterDataContext, ShowFilterContext} from "../../context/context";
import {siteUrl} from "../../constants/config";

const Accordion = ({terms}) => {
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
        setShowFilterContext(false);

        // Формируем тело запроса
        const requestBody = {
            filters: {
                category_id: router.query.id ? parseInt(router.query.id) : null,
                min_price: filterContext.min_price ? parseInt(filterContext.min_price) : null,
                max_price: filterContext.max_price ? parseInt(filterContext.max_price) : null,
            },
            attributes: {
                // Пример: предполагаем, что filterContext содержит данные атрибутов
                color: filterContext.color || [],
                sizes: filterContext.sizes || [],
            },
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

            router.push({
                pathname: router.query.slug,
                query: {
                    ...routerQueries,
                },
            });

        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    const onClearFilter = () => {
        setShowFilterContext(false);
        setIsReset(true);
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