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

const Slug = ({products: initialProducts, categories, currentCategoryId, attributes, error}) => {
    /** Массив брендов которые надо отображать в категории их товаров */
    const brandNameForShowInCategory = [
        {brand: 'adidas', categoryId:  '740'},
    ];

    const router = useRouter();
    const [products, setProducts] = useState(initialProducts);
    
    // Эффект для обновления товаров при смене категории
    useEffect(() => {
        if (initialProducts) {
            setProducts(initialProducts);
        }
    }, [currentCategoryId, initialProducts]);
    
    // Обработка ошибки загрузки данных (после всех хуков)
    if (error) {
        return (
            <div className="error-page">
                <h1>Ошибка загрузки данных</h1>
                <p>Попробуйте обновить страницу или вернуться позже.</p>
                <button onClick={() => router.reload()}>Обновить страницу</button>
            </div>
        );
    }
    
    // Проверяем, что categories является массивом
    const categoriesArray = Array.isArray(categories) ? categories : [];
    const currentCategory = categoriesArray.find(item => item.id == currentCategoryId);
    const availableSlug = currentCategory?.slug || '';
    const currentPage = router.query.page;
    const currentSlug = router.query.slug;

    /** Флаг отображения бренда в категории товаров */
    const showBrand = brandNameForShowInCategory.some(v => v.categoryId === currentCategoryId);

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

    /** Формеирование Title */
    function getPageTitle() {
        if (currentCategory && currentCategory.acf && currentCategory.acf.custom_seo_title) {
            return currentCategory.acf.custom_seo_title;
        }

        if (currentCategory && currentCategory.acf && currentCategory.acf.gender) {
            return pageTitle = `${currentCategory.acf.gender} ${pageTitle[0].toLowerCase() + pageTitle.slice(1)}`;
        }

        return pageTitle;
    }

    function getSeoDescription(){
        if (currentCategory && currentCategory.acf && currentCategory.acf.custom_seo_description) {
            return currentCategory.acf.custom_seo_description;
        }

        if (currentCategory && currentCategory.acf && currentCategory.acf.gender){
            return `${currentCategory.acf.gender} ${description[0].toLowerCase() + description.slice(1)}`;
        }

        return description
    }

    /** Формирование H1 */
    function getH1() {
        if (currentCategory && currentCategory.acf && currentCategory.acf.custom_h1) {
            return currentCategory.acf.custom_h1;
        }

        if (currentCategory && currentCategory.acf && currentCategory.acf.gender){
            return `${currentCategory.acf.gender} ${townCaption[0].toLowerCase() + townCaption.slice(1)}`
        }

        return townCaption;
    }

    /** Функция обновления списка товаров */
    const handleProductsUpdate = (newProducts) => {
        setProducts(newProducts);
    };

    return (
        <>
            <Head>
                <title>{getPageTitle()}</title>
                <meta name="description" content={getSeoDescription()} />
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
                            <Caption caption={getH1()}/>
                            <div className="mode_folder_wrapper">
                                <Filter attributes={attributes} onProductsUpdate={handleProductsUpdate}/>
                                <div className="mode_folder_body">
                                    <Sort totalQuantityProducts={currentCategory?.count || 0}
                                          quantityFilterProduct={products?.length || 0}/>
                                    {!products?.length ?
                                        <p className="products_error">Не найдено товаров по заданным параметрам,
                                            попробуйте изменить условия поиска.</p> :
                                        <ProductList products={products} showBrand={showBrand} />
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
                                <div dangerouslySetInnerHTML={{__html: currentCategory.acf?.cat_description}}/>
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
        
        // Логируем запрос для отладки
        console.log('Catalog getServerSideProps:', { slug, id });
        
        // Выполняем запросы параллельно с индивидуальной обработкой ошибок
        const [categoriesResult, productsResult, attributesResult] = await Promise.allSettled([
            getCategories(),
            getProductsData(ctx.query),
            getAttributes(ctx.query.id ?? null)
        ]);
        
        // Обрабатываем результаты
        const categories = categoriesResult.status === 'fulfilled' ? 
            (categoriesResult.value?.data || []) : [];
        const products = productsResult.status === 'fulfilled' ? 
            (productsResult.value?.data || []) : [];
        const attributes = attributesResult.status === 'fulfilled' ? 
            (attributesResult.value || []) : [];
        
        // Логируем ошибки
        if (categoriesResult.status === 'rejected') {
            console.error('Categories fetch failed:', categoriesResult.reason);
        }
        if (productsResult.status === 'rejected') {
            console.error('Products fetch failed:', productsResult.reason);
        }
        if (attributesResult.status === 'rejected') {
            console.error('Attributes fetch failed:', attributesResult.reason);
        }

        // Находим текущую категорию по id
        const currentCategory = categories.find(item => item.id == id);
        
        // Проверяем совпадение slug
        if (!currentCategory || currentCategory.slug !== slug) {
            console.log('Category not found or slug mismatch:', { 
                currentCategory: currentCategory ? currentCategory.slug : 'not found', 
                expectedSlug: slug 
            });
            return {
                notFound: true
            };
        }

        console.log('Catalog data loaded successfully:', { 
            categoriesCount: categories.length, 
            productsCount: products.length,
            attributesCount: attributes.length
        });

        return {
            props: {
                categories: categories,
                products: products,
                currentCategoryId: ctx.query.id ?? null,
                attributes: attributes,
            }
        };
    } catch (error) {
        console.error('Critical error in getServerSideProps:', error);
        
        // Возвращаем базовую страницу с ошибкой вместо 404
        return {
            props: {
                categories: [],
                products: [],
                currentCategoryId: ctx.query.id ?? null,
                attributes: [],
                error: 'Failed to load page data'
            }
        };
    }
};