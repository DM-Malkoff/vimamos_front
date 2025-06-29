import {useContext, useEffect, useState} from "react";
import {FilterDataContext} from "../../context/context";
import {useRouter} from "next/router";
import FilterOptions from "./filterOptions";

const AccordionItems = ({item, index, isReset, onPress, isLast}) => {
    const router = useRouter();
    
    // Используем пустую строку вместо 'от' и 'до' если есть значения в URL
    const minPriceValue = router.query.min_price || '';
    const maxPriceValue = router.query.max_price || '';

    const [filterContext, setFilterContext] = useContext(FilterDataContext);

    const [filterOptions, setFilterOptions] = useState({
        min_price: minPriceValue,
        max_price: maxPriceValue
    });

    /** Флаг отображения группы атрибутов в фильтре */
    const [isShow, setIsShow] = useState(index === 0);

    function attributeGroupClick() {
        setIsShow(!isShow);
    }

    useEffect(() => {
        if (filterOptions.min_price !== undefined || filterOptions.max_price !== undefined) {
            setFilterContext(filterOptions);
        }
    }, [filterOptions, setFilterContext]);

    function handlerMinPrice(event) {
        const value = event.target.value;
        setFilterOptions(prev => ({...prev, min_price: value === '' ? '' : value}));
    }

    function handlerMaxPrice(event) {
        const value = event.target.value;
        setFilterOptions(prev => ({...prev, max_price: value === '' ? '' : value}));
    }

    return (
        <>
            <div 
                className={`shop_filter_field ${isShow ? 'active' : ''}`} 
                onClick={attributeGroupClick}
                style={isLast && !isShow ? { paddingBottom: '20px' } : {}}
            >
                <div className="filter_field_title">{item.title}</div>
                <div className={`filter_field_body ${index === 0 ? 'range' : ''}`} onClick={(e)=>e.stopPropagation()}>
                    <div className="filter_field_content" style={{ paddingBottom: isLast ? '30px' : '10px' }}>
                        {item.attribute == 'price' ?
                            <>
                                <div className="input_from">
                                    <input
                                        placeholder="от"
                                        type="number"
                                        value={filterOptions.min_price}
                                        onChange={handlerMinPrice}
                                        onClick={(event) => {
                                            event.stopPropagation()
                                        }}
                                        onKeyPress={(event) => {
                                            if (event.key === 'Enter') {
                                                onPress()
                                            }
                                        }}
                                        min={0}
                                    />
                                </div>
                                <div className="input_to">
                                    <input
                                        placeholder="до"
                                        type="number"
                                        value={filterOptions.max_price}
                                        onChange={handlerMaxPrice}
                                        onClick={(event) => {
                                            event.stopPropagation()
                                        }}
                                        onKeyPress={(event) => {
                                            if (event.key === 'Enter') {
                                                onPress()
                                            }
                                        }}
                                        min={0}
                                    />
                                </div>
                            </>
                            :
                            <>
                                {item.options ?
                                    item.options.map((attributeOption, index) => {
                                        return (
                                            <FilterOptions
                                                key={`option-${attributeOption.slug}`}
                                                isReset={isReset}
                                                attributeGroup={item}
                                                attributeOption={attributeOption}
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
        </>
    );
};

export default AccordionItems;