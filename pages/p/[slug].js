import {useRouter} from "next/router";
import Header from "../../components/layouts/header";
import BreadCrumbs from "../../components/breadcrumbs";
import Caption from "../../components/caption";
import Footer from "../../components/layouts/footer";
import Head from "next/head";
import {getProductData} from "../../utils/product";
import GoToPartner from "../../components/goToPartner";
import Link from "next/link";
import Tabs from "../../components/tabs";
import RelatedProductsSlider from "../../components/relatedProductsSlider";
import ProductImages from "../../components/productImages";
import {siteName, siteUrl} from "../../constants/config";
import {getCategories} from "../../utils/categories";
import { useState } from "react";

export default function ProductPage({product,categories}) {
    const pathLocation = useRouter().pathname;
    const customFields = product.meta_data;
    const [selectedSize, setSelectedSize] = useState(null);
    
    // const description = customFields.find(item => item.key === "wc_description");
    const sku = product.sku;
    const shopName = customFields.find(item => item.key === 'shop_name')?.value;
    const shopLink = customFields.find(item => item.key === 'wc_partner_url')?.value;
    const tabsItems = [
        {title: 'Характеристики', content: product.attributes},
        {title: 'Описание', content: product.description}
    ]

    /** Провека на магазин Thomas Munz для кастомизации заголовков и метатегов */
    let shopIsThomasMuenz = shopName === 'Thomas Munz';

    function mathDiscount(salePrice, regularPrice) {
        let percent = (regularPrice - salePrice) * 100 / regularPrice
        return percent.toFixed(0)
    }

    /** Метод формирования H1 */
    function getCaption() {
        if (product) {
            let caption = product.name;

            if (!caption.includes(product.brands[0].name)) {
                caption = `${caption} ${product.brands[0].name}`;
            }

            if (!caption.includes(product.sku)) {
                caption = `${caption} ${product.sku}`;
            }

            return caption;
        }
        return 'Заголовок';
    }

    /** Метод формирования Title */
    function getTitle() {
        if (product) {
            if (!product.name.includes(product.brands[0].name)) {
                return `${sku} ${product.brands[0].name} ${product.name} купить в Интернет-магазине с доставкой недорого | Vimamos.ru`;
            }

            if (!product.name.includes(sku)) {
                return `${sku} ${product.name} купить в Интернет-магазине с доставкой недорого | Vimamos.ru`;
            }
            return `${product.name} купить в Интернет-магазине с доставкой недорого | Vimamos.ru`;
        }
        return '';
    }

    function getDescription() {
        if (product) {
            if (!product.name.includes(product.brands[0].name)) {
                return `${product.name} ${product.brands[0].name} купить в Интернет-магазине с доставкой по России всего за ${product.sale_price ?? product.regular_price} руб. Артикул ${sku}`;
            }

            return `${product.name} купить в Интернет-магазине с доставкой по России всего за ${product.sale_price ?? product.regular_price} руб. Артикул ${sku}`;
        }
        return '';
    }

    return (
        <>
            <Head>
                <title>{getTitle()}</title>
                <meta name="description" content={getDescription()} />
                <meta property="og:title" content={`${sku} ${product.name} купить в Интернет-магазине с доставкой недорого`}/>
                {product?.images.map(item =>
                    <meta key={item.id} property="og:image" content={item.src}/>
                )}
                <meta property="og:url" content={siteUrl + useRouter().asPath}/>
                <meta property="og:site_name" content={siteName}/>
                <meta property="og:type" content="website"/>
            </Head>
            <Header categories={categories}/>
            <div className='site__container product'>
                <div className='site__main__wrap product'>
                    <main role="main" className="site__main product">
                        <div className="site__main__in">
                            <BreadCrumbs
                                isProduct={true}
                                path={pathLocation}
                                namePage={product.name}
                                parentCategoryName={product.categories[0].name !== 'Misc' && product.categories[0].name}
                                parentCategoryUrl={`${product.categories[0].slug}` + '?id=' + `${product.categories[0].id}`}

                            />
                            <div className="product_top_wrapper" itemScope itemType="http://schema.org/Product">
                                <form method="post" className="shop2-product">
                                    <div className="product_side_l" id="product__images">
                                        {(+product.sale_price && +product.regular_price) ?
                                            <div className="product_labels">
                                                <div className="product_label_item product_sale">
                                                    -{mathDiscount(product.sale_price, product.regular_price)} %
                                                </div>
                                            </div>
                                            :
                                            false
                                        }
                                        <div className="product_image product__gallery__images">
                                            <ProductImages images={product?.images}/>
                                        </div>
                                    </div>
                                    <div className="product_side_r">
                                        <div className="product_top_block">
                                            <div className="product-compare">
                                                <label>
                                                    <input type="checkbox"/>
                                                    Добавить к сравнению
                                                </label>
                                            </div>
                                            <div className="product_name" itemProp="name">
                                                <Caption caption={getCaption()} />
                                            </div>
                                            <div className="vendor_option">
                                                Артикул {sku}
                                            </div>
                                        </div>
                                        <div className="product_bot_block">
                                            <div className="shop2_product_options_wr">
                                                <div className="shop2_product_options">
                                                    {(() => {
                                                        // Разделяем атрибуты: сначала все кроме pa_razmer, потом pa_razmer
                                                        const sizeAttribute = product.attributes.find(item => item.slug === 'pa_razmer');
                                                        const otherAttributes = product.attributes.filter(item => item.slug !== 'pa_razmer');
                                                        
                                                        // Берем первые 3 обычных атрибута и добавляем размер в конец
                                                        const attributesToShow = [
                                                            ...otherAttributes.slice(0, 3),
                                                            ...(sizeAttribute ? [sizeAttribute] : [])
                                                        ].slice(0, 4);

                                                        return attributesToShow.map((item, index) => {
                                                            // Если это атрибут размера, делаем его интерактивным
                                                            if (item.slug === 'pa_razmer') {
                                                                item.options.sort();
                                                                return (
                                                                    <div key={item.position || index}
                                                                         className="option_item odd type-select size-selector">
                                                                        <div className="option_title">{item.name}:</div>
                                                                        <div className="option_body size-options">
                                                                            {item.options.map((size, sizeIndex) => (
                                                                                <button
                                                                                    key={sizeIndex}
                                                                                    type="button"
                                                                                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                                                                    onClick={(e) => {
                                                                                        e.preventDefault();
                                                                                        setSelectedSize(selectedSize === size ? null : size);
                                                                                    }}
                                                                                >
                                                                                    {size}
                                                                                </button>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                            
                                                            // Для остальных атрибутов оставляем как было
                                                            return (
                                                                <div key={item.position || index}
                                                                     className="option_item odd type-select">
                                                                    <div className="option_title">{item.name}:</div>
                                                                    <div className="option_body">{item.options.join(', ')}</div>
                                                                </div>
                                                            );
                                                        });
                                                    })()}
                                                </div>
                                            </div>
                                            <div className="product-price" itemProp="offers" itemScope
                                                 itemType="http://schema.org/Offer">
                                                {(product.sale_price && product.regular_price) ?
                                                    <div className="price-old question">
                                                        <span><strong>{product.regular_price}</strong> руб.</span>
                                                    </div>
                                                    :
                                                    false
                                                }
                                                {(+product.sale_price || +product.regular_price) ?
                                                    <div className="price-current">
                                                        <strong>{product.sale_price || product.regular_price}</strong> руб.
                                                        <meta itemProp="price" content={product.sale_price || product.regular_price}/>
                                                        <meta itemProp="priceCurrency" content="RUB"/>
                                                    </div>
                                                    :
                                                    <span>Возможно нет в наличии.</span>
                                                }
                                                <link
                                                    itemProp="availability"
                                                    href="http://schema.org/InStock"
                                                    content={`${product.price ? 'В наличии' : 'Возможно в наличии'}`}/>
                                            </div>
                                            <div className="product_buttons">
                                                <div className="product_buttons_in">
                                                    <GoToPartner url={shopLink} shopName={shopName} isProductCard={true} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product_categories_block">
                                            <span className="caption">Товар находится в категориях:</span>
                                            <div className="links">
                                                {product.categories.map((item) => {
                                                    return (
                                                        item.name !== 'Misc' &&
                                                        <Link key={item.id} href={{
                                                            pathname: `/catalog/${item.slug}`,
                                                            query: {id: item.id}

                                                        }}>
                                                            {item.name}
                                                        </Link>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="shop_product_data">
                                <div className="shop_product_tabs_wr">
                                    <Tabs items={tabsItems}/>
                                </div>
                            </div>

                            <div className="shop_kind_wrap">
                                <h2 className="shop_collection_header">
                                    Рекомендуемые товары
                                </h2>
                                <RelatedProductsSlider relatedProducts={product.similar_products}/>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export async function getServerSideProps(ctx) {
    try {
        const { slug, id } = ctx.query;
        
        // Получаем данные товара по id
        const {data: product} = await getProductData(id);
        const {data: categories} = await getCategories();
        
        // Проверяем совпадение slug
        if (!product || product.slug !== slug) {
            return {
                notFound: true
            };
        }

        return {
            props: {
                product: product ?? {},
                categories: categories ?? {}
            }
        };
    } catch (error) {
        console.error('Error fetching product data:', error);
        return {
            notFound: true
        };
    }
}