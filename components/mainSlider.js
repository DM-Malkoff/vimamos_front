import {Navigation, Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from '../styles/mainSlider.module.css';

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {getSliderProducts} from "../utils/sliderProducts";

const MainSlider = ({
    data: initialData, 
    caption,
    categories = [] // [{id: number, name: string}]
}) => {
    const swiperRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState(categories[0]?.id || 'all');
    const [data, setData] = useState(initialData || []);

    // Проверяем, что данные существуют и это массив
    const validData = Array.isArray(data) ? data : [];

    const CustomNavigation = () => {
        return (
            <div className="custom-navigation">
                <button className="custom-nav-prev" onClick={() => swiperRef.current?.slidePrev()}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <button className="custom-nav-next" onClick={() => swiperRef.current?.slideNext()}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        );
    };

    return (
        <>
            <div className="brand-slider-container">
                <div className="slider-wrapper">
                    <div className={styles.block__header}>
                        <div className={styles.block__title}>{caption}</div>
                        {categories.length > 0 && (
                            <div className={styles.category_links}>
                                {categories.map(category => (
                                    <button 
                                        key={category.id}
                                        className={`${styles.category_link} ${activeCategory === category.id ? styles.active : ''}`}
                                        onClick={async () => {
                                            try {
                                                console.log('Loading products for category:', category.id);
                                                const response = await getSliderProducts(category.id);
                                                console.log('API response:', response);
                                                
                                                // WooCommerce API может возвращать данные в разных форматах
                                                let newData = [];
                                                if (response && response.data) {
                                                    newData = Array.isArray(response.data) ? response.data : [];
                                                } else if (Array.isArray(response)) {
                                                    newData = response;
                                                }
                                                
                                                console.log('Setting new data:', newData);
                                                setData(newData);
                                                setActiveCategory(category.id);
                                            } catch (error) {
                                                console.error('Error loading products:', error);
                                                setData([]);
                                            }
                                        }}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="slider-content">
                        {validData.length > 0 ? (
                            <Swiper
                                modules={[Navigation, Pagination]}
                                spaceBetween={20}
                                slidesPerView={5}
                                onSwiper={(swiper) => {
                                    swiperRef.current = swiper;
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
                                {validData.map(product =>
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
                                                        <a>
                                                            <Image
                                                                src={product.images && product.images.length ? product.images[0].src : '/images/no_image.png'}
                                                                alt={product.name || 'Product'}
                                                                width={200}
                                                                height={200}
                                                                style={{ objectFit: 'contain' }}
                                                            />
                                                        </a>
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
                                                            <a>{product.name}</a>
                                                        </Link>
                                                    </div>
                                                    <div className="product__price">
                                                        <div className="price-old question">
                                                            <span><strong>{product.regular_price}</strong> руб.</span>
                                                        </div>
                                                        <div className="price-current">
                                                            <strong>{product.sale_price}</strong> руб.
                                                        </div>
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
                    <CustomNavigation />
                </div>
            </div>

            <style jsx>{`
                .brand-slider-container {
                    background: transparent;
                    border-radius: 20px;
                    padding: 30px 30px 0 30px;
                    margin: 30px 0;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
                    border: 1px solid rgba(0, 0, 0, 0.05);
                    position: relative;
                    overflow: hidden;
                }

                .brand-slider-container::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, #3498db, #2c3e50, #e74c3c, #f39c12);
                    background-size: 300% 100%;
                    animation: gradientShift 8s ease infinite;
                }

                @keyframes gradientShift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }

                .slider-wrapper {
                    background: transparent;
                }

                .slider-content {
                    padding-bottom: 0px;
                    position: relative;
                    margin-bottom: 20px;
                }

                .product-card {
                    background: white;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                    transition: all 0.3s ease;
                    border: 1px solid rgba(0, 0, 0, 0.05);
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }

                .product-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
                }

                .product__image {
                    position: relative;
                    overflow: hidden;
                    background: white;
                    height: 200px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 10px;
                }

                .product__image img {
                    transition: transform 0.3s ease;
                    max-width: 100%;
                    max-height: 100%;
                    width: auto !important;
                    height: auto !important;
                    object-fit: contain !important;
                }

                .product-card:hover .product__image img {
                    transform: scale(1.05);
                }

                .product__info {
                    padding: 20px;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .product__name {
                    margin-bottom: 12px;
                    font-size: 14px;
                    line-height: 1.4;
                    height: 40px;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    flex: 1;
                    display: flex;
                    align-items: flex-start;
                }

                .product__name a {
                    color: #2c3e50;
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.3s ease;
                    line-height: 1.4;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .product__name a:hover {
                    color: #3498db;
                }

                .product__price {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    margin-top: auto;
                }

                .price-old {
                    font-size: 12px;
                    color: #999;
                    text-decoration: line-through;
                    opacity: 0.8;
                }

                .price-current {
                    font-size: 16px;
                    font-weight: 700;
                    color: #e74c3c;
                    background: linear-gradient(135deg, #e74c3c, #c0392b);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .no-products {
                    text-align: center;
                    padding: 60px 20px;
                    color: #666;
                }

                .no-products-icon {
                    margin-bottom: 20px;
                    opacity: 0.5;
                }

                .no-products p {
                    font-size: 16px;
                    margin: 0;
                }

                .custom-navigation .custom-nav-prev,
                .custom-navigation .custom-nav-next {
                    background: linear-gradient(135deg, #3498db, #2980b9);
                    color: white;
                    border: none;
                    box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
                }

                .custom-navigation .custom-nav-prev:hover,
                .custom-navigation .custom-nav-next:hover {
                    background: linear-gradient(135deg, #2980b9, #1f618d);
                    transform: scale(1.1);
                    box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
                }

                /* Стили для пагинации */
                :global(.swiper-pagination) {
                    position: static !important;
                    bottom: auto !important;
                    left: auto !important;
                    transform: none !important;
                    width: auto !important;
                    z-index: 10 !important;
                    display: flex !important;
                    justify-content: center !important;
                    align-items: center !important;
                    margin-top: 20px !important;
                    padding: 10px 0 !important;
                }

                :global(.swiper-pagination-bullet) {
                    width: 12px !important;
                    height: 12px !important;
                    background: rgba(52, 152, 219, 0.4) !important;
                    border-radius: 50% !important;
                    transition: all 0.3s ease !important;
                    margin: 0 6px !important;
                    cursor: pointer !important;
                    opacity: 1 !important;
                }

                :global(.swiper-pagination-bullet-active) {
                    background: linear-gradient(135deg, #3498db, #2980b9) !important;
                    transform: scale(1.3) !important;
                    box-shadow: 0 2px 8px rgba(52, 152, 219, 0.5) !important;
                }

                @media (max-width: 768px) {
                    .brand-slider-container {
                        padding: 20px;
                        margin: 20px 0;
                        border-radius: 16px;
                    }

                    .product__info {
                        padding: 15px;
                    }

                    .product__image {
                        height: 180px;
                        padding: 8px;
                    }

                    .slider-content {
                        padding-bottom: 40px;
                    }
                }
            `}</style>
        </>
    );
};

export default MainSlider;