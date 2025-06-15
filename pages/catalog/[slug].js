import {useRouter} from "next/router";
import {getCategories} from "../../utils/categories";
import {getProductsData} from "../../utils/products";
import ProductList from "../../components/productList";
import Head from "next/head";
import Header from "../../components/layouts/header";
import BreadCrumbs from "../../components/breadcrumbs";
import Caption from "../../components/caption";
import Filter from "../../components/filter/filter";
import Footer from "../../components/layouts/footer";
import Sort from "../../components/sort";
import Pagination from "../../components/pagination";
import Towns from "../../utils/towns";
import {quantityProducts, siteName, siteUrl} from "../../constants/config";
import {getAttributes} from "../../utils/attributes";
import {useState, useEffect} from "react";

const Slug = ({products: initialProducts, categories, currentCategoryId, attributes}) => {
    const router = useRouter();
    const [products, setProducts] = useState(initialProducts);
    const currentCategory = categories.find(item => item.id == currentCategoryId);
    const availableSlug = currentCategory?.slug || '';
    const currentPage = router.query.page;
    const currentSlug = router.query.slug;

    /** Название текущей категории */
    let currentCategoryName = '';

    if (currentCategory) {
        if (currentCategory.name) {
            const brandName = currentCategory.acf?.cat_brand;

            if (brandName) {
                currentCategoryName = currentCategory.name.includes(brandName)
                    ? currentCategory.name
                    : `${currentCategory.name} ${brandName}`;
            } else {
                currentCategoryName = currentCategory.name;
            }
        }
    }

    let currentPageNum = currentPage == undefined ? 0 : currentPage;

    /** Формируем H1 */
    let townCaption = currentCategoryName;

    /** Формируем заголовок страницы */
    let pageTitle = `${currentCategoryName} - купить в ${Towns[currentPageNum] || ''} в Интернет-магазине недорого | Vimamos.ru`;

    /** Формируем метатег description страницы */
    let description = `${currentCategoryName} - большой ассортимент в нашем каталоге. Доставка в ${Towns[currentPageNum] || ''}. Онлайн оформление заказа. Гарантия от магазина и выгодные цены.`
    
    if (Towns[currentPageNum]) {
        townCaption = `${currentCategoryName} в ${Towns[currentPageNum]}`;
    }

    if (currentCategory.acf.gender){
        townCaption = `${currentCategory.acf.gender} ${townCaption[0].toLowerCase() + townCaption.slice(1)}`;
        pageTitle = `${currentCategory.acf.gender} ${pageTitle[0].toLowerCase() + pageTitle.slice(1)}`
        description = `${currentCategory.acf.gender} ${description[0].toLowerCase() + description.slice(1)}`;
    }

    // Эффект для обновления товаров при смене категории
    useEffect(() => {
        if (initialProducts) {
            setProducts(initialProducts);
        }
    }, [currentCategoryId, initialProducts]);

    /** Функция обновления списка товаров */
    const handleProductsUpdate = (newProducts) => {
        setProducts(newProducts);
    };

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={description} />
                {Towns[currentPageNum] ? <meta name="robots" content="all"/> : <meta name="robots" content="none"/>}
                {
                    router.query.orderby ||
                    router.query.min_price ||
                    router.query.max_price ||
                    router.query.attribute ||
                    router.query.attribute_term ||
                    currentSlug != availableSlug
                        ?
                        <meta name="robots" content="none"/>
                        :
                        false
                }

                <meta property="og:title" content={pageTitle}/>
                <meta property="og:image" content="/images/logo.jpg"/>
                <meta property="og:url" content={siteUrl + router.asPath}/>
                <meta property="og:site_name" content={siteName}/>
                <meta property="og:type" content="website"/>
            </Head>
            <Header categories={categories}/>
            <div className='site__container'>
                <div className='site__main__wrap folder'>
                    <main role="main" className="site__main folder">
                        <div className="site__main__in">
                            <BreadCrumbs namePage={currentCategory?.name || ''}/>
                            <Caption caption={townCaption}/>
                            <div className="mode_folder_wrapper">
                                <Filter attributes={attributes} onProductsUpdate={handleProductsUpdate}/>
                                <div className="mode_folder_body">
                                    <Sort totalQuantityProducts={currentCategory?.count || 0}
                                          quantityFilterProduct={products?.length || 0}/>
                                    {!products?.length ?
                                        <p className="products_error">Не найдено товаров по заданным параметрам,
                                            попробуйте изменить условия поиска.</p> :
                                        <ProductList products={products}/>
                                    }
                                    {(products?.length >= quantityProducts || router.query.page) ?
                                        <Pagination
                                            totalQuantityProducts={currentCategory?.count || 0}
                                            productsLength={products?.length || 0}
                                        />
                                        :
                                        false
                                    }
                                </div>
                            </div>
                            {!router.query.page && (
                                <div dangerouslySetInnerHTML={{__html: currentCategory.acf.cat_description}}/>
                            )}
                        </div>
                    </main>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Slug;

export async function getServerSideProps(ctx) {
    try {
        const { slug, id } = ctx.query;
        
        const {data: categories} = await getCategories();
        const {data: products} = await getProductsData(ctx.query);
        const attributes = await getAttributes(ctx.query.id ?? null);

        // Находим текущую категорию по id
        const currentCategory = categories.find(item => item.id == id);
        
        // Проверяем совпадение slug
        if (!currentCategory || currentCategory.slug !== slug) {
            return {
                notFound: true
            };
        }

        return {
            props: {
                categories: categories ?? {},
                products: products ?? {},
                currentCategoryId: ctx.query.id ?? null,
                attributes: attributes ?? [],
            }
        };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return {
            notFound: true
        };
    }
};