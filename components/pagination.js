import {quantityProducts} from "../constants/config";
import Link from "next/link";
import {useRouter} from "next/router";

const Pagination = ({totalQuantityProducts, productsLength}) => {
    const router = useRouter()
    const currentSlug = router.query.slug
    // Если page не указан, то это первая страница
    const currentPage = router.query.page !== undefined ? +router.query.page : 1
    const {slug: _, ...routerQueries} = router.query
    const {page:__, ...routerQueriesWithoutPage} = routerQueries

    // Правильно вычисляем общее количество страниц
    const totalPages = Math.ceil(totalQuantityProducts / quantityProducts)
    
    // Если продуктов меньше чем на одну страницу, не показываем пагинацию
    if (totalPages <= 1) {
        return null
    }

    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
    }

    return (
        <div className="shop_pagelist_wrap">
            <ul className="shop_pagelist">
                {/* Кнопка "Предыдущая" */}
                <li className={`page-prev ${currentPage === 1 ? 'not_active' : ''}`}>
                    {currentPage > 1 && (
                        <Link href={{
                            pathname: `/catalog/${currentSlug}`,
                            query: currentPage === 2 ? routerQueriesWithoutPage : {
                                ...routerQueries,
                                page: currentPage - 1
                            }
                        }}>
                            <a></a>
                        </Link>
                    )}
                </li>

                {/* Первая страница */}
                {currentPage === 1 ? (
                    <li className="page-num active-num">
                        <span>1</span>
                    </li>
                ) : (
                    <li className="page-num">
                        <Link href={{
                            pathname: `/catalog/${currentSlug}`,
                            query: routerQueriesWithoutPage
                        }}>
                            <a>1</a>
                        </Link>
                    </li>
                )}

                {/* Многоточие слева */}
                {currentPage > 3 && (
                    <li className="page-num">
                        <span>...</span>
                    </li>
                )}

                {/* Страницы вокруг текущей */}
                {pageNumbers.map((number) => {
                    // Показываем страницы вокруг текущей (кроме первой и последней)
                    if (number > 1 && number < totalPages && 
                        (number === currentPage - 1 || number === currentPage || number === currentPage + 1)) {
                        
                        if (number === currentPage) {
                            return (
                                <li key={number} className="page-num active-num">
                                    <span>{number}</span>
                                </li>
                            )
                        } else {
                            return (
                                <li key={number} className="page-num">
                                    <Link href={{
                                        pathname: `/catalog/${currentSlug}`,
                                        query: {
                                            ...routerQueries,
                                            page: number
                                        }
                                    }}>
                                        <a>{number}</a>
                                    </Link>
                                </li>
                            )
                        }
                    }
                    return null
                })}

                {/* Многоточие справа */}
                {currentPage < totalPages - 2 && (
                    <li className="page-num">
                        <span>...</span>
                    </li>
                )}

                {/* Последняя страница (если не первая) */}
                {totalPages > 1 && (
                    currentPage === totalPages ? (
                        <li className="page-num active-num">
                            <span>{totalPages}</span>
                        </li>
                    ) : (
                        <li className="page-num">
                            <Link href={{
                                pathname: `/catalog/${currentSlug}`,
                                query: {
                                    ...routerQueries,
                                    page: totalPages
                                }
                            }}>
                                <a>{totalPages}</a>
                            </Link>
                        </li>
                    )
                )}

                {/* Кнопка "Следующая" */}
                <li className={`page-next ${currentPage === totalPages ? 'not_active' : ''}`}>
                    {currentPage < totalPages && (
                        <Link href={{
                            pathname: `/catalog/${currentSlug}`,
                            query: {
                                ...routerQueries,
                                page: currentPage + 1
                            }
                        }}>
                            <a>&nbsp;</a>
                        </Link>
                    )}
                </li>
            </ul>
            
            {/* Мобильная версия */}
            <ul className="pagelist_mobile menu-default">
                <li className={`page-prev ${currentPage === 1 ? 'not_active' : ''}`}>
                    {currentPage > 1 && (
                        <Link href={{
                            pathname: `/catalog/${currentSlug}`,
                            query: currentPage === 2 ? routerQueriesWithoutPage : {
                                ...routerQueries,
                                page: currentPage - 1
                            }
                        }}>
                            <a></a>
                        </Link>
                    )}
                </li>
                
                <li className={`page-next ${currentPage === totalPages ? 'not_active' : ''}`}>
                    {currentPage < totalPages && (
                        <Link href={{
                            pathname: `/catalog/${currentSlug}`,
                            query: {
                                ...routerQueries,
                                page: currentPage + 1
                            }
                        }}>
                            <a>&nbsp;</a>
                        </Link>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default Pagination;