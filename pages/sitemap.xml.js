import { frontendUrl } from '../constants/config';

function generateSitemapIndex() {
    const lastmod = new Date().toISOString();
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
        <loc>${frontendUrl}/sitemap-categories.xml</loc>
        <lastmod>${lastmod}</lastmod>
    </sitemap>
    <sitemap>
        <loc>${frontendUrl}/sitemap-products.xml</loc>
        <lastmod>${lastmod}</lastmod>
    </sitemap>
</sitemapindex>`;
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
    console.log('=== Sitemap index generation started ===');
    
    const sitemapIndex = generateSitemapIndex();

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemapIndex);
    res.end();

    return {
        props: {},
    };
}

export default SiteMap;