import {Navigation, Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import React from "react";
import Link from "next/link";
import Image from "next/image";

const MainSlider = ({data, caption}) => {
    return (
        <>
            <div className="popular__block__wrapper">
                <div className="popular__block__wrap">
                    <div className="block__title">{caption}</div>
                    <div className="block__slider">
                        <div className="prod_list_wrap">
                            <div className="slick-list draggable">
                                <Swiper
                                    modules={[Navigation, Pagination]}
                                    spaceBetween={50}
                                    slidesPerView={5}
                                    navigation
                                    pagination={{clickable: true}}
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
                                    {data.map(product =>
                                        <SwiperSlide key={product.id}>
                                            <div className="main__block__item slick-slide">
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
                                                                    src={product.images.length ? product.images[0].src : '/images/no_image.png'}
                                                                    alt={product.name}
                                                                    width={200}
                                                                    height={200}
                                                                />
                                                            </a>
                                                        </Link>
                                                    </div>
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
                                                </form>
                                            </div>
                                        </SwiperSlide>
                                    )}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainSlider;