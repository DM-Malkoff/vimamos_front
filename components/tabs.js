import {useState} from "react";
import TabContent from "./tabContent";

const Tabs = ({items}) => {
    const [active, setActive] = useState(0)
    const openTab = e => {
        setActive(+e.target.dataset.index)
    }

    return (
        <div>
            <ul className="shop_product_tabs r-tabs-nav">
                {items.map((item, index) => {
                    return (
                        item.content &&
                        <li key={index} className={`${index === active ? 'active-tab': ''}`}>
                            <span onClick={openTab} data-index={index}>{item.title}</span>
                        </li>
                    )
                })}
            </ul>
            {/* Рендерим все вкладки для SEO, но показываем только активную */}
            {items.map((item, index) => (
                item.content && 
                <div key={index} className={`tab-content-wrapper ${index === active ? 'active' : 'hidden'}`}>
                    <TabContent {...item} tabIndex={index}/>
                </div>
            ))}
        </div>
    );
};

export default Tabs;