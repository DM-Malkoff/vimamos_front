import { siteUrl } from '../../constants/config';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🔄 Проксируем запрос к WordPress API:', {
      body: req.body,
      targetUrl: `${siteUrl}/wp-json/custom/v1/search-products`
    });

    const response = await fetch(`${siteUrl}/wp-json/custom/v1/search-products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    console.log('📥 Ответ от WordPress API:', {
      status: response.status,
      ok: response.ok,
      statusText: response.statusText
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ Данные от WordPress API получены:', { productsCount: data?.length || 'unknown' });
    
    res.status(200).json(data);
  } catch (error) {
    console.error('💥 Ошибка в Next.js API proxy:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
} 