import axios from 'axios';
import { frontendUrl, siteUrl, siteName } from '../constants/config';

function generateYmlCatalog(categories, products) {
    const currentDate = new Date().toISOString();
    
    // Фильтруем категории: убираем тестовые и некорректные
    console.log('Categories before filtering:', categories.length);
    console.log('Sample category structure:', categories[0]);
    
    const filteredCategories = categories
        .filter(category => {
            // Исключаем категории с именем "Misc" или "misc"
            if (category.name && category.name.toLowerCase() === 'misc') {
                console.log('Excluding Misc category:', category);
                return false;
            }
            // Исключаем категории без имени или URL
            if (!category.name || !category.url) {
                console.log('Excluding category without name or URL:', category);
                return false;
            }
            return true;
        })
        .map((category, index) => {
            // Генерируем ID если его нет
            if (!category.id || category.id === 'undefined') {
                // Сначала пытаемся извлечь числовой ID из URL
                if (category.url) {
                    const urlMatch = category.url.match(/[?&]id=(\d+)/);
                    if (urlMatch) {
                        category.id = urlMatch[1];
                    } else {
                        // Если нет числового ID, используем чистый slug из URL
                        const urlParts = category.url.split('/').filter(Boolean);
                        const slug = urlParts[urlParts.length - 1] || `category-${index}`;
                        // Убираем параметры запроса и оставляем только буквы, цифры и дефисы
                        category.id = slug.split('?')[0].replace(/[^a-zA-Z0-9-]/g, '').substring(0, 50) || `cat-${index + 1}`;
                    }
                } else {
                    category.id = `cat-${index + 1}`;
                }
            }
            return category;
        });
    
    console.log('Categories after filtering:', filteredCategories.length);
    console.log('Sample filtered category:', filteredCategories[0]);
    
    // Генерируем категории
    const categoriesXml = filteredCategories.map(category => {
        const parentId = category.parent_id && category.parent_id !== '0' ? ` parentId="${category.parent_id}"` : '';
        return `<category id="${category.id}"${parentId}>${escapeXml(category.name)}</category>`;
    }).join('\n    ');
    
    // Создаем список ID исключенных категорий для фильтрации товаров (теперь должен быть пустым)
    const excludedCategoryIds = filteredCategories
        .filter(category => 
            (category.name && category.name.toLowerCase() === 'misc')
        )
        .map(category => category.id);
    
    // Генерируем товары
    const offersXml = products.map(product => {
        const price = product.sale_price || product.regular_price || 0;
        
        // Получаем categoryId
        let categoryId = '';
        if (product.categories && product.categories.length > 0) {
            // Ищем первую валидную категорию (не Misc)
            const validCategory = product.categories.find(cat => 
                cat.id && 
                cat.id !== 'undefined' && 
                (!cat.name || cat.name.toLowerCase() !== 'misc')
            );
            categoryId = validCategory ? validCategory.id : '';
        }
        
        // Если categoryId пустой, но у товара есть category_id, используем его
        if (!categoryId && product.category_id) {
            categoryId = product.category_id;
        }
        
        const imageUrl = product.images && product.images[0] ? product.images[0].src.replace(siteUrl, frontendUrl) : '';
        const productUrl = product.permalink ? product.permalink.replace(siteUrl, frontendUrl) : '';
        
        // Параметры товара
        const paramsXml = generateProductParams(product, filteredCategories);
        
        return `<offer id="${product.id}" available="${product.stock_status === 'instock' ? 'true' : 'false'}">
        <url>${productUrl}</url>
        <price>${price}</price>
        <currencyId>RUR</currencyId>
        <categoryId>${categoryId}</categoryId>
        ${imageUrl ? `<picture>${imageUrl}</picture>` : ''}
        <name>${escapeXml(product.name)}</name>
        ${product.short_description ? `<description><![CDATA[${product.short_description}]]></description>` : ''}
        ${paramsXml}
    </offer>`;
    }).join('\n    ');

    return `<?xml version="1.0" encoding="UTF-8"?>
<yml_catalog date="${currentDate}">
    <script/>
    <shop>
        <name>${escapeXml(siteName)}</name>
        <company>${escapeXml(siteName)}</company>
        <url>${frontendUrl}</url>
        <platform>WordPress/WooCommerce/Yandex</platform>
        <version>1.0.0</version>
        <currencies>
            <currency id="RUR" rate="1"/>
        </currencies>
        <categories>
            ${categoriesXml}
        </categories>
        <enable_auto_discounts>true</enable_auto_discounts>
        <offers>
            ${offersXml}
        </offers>
    </shop>
</yml_catalog>`;
}

function generateProductParams(product, filteredCategories = []) {
    let params = [];
    
    // Основные параметры - используем только валидные категории
    if (product.categories && product.categories.length > 0) {
        const validCategory = product.categories.find(cat => 
            cat.id && 
            cat.id !== 'undefined' && 
            cat.name && 
            cat.name.toLowerCase() !== 'misc'
        );
        if (validCategory) {
            params.push(`<param name="Категория">${escapeXml(validCategory.name)}</param>`);
        }
    }
    
    if (product.attributes) {
        product.attributes.forEach(attr => {
            if (attr.name && attr.options && attr.options.length > 0) {
                params.push(`<param name="${escapeXml(attr.name)}">${escapeXml(attr.options.join(', '))}</param>`);
            }
        });
    }
    
    // Бренд из мета-данных или атрибутов
    if (product.meta_data) {
        const brand = product.meta_data.find(meta => meta.key === '_brand' || meta.key === 'brand');
        if (brand && brand.value) {
            params.push(`<param name="Бренд">${escapeXml(brand.value)}</param>`);
        }
    }
    
    // Цена как параметр
    const price = product.sale_price || product.regular_price || 0;
    if (price > 0) {
        params.push(`<param name="Цена">${price} ₽</param>`);
    }
    
    return params.join('\n        ');
}

function extractCategoriesFromProducts(products) {
    const categoriesMap = new Map();
    
    products.forEach(product => {
        if (product.categories && Array.isArray(product.categories)) {
            product.categories.forEach(category => {
                if (category.name && category.name.toLowerCase() !== 'misc') {
                    const key = category.id || category.name;
                    if (!categoriesMap.has(key)) {
                        categoriesMap.set(key, {
                            id: category.id || key.replace(/[^a-zA-Z0-9-]/g, '').substring(0, 50),
                            name: category.name,
                            url: category.url || `#category-${key}`
                        });
                    }
                }
            });
        }
    });
    
    return Array.from(categoriesMap.values());
}

function escapeXml(text) {
    if (!text) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function YmlCatalog() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
    console.log('=== YML Catalog generation started ===');
    try {
        // Получаем данные с бэкенда
        console.log(`Requesting data from: ${siteUrl}/wp-json/custom/v1/sitemap`);
        const response = await axios.get(`${siteUrl}/wp-json/custom/v1/sitemap`);
        const backendData = response.data;
        
        console.log('Backend response status:', response.status);
        console.log('Backend data keys:', Object.keys(backendData));
        
        if (!backendData || !backendData.categories) {
            console.error('Invalid backend response: no categories found', backendData);
            throw new Error('Invalid backend response');
        }
        
        console.log('Sample categories from backend:', backendData.categories.slice(0, 3));
        
        // Получаем детальную информацию о товарах
        let detailedProducts = [];
        if (backendData.products && Array.isArray(backendData.products)) {
            console.log(`Found ${backendData.products.length} products from sitemap`);
            
            // Для YML нужна детальная информация о товарах
            // Попробуем получить её через WooCommerce API или отдельный эндпоинт
            try {
                const productsResponse = await axios.get(`${siteUrl}/wp-json/wc/v3/products`, {
                    params: {
                        per_page: 100, // Ограничим для начала
                        status: 'publish'
                    },
                    auth: {
                        username: process.env.WC_CONSUMER_KEY || '',
                        password: process.env.WC_CONSUMER_SECRET || ''
                    }
                });
                detailedProducts = productsResponse.data;
                console.log(`Got ${detailedProducts.length} detailed products`);
            } catch (apiError) {
                console.log('WooCommerce API not available, using sitemap products');
                // Используем данные из sitemap, если WC API недоступен
                // Если WC API недоступен, возможно данные о товарах уже детальные в sitemap
                if (typeof backendData.products[0] === 'object' && backendData.products[0].id) {
                    // Данные уже детальные
                    detailedProducts = backendData.products;
                    console.log('Using detailed products from sitemap data');
                } else {
                    // Данные - это URL-ы, создаем базовую структуру
                    detailedProducts = backendData.products.map(productUrl => ({
                        id: Math.random().toString(36).substring(7), // Генерируем временный ID
                        name: productUrl.split('/').filter(Boolean).pop().replace(/-/g, ' '),
                        permalink: productUrl,
                        stock_status: 'instock',
                        regular_price: 0,
                        categories: backendData.categories.slice(0, 1) // Присваиваем первую категорию
                    }));
                }
            }
        }
        
        // Создаем дополнительные категории на основе товаров
        const productCategories = extractCategoriesFromProducts(detailedProducts);
        console.log(`Extracted ${productCategories.length} categories from products`);
        console.log('Sample product categories:', productCategories.slice(0, 3));
        
        const allCategories = [...backendData.categories, ...productCategories];
        console.log(`Total categories: ${allCategories.length}`);
        
        // Генерируем YML каталог
        const ymlCatalog = generateYmlCatalog(allCategories, detailedProducts);
        
        res.setHeader('Content-Type', 'application/xml; charset=utf-8');
        res.setHeader('Cache-Control', 'public, max-age=3600'); // Кэшируем на час
        res.write(ymlCatalog);
        res.end();
        
        console.log('YML Catalog generated successfully');
        
        return {
            props: {},
        };
    } catch (error) {
        console.error('Error generating YML catalog:', error.message);
        console.error('Full error:', error);
        
        // В случае ошибки возвращаем минимальный каталог
        const errorCatalog = `<?xml version="1.0" encoding="UTF-8"?>
<yml_catalog date="${new Date().toISOString()}">
    <script/>
    <shop>
        <name>${escapeXml(siteName)}</name>
        <company>${escapeXml(siteName)}</company>
        <url>${frontendUrl}</url>
        <platform>WordPress/WooCommerce/Yandex</platform>
        <version>1.0.0</version>
        <currencies>
            <currency id="RUR" rate="1"/>
        </currencies>
        <categories></categories>
        <enable_auto_discounts>true</enable_auto_discounts>
        <offers></offers>
    </shop>
</yml_catalog>`;
        
        res.setHeader('Content-Type', 'application/xml; charset=utf-8');
        res.write(errorCatalog);
        res.end();
        
        return {
            props: {},
        };
    }
}

export default YmlCatalog; 