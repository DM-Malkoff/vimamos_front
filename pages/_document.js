import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="ru">
            <Head>
                <link rel="icon" href="/favicon.ico" />
                {/*<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />*/}
                {/*<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />*/}
                {/*<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />*/}
                {/*<link rel="manifest" href="/site.webmanifest" />*/}
            </Head>
            <body>
            <Main />
            <NextScript />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                
                   ym(102682703, "init", {
                        clickmap:true,
                        trackLinks:true,
                        accurateTrackBounce:true,
                        webvisor:true
                   });
              `,
                }}
            />
            <noscript>
                <div>
                    <img src="https://mc.yandex.ru/watch/102682703" style={{position:'absolute', left: '-9999px'}} alt=""/>
                </div>
            </noscript>
            </body>
        </Html>
    )
}