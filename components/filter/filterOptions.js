import {useContext, useEffect, useState} from "react";
import {FilterDataContext} from "../../context/context";

const FilterOptions = ({attributeName, attributeItem, activeVal, onCLick, isDiametrD}) => {
    const [filterContext, setFilterContext] = useContext(FilterDataContext)
    const [filterOptions, setFilterOptions] = useState({})

    useEffect(()=>{
        setFilterContext(filterOptions)
    }, [filterOptions])

    // const [activeOption, setActiveOption] = useState(false)
    const filterOptionHandler = () =>{
        setFilterOptions({...filterOptions, attribute: attributeName, attribute_term: attributeItem.id})
        // setActiveOption(!activeOption)
        onCLick()
    }
    const optionNameDiametrD =  `R${attributeItem.name.slice(0,-2)}`
    const optionName = isDiametrD ? optionNameDiametrD:attributeItem.name

    return (
        <>
            <div className={`param_val ${activeVal}`} onClick={()=>filterOptionHandler()}>{optionName}</div>
        </>
    );
};

export default FilterOptions;