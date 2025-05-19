import Link from "next/link";
import {useEffect, useState} from "react";
import Image from "next/image";
import {siteName} from "../../constants/config";
import MainMenu from "../mainMenu";
import SearchPopup from "../searchPopup";

const Header = ({categories}) => {
    let categoriesData = []
    if (!!categories){
         categoriesData = categories.filter((item)=> item.slug !== 'misc')
    }
    const [showMainMenu, setShowMainMenu] = useState(false)
    const [showSearchBLock, setShowSearchBlock] = useState(false)

    return (
        <>
            <MainMenu
                categories={categoriesData}
                showMenu={showMainMenu}
                handler={() => {
                    setShowMainMenu(false)
                }}
            />
            <SearchPopup
                showBlock={showSearchBLock}
                handler={() => {
                    setShowSearchBlock(false)
                }}
            />
            <header className='site__header'>
                <div className='site__header__top__wrap'>
                    <div className='site__header__top'>
                        <div className='site__header__top__in'>
                            <div className='site__header__top'>
                                <div className='header__top__left'>
                                    <span
                                        className="folders__popup__btn burger__block__btn"
                                        onClick={() => {setShowMainMenu(true)}}
                                    >
                                        Каталог
                                    </span>
                                </div>
                                <div className='header__top__center'>
                                    <Link href='/'><a>
                                        <Image src='/images/logo.jpg'
                                               width='218'
                                               height='30'
                                               alt={siteName}
                                        />
                                    </a>
                                    </Link>
                                </div>
                                <div className='header__top__right'>
                                    <span id="search__popup__btn" className="search__popup__btn"
                                          onClick={() => setShowSearchBlock(true)}>&nbsp;</span>
                                    <span className="cab__popup__btn">&nbsp;</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;
