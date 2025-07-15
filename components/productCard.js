import Link from "next/link";
import Image from "next/image";
import GoToPartner from "./goToPartner";
import {imageQuality} from "../constants/config";
import {shimmer, toBase64} from "../utils/imageUtils";

const ProductCard = ({productData, showBrand, isFirst = false, isSimilar = false}) => {
    const customFields = productData.meta_data;

    const shopNameCustomField = customFields ? customFields.find(item => item.key === 'shop_name') : null;
    const shopName = shopNameCustomField ? shopNameCustomField.value : null;

    const wcPartnerUrl = customFields ? customFields?.find(item => item.key === 'wc_partner_url'): null;
    const shopLink = wcPartnerUrl ? wcPartnerUrl.value : null;

    /** Рассчет скидки в процентах */
    function mathDiscount(salePrice, regularPrice) {
        if (!regularPrice || !salePrice) {
            return false;
        }
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
                                {productData.name}
                            </Link>
                        </div>
                        {showBrand && productData.brands && (
                            <div className="vendor_option">
                                <Link href={
                                    {
                                        pathname: `/p/${productData.slug}`,
                                        query: {
                                            id: productData.id
                                        }
                                    }
                                }>{productData.brands[0].name}</Link>
                            </div>
                        )}
                        {/*<div className="product-compare">*/}
                        {/*    <label>*/}
                        {/*        <input type="checkbox"/>*/}
                        {/*        Добавить к сравнению*/}
                        {/*    </label>*/}
                        {/*</div>*/}
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
                                <Image
                                    src={productData.images?.length ? productData.images[0].src : '/images/no_image.png'}
                                    alt={productData.name}
                                    fill={true}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    style={{ objectFit: 'contain' }}
                                    priority={isFirst}
                                    placeholder="blur"
                                    blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(400, 400))}`}
                                    quality={imageQuality.normal}
                                />
                            </Link>
                        </div>
                        {/* Вывод скидки в % в блоке фото */}
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
                        {(productData.sale_price && productData.regular_price) ? (
                            <>
                                <div className="product-price">
                                    <div className="price-old question">
                                        <span><strong>{productData.regular_price}</strong> ₽</span>
                                    </div>
                                    <div className="price-current">
                                        <strong>{productData.sale_price}</strong> ₽
                                    </div>
                                </div>
                                {isSimilar ? 
                                    <div className="shop_product_button_view"></div>
                                    :
                                    <GoToPartner url={shopLink} shopName={shopName} />
                                }
                            </>
                        ) : (productData.sale_price || productData.regular_price) ? (
                            <>
                                <div className="product-price">
                                    <div className="price-current">
                                        <strong>{productData.sale_price || productData.regular_price}</strong> ₽
                                    </div>
                                </div>
                                {isSimilar ? 
                                    <div className="shop_product_button_view"></div>
                                    :
                                    <GoToPartner url={shopLink} shopName={shopName} />
                                }
                            </>
                        ) : (
                            <span className="not_available">Возможно в наличии</span>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductCard;