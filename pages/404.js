import Link from 'next/link'
import MainLayout from "../components/layouts/MainLayout";

const NotFoundPage = ({categories}) => {
    return (
        <div className='not-found'>
            <MainLayout caption={"Упс... Страница не найдена"} lastNode={"404"}>
                <span className="error-404">404</span>
                <p>Страница которую Вы ищете больше недоступна. Воспользуйтесь поиском или перейдите на <Link
                    href='/'><a>главную страницу</a></Link> страницу.</p>
            </MainLayout>
        </div>
    )
}

export default NotFoundPage;
