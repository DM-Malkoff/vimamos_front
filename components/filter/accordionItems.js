import {useContext, useEffect, useState} from "react";
import {FilterDataContext} from "../../context/context";
import {useRouter} from "next/router";
import FilterOptions from "./filterOptions";

const AccordionItems = ({item, index, isReset, onPress}) => {
    const router = useRouter();
    const minPriceValue = router.query.min_price ? router.query.min_price: 'от';
    const maxPriceValue = router.query.max_price ? router.query.max_price: 'до';


    const [filterContext, setFilterContext] = useContext(FilterDataContext);

    const [filterOptions, setFilterOptions] = useState({});

    /** Флаг отображения группы атрибутов в фильтре */
    const [isShow, setIsShow] = useState(index === 0);

    function attributeGroupClick() {
        setIsShow(!isShow);
    }

    useEffect(() => {
        setFilterContext(filterOptions);
    }, [filterOptions])

    function handlerMinPrice(event) {
        setFilterOptions({...filterContext, min_price: event.target.value});
    }

    function handlerMaxPrice(event) {
        setFilterOptions({...filterContext, max_price: event.target.value});
    }

    return (
        <>
            <div className={`shop_filter_field ${isShow ? 'active' : ''}`} onClick={attributeGroupClick}>
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