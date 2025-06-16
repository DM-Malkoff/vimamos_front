import Head from "next/head";
import Header from "../components/layouts/header";
import Footer from "../components/layouts/footer";
import {getCategories} from "../utils/categories";
import {siteName, siteUrl} from "../constants/config";
import 'swiper/css';
import MainSlider from "../components/mainSlider";
import {getSliderProducts} from "../utils/sliderProducts";
import MainBanner from "../components/mainBanner";
import PopularCategories from "../components/popularCategories";

function Home({productsLacoste, productsRieker, productsEcco, productsSalamander, categories}) {
    return (
        <>
            <Head>
                <title>Купить обувь в Москве в Интернет-магазине | Vimamos.ru</title>
                <meta name="description" content="Каталог товаров обуви и аксессуаров известных брендов. Коллекции фирменной обуви. Высочайшее качество. Более 50000 моделей в каталоге - мужские, женские и детские. Заходите, выбирайте, покупайте!"/>
                <meta name="yandex-verification" content="e5de60cb974247ac"/>

                <meta property="og:title" content="Купить обувь в Москве в Интернет-магазине | Vimamos.ru"/>
                <meta property="og:image" content="/images/logo.png"/>
                <meta property="og:url" content={siteUrl}/>
                <meta property="og:site_name" content={siteName}/>
                <meta property="og:type" content="website"/>
            </Head>
            <Header categories={categories}/>
            <div className="page-wrapper">
                <main className='site__container'>
                    <div className="site__main__wrap">
                        <div role="main" className="site__main">
                            <MainBanner/>

                            <section className="popular-categories">
                                <div className="popular-categories-header">
                                    <h2 className="section-title popular-categories-title">Популярные категории</h2>
                                    <p className="popular-categories-subtitle">Найдите то, что ищете в наших основных
                                        категориях</p>
                                </div>
                                <PopularCategories categories={categories}/>
                            </section>

                            <section className="brands-section">
                                <div className="brands-section-header">
                                    <h2 className="section-title brands-title">Популярные бренды</h2>
                                    <p className="brands-subtitle">Откройте для себя лучшие предложения от ведущих мировых
                                        брендов</p>
                                </div>
                                <div className="brands-sliders">
                                    <MainSlider
                                        data={productsLacoste}
                                        caption="Lacoste"
                                        categories={[
                                            {id: 377, name: "Для женщин"},
                                            {id: 224, name: "Для мужчин"},
                                            {id: 361, name: "Для детей"}
                                        ]}
                                    />
                                    <MainSlider
                                        data={productsEcco}
                                        caption="Ecco"
                                        categories={[
                                            {id: 135, name: "Женская обувь"},
                                            {id: 215, name: "Мужская обувь"},
                                            {id: 195, name: "Детская обувь"}
                                        ]}
                                    />
                                    {/*<MainSlider*/}
                                    {/*    data={productsRieker}*/}
                                    {/*    caption="Rieker"*/}
                                    {/*    categories={[*/}
                                    {/*        {id: 854, name: "Женская обувь"},*/}
                                    {/*        {id: 981, name: "Мужская обувь"}*/}
                                    {/*    ]}*/}
                                    {/*/>*/}
                                    {/*<MainSlider*/}
                                    {/*    data={productsSalamander}*/}
                                    {/*    caption="Salamander"*/}
                                    {/*    categories={[*/}
                                    {/*        {id: 726, name: "Женская обувь"},*/}
                                    {/*        {id: 962, name: "Мужская обувь"}*/}
                                    {/*    ]}*/}
                                    {/*/>*/}
                                </div>
                            </section>
                        </div>
                    </div>
                </main>
            </div>
            <Footer/>
        </>
    )
}

export default Home;

export async function getServerSideProps() {
    const {data: productsLacoste} = await getSliderProducts(377);
    const {data: productsEcco} = await getSliderProducts(135);
    // const {data: productsRieker} = await getSliderProducts(854);
    // const {data: productsSalamander} = await getSliderProducts(726);
    const {data: categories} = await getCategories();
    
    return {
        props: {
            productsLacoste: productsLacoste ?? {},
            productsEcco: productsEcco ?? {},
            // productsRieker: productsRieker ?? {},
            // productsSalamander: productsSalamander ?? {},
            categories: categories ?? {}
        }
    }
}

