import '../styles/globals.scss'
import '../styles/mainSlider.css'
import Head from 'next/head'

import React, {useState} from "react";
import {FilterDataContext, ShowFilterContext} from "../context/context";
import Router from "next/router";
import NProgress from "nprogress";
NProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps }) {
  const [filterDataContext, setFilterDataContext] = useState({})
  const [showFilterContext,setShowFilterContext] =   useState('Empty Show Filter context')
  Router.events.on('routeChangeStart',(url)=>{
      NProgress.start();
  })
  Router.events.on('routeChangeComplete',(url)=>{
    NProgress.done();
  })
  return (
      <>
          <Head>
              <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
          </Head>
          <div className='site__wrapper'>
            <FilterDataContext.Provider value={[filterDataContext, setFilterDataContext]}>
                <ShowFilterContext.Provider value={[showFilterContext,setShowFilterContext]}>
                    <Component {...pageProps} />
                </ShowFilterContext.Provider>
            </FilterDataContext.Provider>
          </div>
      </>
  )
}

export default MyApp
