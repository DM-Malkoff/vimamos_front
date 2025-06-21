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

            <style jsx>{`
                .cookie-consent {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    max-width: 400px;
                    background: rgba(44, 62, 80, 0.95);
                    backdrop-filter: blur(10px);
                    color: white;
                    z-index: 10000;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                    border-radius: 16px;
                    animation: slideIn 0.4s ease-out;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                @keyframes slideIn {
                    from {
                        transform: translateX(100%) scale(0.8);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0) scale(1);
                        opacity: 1;
                    }
                }

                .cookie-content {
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .cookie-text {
                    flex: 1;
                }

                .cookie-text p {
                    margin: 0;
                    font-size: 14px;
                    line-height: 1.5;
                }

                .cookie-link {
                    color: #3498db;
                    text-decoration: underline;
                    transition: color 0.2s ease;
                }

                .cookie-link:hover {
                    color: #5dade2;
                }

                .cookie-actions {
                    display: flex;
                    gap: 10px;
                    justify-content: flex-end;
                }

                .accept-button {
                    background: #3498db;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 25px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    white-space: nowrap;
                }

                .accept-button:hover {
                    background: #2980b9;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
                }

                .accept-button:active {
                    transform: translateY(0);
                }

                @media (max-width: 768px) {
                    .cookie-consent {
                        bottom: 15px;
                        right: 15px;
                        left: 15px;
                        max-width: none;
                    }

                    .cookie-content {
                        padding: 15px;
                        gap: 12px;
                    }

                    .cookie-text p {
                        font-size: 13px;
                    }

                    .accept-button {
                        padding: 8px 16px;
                        font-size: 13px;
                    }
                }

                @media (max-width: 480px) {
                    .cookie-consent {
                        bottom: 10px;
                        right: 10px;
                        left: 10px;
                    }

                    .cookie-content {
                        padding: 12px;
                    }

                    .cookie-text p {
                        font-size: 12px;
                    }
                }
            `}</style>
        </div>
    );
};

export default CookieConsent; 