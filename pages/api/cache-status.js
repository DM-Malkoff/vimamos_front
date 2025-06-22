export default async function handler(req, res) {
    try {
        const now = Date.now();
        const CACHE_TTL = 30 * 60 * 1000; // 30 минут
        
        const cacheAge = now - (global.categoriesCacheTimestamp || 0);
        const isExpired = cacheAge >= CACHE_TTL;
        const timeUntilExpiry = CACHE_TTL - cacheAge;
        
        const status = {
            hasCachedData: !!global.categoriesCache,
            categoriesCount: global.categoriesCache?.length || 0,
            cacheAge: Math.floor(cacheAge / 1000), // в секундах
            cacheAgeFormatted: formatTime(cacheAge),
            isExpired: isExpired,
            timeUntilExpiry: isExpired ? 0 : Math.floor(timeUntilExpiry / 1000), // в секундах
            timeUntilExpiryFormatted: isExpired ? 'Expired' : formatTime(timeUntilExpiry),
            cacheTTL: Math.floor(CACHE_TTL / 1000), // в секундах
            lastUpdate: global.categoriesCacheTimestamp ? new Date(global.categoriesCacheTimestamp).toISOString() : 'Never',
            nextUpdate: isExpired ? 'On next request' : new Date(global.categoriesCacheTimestamp + CACHE_TTL).toISOString()
        };
        
        res.status(200).json(status);
    } catch (error) {
        res.status(500).json({
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
}

function formatTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
        return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${seconds % 60}s`;
    } else {
        return `${seconds}s`;
    }
} 