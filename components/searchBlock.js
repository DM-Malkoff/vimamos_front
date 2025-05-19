import styles from "../styles/searchBlock.module.scss"
import {useState} from "react";
const SearchBlock = () =>{
        const [clickedMoreButton,setClickedMoreButton] = useState(false)
        const moreButtonClick = () => {
            setClickedMoreButton(!clickedMoreButton)
        }
        // const buttonMore = document.getElementById('more__fields')
        // const hiddenRows = Array.from(document.getElementsByClassName('hidden__rows'))
        // const searchField = document.getElementById('search__fields__wrap')
        // buttonMore.addEventListener('click',()=>{
        //     buttonMore.classList.toggle('active')
        //     for(let i=0; i<hiddenRows.length;i++){
        //         hiddenRows[i].classList.toggle('show__rows');
        //     }
        //     searchField.style.height = buttonMore.classList.contains('active') ?  searchField.scrollHeight + 'px' : '133px';
        //     console.log(searchField.clientHeight)
        // })
     //}
    return(
        <>
            <div className={styles.search__block__wrapper}>
                <div className={styles.search__block__wrap}>
                    <form>
                        <span className={styles.search__mobile__close}>Закрыть</span>
                        <div className={styles.search__mobile__title}>Расширенный поиск</div>
                        <div className={styles.folders__field__wrap}>
                            <div className={styles.folders__field} id="s[folder_id]">
                                <label className={styles.first_cat_label}>
                                    <input type="radio" name="s[folder_id]" />
                                    <span>Все</span>
                                </label>
                                <label className={styles.checked}>
                                    <input type="radio" value="72074661" name="s[folder_id]" />
                                    <span>Шины</span>
                                </label>
                                <label>
                                    <input type="radio" value="72075061" name="s[folder_id]" />
                                    <span>Диски</span>
                                </label>
                            </div>
                        </div>
                        <div className={[styles.search__fields__wrap, `${clickedMoreButton ? 'show_search__fields__wrap':''}`].join(' ')}>
                            <div className={styles.row}>
                                <div className={styles.row__title}>Цена, руб.</div>
                                <div className={styles.row__body}>
                                    <div className={styles.input__left}>
                                        <input placeholder="от" name="s[price][min]" type="text" size="5"
                                               className={styles.small} />
                                    </div>
                                    <div className={styles.input__right}>
                                        <input placeholder="до" name="s[price][max]" type="text" size="5" className={styles.small} />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.row__body}>
                                    <input type="text" placeholder="Название" name="s[name]" size="20"
                                           id="shop2-name" />
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.row__body}>
                                    <div data-placeholder="Производитель" className={styles.jqselect}>
                                        <select name="s[vendor_id]" data-placeholder="Производитель">
                                            <option>Все</option>
                                            <option>Производитель №1</option>
                                            <option>Производитель №10</option>
                                            <option>Производитель №10</option>
                                            <option>Производитель №10</option>
                                            <option>Производитель №10</option>
                                            <option>Производитель №10</option>
                                            <option>Производитель №10</option>
                                            <option>Производитель №10</option>
                                        </select>
                                        <div className={styles.jq_selectbox__select}>
                                            <div className={styles.jq_selectbox__select_text+''+styles.placeholder}>
                                                Производитель
                                            </div>
                                        </div>
                                        <div className={styles.jq_selectbox__dropdown}>
                                            <ul>
                                                <li className={styles.selected+''+styles.sel}>Все</li>
                                                <li>Производитель №1</li>
                                                <li>Производитель №10</li>
                                                <li>Производитель №11</li>
                                                <li>Производитель №12</li>
                                                <li>Производитель №13</li>
                                                <li>Производитель №14</li>
                                                <li>Производитель №15</li>
                                                <li>Производитель №16</li>
                                                <li>Производитель №17</li>
                                                <li>Производитель №18</li>
                                                <li>Производитель №19</li>
                                                <li>Производитель №2</li>
                                                <li>Производитель №20</li>
                                                <li>Производитель №21</li>
                                                <li>Производитель №22</li>
                                                <li>Производитель №23</li>
                                                <li>Производитель №24</li>
                                                <li>Производитель №25</li>
                                                <li>Производитель №26</li>
                                                <li>Производитель №3</li>
                                                <li>Производитель №4</li>
                                                <li>Производитель №5</li>
                                                <li>Производитель №6</li>
                                                <li>Производитель №7</li>
                                                <li>Производитель №8</li>
                                                <li>Производитель №9</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={[styles.row,styles.text,styles.active].join(' ')}>
                                <input placeholder="Поиск по тексту" type="text" name="search_text"
                                       size="20" id="shop2-text" />
                            </div>
                            <div className={styles.row__buttons}>
                                <div className={styles.row__buttons__in}>
                                    <span className={styles.more__fields} onClick={moreButtonClick}>Еще</span>
                                    <button type="submit" className={styles.search__btn}>Подобрать</button>
                                </div>
                            </div>
                            <div className={[styles.row,`${clickedMoreButton ? 'show__rows':'hidden__rows'}`].join(' ')}>
                                <div className={styles.row__body}>
                                    <div data-placeholder="Новинка" className={[styles.jq_selectbox,styles.jqselect].join(' ')}>
                                        <select data-placeholder="Новинка" name="s[flags][2]">
                                            <option>Все</option>
                                            <option value="1">да</option>
                                            <option value="0">нет</option>
                                        </select>
                                        <div className={styles.jq_selectbox__select}>
                                            <div className={[styles.jq_selectbox__select_text,styles.placeholder].join(' ')}>Новинка</div>
                                        </div>
                                        <div className={styles.jq_selectbox__dropdown}>
                                            <ul>
                                                <li className={[styles.selected,styles.sel].join(' ')}>Все</li>
                                                <li>да</li>
                                                <li>нет</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={[styles.row,`${clickedMoreButton ? 'show__rows':'hidden__rows'}`].join(' ')}>
                                <div className={styles.row__body}>
                                    <div data-placeholder="Спецпредложение"
                                         className={[styles.jq_selectbox,styles.jqselect].join(' ')}>
                                        <select data-placeholder="Спецпредложение" name="s[flags][1]">
                                            <option>Все</option>
                                            <option value="1">да</option>
                                            <option value="0">нет</option>
                                        </select>
                                        <div className={styles.jq_selectbox__select}>
                                            <div className={[styles.jq_selectbox__select_text,styles.placeholder].join(' ')}>Спецпредложение
                                            </div>
                                        </div>
                                        <div className={styles.jq_selectbox__dropdown}>
                                            <ul>
                                                <li className={[styles.selected,styles.sel].join(' ')}>Все</li>
                                                <li>да</li>
                                                <li>нет</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={[styles.row,`${clickedMoreButton ? 'show__rows':'hidden__rows'}`].join(' ')}>
                                <div className={styles.row__title}>Результатов на странице</div>
                                <div className={styles.row__body}>
                                    <div data-placeholder="Результатов на странице"
                                         className={[styles.jq_selectbox,styles.jqselect].join(' ')}>
                                        <select data-placeholder="Результатов на странице"
                                                name="s[products_per_page]">
                                            <option value="5">5</option>
                                            <option value="20">20</option>
                                            <option value="35">35</option>
                                            <option value="50">50</option>
                                            <option value="65">65</option>
                                            <option value="80">80</option>
                                            <option value="95">95</option>
                                        </select>
                                        <div className={styles.jq_selectbox__select}>
                                            <div className={styles.jq_selectbox__select_text}>5
                                            </div>
                                        </div>
                                        <div className={styles.jq_selectbox__dropdown}>
                                            <ul>
                                                <li className={[styles.selected,styles.sel].join(' ')}>5</li>
                                                <li>20</li>
                                                <li>35</li>
                                                <li>50</li>
                                                <li>65</li>
                                                <li>80</li>
                                                <li>95</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="shop2_search_global_fields">

                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="search__mobile__popup__btn not__main">
                <span>Расширенный поиск</span>
            </div>
        </>
    )
}

export default (SearchBlock);