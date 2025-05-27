import {useContext, useEffect, useState} from "react";
import {FilterDataContext} from "../../context/context";

const FilterOptions = ({isReset, attributeGroup, attributeOption}) => {
    const [activeVal, setActiveVal] = useState(false);
    const [filterContext, setFilterContext] = useContext(FilterDataContext);

    /** Если нажали кнопку "Сбросить" деактивируем параметры */
    useEffect(() => {
        if (isReset) {
            setActiveVal(false);
        }
    }, [isReset]);

    /** Выбор атрибута в фильтре */
    const filterOptionHandler = () => {
        setActiveVal(!activeVal);
        const newFilterContext = {...filterContext};
        
        // Если атрибут уже существует в контексте
        if (newFilterContext[attributeGroup.name]) {
            console.log('1')
            if (activeVal) {
                // Если значение уже выбрано, удаляем его
                newFilterContext[attributeGroup.name] = newFilterContext[attributeGroup.name]
                    .filter(term => term.slug !== attributeOption.slug);
                
                // Если массив значений пустой, удаляем весь атрибут
                if (newFilterContext[attributeGroup.name].length === 0) {
                    delete newFilterContext[attributeGroup.name];
                }
            } else {
                // Добавляем новое значение в массив
                console.log('attributeOption', attributeOption)
                newFilterContext[attributeGroup.name].push(attributeOption);
            }
        } else {
            console.log('2', newFilterContext)
            // Создаем новый массив для атрибута
            newFilterContext[attributeGroup.name] = [attributeOption];
            console.log('2-1', newFilterContext)
        }
        setFilterContext(newFilterContext);
    }

    return (
        <>
            <div 
                className={`param_val ${activeVal ? 'active-val' : ''}`} 
                onClick={filterOptionHandler}
            >
                {attributeOption.name}
            </div>
        </>
    );
};

export default FilterOptions;