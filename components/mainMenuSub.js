import Link from "next/link";
import {useRouter} from "next/router";

const MainMenuSub = ({cSMenu, onCLick, onClickBack, subLevel, item, handler, activeSubMenu, subMenuClickHandler}) => {
    const router = useRouter();

    const clickSubMenu = (e) => {
        e.preventDefault();
        cSMenu();
        onCLick();
    };

    const handleCategoryClick = async (e, slug, id) => {
        e.preventDefault();
        // Закрываем меню
        if (handler) {
            handler();
        }
        
        // Переходим на страницу категории с полной перезагрузкой
        try {
            await router.push({
                pathname: `/catalog/${slug}`,
                query: {
                    id: id
                }
            }, undefined, { shallow: false });
        } catch (error) {
            console.error('Ошибка при навигации:', error);
            // В случае ошибки делаем полную перезагрузку страницы
            window.location.href = `/catalog/${slug}?id=${id}`;
        }
    };

    return (
        <li key={item.id} className="subLevel">
            <Link href={{
                pathname: `/catalog/${item.slug}`,
                query: {
                    id: item.id
                }
            }}>
                <a className="has_sublayer" onClick={(e) => subLevel.length ? clickSubMenu(e) : handleCategoryClick(e, item.slug, item.id)}>
                    {item.name}
                    {subLevel.length ? <span>&nbsp;</span> : false}
                </a>
            </Link>

            {subLevel.length ?
                <ul className={`waSlideMenu-menu waSlideMenu-i_menu ${activeSubMenu ? 'waSlideMenu-menu-visible' : ''}`}>
                    <li className="waSlideMenu-back">
                        <span onClick={onClickBack}>Назад</span>
                    </li>
                    <li className="parent-item">
                        <Link href={{
                            pathname: `/catalog/${item.slug}`,
                            query: {
                                id: item.id
                            }
                        }}>
                            <a onClick={(e) => handleCategoryClick(e, item.slug, item.id)}>{item.name}</a>
                        </Link>
                    </li>
                    {subLevel.map((subItem) => {
                        return (
                            <li key={subItem.id}>
                                <Link href={{
                                    pathname: `/catalog/${subItem.slug}`,
                                    query: {
                                        id: subItem.id
                                    }
                                }}>
                                    <a onClick={(e) => handleCategoryClick(e, subItem.slug, subItem.id)}>{subItem.name}</a>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                :
                false
            }
            <style jsx>
                {`
                .waSlideMenu-menu-visible {
                    visibility: visible!important;
                }
                `}
            </style>
        </li>
    );
};

export default MainMenuSub;