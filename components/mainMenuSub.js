import Link from "next/link";

const MainMenuSub = ({cSMenu, onCLick, onClickBack, subLevel,item,handler,activeSubMenu,subMenuClickHandler}) => {
    const clickSubMenu = (e) => {
        e.preventDefault()
        cSMenu()
        onCLick()
    }
    return (
        <li key={item.id}
            className="subLevel">
            <Link href={{
                pathname: `/catalog/${item.slug}`,
                query: {
                    id: item.id
                }
            }}>
                <a className="has_sublayer"
                   onClick={subLevel.length ? clickSubMenu : handler}>
                    {item.name}
                    {subLevel.length ?
                        <span>&nbsp;</span>
                        :
                        false
                    }
                </a>
            </Link>

            {subLevel.length ?
                <ul className={`waSlideMenu-menu waSlideMenu-i_menu ${activeSubMenu ? 'waSlideMenu-menu-visible':''}`}>
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
                            <a onClick={() => subMenuClickHandler()}>{item.name}</a>
                        </Link>
                    </li>
                    {subLevel.map((item) => {
                        return (
                            <li key={item.id}>
                                <Link href={{
                                    pathname: `/catalog/${item.slug}`,
                                    query: {
                                        id: item.id
                                    }
                                }}>
                                    <a onClick={() => subMenuClickHandler()}>{item.name}</a>
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
                .waSlideMenu-menu-visible{
                  visibility: visible!important;
                }
                `}
            </style>
        </li>
    );
};

export default MainMenuSub;