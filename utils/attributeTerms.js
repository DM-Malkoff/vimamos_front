import api from "../api";

export const getAttributeTerms = async (attributeId) => {
    return(
        await api.get(
            // `products/attributes/3/terms?category=956`
            `products/attributes/${attributeId}/terms?per_page=99`
              //'products/attributes/3/terms?per_page=99'
            //'products/attributes/7/terms?per_page=99'
            //'products?attribute=pa_tip-diska&attribute_term=3'
            //'products?attribute=pa_tip-diska&attribute_term=3'

            //'products/attributes/' //все атрибуты
            //'products?category=27&min_price=1000&attribute=pa_diametr-d&attribute_term=3775,47'
        )


    )
};
