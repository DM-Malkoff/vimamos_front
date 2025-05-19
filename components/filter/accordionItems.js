import {useContext, useEffect, useState} from "react";
import {FilterDataContext} from "../../context/context";
import {useRouter} from "next/router";
import FilterOptions from "./filterOptions";

const AccordionItems = ({item, index, onPress}) => {
    const router = useRouter()
    const minPriceValue = router.query.min_price ? router.query.min_price: 'от'
    const maxPriceValue = router.query.max_price ? router.query.max_price: 'до'


    const [filterContext, setFilterContext] = useContext(FilterDataContext)

    const [filterOptions, setFilterOptions] = useState({})

    const [isShow, setIsShow] = useState(index == 0 ? true : false)

    const [filterAttributeIndex, setFilterAttributeIndex] = useState(null)

    function itemClick() {
        setIsShow(!isShow)
    }

    useEffect(() => {
        setFilterContext(filterOptions)
    }, [filterOptions])

    useEffect(()=>{
        if (!router.query.attribute){
            setFilterAttributeIndex(null)
        }
    },[router])

    function handlerMinPrice(event) {
        setFilterOptions({...filterOptions, min_price: event.target.value})
    }

    function handlerMaxPrice(event) {
        setFilterOptions({...filterOptions, max_price: event.target.value})
    }
    const filterOptionsHandler = () =>{
        setFilterOptions(...filterOptions,)
    }
    const isDiametrD = item.attribute === 'pa_diametr-d' ? true : false

    return (
        <>
        {item.categories?.includes(+router.query.id) || item.categories === 'all' ?
            <div className={`shop_filter_field ${isShow ? 'active' : ''}`} onClick={itemClick}>
                <div className="filter_field_title">{item.title}</div>
                <div className={`filter_field_body ${index === 0 ? 'range' : ''}`} onClick={(e)=>e.stopPropagation()}>
                    <div className="filter_field_content">
                        {item.attribute == 'price' ?
                            <>
                                <div className="input_from">
                                    <input
                                        placeholder={minPriceValue}

                                        type="number"
                                        onChange={handlerMinPrice}
                                        onClick={(event) => {
                                            event.stopPropagation()
                                        }}
                                        onKeyPress={(event) => {
                                            if (event.key === 'Enter') {
                                                onPress()
                                            }
                                        }}
                                    />
                                </div>
                                <div className="input_to">
                                    <input
                                        placeholder={maxPriceValue}
                                        type="number"
                                        onChange={handlerMaxPrice}
                                        onClick={(event) => {
                                            event.stopPropagation()
                                        }}
                                        onKeyPress={(event) => {
                                            if (event.key === 'Enter') {
                                                onPress()
                                            }
                                        }}
                                    />
                                </div>
                            </>
                            :
                            <>
                                {item.attribute_terms ?
                                    item.attribute_terms.map((attributeItem,index) => {
                                        const activeVal  = index === filterAttributeIndex ? "active-val":''
                                        return (
                                            <FilterOptions
                                                key ={attributeItem.id}
                                                isDiametrD={isDiametrD}
                                                attributeName = {item.attribute}
                                                attributeItem={attributeItem}
                                                activeVal = {activeVal}
                                                onCLick = {() => {
                                                    setFilterAttributeIndex(index)
                                                }}
                                            />
                                        )
                                    })
                                :
                                    false
                                }
                            </>
                        }
                    </div>
                </div>
           </div>
            :
            false
        }
        </>
    );
};

export default AccordionItems;