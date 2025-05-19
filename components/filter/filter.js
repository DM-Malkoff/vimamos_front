import Accordion from "./accordion";
import {useContext, useEffect, useState} from "react";
import {ShowFilterContext} from "../../context/context";

export default function Filter({terms}) {
    const [showFilter, setShowFilter] = useState(false)
    const [showFilterContext, setShowFilterContext] = useContext(ShowFilterContext)

    useEffect(() => {
        if (showFilterContext === true){
            setShowFilter(true)
        }else{
            setShowFilter(false)
        }
    }, [showFilterContext])

    const closeFilterButton = () => {
        setShowFilterContext(false)
        setShowFilter(false)
    }

    const filterContent = [
        {
            id: 0,
            title: 'Цена: (руб.)',
            categories: 'all',
            attribute: 'price',
        },
        {
            id: 3,
            title: 'Тип диска',
            categories: [27],
            attribute: 'pa_tip-diska',
        },
        {
            id: 5,
            title: 'Диаметр (D), в дюймах',
            categories: [27],
            attribute: 'pa_diametr-d',
        },
        {
            id: 16,
            title: 'Диаметр, в дюймах',
            categories: [5033,4741],
            attribute: 'pa_diametr',
        },
        {
            id: 18,
            title: 'Индекс нагрузки',
            categories: [5033],
            attribute: 'pa_indeks-nagruzki',
        },
        {
            id: 14,
            title: 'Ширина, в дюймах',
            categories: [5033, 4741],
            attribute: 'pa_shirina-diska',
        },
        {
            id: 4,
            title: 'Ширина обода, в дюймах',
            categories: [27,5033],
            attribute: 'pa_shirina-diska',
        },
        {
            id: 15,
            title: 'Профиль',
            categories: [5033,4741],
            attribute: 'pa_profil',
        },
        {
            id: 7,
            title: 'PCD (Сверловка), мм.',
            categories: [27,5225,5226,5227],
            attribute: 'pa_pcd',
        },
        {
            id: 8,
            title: 'Тип крепежа',
            categories: [27,5225,5226,5227],
            attribute: 'pa_tip-krepezha',
        },
        {
            id: 6,
            title: 'Вылет (ET)',
            categories: [27],
            attribute: 'pa_vylet-et',
        },
        {
            id: 1,
            title: 'Производитель',
            categories: [27,956,4741],
            attribute: 'pa_proizvoditel',
        },
        {
            id: 2,
            title: 'Модель',
            categories: [27,956],
            attribute: 'pa_model',
        },
        {
            id: 30,
            title: 'Flow Forming',
            categories: [27],
            attribute: 'pa_flow-forming',
        },
        {
            id: 34,
            title: 'Область применения',
            categories: [4741],
            attribute: 'pa_oblast-primeneniya',
        },

    ]

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
                            <Accordion
                                terms={terms}
                                filterContent={filterContent}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}