import axios from 'axios';
import { frontendUrl, siteUrl } from '../constants/config';

function generateSiteMap(urls) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${urls.map((url) => {
                    return `
       <url>
           <loc>${url}</loc>
           <changefreq>daily</changefreq>
           <priority>0.6</priority>
       </url>
     `;
            })
            .join('')}
</urlset>`;
}

function SitemapProducts() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
    console.log('=== Products sitemap generation started ===');
    try {
        // Получаем данные sitemap с бэкенда
        console.log(`Requesting sitemap from: ${siteUrl}/wp-json/custom/v1/sitemap`);
        const response = await axios.get(`${siteUrl}/wp-json/custom/v1/sitemap`);
        console.log('Backend response status:', response.status);
        
        const backendData = response.data;
        
        // Проверяем структуру данных - ожидаем объект с products
        if (!backendData || !backendData.products || !Array.isArray(backendData.products)) {
            console.error('Invalid backend response: expected object with products array', backendData);
            throw new Error('Invalid backend response structure - no products');
        }
        
        console.log(`Found ${backendData.products.length} products from backend`);
        
        // Извлекаем URL из products
        const backendUrls = backendData.products.map(product => product.url);
        console.log('Sample backend URLs:', backendUrls.slice(0, 3));
        
        // Заменяем домен с cms.shoesgo.ru на vimamos.ru
        const frontendUrls = backendUrls.map(url => 
            url.replace(new RegExp(`^${siteUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`), frontendUrl)
        );
        
        console.log('Sample frontend URLs:', frontendUrls.slice(0, 3));

        // Генерируем XML sitemap
        const sitemap = generateSiteMap(frontendUrls);

        res.setHeader('Content-Type', 'text/xml');
        res.write(sitemap);
        res.end();

        return {
            props: {},
        };
    } catch (error) {
        console.error('Error generating products sitemap:', error.message);
        console.error('Full error:', error);
        
        // В случае ошибки возвращаем пустой sitemap
        const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
        
        res.setHeader('Content-Type', 'text/xml');
        res.write(emptySitemap);
        res.end();

        return {
            props: {},
        };
    }
}

export default SitemapProducts; 