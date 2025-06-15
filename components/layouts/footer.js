import {siteName} from "../../constants/config";

const Footer = () => {
    return(
        <footer role="contentinfo" className="site__footer">
            <div className="site__footer__bottom">
                © 2010 - {new Date().getFullYear()} {siteName} Сайт - каталог Интернет-магазинов обуви.
            </div>
        </footer>
    )
}
export default Footer;