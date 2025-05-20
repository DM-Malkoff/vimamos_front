import Head from "next/head";
import Header from "../components/layouts/header";
import SearchBlock from "../components/searchBlock";
import Footer from "../components/layouts/footer";
import {getCategories} from "../utils/categories";
import {siteName, siteUrl} from "../constants/config";
import 'swiper/css';
import MainSlider from "../components/mainSlider";
import {getSliderProducts} from "../utils/sliderProducts";

function Home({productsLacoste, categories}) {
    return (
        <>
            <Head>
                <title>Купить обувь в Москве в Интернет-магазине | Vimamos.ru</title>
                <meta name="description" content="Каталог товаров обуви и аксессуаров известных брендов. Коллекции фирменной обуви. Высочайшее качество. Более 50000 моделей в каталоге - мужские, женские и детские. Заходите, выбирайте, покупайте!"/>
                <meta name="yandex-verification" content="7f8011489a539e5f"/>

                <meta property="og:title"
                      content="Купить обувь в Москве в Интернет-магазине | Vimamos.ru"/>
                <meta property="og:image" content="/images/logo.png"/>
                <meta property="og:url" content={siteUrl}/>
                <meta property="og:site_name" content={siteName}/>
                <meta property="og:type" content="website"/>
            </Head>
            <Header categories={categories}/>
            <div className='site__container'>
                <MainSlider data={productsLacoste} caption={'Обувь Lacoste'}/>
                <MainSlider data={productsLacoste} caption={'Обувь Rieker'}/>
                <MainSlider data={productsLacoste} caption={'Обувь ECCO'}/>
            </div>
            <Footer/>
        </>
    )
}

export default Home;

export async function getServerSideProps() {
    const {data: productsLacoste} = await getSliderProducts(26);
    // const {data: productsDiscs} = await getSliderProducts(27);
    console.log('???', productsLacoste)
    const {data: categories} = await getCategories();
    return {
        props: {
            productsLacoste: productsLacoste ?? {},
            // productsDiscs: productsDiscs ?? {},
            categories: categories ?? {}
        }
    }
}

