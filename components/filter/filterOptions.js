import {useContext, useEffect, useState} from "react";
import {FilterDataContext} from "../../context/context";
import {colors} from "../../constants/config";

const FilterOptions = ({isReset, attributeGroup, attributeOption}) => {
    const [activeVal, setActiveVal] = useState(false);
    const [filterContext, setFilterContext] = useContext(FilterDataContext);

    /** Находим цвет по slug */
    const getColorBySlug = (slug) => {
        const colorItem = colors.find(color => color.slug === slug);
        return colorItem ? colorItem.code : null;
    }

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
                newFilterContext[attributeGroup.name].push(attributeOption);
            }
        } else {
            // Создаем новый массив для атрибута
            newFilterContext[attributeGroup.name] = [attributeOption];
        }
        setFilterContext(newFilterContext);
    }

    return (
        <>
            <div 
                className={`param_val ${activeVal ? 'active-val' : ''}`} 
                onClick={filterOptionHandler}
            >
                {attributeGroup.slug === 'pa_cvet' && (
                    <span 
                        className={attributeOption.slug === 'belyj' ? '' : 'color-circle'}
                        style={{
                            backgroundColor: getColorBySlug(attributeOption.slug)
                        }}
                    />
                )}
                {attributeGroup.slug === 'pa_brend' ? attributeOption.name : attributeOption.name.toLowerCase()}
            </div>
        </>
    );
};

export default FilterOptions;