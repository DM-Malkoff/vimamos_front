import {useContext, useEffect, useState} from "react";
import {FilterDataContext} from "../../context/context";

const FilterOptions = ({isReset, attributeItem, onCLick}) => {
    const [activeVal, setActiveVal] = useState(false);
    const [filterContext, setFilterContext] = useContext(FilterDataContext)
    const [filterOptions, setFilterOptions] = useState({})

    /** Если нажали кнопку "Сбросить" деактивируем параметры */
    useEffect(() => {
        if (isReset) {
            setActiveVal(false);
            setFilterOptions({}); // Очищаем параметры фильтра
            setFilterContext({}); // Очищаем контекст фильтра
        }
    }, [isReset, setFilterContext])

    useEffect(()=>{
        setFilterContext(filterOptions)
    }, [filterOptions, setFilterContext])

    /** Выбор атрибута в фильтре */
    const filterOptionHandler = () => {
        setActiveVal(!activeVal);
        setFilterOptions({...filterOptions, attribute: attributeItem.slug, attribute_term: attributeItem.name});
        onCLick();
    }

    return (
        <>
            <div className={`param_val ${activeVal ? 'active-val' : ''}`} onClick={()=>filterOptionHandler()}>{attributeItem.name}</div>
        </>
    );
};

export default FilterOptions;