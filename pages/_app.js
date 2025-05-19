import '../styles/globals.scss'

import React, {useState} from "react";
import {FilterDataContext, ShowFilterContext} from "../context/context";
import Router from "next/router";
import NProgress from "nprogress";
NProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps }) {
  const [filterDataContext, setFilterDataContext] = useState('Empty Filter Data context')
  const [showFilterContext,setShowFilterContext] =   useState('Empty Show Filter context')
  Router.events.on('routeChangeStart',(url)=>{
      NProgress.start();
  })
  Router.events.on('routeChangeComplete',(url)=>{
    NProgress.done();
  })
  return (
      <>
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
