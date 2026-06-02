import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { Detail } from "./pages/Detail.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { Footer } from "./components/Footer.jsx";
import injectContext from "./store.js";

const Router = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="container" style={{ minHeight: "85vh" }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/detail/:type/:id" element={<Detail />} />
                    <Route path="*" element={<h1 className="text-center mt-5">404 - Not Found!</h1>} />
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    );
};

export default injectContext(Router);
