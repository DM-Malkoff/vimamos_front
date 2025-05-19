import api from "../api";
import {quantityProducts} from "../constants/config";

export const getProductsData = async (queries) => {
    const {slug: _, ...apiQueries} = queries

    let apiString = `products?per_page=${quantityProducts}&`
    let counter = 1
    let myKey = ''
    for (const key in apiQueries){
        myKey = key
        if (myKey == 'id'){
            myKey = 'category'
        }
        counter++

        if (counter != queries.length){
            apiString = apiString+myKey+'='+queries[key]+'&'
        }else{
            apiString = apiString+myKey+'='+queries[key]
        }
    }

    return await api.get(
        `${apiString}`
    );
};
