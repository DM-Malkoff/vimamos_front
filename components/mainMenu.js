import {useEffect, useRef, useState} from "react";
import MainMenuSub from "./mainMenuSub";
import {useRouter} from "next/router";


const MainMenu = ({showMenu, categories, handler}) => {
    const router = useRouter();
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [showThirdLevel, setShowThirdLevel] = useState(false);
    const [indexMenuItem, setIndexMenuItem] = useState(null);
    const [indexSubMenuItem, setIndexSubMenuItem] = useState(null);

    const subMenuClickHandler = () => {
        handler()
        setShowSubMenu(false)
        setShowThirdLevel(false)
    }

    const [menuBlockHeight, setMenuBlockHeight] = useState(0)
    const ref = useRef(null)

    useEffect(() => {
        setMenuBlockHeight(ref.current.scrollHeight)
    },[])

    // Пересчет высоты при изменении состояния меню
    useEffect(() => {
        if (ref.current) {
            // Небольшая задержка для завершения CSS-анимации
            setTimeout(() => {
                if (ref.current) {
                    // Находим активное меню в зависимости от уровня
                    let activeMenu;
                    if (showThirdLevel) {
                        // Ищем активное меню третьего уровня
                        activeMenu = ref.current.querySelector('.waSlideMenu-third-active');
                    } else if (showSubMenu) {
                        // Ищем активное меню второго уровня
                        activeMenu = ref.current.querySelector('.waSlideMenu-menu-visible');
                    } else {
                        // Используем основное меню первого уровня
                        activeMenu = ref.current.querySelector('.top__folders');
                    }
                    
                    if (activeMenu) {
                        setMenuBlockHeight(activeMenu.scrollHeight);
                    } else {
                        // Fallback к полной высоте
                        setMenuBlockHeight(ref.current.scrollHeight);
                    }
                }
            }, 0) // 350ms - немного больше чем transition: 0.3s
        }
    }, [showSubMenu, showThirdLevel, indexMenuItem, indexSubMenuItem])

    // Сброс состояния подменю при изменении маршрута
    useEffect(() => {
        setShowSubMenu(false);
        setShowThirdLevel(false);
        setIndexMenuItem(null);
        setIndexSubMenuItem(null);
        if (showMenu) {
            handler(); // Закрываем меню при переходе
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.asPath]);

    return (
        <div className={`burger__block__wrapper ${showMenu ? 'active' : ''}`} onClick={handler}>
            <div className="burger__block__wrap" onClick={(e) => {
                e.stopPropagation()
            }}>
                <div className="burger__block__wrap__in">
                    <div className="burger__block__close" onClick={handler}>&nbsp;</div>
                    <div className="burger__block__title"><span>Каталог</span></div>
                    <div className="burger__block__inner">
                        <div className="folders__block__wrap waSlideMenu-nav" ref={ref}>
                            <div className="waSlideMenu-wrapper">
                                <ul className="menu-default top__folders waSlideMenu-menu">
                                    {categories.map((item,catIndex) => {
                                        const subLevel = categories.filter((subItem) => subItem.parent == item.id)
                                        if (item.parent === 0) {
                                            const activeSubMenu = catIndex === indexMenuItem ? true: false
                                            return (
                                                <MainMenuSub
                                                    key={item.id}
                                                    activeSubMenu={activeSubMenu}
                                                    showThirdLevel={showThirdLevel}
                                                    cSMenu={()=> {
                                                        setShowSubMenu(true)
                                                    }}
                                                    cThirdLevel={(show) => {
                                                        setShowThirdLevel(show)
                                                    }}
                                                    subLevel={subLevel}
                                                    categories={categories}
                                                    item={item}
                                                    handler={handler}
                                                    menuBlockHeight={menuBlockHeight}
                                                    onClickBack={()=>{
                                                        if (showThirdLevel) {
                                                            setShowThirdLevel(false)
                                                            setIndexSubMenuItem(null)
                                                        } else {
                                                            setShowSubMenu(false)
                                                            setIndexMenuItem(null)
                                                        }
                                                    }}
                                                    onCLick={()=>{
                                                        setIndexMenuItem(catIndex)
                                                    }}
                                                    onSubItemClick={(index)=>{
                                                        setIndexSubMenuItem(index)
                                                    }}
                                                    activeSubItem={indexSubMenuItem}
                                                    subMenuClickHandler={subMenuClickHandler}
                                                />
                                            )
                                        }
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .waSlideMenu-wrapper{
                    transform: ${showThirdLevel ? 'translateX(-200%)' : showSubMenu ? 'translateX(-100%)' : 'translateX(0)'};
                    transition: 0.3s;
                }
                .folders__block__wrap{
                    height: ${menuBlockHeight ? menuBlockHeight + 'px' : false} 
                }
            `}
            </style>
        </div>
    );
};

export default MainMenu;