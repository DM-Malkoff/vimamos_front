import AccordionItems from "./accordionItems";
import {useContext} from "react";
import {useRouter} from "next/router";
import {FilterDataContext, ShowFilterContext} from "../../context/context";

const Accordion = ({terms}) => {
    const router = useRouter()
    const {slug: _, ...routerQueries} = router.query
    const [filterContext, setFilterContext] = useContext(FilterDataContext)
    const [showFilterContext, setShowFilterContext] = useContext(ShowFilterContext)

    const filterSearchHandler = () => {
        setShowFilterContext(false)
        router.push({
            pathname:router.query.slug,
            query: {...routerQueries, ...filterContext}
        })
    }
    const filterClearFilter = () => {
        setShowFilterContext(false)
        setIsReset(true)
        router.push({
            pathname: router.query.slug,
            query: {
                id: router.query.id
            }
        })
    }
    // const renderedFilterContent = filterContent.map((item,index) => {
    //     const attributeTerms = terms.find((termItem) => termItem.id === item.id)
    //     if (attributeTerms){
    //         attributesData = {...item, ...attributeTerms}
    //     }else{
    //         attributesData = item
    //     }
    //
    //     return (
    //         <div key={item.id}>
    //             <AccordionItems
    //                 terms={terms}
    //                 item = {attributesData}
    //                 index = {index}
    //                 onPress = {()=>{
    //                     filterSearchHandler()
    //                 }}
    //             />
    //         </div>
    //     )
    // })

    return (
        <>
            {terms?.map((item, index) => (
                <div key={`accordion-${item.id}`}>
                    <AccordionItems
                        item={item}
                        index={index}
                        onPress={filterSearchHandler}
                    />
                </div>
            )) ?? null}

            <div className="filter_buttons_wrap">
                <div className="filter_buttons">
                <span className="shop_btn shop2-filter-go" onClick={filterSearchHandler}>
                    Показать
                </span>
                    <span className="shop_btn reset" onClick={filterClearFilter}>
                    Очистить
                </span>
                </div>
            </div>
        </>
    );
};

export default Accordion;