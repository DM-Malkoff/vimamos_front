import Link from "next/link";
import {useRouter} from "next/router";

const MainMenuSub = ({
    cSMenu, 
    onCLick, 
    onClickBack, 
    subLevel, 
    item, 
    handler, 
    activeSubMenu, 
    subMenuClickHandler,
    categories,
    showThirdLevel,
    cThirdLevel,
    onSubItemClick,
    activeSubItem
}) => {
    const router = useRouter();

    const clickSubMenu = (e) => {
        e.preventDefault();
        cSMenu();
        onCLick();
    };

    const clickThirdLevel = (e, index) => {
        e.preventDefault();
        cThirdLevel(true);
        onSubItemClick(index);
    };

    const handleCategoryClick = async (e, slug, id) => {
        e.preventDefault();
        
        // Закрываем меню при переходе
        if (handler) {
            handler();
        }
        
        try {
            await router.push({
                pathname: `/catalog/${slug}`,
                query: {
                    id: id
                }
            });
        } catch (error) {
            console.error('Ошибка при навигации:', error);
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
                    {subLevel.map((subItem, index) => {
                        const thirdLevel = categories.filter((thirdItem) => thirdItem.parent === subItem.id);
                        return (
                            <li key={subItem.id}>
                                <Link href={{
                                    pathname: `/catalog/${subItem.slug}`,
                                    query: {
                                        id: subItem.id
                                    }
                                }}>
                                    <a onClick={(e) => thirdLevel.length ? clickThirdLevel(e, index) : handleCategoryClick(e, subItem.slug, subItem.id)}>
                                        {subItem.name}
                                        {thirdLevel.length ? <span>&nbsp;</span> : false}
                                    </a>
                                </Link>
                                
                                {thirdLevel.length > 0 && (
                                    <ul className={`waSlideMenu-menu waSlideMenu-i_menu waSlideMenu-third-level ${showThirdLevel && activeSubItem === index && activeSubMenu ? 'waSlideMenu-menu-visible waSlideMenu-third-active' : ''}`}>
                                        <li className="waSlideMenu-back">
                                            <span onClick={onClickBack}>Назад</span>
                                        </li>
                                        <li className="parent-item">
                                            <Link href={{
                                                pathname: `/catalog/${subItem.slug}`,
                                                query: {
                                                    id: subItem.id
                                                }
                                            }}>
                                                <a onClick={(e) => handleCategoryClick(e, subItem.slug, subItem.id)}>{subItem.name}</a>
                                            </Link>
                                        </li>
                                        {thirdLevel.map((thirdItem) => (
                                            <li key={thirdItem.id}>
                                                <Link href={{
                                                    pathname: `/catalog/${thirdItem.slug}`,
                                                    query: {
                                                        id: thirdItem.id
                                                    }
                                                }}>
                                                    <a onClick={(e) => handleCategoryClick(e, thirdItem.slug, thirdItem.id)}>{thirdItem.name}</a>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
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
                .waSlideMenu-third-level {
                    display: none !important;
                }
                .waSlideMenu-third-level.waSlideMenu-third-active {
                    display: block !important;
                    visibility: visible !important;
                }
                `}
            </style>
        </li>
    );
};

export default MainMenuSub;