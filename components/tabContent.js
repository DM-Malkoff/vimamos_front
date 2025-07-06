import { minifyHtml } from '../utils/htmlMinifier';

const TabContent = ({content, tabIndex}) => {
    return (
        <div className="shop_product_desc">
            <div className={`desc-area desc-area${tabIndex}`}>
                <div className="shop_product_params">
                    {/* Если content - это массив (характеристики) */}
                    {Array.isArray(content) && content.map((item) => {
                        return (
                            <div key={item.position} className="param_item">
                                <div className="param_title">{item.name}</div>
                                <div className="param_body">{item.options.join(', ')}</div>
                            </div>
                        )
                    })}
                    
                    {/* Если content - это строка (описание) - минифицируем HTML */}
                    {typeof content === 'string' && 
                        <div itemProp="description" dangerouslySetInnerHTML={{__html: minifyHtml(content)}}/>
                    }
                </div>
                <div className="shop2-clear-container"></div>
            </div>
        </div>
    );
};

export default TabContent;