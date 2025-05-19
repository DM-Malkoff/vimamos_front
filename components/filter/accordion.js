import AccordionItems from "./accordionItems";
import {useContext} from "react";
import {useRouter} from "next/router";
import {FilterDataContext, ShowFilterContext} from "../../context/context";

const Accordion = ({terms, filterContent}) => {
    const router = useRouter()
    const {slug: _, ...routerQueries} = router.query
    const [filterContext, setFilterContext] = useContext(FilterDataContext)
    const [showFilterContext, setShowFilterContext] = useContext(ShowFilterContext)
    let attributesData = {}

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
    const renderedFilterContent = filterContent.map((item,index) => {
        const attributeTerms = terms.find((termItem) => termItem.id === item.id)
        if (attributeTerms || index == 0){
            attributesData = {...item, ...attributeTerms}
        }else{
            attributesData = item
        }

        return (
            <div key={item.id}>
                <AccordionItems
                    terms={terms}
                    item = {attributesData}
                    index = {index}
                    onPress = {()=>{
                        filterSearchHandler()
                    }}
                />
            </div>
        )
    })
    return (
        <>
            {renderedFilterContent}
            <div className="filter_buttons_wrap">
                <div className="filter_buttons">
                    <span className="shop_btn shop2-filter-go" onClick={filterSearchHandler}>Показать</span>
                    <span className="shop_btn reset" onClick={filterClearFilter}>Очистить</span>
                </div>
            </div>
        </>
    );
};

export default Accordion;