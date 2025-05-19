import api from "../api";
import {siteUrl} from "../constants/config";

const EXTERNAL_DATA_URL = siteUrl;

function generateSiteMap(products) {
    // const product  = products.find((item) => item.name === Misc)
        return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${products.map(({slug, id }) => {
                    return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/catalog/${slug}?id=${id}`}</loc>
       </url>
     `;
            })
            .join('')}
   </urlset>
 `;
}

function SiteMap() {
        // getServerSideProps will do the heavy lifting
}


export async function getServerSideProps({ res }) {
        const request = await api.get(
            `products/categories`
        );
        console.log("222!!! >",request)
        const products = await request.data.slice(1); //удаляем дефолтовую категорию Misc

        // We generate the XML sitemap with the posts data
        const sitemap = generateSiteMap(products);

        res.setHeader('Content-Type', 'text/xml');
        // we send the XML to the browser
        res.write(sitemap);
        res.end();

        return {
                props: {},
        };
}

export default SiteMap;