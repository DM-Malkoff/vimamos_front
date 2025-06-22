import { getCategories } from '../../utils/categories';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        console.log('Testing categories API...');
        const result = await getCategories();
        
        res.status(200).json({
            success: true,
            dataType: typeof result.data,
            isArray: Array.isArray(result.data),
            length: result.data?.length || 0,
            data: result.data || [],
            message: `Categories loaded successfully: ${result.data?.length || 0} items`
        });
    } catch (error) {
        console.error('Categories test error:', error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'Failed to load categories'
        });
    }
} 