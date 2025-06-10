import Link from 'next/link';
import Image from 'next/image';

const PopularCategories = ({ categories }) => {
    // Выберем только основные категории для отображения
    const mainCategories = [
        {
            id: 'mens',
            title: 'Мужская обувь',
            image: '/images/categories/mens.jpg',
            url: '/catalog/mens'
        },
        {
            id: 'womens',
            title: 'Женская обувь',
            image: '/images/categories/womens.jpg',
            url: '/catalog/womens'
        },
        {
            id: 'kids',
            title: 'Детская обувь',
            image: '/images/categories/kids.jpg',
            url: '/catalog/kids'
        },
        {
            id: 'sport',
            title: 'Спортивная обувь',
            image: '/images/categories/sport.jpg',
            url: '/catalog/sport'
        },
        {
            id: 'accessories',
            title: 'Аксессуары',
            image: '/images/categories/accessories.jpg',
            url: '/catalog/accessories'
        }
    ];

    return (
        <div className="popular-categories-grid">
            {mainCategories.map((category) => (
                <Link href={category.url} key={category.id}>
                    <div className="category-card">
                        <div className="category-image">
                            <div className="image-placeholder" />
                        </div>
                        <h3>{category.title}</h3>
                    </div>
                </Link>
            ))}

            <style jsx>{`
                .popular-categories-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
                    gap: 20px;
                    margin: 0 auto;
                }

                .category-card {
                    position: relative;
                    background: white;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .category-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 5px 20px rgba(0,0,0,0.15);
                }

                .category-image {
                    position: relative;
                    width: 100%;
                    padding-top: 75%; /* 4:3 Aspect Ratio */
                    background: #f5f5f5;
                }

                .image-placeholder {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(45deg, #f1f1f1 25%, #e9e9e9 25%, #e9e9e9 50%, #f1f1f1 50%, #f1f1f1 75%, #e9e9e9 75%, #e9e9e9 100%);
                    background-size: 20px 20px;
                }

                .category-card h3 {
                    padding: 15px;
                    margin: 0;
                    font-size: 16px;
                    font-weight: 600;
                    text-align: center;
                    color: #2c3e50;
                }

                @media (max-width: 768px) {
                    .popular-categories-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 480px) {
                    .popular-categories-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default PopularCategories; 