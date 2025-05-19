import Header from './header'
import Footer from './footer'
import Filter from "../filter/filter";
import BreadCrumbs from "../breadcrumbs";
import Caption from "../caption";
import {useRouter} from "next/router";

const CatalogLayout = ({children, caption}) => {
    const pathLocation = useRouter().pathname
    return(
        <div className='content'>
            <Header/>
            <div className='site__container'>
                <div className='site__main__wrap folder'>
                    <main role="main" className="site__main folder">
                        <div className="site__main__in">
                            <BreadCrumbs path={pathLocation} namePage={caption} />
                            <Caption caption={caption}/>
                            <div className="mode_folder_wrapper">
                                <Filter />
                                <div className="mode_folder_body">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default CatalogLayout