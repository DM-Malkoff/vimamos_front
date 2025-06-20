import { useState, useEffect } from 'react';

const ImagePerformanceMonitor = () => {
    const [mounted, setMounted] = useState(false);
    const [stats, setStats] = useState({
        webpSupported: null,
        imagesLoaded: 0,
        webpImages: 0,
        totalSize: 0,
        averageLoadTime: 0
    });

    useEffect(() => {
        setMounted(true);

        // Проверка поддержки WebP
        const checkWebPSupport = () => {
            const webP = new Image();
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
            webP.onload = webP.onerror = () => {
                setStats(prev => ({
                    ...prev,
                    webpSupported: webP.height === 2
                }));
            };
        };

        checkWebPSupport();

        // Мониторинг загрузки изображений
        let imageCount = 0;
        let webpCount = 0;
        let totalSize = 0;
        let totalLoadTime = 0;

        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.name.includes('_next/image')) {
                    imageCount++;
                    totalSize += entry.transferSize || 0;
                    totalLoadTime += entry.duration;

                    const url = new URL(entry.name);
                    const format = url.searchParams.get('f');
                    // Проверяем только WebP формат
                    if (format === 'webp') {
                        webpCount++;
                    }

                    setStats(prev => ({
                        ...prev,
                        imagesLoaded: imageCount,
                        webpImages: webpCount,
                        totalSize: Math.round(totalSize / 1024), // KB
                        averageLoadTime: Math.round(totalLoadTime / imageCount)
                    }));
                }
            });
        });

        try {
            observer.observe({ entryTypes: ['resource'] });
        } catch (e) {
            console.log('PerformanceObserver not supported');
        }

        return () => {
            try {
                observer.disconnect();
            } catch (e) {
                // ignore
            }
        };
    }, []);

    if (!mounted || process.env.NODE_ENV !== 'development') return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            background: 'rgba(0,0,0,0.9)',
            color: 'white',
            padding: '15px',
            borderRadius: '12px',
            fontSize: '11px',
            zIndex: 9999,
            maxWidth: '250px',
            fontFamily: 'monospace',
            border: '1px solid rgba(255,255,255,0.1)'
        }}>
            <div style={{ 
                fontWeight: 'bold', 
                marginBottom: '8px', 
                color: '#00ff88',
                borderBottom: '1px solid rgba(255,255,255,0.2)',
                paddingBottom: '5px'
            }}>
                📊 Image Performance
            </div>
            
            <div style={{ marginBottom: '4px' }}>
                WebP Support: {stats.webpSupported === null ? '🔄' : stats.webpSupported ? '✅ Yes' : '❌ No'}
            </div>
            
            <div style={{ marginBottom: '4px' }}>
                Images Loaded: <span style={{ color: '#00ff88' }}>{stats.imagesLoaded}</span>
            </div>
            
            <div style={{ marginBottom: '4px' }}>
                WebP Images: <span style={{ color: '#00ff88' }}>{stats.webpImages}</span>
                {stats.imagesLoaded > 0 && (
                    <span style={{ color: '#ffaa00' }}>
                        {' '}({Math.round((stats.webpImages / stats.imagesLoaded) * 100)}%)
                    </span>
                )}
            </div>
            
            <div style={{ marginBottom: '4px' }}>
                Total Size: <span style={{ color: '#00ff88' }}>{stats.totalSize} KB</span>
            </div>
            
            <div>
                Avg Load Time: <span style={{ color: '#00ff88' }}>{stats.averageLoadTime} ms</span>
            </div>

            {stats.webpSupported && stats.imagesLoaded > 0 && stats.webpImages === 0 && (
                <div style={{ 
                    marginTop: '8px', 
                    padding: '5px', 
                    background: 'rgba(255,165,0,0.2)', 
                    borderRadius: '4px',
                    color: '#ffaa00'
                }}>
                    ⚠️ WebP supported but not used
                </div>
            )}
        </div>
    );
};

export default ImagePerformanceMonitor; 