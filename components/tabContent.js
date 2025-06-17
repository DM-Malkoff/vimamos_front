const TabContent = ({content, tabIndex}) => {
    return (
        <div className="shop_product_desc">
            <div className={`desc-area desc-area${tabIndex}`}>
                <div className="shop_product_params">
                    {tabIndex === 0 && content.map((item) => {
                        return (
                            <div key={item.position} className="param_item">
                                <div className="param_title">{item.name}</div>
                                <div className="param_body">{item.options.join(', ')}</div>
                            </div>
                        )
                    })}
                    {tabIndex === 1 ? <div itemProp="description" dangerouslySetInnerHTML={{__html: content}}/> : false}
                </div>
                <div className="shop2-clear-container"></div>
            </div>
        </div>
    );
};

export default TabContent;