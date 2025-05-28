import Image from "next/image";
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import React, { useState, useEffect } from "react";

const ProductImages = ({ images }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalImg, setModalImg] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const hasImages = images && images.length > 0;

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 600);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const openModal = (img) => {
        setModalImg(img);
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
        setModalImg(null);
    };

    return (
        <div className="product__gallery__images">
            <Swiper
                modules={[Navigation, Pagination]}
                navigation={!isMobile && hasImages && images.length > 1}
                pagination={{ clickable: true, el: '.product__gallery__custom-pagination' }}
                spaceBetween={10}
                slidesPerView={1}
                loop={hasImages && images.length > 1}
            >
                {hasImages ? (
                    images.map((img) => (
                        <SwiperSlide key={img.id}>
                            <div className="product__gallery__image-container" onClick={() => openModal(img)}>
                                <Image
                                    itemProp="image"
                                    src={img.src}
                                    alt={img.alt || img.name || ''}
                                    title={img.name || ''}
                                    layout="fill"
                                    objectFit="contain"
                                    priority={true}
                                />
                            </div>
                        </SwiperSlide>
                    ))
                ) : (
                    <SwiperSlide>
                        <div className="product__gallery__image-container" onClick={() => openModal({src: '/images/no_image.png', alt: 'Нет изображения', name: ''})}>
                            <Image
                                itemProp="image"
                                src="/images/no_image.png"
                                alt="Нет изображения"
                                title=""
                                layout="fill"
                                objectFit="contain"
                                priority={true}
                            />
                        </div>
                    </SwiperSlide>
                )}
            </Swiper>
            <div className="product__gallery__custom-pagination" />
            {modalOpen && (
                <div className="product-modal" onClick={closeModal}>
                    <div className="product-modal__content" onClick={e => e.stopPropagation()}>
                        <Image
                            src={modalImg?.src}
                            alt={modalImg?.alt || ''}
                            title={modalImg?.name || ''}
                            layout="fill"
                            objectFit="contain"
                            priority={true}
                        />
                        <button onClick={closeModal} className="product-modal__close">&times;</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductImages;