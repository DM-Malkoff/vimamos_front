import Image from "next/image";

const ProductImages = ({images}) => {
    return (
        <>
            <Image itemProp="image"
                src={images.length ? images[0].src : '/images/no_image.png'}
                alt={images[0].name}
                title=''
                layout="fill"
                priority={true}
            />
        </>
    );
};

export default ProductImages;