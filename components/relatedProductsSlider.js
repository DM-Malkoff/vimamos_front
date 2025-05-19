import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import React from "react";
import ProductCard from "./productCard";

const RelatedProductsSlider = ({relatedProducts}) => {
    return (
        <>
            <div className="slick-list">
                <div
                    id='relatedProductsSlider'
                    className="slick-track"
                >
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={50}
                        slidesPerView={5}
                        loop={true}
                        breakpoints={{
                            "280": {
                                slidesPerView: 1
                            },
                            "375": {
                                slidesPerView: 1
                            },
                            "480": {
                                slidesPerView: 1
                            },
                            "640": {
                                slidesPerView: 2
                            },
                            "1024": {
                                slidesPerView: 3
                            },
                            "1340": {
                                slidesPerView: 4,
                                spaceBetween :30
                            }
                        }}
                    >
                        {relatedProducts.map((item) => {
                            return(
                                <SwiperSlide key={item.id}>
                                    <ProductCard productData={item}/>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </div>
        </>
    );
};

export default RelatedProductsSlider;