import Link from "next/link";
import {useRouter} from "next/router";

export default function BreadCrumbs({path, parentCategoryName, parentCategoryUrl, namePage, isProduct}){
    const router = useRouter()
    return(
        <div className="site-path" itemScope itemType="https://schema.org/BreadcrumbList">
            <ul>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <Link href="/" itemProp="item">
                        <span itemProp="name">Главная</span>
                    </Link>
                    <meta itemProp="position" content="1"/>
                </li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    {parentCategoryName && <Link href={`/catalog/${parentCategoryUrl}`} itemProp="item">
                        <span itemProp="name">{parentCategoryName}</span>
                    </Link> }
                    {parentCategoryName && <meta itemProp="position" content="2"/>}
                </li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    {isProduct && <span itemProp="name">{namePage}</span>}
                    {!isProduct && <Link href={{
                        pathname: `/catalog/${router.query.slug}`,
                        query:{
                            id:router.query.id
                        }
                    }} itemProp="item">
                        <span itemProp="name">{namePage}</span>
                    </Link>}
                    {!isProduct && <meta itemProp="position" content="3"/>}
                </li>
            </ul>
        </div>
    )
}
