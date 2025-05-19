const SearchPopup = ({showBlock, handler}) => {
    return (
        <div onClick={handler} className={`search__popup__wrapper${showBlock ? ' active' : ''}`}>
            <div id="search_block" className="search__popup__wrap" onClick={(e) => {
                e.stopPropagation()
            }}>
                    <span className="search__popup__close" onClick={handler}>&nbsp;</span>
                <nav className="site__search__wr">
                    <div className="search__title">Поиск</div>
                    <form action={`/search/search/`} method="get" className="search__form">
                        <input
                            name="id"
                            type="text"
                            className="search__text"
                            placeholder="Введите запрос"
                            id="roll"
                            required
                            minLength="3"
                            maxLength="50"
                        />
                        <button className="search__button" type="submit" value="">Найти</button>
                    </form>
                </nav>
            </div>
        </div>
    );
};

export default SearchPopup;