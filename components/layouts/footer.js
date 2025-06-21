import {siteName} from "../../constants/config";
import Link from 'next/link';

const Footer = () => {
    return(
        <footer role="contentinfo" className="site__footer">
            <div className="site__footer__bottom">
                <div className="footer__bottom__left">
                    © 2020 - {new Date().getFullYear()} {siteName} Сайт - каталог Интернет-магазинов обуви.
                </div>
                <div className="footer__bottom__right">
                    <Link href="/privacy-policy" className="privacy-link">
                        Политика конфиденциальности
                    </Link>
                </div>
            </div>
        </footer>
    )
}
export default Footer;