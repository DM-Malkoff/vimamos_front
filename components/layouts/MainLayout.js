import Header from './header'
import Footer from './footer'
import BreadCrumbs from "../breadcrumbs";
import Caption from "../caption";
import {useRouter} from "next/router";
import SearchBlock from "../searchBlock";
import React from "react";

const CatalogLayout = ({categories,children, caption, lastNode}) => {
    const pathLocation = useRouter().pathname
    return(
        <div className='content'>
            <Header categories={categories}/>
            <div className='site__container'>
                <div className='site__main__wrap folder'>
                    <main role="main" className="site__main folder">
                        <div className="site__main__in">
                            <BreadCrumbs path={pathLocation} namePage={lastNode ? lastNode : caption} />
                            <Caption caption={caption}/>
                            <div className="mode_folder_wrapper">
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