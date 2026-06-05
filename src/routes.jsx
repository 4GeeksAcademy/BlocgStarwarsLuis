import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";

import { Home } from "./pages/Home.jsx";
import { Detail } from "./pages/Detail.jsx"; 


import { Navbar } from "./components/Navbar.jsx";
import { Footer } from "./components/Footer.jsx";

import injectContext from "./store.js"; 

const AppRouter = () => {
  
   const basename = import.meta.env.BASE_URL || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/detail/:type/:id" element={<Detail />} />
                        <Route path="*" element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(AppRouter);