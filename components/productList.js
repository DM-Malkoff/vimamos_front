import Link from "next/link";
import Image from "next/image";
import Router from "next/router";
import GoToPartner from "./goToPartner";
import ProductCard from "./productCard";

const ProductList = ({products}) => {
    return (
        <>
            <div className="prod_list_wrap">
                <div className='product-list product_list product-list-thumbs'>
                    {products.length && products.map(res => {
                        return (
                            <ProductCard key={res.id} productData={res} relatedProducts={res.related_ids}/>
                        )
                    })}
                </div>
            </div>
        </>
    );
};

export default ProductList;
