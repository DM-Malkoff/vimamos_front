import Link from "next/link";
import {useRouter} from "next/router";

export default function BreadCrumbs({ parentCategories, namePage, isProduct }) {
    const router = useRouter();
    if (!namePage) return false;

    // Рассчитываем общее количество элементов: Главная + родительские категории + текущая страница
    const totalItems = 1 + (parentCategories?.length || 0) + 1;

    return (
        <div className="site-path" itemScope itemType="https://schema.org/BreadcrumbList">
            <ul>
                {/* Главная страница */}
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <Link href="/" itemProp="item">
                        <span itemProp="name">Главная</span>
                    </Link>
                    <meta itemProp="position" content="1" />
                </li>

                {/* Родительские категории */}
                {parentCategories?.map((category, index) => {
                    const position = index + 2;
                    return (
                        <li
                            key={category.id}
                            itemProp="itemListElement"
                            itemScope
                            itemType="https://schema.org/ListItem"
                        >
                            <Link
                                href={`/catalog/${category.slug}?id=${category.id}`}
                                itemProp="item"
                            >
                                <span itemProp="name">{category.name}</span>
                            </Link>
                            <meta itemProp="position" content={position} />
                        </li>
                    );
                })}

                {/* Текущая страница (категория или продукт) */}
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    {isProduct ? (
                        <span itemProp="name">{namePage}</span>
                    ) : (
                        <Link
                            href={{
                                pathname: `/catalog/${router.query.slug}`,
                                query: { id: router.query.id }
                            }}
                            itemProp="item"
                        >
                            <span itemProp="name">{namePage}</span>
                        </Link>
                    )}
                    <meta itemProp="position" content={totalItems} />
                </li>
            </ul>
        </div>
    );
}

