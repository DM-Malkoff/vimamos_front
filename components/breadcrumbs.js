import Link from "next/link";
import {useRouter} from "next/router";

export default function BreadCrumbs({path, parentCategoryName, parentCategoryUrl, namePage, isProduct}){
    const router = useRouter()
    return(
        <div className="site-path" itemScope itemType="https://schema.org/BreadcrumbList">
            <ul>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <Link href="/">
                        <a itemProp="item">
                            <span itemProp="name">Главная</span>
                            <meta itemProp="position" content="1"/>
                        </a>

                    </Link>
                </li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    {parentCategoryName && <Link href={`/catalog/${parentCategoryUrl}`}>
                        <a itemProp="item">
                            <span itemProp="name">{parentCategoryName}</span>
                            <meta itemProp="position" content="2"/>
                        </a>
                    </Link> }
                </li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    {isProduct && <span>{namePage}</span>}
                    {!isProduct && <Link href={{
                        pathname: `/catalog/${router.query.slug}`,
                        query:{
                            id:router.query.id
                        }
                    }}>
                        <a itemProp="item">
                            <span  itemProp="name">{namePage}</span>
                            <meta itemProp="position" content="3"/>
                        </a>
                    </Link>}
                </li>
            </ul>
        </div>
    )
}
