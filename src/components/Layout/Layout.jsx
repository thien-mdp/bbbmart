import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers"
import ScrollButton from "../ScrollButton/ScrollButton";

const Layout = () => {
  return (
    <>
        <Header/>
        <div className="bg-gray-50 xs:pt-5 sm:pt-1 pb-5 font-ConCung">
            <Routers/>
            <ScrollButton/>
        </div>
        <Footer/>
    </>
  )
}

export default Layout