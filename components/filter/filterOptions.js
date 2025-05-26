import {useContext, useEffect, useState} from "react";
import {FilterDataContext} from "../../context/context";

const FilterOptions = ({attributeName, attributeItem, activeVal, onCLick}) => {
    const [filterContext, setFilterContext] = useContext(FilterDataContext)
    const [filterOptions, setFilterOptions] = useState({})

    useEffect(()=>{
        setFilterContext(filterOptions)
    }, [filterOptions])

    const filterOptionHandler = () =>{
        setFilterOptions({...filterOptions, attribute: attributeName, attribute_term: attributeItem.id})
        onCLick()
    }

    return (
        <>
            <div className={`param_val ${activeVal}`} onClick={()=>filterOptionHandler()}>{attributeItem}</div>
        </>
    );
};

export default FilterOptions;