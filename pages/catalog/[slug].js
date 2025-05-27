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
import { useState } from "react";

const Slug = ({products: initialProducts, categories, currentCategoryId, attributes}) => {
    const router = useRouter();
    const [products, setProducts] = useState(initialProducts);
    const currentCategory = categories.find(item => item.id == currentCategoryId);
    const availableSlug = currentCategory.slug;
    const currentPage = router.query.page;
    const currentSlug = router.query.slug;

    let currentPageNum = currentPage == undefined ? 0 : currentPage

    let townCaption = currentCategory.name
    if (Towns[currentPageNum]) {
        townCaption = `${currentCategory.name} в ${Towns[currentPageNum]}`
    }

    // Функция обновления списка товаров
    const handleProductsUpdate = (newProducts) => {
        setProducts(newProducts);
    };

    return (
        <>
            <Head>
                <title>Купить {currentCategory.name} в {Towns[currentPageNum]} в Интернет-магазине недорого</title>
                <meta name="description"
                      content={`${currentCategory.name} - большой ассортимент в нашем каталоге. Доставка в ${Towns[currentPageNum]}. Онлайн оформление заказа. Гарантия от магазина и выгодные цены.`}/>
                {Towns[currentPageNum] ? true : <meta name="robots" content="none"/>}
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

                <meta property="og:title"
                      content={`Купить ${currentCategory.name} в ${Towns[currentPageNum]} в Интернет-магазине недорого`}/>
                <meta property="og:image" content="/images/logo.jpg"/>
                <meta property="og:url" content={siteUrl + useRouter().asPath}/>
                <meta property="og:site_name" content={siteName}/>
                <meta property="og:type" content="website"/>
            </Head>
            <Header categories={categories}/>
            <div className='site__container'>
                <div className='site__main__wrap folder'>
                    <main role="main" className="site__main folder">
                        <div className="site__main__in">
                            <BreadCrumbs namePage={currentCategory.name}/>
                            <Caption caption={townCaption}/>
                            <div className="mode_folder_wrapper">
                                <Filter attributes={attributes} onProductsUpdate={handleProductsUpdate} />
                                <div className="mode_folder_body">
                                    <Sort totalQuantityProducts={currentCategory.count}
                                          quantityFilterProduct={products.length}/>
                                    {products.length == 0 ?
                                        <p className="products_error">Не найдено товаров по заданным параметрам,
                                            попробуйте изменить условия поиска.</p> :
                                        <ProductList products={products}/>
                                    }
                                    {products.length >= quantityProducts || router.query.page ?
                                        <Pagination
                                            totalQuantityProducts={currentCategory.count}
                                            productsLength={products.length}
                                        />
                                        :
                                        false
                                    }
                                </div>
                            </div>
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
    const {data: categories} = await getCategories();
    const {data: products} = await getProductsData(ctx.query);
    const attributes = await getAttributes(ctx.query.id ?? null);

    return {
        props: {
            categories: categories ?? {},
            products: products ?? {},
            currentCategoryId: ctx.query.id ?? null,
            attributes: attributes ?? [],
        }
    }
}