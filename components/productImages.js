import Image from "next/image";
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductImages = ({ images }) => {
    const hasImages = images && images.length > 0;
    return (
        <div className="product__gallery__images">
            <Swiper
                modules={[Navigation, Pagination]}
                navigation={hasImages && images.length > 1}
                pagination={{ clickable: true }}
                spaceBetween={10}
                slidesPerView={1}
                loop={hasImages && images.length > 1}
            >
                {hasImages ? (
                    images.map((img) => (
                        <SwiperSlide key={img.id}>
                            <div style={{ position: 'relative', width: '100%', height: '560px' }}>
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
                        <div style={{ position: 'relative', width: '100%', height: '560px' }}>
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
        </div>
    );
};

export default ProductImages;