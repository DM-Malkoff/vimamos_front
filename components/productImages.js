import Image from "next/image";
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';

const ProductImages = ({ images }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalImg, setModalImg] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const hasImages = Array.isArray(images) && images.length > 0;

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
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
                navigation={{
                    enabled: true,
                }}
                pagination={{ 
                    clickable: true, 
                    el: '.product__gallery__custom-pagination'
                }}
                spaceBetween={10}
                slidesPerView={1}
                loop={hasImages && images.length > 1}
                breakpoints={{
                    // Мобильные устройства
                    0: {
                        navigation: {
                            enabled: false,
                        },
                        spaceBetween: 0,
                        allowTouchMove: true,
                    },
                    // Планшеты и выше
                    768: {
                        navigation: {
                            enabled: hasImages && images.length > 1,
                        },
                        spaceBetween: 10,
                        allowTouchMove: true,
                    }
                }}
            >
                {hasImages ? (
                    images.map((img) => (
                        <SwiperSlide key={img.id || img.src}>
                            <div className="product__gallery__image-container" onClick={() => openModal(img)}>
                                <Image
                                    itemProp="image"
                                    src={img.src}
                                    alt={img.alt || img.name || ''}
                                    title={img.name || ''}
                                    fill={true}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    style={{ objectFit: 'contain' }}
                                    priority={true}
                                />
                            </div>
                        </SwiperSlide>
                    ))
                ) : (
                    <SwiperSlide>
                        <div className="product__gallery__image-container">
                            <Image
                                itemProp="image"
                                src="/images/no_image.png"
                                alt="Нет изображения"
                                title=""
                                fill={true}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                style={{ objectFit: 'contain' }}
                                priority={true}
                            />
                        </div>
                    </SwiperSlide>
                )}
            </Swiper>
            <div 
                className="product__gallery__custom-pagination" 
                style={{
                    marginTop: isMobile ? '30px' : '15px',
                    marginBottom: isMobile ? '40px' : '15px'
                }} 
            />
            {modalOpen && (
                <div className="product-modal" onClick={closeModal}>
                    <div className="product-modal__content" onClick={e => e.stopPropagation()}>
                        <Image
                            src={modalImg?.src || '/images/no_image.png'}
                            alt={modalImg?.alt || ''}
                            title={modalImg?.name || ''}
                            fill={true}
                            sizes="100vw"
                            style={{ objectFit: 'contain' }}
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