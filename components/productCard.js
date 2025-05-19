import Link from "next/link";
import Image from "next/image";
import GoToPartner from "./goToPartner";

const ProductCard = ({productData}) => {
    const customFields = productData.meta_data
    const shopName = customFields.find(item => item.key === 'shop_name') ? customFields.find(item => item.key === 'shop_name').value : ''
    const shopLink = customFields.find(item => item.key === 'wc_partner_url').value

    function mathDiscount(salePrice, regularPrice) {
        let percent = (regularPrice - salePrice) * 100 / regularPrice
        return percent.toFixed(0)
    }

    return (
        <div key={productData.id} className='shop2_product_item'>
            <div className='shop2_item_in'>
                <div className="thumbs__top__wrap">
                    <div className="product_top">
                        <div className="product_name">
                            <Link href={
                                {
                                    pathname: `/p/${productData.slug}`,
                                    query: {
                                        id: productData.id
                                    }
                                }
                            }>
                                <a>{productData.name}</a>
                            </Link>
                        </div>
                        <div className="product-compare">
                            <label>
                                <input type="checkbox"/>
                                Добавить к сравнению
                            </label>
                        </div>
                    </div>
                    <div className="product_image_wr">
                        <div className="product_image">
                            <Link href={
                                {
                                    pathname: `/p/${productData.slug}`,
                                    query: {
                                        id: productData.id
                                    }
                                }
                            }>
                                <a>
                                    <Image
                                        src={productData.images.length ? productData.images[0].src : '/images/no_image.png'}
                                        alt={productData.name}
                                        layout="fill"
                                    />
                                </a>
                            </Link>
                        </div>
                        {(productData.sale_price && productData.regular_price) ?
                            <div className="product-label">
                                <div className="product_label_item product-sale">
                                    -{mathDiscount(productData.sale_price, productData.regular_price)} %
                                </div>
                            </div>
                            :
                            false
                        }
                    </div>

                    <div className="product-bot">
                        {productData.sale_price ?
                            <>
                                <div className="product-price">
                                    {productData.regular_price > 0 ?
                                        <div className="price-old question">
                                            <span><strong>{productData.regular_price}</strong> ₽</span>
                                        </div>
                                        :
                                        false
                                    }
                                    <div className="price-current">
                                        <strong>{productData.sale_price}</strong> ₽
                                    </div>
                                </div>
                                <GoToPartner url={shopLink} shopName={shopName}/>
                            </>
                            :
                            <span className="not_available">Нет в наличии</span>
                        }
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductCard;