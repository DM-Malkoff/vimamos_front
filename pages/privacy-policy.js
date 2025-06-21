import Head from 'next/head';
import MainLayout from '../components/layouts/MainLayout';

const PrivacyPolicy = () => {
    return (
        <MainLayout>
            <Head>
                <title>Политика конфиденциальности - Vimamos.ru</title>
                <meta name="description" content="Политика конфиденциальности и использования файлов cookie на сайте Vimamos.ru" />
            </Head>
            
            <div className="privacy-policy-container">
                <div className="container">
                    <h1>Политика конфиденциальности</h1>
                    
                    <section className="privacy-section">
                        <h2>Конфиденциальность и файлы cookie</h2>
                        <p>
                            В Vimamos.ru мы серьезно относимся к защите персональных данных наших пользователей.
                            Настоящая политика объясняет, как мы собираем, используем и защищаем вашу информацию 
                            при использовании нашего сервиса сравнения цен на обувь.
                        </p>
                    </section>

                    <section className="privacy-section">
                        <h2>Как Vimamos.ru использует файлы cookie</h2>
                        <p>
                            Наш сайт, как и подавляющее большинство современных веб-ресурсов, использует технологию cookie. 
                            Это позволяет нам обеспечивать качественную работу сервиса, отслеживать его доступность 
                            и стабильность, а также анализировать пользовательские данные для улучшения функциональности 
                            и развития наших продуктов. В данном разделе мы подробно рассказываем о том, 
                            как используются cookie-файлы и какие возможности есть у пользователей по их управлению.
                        </p>
                    </section>

                    <section className="privacy-section">
                        <h2>Что представляют собой файлы cookie?</h2>
                        <p>
                            Cookie - это небольшие текстовые файлы, которые веб-сайт сохраняет на вашем устройстве 
                            (компьютере, планшете или смартфоне) при посещении. Эти файлы содержат информацию 
                            о ваших предпочтениях и активности на сайте, что помогает улучшить ваш опыт 
                            использования наших сервисов.
                        </p>
                    </section>

                    <section className="privacy-section">
                        <h2>Типы используемых нами cookie и их назначение</h2>
                        <p>Мы применяем различные категории cookie-файлов:</p>
                        
                        <div className="cookie-types">
                            <div className="cookie-type">
                                <h3>Аналитические cookie</h3>
                                <p>
                                    Для анализа посещаемости и поведения пользователей мы используем сервисы веб-аналитики. 
                                    Эти данные помогают нам понимать размер и характеристики нашей аудитории, 
                                    определять эффективность различных разделов сайта и выявлять области для улучшения. 
                                    Сбор статистической информации осуществляется через проверенных партнеров: 
                                    Google Analytics и Яндекс.Метрика.
                                </p>
                            </div>
                            
                            <div className="cookie-type">
                                <h3>Рекламные cookie</h3>
                                <p>
                                    Мы используем системы контекстной рекламы (включая Google AdSense) для демонстрации 
                                    релевантных рекламных объявлений, которые могут соответствовать вашим интересам 
                                    и потребностям в области обуви и аксессуаров.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="privacy-section">
                        <h2>Управление настройками cookie</h2>
                        <p>
                            Если вы предпочитаете не использовать cookie-файлы, вы можете отключить их 
                            в настройках конфиденциальности и безопасности вашего браузера. 
                            Обратите внимание, что настройки необходимо изменить во всех используемых вами браузерах 
                            и на всех устройствах. При отключении cookie следует учитывать, что некоторые функции 
                            нашего сайта могут стать недоступными или работать некорректно, что может повлиять 
                            на качество вашего пользовательского опыта.
                        </p>
                    </section>

                    <section className="privacy-section">
                        <h2>Контактная информация</h2>
                        <p>
                            Если у вас есть вопросы о нашей политике конфиденциальности или использовании 
                            ваших персональных данных, пожалуйста, свяжитесь с нами через форму обратной связи на сайте.
                        </p>
                    </section>
                </div>
            </div>

            <style jsx>{`
                .privacy-policy-container {
                    padding: 40px 0;
                    min-height: 60vh;
                }

                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 0 20px;
                }

                h1 {
                    font-size: 32px;
                    font-weight: 700;
                    color: #2c3e50;
                    margin-bottom: 30px;
                    text-align: center;
                }

                .privacy-section {
                    margin-bottom: 30px;
                    padding-bottom: 20px;
                    border-bottom: 1px solid #eee;
                }

                .privacy-section:last-child {
                    border-bottom: none;
                }

                h2 {
                    font-size: 24px;
                    font-weight: 600;
                    color: #34495e;
                    margin-bottom: 15px;
                }

                h3 {
                    font-size: 20px;
                    font-weight: 600;
                    color: #34495e;
                    margin-bottom: 10px;
                }

                p {
                    font-size: 16px;
                    line-height: 1.6;
                    color: #555;
                    margin-bottom: 15px;
                }

                .cookie-types {
                    margin-top: 20px;
                }

                .cookie-type {
                    background: #f8f9fa;
                    padding: 20px;
                    border-radius: 8px;
                    margin-bottom: 15px;
                }

                @media (max-width: 768px) {
                    .privacy-policy-container {
                        padding: 20px 0;
                    }

                    h1 {
                        font-size: 28px;
                    }

                    h2 {
                        font-size: 22px;
                    }

                    .container {
                        padding: 0 15px;
                    }
                }
            `}</style>
        </MainLayout>
    );
};

export default PrivacyPolicy; 