import Link from 'next/link';
import Image from 'next/image';

const PopularCategories = ({ categories }) => {
    // Выберем только основные категории для отображения
    const mainCategories = [
        {
            id: 'mens',
            title: 'Мужская обувь',
            image: '/images/categories/mens.jpg',
            url: '/catalog/muzhskaya-obuv?id=16',
            color: '#EFF6FF',
            hoverColor: '#DBEAFE',
            iconColor: '#3B82F6',
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 18h1.5l.5-2h16l.5 2H22v2H2v-2zm1.75-4L5 8h14l1.25 6H3.75z" fill="currentColor"/>
                    <path d="M7 6V4c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
            )
        },
        {
            id: 'womens',
            title: 'Женская обувь',
            image: '/images/categories/womens.jpg',
            url: '/catalog/zhenskaya-obuv?id=1237',
            color: '#FDF2F8',
            hoverColor: '#FCE7F3',
            iconColor: '#EC4899',
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                </svg>
            )
        },
        {
            id: 'kids',
            title: 'Детская обувь',
            image: '/images/categories/kids.jpg',
            url: '/catalog/detskaya-obuv?id=1007',
            color: '#ECFDF5',
            hoverColor: '#D1FAE5',
            iconColor: '#10B981',
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="8" r="4" fill="currentColor"/>
                    <path d="M12 14c-4 0-8 2-8 6v2h16v-2c0-4-4-6-8-6z" fill="currentColor"/>
                </svg>
            )
        },
        {
            id: 'sport',
            title: 'Спортивная обувь',
            image: '/images/categories/sport.jpg',
            url: '/catalog/sport',
            color: '#FEF3C7',
            hoverColor: '#FDE68A',
            iconColor: '#F59E0B',
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L13.09 8.26L22 9L13.09 15.74L12 22L10.91 15.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
                    <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
            )
        }
    ];

    return (
        <div className="popular-categories-container">
            <div className="popular-categories-grid">
                {mainCategories.map((category, index) => (
                    <Link href={category.url} key={category.id}>
                        <div
                            className="category-card"
                            style={{
                                '--bg-color': category.color,
                                '--hover-color': category.hoverColor,
                                '--icon-color': category.iconColor,
                                '--delay': `${index * 0.1}s`
                            }}
                        >
                            <div className="category-content">
                                <div className="category-icon">
                                    {category.icon}
                                </div>
                                <h3 className="category-title">{category.title}</h3>
                                <div className="category-arrow">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 17l10-10M17 7H7m10 0v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="category-shine"></div>
                        </div>
                    </Link>
                ))}
            </div>

            <style jsx>{`
                .popular-categories-container {
                    position: relative;
                    padding: 15px 0;
                }

                .popular-categories-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 24px;
                    margin: 0 auto;
                }

                .category-card {
                    position: relative;
                    background: var(--bg-color);
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                    height: 160px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(10px);
                }

                .category-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
                    border-radius: 20px;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .category-card:hover::before {
                    opacity: 1;
                }

                .category-card:hover {
                    background: var(--hover-color);
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
                }

                .category-content {
                    text-align: center;
                    padding: 24px;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    z-index: 2;
                }

                .category-icon {
                    color: var(--icon-color);
                    margin-bottom: 16px;
                    transition: all 0.4s ease;
                    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
                }

                .category-card:hover .category-icon {
                    transform: scale(1.15) rotate(5deg);
                }

                .category-title {
                    margin: 0 0 8px 0;
                    font-size: 17px;
                    font-weight: 600;
                    color: #1F2937;
                    letter-spacing: -0.02em;
                    line-height: 1.3;
                    transition: all 0.3s ease;
                }

                .category-card:hover .category-title {
                    color: var(--icon-color);
                    transform: translateY(-2px);
                }

                .category-arrow {
                    opacity: 0;
                    transform: translateX(-8px);
                    transition: all 0.3s ease;
                    color: var(--icon-color);
                    margin-top: 4px;
                }

                .category-card:hover .category-arrow {
                    opacity: 1;
                    transform: translateX(0);
                }

                .category-shine {
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
                    transform: rotate(45deg) translateX(-100%);
                    transition: transform 0.6s ease;
                }

                .category-card:hover .category-shine {
                    transform: rotate(45deg) translateX(100%);
                }

                @media (max-width: 768px) {
                    .popular-categories-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 18px;
                    }
                    
                    .category-card {
                        height: 140px;
                    }
                    
                    .category-content {
                        padding: 20px;
                    }
                    
                    .category-title {
                        font-size: 15px;
                    }
                }

                @media (max-width: 480px) {
                    .popular-categories-grid {
                        grid-template-columns: 1fr;
                        gap: 16px;
                    }
                    
                    .category-card {
                        height: 120px;
                    }
                    
                    .category-content {
                        padding: 18px;
                    }
                    
                    .category-title {
                        font-size: 14px;
                    }
                }
            `}</style>
        </div>
    );
};

export default PopularCategories; 