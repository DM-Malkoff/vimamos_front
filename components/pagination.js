import {quantityProducts} from "../constants/config";
import Link from "next/link";
import {useRouter} from "next/router";

const Pagination = ({totalQuantityProducts, productsLength}) => {
    const router = useRouter()
    const currentSlug = router.query.slug
    const currentPage = router.query.page !== undefined ? +router.query.page : undefined
    const {slug: _, ...routerQueries} = router.query
    const {page:__, ...routerQueriesWithoutPage} = routerQueries

    const pageNumbers = []

    if (productsLength < quantityProducts){
        for (let i = 1; i <= router.query.page; i++) {
            pageNumbers.push(i)
        }
    }else{
        for (let i = 1; i <= Math.ceil(totalQuantityProducts / quantityProducts); i++) {
            pageNumbers.push(i)
        }
    }

    return (
        <div className="shop_pagelist_wrap">
            <ul className="shop_pagelist">
                <li className={`page-prev ${(currentPage == undefined || currentPage == 1) ? 'not_active' : ''}`}>
                    <Link href={{
                        pathname: `/catalog/${currentSlug}`,
                        query: {
                            ...routerQueries,
                            page: currentPage - 1
                        }
                    }}
                    ><a></a></Link></li>

                {currentPage > 1
                    ?
                    <li className="page-num">
                        <Link href={{
                            pathname: `/catalog/${currentSlug}`,
                            query: {
                                ...routerQueriesWithoutPage,
                            }
                        }}
                        ><a>1</a>
                        </Link></li>
                    :
                    <li className="page-num active-num"><span>1</span></li>
                }
                {
                    currentPage > 3 ? <li className="page-num"><span>...</span></li> : false
                }
                {pageNumbers.map((number,index) => {
                    if (currentPage == undefined && number < 5 && number > 1) {
                        return (
                            <li key={index} className="page-num">
                                <Link href={{
                                    pathname: `/catalog/${currentSlug}`,
                                    query: {
                                        ...routerQueries,
                                        page: number
                                    }
                                }}
                                ><a>{number}</a>
                                </Link>
                            </li>
                        )
                    }
                    if (number > 1 && (number == currentPage || number == currentPage - 1 || number == currentPage + 1)) {
                        if (number == currentPage) {
                            return (
                                <li key={index} className="page-num active-num"><span>{number}</span></li>
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
                                    }}
                                    ><a>{number}</a>
                                    </Link>
                                </li>
                            )
                        }
                    }
                })}
                {
                    (currentPage < pageNumbers.length - 2 || currentPage == undefined) ?
                        <li className="page-num"><span>...</span></li> : false
                }
                {(currentPage < pageNumbers.length - 1 || currentPage == undefined) ?
                    <li className="page-num"><Link href={{
                        pathname: `/catalog/${currentSlug}`,
                        query: {
                            ...routerQueries,
                            page: pageNumbers.length
                        }
                    }}
                    ><a>{pageNumbers.length}</a></Link></li>
                    : false}

                <li className={`page-next ${currentPage == Math.ceil(totalQuantityProducts / quantityProducts) || productsLength < quantityProducts ? 'not_active' : ''}`}>
                    <Link href={{
                        pathname: `/catalog/${currentSlug}`,
                        query: {
                            ...routerQueries,
                            page: currentPage == undefined ? 2 : currentPage + 1
                        }
                    }}>
                        <a>&nbsp;</a>
                    </Link>
                </li>
            </ul>
            <ul className="pagelist_mobile menu-default">

                <li className={`page-prev ${(currentPage == undefined || currentPage == 1) ? 'not_active' : ''}`}>
                    {currentPage > 2 ?
                        <Link href={{
                            pathname: `/catalog/${currentSlug}`,
                            query: {
                                ...routerQueries,
                                page: currentPage - 1
                            }
                        }}
                        ><a></a></Link>
                        :
                        <Link href={{
                            pathname: `/catalog/${currentSlug}`,
                            query: {
                                ...routerQueries,
                            }
                        }}
                        ><a></a></Link>
                    }
                </li>
                <li className={`page-next ${currentPage == Math.ceil(totalQuantityProducts / quantityProducts) || productsLength < quantityProducts ? 'not_active' : ''}`}>
                    <Link href={{
                        pathname: `/catalog/${currentSlug}`,
                        query: {
                            ...routerQueries,
                            page: currentPage == undefined ? 2 : currentPage + 1
                        }
                    }}>
                        <a>&nbsp;</a>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;