import {Navigation, Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {getSliderProducts} from "../utils/sliderProducts";
import {shimmer, toBase64} from "../utils/imageUtils";
import {imageQuality} from "../constants/config";

const MainSlider = ({
    data: initialData, 
    caption,
    categories = [] // [{id: number, name: string}]
}) => {
    const swiperRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState(categories[0]?.id || 'all');
    const [data, setData] = useState(initialData || []);
    const [isLoading, setIsLoading] = useState(false);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [hasLogo, setHasLogo] = useState(false);

    // Проверяем, что данные существуют и это массив
    const validData = Array.isArray(data) ? data : [];

    // Формируем имя файла логотипа из caption
    const logoFileName = caption ? caption.toLowerCase().replace(/\s+/g, '_') + '-logo.svg' : '';
    const logoPath = `/shop-logos/${logoFileName}`;

    // Проверяем существование логотипа при монтировании компонента
    useEffect(() => {
        if (logoFileName) {
            const img = new window.Image();
            img.onload = () => setHasLogo(true);
            img.onerror = () => setHasLogo(false);
            img.src = logoPath;
        }
    }, [logoPath, logoFileName]);

    const CustomNavigation = () => {
        return (
            <div className="custom-navigation">
                <button 
                    className={`custom-nav-prev ${isBeginning ? 'disabled' : ''}`} 
                    onClick={() => swiperRef.current?.slidePrev()}
                    disabled={isBeginning}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <button 
                    className={`custom-nav-next ${isEnd ? 'disabled' : ''}`} 
                    onClick={() => swiperRef.current?.slideNext()}
                    disabled={isEnd}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        );
    };

    return (
        <div className="brand-slider-container">
            <div className="slider-wrapper">
                <div className="block__header">
                    <div className="block__title">
                        {hasLogo && logoFileName ? (
                            <Image
                                src={logoPath}
                                alt={`${caption} logo`}
                                width={200}
                                height={0}
                                sizes="100vw"
                                style={{
                                    width: 'auto',
                                    minHeight: '50px',
                                    maxWidth: '100px',
                                    objectFit: 'contain'
                                }}
                                className="brand-logo"
                            />
                        ) : (
                            caption
                        )}
                    </div>
                    {categories.length > 0 && (
                        <div className="category_links">
                            {categories.map(category => (
                                <button 
                                    key={category.id}
                                    className={`category_link ${activeCategory === category.id ? 'active' : ''}`}
                                    onClick={async () => {
                                        try {
                                            setIsLoading(true);
                                            const response = await getSliderProducts(category.id);
                                            
                                            // WooCommerce API может возвращать данные в разных форматах
                                            let newData = [];
                                            if (response && response.data) {
                                                newData = Array.isArray(response.data) ? response.data : [];
                                            } else if (Array.isArray(response)) {
                                                newData = response;
                                            }

                                            setData(newData);
                                            setActiveCategory(category.id);
                                            
                                            // Сбрасываем позицию слайдера и состояние навигации
                                            if (swiperRef.current) {
                                                swiperRef.current.slideTo(0);
                                                setIsBeginning(true);
                                                setIsEnd(newData.length <= 5); // Проверяем, нужна ли навигация для новых данных
                                            }
                                        } catch (error) {
                                            console.error('Error loading products:', error);
                                            setData([]);
                                        } finally {
                                            setIsLoading(false);
                                        }
                                    }}
                                    disabled={isLoading}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <div className={`slider-content ${isLoading ? 'loading' : ''}`}>
                    {isLoading && (
                        <div className="loader-overlay">
                            <div className="loader">
                                <div className="loader-spinner"></div>
                                <p>Загрузка товаров...</p>
                            </div>
                        </div>
                    )}
                    <CustomNavigation />
                    {validData.length > 0 ? (
                        <Swiper
                            modules={[Navigation, Pagination]}
                            spaceBetween={20}
                            slidesPerView={5}
                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                                setIsBeginning(swiper.isBeginning);
                                setIsEnd(swiper.isEnd);
                            }}
                            onSlideChange={(swiper) => {
                                setIsBeginning(swiper.isBeginning);
                                setIsEnd(swiper.isEnd);
                            }}
                            pagination={{
                                clickable: true
                            }}
                            breakpoints={{
                                280: {
                                    slidesPerView: 1
                                },
                                375: {
                                    slidesPerView: 1
                                },
                                480: {
                                    slidesPerView: 2
                                },
                                "768": {
                                    slidesPerView: 3
                                },
                                "1024": {
                                    slidesPerView: 4
                                },
                                "1261": {
                                    slidesPerView: 5
                                }
                            }}
                        >
                            {validData.map((product, index) =>
                                <SwiperSlide key={product.id}>
                                    <div className="product-card">
                                        <form className="shop2-product-item">
                                            <div className="product__image">
                                                <Link href={
                                                    {
                                                        pathname: `/p/${product.slug}`,
                                                        query: {
                                                            id: product.id
                                                        }
                                                    }
                                                }>
                                                    <Image
                                                        src={product.images && product.images.length ? product.images[0].src : '/images/no_image.png'}
                                                        alt={product.name || 'Product'}
                                                        width={200}
                                                        height={200}
                                                        sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                                        style={{ objectFit: 'contain' }}
                                                        priority={index === 0}
                                                        placeholder="blur"
                                                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(200, 200))}`}
                                                        quality={imageQuality.normal}
                                                    />
                                                </Link>
                                            </div>
                                            <div className="product__info">
                                                <div className="product__name">
                                                    <Link href={
                                                        {
                                                            pathname: `/p/${product.slug}`,
                                                            query: {
                                                                id: product.id
                                                            }
                                                        }
                                                    }>
                                                        {product.name}
                                                    </Link>
                                                </div>
                                                <div className="product__price">
                                                    {(product.sale_price && product.regular_price) ? (
                                                        <>
                                                            <div className="price-old question">
                                                                <span><strong>{product.regular_price}</strong> руб.</span>
                                                            </div>
                                                            <div className="price-current">
                                                                <strong>{product.sale_price}</strong> руб.
                                                            </div>
                                                        </>
                                                    ) : (product.sale_price || product.regular_price) ? (
                                                        <div className="price-current">
                                                            <strong>{product.sale_price || product.regular_price}</strong> руб.
                                                        </div>
                                                    ) : (
                                                        <div className="price-availability">
                                                            Возможно в наличии
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </SwiperSlide>
                            )}
                        </Swiper>
                    ) : (
                        <div className="no-products">
                            <div className="no-products-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11M5 9H19L18 21H6L5 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <p>Товары временно отсутствуют</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainSlider;