import Router from "next/router";
import {partnerLinks} from "../constants/config";

const GoToPartner = ({url, shopName, isProductCard}) => {
    function goToOuterTransition() {
        const partnerLink = partnerLinks.find(item => item.shopName === shopName);
        const link = partnerLink ? partnerLink.shopLink : null;
        event.preventDefault();
        localStorage.setItem('external-link', link + url)
        localStorage.setItem('shopName', shopName)
        Router.push('/gotoshop/');
    }

    return (
        <>
            <div className="shop_product_button" onClick={() => goToOuterTransition()}>
                {isProductCard ?
                    <span>Купить в магазине {shopName}</span>
                    :
                    <span>В корзину</span>
                }
            </div>
        </>
    );
};

export default GoToPartner;