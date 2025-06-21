import { useState, useEffect } from 'react';
import Link from 'next/link';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Проверяем, не принимал ли пользователь уже условия
        const hasConsented = localStorage.getItem('cookieConsent');
        if (!hasConsented) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="cookie-consent">
            <div className="cookie-content">
                <div className="cookie-text">
                    <p>
                        Этот сайт использует файлы cookie для улучшения пользовательского опыта и анализа трафика. 
                        Продолжая использовать сайт, вы соглашаетесь с нашей{' '}
                        <Link href="/privacy-policy" className="cookie-link">
                            Политикой конфиденциальности
                        </Link>.
                    </p>
                </div>
                <div className="cookie-actions">
                    <button onClick={handleAccept} className="accept-button">
                        Принять
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent; 