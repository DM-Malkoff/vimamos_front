This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Sitemap и YML Каталог

### Доступные эндпоинты:

1. **Основной sitemap** - `https://vimamos.ru/sitemap.xml`
   - Sitemap index, ссылающийся на отдельные файлы

2. **Sitemap категорий** - `https://vimamos.ru/sitemap-categories.xml`
   - Все категории товаров
   - Обновляется еженедельно

3. **Sitemap товаров** - `https://vimamos.ru/sitemap-products.xml`
   - Все товары
   - Обновляется ежедневно

4. **YML каталог для Яндекс.Маркета** - `https://vimamos.ru/yml-catalog.xml`
   - Полный каталог товаров в формате YML для Яндекс.Маркета
   - Включает категории с иерархией (parentId), товары, цены и параметры
   - Детальная информация о товарах (описания, изображения, атрибуты)
   - Автоматическое извлечение брендов и атрибутов
   - **Файловое кэширование** - регенерируется каждый час, остальное время отдается из кэша
   - **Fallback на устаревший кэш** при ошибках API

### Производительность

- **Sitemap файлы** генерируются быстро (статические данные)
- **YML каталог** использует специализированный эндпоинт + файловое кэширование
- Первая генерация: ~30-60 секунд (готовые данные с бэкенда)
- Последующие запросы: мгновенно из кэша
- Кэш обновляется каждый час автоматически

### Конфигурация

Все настройки находятся в `constants/config.js`:
- `frontendUrl` - URL фронтенда (https://vimamos.ru)
- `siteUrl` - URL бэкенда (https://cms.shoesgo.ru)
- `siteName` - Название сайта

### Источник данных

Данные получаются с бэкенда через специализированные эндпоинты:
- **Sitemap файлы**: `https://cms.shoesgo.ru/wp-json/custom/v1/sitemap`
- **YML каталог**: `https://cms.shoesgo.ru/wp-json/custom/v1/yml` (готовые данные)

**Sitemap эндпоинт** возвращает базовые данные:
```json
{
  "categories": [
    {
      "name": "Категория",
      "url": "https://cms.shoesgo.ru/category/slug/"
    }
  ],
  "products": [
    "https://cms.shoesgo.ru/product/slug/"
  ]
}
```

**YML эндпоинт** возвращает готовые данные:
```json
{
  "categories": [
    {
      "id": "123",
      "name": "Категория",
      "parent_id": "0"
    }
  ],
  "products": [
    {
      "id": "456",
      "name": "Товар",
      "permalink": "https://cms.shoesgo.ru/product/slug/",
      "regular_price": "1000",
      "sale_price": "800",
      "stock_status": "instock",
      "images": [{"src": "https://cms.shoesgo.ru/image.jpg"}],
      "categories": [{"id": "123", "name": "Категория"}],
      "attributes": [{"name": "Размер", "options": ["39"]}]
    }
  ]
}
```

### Особенности YML каталога:

- ✅ Специализированный эндпоинт с готовыми данными
- ✅ Поддержка иерархии категорий (parentId)
- ✅ Полная информация о товарах и атрибутах
- ✅ Правильное экранирование XML
- ✅ Файловое кэширование для высокой производительности
- ✅ Fallback на устаревший кэш при ошибках

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/[slug].js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
