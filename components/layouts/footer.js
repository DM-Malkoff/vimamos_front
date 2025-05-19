import {siteName} from "../../constants/config";

const Footer = () => {
    return(
        <footer role="contentinfo" className="site__footer">
            <div className="site__footer__bottom">
                <div className="footer__bottom__left">
                    <div className="footer__site__name">
                        © 2018 - 2022 {siteName} - автомобильные шины, диски и аксессуары
                    </div>
                    <div className="site__counters">

                    </div>
                </div>
                <div className="footer__bottom__center">

                </div>
                <div className="footer__bottom__right">

                </div>
            </div>
        </footer>
    )
}
export default Footer;