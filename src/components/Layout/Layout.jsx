import React from "react";
import Header from "../LandingPage/Header";
import Footer from "../LandingPage/Footer";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
    const location = useLocation();

    // Detectar rutas con fondo especial
    const isObrasRoute = location.pathname.startsWith("/descubre") || location.pathname.startsWith("/destacados");

    return (
        <div className={isObrasRoute ? "layout-con-fondo" : "layout-normal"}>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
