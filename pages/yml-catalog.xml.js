import axios from 'axios';
import { frontendUrl, siteUrl, siteName } from '../constants/config';
import fs from 'fs';
import path from 'path';

function generateYmlCatalog(categories, products) {
    const currentDate = new Date().toISOString();
    
    // Фильтруем категории: убираем тестовые и некорректные
    console.log('Categories before filtering:', categories.length);
    console.log('Sample category structure:', categories[0]);
    
    const filteredCategories = categories
        .filter(category => {
            // Исключаем категории с именем "Misc" или "misc"
            if (category.name && category.name.toLowerCase() === 'misc') {
                console.log('Excluding Misc category:', category.name);
                return false;
            }
            // Проверяем только наличие имени (в новом формате нет поля url)
            if (!category.name) {
                console.log('Excluding category without name:', category);
                return false;
            }
            return true;
        })
        .map((category, index) => {
            // В новом формате ID уже есть как число, просто конвертируем в строку
            if (!category.id || category.id === 'undefined') {
                category.id = `cat-${index + 1}`;
            } else {
                category.id = String(category.id);
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
    
    // Логируем структуру товаров
    console.log('Products before processing:', products.length);
    if (products.length > 0) {
        console.log('Sample product structure:', JSON.stringify(products[0], null, 2));
        if (products[0].sku) {
            console.log('Product has SKU field:', products[0].sku);
        }
    }
    
    // Генерируем товары
    const offersXml = products.map((product, index) => {
        // Логируем первые несколько товаров (сокращенно)
        if (index < 3) {
            const identifier = product.sku ? `SKU: ${product.sku}` : `ID: ${product.id}`;
            console.log(`Processing product ${index}: ${product.name} (${identifier})`);
        }
        
        // Проверяем обязательные поля товара
        if ((!product.sku && !product.id) || !product.name) {
            console.log(`Product ${index} missing required fields (sku/id or name), skipping...`);
            return '';
        }
        
        // Исключаем товары с категорией "Misc" в атрибутах
        if (product.attributes && typeof product.attributes === 'object' && product.attributes['Категория'] === 'Misc') {
            if (index < 10) console.log(`Product ${index} has Misc category, skipping...`);
            return '';
        }
        
        // Используем готовые данные с бэкенда
        const price = product.price || 0;
        const categoryId = product.categoryId || '';
        const imageUrl = product.picture || '';
        
        // URL товара - заменяем домен с бэкенда на фронтенд
        let productUrl = '';
        if (product.url) {
            productUrl = product.url.replace('https://cms.shoesgo.ru', frontendUrl);
            if (index < 3) console.log(`Product ${index} URL:`, productUrl);
        } else {
            // Если нет готового URL, генерируем
            const slug = product.name
                .toLowerCase()
                .replace(/[^a-zA-Z0-9а-яё\s-]/g, '')
                .replace(/\s+/g, '-')
                .substring(0, 50);
            const productId = product.sku || product.id;
            productUrl = `${frontendUrl}/p/${slug}?id=${productId}`;
        }
        
        // Параметры товара
        const paramsXml = generateProductParams(product, filteredCategories);
        
        return `<offer id="${product.sku || product.id}" available="${product.available || 'true'}">
        <url>${productUrl}</url>
        <price>${price}</price>
        <currencyId>${product.currencyId || 'RUR'}</currencyId>
        <categoryId>${categoryId}</categoryId>
        ${imageUrl ? `<picture>${imageUrl}</picture>` : ''}
        <name>${escapeXml(product.name)}</name>
        ${product.description ? `<description><![CDATA[${product.description}]]></description>` : ''}
        ${paramsXml}
    </offer>`;
    })
    .filter(offer => offer.trim() !== '') // Убираем пустые предложения
    .join('\n    ');

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
    
    // Обрабатываем атрибуты из объекта (новый формат с бэкенда)
    if (product.attributes && typeof product.attributes === 'object') {
        Object.keys(product.attributes).forEach(key => {
            const value = product.attributes[key];
            // Исключаем параметры "Категория" со значением "Misc" и параметр "Цена"
            if (value && key !== 'Цена' && !(key === 'Категория' && value === 'Misc')) {
                params.push(`<param name="${escapeXml(key)}">${escapeXml(String(value))}</param>`);
            }
        });
    }
    
    return params.join('\n        ');
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

// Путь к файлу кэша
const CACHE_FILE_PATH = path.join(process.cwd(), 'public', 'yml-catalog-cache.xml');
const CACHE_TTL = 60 * 60 * 1000; // 1 час в миллисекундах

function checkCacheFile() {
    try {
        const stats = fs.statSync(CACHE_FILE_PATH);
        const age = Date.now() - stats.mtime.getTime();
        
        if (age < CACHE_TTL) {
            console.log(`Cache file is fresh (${Math.round(age / 1000 / 60)} minutes old)`);
            return fs.readFileSync(CACHE_FILE_PATH, 'utf8');
        } else {
            console.log(`Cache file is stale (${Math.round(age / 1000 / 60)} minutes old), regenerating...`);
            return null;
        }
    } catch (error) {
        console.log('No cache file found, generating fresh data...');
        return null;
    }
}

function saveCacheFile(content) {
    try {
        fs.writeFileSync(CACHE_FILE_PATH, content, 'utf8');
        console.log('YML catalog cached to file');
    } catch (error) {
        console.error('Error saving cache file:', error);
    }
}

export async function getServerSideProps({ res }) {
    console.log('=== YML Catalog generation started ===');
    
    // Проверяем кэш
    const cachedContent = checkCacheFile();
    if (cachedContent) {
        res.setHeader('Content-Type', 'application/xml; charset=utf-8');
        res.setHeader('Cache-Control', 'public, max-age=3600');
        res.write(cachedContent);
        res.end();
        
        console.log('YML Catalog served from cache');
        return { props: {} };
    }
    
    try {
        // Получаем готовые данные с нового эндпоинта
        console.log(`Requesting YML data from: ${siteUrl}/wp-json/custom/v1/yml`);
        const response = await axios.get(`${siteUrl}/wp-json/custom/v1/yml`);
        const ymlData = response.data;
        
        console.log('Backend response status:', response.status);
        console.log('Backend data keys:', Object.keys(ymlData));
        
        if (!ymlData || !ymlData.categories || !ymlData.products) {
            console.error('Invalid YML response: missing categories or products', ymlData);
            throw new Error('Invalid YML response');
        }
        
        console.log(`Found ${ymlData.categories.length} categories from YML endpoint`);
        console.log(`Found ${ymlData.products.length} products from YML endpoint`);
        console.log('Sample categories:', ymlData.categories.slice(0, 3));
        console.log('Sample products:', ymlData.products.slice(0, 2));
        
        // Генерируем YML каталог
        const ymlCatalog = generateYmlCatalog(ymlData.categories, ymlData.products);
        
        // Сохраняем в файловый кэш
        saveCacheFile(ymlCatalog);
        
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
        
        // Попробуем вернуть устаревший кэш в случае ошибки
        try {
            const staleCache = fs.readFileSync(CACHE_FILE_PATH, 'utf8');
            console.log('Serving stale cache due to error');
            
            res.setHeader('Content-Type', 'application/xml; charset=utf-8');
            res.setHeader('Cache-Control', 'public, max-age=300'); // Кэшируем устаревшие данные на 5 минут
            res.write(staleCache);
            res.end();
            
            return { props: {} };
        } catch (cacheError) {
            console.log('No stale cache available, returning minimal catalog');
        }
        
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