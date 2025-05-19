import {useRouter} from "next/router";
import MainLayout from "../../components/layouts/MainLayout";
import {getSearchProducts} from "../../utils/searchProducts";
import ProductList from "../../components/productList";
import Head from "next/head";
import Link from "next/link";
import {getCategories} from "../../utils/categories";

const SearchProducts = ({searchResults,categories}) => {
    const searchQuery = useRouter().query.id

    return (
        <>
            <Head>
                <title>Поиск товаров</title>
                <meta name="description"
                      content="Здесь Вы можете найте интересующий товар в нашем каталоге по названию"/>
                <meta name="robots" content="noindex, follow"/>
            </Head>
            <MainLayout
                categories={categories}
                caption={'Поиск товаров'}>
                <div className="search__products__list">
                    <div className="search__message">По
                        запросу <span>{searchQuery}</span> найдено {searchResults.length} товаров.
                    </div>
                    {searchResults.length ?
                        <ProductList products={searchResults}/> :
                        <div className="g-notice g-notice--indents">
                            Ничего не найдено. Вы можете вернуться на <Link href="/"><a>главную</a></Link> страницу
                            сайта или изменить свой запрос и повторить поиск.
                        </div>
                    }
                </div>
            </MainLayout>
        </>
    );
};

export default SearchProducts;

export async function getServerSideProps(ctx) {
    const {data: categories} = await getCategories();
    const {data: searchResults} = await getSearchProducts(encodeURI(ctx.query.id))
    return {
        props: {
            categories: categories ?? {},
            searchResults: searchResults
        }
    }
}