import {useContext, useEffect, useState} from "react";
import {FilterDataContext} from "../../context/context";

const FilterOptions = ({attributeItem, activeVal, onCLick}) => {
    const [filterContext, setFilterContext] = useContext(FilterDataContext)
    const [filterOptions, setFilterOptions] = useState({})

    useEffect(()=>{
        console.log('filterOptions', filterOptions)
        setFilterContext(filterOptions)
    }, [filterOptions])

    /** Выбор атрибута в фильтре */
    const filterOptionHandler = () =>{
        setFilterOptions({...filterOptions, attribute: attributeItem.slug, attribute_term: attributeItem.name})
        onCLick()
    }

    return (
        <>
            <div className={`param_val ${activeVal}`} onClick={()=>filterOptionHandler()}>{attributeItem.name}</div>
        </>
    );
};

export default FilterOptions;