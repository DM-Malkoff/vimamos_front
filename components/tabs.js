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
            {items[active] && <TabContent {...items[active]} tabIndex={active}/>}
        </div>
    );
};

export default Tabs;