import Link from 'next/link';
import Image from 'next/image';

const PopularCategories = ({ categories }) => {
    // Выберем только основные категории для отображения
    const mainCategories = [
        {
            id: 'womens',
            title: 'Женская обувь',
            subtitle: 'Элегантность и стиль',
            image: '/images/categories/womens.jpg',
            url: '/catalog/zhenskaya-obuv?id=134',
            gradient: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            accentColor: '#1e293b',
            textColor: '#475569',
            icon: '👠'
        },
        {
            id: 'mens',
            title: 'Мужская обувь',
            subtitle: 'Сила и уверенность',
            image: '/images/categories/mens.jpg',
            url: '/catalog/muzhskaya-obuv?id=216',
            gradient: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
            accentColor: '#0f172a',
            textColor: '#334155',
            icon: '👞'
        },
        {
            id: 'kids',
            title: 'Детская обувь',
            subtitle: 'Комфорт для малышей',
            image: '/images/categories/kids.jpg',
            url: '/catalog/detskaya-obuv?id=194',
            gradient: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)',
            accentColor: '#1c1917',
            textColor: '#44403c',
            icon: '👟'
        },
            // {
            //     id: 'sport',
            //     title: 'Спортивная обувь',
            //     subtitle: 'Активность и движение',
            //     image: '/images/categories/sport.jpg',
            //     url: '/catalog/sport',
            //     gradient: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            //     accentColor: '#14532d',
            //     textColor: '#365314',
            //     icon: '⚡'
            // }
    ];

    return (
        <div className="popular-categories-container">
            <div className="popular-categories-grid">
                {mainCategories.map((category, index) => (
                    <Link href={category.url} key={category.id}>
                        <div
                            className="category-card"
                            style={{
                                '--gradient': category.gradient,
                                '--accent-color': category.accentColor,
                                '--text-color': category.textColor,
                                '--delay': `${index * 0.15}s`
                            }}
                        >
                            <div className="category-overlay"></div>
                            <div className="category-content">
                                <div className="category-icon">
                                    {category.icon}
                                </div>
                                <div className="category-text">
                                    <h3 className="category-title">{category.title}</h3>
                                    <p className="category-subtitle">{category.subtitle}</p>
                                </div>
                                <div className="category-arrow">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13 7L18 12L13 17M6 12H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="category-pattern"></div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default PopularCategories; 