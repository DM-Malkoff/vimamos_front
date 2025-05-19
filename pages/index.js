import Head from "next/head";
import Header from "../components/layouts/header";
import SearchBlock from "../components/searchBlock";
import Footer from "../components/layouts/footer";
import {getCategories} from "../utils/categories";
import {siteName, siteUrl} from "../constants/config";
import 'swiper/css';
import MainSlider from "../components/mainSlider";
import {getSliderProducts} from "../utils/sliderProducts";

function Home({productsTires, productsDiscs, categories}) {
    return (
        <>
            <Head>
                <title>Колёса-шины-диски.ру - тысячи товаров известных Магазинов в одном месте.</title>
                <meta name="description"
                      content="Наш сервис предоставляет возможность купить недорого шины в популярных Интернет-магазинах. Распродажа зимних и летних автошин со склада в на выгодных условиях: скидки от 10%, рассрочка 0%, кредит."/>
                <meta name="verify-advertiseru" content="d64bb6aeb3"/>
                <meta name="verify-admitad" content="8adf54dd2a"/>
                <meta name="yandex-verification" content="7f8011489a539e5f"/>

                <meta property="og:title"
                      content="Колёса-шины-диски.ру - тысячи товаров известных Магазинов в одном месте."/>
                <meta property="og:image" content="/images/logo.jpg"/>
                <meta property="og:url" content={siteUrl}/>
                <meta property="og:site_name" content={siteName}/>
                <meta property="og:type" content="website"/>
            </Head>
            <Header categories={categories}/>
            <div className='site__container'>
                <div className="text__block__wrapper">
                    <div className="text__block__wrap">
                        <div className="block__title"><h1>Автомобильные шины, диски и аксессуары</h1></div>
                        <div className="block__body">
                            <p>{siteName} - не просто Интернет-магазин. У нас Вы сможете с легкостью найти шины или
                                диски по нужным Вам характеристикам и ценам в популярных Интернет-магазинах и всё это не
                                выходя из дома.</p>
                        </div>
                    </div>
                </div>
                <MainSlider data={productsTires} caption={'Популярные шины'}/>
                <MainSlider data={productsDiscs} caption={'Популярные диски'}/>
            </div>
            <Footer/>
        </>
    )
}

export default Home;

export async function getServerSideProps() {
    const {data: productsTires} = await getSliderProducts(956);
    const {data: productsDiscs} = await getSliderProducts(27);
    const {data: categories} = await getCategories();
    return {
        props: {
            productsTires: productsTires ?? {},
            productsDiscs: productsDiscs ?? {},
            categories: categories ?? {}
        }
    }
}

