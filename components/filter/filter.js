import Accordion from "./accordion";
import {useContext, useEffect, useState} from "react";
import {ShowFilterContext} from "../../context/context";

export default function Filter({attributes}) {
    /** Показывать ли фильтр в адаптиве */
    const [showFilter, setShowFilter] = useState(false)
    const [showFilterContext, setShowFilterContext] = useContext(ShowFilterContext)

    useEffect(() => {
        if (showFilterContext === true){
            setShowFilter(true)
        }else{
            setShowFilter(false)
        }
    }, [showFilterContext])

    /** Метод закрытия фильтра в адаптиве */
    const closeFilterButton = () => {
        setShowFilterContext(false)
        setShowFilter(false)
    }

    /** Аттрибуты для фильтра */
    const filterAttributes = [
        {
            id: 0,
            title: 'Цена: (руб.)',
            categories: 'all',
            attribute: 'price',
        },
        ...attributes || []
    ];

    return (
        <div className={`mode_folder_filter ${showFilter ? 'active' : ''}`}
             onClick={() => {
                 setShowFilterContext(false)
                 setShowFilter(false)
            }}
        >
            <div className="filter_block_wrapper">
                <div className="filter_block_wrap" onClick={(e) => {
                    e.stopPropagation()
                }}>
                    <div className="filter_block_close" onClick={()=> closeFilterButton()}>&nbsp;</div>
                    <div className="filter_block_title">Фильтр</div>
                    <form action="#" className="shop2-filter">
                        <div className="table-filter-param">
                            <Accordion terms={filterAttributes} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}