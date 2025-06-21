import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const MainBanner = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Перенаправляем на страницу поиска с параметром
            window.location.href = `/search/search?id=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <section className="main-banner">
            <div className="banner-overlay"></div>
            <div className="banner-content">
                <h1>Найдите идеальную обувь<br />по лучшей цене</h1>
                <p>Сравнивайте цены на обувь в разных магазинах и экономьте до 50%</p>
                
                <form className="search-form" onSubmit={handleSearch}>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Поиск обуви: введите запрос"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        <button type="submit" className="search-button">
                            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
            
            <style jsx>{`
                .main-banner {
                    position: relative;
                    height: 400px;
                    border-radius: 12px;
                    overflow: hidden;
                    margin: 20px 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0 60px;
                    text-align: center;
                    background-image: url('/images/promo_bg.jpg');
                    background-size: cover;
                    background-position: center;
                }

                .banner-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(45deg, rgba(44, 62, 80, 0.9), rgba(52, 152, 219, 0.8));
                    z-index: 1;
                }
                
                .banner-content {
                    position: relative;
                    color: white;
                    max-width: 800px;
                    z-index: 2;
                }
                
                .banner-content h1 {
                    font-size: 42px;
                    font-weight: 700;
                    margin-bottom: 20px;
                    line-height: 1.2;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }
                
                .banner-content p {
                    font-size: 20px;
                    margin-bottom: 30px;
                    opacity: 0.95;
                    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
                }

                .search-form {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                }

                .search-container {
                    position: relative;
                    display: flex;
                    background: white;
                    border-radius: 50px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
                    overflow: hidden;
                    transition: all 0.3s ease;
                }

                .search-container:hover {
                    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
                    transform: translateY(-2px);
                }

                .search-container:focus-within {
                    box-shadow: 0 12px 40px rgba(52, 152, 219, 0.3);
                    transform: translateY(-2px);
                }

                .search-input {
                    flex: 1;
                    padding: 18px 25px;
                    border: none;
                    outline: none;
                    font-size: 16px;
                    color: #333;
                    background: transparent;
                    font-family: inherit;
                }

                .search-input::placeholder {
                    color: #999;
                    font-size: 15px;
                }

                .search-button {
                    background: #f8f9fa;
                    border: none;
                    outline: none;
                    padding: 18px 25px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                    color: #2c3e50;
                    border-radius: 0 50px 50px 0;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                    min-width: 60px;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }

                .search-button:hover {
                    background: #e9ecef;
                    transform: translateY(-1px);
                    outline: none;
                    border: none;
                }

                .search-button:active {
                    transform: translateY(0);
                    outline: none;
                    border: none;
                }

                .search-button:focus {
                    outline: none;
                    border: none;
                }

                .search-icon {
                    width: 20px;
                    height: 20px;
                }
                
                @media (max-width: 768px) {
                    .main-banner {
                        height: 350px;
                        padding: 0 30px;
                    }
                    
                    .banner-content h1 {
                        font-size: 32px;
                    }
                    
                    .banner-content p {
                        font-size: 16px;
                    }

                    .search-container {
                        border-radius: 40px;
                    }

                    .search-input {
                        padding: 15px 20px;
                        font-size: 15px;
                    }

                    .search-button {
                        padding: 15px 20px;
                    }

                    .search-icon {
                        width: 18px;
                        height: 18px;
                    }
                }

                @media (max-width: 480px) {
                    .search-input::placeholder {
                        font-size: 14px;
                    }
                }
            `}</style>
        </section>
    );
};

export default MainBanner; 