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
                <title>Агрегатор обуви в Москве | Vimamos.ru</title>
                <meta name="description" content="Агрегатор обуви от ведущих интернет-магазинов. Сравнивайте цены, выбирайте лучшие предложения. Более 50000 моделей в каталоге - мужские, женские и детские. Найдите свою идеальную пару!"/>
                <meta name="yandex-verification" content="7f8011489a539e5f"/>

                <meta property="og:title" content="Агрегатор обуви в Москве | Vimamos.ru"/>
                <meta property="og:image" content="/images/logo.png"/>
                <meta property="og:url" content={siteUrl}/>
                <meta property="og:site_name" content={siteName}/>
                <meta property="og:type" content="website"/>
            </Head>
            <Header categories={categories}/>
            <div className="page-wrapper">
                <main className='site__container'>
                    <MainBanner />
                    
                    <section className="popular-categories">
                        <h2 className="section-title">Популярные категории</h2>
                        <PopularCategories categories={categories} />
                    </section>

                    <section className="brands-section">
                        <div className="brands-section-header">
                            <h2 className="section-title brands-title">Популярные бренды</h2>
                            <p className="brands-subtitle">Откройте для себя лучшие предложения от ведущих мировых брендов</p>
                        </div>
                        <div className="brands-sliders">
                            <MainSlider
                                data={productsLacoste}
                                caption="Lacoste"
                                categories={[
                                    { id: 349, name: "Для женщин" },
                                    { id: 45, name: "Для мужчин" },
                                    { id: 445, name: "Для детей" }
                                ]}
                            />
                            <MainSlider 
                                data={productsRieker} 
                                caption="Rieker"
                                categories={[
                                    { id: 854, name: "Женская обувь" },
                                    { id: 981, name: "Мужская обувь" }
                                ]}
                            />
                            <MainSlider 
                                data={productsEcco} 
                                caption="Ecco"
                                categories={[
                                    { id: 1016, name: "Женская обувь" },
                                    { id: 1201, name: "Мужская обувь" },
                                    { id: 1218, name: "Детская обувь" }
                                ]}
                            />
                            <MainSlider 
                                data={productsSalamander} 
                                caption="Salamander"
                                categories={[
                                    { id: 726, name: "Женская обувь" },
                                    { id: 962, name: "Мужская обувь" }
                                ]}
                            />
                        </div>
                    </section>
                </main>
            </div>
            <Footer/>
            
            <style jsx>{`
                .swiper{
                    padding-bottom: 20px;
                }

                .brands-section {
                    margin: 60px 0;
                    position: relative;
                }

                .brands-section-header {
                    text-align: center;
                    margin-bottom: 50px;
                    position: relative;
                }

                .brands-section-header::before {
                    content: '';
                    position: absolute;
                    top: -20px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 60px;
                    height: 4px;
                    background: linear-gradient(90deg, #3498db, #e74c3c);
                    border-radius: 2px;
                }

                .brands-title {
                    font-size: 36px;
                    font-weight: 800;
                    background: linear-gradient(135deg, #2c3e50, #3498db, #e74c3c);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: 15px;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .brands-subtitle {
                    font-size: 18px;
                    color: #7f8c8d;
                    margin: 0;
                    font-weight: 400;
                    max-width: 600px;
                    margin: 0 auto;
                    line-height: 1.5;
                }

                .brands-sliders {
                    display: grid;
                    gap: 0;
                    position: relative;
                }

                .brands-sliders::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -50px;
                    right: -50px;
                    bottom: 0;
                    background: linear-gradient(180deg, 
                        rgba(52, 152, 219, 0.02) 0%, 
                        rgba(231, 76, 60, 0.02) 25%, 
                        rgba(243, 156, 18, 0.02) 50%, 
                        rgba(46, 204, 113, 0.02) 75%, 
                        rgba(155, 89, 182, 0.02) 100%
                    );
                    border-radius: 30px;
                    z-index: -1;
                }

                @media (max-width: 768px) {
                    .brands-section {
                        margin: 40px 0;
                    }

                    .brands-section-header {
                        margin-bottom: 30px;
                    }

                    .brands-title {
                        font-size: 28px;
                    }

                    .brands-subtitle {
                        font-size: 16px;
                        padding: 0 20px;
                    }

                    .brands-sliders::before {
                        left: -20px;
                        right: -20px;
                        border-radius: 20px;
                    }
                }
            `}</style>
        </>
    )
}

export default Home;

export async function getServerSideProps() {
    const {data: productsLacoste} = await getSliderProducts(349);
    const {data: productsRieker} = await getSliderProducts(854);
    const {data: productsEcco} = await getSliderProducts(1016);
    const {data: productsSalamander} = await getSliderProducts(726);
    const {data: categories} = await getCategories();
    
    return {
        props: {
            productsLacoste: productsLacoste ?? {},
            productsRieker: productsRieker ?? {},
            productsEcco: productsEcco ?? {},
            productsSalamander: productsSalamander ?? {},
            categories: categories ?? {}
        }
    }
}

