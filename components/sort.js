import {useContext, useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {sortSettings} from "../constants/config";
import {ShowFilterContext} from "../context/context";

const Sort = () => {
    const router = useRouter()
    const {slug: _, ...routerQueries} = router.query
    const {order:__,orderby:___, ...routerQueriesWithoutSort} = routerQueries
    const [sortClick, setSortCLick] = useState(false)
    const [sortTitle, setSortTitle] = useState('Сортировать по')
    const [selectedSortType, setSelectedSortType] = useState('')
    const sortTypes = sortSettings
    const [showFilterContext, setShowFilterContext] = useContext(ShowFilterContext)
    const ref = useRef(null)

    useEffect(() => {
        document.addEventListener("click", (e) => {
            const withinBoundaries = e.composedPath().includes(ref.current)
            if (!withinBoundaries) {
                setSortCLick(false)
            }
        })
    }, [])
    useEffect(()=>{
        setSortTitle(sortTypes.find(item => item.sortType === router.query.order)?.sortText||'Сортировать по')
        if (router.query.order){
            setSelectedSortType(router.query.order)
        } else {
            setSelectedSortType('clear')
        }
    },[router.query.order,sortTypes])

    const sortHandler = () => {
        setSortCLick(!sortClick)
    }

    const sortTypeHandler = (sortName,sortType) => {
        setSortCLick(false)
        setSelectedSortType(sortType)
        if (sortType === 'clear') {
            router.push({
                pathname: router.query.slug,
                query: {
                    ...routerQueriesWithoutSort,
                }
            })
            setSortTitle('Сортировать по')
        } else {
            router.push({
                pathname: router.query.slug,
                query: {
                    ...routerQueries,
                    orderby: sortName,
                    order: sortType
                }
            })
            setSortTitle(sortTypes.find((item => item.sortType == sortType)).sortText)
        }
    }
    const filterButtonClick = () => {
        setShowFilterContext(true)
    }

    return (
        <div className="shop_sorting_panel">
            <div className="sort_bl_wr">
                <div className={`sort_bl_in ${sortClick ? 'opened' : ''}`} ref={ref}>
                    <div className="sort_bl_title" onClick={sortHandler}>
                        <span>{sortTitle}</span>
                    </div>
                    <div className="sort_bl_wrap" style={{display: `${sortClick ? 'block' : 'none'}`}}>
                        <div className="sort_body">
                            {sortTypes.map((item) => {
                                return (
                                    <div key={item.sortText}>
                                        <span
                                            className={`sort_param ${selectedSortType === item.sortType ? 'active' : ''}`}>
                                            <span onClick={() => sortTypeHandler(item.sortName,item.sortType)}>{item.sortText}</span>
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="filter_popup_btn_wr">
                <div className="filter_popup_btn" onClick={()=>filterButtonClick()}>
                    <span>Фильтр</span>
                </div>
            </div>
            {/*<div className="total_qnt_products">{Object.keys(router.query).length > 1 && quantityFilterProduct && router.query.page !== undefined >= quantityProducts ? '': `Найдено ${quantityFilterProduct >= quantityProducts ? totalQuantityProducts:quantityFilterProduct} товаров`}</div>*/}
        </div>
    );
};

export default Sort;